<template>
    <ResponsiveSubheader :items="subItems" theme="biblioteca" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderBiblioteca',
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
                    id: "foundations",
                    name: "Base y Primeras Certificaciones",
                    subs: [
                        "Cómo leer un blueprint de examen",
                        "Vendor-neutral vs vendor-specific",
                        "Certificaciones técnicas vs gestión",
                        "Rutas junior, mid y senior",
                        "CompTIA A+",
                        "CompTIA Network+",
                        "CompTIA Security+",
                        "ISC2 CC",
                        "SSCP",
                        "Google Cybersecurity Certificate",
                        "Microsoft SC-900",
                        "AZ-900",
                        "AWS Cloud Practitioner",
                        "Linux Essentials / LPIC-1",
                        "ITIL Foundation",
                        "Laboratorios iniciales y home lab"
                    ]
                },
                {
                    id: "offensive",
                    name: "Red Team y Pentesting",
                    subs: [
                        "eJPT",
                        "eCPPT",
                        "PNPT",
                        "PJPT",
                        "OSCP",
                        "OSEP",
                        "OSWE",
                        "OSED",
                        "CRTP",
                        "CRTE",
                        "CRTO",
                        "CEH",
                        "GPEN",
                        "GWAPT",
                        "GXPN",
                        "BSCP",
                        "Bug Bounty y PortSwigger Academy",
                        "Ruta profesional Pentester"
                    ]
                },
                {
                    id: "defensive",
                    name: "Blue Team, SOC y DFIR",
                    subs: [
                        "CompTIA CySA+",
                        "CompTIA SecurityX / CASP+",
                        "BTL1",
                        "BTL2",
                        "GCIH",
                        "GCIA",
                        "GMON",
                        "GCED",
                        "GCFA",
                        "GNFA",
                        "GREM",
                        "CHFI",
                        "Microsoft SC-200",
                        "Splunk Core Certified User",
                        "Splunk Enterprise Security",
                        "Elastic Certified Analyst",
                        "Ruta SOC Analyst",
                        "Ruta Incident Responder"
                    ]
                },
                {
                    id: "management_grc",
                    name: "Gestión, Auditoría y GRC",
                    subs: [
                        "CISSP",
                        "CISM",
                        "CISA",
                        "CRISC",
                        "CGRC / CAP",
                        "ISO 27001 Lead Implementer",
                        "ISO 27001 Lead Auditor",
                        "ISO 22301 Continuidad de Negocio",
                        "ISO 27701 Privacidad",
                        "DPO / GDPR",
                        "NIST CSF",
                        "NIST RMF",
                        "COBIT",
                        "PCI-DSS",
                        "SOC 2",
                        "Ruta Auditor",
                        "Ruta Security Manager",
                        "Ruta CISO"
                    ]
                },
                {
                    id: "cloud_network_architecture",
                    name: "Cloud, Redes y Arquitectura",
                    subs: [
                        "CCSP",
                        "AWS Security Specialty",
                        "AWS Solutions Architect",
                        "AZ-500",
                        "SC-100",
                        "Google Professional Cloud Security Engineer",
                        "CCNA",
                        "CCNP Security",
                        "Fortinet FCP / FCSS",
                        "Palo Alto PCNSA / PCNSE",
                        "Check Point CCSA / CCSE",
                        "Wireshark WCNA",
                        "Zero Trust Architecture",
                        "SASE y SSE",
                        "Ruta Cloud Security Engineer",
                        "Ruta Security Architect"
                    ]
                },
                {
                    id: "appsec_devsecops",
                    name: "AppSec, DevSecOps y Supply Chain",
                    subs: [
                        "CSSLP",
                        "GWAPT",
                        "GWEB",
                        "CASE Java / CASE .NET",
                        "Practical DevSecOps",
                        "CKA",
                        "CKS",
                        "Docker y Kubernetes security",
                        "Secure SDLC",
                        "SAST / DAST / SCA / IAST",
                        "Seguridad en APIs",
                        "Threat modeling",
                        "SBOM y software supply chain",
                        "SLSA y Sigstore",
                        "Ruta AppSec Engineer",
                        "Ruta DevSecOps Engineer"
                    ]
                },
                {
                    id: "specializations",
                    name: "Especializaciones Avanzadas",
                    subs: [
                        "ICS/OT Security",
                        "GICSP",
                        "GRID",
                        "Mobile Security",
                        "Forense movil",
                        "Malware Analysis",
                        "Reverse Engineering",
                        "Cloud Incident Response",
                        "Threat Intelligence",
                        "Privacy Engineering",
                        "AI Security",
                        "Blockchain Security",
                        "Automotive Security",
                        "IoT Security",
                        "Hardware Hacking",
                        "Quantum-safe cryptography"
                    ]
                },
                {
                    id: "career_study",
                    name: "Preparación y Carrera",
                    subs: [
                        "Plan de estudio por dominios",
                        "Spaced repetition y flashcards",
                        "Simulacros y revisión de fallos",
                        "Laboratorios: Hack The Box",
                        "Laboratorios: TryHackMe",
                        "PortSwigger Academy",
                        "Blue Team Labs",
                        "CyberDefenders",
                        "LetsDefend",
                        "Home lab con AD, SIEM y cloud",
                        "Cómo estudiar trabajando",
                        "CPEs y renovación de certificaciones",
                        "CV, portfolio y writeups",
                        "Europa vs USA vs remoto",
                        "Qué certificaciones compensan por rol",
                        "Mapa de carrera: pentest, SOC, GRC, cloud, AppSec"
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
