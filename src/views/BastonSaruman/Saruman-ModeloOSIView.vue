<template>
    <div class="saruman-page osi-page app-view text-light">
        <section class="hero-banner">
            <img :src="bannerSaruman" alt="El bastón de Saruman" />
        </section>

        <main class="container app-view-content osi-content">
            <section class="section-box osi-hero">
                <div class="osi-hero-copy">
                    <span class="section-kicker">Redes y protocolos</span>
                    <h1 class="section-name">Modelo OSI</h1>
                    <p class="section-copy">
                        OSI significa <strong>Open Systems Interconnection</strong>, en español Interconexión de
                        Sistemas Abiertos. Es un modelo de referencia publicado por ISO para describir cómo dos sistemas
                        distintos pueden comunicarse mediante una arquitectura dividida en siete capas.
                    </p>
                    <p class="section-copy">
                        No es un protocolo ni una implementación. Es un modelo de referencia para separar
                        responsabilidades, nombrar unidades de datos, localizar fallos y ubicar controles de seguridad.
                        En una transmisión real, los datos se formatean, se protegen si procede, se asocian a una
                        sesión, se transportan por puertos, se enrutan por IP, se entregan en el enlace local y terminan
                        convertidos en señal física.
                    </p>
                </div>

                <aside class="osi-summary">
                    <div>
                        <span>7</span>
                        <small>capas</small>
                    </div>
                    <div>
                        <span>4</span>
                        <small>PDUs clave</small>
                    </div>
                    <div>
                        <span>2</span>
                        <small>direcciones principales</small>
                    </div>
                </aside>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Definición formal</span>
                    <h2 class="module-title">Qué es exactamente OSI</h2>
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
                        El modelo OSI usa palabras muy concretas. Si no se distinguen PDU, SDU, encapsulación,
                        direcciones y capas pares, no se puede diagnosticar con precisión.
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
                        Las capas 7, 6 y 5 describen servicio, representación y diálogo. La capa 4 separa procesos y
                        controla la conversación extremo a extremo. La capa 3 decide el camino entre redes. La capa 2
                        mueve tramas en el enlace local. La capa 1 transporta bits como señal física.
                    </p>
                </div>

                <div class="osi-stack-diagram" aria-label="Diagrama textual de las siete capas OSI">
                    <article v-for="layer in osiLayers" :key="layer.number" class="osi-stack-layer">
                        <div class="osi-layer-index">Capa {{ layer.number }}</div>
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
                        Encapsular significa que cada capa añade información de control a los datos recibidos de la capa
                        superior. Esa información suele ir en cabeceras; en enlace de datos también puede existir una
                        cola o trailer. En destino ocurre la desencapsulación: cada capa interpreta y retira su propia
                        cabecera antes de entregar la carga útil a la siguiente.
                    </p>
                </div>

                <div class="encapsulation-flow">
                    <article v-for="step in encapsulationSteps" :key="step.name" class="encapsulation-step">
                        <span>{{ step.name }}</span>
                        <strong>{{ step.unit }}</strong>
                        <small>{{ step.adds }}</small>
                    </article>
                </div>

                <div class="osi-callout">
                    <strong>Regla técnica</strong>
                    <p>
                        Al enviar, los datos bajan de capa 7 a capa 1. Al recibir, suben de capa 1 a capa 7. Por eso un
                        error físico puede impedir que HTTP funcione, pero un error HTTP no rompe el enlace físico. Las
                        dependencias suben; las responsabilidades se aíslan por capa.
                    </p>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Detalle técnico</span>
                    <h2 class="module-title">Capas, responsabilidades y controles</h2>
                </div>

                <div class="layer-detail-list">
                    <article v-for="layer in osiLayers" :key="`detail-${layer.number}`" class="layer-detail">
                        <header>
                            <span>Capa {{ layer.number }}</span>
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
                        TCP/IP agrupa funciones que OSI separa conceptualmente. El flujo siguiente usa OSI para ubicar
                        responsabilidades durante una conexión HTTPS real.
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
                    <h2 class="module-title">Subir por capas para encontrar el fallo</h2>
                    <p class="module-copy">
                        En troubleshooting se empieza por las capas inferiores porque son dependencias de las superiores.
                        Si no hay enlace, no hay IP; si no hay ruta IP, no hay TCP; si no hay sesión TLS válida, HTTP no
                        podrá entregar una respuesta útil.
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
                    <span class="section-kicker">OSI frente a TCP/IP</span>
                    <h2 class="module-title">El mapa académico y la ruta de internet</h2>
                    <p class="module-copy">
                        OSI separa ideas con precisión conceptual. TCP/IP describe la pila práctica usada por internet.
                        OSI ayuda a explicar el problema; TCP/IP ayuda a operar sobre sistemas reales.
                    </p>
                </div>

                <div class="tcpip-map">
                    <article v-for="map in tcpIpMapping" :key="map.tcp" class="tcpip-card">
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
import bannerSaruman from "@/assets/banners/banner-saruman.webp";

export default {
    name: "SarumanModeloOSIView",
    data() {
        return {
            bannerSaruman,
            formalDefinition: [
                "OSI significa Open Systems Interconnection. El nombre completo importa: 'Open Systems' se refiere a sistemas capaces de interoperar aunque sean de fabricantes o arquitecturas diferentes; 'Interconnection' se refiere al conjunto de funciones necesarias para que esos sistemas intercambien datos de forma ordenada.",
                "El modelo OSI pertenece a la familia de estándares ISO/IEC 7498. Su objetivo no es reemplazar TCP/IP, sino proporcionar un marco común para describir comunicación de red. Cuando alguien dice que un fallo está en capa 3 o que una protección actúa en capa 7, está usando OSI como lenguaje de diagnóstico y arquitectura.",
                "Cada capa ofrece servicios a la capa superior y consume servicios de la capa inferior. La capa superior no necesita conocer el detalle interno de la inferior: una aplicación no tiene que saber cómo una tarjeta de red modula una señal eléctrica para poder enviar una petición HTTP.",
                "Las capas no son cajas físicas obligatorias. En sistemas reales, una misma pieza de software o hardware puede cubrir funciones de varias capas. Un navegador trabaja en aplicación, invoca TLS, abre sockets TCP y delega en el sistema operativo la resolución, el transporte y la interfaz de red."
            ],
            coreTerms: [
                {
                    term: "OSI",
                    definition: "Open Systems Interconnection. Modelo de referencia de siete capas para describir comunicación entre sistemas abiertos e interoperables."
                },
                {
                    term: "ISO",
                    definition: "International Organization for Standardization. Organización que publica estándares internacionales; el modelo OSI está asociado a ISO/IEC 7498."
                },
                {
                    term: "Capa",
                    definition: "Nivel funcional con responsabilidades delimitadas. Cada capa ofrece servicios hacia arriba, usa servicios hacia abajo y se comunica lógicamente con su capa equivalente en el sistema remoto."
                },
                {
                    term: "PDU",
                    definition: "Protocol Data Unit. Unidad de datos manejada por una capa concreta: datos, segmento, datagrama, paquete, trama o bits, según el nivel del modelo."
                },
                {
                    term: "SDU",
                    definition: "Service Data Unit. Datos que una capa recibe desde la capa superior antes de añadir su propia información de control."
                },
                {
                    term: "Encapsulación",
                    definition: "Proceso por el que una capa añade cabeceras o trailers a la SDU para formar su PDU. Esa información permite direccionar, controlar, verificar o entregar los datos."
                },
                {
                    term: "Desencapsulación",
                    definition: "Proceso inverso: el receptor interpreta y retira la información de control de cada capa hasta entregar los datos originales a la aplicación."
                },
                {
                    term: "Comunicación entre pares",
                    definition: "Relación lógica entre la misma capa en dos sistemas. TCP de un host habla conceptualmente con TCP del otro, aunque físicamente los bits recorran capas inferiores."
                },
                {
                    term: "SAP",
                    definition: "Service Access Point. Punto lógico donde una capa superior accede al servicio de una capa inferior; por ejemplo, un puerto puede verse como punto de acceso al transporte."
                },
                {
                    term: "MTU",
                    definition: "Maximum Transmission Unit. Tamaño máximo de una unidad que puede enviarse por un enlace sin fragmentación en ese medio."
                },
                {
                    term: "MSS",
                    definition: "Maximum Segment Size. Cantidad máxima de datos TCP que cabe en un segmento, normalmente calculada a partir de la MTU menos cabeceras IP y TCP."
                }
            ],
            osiLayers: [
                {
                    number: "7",
                    name: "Aplicación",
                    short: "Servicios que usan personas o programas",
                    pdu: "Datos",
                    examples: "HTTP, HTTPS, DNS, SMTP, IMAP, POP3, SSH, FTP, SFTP, APIs REST, GraphQL",
                    responsibility: "Define servicios de red consumidos por aplicaciones: transferencia web, resolución de nombres, correo, administración remota, intercambio de ficheros o llamadas API.",
                    addressing: "Nombres de dominio, URLs, URIs, endpoints, rutas de API, buzones de correo y otros identificadores lógicos propios de la aplicación.",
                    devices: "Proxies, reverse proxies, WAF, gateways API, balanceadores L7, servidores web, servidores DNS, servidores de correo.",
                    security: "Autenticación, autorización, validación de entrada, control de sesión, cabeceras HTTP de seguridad, protección contra inyección, XSS, CSRF, SSRF e IDOR.",
                    failureModes: "Respuestas HTTP 4xx/5xx, errores de autorización, parámetros mal validados, timeouts de backend, respuestas DNS incorrectas, APIs sin control de acceso y errores de lógica de negocio.",
                    evidence: "Requests y responses HTTP, códigos de estado, cabeceras, cuerpos JSON/XML, logs de aplicación, trazas de API, queries DNS, errores del backend.",
                    explanation: "Es la capa donde se expresa la intención funcional de la comunicación. Una petición HTTP, una consulta DNS, un comando SMTP o una llamada GraphQL pertenecen a esta capa porque describen qué servicio se solicita y con qué datos.",
                    operation: "Opera con estructuras semánticas: métodos, rutas, cabeceras, parámetros, códigos de respuesta, comandos, registros, recursos y formatos de mensaje. Un servidor web interpreta `GET /login`, un DNS interpreta una consulta tipo A o AAAA, y un servidor SMTP interpreta comandos como `MAIL FROM` o `RCPT TO`.",
                    boundaries: "No representa la interfaz gráfica que ve el usuario. Tampoco decide cómo se enruta el paquete ni cómo se codifican físicamente los bits. La aplicación formula el mensaje y delega transporte, direccionamiento y transmisión a capas inferiores."
                },
                {
                    number: "6",
                    name: "Presentación",
                    short: "Formato, cifrado y traducción",
                    pdu: "Datos",
                    examples: "TLS, ASN.1, DER, PEM, UTF-8, JSON, XML, Base64, compresión, serialización",
                    responsibility: "Transforma la representación de los datos para que emisor y receptor los interpreten igual: codificación de caracteres, serialización, compresión, cifrado y negociación de formatos.",
                    addressing: "No suele direccionar hosts. Trabaja con identificadores de formato, suites criptográficas, certificados, claves, algoritmos y tipos de contenido.",
                    devices: "Bibliotecas TLS, parsers, serializadores, middleware, terminadores TLS, módulos criptográficos, HSM y componentes de compresión.",
                    security: "Validación de certificados, versiones TLS seguras, algoritmos no obsoletos, parsing robusto, protección de claves privadas, deserialización segura y control de downgrade.",
                    failureModes: "Certificados expirados o no confiables, incompatibilidad de cipher suites, errores de codificación, compresión mal aplicada, parsing ambiguo y deserialización insegura.",
                    evidence: "Handshake TLS, certificado presentado, cadena de confianza, cipher suite, versión TLS, errores de validación, formatos de payload y fallos de parsing.",
                    explanation: "Es la capa que hace que los datos tengan una representación común y verificable entre emisor y receptor. Si dos sistemas no interpretan igual los bytes, la comunicación puede llegar intacta a nivel de red y aun así ser inútil a nivel de aplicación.",
                    operation: "Aquí aparecen codificación de caracteres, serialización, compresión, cifrado, firma y negociación de formatos. En HTTPS, TLS negocia versión, algoritmo de intercambio de claves, algoritmo simétrico, función de autenticación e identidad del servidor mediante certificado.",
                    boundaries: "No decide si un usuario tiene permiso para una acción; eso corresponde a aplicación. No decide por qué ruta viaja un paquete; eso corresponde a red. Su función es convertir, proteger o normalizar la representación de los datos."
                },
                {
                    number: "5",
                    name: "Sesión",
                    short: "Control del diálogo",
                    pdu: "Datos",
                    examples: "Sesiones de aplicación, tokens, checkpoints, RPC, control de diálogo",
                    responsibility: "Establece, mantiene, sincroniza y termina diálogos entre aplicaciones. Puede gestionar reanudación, checkpoints, control de estado y coordinación de intercambio.",
                    addressing: "Identificadores de sesión, tokens, cookies de sesión, IDs de conversación, canales RPC y contexto autenticado.",
                    devices: "Frameworks web, gestores de sesión, middleware de autenticación, servicios RPC, brokers, proxies con persistencia de sesión.",
                    security: "Expiración correcta, rotación de tokens, invalidación al cerrar sesión, protección contra session fixation, secuestro de sesión y reutilización indebida.",
                    failureModes: "Tokens sin expiración, cookies reutilizables tras logout, sesiones que no rotan después de autenticarse, pérdida de estado, reanudación indebida y correlación incorrecta entre usuario y contexto.",
                    evidence: "Cookies, tokens, session IDs, eventos de login/logout, renovaciones, expiraciones, correlaciones de request y estado de conversación.",
                    explanation: "Es la capa que razona sobre la continuidad de una conversación. Dos mensajes pueden pertenecer al mismo diálogo aunque viajen en paquetes distintos, conexiones distintas o incluso después de una pausa.",
                    operation: "Mantiene contexto: quién inició la conversación, qué intercambio está activo, si puede reanudarse, si hay checkpoints y cuándo debe cerrarse. En aplicaciones web modernas esto suele verse como cookies, tokens, sesiones server-side, contextos RPC o canales persistentes.",
                    boundaries: "Una conexión TCP no equivale siempre a una sesión de aplicación. TCP puede cerrarse y una sesión web seguir viva mediante cookie; una cookie puede existir aunque el transporte sea nuevo. Por eso sesión y transporte se diagnostican por separado."
                },
                {
                    number: "4",
                    name: "Transporte",
                    short: "Puertos y entrega extremo a extremo",
                    pdu: "Segmento / datagrama",
                    examples: "TCP, UDP, QUIC",
                    responsibility: "Comunica procesos extremo a extremo mediante puertos. Puede proporcionar fiabilidad, orden, control de flujo, control de congestión, retransmisiones y multiplexación.",
                    addressing: "Puertos origen y destino. Un socket se identifica normalmente por protocolo, IP origen, puerto origen, IP destino y puerto destino.",
                    devices: "Firewalls L4, balanceadores L4, NAT, sistemas operativos, pilas TCP/IP, sensores de red y herramientas de escaneo.",
                    security: "Filtrado de puertos, reducción de servicios expuestos, protección frente a SYN flood, análisis de conexiones, control de timeouts y detección de escaneos.",
                    failureModes: "Puerto cerrado, puerto filtrado, resets inesperados, retransmisiones, pérdida de segmentos, agotamiento de puertos efímeros, ventanas TCP anómalas y latencia causada por congestión.",
                    evidence: "TCP three-way handshake, flags SYN/ACK/FIN/RST, puertos abiertos o filtrados, retransmisiones, resets, timeouts, datagramas UDP y estados de conexión.",
                    explanation: "Es la capa que permite que dos procesos se comuniquen extremo a extremo. La dirección IP lleva el paquete hasta una máquina o interfaz; el puerto permite entregarlo al proceso correcto dentro de ese sistema.",
                    operation: "TCP establece una conexión lógica con three-way handshake, numera bytes, confirma recepción con ACK, reordena datos, retransmite pérdidas, aplica control de flujo mediante ventanas y control de congestión. UDP no crea sesión ni confirma entrega: envía datagramas independientes. QUIC usa UDP como base y añade cifrado, streams y control de conexión en espacio de usuario.",
                    boundaries: "Transporte no sabe si el contenido es una contraseña, una imagen o una consulta DNS. Sólo ve flujos, datagramas, puertos, estados y temporización. La interpretación del contenido pertenece a capas superiores."
                },
                {
                    number: "3",
                    name: "Red",
                    short: "Direccionamiento IP y rutas",
                    pdu: "Paquete",
                    examples: "IPv4, IPv6, ICMP, routers, tablas de routing, NAT",
                    responsibility: "Permite comunicación entre redes distintas. Selecciona rutas, maneja direccionamiento lógico, TTL o Hop Limit, fragmentación según protocolo y mensajes de control.",
                    addressing: "Direcciones IPv4 e IPv6, prefijos CIDR, gateway, rutas, next-hop, direcciones origen y destino de paquete.",
                    devices: "Routers, firewalls L3, gateways, VPN concentrators, NAT gateways, SD-WAN, balanceadores con funciones L3.",
                    security: "Segmentación por subredes, ACLs, rutas controladas, filtrado ICMP, protección frente a spoofing, control de exposición pública y diseño de DMZ.",
                    failureModes: "Gateway incorrecto, máscara o prefijo mal calculado, ruta ausente, ruta asimétrica, NAT mal definido, TTL agotado, firewall L3 bloqueando tráfico y solapamiento de subredes.",
                    evidence: "Tablas de ruta, traceroute, TTL/Hop Limit, respuestas ICMP, paquetes IP, NAT translations, prefijos, gateway y capturas PCAP.",
                    explanation: "Es la capa que permite cruzar límites entre redes. Un host puede conocer la red local por su máscara o prefijo; si el destino está fuera, entrega el paquete al gateway para que el enrutamiento continúe.",
                    operation: "Los routers toman decisiones mediante tablas de rutas y coincidencia de prefijo más largo. IP añade dirección origen, dirección destino y TTL en IPv4 o Hop Limit en IPv6. ICMP informa errores y condiciones de control, como destino inalcanzable o tiempo excedido.",
                    boundaries: "Red no entrega a procesos; eso lo hace transporte con puertos. Tampoco entrega dentro del enlace local por sí sola; necesita capa 2 para convertir el siguiente salto en una trama hacia una MAC concreta."
                },
                {
                    number: "2",
                    name: "Enlace de datos",
                    short: "Tramas, MAC y salto local",
                    pdu: "Trama",
                    examples: "Ethernet, WiFi, switches, VLAN, ARP, STP",
                    responsibility: "Entrega tramas dentro de un mismo enlace local. Controla acceso al medio, direcciones MAC, detección de errores de trama, VLANs y aprendizaje de switches.",
                    addressing: "Direcciones MAC origen y destino, etiquetas VLAN 802.1Q, BSSID/SSID en WiFi y resolución ARP para mapear IP a MAC en IPv4.",
                    devices: "Switches, tarjetas de red, puntos de acceso, bridges, controladoras WiFi, taps de red y adaptadores virtuales.",
                    security: "Port security, DHCP snooping, Dynamic ARP Inspection, segmentación VLAN, WPA2/WPA3, protección contra loops, MAC flooding y VLAN hopping.",
                    failureModes: "ARP spoofing, tormentas de broadcast, bucles de switching, VLAN mal etiquetada, tabla MAC saturada, puerto erróneo, negociación dúplex incorrecta y asociación WiFi inestable.",
                    evidence: "Tramas Ethernet, ARP requests/replies, tablas MAC/CAM, etiquetas VLAN, asociaciones WiFi, errores FCS, STP y capturas de enlace.",
                    explanation: "Es la capa que entrega información dentro del mismo dominio de enlace. Si capa 3 dice 'envía este paquete al gateway', capa 2 resuelve cómo alcanzar físicamente ese gateway en el segmento local.",
                    operation: "Ethernet encapsula el paquete IP dentro de una trama con MAC origen, MAC destino y tipo de protocolo. Los switches aprenden qué MAC está detrás de cada puerto y reenvían tramas según su tabla CAM. VLAN 802.1Q añade una etiqueta para separar dominios lógicos sobre la misma infraestructura física.",
                    boundaries: "Enlace no calcula rutas entre redes. ARP puede resolver la MAC del gateway local, pero no decide el camino completo hasta internet. Su ámbito termina en el siguiente salto del enlace."
                },
                {
                    number: "1",
                    name: "Física",
                    short: "Señal, medio y bits",
                    pdu: "Bits",
                    examples: "Cobre, fibra, radio WiFi, conectores, potencia, velocidad de enlace",
                    responsibility: "Transmite bits como señales eléctricas, ópticas o radioeléctricas. Define medio, conectores, frecuencias, modulación, sincronización, potencia y velocidad física.",
                    addressing: "No usa direcciones lógicas. Trabaja con señales, canales, pares, fibras, frecuencias, puertos físicos y parámetros de enlace.",
                    devices: "Cables, conectores, transceptores SFP/SFP+, repetidores, hubs, antenas, radios, patch panels, tarjetas de red y puertos físicos.",
                    security: "Control físico de puertos, protección de armarios, prevención de tapping, control de interferencias, jamming, cableado expuesto y acceso no autorizado al medio.",
                    failureModes: "Cable dañado, fibra sucia, potencia óptica fuera de rango, interferencias, jamming, mala crimpación, velocidad o dúplex mal negociados y pérdida intermitente de enlace.",
                    evidence: "Link up/down, errores CRC, potencia óptica, negociación de velocidad, dúplex, RSSI WiFi, ruido, pérdida de señal y contadores de interfaz.",
                    explanation: "Es la capa que convierte bits en fenómenos físicos medibles: voltaje sobre cobre, pulsos de luz sobre fibra o radiofrecuencia en WiFi. Sin una señal estable, ninguna cabecera superior llega a existir de forma útil.",
                    operation: "Define medios, conectores, modulación, sincronización, velocidad de línea, potencia y negociación física. En cobre pueden aparecer problemas de pares, ruido o dúplex; en fibra importan potencia óptica, limpieza y tipo de transceptor; en radio importan canal, interferencia, potencia y relación señal-ruido.",
                    boundaries: "Física no entiende tramas, MAC, IP ni puertos. Sólo transporta símbolos o bits. Que el enlace esté activo no garantiza que la VLAN sea correcta, ni que exista ruta, ni que la aplicación responda."
                }
            ],
            encapsulationSteps: [
                { name: "Aplicación", unit: "Datos", adds: "Petición, respuesta, nombre de dominio o payload" },
                { name: "Transporte", unit: "Segmento", adds: "Puerto origen, puerto destino, control TCP/UDP" },
                { name: "Red", unit: "Paquete", adds: "IP origen, IP destino, TTL y ruta lógica" },
                { name: "Enlace", unit: "Trama", adds: "MAC origen, MAC destino, VLAN y control local" },
                { name: "Física", unit: "Bits", adds: "Señal sobre cobre, fibra o radio" }
            ],
            diagnosticPath: [
                { layer: "1 Física", question: "¿Hay señal?", checks: "Cable, enlace, WiFi, potencia, velocidad negociada, interfaz levantada." },
                { layer: "2 Enlace", question: "¿Hay vecindad local?", checks: "MAC, VLAN, ARP, switch, tabla CAM, asociación WiFi." },
                { layer: "3 Red", question: "¿Hay camino IP?", checks: "IP, máscara, gateway, rutas, ICMP, NAT, ACLs de red." },
                { layer: "4 Transporte", question: "¿El puerto responde?", checks: "TCP handshake, UDP, firewall, listener, timeout, reset." },
                { layer: "5-6 Sesión/Presentación", question: "¿La conversación se entiende?", checks: "Sesión, TLS, certificados, versión de protocolo, codificación." },
                { layer: "7 Aplicación", question: "¿El servicio responde bien?", checks: "HTTP status, DNS lógico, autenticación, permisos, payload, backend." }
            ],
            tcpIpMapping: [
                { tcp: "Aplicación TCP/IP", osi: "OSI 7, 6 y 5", copy: "HTTP, DNS, TLS, sesiones y lógica de servicio." },
                { tcp: "Transporte", osi: "OSI 4", copy: "TCP y UDP: puertos, entrega, reintentos y multiplexación." },
                { tcp: "Internet", osi: "OSI 3", copy: "IP e ICMP: direccionamiento y rutas entre redes." },
                { tcp: "Acceso a red", osi: "OSI 2 y 1", copy: "Ethernet, WiFi, MAC, tramas, señal y medio físico." }
            ],
            webJourney: [
                {
                    layer: "Capa 7",
                    title: "El navegador genera una petición HTTP",
                    copy: "El usuario escribe una URL. El navegador determina esquema, host, ruta, cabeceras, cookies aplicables y método. Si necesita resolver el dominio, usará DNS como protocolo de aplicación."
                },
                {
                    layer: "Capa 6",
                    title: "TLS negocia confidencialidad e integridad",
                    copy: "En HTTPS, TLS acuerda versión, algoritmos, claves efímeras y valida el certificado del servidor. El contenido HTTP queda protegido dentro del canal cifrado."
                },
                {
                    layer: "Capa 5",
                    title: "Se mantiene el estado de la conversación",
                    copy: "La sesión puede existir como conexión persistente, cookie, token o contexto autenticado. Aquí se razona si el diálogo sigue siendo válido y si debe reutilizarse o cerrarse."
                },
                {
                    layer: "Capa 4",
                    title: "TCP separa procesos con puertos",
                    copy: "El cliente abre un socket hacia el puerto 443 del servidor. TCP establece conexión con SYN, SYN-ACK y ACK, numera bytes, confirma recepción y retransmite si hay pérdida."
                },
                {
                    layer: "Capa 3",
                    title: "IP entrega paquetes entre redes",
                    copy: "Cada segmento TCP se encapsula en un paquete IP con dirección origen y destino. Los routers miran la IP destino y eligen el siguiente salto hasta acercarlo a la red final."
                },
                {
                    layer: "Capa 2",
                    title: "Ethernet o WiFi entrega al siguiente salto local",
                    copy: "El host necesita una MAC destino local: la del gateway si el servidor está fuera de la red local. La trama lleva MAC origen, MAC destino y el paquete IP como carga."
                },
                {
                    layer: "Capa 1",
                    title: "El medio físico transporta bits",
                    copy: "La tarjeta de red convierte la trama en señal eléctrica, óptica o radio. El receptor reconstruye bits y el proceso sube de nuevo por las capas hasta HTTP."
                }
            ]
        };
    }
};
</script>

<style scoped>
.osi-content {
    max-width: 1120px;
}

.osi-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 28px;
    align-items: start;
}

.osi-hero-copy {
    display: grid;
    gap: 12px;
}

.osi-summary {
    display: grid;
    gap: 12px;
}

.osi-summary div {
    padding: 18px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.osi-summary span {
    display: block;
    color: var(--view-text-strong);
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
}

.osi-summary small {
    color: var(--view-text-muted);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.osi-stack-diagram,
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

.osi-stack-diagram {
    display: grid;
    gap: 10px;
}

.osi-stack-layer {
    display: grid;
    grid-template-columns: 92px minmax(0, 1fr) 170px;
    gap: 16px;
    align-items: center;
    padding: 14px 16px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.osi-layer-index,
.osi-stack-layer em {
    color: var(--view-accent);
    font-size: 0.78rem;
    font-style: normal;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.osi-stack-layer strong {
    display: block;
    color: var(--view-text-strong);
    font-size: 1rem;
}

.osi-stack-layer span {
    color: var(--view-text-soft);
}

.encapsulation-flow {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
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

.osi-callout {
    margin-top: 18px;
    padding: 18px;
    border-left: 3px solid var(--view-accent);
    background: color-mix(in srgb, var(--view-surface-strong) 86%, black 14%);
}

.osi-callout strong,
.layer-detail h3 {
    color: var(--view-text-strong);
}

.osi-callout p,
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
    .osi-hero {
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
    .osi-stack-layer,
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
