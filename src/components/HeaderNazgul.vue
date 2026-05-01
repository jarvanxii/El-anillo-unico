<template>
    <ResponsiveSubheader :items="subItems" theme="nazgul" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderNazgul',
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
                    id: "privacy_fundamentals",
                    name: "Fundamentos de Privacidad",
                    subs: [
                        "Privacidad vs Seguridad vs Anonimato",
                        "Modelo de amenazas personal (Personal Threat Model)",
                        "Huella digital (Digital Footprint)",
                        "Metadatos y lo que revelan",
                        "Principio de minimización de datos",
                        "Privacidad por diseño (Privacy by Design)",
                        "Consentimiento informado",
                        "Derecho al olvido",
                        "GDPR / RGPD desde el punto de vista del usuario",
                        "Broker de datos (Data Brokers)",
                        "Doxxing y cómo prevenirlo",
                        "OPSEC personal",
                        "Separación de identidades digitales",
                        "Compartimentación de la vida digital"
                    ]
                },
                {
                    id: "anonymous_browsing",
                    name: "Navegación Anónima y Redes Privadas",
                    subs: [
                        "Cómo funciona Tor",
                        "Tor Browser",
                        "Red Tor vs VPN: diferencias y casos de uso",
                        "VPN: qué protege y qué no",
                        "Cómo elegir una VPN de confianza",
                        "VPN con kill switch y DNS leak protection",
                        "Mullvad / ProtonVPN / IVPN",
                        "I2P (Invisible Internet Project)",
                        "Freenet",
                        "DNS sobre HTTPS (DoH)",
                        "DNS sobre TLS (DoT)",
                        "Resolvers DNS privados (1.1.1.1, 9.9.9.9)",
                        "Proxies y sus limitaciones",
                        "Fingerprinting de navegador (Browser Fingerprinting)",
                        "Canvas fingerprinting",
                        "WebRTC leaks",
                        "Modo incógnito: mitos y realidad",
                        "Compartir conexión de forma segura"
                    ]
                },
                {
                    id: "tracking_surveillance",
                    name: "Rastreo, Vigilancia y Telemetría",
                    subs: [
                        "Cookies de seguimiento (tracking cookies)",
                        "Supercookies y Evercookies",
                        "Píxeles de seguimiento",
                        "Fingerprinting de dispositivo",
                        "Rastreo entre sitios (Cross-site tracking)",
                        "Vigilancia de ISP",
                        "Vigilancia masiva (PRISM, XKeyscore)",
                        "Telemetría en sistemas operativos (Windows, macOS)",
                        "Telemetría en aplicaciones móviles",
                        "Rastreo por ubicación (GPS, triangulación, WiFi)",
                        "Rastreo publicitario (Google Ads, Meta Pixel)",
                        "Rastreo en correos electrónicos",
                        "Rastreo en aplicaciones de mensajería",
                        "Shadow profiles (perfiles en la sombra)",
                        "Agregación de datos y perfilado",
                        "Cámaras de vigilancia y reconocimiento facial"
                    ]
                },
                {
                    id: "secure_communications",
                    name: "Comunicaciones Seguras y Privadas",
                    subs: [
                        "Cifrado de extremo a extremo (E2EE)",
                        "Signal (protocolo y aplicación)",
                        "Matrix / Element",
                        "Session",
                        "Briar",
                        "Correo electrónico cifrado (ProtonMail, Tutanota)",
                        "PGP / GPG para correo electrónico",
                        "Metadatos en comunicaciones cifradas",
                        "SMS vs mensajería cifrada",
                        "Videollamadas privadas (Jitsi, Signal)",
                        "Correo temporal y alias de correo (SimpleLogin, AnonAddy)",
                        "Números de teléfono virtuales",
                        "Comunicación anónima en situaciones de riesgo",
                        "Dead drops digitales",
                        "Canales seguros para whistleblowers (SecureDrop)"
                    ]
                },
                {
                    id: "private_devices_os",
                    name: "Dispositivos, Sistemas Operativos y Software Privado",
                    subs: [
                        "Sistemas operativos orientados a la privacidad",
                        "Tails OS",
                        "Whonix",
                        "Qubes OS",
                        "GrapheneOS / CalyxOS (Android privado)",
                        "Linux como alternativa a Windows/macOS",
                        "Navegadores orientados a la privacidad (Firefox, Librewolf, Brave)",
                        "Extensiones esenciales (uBlock Origin, Privacy Badger, NoScript)",
                        "Gestores de contraseñas (Bitwarden, KeePassXC)",
                        "Buscadores privados (DuckDuckGo, Startpage, SearXNG, Brave Search)",
                        "Ofimática y nube privada (Nextcloud, CryptPad)",
                        "Mapas sin rastreo (OsmAnd, Organic Maps)",
                        "Cifrado de archivos locales (Veracrypt, Cryptomator)",
                        "Eliminación segura de datos (shred, Eraser)",
                        "BIOS/UEFI y firmware: riesgos de privacidad",
                        "Micrófonos y cámaras: gestión física y lógica"
                    ]
                },
                {
                    id: "mobile_privacy",
                    name: "Privacidad en Móviles",
                    subs: [
                        "Permisos de aplicaciones y por qué importan",
                        "Gestión de permisos en Android e iOS",
                        "Publicidad móvil y Ad ID (GAID, IDFA)",
                        "Cómo deshabilitar el Ad ID",
                        "Aplicaciones con acceso innecesario a datos",
                        "Riesgos de las aplicaciones gratuitas",
                        "F-Droid como alternativa a Google Play",
                        "Aurora Store",
                        "Sincronización con la nube: riesgos y alternativas",
                        "iCloud vs alternativas privadas",
                        "Localización: cómo rastrean los móviles",
                        "SIM swapping y protección",
                        "eSIM y privacidad",
                        "Stingrays y IMSI catchers",
                        "Modo avión como herramienta de privacidad",
                        "Faraday bags"
                    ]
                },
                {
                    id: "privacy_advanced",
                    name: "Privacidad Avanzada y Casos de Uso",
                    subs: [
                        "Periodistas y activistas: herramientas específicas",
                        "Privacidad financiera y criptomonedas (Monero)",
                        "Bitcoin y pseudoanonimato",
                        "Compras anónimas (tarjetas prepago, Privacy.com)",
                        "Identidades alternativas y seudónimos",
                        "Separación de vida personal y profesional digital",
                        "Privacidad frente a gobiernos autoritarios",
                        "Circunvención de censura (Tor bridges, Obfs4, Shadowsocks, Psiphon)",
                        "Gestión de contraseñas únicas por servicio",
                        "Verificación de integridad de software (hashes, firmas GPG)",
                        "Air-gapped computers",
                        "Comunicación en entornos de alto riesgo",
                        "Privacidad post-mortem (qué ocurre con tus datos al morir)",
                        "Cómo eliminar tu presencia de internet"
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
