<template>
    <div class="saruman-page">
        <nav class="subheader">
            <div class="container-fluid px-4 px-xl-5">
                <div class="row g-0 justify-content-center">
                    <div v-for="item in subItems" :key="item.id" class="col-xl col-lg-3 col-md-4 col-sm-6 col-6">
                        <div class="sub-item h-100" @mouseenter="openDropdown(item.id, $event)"
                            @mouseleave="closeDropdownDelayed">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <section class="hero-banner">
            <img src="@/assets/banners/banner-saruman.png" alt="El bastón de Saruman" />
        </section>
        <div v-if="active" class="sub-dropdown" :style="{
            top: dropdownTop + 'px',
            left: dropdownLeft + 'px',
            width: dropdownWidth + 'px'
        }" @mouseenter="cancelClose" @mouseleave="closeDropdownDelayed">
            <div class="submenu">
                <a v-for="(sub, index) in currentSubs" :key="index" href="#">
                    {{ sub }}
                </a>
            </div>
        </div>
        <main class="content container">
            <section class="section-box">
                <h2>Fundamentos de Redes</h2>
                <p>
                    En los albores de toda comunicación digital se alzan dos grandes mapas:
                    el <strong>Modelo OSI</strong>, torre de siete niveles donde cada capa cumple un deber sagrado,
                    y el <strong>Modelo TCP/IP</strong>, senda más breve y práctica usada en los reinos modernos.
                </p>
                <p>
                    La <strong>encapsulación de datos</strong> es el arte de envolver un mensaje en capas sucesivas,
                    como pergamino dentro de cofres sellados, hasta que alcanza su destino.
                </p>
                <p>
                    Las <strong>direcciones MAC</strong> marcan la identidad física de cada artefacto de red,
                    mientras las <strong>direcciones IP</strong> señalan su morada lógica dentro del vasto mundo.
                    Sean <strong>IPv4</strong>, antigua numeración limitada, o <strong>IPv6</strong>,
                    nueva estirpe casi infinita.
                </p>
                <p>
                    Las <strong>clases IP</strong> fueron antiguas divisiones del territorio;
                    <strong>CIDR</strong> trajo una era más sabia y flexible.
                    El <strong>subnetting</strong> divide grandes dominios en provincias menores,
                    para gobernar con orden y disciplina.
                </p>
                <p>
                    La <strong>puerta de enlace (Gateway)</strong> es la salida principal hacia otros mundos.
                    <strong>ARP</strong> descubre qué MAC corresponde a una IP cercana.
                    <strong>ICMP</strong> lleva avisos, errores y respuestas como heraldos veloces.
                    El <strong>TTL</strong> evita que un paquete vague eternamente por caminos perdidos.
                </p>
                <p>
                    <strong>Unicast</strong> habla a uno,
                    <strong>Broadcast</strong> proclama a todos,
                    y <strong>Multicast</strong> convoca solo a quienes desean escuchar.
                </p>
                <p>
                    Existen redes <strong>LAN</strong> en castillos pequeños,
                    <strong>WAN</strong> entre continentes,
                    <strong>MAN</strong> sobre ciudades enteras,
                    y <strong>PAN</strong> alrededor de una sola persona.
                </p>
                <p>
                    Las <strong>topologías</strong> describen la forma del reino:
                    estrella, anillo, bus o malla.
                    Los <strong>medios de transmisión</strong> son cobre, aire o fibra.
                    Y siempre se libra la batalla entre
                    <strong>ancho de banda</strong> (cuánto puede viajar)
                    y <strong>latencia</strong> (cuánto tarda en llegar).
                </p>
            </section>
            <section class="section-box">
                <h2>Protocolos y Servicios</h2>
                <p>
                    Si las redes son caminos, los protocolos son leyes escritas en piedra.
                    <strong>TCP</strong> entrega mensajes con orden y certeza;
                    <strong>UDP</strong> corre ligero, sin esperar confirmación.
                </p>
                <p>
                    <strong>HTTP</strong> transporta páginas y recursos web;
                    <strong>HTTPS</strong> lo hace bajo armadura cifrada.
                    <strong>HTTP/2</strong> y <strong>HTTP/3</strong> aceleraron estas rutas
                    para tiempos más veloces.
                </p>
                <p>
                    <strong>DNS</strong> traduce nombres nobles en números fríos.
                    <strong>DHCP</strong> concede direcciones IP automáticamente
                    a quienes llegan por primera vez.
                </p>
                <p>
                    <strong>FTP</strong> mueve archivos antiguos;
                    <strong>SFTP</strong> y <strong>FTPS</strong> lo hacen con resguardo.
                    <strong>SMTP</strong> envía correo,
                    <strong>POP3</strong> lo recoge,
                    <strong>IMAP</strong> lo organiza desde múltiples tronos.
                </p>
                <p>
                    <strong>SSH</strong> abre puertas seguras a máquinas remotas;
                    <strong>Telnet</strong> fue su ancestro sin escudo.
                    <strong>SNMP</strong> vigila dispositivos.
                    <strong>NTP</strong> sincroniza relojes para que el reino marche al mismo compás.
                </p>
                <p>
                    <strong>LDAP</strong> ordena identidades y cuentas.
                    <strong>RDP</strong> permite gobernar escritorios lejanos.
                    <strong>SIP</strong> invoca llamadas de voz.
                    <strong>MQTT</strong> habla en susurros con dispositivos pequeños.
                    <strong>WebSockets</strong> mantiene conversación viva entre cliente y servidor.
                    <strong>QUIC</strong> acelera comunicaciones modernas.
                    <strong>TFTP</strong> mueve archivos simples sin adornos.
                </p>
                <p>
                    Un <strong>Proxy</strong> intermedia peticiones;
                    un <strong>Reverse Proxy</strong> protege servidores internos.
                    Y una <strong>CDN</strong> dispersa copias del contenido por todo el mundo,
                    para servirlo desde la torre más cercana.
                </p>
            </section>
            <section class="section-box">
                <h2>Arquitectura e Infraestructura</h2>
                <p>
                    Los <strong>Switches</strong> unen máquinas dentro del mismo salón,
                    enviando cada trama al puerto correcto.
                    Los <strong>Routers</strong> conectan reinos distintos
                    y deciden el mejor sendero.
                </p>
                <p>
                    Los <strong>Access Points</strong> esparcen conectividad por el aire.
                    Los <strong>balanceadores de carga</strong> reparten visitantes
                    para que ninguna torre colapse.
                </p>
                <p>
                    El <strong>cableado estructurado</strong> da orden al entramado físico.
                    La <strong>fibra óptica</strong> lleva luz en lugar de cobre,
                    rápida como estrella fugaz.
                </p>
                <p>
                    Las redes <strong>WiFi 802.11</strong> gobiernan la comunicación inalámbrica.
                    <strong>PoE</strong> alimenta dispositivos usando el mismo cable de datos.
                </p>
                <p>
                    Las <strong>VLANs</strong> dividen una misma red física en varios dominios lógicos.
                    El <strong>Trunking</strong> transporta varias VLANs por un solo enlace.
                    <strong>STP</strong> evita bucles destructivos entre switches.
                </p>
                <p>
                    La <strong>redundancia</strong> crea caminos alternos.
                    La <strong>alta disponibilidad</strong> busca que nada se detenga.
                    <strong>QoS</strong> concede prioridad al tráfico más importante.
                    La <strong>segmentación</strong> separa zonas.
                    <strong>NAT</strong> transforma direcciones privadas en públicas.
                </p>
            </section>
            <section class="section-box">
                <h2>Routing y Conmutación</h2>
                <p>
                    El <strong>routing estático</strong> se escribe a mano,
                    piedra sobre piedra.
                    El <strong>routing dinámico</strong> aprende y cambia según el estado del mundo.
                </p>
                <p>
                    Las <strong>tablas de enrutamiento</strong> son mapas internos
                    donde cada destino conoce su siguiente paso.
                </p>
                <p>
                    <strong>RIP</strong> fue antiguo y sencillo.
                    <strong>OSPF</strong> reina en muchas fortalezas internas.
                    <strong>BGP</strong> gobierna las rutas entre grandes imperios de Internet.
                    <strong>EIGRP</strong> destacó en dominios concretos.
                </p>
                <p>
                    La <strong>conmutación de paquetes</strong> divide mensajes en fragmentos independientes.
                    La <strong>conmutación de circuitos</strong> reserva una senda exclusiva.
                    <strong>MPLS</strong> etiqueta caminos eficientes.
                    <strong>Anycast</strong> dirige al servidor más cercano.
                    <strong>ECMP</strong> reparte carga entre rutas equivalentes.
                </p>
            </section>
            <section class="section-box">
                <h2>Cloud y Virtualización</h2>
                <p>
                    La <strong>computación en la nube</strong> ofrece recursos bajo demanda,
                    sin forjar cada servidor con manos propias.
                </p>
                <p>
                    <strong>IaaS</strong> entrega infraestructura,
                    <strong>PaaS</strong> plataformas listas para crear,
                    y <strong>SaaS</strong> aplicaciones ya terminadas.
                </p>
                <p>
                    La <strong>virtualización</strong> permite muchos sistemas en una sola máquina.
                    Los <strong>contenedores</strong> aíslan aplicaciones con ligereza.
                    <strong>Docker</strong> popularizó esta senda,
                    y <strong>Kubernetes</strong> la organizó como ejército disciplinado.
                </p>
                <p>
                    Una <strong>VPC</strong> es red privada dentro de la nube.
                    Sus <strong>subredes</strong> separan zonas internas.
                    El <strong>balanceo en cloud</strong> distribuye tráfico,
                    mientras la <strong>escalabilidad</strong> permite crecer o decrecer según la demanda.
                </p>
            </section>
            <section class="section-box">
                <h2>Monitorización y Rendimiento</h2>
                <p>
                    La <strong>monitorización de red</strong> observa latidos invisibles del sistema.
                    Los <strong>logs</strong> guardan memoria de cada suceso.
                    Las <strong>alertas</strong> despiertan guardianes cuando algo falla.
                    Las <strong>métricas</strong> convierten comportamiento en números sabios.
                </p>
                <p>
                    <strong>SNMP Monitoring</strong> consulta estado de dispositivos.
                    <strong>NetFlow</strong> describe quién habla con quién.
                    <strong>PCAP</strong> captura paquetes uno a uno.
                    <strong>Wireshark</strong> revela su contenido a ojos expertos.
                </p>
                <p>
                    El <strong>análisis de tráfico</strong> descubre hábitos y anomalías.
                    La <strong>latencia</strong> mide demora,
                    el <strong>throughput</strong> el caudal real,
                    y los <strong>bottlenecks</strong> señalan cuellos de botella.
                    El <strong>capacity planning</strong> prepara el futuro antes de que llegue.
                </p>
            </section>
            <section class="section-box">
                <h2>Seguridad, Criptografía y Gobierno</h2>
                <p>
                    La tríada <strong>CIA</strong> protege tres tesoros:
                    confidencialidad, integridad y disponibilidad.
                    <strong>Autenticación</strong> verifica identidad,
                    <strong>autorización</strong> define permisos,
                    y <strong>AAA</strong> añade registro de acciones.
                </p>
                <p>
                    El <strong>mínimo privilegio</strong> concede solo lo necesario.
                    <strong>Zero Trust</strong> no confía por defecto.
                    <strong>IAM</strong> gobierna identidades y accesos.
                    El <strong>hardening</strong> endurece sistemas frente a ataques.
                </p>
                <p>
                    <strong>Firewalls</strong> filtran tráfico.
                    <strong>IDS/IPS</strong> detectan e impiden amenazas.
                    <strong>VPN</strong> crea túneles seguros.
                    La seguridad moderna también protege APIs, endpoints y microservicios.
                </p>
                <p>
                    El <strong>hashing</strong> genera huellas únicas.
                    El <strong>cifrado simétrico</strong> usa una llave;
                    el <strong>asimétrico</strong>, dos.
                    <strong>TLS/SSL</strong> protege la web.
                    <strong>PKI</strong>, certificados y firmas digitales
                    sostienen la confianza entre desconocidos.
                </p>
                <p>
                    Finalmente, los códices de <strong>ISO 27001</strong>,
                    <strong>NIST</strong>, <strong>GDPR</strong> y <strong>ENS</strong>
                    marcan normas del reino.
                    La <strong>gestión de riesgos</strong>, auditorías,
                    continuidad de negocio y planes DRP
                    preparan al pueblo para tiempos oscuros.
                </p>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "SarumanPage",

    data() {
        return {
            active: null,
            dropdownLeft: 0,
            dropdownTop: 0,
            dropdownWidth: 0,
            hideTimeout: null,
            subItems: [
                {
                    id: "network_basics",
                    name: "Fundamentos de Redes",
                    subs: [
                        "Modelo OSI",
                        "Modelo TCP/IP",
                        "Encapsulación de datos",
                        "Direcciones MAC",
                        "Direcciones IP (IPv4 / IPv6)",
                        "Clases de IP",
                        "CIDR",
                        "Subnetting",
                        "Puerta de enlace (Gateway)",
                        "ARP",
                        "ICMP",
                        "TTL",
                        "Unicast, Broadcast, Multicast",
                        "Tipos de red (LAN, WAN, MAN, PAN)",
                        "Topologías de red",
                        "Medios de transmisión",
                        "Ancho de banda vs latencia"
                    ]
                },
                {
                    id: "protocols_services",
                    name: "Protocolos y Servicios",
                    subs: [
                        "TCP vs UDP",
                        "HTTP / HTTPS",
                        "HTTP/2 y HTTP/3",
                        "DNS",
                        "DHCP",
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
                        "CDN"
                    ]
                },
                {
                    id: "network_architecture",
                    name: "Arquitectura e Infraestructura",
                    subs: [
                        "Switches",
                        "Routers",
                        "Access Points",
                        "Balanceadores de carga",
                        "Cableado estructurado",
                        "Fibra óptica",
                        "Redes WiFi (802.11)",
                        "PoE",
                        "VLANs",
                        "Trunking",
                        "STP",
                        "Redundancia",
                        "Alta disponibilidad",
                        "QoS",
                        "Segmentación de red",
                        "NAT"
                    ]
                },
                {
                    id: "routing_switching",
                    name: "Routing y Conmutación",
                    subs: [
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
                        "ECMP"
                    ]
                },
                {
                    id: "cloud_virtualization",
                    name: "Cloud y Virtualización",
                    subs: [
                        "Computación en la nube",
                        "IaaS, PaaS, SaaS",
                        "Virtualización",
                        "Contenedores",
                        "Docker",
                        "Kubernetes",
                        "Redes en cloud",
                        "VPC",
                        "Subredes en cloud",
                        "Balanceo en cloud",
                        "Escalabilidad",
                        "Alta disponibilidad"
                    ]
                },
                {
                    id: "monitoring_performance",
                    name: "Monitorización y Rendimiento",
                    subs: [
                        "Monitorización de red",
                        "Logs",
                        "Alertas",
                        "Métricas",
                        "SNMP Monitoring",
                        "NetFlow",
                        "Packet Capture (PCAP)",
                        "Wireshark",
                        "Análisis de tráfico",
                        "Latencia",
                        "Throughput",
                        "Bottlenecks",
                        "Capacity Planning"
                    ]
                },
                {
                    id: "security_foundations",
                    name: "Fundamentos de Seguridad",
                    subs: [
                        "CIA Triad",
                        "Autenticación",
                        "Autorización",
                        "Accounting (AAA)",
                        "Principio de mínimo privilegio",
                        "Zero Trust",
                        "Gestión de identidades (IAM)",
                        "Políticas de seguridad",
                        "Hardening de sistemas",
                        "Gestión de vulnerabilidades",
                        "Parcheo de sistemas",
                        "Logs y auditoría"
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
};
</script>

<style scoped>
.saruman-page {
    background: #0b0f17;
    color: #e6e0d4;
    min-height: 100vh;
    font-family: "Cinzel", serif;
}

/* BANNER */
.hero-banner {
    margin-top: 113px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

/* SUBHEADER */
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
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .3px;
    cursor: pointer;

    border-left: 1px solid rgba(200, 169, 106, 0.18);
    border-right: 1px solid rgba(200, 169, 106, 0.18);

    transition: all .22s ease;
}

.sub-item:hover {
    background: #1b2331;
    color: #fff0c9;
}

/* DESPLEGABLE ALINEADO */
.sub-dropdown {
    position: fixed;
    max-height: 72vh;
    overflow-y: auto;
    background: #141414;
    border-left: 1px solid rgba(255, 214, 102, 0.22);
    border-right: 1px solid rgba(255, 214, 102, 0.22);
    border-bottom: 1px solid rgba(255, 214, 102, 0.22);
    border-radius: 0 0 10px 10px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.50);
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a {
    color: #f3e7c2;
    text-decoration: none;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    transition: .2s ease;
}

.submenu a:hover {
    color: #ffd98e;
    transform: translateX(3px);
}

/* CONTENIDO */
.content {
    padding-top: 45px;
    padding-bottom: 60px;
}

/* SCROLL PREMIUM */
.sub-dropdown::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
    background: rgba(200, 169, 106, 0.35);
    border-radius: 10px;
}

/* RESPONSIVE */
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

    .hero-banner {
        margin-top: 52px;
    }

    .content {
        padding-top: 30px;
    }
}
</style>