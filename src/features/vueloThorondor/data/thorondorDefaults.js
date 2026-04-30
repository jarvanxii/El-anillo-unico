export const THORONDOR_RETENTION_DAYS = 7;
export const THORONDOR_ALERT_REVIEW_STATES = ["active", "reviewed", "resolved"];
export const THORONDOR_HEARTBEAT_WARNING_MINUTES = 2;
export const THORONDOR_HEARTBEAT_CRITICAL_MINUTES = 5;
export const THORONDOR_HISTORY_LIMIT = 240;
export const THORONDOR_SECURITY_LIMIT = 500;
export const THORONDOR_LOG_LIMIT = 800;
export const THORONDOR_CONNECTION_LIMIT = 120;

export const THORONDOR_IDB_SNAPSHOT_LIMIT = 500;
export const THORONDOR_IDB_LOG_LIMIT = 2000;
export const THORONDOR_IDB_EVENT_LIMIT = 1000;
export const THORONDOR_SWEEP_INTERVAL_MS = 3_600_000;

export const THORONDOR_MODULE_KEYS = [
  { key: "systemMetrics", label: "Metricas de sistema" },
  { key: "securityLogs", label: "Logs de seguridad" },
  { key: "sudoCommands", label: "Comandos sudo" },
  { key: "fileIntegrity", label: "Integridad de archivos" },
  { key: "networkConnections", label: "Conexiones de red" },
  { key: "applicationLogs", label: "Logs de aplicacion" },
  { key: "networkRates", label: "Velocidad de red en tiempo real" },
  { key: "establishedConnections", label: "Conexiones ESTABLISHED con PID" },
  { key: "hardwareMonitor", label: "Hardware (fans, bateria, GPU)" },
  { key: "dockerMonitor", label: "Contenedores Docker" },
  { key: "updateMonitor", label: "Parches y actualizaciones pendientes" },
  { key: "loginHistory", label: "Historial de logins (last)" },
  { key: "smartMonitor", label: "Estado SMART de discos" }
];

export const THORONDOR_DISTRO_OPTIONS = [
  "Ubuntu/Debian",
  "CentOS/RHEL/Rocky",
  "Arch",
  "Kali",
  "Otra"
];

export const THORONDOR_WINDOWS_VERSION_OPTIONS = [
  "Windows 11",
  "Windows 10",
  "Windows Server 2025",
  "Windows Server 2022",
  "Windows Server 2019",
  "Windows Server 2016"
];

export const THORONDOR_LOG_SOURCES = [
  { value: "all", label: "Todas" },
  { value: "syslog", label: "syslog" },
  { value: "journal", label: "journalctl" },
  { value: "auth", label: "auth.log / secure" },
  { value: "custom", label: "Personalizados" }
];

export const THORONDOR_DEFAULT_ADDITIONAL_LOG_PATHS = "/var/log/nginx/access.log\n/var/log/nginx/error.log";

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
  networkExposure: "Puerto en escucha sospechoso",
  failedService: "Servicio systemd en estado FAILED",
  pendingUpdates: "Actualizaciones criticas pendientes",
  dockerUnhealthy: "Contenedor Docker en estado anomalo",
  dnsFailure: "Fallo de resolucion DNS",
  smartError: "Atributo SMART de disco en estado critico",
  highNetworkRate: "Trafico de red inusualmente elevado",
  tempCritical: "Temperatura de componente critica"
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
    },
    {
      id: "rule-failed-service",
      name: "Servicio systemd en estado FAILED",
      type: "failedService",
      enabled: true,
      threshold: 1,
      durationMinutes: 1,
      scope: "all",
      description: "Detecta servicios del sistema que han fallado y no han sido relanzados."
    },
    {
      id: "rule-pending-updates",
      name: "Mas de 20 actualizaciones pendientes",
      type: "pendingUpdates",
      enabled: true,
      threshold: 20,
      durationMinutes: 1,
      scope: "all",
      description: "Avisa cuando el numero de parches sin aplicar supera el umbral."
    },
    {
      id: "rule-dns-failure",
      name: "Fallo de resolucion DNS",
      type: "dnsFailure",
      enabled: true,
      threshold: 1,
      durationMinutes: 1,
      scope: "all",
      description: "Detecta cuando el host no puede resolver nombres DNS esenciales."
    },
    {
      id: "rule-temp-critical",
      name: "Temperatura de componente por encima de 85C",
      type: "tempCritical",
      enabled: true,
      threshold: 85,
      durationMinutes: 1,
      scope: "all",
      description: "Dispara alerta cuando cualquier sensor de temperatura supera el umbral."
    },
    {
      id: "rule-high-network-rate",
      name: "Trafico saliente por encima de 100 MB/s",
      type: "highNetworkRate",
      enabled: true,
      threshold: 104857600,
      durationMinutes: 2,
      scope: "all",
      description: "Detecta exfiltracion de datos o trafico de red inusualmente alto."
    }
  ];
}

export function buildThorondorAgentDraft() {
  return {
    targetOs: "linux",
    displayName: "",
    systemName: "",
    distro: "",
    osVersion: "",
    receiverUrl: "",
    port: "",
    intervalSeconds: 30,
    additionalLogPaths: THORONDOR_DEFAULT_ADDITIONAL_LOG_PATHS,
    modules: {
      systemMetrics: true,
      securityLogs: true,
      sudoCommands: true,
      fileIntegrity: true,
      networkConnections: true,
      applicationLogs: true,
      networkRates: true,
      establishedConnections: true,
      hardwareMonitor: true,
      dockerMonitor: false,
      updateMonitor: true,
      loginHistory: true,
      smartMonitor: false
    },
    generateSystemd: true,
    hostIp: "",
    installUser: "",
    serviceName: "",
    notes: ""
  };
}

export function isLegacyThorondorAgentDraft(draft) {
  if (!draft || typeof draft !== "object") return false;

  return draft.displayName === "PC UBUNTU DE PACO"
    && draft.systemName === "servidor-web-01"
    && draft.distro === "Ubuntu/Debian"
    && draft.osVersion === "22.04 LTS"
    && String(draft.hostIp || "") === "192.168.1.50"
    && String(draft.installUser || "") === "thorondor"
    && String(draft.serviceName || "") === "thorondor-agent"
    && Number(draft.intervalSeconds) === 30
    && String(draft.additionalLogPaths || "") === THORONDOR_DEFAULT_ADDITIONAL_LOG_PATHS;
}
