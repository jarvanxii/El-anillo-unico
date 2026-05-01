<template>
    <ResponsiveSubheader :items="subItems" theme="saruman" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderSaruman',
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
                    id: "network_fundamentals",
                    name: "Redes y Protocolos",
                    subs: [
                        // Fundamentos de Redes
                        "Modelo OSI",
                        "Modelo TCP/IP",
                        "Encapsulación de datos",
                        "Direcciones MAC",
                        "Direcciones IP (IPv4 / IPv6)",
                        "Clases de IP",
                        "CIDR",
                        "VLSM",
                        "Subnetting",
                        "IPv6 subnetting",
                        "SLAAC y Neighbor Discovery",
                        "Puerta de enlace (Gateway)",
                        "ARP",
                        "ARP spoofing y mitigaciones",
                        "ICMP",
                        "TTL",
                        "Unicast, Broadcast, Multicast",
                        "Tipos de red (LAN, WAN, MAN, PAN)",
                        "Topologías de red",
                        "Medios de transmisión",
                        "Ancho de banda vs latencia",
                        // Protocolos y Servicios
                        "TCP vs UDP",
                        "HTTP / HTTPS",
                        "HTTP/2 y HTTP/3",
                        "DNS",
                        "DNSSEC",
                        "DoH / DoT",
                        "DHCP",
                        "DHCP snooping",
                        "FTP / SFTP / FTPS",
                        "SMTP",
                        "POP3 / IMAP",
                        "SSH",
                        "Telnet",
                        "SNMP",
                        "NTP",
                        "LDAP",
                        "RDP",
                        "SIP (VoIP)",
                        "MQTT",
                        "WebSockets",
                        "QUIC",
                        "TFTP",
                        "Proxy",
                        "Reverse Proxy",
                        "CDN",
                        // Arquitectura e Infraestructura
                        "Switches",
                        "Routers",
                        "Access Points",
                        "Balanceadores de carga",
                        "Cableado estructurado",
                        "Fibra óptica",
                        "Redes WiFi (802.11)",
                        "PoE",
                        "VLANs",
                        "Private VLANs",
                        "Trunking",
                        "STP",
                        "RSTP",
                        "LACP / EtherChannel",
                        "Redundancia",
                        "Alta disponibilidad",
                        "QoS",
                        "Segmentación de red",
                        "NAT",
                        // Routing y Conmutación
                        "Routing estático",
                        "Routing dinámico",
                        "Tablas de enrutamiento",
                        "RIP",
                        "OSPF",
                        "BGP",
                        "EIGRP",
                        "Conmutación de paquetes",
                        "Conmutación de circuitos",
                        "MPLS",
                        "Anycast",
                        "ECMP",
                        "SDN (Software Defined Networking)",
                        "SASE y SSE"
                    ]
                },
                {
                    id: "security_foundations",
                    name: "Fundamentos de Seguridad y Criptografía",
                    subs: [
                        // Fundamentos
                        "CIA Triad",
                        "Autenticidad",
                        "No repudio",
                        "Autenticación",
                        "Autorización",
                        "Accounting (AAA)",
                        "Principio de mínimo privilegio",
                        "Zero Trust",
                        "Defensa en profundidad",
                        "Superficie de ataque",
                        "Gestión del riesgo",
                        "Seguridad por diseño (Security by Design)",
                        "Hardening de sistemas",
                        "Gestión de vulnerabilidades",
                        "Parcheo de sistemas",
                        "Logs y auditoría",
                        "Políticas de seguridad",
                        "Tipos de controles: preventivos, detectivos y correctivos",
                        "Controles administrativos, técnicos y físicos",
                        "Gestión de activos",
                        "Clasificación de la información",
                        "Ciclo de vida de los datos",
                        "BIA (Business Impact Analysis)",
                        "BCP / DRP",
                        "Gestión de terceros",
                        "Seguridad física",
                        "Concienciación y cultura de seguridad",
                        // Criptografía
                        "Conceptos básicos de criptografía",
                        "Cifrado simétrico",
                        "Cifrado asimétrico",
                        "AES",
                        "RSA",
                        "ECC (Criptografía de Curva Elíptica)",
                        "Funciones hash (MD5, SHA-1, SHA-256, SHA-3)",
                        "HMAC",
                        "Firmas digitales",
                        "Certificados digitales",
                        "PKI (Infraestructura de Clave Pública)",
                        "TLS / SSL",
                        "Intercambio de claves Diffie-Hellman",
                        "Perfect Forward Secrecy",
                        "Gestión del ciclo de vida de claves",
                        "HSM y KMS",
                        "Esteganografía",
                        "Entropía y aleatoriedad",
                        "Cadenas de confianza",
                        "Algoritmos de derivación de contraseñas (PBKDF2, bcrypt, Argon2)",
                        "Ataques criptográficos y criptoanálisis",
                        "Side-channel attacks",
                        "Criptografía post-cuántica"
                    ]
                },
                {
                    id: "network_system_security",
                    name: "Seguridad en Redes y Sistemas",
                    subs: [
                        // Seguridad en Redes
                        "Firewalls",
                        "Tipos de firewall (stateless, stateful, NGFW)",
                        "ACLs (Listas de control de acceso)",
                        "IDS / IPS",
                        "WAF (Web Application Firewall)",
                        "VPN",
                        "IPsec",
                        "SSL/TLS VPN",
                        "DMZ",
                        "Honeypots / Honeynets",
                        "Microsegmentación",
                        "802.1X (Autenticación de red)",
                        "NAC (Network Access Control)",
                        "RADIUS / TACACS+",
                        "Seguridad en WiFi (WEP, WPA, WPA2, WPA3)",
                        "DNS Security (DNSSEC, DoH, DoT)",
                        "Protección contra DDoS",
                        "Detección de anomalías",
                        // Seguridad en Sistemas
                        "Hardening en Linux",
                        "Hardening en Windows",
                        "Gestión de usuarios y permisos",
                        "sudo y privilegios",
                        "Gestión de servicios",
                        "Arranque seguro (Secure Boot)",
                        "Cifrado de disco (BitLocker, LUKS)",
                        "Control de acceso (DAC, MAC, RBAC)",
                        "SELinux / AppArmor",
                        "Firewall en host (iptables, nftables, Windows Firewall)",
                        "Gestión de contraseñas",
                        "PAM (Pluggable Authentication Modules)",
                        "SSH hardening",
                        "Auditoría del sistema (auditd)",
                        "Integridad de archivos (AIDE, Tripwire)",
                        "EDR / XDR en endpoint",
                        "MDM y gestión de dispositivos",
                        "Backups inmutables",
                        "Gestión de certificados en sistemas"
                    ]
                },
                {
                    id: "identity_web_app_security",
                    name: "Identidad, Web y Aplicaciones",
                    subs: [
                        // Identidad y Acceso
                        "Autenticación vs Autorización",
                        "MFA / 2FA",
                        "SSO (Single Sign-On)",
                        "Gestión de identidades (IAM)",
                        "Active Directory",
                        "Kerberos",
                        "OAuth 2.0",
                        "OpenID Connect",
                        "SAML",
                        "Privileged Access Management (PAM)",
                        "Zero Trust Architecture",
                        "Federación de identidades",
                        "Passwordless Authentication",
                        "FIDO2 / WebAuthn",
                        "SCIM",
                        "JIT/JEA (Just-in-Time / Just-Enough Administration)",
                        "ABAC / RBAC / PBAC",
                        "Session Management",
                        // Seguridad Web
                        "OWASP Top 10",
                        "Inyección SQL",
                        "XSS (Cross-Site Scripting)",
                        "CSRF (Cross-Site Request Forgery)",
                        "SSRF (Server-Side Request Forgery)",
                        "XXE (XML External Entity)",
                        "IDOR (Insecure Direct Object Reference)",
                        "Directory Traversal",
                        "Command Injection",
                        "Insecure Deserialization",
                        "Prototype Pollution",
                        "File Upload vulnerabilities",
                        "Cabeceras HTTP de seguridad",
                        "CORS",
                        "Cookies (seguras, HttpOnly, SameSite)",
                        "JWT (JSON Web Tokens)",
                        "Clickjacking",
                        "Seguridad en APIs REST",
                        "OWASP API Security Top 10",
                        "GraphQL Security",
                        "Content Security Policy (CSP)",
                        "OWASP ASVS",
                        // DevSecOps
                        "SSDLC (Ciclo de vida de desarrollo seguro)",
                        "DevSecOps",
                        "Modelado de amenazas (Threat Modeling)",
                        "STRIDE / DREAD",
                        "Revisión de código seguro",
                        "SAST (Análisis estático)",
                        "DAST (Análisis dinámico)",
                        "SCA (Análisis de composición de software)",
                        "Secrets en código fuente",
                        "Seguridad en CI/CD",
                        "Supply Chain Security",
                        "SBOM (Software Bill of Materials)",
                        "SLSA",
                        "Firmado de artefactos y Sigstore",
                        "Infraestructura como código segura",
                        "Gestión de dependencias y licencias"
                    ]
                },
                {
                    id: "cloud_virtualization",
                    name: "Cloud, Virtualización y Entornos Modernos",
                    subs: [
                        // Cloud general
                        "Computación en la nube",
                        "IaaS, PaaS, SaaS",
                        "Modelo de responsabilidad compartida",
                        "Virtualización",
                        "Contenedores",
                        "Docker",
                        "Kubernetes",
                        // Redes y seguridad en cloud
                        "VPC",
                        "Subredes en cloud",
                        "Balanceo en cloud",
                        "Escalabilidad",
                        "Alta disponibilidad",
                        "CSPM (Cloud Security Posture Management)",
                        "CWPP",
                        "CNAPP",
                        "IAM en cloud",
                        "Seguridad en AWS",
                        "Seguridad en Azure",
                        "Seguridad en GCP",
                        "Seguridad en contenedores",
                        "Seguridad en Kubernetes",
                        "Kubernetes RBAC",
                        "Admission Controllers",
                        "Network Policies",
                        "Service Mesh",
                        "Gestión de secretos (Vault, AWS Secrets Manager)",
                        "Cifrado en reposo y en tránsito",
                        "Seguridad en funciones serverless",
                        "Cloud Access Security Broker (CASB)",
                        "Cumplimiento normativo en cloud",
                        "Logs y auditoría en cloud",
                        "Cloud incident response",
                        "SaaS Security Posture Management (SSPM)"
                    ]
                },
                {
                    id: "threats_monitoring",
                    name: "Amenazas, Monitorización e Inteligencia",
                    subs: [
                        // Tipos de amenaza
                        "Malware (virus, gusano, troyano, ransomware, spyware)",
                        "Phishing / Spear Phishing",
                        "Ingeniería social",
                        "Man-in-the-Middle (MitM)",
                        "Ataques de fuerza bruta",
                        "Ataques de diccionario",
                        "Credential stuffing",
                        "DDoS / DoS",
                        "Ataques a la cadena de suministro",
                        "Zero-Day",
                        "APT (Advanced Persistent Threat)",
                        "Insider Threat",
                        "Ataques de repetición (Replay attacks)",
                        "Elevación de privilegios",
                        "DNS Spoofing / Cache Poisoning",
                        "Buffer Overflow",
                        "Race Conditions",
                        "Living off the Land",
                        "Ataques a identidad y tokens",
                        "Ataques a APIs",
                        "Ataques a cloud",
                        // Monitorización
                        "Monitorización de red",
                        "Logs",
                        "Alertas y métricas",
                        "NetFlow",
                        "Packet Capture (PCAP)",
                        "Wireshark",
                        "Análisis de tráfico",
                        "Latencia / Throughput / Bottlenecks",
                        "Capacity Planning",
                        // SIEM y SOAR
                        "¿Qué es un SIEM?",
                        "¿Qué es un SOAR?",
                        "Correlación de eventos",
                        "Normalización de logs",
                        "Alertas y reglas de detección",
                        "Gestión de incidentes",
                        "Playbooks de respuesta",
                        "Splunk (conceptos básicos)",
                        "Microsoft Sentinel (conceptos básicos)",
                        "Elastic SIEM (conceptos básicos)",
                        "EDR / NDR / XDR",
                        "Detection Engineering",
                        // Threat Intelligence
                        "¿Qué es Threat Intelligence?",
                        "IOCs (Indicadores de Compromiso)",
                        "IOAs (Indicadores de Ataque)",
                        "TTPs (Tácticas, Técnicas y Procedimientos)",
                        "Fuentes de inteligencia (OSINT, HUMINT, TECHINT)",
                        "MITRE ATT&CK",
                        "Cyber Kill Chain",
                        "Diamond Model",
                        "Feeds de Threat Intelligence",
                        "STIX / TAXII",
                        "Threat Hunting (conceptos)",
                        "Compartición de inteligencia (ISACs)"
                    ]
                },
                {
                    id: "frameworks_compliance",
                    name: "Frameworks, Normativas y Gestión",
                    subs: [
                        "NIST Cybersecurity Framework",
                        "NIST RMF",
                        "NIST SP 800-53",
                        "ISO 27001 / 27002",
                        "CIS Controls",
                        "COBIT",
                        "SOC 2",
                        "MITRE ATT&CK como referencia",
                        "OWASP",
                        "GDPR / RGPD",
                        "ENS (Esquema Nacional de Seguridad)",
                        "NIS2",
                        "DORA",
                        "PCI-DSS",
                        "HIPAA",
                        "Evaluación y gestión del riesgo",
                        "Auditorías de seguridad",
                        "Políticas de seguridad corporativa",
                        "Plan de continuidad de negocio (BCP)",
                        "Plan de recuperación ante desastres (DRP)"
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
    border-top: 1px solid rgba(255, 214, 102, 0.08);
    border-bottom: 2px solid #c8a96a;
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
    color: #e6d3a3;
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .3px;
    cursor: pointer;
    border-left: 1px solid rgba(200, 169, 106, 0.18);
    border-right: 1px solid rgba(200, 169, 106, 0.18);
    transition: all .22s ease;
    position: relative;
}

.sub-item:hover,
.sub-item.active {
    background: #1b1813;
    color: #f3cf75;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16), inset 0 0 18px rgba(212, 175, 55, 0.14);
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
        #d4af37 20%,
        #ffd700 50%,
        #d4af37 80%,
        transparent 100%);
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(255, 215, 0, 0.3);
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
    border-left: 1px solid rgba(255, 214, 102, 0.22);
    border-right: 1px solid rgba(255, 214, 102, 0.22);
    border-bottom: 1px solid rgba(255, 214, 102, 0.22);
    border-radius: 0 0 6px 6px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.50),
        0 0 40px rgba(200, 169, 106, 0.08),
        inset 0 1px 0 rgba(255, 220, 120, 0.03);
    animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(1px);
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a {
    color: #f3e7c2;
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.submenu a:hover {
    color: #ffd98e;
    font-family: "Cinzel", serif;
    transform: translateX(1px);
}

.sub-dropdown::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
    background: rgba(200, 169, 106, 0.35);
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
