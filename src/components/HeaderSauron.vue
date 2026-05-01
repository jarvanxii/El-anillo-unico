<template>
    <ResponsiveSubheader :items="subItems" theme="sauron" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderSauron',
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
                    id: "darkweb_basics",
                    name: "Fundamentos de Darkweb",
                    subs: [
                        "Qué es Deep Web, Dark Web y Surface Web",
                        "Cómo funciona la red Tor",
                        "Servicios .onion",
                        "Historia de la Darkweb",
                        "Mitos vs realidad",
                        "Anonimato real y limitaciones",
                        "Nodos, relays y exit nodes",
                        "Riesgos comunes al navegar"
                    ]
                },
                {
                    id: "secure_access",
                    name: "Acceso Seguro y OPSEC",
                    subs: [
                        "Cómo entrar de forma segura",
                        "Tor Browser configuración segura",
                        "Uso de Tails OS",
                        "VPN + Tor: ventajas y límites",
                        "Separación de identidades",
                        "Buenas prácticas OPSEC",
                        "Evitar leaks DNS / WebRTC",
                        "Errores comunes de principiantes"
                    ]
                },
                {
                    id: "directories_search",
                    name: "Directorios y Búsqueda",
                    subs: [
                        "Cómo encontrar recursos legítimos",
                        "Motores de búsqueda .onion",
                        "Directorios fiables",
                        "Verificación de mirrors",
                        "Sitios caídos y rotación de dominios",
                        "Cómo detectar enlaces falsos",
                        "Bookmarks seguros",
                        "Fuentes actualizadas"
                    ]
                },
                {
                    id: "privacy_tools",
                    name: "Privacidad y Herramientas",
                    subs: [
                        "PGP / GPG en la Darkweb",
                        "Mensajería segura",
                        "Monero y privacidad financiera",
                        "Bitcoin y trazabilidad",
                        "Gestores de contraseñas",
                        "Cifrado de archivos",
                        "Máquinas virtuales aisladas",
                        "Navegación compartimentada"
                    ]
                },
                {
                    id: "threats_scams",
                    name: "Estafas, Riesgos y Amenazas",
                    subs: [
                        "Scams habituales",
                        "Phishing en .onion",
                        "Mercados falsos",
                        "Exit scams",
                        "Malware distribuido en foros",
                        "Ingeniería social",
                        "Suplantaciones",
                        "Cómo detectar fraudes"
                    ]
                },
                {
                    id: "intelligence_osint",
                    name: "Investigación y OSINT",
                    subs: [
                        "Monitorización de filtraciones",
                        "Leaks y brechas de datos",
                        "Threat Intelligence",
                        "Rastreo de menciones",
                        "Foros clandestinos",
                        "Análisis de reputación",
                        "Fuentes útiles para investigadores",
                        "Casos reales conocidos"
                    ]
                },
                {
                    id: "legal_ethics",
                    name: "Legalidad y Ética",
                    subs: [
                        "Qué es legal consultar",
                        "Qué actividades evitar",
                        "Riesgos jurídicos por país",
                        "Privacidad vs delito",
                        "Investigación responsable",
                        "Uso periodístico y académico",
                        "Buenas prácticas éticas",
                        "Límites personales"
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
