<template>
    <nav class="subheader">
        <div class="container-fluid px-4 px-xl-5">
            <div class="row g-0 justify-content-center">
                <div v-for="item in subItems" :key="item.id" class="col-xl col-lg-3 col-md-4 col-sm-6 col-6">
                    <div :class="['sub-item', 'h-100', { active: active === item.id }]" @mouseenter="openDropdown(item.id, $event)"
                        @mouseleave="closeDropdownDelayed">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div v-if="active" class="sub-dropdown"
        :style="{ top: dropdownTop + 'px', left: dropdownLeft + 'px', width: dropdownWidth + 'px' }"
        @mouseenter="cancelClose" @mouseleave="closeDropdownDelayed">
        <div class="submenu">
            <a v-for="(sub, index) in currentSubs" :key="index" href="#">
                {{ sub }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderGimli',
    data() {
        return {
            active: null,
            dropdownLeft: 0,
            dropdownTop: 0,
            dropdownWidth: 0,
            hideTimeout: null,
            subItems: [
                {
                    id: "recon_scanning",
                    name: "Reconocimiento y Escaneo",
                    subs: [
                        // Reconocimiento y OSINT
                        "Reconocimiento pasivo vs activo",
                        "OSINT (Open Source Intelligence)",
                        "Google Dorks",
                        "Shodan / Censys / FOFA",
                        "Maltego",
                        "theHarvester",
                        "Recon-ng",
                        "WHOIS y registros DNS",
                        "Enumeración de subdominios",
                        "Análisis de metadatos",
                        "LinkedIn / redes sociales como fuente",
                        "Búsqueda de credenciales filtradas (HaveIBeenPwned, Dehashed)",
                        "GitHub Dorking",
                        "Huella digital corporativa",
                        "Wayback Machine / caché web",
                        // Escaneo y Enumeración
                        "Escaneo de puertos (Nmap)",
                        "Detección de servicios y versiones",
                        "Fingerprinting de sistemas operativos",
                        "Enumeración de usuarios",
                        "Enumeración de recursos compartidos (SMB)",
                        "Enumeración SNMP",
                        "Enumeración LDAP / Active Directory",
                        "Enumeración DNS (Zone Transfer, brute force)",
                        "Enumeración web (directorios, archivos, parámetros)",
                        "Gobuster / ffuf / dirbuster",
                        "Nikto",
                        "Escaneo de vulnerabilidades (Nessus, OpenVAS)",
                        "Banner grabbing",
                        "Identificación de tecnologías web (Wappalyzer, WhatWeb)"
                    ]
                },
                {
                    id: "exploitation_web",
                    name: "Explotación y Pentesting Web",
                    subs: [
                        // Explotación general
                        "Metasploit Framework",
                        "Búsqueda de exploits (Exploit-DB, CVE, NVD)",
                        "Explotación de servicios (FTP, SMB, RDP, SSH)",
                        "Buffer overflow (conceptos y práctica)",
                        "Abuso de configuraciones erróneas",
                        "Explotación de dependencias vulnerables",
                        "CVE y exploit chains",
                        // Pentesting Web y APIs
                        "Metodología de pentesting web",
                        "Burp Suite",
                        "OWASP Testing Guide",
                        "Inyección SQL (manual y automatizada con SQLmap)",
                        "XSS (Reflected, Stored, DOM-based)",
                        "CSRF",
                        "SSRF",
                        "XXE",
                        "IDOR",
                        "LFI / RFI",
                        "Open Redirect",
                        "SSTI (Server-Side Template Injection)",
                        "Subdomain Takeover",
                        "Broken Authentication",
                        "Pentesting de APIs REST y GraphQL",
                        "JWT attacks",
                        "OAuth misconfigurations",
                        "Fuzzing web"
                    ]
                },
                {
                    id: "ad_exploitation",
                    name: "Explotación de Active Directory",
                    subs: [
                        "Explotación de Active Directory",
                        "Kerberoasting",
                        "AS-REP Roasting",
                        "Pass-the-Hash",
                        "Pass-the-Ticket",
                        "Token Impersonation",
                        "DCSync Attack",
                        "Golden Ticket / Silver Ticket",
                        "BloodHound y análisis de AD",
                        "LSASS dumping",
                        "Volcado de credenciales (Mimikatz, secretsdump)",
                        "Abuso de GPOs",
                        "Abuso de ACLs en AD",
                        "Delegation attacks (Constrained / Unconstrained)"
                    ]
                },
                {
                    id: "postexploit_lateral",
                    name: "Post-Explotación y Movimiento Lateral",
                    subs: [
                        "Escalada de privilegios en Linux",
                        "Escalada de privilegios en Windows",
                        "Enumeración post-explotación",
                        "Movimiento lateral (PsExec, WMI, WinRM)",
                        "Living off the Land (LOLBins)",
                        "Persistencia (cron jobs, tareas programadas, registros, servicios)",
                        "Pivoting y tunneling",
                        "Proxychains",
                        "Exfiltración de datos",
                        "In-memory execution",
                        "Process injection",
                        "Timestomping",
                        "Log tampering"
                    ]
                },
                {
                    id: "social_wireless",
                    name: "Ingeniería Social y Ataques Físicos",
                    subs: [
                        // Ingeniería Social
                        "Fundamentos de ingeniería social",
                        "Phishing campañas (GoPhish)",
                        "Spear Phishing",
                        "Vishing (phishing por voz)",
                        "Smishing (phishing por SMS)",
                        "Pretexting",
                        "Baiting",
                        "Creación de páginas de phishing",
                        "Evasión de filtros antispam",
                        "Clonación de sitios web",
                        // Ataques físicos e inalámbricos
                        "USB Drops",
                        "Rubber Ducky / BadUSB",
                        "Ataques físicos a instalaciones",
                        "Bypass de control de acceso físico",
                        "Auditoría WiFi (Aircrack-ng, Kismet)",
                        "WPA2 cracking (handshake capture)",
                        "Evil Twin / Rogue AP",
                        "PMKID Attack",
                        "Deauthentication attacks",
                        "Bluetooth attacks",
                        "RFID / NFC cloning",
                        "Raspberry Pi como herramienta de ataque"
                    ]
                },
                {
                    id: "evasion_c2",
                    name: "Evasión, C2 y OPSEC",
                    subs: [
                        "Evasión de antivirus (AV evasion)",
                        "Evasión de EDR",
                        "Ofuscación de código y payloads",
                        "Encoders y encriptado de shellcode",
                        "Living off the Land (LOLBins / LOLScripts)",
                        "Infraestructura de C2 (Command & Control)",
                        "Domain fronting",
                        "OPSEC para red teamers",
                        "Uso de Tor / proxies / VPNs",
                        "Cobalt Strike (conceptos)",
                        "Sliver / Havoc (frameworks C2 alternativos)"
                    ]
                },
                {
                    id: "redteam_methodology",
                    name: "Metodología y Frameworks",
                    subs: [
                        "Fases de un pentest",
                        "Diferencia entre Pentest, Red Team y Bug Bounty",
                        "MITRE ATT&CK como guía ofensiva",
                        "PTES (Penetration Testing Execution Standard)",
                        "Scoping y reglas de enfrentamiento (Rules of Engagement)",
                        "Redacción de informes de pentest",
                        "Gestión de evidencias",
                        "CVSS (puntuación de vulnerabilidades)",
                        "Laboratorios de práctica (HackTheBox, TryHackMe, VulnHub)",
                        "Bug Bounty (HackerOne, Bugcrowd)"
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
    background: #2a1414;
    border-top: 1px solid rgba(139, 58, 43, 0.12);
    border-bottom: 2px solid #8b3a2b;
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
    color: #e8c4a8;
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .3px;
    cursor: pointer;
    border-left: 1px solid rgba(139, 58, 43, 0.18);
    border-right: 1px solid rgba(139, 58, 43, 0.18);
    transition: all .22s ease;
    position: relative;
}

.sub-item:hover,
.sub-item.active {
    background: #3a1c1c;
    color: #f5d9c2;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18), inset 0 0 18px rgba(204, 85, 68, 0.14);
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
        #cc5544 20%,
        #ff6b4a 50%,
        #cc5544 80%,
        transparent 100%);
    box-shadow: 0 0 8px rgba(204, 85, 68, 0.6), 0 0 16px rgba(255, 107, 74, 0.3);
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
    border-left: 1px solid rgba(204, 85, 68, 0.22);
    border-right: 1px solid rgba(204, 85, 68, 0.22);
    border-bottom: 1px solid rgba(204, 85, 68, 0.22);
    border-radius: 0 0 6px 6px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.50),
        0 0 40px rgba(168, 69, 53, 0.08),
        inset 0 1px 0 rgba(204, 85, 68, 0.03);
    animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(1px);
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a {
    color: #e2b89a;
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.submenu a:hover {
    color: #e6936a;
    font-family: "Cinzel", serif;
    transform: translateX(1px);
}

.sub-dropdown::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
    background: rgba(139, 58, 43, 0.35);
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
