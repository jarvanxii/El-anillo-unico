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
                    id: "darkweb_foundations",
                    name: "Fundamentos y Ecosistema",
                    subs: [
                        "Surface Web, Deep Web y Dark Web",
                        "Tor, I2P, Freenet y redes anonimas",
                        "Servicios .onion y onion routing",
                        "Relays, bridges, guards y exit nodes",
                        "Hidden services y descriptor directories",
                        "Amenazas reales vs mitos",
                        "Historia: Silk Road, AlphaBay y operaciones policiales",
                        "Foros, paste sites, leak sites y mercados",
                        "Lenguaje habitual: escrow, mirrors, vendors, dumps",
                        "Economia criminal como objeto de inteligencia",
                        "Riesgos tecnicos, legales y personales",
                        "Casos de uso legitimos: periodismo, investigacion y censura"
                    ]
                },
                {
                    id: "safe_access_opsec",
                    name: "Acceso Seguro y OPSEC",
                    subs: [
                        "Modelo de amenazas antes de acceder",
                        "Tor Browser: configuracion segura",
                        "Tails OS y sesiones amnesicas",
                        "Whonix y aislamiento por gateway",
                        "Maquinas virtuales y snapshots",
                        "Separacion de identidades y pseudonimos",
                        "VPN + Tor: ventajas, limites y riesgos",
                        "Bridges, pluggable transports y censura",
                        "DNS leaks, WebRTC leaks y fingerprinting",
                        "Descargas, macros y archivos peligrosos",
                        "Reglas de no autenticacion cruzada",
                        "Errores de OPSEC comunes"
                    ]
                },
                {
                    id: "search_validation",
                    name: "Busqueda y Verificacion",
                    subs: [
                        "Motores de busqueda .onion",
                        "Directorios y reputacion de fuentes",
                        "Verificacion de mirrors y enlaces",
                        "Firmas PGP y canales oficiales",
                        "Deteccion de clones y phishing .onion",
                        "Rotacion de dominios y enlaces caidos",
                        "Wayback, caches y trazas historicas",
                        "Correlacion con fuentes OSINT",
                        "Captura segura de evidencias publicas",
                        "Gestor de bookmarks y notas operativas",
                        "Indicadores de confianza y de fraude",
                        "Gestion de fuentes en investigaciones"
                    ]
                },
                {
                    id: "threat_intel_leaks",
                    name: "Threat Intel y Filtraciones",
                    subs: [
                        "Monitorizacion de leak sites",
                        "Ransomware data leak sites",
                        "Credenciales filtradas y combo lists",
                        "Stealer logs y mercados de accesos",
                        "Initial Access Brokers",
                        "Foros clandestinos y reputacion",
                        "Carding y fraude como inteligencia defensiva",
                        "Tracking de actores y aliases",
                        "IOCs, TTPs y atribucion prudente",
                        "STIX/TAXII y modelos de intercambio",
                        "Integracion con SIEM/TIP",
                        "Limitaciones eticas de la inteligencia clandestina"
                    ]
                },
                {
                    id: "scams_malware_risks",
                    name: "Estafas, Malware y Amenazas",
                    subs: [
                        "Scams y exit scams",
                        "Phishing y suplantacion en .onion",
                        "Mercados falsos y escrow falso",
                        "Malware en descargas y adjuntos",
                        "Troyanos, stealers y loaders",
                        "Documentos trampa y exploits de cliente",
                        "Ingenieria social en foros",
                        "Doxxing, extorsion y sextortion",
                        "Riesgos de criptomonedas trazables",
                        "Malware-as-a-Service",
                        "Botnets, DDoS-for-hire y su seguimiento",
                        "Senales tempranas de fraude"
                    ]
                },
                {
                    id: "privacy_crypto_payments",
                    name: "Privacidad, Cripto y Trazabilidad",
                    subs: [
                        "PGP/GPG para verificacion, no confianza ciega",
                        "Mensajeria cifrada y metadatos",
                        "Bitcoin y pseudoanonimato",
                        "Monero y privacidad financiera",
                        "Blockchain analytics y clustering",
                        "Mixers, tumblers y riesgos legales",
                        "Wallet hygiene",
                        "KYC, exchanges y trazabilidad",
                        "Cifrado de archivos y contenedores",
                        "Gestion de claves y passphrases",
                        "Compartimentacion de navegador y sistema",
                        "Privacidad operacional frente a investigacion"
                    ]
                },
                {
                    id: "investigation_evidence",
                    name: "Investigacion y Evidencia",
                    subs: [
                        "Investigacion pasiva y limites operativos",
                        "Preservacion de evidencias web",
                        "Hashing, timestamps y cadena de custodia",
                        "Capturas reproducibles y notas de caso",
                        "Analisis de alias, handles y pivots",
                        "Analisis de infraestructura .onion",
                        "Correlacion con dominios, wallets y correos",
                        "OSINT defensivo de filtraciones",
                        "Notificacion responsable a afectados",
                        "Coordinacion con legal y cumplimiento",
                        "Informes de inteligencia accionable",
                        "No interaccion con material ilegal"
                    ]
                },
                {
                    id: "legal_ethics",
                    name: "Legalidad y Etica",
                    subs: [
                        "Diferencia entre observar, descargar e interactuar",
                        "Actividades prohibidas y riesgos penales",
                        "Material ilegal y obligacion de no manipularlo",
                        "Investigacion periodistica y academica",
                        "Investigacion corporativa autorizada",
                        "Privacidad, proporcionalidad y minimizacion",
                        "Jurisdiccion y cooperacion internacional",
                        "Politicas internas de investigacion",
                        "Consentimiento y autorizacion",
                        "Proteccion del investigador",
                        "Divulgacion responsable",
                        "Etica profesional en inteligencia"
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
