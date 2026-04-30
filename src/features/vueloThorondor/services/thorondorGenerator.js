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

  const isWindows = config.targetOs === "windows";

  return {
    agentFileName: "thorondor-agent.py",
    serviceFileName: isWindows ? null : "thorondor-agent.service",
    installFileName: isWindows ? "install-thorondor-agent.ps1" : "install-thorondor-agent.sh",
    python: buildThorondorPythonAgent(config),
    systemd: isWindows ? null : buildThorondorSystemdUnit(config),
    installScript: isWindows ? buildThorondorWindowsInstallScript(config) : buildThorondorInstallScript(config),
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
IS_WINDOWS = platform.system() == "Windows"
MODULES = {
    "systemMetrics": ${serializeBoolean(moduleFlags.systemMetrics)},
    "securityLogs": ${serializeBoolean(moduleFlags.securityLogs)},
    "sudoCommands": ${serializeBoolean(moduleFlags.sudoCommands)},
    "fileIntegrity": ${serializeBoolean(moduleFlags.fileIntegrity)},
    "networkConnections": ${serializeBoolean(moduleFlags.networkConnections)},
    "applicationLogs": ${serializeBoolean(moduleFlags.applicationLogs)},
    "networkRates": ${serializeBoolean(moduleFlags.networkRates)},
    "establishedConnections": ${serializeBoolean(moduleFlags.establishedConnections)},
    "hardwareMonitor": ${serializeBoolean(moduleFlags.hardwareMonitor)},
    "dockerMonitor": ${serializeBoolean(moduleFlags.dockerMonitor)},
    "updateMonitor": ${serializeBoolean(moduleFlags.updateMonitor)},
    "loginHistory": ${serializeBoolean(moduleFlags.loginHistory)},
    "smartMonitor": ${serializeBoolean(moduleFlags.smartMonitor)},
}
ADDITIONAL_LOG_PATHS = ${pythonList(config.logPaths)}
CRITICAL_FILES = (
    [
        os.path.join(os.environ.get("SystemRoot", "C:\\\\Windows"), "System32", "drivers", "etc", "hosts"),
        os.path.join(os.environ.get("SystemRoot", "C:\\\\Windows"), "System32", "drivers", "etc", "services"),
    ]
    if IS_WINDOWS
    else ["/etc/passwd", "/etc/shadow", "/etc/sudoers", "/etc/hosts"]
)
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
    if IS_WINDOWS:
        return "Windows Security Event Log"
    candidates = ["/var/log/auth.log", "/var/log/secure"]
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return ""


def detect_syslog_path():
    if IS_WINDOWS:
        return ""
    candidates = ["/var/log/syslog", "/var/log/messages"]
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return ""


def collect_windows_security_events():
    events = []
    try:
        ps_script = (
            "Get-WinEvent -LogName Security -MaxEvents 100 "
            "-FilterXPath '*[System[EventID=4624 or EventID=4625 or EventID=4648]]' "
            "2>$null | Select-Object @{N='id';E={$_.Id}},@{N='ts';E={$_.TimeCreated.ToString('o')}},@{N='msg';E={$_.Message}} "
            "| ConvertTo-Json -Depth 2 -Compress"
        )
        result = subprocess.run(
            ["powershell", "-NoProfile", "-NonInteractive", "-Command", ps_script],
            capture_output=True, text=True, timeout=15
        )
        if result.returncode == 0 and result.stdout.strip():
            raw = json.loads(result.stdout)
            if isinstance(raw, dict):
                raw = [raw]
            for evt in raw:
                eid = evt.get("id")
                ts = evt.get("ts", now_iso())
                msg = str(evt.get("msg", ""))[:300]
                if eid == 4625:
                    events.append({"kind": "failed_login", "user": "unknown", "sourceIp": "win", "message": msg, "timestamp": ts})
                elif eid in (4624, 4648):
                    events.append({"kind": "successful_login", "user": "unknown", "sourceIp": "win", "message": msg, "timestamp": ts})
    except Exception as exc:
        events.append({"kind": "error", "message": str(exc), "timestamp": now_iso()})
    return events[-80:]


def collect_windows_logs():
    try:
        ps_script = (
            "Get-WinEvent -LogName System -MaxEvents 60 2>$null "
            "| Select-Object @{N='ts';E={$_.TimeCreated.ToString('o')}},@{N='lvl';E={$_.LevelDisplayName}},@{N='msg';E={$_.Message}} "
            "| ConvertTo-Json -Depth 2 -Compress"
        )
        result = subprocess.run(
            ["powershell", "-NoProfile", "-NonInteractive", "-Command", ps_script],
            capture_output=True, text=True, timeout=15
        )
        lines = []
        if result.returncode == 0 and result.stdout.strip():
            raw = json.loads(result.stdout)
            if isinstance(raw, dict):
                raw = [raw]
            lines = [f"[{e.get('ts','')}] [{e.get('lvl','')}] {str(e.get('msg',''))[:200]}" for e in raw]
        return lines
    except Exception:
        return []


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
    for process in psutil.process_iter(["pid", "name", "username", "cpu_percent", "memory_percent", "cmdline"]):
        try:
            info = process.info
            cmdline = info.get("cmdline") or []
            processes.append({
                "pid": info.get("pid"),
                "name": info.get("name"),
                "user": info.get("username"),
                "cpuPercent": round(info.get("cpu_percent") or 0, 2),
                "memoryPercent": round(info.get("memory_percent") or 0, 2),
                "cmdline": " ".join(cmdline[:8]) if cmdline else ""
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
    if IS_WINDOWS:
        events = collect_windows_security_events()
        if MODULES["fileIntegrity"]:
            events.extend(collect_integrity_events())
        return {"authLogPath": auth_log, "events": events, "authTail": []}

    auth_lines = read_tail(auth_log, MAX_LOG_LINES)
    events = parse_auth_events(auth_lines)
    if MODULES["fileIntegrity"]:
        events.extend(collect_integrity_events())
    return {"authLogPath": auth_log, "events": events, "authTail": auth_lines}


def collect_logs():
    custom_logs = []
    for path in ADDITIONAL_LOG_PATHS:
        custom_logs.append({"path": path, "lines": read_tail(path, MAX_LOG_LINES)})

    if IS_WINDOWS:
        win_lines = collect_windows_logs()
        return {
            "syslogPath": "",
            "syslogTail": [],
            "journalTail": win_lines,
            "kernelErrors": [],
            "customLogs": custom_logs
        }

    syslog_path = detect_syslog_path()
    journal_output = run_command(["journalctl", "-n", str(MAX_LOG_LINES), "--no-pager"])
    kernel_errors = run_command(["sh", "-c", "dmesg | grep -i error | tail -n 25"])
    return {
        "syslogPath": syslog_path,
        "syslogTail": read_tail(syslog_path, MAX_LOG_LINES),
        "journalTail": journal_output.splitlines()[-MAX_LOG_LINES:],
        "kernelErrors": kernel_errors.splitlines() if kernel_errors else [],
        "customLogs": custom_logs
    }


_NET_IO_PREV = {}
_NET_IO_LOCK = threading.Lock()


def collect_network_rates():
    global _NET_IO_PREV
    counters = psutil.net_io_counters(pernic=True)
    now = time.time()
    rates = []
    with _NET_IO_LOCK:
        for name, stats in counters.items():
            prev = _NET_IO_PREV.get(name)
            elapsed = now - prev["ts"] if prev else 0
            if prev and elapsed > 0:
                send_rate = (stats.bytes_sent - prev["sent"]) / elapsed
                recv_rate = (stats.bytes_recv - prev["recv"]) / elapsed
            else:
                send_rate = 0
                recv_rate = 0
            rates.append({
                "name": name,
                "sendBytesPerSec": round(max(send_rate, 0), 1),
                "recvBytesPerSec": round(max(recv_rate, 0), 1)
            })
            _NET_IO_PREV[name] = {"ts": now, "sent": stats.bytes_sent, "recv": stats.bytes_recv}
    return rates


def collect_established_connections():
    result = []
    try:
        for conn in psutil.net_connections(kind="inet"):
            if conn.status == "ESTABLISHED" and conn.raddr:
                proc_name = ""
                try:
                    if conn.pid:
                        proc_name = psutil.Process(conn.pid).name()
                except Exception:
                    pass
                result.append({
                    "pid": conn.pid,
                    "process": proc_name,
                    "localAddr": f"{conn.laddr.ip}:{conn.laddr.port}" if conn.laddr else "",
                    "remoteAddr": f"{conn.raddr.ip}:{conn.raddr.port}" if conn.raddr else "",
                    "status": conn.status
                })
    except Exception:
        pass
    return result[:50]


def collect_failed_services():
    if IS_WINDOWS:
        try:
            ps = "Get-Service | Where-Object {$_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic'} | Select-Object Name,DisplayName | ConvertTo-Json -Compress"
            result = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command", ps], capture_output=True, text=True, timeout=10)
            if result.returncode == 0 and result.stdout.strip():
                raw = json.loads(result.stdout)
                if isinstance(raw, dict):
                    raw = [raw]
                return [{"name": s.get("Name", ""), "description": s.get("DisplayName", ""), "activeState": "stopped"} for s in raw]
        except Exception:
            pass
        return []
    try:
        out = run_command(["systemctl", "--failed", "--no-pager", "--no-legend", "--plain"])
        services = []
        for line in out.splitlines():
            parts = line.split()
            if parts:
                services.append({
                    "name": parts[0],
                    "activeState": parts[1] if len(parts) > 1 else "failed",
                    "subState": parts[2] if len(parts) > 2 else ""
                })
        return services
    except Exception:
        return []


def collect_fans():
    if IS_WINDOWS:
        return []
    try:
        fans = psutil.sensors_fans()
        result = []
        for source, readings in fans.items():
            for reading in readings:
                result.append({"source": source, "label": reading.label or source, "rpm": reading.current})
        return result
    except Exception:
        return []


def collect_battery():
    try:
        bat = psutil.sensors_battery()
        if bat is None:
            return None
        secs = bat.secsleft if bat.secsleft not in (psutil.POWER_TIME_UNLIMITED, psutil.POWER_TIME_UNKNOWN) else -1
        return {
            "percent": round(bat.percent, 1),
            "secsLeft": secs,
            "powerPlugged": bat.power_plugged
        }
    except Exception:
        return None


def collect_smart_data():
    if IS_WINDOWS:
        return []
    if not shutil.which("smartctl"):
        return []
    try:
        lsblk = run_command(["lsblk", "-dno", "NAME,TYPE"])
        disks = []
        for line in lsblk.splitlines():
            parts = line.split()
            if len(parts) >= 2 and parts[1] == "disk":
                dev = f"/dev/{parts[0]}"
                out = run_command(["smartctl", "-A", "-j", dev])
                try:
                    data = json.loads(out)
                    attrs = data.get("ata_smart_attributes", {}).get("table", [])
                    useful = {}
                    for attr in attrs:
                        name = attr.get("name", "")
                        if name in ("Reallocated_Sector_Ct", "Pending_Sector_Count",
                                    "Uncorrectable_Sector_Count", "Temperature_Celsius", "Power_On_Hours"):
                            useful[name] = attr.get("raw", {}).get("value", 0)
                    disks.append({"device": dev, "attributes": useful})
                except Exception:
                    disks.append({"device": dev, "attributes": {}})
        return disks
    except Exception:
        return []


def collect_login_history():
    if IS_WINDOWS:
        return []
    try:
        out = run_command(["last", "-n", "30", "-F"])
        lines = [line for line in out.splitlines()
                 if line.strip() and not line.startswith("wtmp") and "reboot" not in line.lower()]
        return lines[:30]
    except Exception:
        return []


def collect_pending_updates():
    if IS_WINDOWS:
        try:
            ps = "(New-Object -ComObject Microsoft.Update.Session).CreateUpdateSearcher().Search('IsInstalled=0').Updates | ForEach-Object {$_.Title} | ConvertTo-Json -Compress"
            result = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command", ps], capture_output=True, text=True, timeout=30)
            if result.returncode == 0 and result.stdout.strip():
                raw = json.loads(result.stdout)
                if isinstance(raw, str):
                    raw = [raw]
                return {"count": len(raw), "updates": raw[:10]}
        except Exception:
            pass
        return {"count": 0, "updates": []}
    try:
        if shutil.which("apt"):
            out = run_command(["apt", "list", "--upgradable", "-qq"])
            lines = [line for line in out.splitlines() if line.strip() and line != "Listing..."]
            return {"count": len(lines), "updates": lines[:10]}
        if shutil.which("dnf"):
            out = run_command(["dnf", "check-update", "-q"])
            lines = [line for line in out.splitlines() if line.strip()]
            return {"count": len(lines), "updates": lines[:10]}
        if shutil.which("pacman"):
            out = run_command(["checkupdates"])
            lines = [line for line in out.splitlines() if line.strip()]
            return {"count": len(lines), "updates": lines[:10]}
    except Exception:
        pass
    return {"count": 0, "updates": []}


def collect_hardware_info():
    info = {
        "cpuModel": "",
        "cpuCoresPhysical": psutil.cpu_count(logical=False),
        "cpuCoresLogical": psutil.cpu_count(logical=True),
        "cpuFreqMhz": 0,
        "totalRamGb": round(psutil.virtual_memory().total / 1024 ** 3, 2)
    }
    try:
        freq = psutil.cpu_freq()
        if freq:
            info["cpuFreqMhz"] = round(freq.current, 0)
    except Exception:
        pass
    if IS_WINDOWS:
        out = run_command(["powershell", "-NoProfile", "-NonInteractive", "-Command", "(Get-CimInstance Win32_Processor).Name"])
        info["cpuModel"] = out.strip()
    else:
        out = run_command(["sh", "-c", "grep 'model name' /proc/cpuinfo 2>/dev/null | head -1 | cut -d: -f2"])
        info["cpuModel"] = out.strip()
    return info


def collect_docker_containers():
    if not shutil.which("docker"):
        return []
    try:
        out = run_command(["docker", "ps", "-a", "--format", "{{.ID}}|{{.Names}}|{{.Image}}|{{.Status}}|{{.Ports}}"])
        containers = []
        for line in out.splitlines():
            parts = line.split("|")
            if len(parts) >= 4:
                containers.append({
                    "id": parts[0][:12],
                    "name": parts[1],
                    "image": parts[2],
                    "status": parts[3],
                    "ports": parts[4] if len(parts) > 4 else ""
                })
        return containers
    except Exception:
        return []


def collect_gpu_info():
    if IS_WINDOWS:
        try:
            ps = "Get-CimInstance Win32_VideoController | Select-Object Name,AdapterRAM,DriverVersion | ConvertTo-Json -Compress"
            result = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command", ps], capture_output=True, text=True, timeout=10)
            if result.returncode == 0 and result.stdout.strip():
                raw = json.loads(result.stdout)
                if isinstance(raw, dict):
                    raw = [raw]
                return [{"name": g.get("Name", ""), "vramBytes": g.get("AdapterRAM", 0), "driver": g.get("DriverVersion", "")} for g in raw]
        except Exception:
            pass
        return []
    if shutil.which("nvidia-smi"):
        try:
            out = run_command(["nvidia-smi", "--query-gpu=name,memory.total,temperature.gpu,utilization.gpu", "--format=csv,noheader,nounits"])
            gpus = []
            for line in out.splitlines():
                parts = [p.strip() for p in line.split(",")]
                if len(parts) >= 4:
                    gpus.append({
                        "name": parts[0],
                        "vramMb": int(parts[1]) if parts[1].isdigit() else 0,
                        "tempC": int(parts[2]) if parts[2].isdigit() else 0,
                        "utilPercent": int(parts[3]) if parts[3].isdigit() else 0
                    })
            return gpus
        except Exception:
            pass
    return []


def collect_dns_check():
    targets = ["google.com", "cloudflare.com", "1.1.1.1"]
    result = []
    for target in targets:
        try:
            addr = socket.getaddrinfo(target, None, socket.AF_INET, proto=socket.IPPROTO_TCP)[0][4][0]
            result.append({"target": target, "resolved": addr, "ok": True})
        except Exception as exc:
            result.append({"target": target, "resolved": "", "ok": False, "error": str(exc)})
    return result


VIRTUAL_FSTYPES = {
    "tmpfs", "squashfs", "devtmpfs", "proc", "sysfs", "cgroup", "cgroup2",
    "pstore", "debugfs", "tracefs", "securityfs", "binfmt_misc", "overlay",
    "aufs", "ramfs", "hugetlbfs", "fusectl", "bpf", "nsfs", "configfs",
    "rpc_pipefs", "mqueue", "efivarfs"
}


def collect_payload():
    vm = psutil.virtual_memory()
    swap = psutil.swap_memory()
    partitions = []
    for partition in psutil.disk_partitions():
        if not partition.fstype or partition.fstype in VIRTUAL_FSTYPES:
            continue
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
            "targetOs": "windows" if IS_WINDOWS else "linux",
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
            "openPorts": collect_open_ports(),
            "networkRates": collect_network_rates() if MODULES.get("networkRates") else [],
            "establishedConnections": collect_established_connections() if MODULES.get("establishedConnections") else [],
            "failedServices": collect_failed_services(),
            "fans": collect_fans() if MODULES.get("hardwareMonitor") else [],
            "battery": collect_battery() if MODULES.get("hardwareMonitor") else None,
            "gpu": collect_gpu_info() if MODULES.get("hardwareMonitor") else [],
            "hardware": collect_hardware_info(),
            "docker": collect_docker_containers() if MODULES.get("dockerMonitor") else [],
            "dns": collect_dns_check(),
            "smartData": collect_smart_data() if MODULES.get("smartMonitor") else [],
            "loginHistory": collect_login_history() if MODULES.get("loginHistory") else [],
            "pendingUpdates": collect_pending_updates() if MODULES.get("updateMonitor") else {"count": 0, "updates": []}
        },
        "security": security,
        "logs": logs,
        "commands": (
            {
                "who": run_command(["powershell", "-NoProfile", "-NonInteractive", "-Command", "query user 2>$null"]),
                "w": run_command(["powershell", "-NoProfile", "-NonInteractive", "-Command", "Get-Process | Sort-Object CPU -Descending | Select-Object -First 15 | ConvertTo-Json -Depth 1 -Compress"]),
                "systemctl": run_command(["powershell", "-NoProfile", "-NonInteractive", "-Command", "Get-Service | Where-Object {$_.Status -eq 'Running'} | Select-Object Name,DisplayName | ConvertTo-Json -Compress"]),
                "cron": run_command(["powershell", "-NoProfile", "-NonInteractive", "-Command", "Get-ScheduledTask | Where-Object {$_.State -eq 'Ready' -or $_.State -eq 'Running'} | Select-Object TaskName,State | ConvertTo-Json -Compress"])
            }
            if IS_WINDOWS
            else {
                "who": run_command(["who"]),
                "w": run_command(["w"]),
                "systemctl": run_command(["systemctl", "--type=service", "--state=running", "--no-pager", "--no-legend"]),
                "cron": run_command(["sh", "-c", "crontab -l 2>/dev/null || true"])
            }
        )
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
    if hasattr(socket, "SO_REUSEPORT"):
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
  return `[Unit]
Description=Thorondor SIEM Agent (${config.systemName})
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${config.installUser || "thorondor"}
WorkingDirectory=/opt/thorondor-agent
ExecStart=/usr/bin/python3 /opt/thorondor-agent/thorondor-agent.py
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
  const systemdBlock = config.generateSystemd
    ? `
cat > "/tmp/thorondor-agent.service" <<'UNIT'
${buildThorondorSystemdUnit(config)}
UNIT

sudo cp "/tmp/thorondor-agent.service" "/etc/systemd/system/thorondor-agent.service"
sudo systemctl daemon-reload
sudo systemctl enable --now "thorondor-agent.service"
`
    : "";
  const completionMessage = config.generateSystemd
    ? `echo "Instalacion completada. Comprueba el servicio con:"
echo "sudo systemctl status thorondor-agent.service"`
    : `echo "Instalacion completada. Prueba el agente manualmente con:"
echo "python3 $INSTALL_DIR/thorondor-agent.py"`;

  return `#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="/opt/thorondor-agent"
INSTALL_USER="${config.installUser || "thorondor"}"
PORT="${Number(config.port) || 8765}"

if ! id "$INSTALL_USER" >/dev/null 2>&1; then
  sudo useradd --system --create-home --shell /usr/sbin/nologin "$INSTALL_USER"
fi

sudo mkdir -p "$INSTALL_DIR"
sudo cp "./thorondor-agent.py" "$INSTALL_DIR/thorondor-agent.py"
sudo chown -R "$INSTALL_USER:$INSTALL_USER" "$INSTALL_DIR"
sudo chmod 750 "$INSTALL_DIR/thorondor-agent.py"

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
  const installUser = config.installUser || "thorondor";
  const systemdBlock = config.generateSystemd
    ? `\n5. Crear el servicio systemd:\n\`\`\`bash\nsudo cp thorondor-agent.service /etc/systemd/system/thorondor-agent.service\nsudo systemctl daemon-reload\nsudo systemctl enable --now thorondor-agent.service\nsudo systemctl status thorondor-agent.service\n\`\`\`\n`
    : "";

  return `## Instalacion guiada para ${config.systemName}

1. Crear carpeta de trabajo:
\`\`\`bash
sudo mkdir -p /opt/thorondor-agent
sudo chown -R $USER:$USER /opt/thorondor-agent
cd /opt/thorondor-agent
\`\`\`

2. Copiar el agente generado como \`thorondor-agent.py\`.

3. Instalar dependencias:
\`\`\`bash
python3 -m pip install --upgrade pip
python3 -m pip install psutil
\`\`\`

4. Dar permisos y probar:
\`\`\`bash
sudo usermod -aG adm ${installUser}
sudo usermod -aG systemd-journal ${installUser}
python3 thorondor-agent.py
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

export function buildThorondorWindowsInstallScript(config) {
  const port = Number(config.port) || 8765;
  const installDir = "C:\\ProgramData\\Thorondor-Agent";

  return `#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Instala el agente Thorondor en Windows como tarea programada.
.DESCRIPTION
    Crea el directorio de instalacion, instala dependencias Python
    y registra el agente como tarea programada de inicio de sistema.
    Requiere PowerShell 5.1+ y permisos de Administrador.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$INSTALL_DIR  = "${installDir}"
$AGENT_FILE   = "thorondor-agent.py"
$TASK_NAME    = "ThorondorAgent"
$PORT         = ${port}

Write-Host "=== Thorondor Agent Installer ===" -ForegroundColor Cyan

# 1. Crear directorio de instalacion
Write-Host "[1/6] Creando directorio $INSTALL_DIR..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
Copy-Item -Path ".\\$AGENT_FILE" -Destination "$INSTALL_DIR\\$AGENT_FILE" -Force

# 2. Verificar Python
Write-Host "[2/6] Verificando Python..." -ForegroundColor Yellow
$python = $null
foreach ($cmd in @("python", "python3", "py")) {
    try {
        $ver = & $cmd --version 2>&1
        if ($ver -match "Python 3\\.(\\d+)") {
            $python = $cmd
            Write-Host "    Python encontrado: $ver" -ForegroundColor Green
            break
        }
    } catch { }
}
if (-not $python) {
    Write-Host "    Python no encontrado. Instalando via winget..." -ForegroundColor Yellow
    winget install --id Python.Python.3.11 --silent --accept-source-agreements --accept-package-agreements
    $python = "python"
}

# 3. Instalar psutil
Write-Host "[3/6] Instalando dependencias Python..." -ForegroundColor Yellow
& $python -m pip install --upgrade pip --quiet
& $python -m pip install psutil --quiet
Write-Host "    psutil instalado correctamente." -ForegroundColor Green

# 4. Regla de firewall
Write-Host "[4/6] Abriendo puerto $PORT en Windows Firewall..." -ForegroundColor Yellow
New-NetFirewallRule -DisplayName "Thorondor Agent HTTP" -Direction Inbound -Protocol TCP -LocalPort $PORT -Action Allow -Profile Any -ErrorAction SilentlyContinue | Out-Null
Write-Host "    Regla de firewall creada." -ForegroundColor Green

# 5. Crear tarea programada
Write-Host "[5/6] Registrando tarea programada '$TASK_NAME'..." -ForegroundColor Yellow
$action   = New-ScheduledTaskAction -Execute $python -Argument "$INSTALL_DIR\\$AGENT_FILE"
$trigger  = New-ScheduledTaskTrigger -AtStartup
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable -ExecutionTimeLimit (New-TimeSpan -Seconds 0)
$principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest
Unregister-ScheduledTask -TaskName $TASK_NAME -Confirm:$false -ErrorAction SilentlyContinue
Register-ScheduledTask -TaskName $TASK_NAME -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Force | Out-Null
Write-Host "    Tarea registrada correctamente." -ForegroundColor Green

# 6. Iniciar el agente inmediatamente
Write-Host "[6/6] Iniciando el agente..." -ForegroundColor Yellow
Start-ScheduledTask -TaskName $TASK_NAME
Start-Sleep -Seconds 3
$state = (Get-ScheduledTask -TaskName $TASK_NAME).State
Write-Host "    Estado de la tarea: $state" -ForegroundColor $(if ($state -eq "Running") { "Green" } else { "Yellow" })

Write-Host ""
Write-Host "=== Instalacion completada ===" -ForegroundColor Green
Write-Host "Verifica el agente con:"
Write-Host "  Invoke-RestMethod http://127.0.0.1:$PORT/health | ConvertTo-Json -Depth 3"
Write-Host ""
Write-Host "Logs del proceso:"
Write-Host "  Get-EventLog -LogName Application -Source 'ThorondorAgent' -Newest 20"
`;
}

function sanitizeFileName(value) {
  return String(value || "thorondor-agent")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "thorondor-agent";
}
