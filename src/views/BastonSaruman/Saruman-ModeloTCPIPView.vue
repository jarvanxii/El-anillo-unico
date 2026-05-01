<template>
    <div class="saruman-page tcpip-page app-view text-light">
        <section class="hero-banner">
            <img :src="bannerSaruman" alt="El bastón de Saruman" />
        </section>

        <main class="container app-view-content tcpip-content">
            <section class="section-box tcpip-hero">
                <div class="tcpip-hero-copy">
                    <span class="section-kicker">Redes y protocolos</span>
                    <h1 class="section-name">Modelo TCP/IP</h1>
                    <p class="section-copy">
                        TCP/IP significa <strong>Transmission Control Protocol / Internet Protocol</strong>. El nombre
                        se usa para referirse a la suite de protocolos sobre la que funciona internet, no sólo a dos
                        protocolos aislados.
                    </p>
                    <p class="section-copy">
                        TCP proporciona transporte fiable entre procesos. IP proporciona direccionamiento y entrega de
                        paquetes entre redes. Alrededor de ellos trabajan protocolos como UDP, ICMP, ARP, NDP, DNS, HTTP,
                        TLS, SMTP o SSH. TCP/IP es la pila práctica: describe cómo se comunican sistemas reales.
                    </p>
                </div>

                <aside class="tcpip-summary">
                    <div>
                        <span>4</span>
                        <small>capas habituales</small>
                    </div>
                    <div>
                        <span>2</span>
                        <small>protocolos núcleo</small>
                    </div>
                    <div>
                        <span>RFC</span>
                        <small>estandarización</small>
                    </div>
                </aside>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Definición formal</span>
                    <h2 class="module-title">Qué es exactamente TCP/IP</h2>
                </div>

                <div class="reading-prose">
                    <p v-for="paragraph in formalDefinition" :key="paragraph">{{ paragraph }}</p>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Términos técnicos</span>
                    <h2 class="module-title">Glosario técnico</h2>
                    <p class="module-copy">
                        TCP/IP se entiende separando protocolos, direcciones, puertos, rutas y unidades de datos. Si se
                        mezclan esos conceptos, el diagnóstico de red se vuelve impreciso.
                    </p>
                </div>

                <div class="technical-glossary">
                    <div class="technical-row technical-head">
                        <span>Término</span>
                        <span>Significado técnico</span>
                    </div>
                    <div v-for="term in coreTerms" :key="term.term" class="technical-row">
                        <strong>{{ term.term }}</strong>
                        <p>{{ term.definition }}</p>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Mapa general</span>
                    <h2 class="module-title">Resumen de capas</h2>
                    <p class="module-copy">
                        TCP/IP suele explicarse en cuatro capas: aplicación, transporte, internet y acceso a red. Algunos
                        materiales separan enlace y física en un modelo de cinco capas. La idea central no cambia:
                        aplicación define el servicio, transporte separa procesos, internet enruta paquetes y acceso a
                        red entrega tramas en el medio local.
                    </p>
                </div>

                <div class="tcpip-stack-diagram" aria-label="Diagrama textual de las capas TCP/IP">
                    <article v-for="layer in tcpIpLayers" :key="layer.number" class="tcpip-stack-layer">
                        <div class="tcpip-layer-index">{{ layer.number }}</div>
                        <div>
                            <strong>{{ layer.name }}</strong>
                            <span>{{ layer.short }}</span>
                        </div>
                        <em>{{ layer.pdu }}</em>
                    </article>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Encapsulación</span>
                    <h2 class="module-title">Proceso de encapsulación</h2>
                    <p class="module-copy">
                        En TCP/IP, una aplicación entrega datos al transporte; transporte añade puertos y control de
                        entrega; internet añade direcciones IP y control de salto; acceso a red añade cabecera de enlace,
                        trailer si procede y transmite la información como señal física.
                    </p>
                </div>

                <div class="encapsulation-flow">
                    <article v-for="step in encapsulationSteps" :key="step.name" class="encapsulation-step">
                        <span>{{ step.name }}</span>
                        <strong>{{ step.unit }}</strong>
                        <small>{{ step.adds }}</small>
                    </article>
                </div>

                <div class="tcpip-callout">
                    <strong>Regla técnica</strong>
                    <p>
                        IP entrega paquetes entre hosts o interfaces. TCP y UDP entregan datos entre procesos mediante
                        puertos. Ethernet o WiFi entregan tramas en el enlace local. Un fallo en cualquiera de esos
                        niveles puede hacer que la aplicación parezca caída aunque el problema esté por debajo.
                    </p>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Detalle técnico</span>
                    <h2 class="module-title">Capas, responsabilidades y controles</h2>
                </div>

                <div class="layer-detail-list">
                    <article v-for="layer in tcpIpLayers" :key="`detail-${layer.number}`" class="layer-detail">
                        <header>
                            <span>{{ layer.number }}</span>
                            <h3>{{ layer.name }}</h3>
                            <small>{{ layer.short }}</small>
                        </header>
                        <div class="layer-narrative">
                            <p>{{ layer.explanation }}</p>
                            <p>{{ layer.operation }}</p>
                            <p>{{ layer.boundaries }}</p>
                        </div>
                        <dl>
                            <div>
                                <dt>Responsabilidad</dt>
                                <dd>{{ layer.responsibility }}</dd>
                            </div>
                            <div>
                                <dt>Unidad</dt>
                                <dd>{{ layer.pdu }}</dd>
                            </div>
                            <div>
                                <dt>Direccionamiento</dt>
                                <dd>{{ layer.addressing }}</dd>
                            </div>
                            <div>
                                <dt>Protocolos y tecnologías</dt>
                                <dd>{{ layer.examples }}</dd>
                            </div>
                            <div>
                                <dt>Dispositivos o componentes</dt>
                                <dd>{{ layer.devices }}</dd>
                            </div>
                            <div>
                                <dt>Seguridad</dt>
                                <dd>{{ layer.security }}</dd>
                            </div>
                            <div>
                                <dt>Fallos habituales</dt>
                                <dd>{{ layer.failureModes }}</dd>
                            </div>
                            <div>
                                <dt>Evidencia observable</dt>
                                <dd>{{ layer.evidence }}</dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Ejemplo técnico</span>
                    <h2 class="module-title">Qué ocurre al abrir una web HTTPS</h2>
                    <p class="module-copy">
                        El flujo muestra cómo la suite TCP/IP coordina resolución de nombres, conexión, cifrado,
                        direccionamiento, entrega local y respuesta del servidor.
                    </p>
                </div>

                <div class="technical-timeline">
                    <article v-for="step in webJourney" :key="step.layer" class="timeline-step">
                        <span>{{ step.layer }}</span>
                        <div>
                            <strong>{{ step.title }}</strong>
                            <p>{{ step.copy }}</p>
                        </div>
                    </article>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Diagnóstico</span>
                    <h2 class="module-title">Localizar fallos en TCP/IP</h2>
                    <p class="module-copy">
                        El diagnóstico debe separar nombre, aplicación, puerto, ruta IP, resolución del siguiente salto y
                        estado físico del enlace. Saltarse capas produce falsos positivos.
                    </p>
                </div>

                <div class="diagnostic-table">
                    <div class="diagnostic-row diagnostic-head">
                        <span>Capa</span>
                        <span>Pregunta</span>
                        <span>Comprobaciones</span>
                    </div>
                    <div v-for="item in diagnosticPath" :key="item.layer" class="diagnostic-row">
                        <span>{{ item.layer }}</span>
                        <strong>{{ item.question }}</strong>
                        <small>{{ item.checks }}</small>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">TCP/IP frente a OSI</span>
                    <h2 class="module-title">Traducción entre modelos</h2>
                    <p class="module-copy">
                        OSI es más granular como modelo conceptual. TCP/IP es más cercano a la implementación real de
                        internet. La misma comunicación puede describirse con ambos modelos.
                    </p>
                </div>

                <div class="tcpip-map">
                    <article v-for="map in osiMapping" :key="map.tcp" class="tcpip-card">
                        <span>{{ map.tcp }}</span>
                        <strong>{{ map.osi }}</strong>
                        <small>{{ map.copy }}</small>
                    </article>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import bannerSaruman from "@/assets/banners/banner-saruman.png";

export default {
    name: "SarumanModeloTCPIPView",
    data() {
        return {
            bannerSaruman,
            formalDefinition: [
                "TCP/IP significa Transmission Control Protocol / Internet Protocol. En uso técnico, TCP/IP nombra una suite completa de protocolos: IP, TCP, UDP, ICMP, ARP, NDP y muchos protocolos de aplicación que se apoyan en ellos.",
                "TCP/IP es el modelo operativo de internet. Describe cómo una aplicación genera datos, cómo el transporte los asocia a procesos mediante puertos, cómo IP los mueve entre redes y cómo la capa de acceso a red los entrega en el medio local.",
                "La suite está documentada mediante RFCs, Request for Comments, publicadas principalmente en el ecosistema IETF. Una RFC puede definir un protocolo, actualizarlo, declarar una práctica recomendada o retirar comportamientos obsoletos.",
                "TCP/IP no exige que todos los protocolos sean fiables. TCP proporciona fiabilidad a nivel de transporte; UDP no. IP tampoco garantiza entrega, orden ni ausencia de duplicados. Esas propiedades se añaden en capas superiores cuando son necesarias."
            ],
            coreTerms: [
                {
                    term: "TCP",
                    definition: "Transmission Control Protocol. Protocolo de transporte orientado a conexión que ofrece entrega ordenada, retransmisión, control de flujo y control de congestión."
                },
                {
                    term: "IP",
                    definition: "Internet Protocol. Protocolo de capa de internet que proporciona direccionamiento lógico y encaminamiento de paquetes entre redes."
                },
                {
                    term: "UDP",
                    definition: "User Datagram Protocol. Transporte sin conexión que envía datagramas sin confirmación, orden garantizado ni retransmisión integrada."
                },
                {
                    term: "ICMP",
                    definition: "Internet Control Message Protocol. Protocolo de control usado para informar errores y condiciones operativas, como destino inalcanzable o TTL agotado."
                },
                {
                    term: "ARP",
                    definition: "Address Resolution Protocol. En IPv4, resuelve qué dirección MAC corresponde a una dirección IP dentro del enlace local."
                },
                {
                    term: "NDP",
                    definition: "Neighbor Discovery Protocol. En IPv6, reemplaza funciones de ARP y añade descubrimiento de vecinos, routers y autoconfiguración local."
                },
                {
                    term: "RFC",
                    definition: "Request for Comments. Documento técnico usado para especificar protocolos, prácticas y estándares de internet."
                },
                {
                    term: "IETF",
                    definition: "Internet Engineering Task Force. Comunidad abierta que desarrolla y mantiene estándares técnicos de internet."
                },
                {
                    term: "Puerto",
                    definition: "Identificador numérico de transporte que permite entregar datos al proceso correcto dentro de un host. Ejemplos: TCP 443 para HTTPS, UDP 53 para DNS."
                },
                {
                    term: "Socket",
                    definition: "Extremo de comunicación formado por protocolo, IP local, puerto local, IP remota y puerto remoto. Permite distinguir conexiones simultáneas."
                },
                {
                    term: "CIDR",
                    definition: "Classless Inter-Domain Routing. Notación de prefijos como 192.168.1.0/24 o 2001:db8::/32 para expresar redes sin clases rígidas."
                },
                {
                    term: "TTL / Hop Limit",
                    definition: "Time To Live en IPv4 y Hop Limit en IPv6. Campo que reduce cada router para evitar que un paquete circule indefinidamente."
                },
                {
                    term: "MTU",
                    definition: "Maximum Transmission Unit. Tamaño máximo de paquete que puede transportarse por un enlace sin fragmentación en ese medio."
                },
                {
                    term: "MSS",
                    definition: "Maximum Segment Size. Máximo de datos TCP por segmento, calculado normalmente a partir de la MTU menos cabeceras IP y TCP."
                },
                {
                    term: "NAT",
                    definition: "Network Address Translation. Traducción de direcciones, y a menudo puertos, para que múltiples hosts compartan una dirección o crucen dominios de direccionamiento."
                }
            ],
            tcpIpLayers: [
                {
                    number: "Aplicación",
                    name: "Aplicación",
                    short: "Protocolos que implementan servicios consumidos por usuarios o sistemas",
                    pdu: "Datos",
                    examples: "HTTP, HTTPS, DNS, SMTP, IMAP, SSH, FTP, SFTP, NTP, DHCP, SNMP, MQTT",
                    responsibility: "Define el significado de los datos intercambiados: petición web, consulta DNS, envío de correo, sincronización horaria, administración remota o telemetría.",
                    addressing: "Nombres de dominio, URLs, rutas, endpoints, registros DNS, nombres de buzón, identificadores de recurso y parámetros de aplicación.",
                    devices: "Servidores web, resolvers DNS, servidores de correo, API gateways, reverse proxies, WAF, balanceadores L7 y clientes de aplicación.",
                    security: "Autenticación, autorización, validación de entrada, control de sesión, TLS cuando el protocolo lo usa, cabeceras HTTP de seguridad, filtrado WAF y revisión de lógica de negocio.",
                    failureModes: "DNS devuelve un registro incorrecto, HTTP responde 4xx/5xx, un proxy corta la petición, una API deniega autorización, un certificado no valida o el backend no procesa la entrada.",
                    evidence: "Requests HTTP, respuestas, cabeceras, códigos de estado, queries DNS, registros A/AAAA/CNAME/MX/TXT, logs de aplicación, trazas de proxy y errores del servicio.",
                    explanation: "La capa de aplicación contiene protocolos con significado funcional. HTTP define métodos, cabeceras y códigos de estado; DNS define consultas y tipos de registro; SMTP define comandos para transferir correo.",
                    operation: "La aplicación genera datos estructurados y decide a qué servicio quiere hablar. Si el destino se expresa como nombre, normalmente necesita DNS antes de abrir la conexión real. Después delega en transporte la entrega de esos datos al proceso remoto adecuado.",
                    boundaries: "No decide la ruta IP ni entrega tramas en el enlace local. Tampoco convierte bits en señal. Su responsabilidad termina cuando entrega datos al transporte o recibe datos ya reconstruidos desde él."
                },
                {
                    number: "Transporte",
                    name: "Transporte",
                    short: "Comunicación extremo a extremo entre procesos mediante puertos",
                    pdu: "Segmento TCP / datagrama UDP",
                    examples: "TCP, UDP, QUIC, SCTP",
                    responsibility: "Multiplexa procesos mediante puertos y define propiedades de entrega. TCP añade fiabilidad; UDP prioriza simplicidad y baja sobrecarga; QUIC construye transporte moderno sobre UDP.",
                    addressing: "Puerto origen, puerto destino y socket completo: protocolo, IP origen, puerto origen, IP destino y puerto destino.",
                    devices: "Pila TCP/IP del sistema operativo, firewalls L4, balanceadores L4, NAT, sensores de red, herramientas de escaneo y proxies con terminación de conexión.",
                    security: "Filtrado de puertos, exposición mínima de servicios, protección contra SYN flood, timeouts razonables, detección de escaneos, control de conexiones entrantes y salientes.",
                    failureModes: "Puerto cerrado, puerto filtrado, timeout, reset TCP, retransmisiones, pérdida de datagramas UDP, agotamiento de puertos efímeros, problemas de MSS o bloqueo por firewall.",
                    evidence: "SYN, SYN-ACK, ACK, FIN, RST, puertos abiertos, estados LISTEN/ESTABLISHED/TIME_WAIT, retransmisiones, ventanas TCP, datagramas UDP y resultados de nmap o tcpdump.",
                    explanation: "La capa de transporte permite que varias aplicaciones usen la misma IP sin confundirse. El puerto 443 puede identificar HTTPS, el 22 SSH, el 53 DNS, aunque el número de puerto por sí solo no garantiza el protocolo real.",
                    operation: "TCP abre conexión con three-way handshake, numera bytes, confirma recepción, reordena segmentos, retransmite pérdidas, limita envío con control de flujo y ajusta ritmo con control de congestión. UDP envía datagramas independientes sin confirmar entrega.",
                    boundaries: "Transporte no enruta paquetes entre redes. Necesita IP para llegar al host remoto. Tampoco interpreta el contenido de la aplicación salvo que un dispositivo de inspección rompa la separación de capas."
                },
                {
                    number: "Internet",
                    name: "Internet",
                    short: "Direccionamiento lógico y encaminamiento entre redes",
                    pdu: "Paquete IP",
                    examples: "IPv4, IPv6, ICMP, ICMPv6, IPsec, routing, NAT",
                    responsibility: "Entrega paquetes entre redes usando direcciones IP, prefijos, gateways, routers y decisiones de encaminamiento.",
                    addressing: "Direcciones IPv4 o IPv6, prefijos CIDR, gateway, rutas, next-hop, TTL en IPv4 y Hop Limit en IPv6.",
                    devices: "Routers, firewalls L3, gateways, concentradores VPN, NAT gateways, SD-WAN, tablas de routing y stacks IP de host.",
                    security: "Segmentación, filtrado L3, anti-spoofing, diseño de DMZ, rutas controladas, bloqueo de tráfico no esperado, VPN e inspección de ICMP cuando proceda.",
                    failureModes: "Sin ruta al destino, gateway incorrecto, prefijo mal configurado, ruta asimétrica, TTL agotado, NAT roto, firewall L3 bloqueando, solapamiento de redes o fragmentación problemática.",
                    evidence: "ipconfig/ifconfig, ip route, route print, ping, traceroute/tracert, respuestas ICMP, tablas NAT, capturas PCAP, TTL/Hop Limit y logs de firewall.",
                    explanation: "La capa de internet mueve paquetes desde una red origen hasta una red destino. Un host decide si el destino está en su red local; si no lo está, envía el paquete al gateway configurado.",
                    operation: "Los routers comparan la IP destino contra su tabla de rutas y aplican la coincidencia de prefijo más largo. Cada salto reduce TTL u Hop Limit. Si no puede entregar, puede generar ICMP para informar el error.",
                    boundaries: "IP no garantiza entrega, orden, ausencia de duplicados ni entrega al proceso final. Esas propiedades pertenecen al transporte o a la aplicación."
                },
                {
                    number: "Acceso a red",
                    name: "Acceso a red",
                    short: "Entrega local, enlace de datos y transmisión física",
                    pdu: "Trama / bits",
                    examples: "Ethernet, WiFi, ARP, NDP, VLAN 802.1Q, PPP, MAC, FCS",
                    responsibility: "Entrega paquetes IP al siguiente salto dentro del enlace local y transmite la información sobre el medio físico.",
                    addressing: "Direcciones MAC, etiquetas VLAN, BSSID/SSID en WiFi, puerto físico, canal, medio, ARP para IPv4 y NDP para IPv6.",
                    devices: "Tarjetas de red, switches, puntos de acceso, bridges, controladoras WiFi, cables, transceptores, patch panels y adaptadores virtuales.",
                    security: "Port security, WPA2/WPA3, segmentación VLAN, DHCP snooping, Dynamic ARP Inspection, protección STP, control físico de puertos y monitorización de errores.",
                    failureModes: "Cable dañado, enlace caído, VLAN incorrecta, ARP spoofing, tabla MAC saturada, bucles de switching, señal WiFi débil, errores CRC, MTU incompatible o gateway local no resoluble.",
                    evidence: "ip link, ethtool, tablas ARP/neighbor, tablas MAC, tramas Ethernet, etiquetas VLAN, asociaciones WiFi, RSSI, errores CRC, link up/down y capturas de enlace.",
                    explanation: "Acceso a red une funciones que OSI separa en enlace de datos y física. Resuelve cómo llevar un paquete IP hasta el siguiente salto local y cómo convertirlo en señal sobre el medio.",
                    operation: "En Ethernet, el paquete IP se encapsula en una trama con MAC origen, MAC destino y FCS. Si el destino está fuera de la red local, la MAC destino será la del gateway. En IPv4 se usa ARP; en IPv6, NDP.",
                    boundaries: "No decide el camino completo hasta internet. Sólo entrega hasta el siguiente salto local. El enrutamiento global pertenece a la capa de internet."
                }
            ],
            encapsulationSteps: [
                { name: "Aplicación", unit: "Datos", adds: "HTTP, DNS, SSH, SMTP u otro protocolo de servicio" },
                { name: "Transporte", unit: "Segmento / datagrama", adds: "Puerto origen, puerto destino y control TCP/UDP/QUIC" },
                { name: "Internet", unit: "Paquete", adds: "IP origen, IP destino, TTL/Hop Limit, protocolo superior" },
                { name: "Acceso a red", unit: "Trama / bits", adds: "MAC origen, MAC destino, VLAN, FCS y señal física" }
            ],
            webJourney: [
                {
                    layer: "Aplicación",
                    title: "El navegador necesita nombre y servicio",
                    copy: "El usuario escribe una URL HTTPS. El navegador identifica esquema, host, ruta y puerto por defecto 443. Si no tiene la IP del host, genera una consulta DNS."
                },
                {
                    layer: "Aplicación",
                    title: "DNS traduce el nombre",
                    copy: "El resolver devuelve registros A o AAAA. Esa respuesta permite construir el destino IP. DNS puede usar UDP 53, TCP 53 o mecanismos como DoH/DoT según configuración."
                },
                {
                    layer: "Transporte",
                    title: "TCP abre conexión al puerto 443",
                    copy: "El cliente elige un puerto efímero local y abre conexión hacia IP destino puerto 443. TCP negocia con SYN, SYN-ACK y ACK antes de transportar datos de aplicación."
                },
                {
                    layer: "Aplicación",
                    title: "TLS protege la comunicación HTTPS",
                    copy: "TLS valida el certificado, negocia claves y cifra el canal. Aunque TLS se estudia a menudo entre presentación y aplicación en OSI, en TCP/IP forma parte del servicio usado por la aplicación."
                },
                {
                    layer: "Internet",
                    title: "IP enruta cada paquete",
                    copy: "Cada segmento TCP viaja dentro de un paquete IP. Los routers sólo necesitan dirección destino, tabla de rutas y políticas aplicables para elegir el siguiente salto."
                },
                {
                    layer: "Acceso a red",
                    title: "El enlace entrega al gateway o al destino local",
                    copy: "Si el servidor no está en la red local, el host encapsula el paquete en una trama hacia la MAC del gateway. ARP o NDP resuelven esa MAC."
                },
                {
                    layer: "Respuesta",
                    title: "La respuesta vuelve por la pila",
                    copy: "El servidor responde con paquetes IP hacia el cliente. NAT, firewalls o balanceadores pueden modificar direcciones, puertos o trayectoria, pero el receptor reconstruye el flujo en sentido inverso."
                }
            ],
            diagnosticPath: [
                { layer: "Aplicación", question: "¿El nombre y el servicio responden?", checks: "curl, dig/nslookup, códigos HTTP, certificados TLS, logs de aplicación, respuesta DNS y cabeceras." },
                { layer: "Transporte", question: "¿El puerto está accesible?", checks: "nmap, nc/Test-NetConnection, ss/netstat, tcpdump/Wireshark, SYN/SYN-ACK/RST, timeouts y firewall L4." },
                { layer: "Internet", question: "¿Existe ruta IP?", checks: "ipconfig/ip addr, ip route/route print, ping, traceroute/tracert, TTL/Hop Limit, gateway, NAT y reglas L3." },
                { layer: "Acceso a red", question: "¿El siguiente salto local es alcanzable?", checks: "ip link, ethtool, arp -a/ip neigh, VLAN, WiFi, tabla MAC, estado físico, errores CRC y MTU." }
            ],
            osiMapping: [
                { tcp: "Aplicación TCP/IP", osi: "OSI 7, 6 y 5", copy: "Agrupa servicio, formato, cifrado de aplicación y estado de conversación." },
                { tcp: "Transporte", osi: "OSI 4", copy: "TCP, UDP y QUIC: puertos, multiplexación y propiedades de entrega." },
                { tcp: "Internet", osi: "OSI 3", copy: "IP, ICMP y routing: direcciones lógicas y salto entre redes." },
                { tcp: "Acceso a red", osi: "OSI 2 y 1", copy: "Ethernet, WiFi, ARP/NDP, MAC, tramas, medio y señal física." }
            ]
        };
    }
};
</script>

<style scoped>
.tcpip-content {
    max-width: 1120px;
}

.tcpip-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 28px;
    align-items: start;
}

.tcpip-hero-copy {
    display: grid;
    gap: 12px;
}

.tcpip-summary {
    display: grid;
    gap: 12px;
}

.tcpip-summary div {
    padding: 18px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.tcpip-summary span {
    display: block;
    color: var(--view-text-strong);
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
}

.tcpip-summary small {
    color: var(--view-text-muted);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.tcpip-stack-diagram,
.encapsulation-flow,
.layer-detail-list,
.diagnostic-table,
.tcpip-map,
.technical-glossary,
.technical-timeline {
    margin-top: 22px;
}

.reading-prose {
    display: grid;
    gap: 14px;
    max-width: 96ch;
}

.reading-prose p {
    margin: 0;
    color: var(--view-text-soft);
    font-size: 1rem;
    line-height: 1.82;
}

.technical-glossary,
.technical-timeline {
    display: grid;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--view-surface-strong);
}

.technical-row,
.timeline-step {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 18px;
    padding: 15px 16px;
    border-bottom: 1px solid var(--view-border);
}

.technical-row:last-child,
.timeline-step:last-child {
    border-bottom: 0;
}

.technical-head {
    background: color-mix(in srgb, var(--view-surface-soft) 88%, black 12%);
}

.technical-head span,
.technical-row strong,
.timeline-step > span {
    color: var(--view-accent);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.technical-row p,
.timeline-step p {
    margin: 0;
    color: var(--view-text-soft);
    line-height: 1.72;
}

.timeline-step strong {
    display: block;
    margin-bottom: 6px;
    color: var(--view-text-strong);
}

.tcpip-stack-diagram {
    display: grid;
    gap: 10px;
}

.tcpip-stack-layer {
    display: grid;
    grid-template-columns: 130px minmax(0, 1fr) 170px;
    gap: 16px;
    align-items: center;
    padding: 14px 16px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.tcpip-layer-index,
.tcpip-stack-layer em {
    color: var(--view-accent);
    font-size: 0.78rem;
    font-style: normal;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.tcpip-stack-layer strong {
    display: block;
    color: var(--view-text-strong);
    font-size: 1rem;
}

.tcpip-stack-layer span {
    color: var(--view-text-soft);
}

.encapsulation-flow {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
}

.encapsulation-step {
    position: relative;
    display: grid;
    gap: 8px;
    min-height: 150px;
    padding: 16px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.encapsulation-step:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -13px;
    width: 13px;
    height: 1px;
    background: var(--view-border-soft);
}

.encapsulation-step span,
.layer-detail header span,
.tcpip-card span {
    color: var(--view-accent);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.encapsulation-step strong,
.tcpip-card strong {
    color: var(--view-text-strong);
    font-size: 1rem;
}

.encapsulation-step small,
.tcpip-card small,
.diagnostic-row small {
    color: var(--view-text-muted);
    line-height: 1.55;
}

.tcpip-callout {
    margin-top: 18px;
    padding: 18px;
    border-left: 3px solid var(--view-accent);
    background: color-mix(in srgb, var(--view-surface-strong) 86%, black 14%);
}

.tcpip-callout strong,
.layer-detail h3 {
    color: var(--view-text-strong);
}

.tcpip-callout p,
.layer-narrative p {
    margin: 8px 0 0;
    color: var(--view-text-soft);
    line-height: 1.78;
}

.layer-detail-list {
    display: grid;
    gap: 18px;
}

.layer-detail {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    padding: 22px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.layer-detail header {
    padding-bottom: 14px;
    border-bottom: 1px solid var(--view-border);
}

.layer-detail h3 {
    margin: 8px 0 0;
    font-size: 1.35rem;
}

.layer-detail header small {
    display: block;
    margin-top: 6px;
    color: var(--view-text-muted);
    font-size: 0.92rem;
    line-height: 1.5;
}

.layer-narrative {
    display: grid;
    gap: 4px;
    max-width: 98ch;
}

.layer-detail dl {
    display: grid;
    margin: 0;
    border-top: 1px solid var(--view-border);
}

.layer-detail dl div {
    padding: 14px 0;
    border-bottom: 1px solid var(--view-border);
}

.layer-detail dl div:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.layer-detail dt {
    color: var(--view-text);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.layer-detail dd {
    margin: 6px 0 0;
    color: var(--view-text-soft);
    line-height: 1.68;
}

.diagnostic-table {
    display: grid;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    overflow: hidden;
}

.diagnostic-row {
    display: grid;
    grid-template-columns: 170px minmax(180px, 0.7fr) minmax(0, 1fr);
    gap: 16px;
    align-items: center;
    padding: 14px 16px;
    background: var(--view-surface-strong);
    border-bottom: 1px solid var(--view-border);
}

.diagnostic-row:last-child {
    border-bottom: 0;
}

.diagnostic-row > span,
.diagnostic-row strong {
    color: var(--view-text-strong);
}

.diagnostic-head {
    background: color-mix(in srgb, var(--view-surface-soft) 88%, black 12%);
}

.diagnostic-head span {
    color: var(--view-accent);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.tcpip-map {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
}

.tcpip-card {
    display: grid;
    gap: 8px;
    padding: 16px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

@media (max-width: 991px) {
    .tcpip-hero {
        grid-template-columns: minmax(0, 1fr);
    }

    .encapsulation-flow,
    .tcpip-map {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .encapsulation-step:not(:last-child)::after {
        display: none;
    }
}

@media (max-width: 767px) {
    .tcpip-stack-layer,
    .diagnostic-row,
    .technical-row,
    .timeline-step {
        grid-template-columns: minmax(0, 1fr);
    }

    .encapsulation-flow,
    .tcpip-map {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
