<template>
    <ResponsiveSubheader :items="subItems" theme="boromir" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderBoromir',
    components: { ResponsiveSubheader },
    data() {
        return {
            active: null,
            dropdownLeft: 0,
            dropdownTop: 0,
            dropdownWidth: 0,
            hideTimeout: null,
            subItems: [
                {
                    id: "prevention_hardening",
                    name: "Prevención y Hardening",
                    subs: [
                        // Fundamentos defensivos
                        "Defensa en profundidad",
                        "Gestión de activos e inventario",
                        "Gestión de configuraciones (CMDB)",
                        "Políticas de seguridad corporativa",
                        "Gestión de contraseñas y MFA",
                        "Principio de mínimo privilegio",
                        "Zero Trust Architecture",
                        "Segmentación y microsegmentación de red",
                        "Gestión del ciclo de vida de identidades",
                        "Revisiones de acceso",
                        "PAM defensivo",
                        "Protección de cuentas privilegiadas",
                        "Security awareness",
                        "Data Loss Prevention (DLP)",
                        "Backup 3-2-1 e inmutabilidad",
                        // Hardening
                        "CIS Benchmarks",
                        "Hardening Linux (SSH, servicios, permisos, kernel)",
                        "Hardening Windows (GPO, políticas, registros)",
                        "Hardening de Active Directory",
                        "Hardening de contenedores y Kubernetes",
                        "Hardening de aplicaciones web",
                        "Hardening de bases de datos",
                        "Gestión de configuraciones (Ansible, Puppet, Chef)",
                        "Auditoría de configuraciones",
                        "Control de aplicaciones (Allowlisting)",
                        "AppLocker / WDAC"
                    ]
                },
                {
                    id: "vuln_patch_management",
                    name: "Gestión de Vulnerabilidades y Parches",
                    subs: [
                        "Ciclo de vida de una vulnerabilidad",
                        "CVE / CVSS / NVD",
                        "Escaneo de vulnerabilidades (Nessus, Qualys, OpenVAS)",
                        "Priorización de vulnerabilidades",
                        "EPSS y explotabilidad real",
                        "KEV Catalog",
                        "Gestión de parches (Patch Management)",
                        "WSUS / SCCM / herramientas de parcheo",
                        "Gestión de configuraciones inseguras",
                        "Vulnerability Disclosure",
                        "Seguimiento de CVEs críticos",
                        "Remediación vs mitigación",
                        "SLA de parcheo",
                        "Gestión de vulnerabilidades en contenedores e imágenes",
                        "Attack Surface Management",
                        "Exposure Management",
                        "Validación de remediación",
                        "Excepciones y aceptación de riesgo"
                    ]
                },
                {
                    id: "soc_detection",
                    name: "SOC, Monitorización y Detección",
                    subs: [
                        // SOC
                        "¿Qué es un SOC?",
                        "Niveles de un SOC (L1, L2, L3)",
                        "Triaje de alertas",
                        "Fatiga de alertas",
                        "KPIs de un SOC",
                        "SOC Maturity Models",
                        // SIEM
                        "SIEM (Splunk, Microsoft Sentinel, Elastic)",
                        "Correlación de eventos",
                        "Normalización de logs",
                        "Casos de uso y reglas de detección",
                        "Tuning de reglas SIEM",
                        "Dashboards y visualización",
                        "SPL / KQL / EQL",
                        "Data onboarding",
                        "Log source management",
                        "Retención y calidad de logs",
                        // Monitorización
                        "Monitorización de endpoints (EDR)",
                        "Monitorización de red (NDR)",
                        "NetFlow y análisis de tráfico",
                        "UEBA (User and Entity Behavior Analytics)",
                        "XDR",
                        "Deception technology",
                        "Canary tokens",
                        "Windows Event IDs clave",
                        "Sysmon y telemetría avanzada"
                    ]
                },
                {
                    id: "incident_response_forensics",
                    name: "Respuesta a Incidentes y Forense",
                    subs: [
                        // Respuesta a incidentes
                        "Fases de la respuesta a incidentes (PICERL)",
                        "Clasificación y severidad de incidentes",
                        "Playbooks de respuesta",
                        "SOAR y automatización de respuesta",
                        "Contención de incidentes",
                        "Erradicación y recuperación",
                        "Gestión de comunicaciones durante un incidente",
                        "Gestión de ransomware",
                        "Coordinación con equipos legales",
                        "Notificación a autoridades (GDPR, ENS)",
                        "Lecciones aprendidas (Post-mortem)",
                        // Forense digital
                        "Principios del análisis forense",
                        "Cadena de custodia",
                        "Adquisición de evidencias (imágenes forenses)",
                        "Análisis de memoria RAM (Volatility)",
                        "Análisis de disco (Autopsy, FTK)",
                        "Análisis de artefactos Windows (registro, prefetch, MFT, LNK)",
                        "Análisis de artefactos Linux (/var/log, bash_history, cron)",
                        "Análisis de tráfico de red (PCAP, Wireshark)",
                        "Timeline analysis",
                        "Recuperación de archivos eliminados",
                        "Forense en cloud",
                        "Forense en contenedores",
                        "Triage rápido",
                        "Evidence bags digitales",
                        "Coordinación con comunicaciones y negocio"
                    ]
                },
                {
                    id: "malware_threat_hunting",
                    name: "Análisis de Malware y Threat Hunting",
                    subs: [
                        // Análisis de malware
                        "Análisis de malware estático",
                        "Análisis de malware dinámico",
                        "Sandboxing (Any.run, Cuckoo, VirusTotal)",
                        "Ingeniería inversa básica (IDA, Ghidra)",
                        "YARA para clasificación",
                        "Strings, imports y PE headers",
                        "Análisis de comportamiento",
                        "Detonación controlada",
                        "Indicadores de compromiso (IOCs)",
                        "Análisis de ofuscación y empaquetado",
                        "Familias de malware comunes",
                        // Threat Hunting
                        "¿Qué es el Threat Hunting?",
                        "Hunting basado en hipótesis",
                        "Hunting basado en IOCs y TTPs",
                        "MITRE ATT&CK como guía de hunting",
                        "Hunting en logs de Windows (Event IDs clave)",
                        "Hunting en Active Directory",
                        "Hunting de movimiento lateral",
                        "Hunting de persistencia",
                        "Hunting de exfiltración",
                        "Herramientas de hunting (Velociraptor, OSQuery, Elastic)"
                    ]
                },
                {
                    id: "detection_engineering",
                    name: "Detection Engineering",
                    subs: [
                        "¿Qué es Detection Engineering?",
                        "Pirámide del dolor (Pyramid of Pain)",
                        "Escritura de reglas YARA",
                        "Escritura de reglas Sigma",
                        "Escritura de reglas Snort / Suricata",
                        "Detección basada en comportamiento vs firma",
                        "Mapeo de detecciones a MITRE ATT&CK",
                        "Testing de detecciones (Atomic Red Team)",
                        "Caldera",
                        "AttackIQ / BAS concepts",
                        "Detection as Code",
                        "GitOps para reglas",
                        "Gestión del ciclo de vida de detecciones",
                        "Reducción de falsos positivos",
                        "Cobertura de detección y gaps",
                        "Purple teaming como mejora de detecciones",
                        "Alert fidelity",
                        "Mean Time To Detect (MTTD)",
                        "Mean Time To Respond (MTTR)"
                    ]
                },
                {
                    id: "cloud_appsec_supply_defense",
                    name: "Cloud, AppSec y Supply Chain Defense",
                    subs: [
                        "Cloud Security Posture Management",
                        "Cloud Workload Protection",
                        "CNAPP",
                        "IAM hardening en AWS, Azure y GCP",
                        "Logging cloud: CloudTrail, Azure Activity, GCP Audit Logs",
                        "Kubernetes security monitoring",
                        "Container image scanning",
                        "Runtime security con Falco",
                        "SAST / DAST / SCA defensivo",
                        "Secrets scanning",
                        "SBOM y Dependency Track",
                        "Firma de artefactos y Cosign",
                        "SLSA y niveles de supply chain",
                        "Protección de CI/CD",
                        "WAF y API Gateway defense",
                        "Security champions"
                    ]
                },
                {
                    id: "blueteam_methodology",
                    name: "Metodología y Frameworks",
                    subs: [
                        "NIST Incident Response Framework",
                        "MITRE ATT&CK Defender (MAD)",
                        "MITRE D3FEND",
                        "Cyber Kill Chain (Lockheed Martin)",
                        "Diamond Model of Intrusion Analysis",
                        "Gestión de inteligencia de amenazas (TIP)",
                        "Compartición de inteligencia (ISACs, STIX/TAXII)",
                        "Purple Team exercises",
                        "Tabletop exercises",
                        "Métricas y KPIs de seguridad defensiva",
                        "Planes de continuidad (BCP / DRP)",
                        "Continuous Security Improvement"
                    ]
                }
            ]
        };
    },
    computed: {
        currentSubs() {
            const found = this.subItems.find(i => i.id === this.active);
            return found ? found.subs : [];
        }
    },
    methods: {
        openDropdown(id, event) {
            this.active = id;
            const rect = event.currentTarget.getBoundingClientRect();
            this.dropdownLeft = rect.left;
            this.dropdownTop = rect.bottom;
            this.dropdownWidth = rect.width;
            this.cancelClose();
        },
        closeDropdownDelayed() {
            this.hideTimeout = setTimeout(() => {
                this.active = null;
            }, 250);
        },
        cancelClose() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        }
    }
}
</script>

<style scoped>
.subheader {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    z-index: 2400;
    background: #12161e;
    border-top: 1px solid rgba(102, 153, 204, 0.08);
    border-bottom: 2px solid #4a7ba7;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
}

.sub-item {
    min-height: 54px;
    padding: 12px 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: normal;
    line-height: 1.25;
    color: #a3c5d6;
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .3px;
    cursor: pointer;
    border-left: 1px solid rgba(74, 123, 167, 0.18);
    border-right: 1px solid rgba(74, 123, 167, 0.18);
    transition: all .22s ease;
    position: relative;
}

.sub-item:hover,
.sub-item.active {
    background: #1b2331;
    color: #c9d4f0;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16), inset 0 0 18px rgba(102, 153, 204, 0.14);
}

.sub-item::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg,
        transparent 0%,
        #6699cc 20%,
        #4a90e2 50%,
        #6699cc 80%,
        transparent 100%);
    box-shadow: 0 0 8px rgba(102, 153, 204, 0.6), 0 0 16px rgba(74, 144, 226, 0.3);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 1px;
}

.sub-item:hover::after,
.sub-item.active::after {
    width: 95%;
    bottom: -1px;
}

.sub-dropdown {
    position: fixed;
    max-height: 72vh;
    overflow-y: auto;
    background: linear-gradient(180deg, #141414 0%, #0f0f0f 100%);
    border-left: 1px solid rgba(102, 153, 204, 0.22);
    border-right: 1px solid rgba(102, 153, 204, 0.22);
    border-bottom: 1px solid rgba(102, 153, 204, 0.22);
    border-radius: 0 0 6px 6px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.50),
        0 0 40px rgba(74, 123, 167, 0.08),
        inset 0 1px 0 rgba(102, 153, 204, 0.03);
    animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(1px);
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a {
    color: #a8c2d8;
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.submenu a:hover {
    color: #8ebfdd;
    font-family: "Cinzel", serif;
    transform: translateX(1px);
}

.sub-dropdown::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
    background: rgba(74, 123, 167, 0.35);
    border-radius: 10px;
}

@keyframes dropdownFade {
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
        filter: blur(1px);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

@media (max-width: 1199px) {
    .sub-item {
        padding: 12px 18px;
        font-size: 12px;
        min-height: 58px;
    }
}

@media (max-width: 767px) {
    .subheader {
        display: none;
    }
}
</style>
