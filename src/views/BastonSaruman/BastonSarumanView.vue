<template>
    <div class="saruman-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-saruman.png" alt="El bastón de Saruman" />
        </section>
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
                <h2>Fundamentos de Seguridad</h2>
                <p>
                    Toda fortaleza se construye sobre tres juramentos sagrados,
                    conocidos como la tríada <strong>CIA</strong>:
                    <strong>confidencialidad</strong>, para que los secretos no caigan en manos ajenas;
                    <strong>integridad</strong>, para que ningún mensaje sea alterado en su viaje;
                    y <strong>disponibilidad</strong>, para que los servicios estén siempre en pie cuando se les
                    necesite.
                </p>
                <p>
                    La <strong>autenticación</strong> verifica que quien llama a la puerta es quien dice ser,
                    como un centinela que exige contraseña antes de franquear el paso.
                    La <strong>autorización</strong> decide a qué estancias del castillo puede acceder.
                    Juntas con el <strong>accounting</strong>, forman el <strong>AAA</strong>:
                    el registro de quién entró, qué hizo y cuándo marchó.
                </p>
                <p>
                    El <strong>principio de mínimo privilegio</strong> dicta que cada soldado
                    porta solo las llaves que su misión requiere, nunca más.
                    <strong>Zero Trust</strong> va más lejos: no confía en nadie por defecto,
                    ni siquiera en los que ya están dentro del muro.
                </p>
                <p>
                    La <strong>defensa en profundidad</strong> levanta varias murallas concéntricas,
                    de modo que si una cae, otras aguantan.
                    La <strong>superficie de ataque</strong> es todo cuanto un enemigo podría golpear:
                    reducirla es cerrar ventanas y tapar grietas antes de que llegue la tormenta.
                </p>
                <p>
                    La <strong>gestión del riesgo</strong> identifica peligros, mide su peso
                    y decide cómo mitigarlos, aceptarlos o transferirlos.
                    La <strong>seguridad por diseño</strong> no añade protección al final como barniz,
                    sino que la teje desde la primera piedra.
                </p>
                <p>
                    El <strong>hardening</strong> endurece cada sistema eliminando servicios innecesarios
                    y cerrando puertas que nadie debería usar.
                    La <strong>gestión de vulnerabilidades</strong> busca grietas antes de que lo hagan los enemigos,
                    y el <strong>parcheo</strong> las sella a tiempo.
                    Los <strong>logs y auditorías</strong> guardan memoria fiel de todo cuanto ocurre,
                    testigos silenciosos que nunca mienten.
                </p>
            </section>
            <section class="section-box">
                <h2>Criptografía</h2>
                <p>
                    La criptografía es el arte milenario de escribir en lenguas que solo el destinatario comprende.
                    Sus fundamentos residen en transformar un mensaje legible, llamado <strong>texto en claro</strong>,
                    en un galimatías incomprensible, el <strong>texto cifrado</strong>,
                    usando reglas matemáticas de una complejidad casi mágica.
                </p>
                <p>
                    El <strong>cifrado simétrico</strong> usa una sola llave para cifrar y descifrar,
                    como una caja fuerte cuya combinación comparten solo dos personas de confianza.
                    <strong>AES</strong> es hoy el campeón de esta estirpe: rápido, robusto y ampliamente honrado.
                </p>
                <p>
                    El <strong>cifrado asimétrico</strong> porta dos llaves gemelas pero opuestas:
                    una <strong>pública</strong>, que cualquiera puede conocer,
                    y una <strong>privada</strong>, que su dueño jamás revela.
                    Lo que una cierra, solo la otra puede abrir.
                    <strong>RSA</strong> y <strong>ECC</strong> son los grandes señores de este dominio.
                </p>
                <p>
                    Las <strong>funciones hash</strong> son sellos únicos:
                    transforman cualquier mensaje en una huella de longitud fija.
                    El más mínimo cambio produce una huella completamente distinta,
                    como si arrancar una hoja de un libro cambiara el aspecto de toda la portada.
                    <strong>MD5</strong> y <strong>SHA-1</strong> envejecieron y cayeron;
                    <strong>SHA-256</strong> y <strong>SHA-3</strong> reinan hoy con firmeza.
                </p>
                <p>
                    El <strong>HMAC</strong> combina hash y clave secreta para garantizar
                    que un mensaje no fue alterado ni forjado por manos enemigas.
                    Las <strong>firmas digitales</strong> son el equivalente electrónico del sello real:
                    prueban autoría e integridad ante cualquier tribunal.
                </p>
                <p>
                    Los <strong>certificados digitales</strong> son pergaminos emitidos por una
                    <strong>autoridad de certificación (CA)</strong> que acreditan la identidad de quien los porta.
                    La <strong>PKI</strong> es toda la jerarquía de confianza que los sustenta,
                    como una cadena nobiliaria que avala linajes.
                    <strong>TLS/SSL</strong> usa todo este arsenal para blindar las comunicaciones web.
                </p>
                <p>
                    El intercambio <strong>Diffie-Hellman</strong> permite que dos partes
                    acuerden una clave secreta sin nunca enviársela mutuamente,
                    como si dos magos calculasen una contraseña compartida
                    hablando en público sin que nadie más pudiera deducirla.
                    La <strong>entropía y aleatoriedad</strong> son la fuente de imprevisibilidad
                    que hace que cada clave sea única e irrepetible.
                </p>
                <p>
                    La <strong>esteganografía</strong> no cifra el mensaje: lo oculta a plena vista,
                    escondido dentro de una imagen o un sonido inocente.
                    Por último, los algoritmos de <strong>derivación de contraseñas</strong>
                    como <strong>bcrypt</strong>, <strong>Argon2</strong> o <strong>PBKDF2</strong>
                    convierten una humilde contraseña en una llave robusta,
                    haciendo que adivinarla cueste años a cualquier máquina.
                </p>
            </section>
            <section class="section-box">
                <h2>Seguridad en Redes</h2>
                <p>
                    Si la red es el territorio, el <strong>firewall</strong> es la muralla principal.
                    Filtra el tráfico que entra y sale según leyes escritas de antemano.
                    Los hay <strong>stateless</strong>, que juzgan cada paquete como si fuera el primero;
                    <strong>stateful</strong>, que recuerdan conversaciones enteras;
                    y los <strong>NGFW</strong> o firewalls de nueva generación,
                    que entienden el contenido y la identidad de quién habla.
                </p>
                <p>
                    Las <strong>ACLs</strong> son listas de permisos y prohibiciones
                    grabadas en routers y switches, porteros que consultan su registro
                    antes de dejar pasar cada paquete.
                    El <strong>IDS</strong> es el vigía que observa y alerta;
                    el <strong>IPS</strong> da un paso más y bloquea la amenaza en el acto.
                    El <strong>WAF</strong> se especializa en proteger aplicaciones web,
                    deteniendo ataques que un firewall común no reconocería.
                </p>
                <p>
                    Una <strong>VPN</strong> cava un túnel cifrado entre dos puntos lejanos,
                    como un pasadizo secreto bajo tierra que nadie puede interceptar.
                    <strong>IPsec</strong> asegura ese túnel a nivel de red;
                    <strong>SSL/TLS VPN</strong> lo hace a través del navegador, más sencillo para el viajero.
                </p>
                <p>
                    La <strong>DMZ</strong> es tierra de nadie entre el exterior y el reino interior:
                    allí residen los servidores que deben hablar con el mundo
                    sin tener acceso al corazón del castillo.
                    Los <strong>honeypots</strong> son trampas con apariencia de tesoro,
                    diseñadas para atraer intrusos y estudiar sus movimientos.
                </p>
                <p>
                    La <strong>microsegmentación</strong> divide el interior del castillo en cámaras selladas,
                    de modo que si un enemigo penetra una sala, no pueda moverse libremente.
                    <strong>802.1X</strong> exige credenciales antes de conceder acceso a la red física.
                    <strong>RADIUS</strong> y <strong>TACACS+</strong> son los escribas que gestionan
                    estas autenticaciones a gran escala.
                </p>
                <p>
                    La seguridad WiFi evolucionó desde el frágil <strong>WEP</strong>,
                    roto como cerradura de madera podrida,
                    pasando por <strong>WPA</strong> y <strong>WPA2</strong>,
                    hasta <strong>WPA3</strong>, el estándar más reciente y robusto.
                    El <strong>DNSSEC</strong> firma las respuestas DNS para que nadie las falsifique;
                    <strong>DoH</strong> y <strong>DoT</strong> cifran las consultas
                    para que espías no sepan qué dominios visitas.
                    La <strong>protección contra DDoS</strong> absorbe o desvía avalanchas de tráfico malintencionado,
                    y la <strong>detección de anomalías</strong> levanta la voz cuando algo no encaja con lo habitual.
                </p>
            </section>
            <section class="section-box">
                <h2>Seguridad en Sistemas</h2>
                <p>
                    Un sistema sin endurecer es un castillo sin puertas.
                    El <strong>hardening en Linux</strong> y en <strong>Windows</strong>
                    consiste en eliminar todo lo innecesario: servicios, cuentas, puertos y permisos
                    que nadie usa pero que un intruso agradecería encontrar abiertos.
                </p>
                <p>
                    La <strong>gestión de usuarios y permisos</strong> determina quién puede leer,
                    escribir o ejecutar cada archivo del reino.
                    <strong>sudo</strong> concede poderes de administrador de forma controlada y registrada,
                    como un señor que presta su sello solo para tareas específicas.
                </p>
                <p>
                    El <strong>arranque seguro (Secure Boot)</strong> garantiza que el sistema operativo
                    no haya sido adulterado antes de despertar.
                    El <strong>cifrado de disco</strong> con <strong>BitLocker</strong> o <strong>LUKS</strong>
                    protege los datos aunque el disco sea robado físicamente:
                    sin la llave, solo se lee pergamino ilegible.
                </p>
                <p>
                    El control de acceso puede ser <strong>DAC</strong> (el dueño decide los permisos),
                    <strong>MAC</strong> (el sistema impone las reglas sin excepción)
                    o <strong>RBAC</strong> (los permisos se asignan según el rol que uno ocupa en el reino).
                    <strong>SELinux</strong> y <strong>AppArmor</strong> añaden una capa de control
                    que confina cada proceso a lo estrictamente permitido,
                    como encadenar a un monje solo a su scriptorium.
                </p>
                <p>
                    El <strong>firewall en host</strong> con <strong>iptables</strong>, <strong>nftables</strong>
                    o el firewall de Windows filtra tráfico directamente en la máquina,
                    una última muralla antes de las entrañas del sistema.
                    <strong>PAM</strong> es el portero que gestiona cómo y bajo qué condiciones
                    un usuario puede iniciar sesión.
                    El <strong>hardening de SSH</strong> cierra llaves débiles,
                    deshabilita acceso como root y restringe quién puede llamar a esa puerta.
                </p>
                <p>
                    <strong>Auditd</strong> registra en silencio cada acción sensible del sistema,
                    tejiendo un tapiz de evidencias para el día en que se necesite investigar.
                    La <strong>integridad de archivos</strong> con herramientas como <strong>AIDE</strong>
                    o <strong>Tripwire</strong> compara el estado actual de los ficheros
                    con una fotografía tomada en tiempos de paz,
                    alertando si algo fue modificado sin permiso.
                </p>
            </section>
            <section class="section-box">
                <h2>Identidad y Control de Acceso</h2>
                <p>
                    En todo reino digital, la primera pregunta es siempre la misma:
                    ¿quién eres y qué se te permite?
                    La <strong>autenticación</strong> responde a lo primero;
                    la <strong>autorización</strong>, a lo segundo.
                    Son puertas distintas aunque a menudo se cruce una tras otra.
                </p>
                <p>
                    El <strong>MFA o 2FA</strong> exige más de una prueba de identidad,
                    como requerir tanto el rostro como la contraseña para entrar al tesoro.
                    Incluso si un enemigo roba la contraseña, sin el segundo factor sigue fuera.
                    El <strong>SSO</strong> permite al viajero identificarse una sola vez
                    y moverse libremente por todos los dominios aliados sin volver a demostrar su identidad.
                </p>
                <p>
                    <strong>Active Directory</strong> es el gran libro de registros de los reinos Windows:
                    almacena usuarios, grupos y políticas que gobiernan quién puede hacer qué.
                    <strong>Kerberos</strong> es el protocolo de autenticación que lo sustenta,
                    un sistema de sellos y tickets que evita enviar contraseñas por la red.
                    <strong>LDAP</strong> es el lenguaje para consultar ese gran libro.
                </p>
                <p>
                    <strong>OAuth 2.0</strong> permite que una aplicación actúe en nombre de un usuario
                    sin que este le revele su contraseña,
                    como otorgar a un mayordomo un permiso concreto sin entregarle todas las llaves.
                    <strong>OpenID Connect</strong> añade sobre OAuth una capa de identidad verificada.
                    <strong>SAML</strong> hace lo propio en entornos empresariales y federados,
                    intercambiando pergaminos de confianza entre reinos distintos.
                </p>
                <p>
                    El <strong>PAM (Privileged Access Management)</strong> custodia las cuentas más poderosas,
                    las que pueden hundir un reino si caen en manos equivocadas.
                    La <strong>Zero Trust Architecture</strong> no concede confianza por ubicación ni por hábito:
                    verifica cada acceso, cada vez, sin excepción.
                    La <strong>autenticación passwordless</strong> elimina las contraseñas
                    y las reemplaza por claves criptográficas, biometría o tokens físicos,
                    más seguros y menos olvidables.
                </p>
            </section>
            <section class="section-box">
                <h2>Seguridad Web</h2>
                <p>
                    La web es el campo de batalla más transitado del mundo digital.
                    El <strong>OWASP Top 10</strong> es el pergamino que lista
                    las diez amenazas más peligrosas y frecuentes contra aplicaciones web,
                    brújula obligada para todo constructor de fortalezas digitales.
                </p>
                <p>
                    La <strong>inyección SQL</strong> ocurre cuando un atacante cuela comandos maliciosos
                    dentro de un formulario inocente,
                    engañando a la base de datos para que revele o destruya sus propios secretos.
                    Imagina pedirle a un archivero un documento y que tu nota
                    también le ordene quemar el archivo entero.
                </p>
                <p>
                    El <strong>XSS o Cross-Site Scripting</strong> inyecta código en páginas web
                    que otros usuarios verán, robando sesiones o redirigiendo víctimas
                    como si un espía alterara los carteles de un mercado para engañar a los compradores.
                    El <strong>CSRF</strong> engaña al navegador de una víctima para que ejecute acciones
                    en su nombre sin que ella lo sepa, aprovechando su sesión activa como disfraz.
                </p>
                <p>
                    El <strong>SSRF</strong> fuerza al servidor a hacer peticiones hacia donde el atacante desea,
                    usándolo como mensajero involuntario hacia redes internas.
                    El <strong>XXE</strong> explota el procesado de XML para leer archivos del servidor.
                    El <strong>IDOR</strong> ocurre cuando cambiar un número en la URL
                    permite acceder a los datos de otro usuario,
                    como si cambiar el número de habitación en una llave te abriera cualquier puerta del hotel.
                </p>
                <p>
                    Las <strong>cabeceras HTTP de seguridad</strong> son instrucciones que el servidor
                    entrega al navegador para que este actúe con cautela.
                    La <strong>Content Security Policy (CSP)</strong> dice qué recursos son de fiar.
                    <strong>CORS</strong> controla desde qué dominios externos se puede interactuar.
                    Las <strong>cookies seguras</strong> con atributos <strong>HttpOnly</strong>
                    y <strong>SameSite</strong> evitan que sean robadas o enviadas a destinos equivocados.
                </p>
                <p>
                    Los <strong>JWT</strong> son sellos firmados que viajan entre cliente y servidor
                    para demostrar identidad sin consultar una base de datos en cada paso.
                    <strong>OAuth 2.0</strong> y <strong>OpenID Connect</strong> gobiernan
                    cómo las aplicaciones modernas delegan y verifican identidades.
                    El <strong>clickjacking</strong> superpone una capa invisible sobre una página legítima
                    para que el usuario haga clic en algo que no ve.
                    La seguridad en <strong>APIs REST</strong> asegura que
                    cada llamada esté autenticada, autorizada y validada,
                    pues una API sin protección es una puerta trasera al corazón del sistema.
                </p>
            </section>
            <section class="section-box">
                <h2>Seguridad en el Desarrollo (DevSecOps)</h2>
                <p>
                    Antiguamente la seguridad llegaba al final, como un foso cavado
                    cuando el castillo ya estaba construido.
                    El <strong>SSDLC</strong> o ciclo de vida de desarrollo seguro
                    teje la protección en cada fase, desde el primer diseño hasta el último despliegue.
                    <strong>DevSecOps</strong> une a constructores, operarios y guardianes
                    en un mismo gremio que trabaja sin interrupciones.
                </p>
                <p>
                    El <strong>modelado de amenazas</strong> es el ejercicio de sentarse antes de construir
                    y preguntar: ¿quién podría atacar esto, cómo y con qué consecuencias?
                    <strong>STRIDE</strong> clasifica las amenazas en seis familias:
                    suplantación, manipulación, repudio, divulgación, denegación y elevación de privilegios.
                    <strong>DREAD</strong> las puntúa para saber cuáles atacar primero.
                </p>
                <p>
                    La <strong>revisión de código seguro</strong> es la inspección del mapa del castillo
                    en busca de pasajes ocultos antes de abrir las puertas al público.
                    El <strong>SAST</strong> analiza el código fuente sin ejecutarlo,
                    como leer un plano buscando errores estructurales.
                    El <strong>DAST</strong> lanza ataques reales contra la aplicación en marcha,
                    buscando grietas desde fuera.
                    El <strong>SCA</strong> inspecciona las bibliotecas y componentes externos,
                    pues muchos castillos caen por piezas prestadas que nadie revisó.
                </p>
                <p>
                    Los <strong>secrets en código fuente</strong> son llaves y contraseñas
                    olvidadas dentro del propio código,
                    como esconder la llave del castillo bajo la piedra de la entrada.
                    La <strong>seguridad en CI/CD</strong> protege las tuberías de construcción
                    para que nadie introduzca veneno en el proceso de fabricación.
                </p>
                <p>
                    La <strong>supply chain security</strong> vela por la integridad de cada pieza
                    que llega desde el exterior, porque un enemigo puede envenenar un ingrediente
                    antes de que entre a la cocina.
                    El <strong>SBOM o inventario de materiales de software</strong>
                    es la lista completa de todo lo que compone una aplicación,
                    como el manifiesto de un barco que permite saber exactamente qué lleva a bordo.
                </p>
            </section>
            <section class="section-box">
                <h2>Cloud y Virtualización</h2>
                <p>
                    La <strong>computación en la nube</strong> ofrece recursos bajo demanda,
                    sin forjar cada servidor con manos propias.
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
                    La <strong>alta disponibilidad</strong> garantiza que el servicio permanezca en pie
                    aunque una torre caiga.
                </p>
            </section>
            <section class="section-box">
                <h2>Seguridad en Cloud</h2>
                <p>
                    Cuando un reino se muda a la nube, no cede su responsabilidad por completo.
                    El <strong>modelo de responsabilidad compartida</strong> divide el deber:
                    el proveedor custodia la infraestructura,
                    pero el inquilino sigue siendo responsable de sus datos, identidades y configuraciones.
                    Ignorar esto es creer que mudarse a un palacio ajeno
                    exime de poner cerrojo en las propias habitaciones.
                </p>
                <p>
                    El <strong>CSPM</strong> vigila que la configuración de los recursos cloud
                    no haya derivado hacia posiciones peligrosas,
                    como un inspector que recorre las murallas buscando grietas nuevas.
                    El <strong>IAM en cloud</strong> determina quién puede tocar qué recurso
                    y bajo qué condiciones, con una granularidad que los entornos locales raramente alcanzan.
                </p>
                <p>
                    <strong>AWS</strong>, <strong>Azure</strong> y <strong>GCP</strong>
                    son los tres grandes imperios de la nube, cada uno con sus propias herramientas,
                    terminología y particularidades de seguridad que conviene conocer por separado.
                    La <strong>gestión de secretos</strong> con herramientas como <strong>Vault</strong>
                    o <strong>AWS Secrets Manager</strong> evita que contraseñas y claves API
                    vaguen sueltas por configuraciones y repositorios.
                </p>
                <p>
                    El <strong>cifrado en reposo</strong> protege los datos guardados
                    aunque alguien acceda físicamente al almacenamiento.
                    El <strong>cifrado en tránsito</strong> los protege mientras viajan de un punto a otro.
                    La seguridad en <strong>funciones serverless</strong> y en
                    <strong>contenedores sobre Kubernetes</strong> exige vigilar permisos,
                    imágenes de origen y superficies de ataque que cambian con cada despliegue.
                </p>
                <p>
                    Un <strong>CASB</strong> actúa como guardián entre los usuarios y los servicios cloud,
                    aplicando políticas aunque el tráfico transcurra fuera del perímetro corporativo.
                    El <strong>cumplimiento normativo en cloud</strong> asegura que el reino digital
                    respeta las leyes del territorio donde residen sus datos.
                    Los <strong>logs y auditorías en cloud</strong> registran todo
                    para que ninguna acción quede sin testigo.
                </p>
            </section>
            <section class="section-box">
                <h2>Amenazas y Tipos de Ataque</h2>
                <p>
                    Conocer al enemigo es la mitad de la victoria.
                    El <strong>malware</strong> es el nombre que agrupa a todas las criaturas maliciosas del mundo
                    digital:
                    <strong>virus</strong> que se adhieren a archivos sanos,
                    <strong>gusanos</strong> que se propagan solos sin necesitar huésped,
                    <strong>troyanos</strong> que se disfrazan de aliados,
                    <strong>ransomware</strong> que cifra el tesoro y exige rescate,
                    y <strong>spyware</strong> que observa en silencio sin dar señales de vida.
                </p>
                <p>
                    El <strong>phishing</strong> es el arte del engaño por escrito:
                    un mensaje que parece legítimo pero conduce a una trampa.
                    El <strong>spear phishing</strong> afina el dardo: está redactado específicamente
                    para la víctima, con detalles que hacen dudar hasta al más precavido.
                    La <strong>ingeniería social</strong> es la forma más antigua de ataque:
                    manipular a personas, no a máquinas, para obtener información o accesos.
                </p>
                <p>
                    El ataque <strong>Man-in-the-Middle</strong> sitúa a un intruso entre dos partes
                    que creen hablar en privado, leyendo y alterando sus mensajes como un falso mensajero.
                    Los ataques de <strong>fuerza bruta</strong> prueban contraseñas una a una sin descanso;
                    los de <strong>diccionario</strong> usan listas de palabras comunes para acelerar la búsqueda.
                    El <strong>credential stuffing</strong> recicla contraseñas filtradas de otros reinos,
                    apostando a que la víctima usa las mismas llaves en todas sus puertas.
                </p>
                <p>
                    Un ataque <strong>DDoS</strong> lanza un ejército de peticiones simultáneas
                    para ahogar un servicio hasta que no pueda responder a nadie.
                    Los ataques a la <strong>cadena de suministro</strong> envenenan un componente externo
                    antes de que llegue al objetivo, comprometiendo muchos reinos de un solo golpe.
                    Un <strong>Zero-Day</strong> es una vulnerabilidad desconocida incluso por su creador,
                    una grieta en el muro que nadie sabe que existe y para la que no hay parche.
                </p>
                <p>
                    Una <strong>APT o amenaza persistente avanzada</strong> no busca el golpe rápido:
                    se infiltra en silencio, se mueve despacio y extrae información durante meses o años.
                    El <strong>Insider Threat</strong> proviene de dentro del propio castillo,
                    un guardián descontento o corrompido que conoce cada pasadizo.
                    Los ataques de <strong>elevación de privilegios</strong> buscan escalar
                    desde un acceso limitado hasta el control total del sistema,
                    como un paje que maniobra para hacerse con el trono.
                </p>
                <p>
                    El <strong>DNS Spoofing</strong> falsifica respuestas DNS para redirigir
                    al viajero hacia una fortaleza falsa que imita la original.
                    El <strong>Buffer Overflow</strong> desborda la capacidad de un programa
                    para sobrescribir memoria y ejecutar código arbitrario.
                    Las <strong>race conditions</strong> explotan el instante fugaz
                    entre dos acciones del sistema, colándose por esa rendija de tiempo.
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
                <h2>SIEM, SOAR y Gestión de Eventos</h2>
                <p>
                    Un reino que no vigila sus propias puertas no merece llamarse seguro.
                    El <strong>SIEM</strong> es la sala de mapas donde confluyen
                    todos los mensajes, alertas y registros del castillo,
                    analizados en tiempo real para detectar patrones de peligro.
                    No ve eventos aislados: ve conversaciones entre ellos.
                </p>
                <p>
                    El <strong>SOAR</strong> va un paso más allá:
                    automatiza la respuesta a las amenazas detectadas,
                    ejecutando acciones predefinidas sin esperar a que un guardián humano despierte.
                    La <strong>correlación de eventos</strong> busca vínculos entre sucesos aparentemente inconexos,
                    como un detective que conecta pistas de distintos rincones del reino.
                </p>
                <p>
                    La <strong>normalización de logs</strong> traduce los registros de cientos de dispositivos
                    a un idioma común, pues cada uno habla su propio dialecto.
                    Las <strong>alertas y reglas de detección</strong> son las trampas tendidas por anticipado:
                    si ocurre esto y aquello en tal secuencia, el vigía da la voz de alarma.
                </p>
                <p>
                    Los <strong>playbooks de respuesta</strong> son los protocolos escritos
                    que dicen exactamente qué hacer cuando suena la alarma,
                    sin improvisar bajo presión.
                    La <strong>gestión de incidentes</strong> orquesta a todos los actores
                    durante una crisis: contención, erradicación, recuperación y lección aprendida.
                    Plataformas como <strong>Splunk</strong>, <strong>Microsoft Sentinel</strong>
                    o <strong>Elastic SIEM</strong> son los grandes cuarteles generales donde todo esto ocurre.
                </p>
            </section>
            <section class="section-box">
                <h2>Inteligencia de Amenazas (Threat Intelligence)</h2>
                <p>
                    La <strong>inteligencia de amenazas</strong> es el arte de conocer al enemigo
                    antes de que llame a la puerta.
                    No se trata solo de reaccionar: se trata de anticipar,
                    recopilando información sobre quién ataca, cómo lo hace y a quién se dirige.
                </p>
                <p>
                    Los <strong>IOCs o indicadores de compromiso</strong> son las huellas que deja un atacante:
                    direcciones IP sospechosas, dominios maliciosos, hashes de archivos conocidos.
                    Los <strong>IOAs o indicadores de ataque</strong> van más allá de las huellas
                    y describen el comportamiento del intruso,
                    detectando el ataque mientras ocurre aunque las herramientas sean nuevas.
                    Las <strong>TTPs</strong> son las tácticas, técnicas y procedimientos del adversario:
                    su forma de moverse, esconderse y golpear.
                </p>
                <p>
                    Las fuentes de inteligencia provienen de múltiples reinos:
                    <strong>OSINT</strong> es la información abierta y pública,
                    recogida de foros, redes sociales y registros accesibles a todos.
                    <strong>HUMINT</strong> viene de informantes y contactos humanos.
                    <strong>TECHINT</strong> nace del análisis de sistemas y herramientas capturadas.
                </p>
                <p>
                    El <strong>MITRE ATT&CK</strong> es el gran atlas del comportamiento adversarial:
                    un mapa detallado de todas las tácticas y técnicas documentadas
                    usadas por grupos de ataque reales, ordenadas por fases de la cadena de ataque.
                    Es el libro de enemigos más completo que existe.
                </p>
                <p>
                    Los <strong>feeds de inteligencia</strong> son ríos de datos actualizados
                    que informan sobre amenazas emergentes.
                    <strong>STIX</strong> es el lenguaje para describir esa inteligencia;
                    <strong>TAXII</strong> el protocolo para intercambiarla entre reinos aliados.
                    Los <strong>ISACs</strong> son gremios sectoriales que comparten inteligencia
                    entre organizaciones del mismo dominio, como una alianza de castillos
                    que se avisan mutuamente cuando detectan un ejército en movimiento.
                </p>
            </section>
            <section class="section-box">
                <h2>Frameworks, Normativas y Gestión</h2>
                <p>
                    Un reino sin leyes ni códigos es tierra de caos.
                    Los <strong>frameworks de seguridad</strong> son los grandes libros de sabiduría
                    que guían cómo construir, gobernar y mejorar la seguridad de forma sistemática.
                </p>
                <p>
                    El <strong>NIST Cybersecurity Framework</strong> organiza la seguridad en cinco verbos:
                    identificar, proteger, detectar, responder y recuperar.
                    Simple en apariencia, profundo en práctica.
                    <strong>ISO 27001</strong> e <strong>ISO 27002</strong> son los estándares internacionales
                    que certifican que un sistema de gestión de seguridad de la información
                    está construido sobre cimientos sólidos y auditables.
                    Los <strong>CIS Controls</strong> ofrecen una lista priorizada de acciones concretas,
                    ordenadas de más a menos impacto, para quienes no saben por dónde empezar.
                </p>
                <p>
                    El <strong>MITRE ATT&CK</strong> no es solo inteligencia de amenazas:
                    también sirve como referencia para evaluar defensas,
                    comprobar si los controles del reino resisten las técnicas documentadas del adversario.
                    <strong>OWASP</strong> proporciona guías, herramientas y estándares
                    centrados en la seguridad de aplicaciones web,
                    con el pragmatismo de quien conoce el campo de batalla desde adentro.
                </p>
                <p>
                    Las normativas legales dictan obligaciones que no son opcionales.
                    El <strong>GDPR o RGPD</strong> protege los datos personales de los ciudadanos europeos
                    con multas capaces de sacudir imperios.
                    El <strong>ENS o Esquema Nacional de Seguridad</strong> es la normativa española
                    que aplica a las administraciones públicas y sus proveedores.
                    <strong>PCI-DSS</strong> regula la seguridad en el tratamiento de pagos con tarjeta.
                    <strong>HIPAA</strong> custodia la información médica en tierras americanas.
                    <strong>SOC 2</strong> certifica que un proveedor de servicios gestiona los datos con diligencia.
                </p>
                <p>
                    La <strong>evaluación y gestión del riesgo</strong> es el proceso de mirar al horizonte,
                    identificar tormentas posibles y decidir cuáles enfrentar, cuáles esquivar y cuáles aceptar.
                    Las <strong>auditorías de seguridad</strong> son las inspecciones periódicas
                    que comprueban si las defensas siguen en pie o han envejecido sin que nadie lo notara.
                </p>
                <p>
                    El <strong>plan de continuidad de negocio (BCP)</strong> prepara al reino
                    para seguir funcionando aunque parte del castillo arda.
                    El <strong>plan de recuperación ante desastres (DRP)</strong> detalla
                    cómo volver a levantar lo que cayó, en qué orden y en cuánto tiempo.
                    Porque no se trata solo de resistir el golpe,
                    sino de saber levantarse después de haberlo recibido.
                </p>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "SarumanPage"
};
</script>

<style scoped>
.saruman-page {
    background: #0b0f17;
    color: #e6e0d4;
    min-height: 100vh;
    font-family: "EB Garamond", serif;
}

.hero-banner {
    margin-top: 115px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.content {
    padding-top: 45px;
    padding-bottom: 60px;
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .content {
        padding-top: 30px;
    }
}
</style>