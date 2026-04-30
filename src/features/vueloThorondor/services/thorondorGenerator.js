import { THORONDOR_MODULE_KEYS } from "@/features/vueloThorondor/data/thorondorDefaults";

function serializeBoolean(value) {
  return value ? "True" : "False";
}

function pythonList(list) {
  return `[${(list || []).map((item) => JSON.stringify(item)).join(", ")}]`;
}

export function buildThorondorAgentFiles(draft) {
  const logPaths = String(draft.additionalLogPaths || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const config = {
    ...draft,
    logPaths
  };

  return {
    agentFileName: `${sanitizeFileName(config.serviceName || config.systemName || "thorondor-agent")}.py`,
    serviceFileName: `${sanitizeFileName(config.serviceName || "thorondor-agent")}.service`,
    installFileName: `install-${sanitizeFileName(config.serviceName || "thorondor-agent")}.sh`,
    python: buildThorondorPythonAgent(config),
    systemd: buildThorondorSystemdUnit(config),
    installScript: buildThorondorInstallScript(config),
    instructions: buildThorondorInstallInstructions(config)
  };
}

export function buildThorondorPythonAgent(config) {
  const moduleFlags = THORONDOR_MODULE_KEYS.reduce((acc, item) => {
    acc[item.key] = !!config.modules?.[item.key];
    return acc;
  }, {});

  return `#!/usr/bin/env python3
import json
import os
import platform
import re
import shutil
import socket
import subprocess
import sys
import time
from datetime import datetime
from hashlib import sha256
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

try:
    import psutil
except ImportError:
    print("ERROR: falta psutil. Ejecuta: python3 -m pip install psutil", file=sys.stderr)
    sys.exit(1)

HOST_LABEL = ${JSON.stringify(config.displayName)}
SYSTEM_NAME = ${JSON.stringify(config.systemName)}
DISTRO = ${JSON.stringify(config.distro)}
OS_VERSION = ${JSON.stringify(config.osVersion)}
LISTEN_HOST = "0.0.0.0"
LISTEN_PORT = ${Number(config.port) || 8765}
POLL_INTERVAL_SECONDS = ${Number(config.intervalSeconds) || 30}
INSTALL_USER = ${JSON.stringify(config.installUser || "thorondor")}
MODULES = {
    "systemMetrics": ${serializeBoolean(moduleFlags.systemMetrics)},
    "securityLogs": ${serializeBoolean(moduleFlags.securityLogs)},
    "sudoCommands": ${serializeBoolean(moduleFlags.sudoCommands)},
    "fileIntegrity": ${serializeBoolean(moduleFlags.fileIntegrity)},
    "networkConnections": ${serializeBoolean(moduleFlags.networkConnections)},
    "applicationLogs": ${serializeBoolean(moduleFlags.applicationLogs)},
}
ADDITIONAL_LOG_PATHS = ${pythonList(config.logPaths)}
CRITICAL_FILES = ["/etc/passwd", "/etc/shadow", "/etc/sudoers"]
BASELINE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".thorondor-baseline.json")
MAX_LOG_LINES = 60
HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
}


def now_iso():
    return datetime.utcnow().isoformat() + "Z"


def run_command(command):
    try:
        completed = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=12,
            check=False
        )
        return completed.stdout.strip() or completed.stderr.strip()
    except Exception as exc:
        return f"ERROR: {exc}"


def find_local_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except Exception:
        return socket.gethostbyname(socket.gethostname())


def read_tail(path, lines=MAX_LOG_LINES):
    if not path or not os.path.exists(path):
        return []
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as handler:
            content = handler.readlines()[-lines:]
        return [line.rstrip("\\n") for line in content]
    except Exception as exc:
        return [f"ERROR leyendo {path}: {exc}"]


def get_auth_log_path():
    candidates = ["/var/log/auth.log", "/var/log/secure"]
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return ""


def detect_syslog_path():
    candidates = ["/var/log/syslog", "/var/log/messages"]
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return ""


def file_hash(path):
    if not os.path.exists(path):
        return ""
    digest = sha256()
    with open(path, "rb") as handler:
        while True:
            chunk = handler.read(4096)
            if not chunk:
                break
            digest.update(chunk)
    return digest.hexdigest()


def load_baseline():
    if not os.path.exists(BASELINE_PATH):
        return {}
    try:
        with open(BASELINE_PATH, "r", encoding="utf-8") as handler:
            return json.load(handler)
    except Exception:
        return {}


def save_baseline(data):
    try:
        with open(BASELINE_PATH, "w", encoding="utf-8") as handler:
            json.dump(data, handler, indent=2)
    except Exception:
        pass


def collect_integrity_events():
    baseline = load_baseline()
    current = {}
    events = []

    for path in CRITICAL_FILES:
        new_hash = file_hash(path)
        current[path] = new_hash
        old_hash = baseline.get(path)
        if old_hash and new_hash and old_hash != new_hash:
            events.append({
                "kind": "critical_file_change",
                "file": path,
                "oldHash": old_hash,
                "newHash": new_hash,
                "timestamp": now_iso()
            })

    save_baseline(current)
    return events


def collect_processes():
    processes = []
    for process in psutil.process_iter(["pid", "name", "username", "cpu_percent", "memory_percent"]):
        try:
            info = process.info
            processes.append({
                "pid": info.get("pid"),
                "name": info.get("name"),
                "user": info.get("username"),
                "cpuPercent": round(info.get("cpu_percent") or 0, 2),
                "memoryPercent": round(info.get("memory_percent") or 0, 2)
            })
        except Exception:
            continue

    processes.sort(key=lambda item: (item["cpuPercent"], item["memoryPercent"]), reverse=True)
    return processes[:15]


def collect_open_ports():
    ports = []
    try:
        for connection in psutil.net_connections(kind="inet"):
            if connection.status == psutil.CONN_LISTEN and connection.laddr:
                ports.append({
                    "ip": connection.laddr.ip,
                    "port": connection.laddr.port,
                    "proto": "tcp"
                })
    except Exception:
        pass
    return ports


def collect_network_interfaces():
    payload = []
    addresses = psutil.net_if_addrs()
    counters = psutil.net_io_counters(pernic=True)

    for name, addrs in addresses.items():
        ipv4 = [item.address for item in addrs if getattr(item, "family", None) == socket.AF_INET]
        stats = counters.get(name)
        payload.append({
            "name": name,
            "ipv4": ipv4,
            "bytesSent": getattr(stats, "bytes_sent", 0),
            "bytesRecv": getattr(stats, "bytes_recv", 0)
        })
    return payload


def collect_users():
    result = []
    try:
        for user in psutil.users():
            result.append({
                "name": user.name,
                "terminal": user.terminal,
                "host": user.host,
                "started": user.started
            })
    except Exception:
        pass
    return result


def collect_temperatures():
    try:
        temps = psutil.sensors_temperatures()
        output = []
        for key, readings in temps.items():
            for reading in readings:
                output.append({
                    "source": key,
                    "label": reading.label or key,
                    "current": reading.current
                })
        return output
    except Exception:
        return []


def parse_auth_events(lines):
    events = []
    for line in lines:
        lower = line.lower()
        timestamp = now_iso()
        ip_match = re.search(r"(\\d+\\.\\d+\\.\\d+\\.\\d+)", line)
        user_match = re.search(r"for\\s+(invalid user\\s+)?([a-zA-Z0-9._-]+)", line)
        username = user_match.group(2) if user_match else "desconocido"
        ip_address = ip_match.group(1) if ip_match else "sin-ip"

        if "failed password" in lower or "authentication failure" in lower:
            events.append({
                "kind": "failed_login",
                "user": username,
                "sourceIp": ip_address,
                "message": line,
                "timestamp": timestamp
            })
        elif "accepted password" in lower or "session opened" in lower:
            events.append({
                "kind": "successful_login",
                "user": username,
                "sourceIp": ip_address,
                "message": line,
                "timestamp": timestamp
            })
        elif "sudo" in lower:
            events.append({
                "kind": "sudo_command",
                "user": username,
                "sourceIp": ip_address,
                "message": line,
                "timestamp": timestamp
            })
        elif "useradd" in lower or "new user" in lower or "groupadd" in lower:
            events.append({
                "kind": "new_user",
                "subject": username,
                "message": line,
                "timestamp": timestamp
            })
    return events[-80:]


def collect_security():
    auth_log = get_auth_log_path()
    auth_lines = read_tail(auth_log, MAX_LOG_LINES)
    events = parse_auth_events(auth_lines)

    if MODULES["fileIntegrity"]:
        events.extend(collect_integrity_events())

    return {
        "authLogPath": auth_log,
        "events": events,
        "authTail": auth_lines
    }


def collect_logs():
    syslog_path = detect_syslog_path()
    journal_output = run_command(["journalctl", "-n", str(MAX_LOG_LINES), "--no-pager"])
    custom_logs = []
    for path in ADDITIONAL_LOG_PATHS:
        custom_logs.append({
            "path": path,
            "lines": read_tail(path, MAX_LOG_LINES)
        })

    kernel_errors = run_command(["sh", "-c", "dmesg | grep -i error | tail -n 25"])

    return {
        "syslogPath": syslog_path,
        "syslogTail": read_tail(syslog_path, MAX_LOG_LINES),
        "journalTail": journal_output.splitlines()[-MAX_LOG_LINES:],
        "kernelErrors": kernel_errors.splitlines() if kernel_errors else [],
        "customLogs": custom_logs
    }


def collect_payload():
    vm = psutil.virtual_memory()
    swap = psutil.swap_memory()
    partitions = []
    for partition in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            partitions.append({
                "device": partition.device,
                "mountpoint": partition.mountpoint,
                "fstype": partition.fstype,
                "percent": usage.percent,
                "used": usage.used,
                "total": usage.total
            })
        except Exception:
            continue

    cpu_per_core = psutil.cpu_percent(interval=0.25, percpu=True)
    cpu_total = psutil.cpu_percent(interval=0.15)
    boot_seconds = time.time() - psutil.boot_time()
    loadavg = os.getloadavg() if hasattr(os, "getloadavg") else (0, 0, 0)

    security = collect_security() if MODULES["securityLogs"] or MODULES["sudoCommands"] or MODULES["fileIntegrity"] else {"events": [], "authTail": [], "authLogPath": ""}
    logs = collect_logs()

    payload = {
        "agent": {
            "hostLabel": HOST_LABEL,
            "systemName": SYSTEM_NAME,
            "distro": DISTRO,
            "osVersion": OS_VERSION,
            "installUser": INSTALL_USER,
            "listenPort": LISTEN_PORT,
            "modules": MODULES,
            "generatedAt": now_iso()
        },
        "heartbeat": now_iso(),
        "system": {
            "hostname": socket.gethostname(),
            "localIp": find_local_ip(),
            "os": platform.system(),
            "kernel": platform.release(),
            "architecture": platform.machine(),
            "uptimeSeconds": int(boot_seconds),
            "connectedUsers": collect_users(),
            "loadAverage": list(loadavg)
        },
        "metrics": {
            "cpuTotal": cpu_total,
            "cpuPerCore": cpu_per_core,
            "memoryPercent": vm.percent,
            "memoryUsed": vm.used,
            "memoryTotal": vm.total,
            "swapPercent": swap.percent,
            "swapUsed": swap.used,
            "swapTotal": swap.total,
            "disks": partitions,
            "processes": collect_processes(),
            "interfaces": collect_network_interfaces(),
            "temperatures": collect_temperatures(),
            "openPorts": collect_open_ports()
        },
        "security": security,
        "logs": logs,
        "commands": {
            "who": run_command(["who"]),
            "w": run_command(["w"]),
            "systemctl": run_command(["systemctl", "--type=service", "--state=running", "--no-pager", "--no-legend"]),
            "cron": run_command(["sh", "-c", "crontab -l 2>/dev/null || true"])
        }
    }
    return payload


class ThorondorHandler(BaseHTTPRequestHandler):
    def _write_json(self, status_code, payload):
        body = json.dumps(payload, indent=2).encode("utf-8")
        self.send_response(status_code)
        for key, value in HEADERS.items():
            self.send_header(key, value)
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        for key, value in HEADERS.items():
            self.send_header(key, value)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/health":
            self._write_json(200, {
                "status": "ok",
                "service": SYSTEM_NAME,
                "heartbeat": now_iso(),
                "port": LISTEN_PORT
            })
            return

        if parsed.path in ["/telemetry", "/logs"]:
            payload = collect_payload()
            if parsed.path == "/logs":
                self._write_json(200, payload["logs"])
            else:
                self._write_json(200, payload)
            return

        self._write_json(404, {"error": "not found"})

    def log_message(self, format_string, *args):
        return


class ThorondorHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True
    allow_reuse_port = True


def main():
    print(f"[thorondor] iniciando agente {SYSTEM_NAME} en 0.0.0.0:{LISTEN_PORT}")
    server = ThorondorHTTPServer((LISTEN_HOST, LISTEN_PORT), ThorondorHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
`;
}

export function buildThorondorSystemdUnit(config) {
  const serviceName = sanitizeFileName(config.serviceName || "thorondor-agent");
  return `[Unit]
Description=Thorondor SIEM Agent (${config.systemName})
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${config.installUser || "thorondor"}
WorkingDirectory=/opt/thorondor-agent
ExecStart=/usr/bin/python3 /opt/thorondor-agent/${serviceName}.py
Restart=always
RestartSec=10
TimeoutStopSec=10
KillMode=mixed
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
`;
}

export function buildThorondorInstallScript(config) {
  const serviceName = sanitizeFileName(config.serviceName || "thorondor-agent");
  const systemdBlock = config.generateSystemd
    ? `
cat > "/tmp/${serviceName}.service" <<'UNIT'
${buildThorondorSystemdUnit(config)}
UNIT

sudo cp "/tmp/${serviceName}.service" "/etc/systemd/system/${serviceName}.service"
sudo systemctl daemon-reload
sudo systemctl enable --now "${serviceName}.service"
`
    : "";
  const completionMessage = config.generateSystemd
    ? `echo "Instalacion completada. Comprueba el servicio con:"
echo "sudo systemctl status ${serviceName}.service"`
    : `echo "Instalacion completada. Prueba el agente manualmente con:"
echo "python3 $INSTALL_DIR/${serviceName}.py"`;

  return `#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${serviceName}"
INSTALL_DIR="/opt/thorondor-agent"
INSTALL_USER="${config.installUser || "thorondor"}"
PORT="${Number(config.port) || 8765}"

if ! id "$INSTALL_USER" >/dev/null 2>&1; then
  sudo useradd --system --create-home --shell /usr/sbin/nologin "$INSTALL_USER"
fi

sudo mkdir -p "$INSTALL_DIR"
sudo cp "./${serviceName}.py" "$INSTALL_DIR/${serviceName}.py"
sudo chown -R "$INSTALL_USER:$INSTALL_USER" "$INSTALL_DIR"
sudo chmod 750 "$INSTALL_DIR/${serviceName}.py"

sudo usermod -aG adm "$INSTALL_USER" || true
sudo usermod -aG systemd-journal "$INSTALL_USER" || true

if command -v apt >/dev/null 2>&1; then
  sudo apt update
  sudo apt install -y python3 python3-pip lm-sensors
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf install -y python3 python3-pip lm_sensors
elif command -v pacman >/dev/null 2>&1; then
  sudo pacman -Sy --noconfirm python python-pip lm_sensors
fi

sudo python3 -m pip install --upgrade pip
sudo python3 -m pip install psutil

${systemdBlock}

if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow "$PORT/tcp" || true
fi

${completionMessage}
`;
}

export function buildThorondorInstallInstructions(config) {
  const serviceName = sanitizeFileName(config.serviceName || "thorondor-agent");
  const installUser = config.installUser || "thorondor";
  const systemdBlock = config.generateSystemd
    ? `\n5. Crear el servicio systemd:\n\`\`\`bash\nsudo cp ${serviceName}.service /etc/systemd/system/${serviceName}.service\nsudo systemctl daemon-reload\nsudo systemctl enable --now ${serviceName}.service\nsudo systemctl status ${serviceName}.service\n\`\`\`\n`
    : "";

  return `## Instalacion guiada para ${config.systemName}

1. Crear carpeta de trabajo:
\`\`\`bash
sudo mkdir -p /opt/thorondor-agent
sudo chown -R $USER:$USER /opt/thorondor-agent
cd /opt/thorondor-agent
\`\`\`

2. Copiar el agente generado como \`${serviceName}.py\`.

3. Instalar dependencias:
\`\`\`bash
python3 -m pip install --upgrade pip
python3 -m pip install psutil
\`\`\`

4. Dar permisos y probar:
\`\`\`bash
sudo usermod -aG adm ${installUser}
sudo usermod -aG systemd-journal ${installUser}
python3 ${serviceName}.py
\`\`\`
${systemdBlock}
6. Validar respuesta HTTP:
\`\`\`bash
curl http://${config.hostIp || "127.0.0.1"}:${Number(config.port) || 8765}/health
curl http://${config.hostIp || "127.0.0.1"}:${Number(config.port) || 8765}/telemetry
\`\`\`

7. Registrar este host en el dashboard y comprobar que aparece con heartbeat.
`;
}

function sanitizeFileName(value) {
  return String(value || "thorondor-agent")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "thorondor-agent";
}
