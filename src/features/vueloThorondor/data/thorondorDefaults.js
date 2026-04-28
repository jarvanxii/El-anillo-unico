export const THORONDOR_RETENTION_DAYS = 7;
export const THORONDOR_ALERT_REVIEW_STATES = ["active", "reviewed", "resolved"];
export const THORONDOR_HEARTBEAT_WARNING_MINUTES = 2;
export const THORONDOR_HEARTBEAT_CRITICAL_MINUTES = 5;
export const THORONDOR_HISTORY_LIMIT = 240;
export const THORONDOR_SECURITY_LIMIT = 500;
export const THORONDOR_LOG_LIMIT = 800;
export const THORONDOR_CONNECTION_LIMIT = 120;

export const THORONDOR_MODULE_KEYS = [
  { key: "systemMetrics", label: "Metricas de sistema" },
  { key: "securityLogs", label: "Logs de seguridad" },
  { key: "sudoCommands", label: "Comandos sudo" },
  { key: "fileIntegrity", label: "Integridad de archivos" },
  { key: "networkConnections", label: "Conexiones de red" },
  { key: "applicationLogs", label: "Logs de aplicacion" }
];

export const THORONDOR_DISTRO_OPTIONS = [
  "Ubuntu/Debian",
  "CentOS/RHEL/Rocky",
  "Arch",
  "Kali",
  "Otra"
];

export const THORONDOR_LOG_SOURCES = [
  { value: "all", label: "Todas" },
  { value: "syslog", label: "syslog" },
  { value: "journal", label: "journalctl" },
  { value: "auth", label: "auth.log / secure" },
  { value: "custom", label: "Personalizados" }
];

export const THORONDOR_ALERT_TYPES = {
  cpu: "CPU sostenida alta",
  ram: "RAM alta",
  disk: "Disco alto",
  failedLogins: "Exceso de logins fallidos",
  unknownLoginIp: "Login exitoso desde IP desconocida",
  criticalFileChange: "Cambio en archivo critico",
  heartbeat: "Agente sin heartbeat",
  sudoUnauthorized: "Comando sudo no autorizado",
  newUser: "Nuevo usuario creado",
  networkExposure: "Puerto en escucha sospechoso"
};

export function buildDefaultThorondorRuleSet() {
  return [
    {
      id: "rule-cpu-high",
      name: "CPU sostenida por encima del 85%",
      type: "cpu",
      enabled: true,
      threshold: 85,
      durationMinutes: 5,
      scope: "all",
      description: "Dispara una alerta cuando la media reciente de CPU supera el umbral."
    },
    {
      id: "rule-ram-high",
      name: "RAM por encima del 90%",
      type: "ram",
      enabled: true,
      threshold: 90,
      durationMinutes: 3,
      scope: "all",
      description: "Avisa cuando la RAM del sistema permanece muy alta."
    },
    {
      id: "rule-disk-high",
      name: "Disco por encima del 90%",
      type: "disk",
      enabled: true,
      threshold: 90,
      durationMinutes: 10,
      scope: "all",
      description: "Controla el uso de disco sobre las particiones monitorizadas."
    },
    {
      id: "rule-failed-logins",
      name: "Mas de 5 logins fallidos en 10 minutos",
      type: "failedLogins",
      enabled: true,
      threshold: 5,
      durationMinutes: 10,
      scope: "all",
      description: "Detecta picos de autenticaciones fallidas."
    },
    {
      id: "rule-heartbeat-lost",
      name: "Heartbeat ausente mas de 3 minutos",
      type: "heartbeat",
      enabled: true,
      threshold: 3,
      durationMinutes: 3,
      scope: "all",
      description: "Marca agentes que dejan de responder durante demasiado tiempo."
    },
    {
      id: "rule-critical-files",
      name: "Cambio en /etc/passwd, /etc/shadow o /etc/sudoers",
      type: "criticalFileChange",
      enabled: true,
      threshold: 1,
      durationMinutes: 1,
      scope: "all",
      description: "Dispara ante cambios de integridad en archivos criticos."
    },
    {
      id: "rule-sudo-unauthorized",
      name: "Uso de sudo fuera de usuarios autorizados",
      type: "sudoUnauthorized",
      enabled: true,
      threshold: 1,
      durationMinutes: 1,
      allowedUsers: ["root", "admin", "secops"],
      scope: "all",
      description: "Controla comandos sudo ejecutados por usuarios no permitidos."
    },
    {
      id: "rule-new-user-created",
      name: "Nuevo usuario o grupo creado",
      type: "newUser",
      enabled: true,
      threshold: 1,
      durationMinutes: 1,
      scope: "all",
      description: "Advierte cuando se detectan altas de cuentas o grupos."
    },
    {
      id: "rule-network-exposure",
      name: "Puerto sensible expuesto",
      type: "networkExposure",
      enabled: true,
      threshold: 1,
      durationMinutes: 1,
      sensitivePorts: [21, 23, 3306, 5432, 6379],
      scope: "all",
      description: "Marca puertos sensibles en escucha."
    }
  ];
}

export function buildThorondorAgentDraft(currentUrl = "") {
  let receiver = currentUrl;

  try {
    if (typeof window !== "undefined" && !receiver) {
      receiver = window.location.origin;
    }
  } catch (error) {
    receiver = currentUrl;
  }

  return {
    displayName: "PC UBUNTU DE PACO",
    systemName: "servidor-web-01",
    distro: "Ubuntu/Debian",
    osVersion: "22.04 LTS",
    receiverUrl: receiver,
    port: 8765,
    intervalSeconds: 30,
    additionalLogPaths: "/var/log/nginx/access.log\n/var/log/nginx/error.log",
    modules: {
      systemMetrics: true,
      securityLogs: true,
      sudoCommands: true,
      fileIntegrity: true,
      networkConnections: true,
      applicationLogs: true
    },
    generateSystemd: true,
    hostIp: "192.168.1.50",
    installUser: "thorondor",
    serviceName: "thorondor-agent",
    notes: ""
  };
}
