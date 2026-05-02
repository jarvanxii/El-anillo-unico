<template>
    <div class="saruman-page saruman-index-page app-view text-light">
        <section class="hero-banner">
            <img :src="bannerSaruman" alt="El bastón de Saruman" />
        </section>

        <main class="container app-view-content saruman-index-content">
            <section class="section-box saruman-index-hero">
                <span class="section-kicker">Fundamentos técnicos</span>
                <h1 class="section-name">El Bastón de Saruman</h1>
                <p class="section-copy">
                    Sección de fundamentos de ciberseguridad. Ordena los conceptos que aparecen en cualquier análisis
                    técnico: red, sistema, identidad, aplicación, dato, control, evidencia, riesgo y gobierno.
                </p>
                <p class="section-copy">
                    La función de esta vista es servir como diccionario de dominios. Cada bloque de la cabecera describe
                    qué estudia, qué conceptos contiene y para qué se usa dentro de una arquitectura o investigación de
                    seguridad.
                </p>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Definición</span>
                    <h2 class="module-title">Qué cubre esta sección</h2>
                </div>

                <div class="reading-prose">
                    <p v-for="paragraph in definition" :key="paragraph">{{ paragraph }}</p>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Glosario</span>
                    <h2 class="module-title">Términos base</h2>
                </div>

                <div class="technical-glossary">
                    <div class="technical-row technical-head">
                        <span>Término</span>
                        <span>Definición</span>
                    </div>
                    <div v-for="term in coreTerms" :key="term.term" class="technical-row">
                        <strong>{{ term.term }}</strong>
                        <p>{{ term.definition }}</p>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Diccionario</span>
                    <h2 class="module-title">Bloques de la cabecera</h2>
                </div>

                <div class="topic-detail-list">
                    <article v-for="block in topicBlocks" :key="block.id" class="topic-detail">
                        <header>
                            <span>{{ block.index }}</span>
                            <h3>{{ block.name }}</h3>
                            <small>{{ block.short }}</small>
                        </header>
                        <p>{{ block.definition }}</p>
                        <dl>
                            <div>
                                <dt>Incluye</dt>
                                <dd>{{ block.includes }}</dd>
                            </div>
                            <div>
                                <dt>Conceptos clave</dt>
                                <dd>{{ block.keyConcepts }}</dd>
                            </div>
                            <div>
                                <dt>Uso técnico</dt>
                                <dd>{{ block.technicalUse }}</dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import bannerSaruman from "@/assets/banners/banner-saruman.webp";

export default {
    name: "SarumanPage",
    data() {
        return {
            bannerSaruman,
            definition: [
                "El Bastón de Saruman agrupa los fundamentos que se reutilizan en redes, sistemas, aplicaciones, cloud, defensa, auditoría y gobierno. No pertenece a una única especialidad; es el vocabulario común que permite razonar en todas ellas.",
                "Un concepto se considera fundamental cuando ayuda a responder preguntas técnicas: qué componente interviene, qué función cumple, qué datos procesa, qué dependencia tiene, qué evidencia deja y qué control lo protege.",
                "Los temas de esta cabecera deben leerse como entradas de referencia. Primero se entiende el dominio general; después se baja a conceptos concretos como OSI, TCP/IP, DNS, TLS, IAM, OWASP, SIEM, PKI, routing, hardening o NIST."
            ],
            coreTerms: [
                {
                    term: "Protocolo",
                    definition: "Reglas que definen cómo dos sistemas intercambian información: formato de mensajes, estados, errores, negociación y comportamiento esperado."
                },
                {
                    term: "Activo",
                    definition: "Elemento con valor que debe protegerse: dato, credencial, sistema, servicio, identidad, red, software, reputación o continuidad operativa."
                },
                {
                    term: "Control",
                    definition: "Medida que reduce exposición, probabilidad o impacto. Puede ser preventivo, detectivo, correctivo, administrativo, técnico o físico."
                },
                {
                    term: "Superficie de ataque",
                    definition: "Conjunto de puntos por los que un sistema puede ser alcanzado o abusado: puertos, APIs, identidades, permisos, dependencias y configuraciones."
                },
                {
                    term: "Identidad",
                    definition: "Representación de un sujeto en un sistema: usuario, servicio, dispositivo, aplicación o workload. Se relaciona con autenticación, autorización y auditoría."
                },
                {
                    term: "Telemetría",
                    definition: "Datos observables generados por sistemas y controles: logs, métricas, eventos, alertas, trazas, flujos de red y artefactos forenses."
                },
                {
                    term: "Riesgo",
                    definition: "Combinación de probabilidad e impacto de un escenario no deseado, considerando activos, amenazas, vulnerabilidades y controles existentes."
                },
                {
                    term: "Evidencia",
                    definition: "Dato verificable que confirma un comportamiento, fallo o control: captura de red, log, configuración, hash, alerta, ticket o traza."
                }
            ],
            topicBlocks: [
                {
                    id: "network_fundamentals",
                    index: "01",
                    name: "Redes y Protocolos",
                    short: "Comunicación entre sistemas, direccionamiento, transporte e infraestructura.",
                    definition: "Dominio que explica cómo viajan los datos entre procesos, hosts, redes y servicios. Es la base para entender conectividad, exposición, segmentación, escaneo, filtrado y disponibilidad.",
                    includes: "Modelo OSI, modelo TCP/IP, encapsulación, MAC, IPv4, IPv6, CIDR, subnetting, ARP, ICMP, TCP, UDP, DNS, DHCP, HTTP, SSH, routing, switching, VLANs, NAT, BGP, OSPF, proxies, CDN y WiFi.",
                    keyConcepts: "Dirección IP, dirección MAC, puerto, socket, gateway, ruta, TTL, MTU, broadcast, multicast, tabla ARP, tabla MAC, tabla de rutas y resolución de nombres.",
                    technicalUse: "Diagnosticar conectividad, interpretar capturas PCAP, diseñar segmentación, revisar reglas de firewall, localizar fallos DNS/TCP/IP y entender superficie expuesta."
                },
                {
                    id: "security_foundations",
                    index: "02",
                    name: "Fundamentos de Seguridad y Criptografía",
                    short: "Objetivos de seguridad, controles, riesgo, hardening y protección de datos.",
                    definition: "Dominio que define los objetivos y mecanismos básicos de protección. Separa qué se quiere proteger, con qué control, bajo qué amenaza y con qué evidencia se valida.",
                    includes: "CIA Triad, autenticidad, no repudio, AAA, mínimo privilegio, Zero Trust, defensa en profundidad, gestión de riesgo, hardening, vulnerabilidades, parches, clasificación de datos, BIA, BCP, DRP y criptografía aplicada.",
                    keyConcepts: "Confidencialidad, integridad, disponibilidad, control, amenaza, vulnerabilidad, riesgo residual, cifrado, hash, firma digital, certificado, PKI, TLS, clave, entropía y cadena de confianza.",
                    technicalUse: "Evaluar controles, priorizar parches, proteger secretos, validar certificados, distinguir cifrado de hashing, diseñar mínimos privilegios y justificar medidas defensivas."
                },
                {
                    id: "network_system_security",
                    index: "03",
                    name: "Seguridad en Redes y Sistemas",
                    short: "Controles de red, endpoint, sistema operativo y acceso local.",
                    definition: "Dominio que convierte los fundamentos en controles concretos sobre tráfico, hosts, servicios, usuarios, permisos, integridad y dispositivos finales.",
                    includes: "Firewalls, ACLs, IDS, IPS, WAF, VPN, IPsec, DMZ, honeypots, microsegmentación, 802.1X, NAC, RADIUS, TACACS+, WiFi seguro, hardening Linux/Windows, SELinux, AppArmor, PAM, auditd, EDR, XDR y backups inmutables.",
                    keyConcepts: "Regla, zona, interfaz, segmento, servicio, proceso, usuario, grupo, privilegio, baseline, agente, endpoint, integridad, cifrado de disco y auditoría local.",
                    technicalUse: "Reducir exposición, segmentar redes, endurecer sistemas, controlar accesos locales, registrar actividad, detectar comportamiento anómalo y contener compromisos."
                },
                {
                    id: "identity_web_app_security",
                    index: "04",
                    name: "Identidad, Web y Aplicaciones",
                    short: "IAM, sesiones, autenticación, autorización, APIs y seguridad de software.",
                    definition: "Dominio que estudia cómo se identifica un sujeto, cómo se autorizan acciones y cómo se protege la lógica expuesta por aplicaciones web, APIs y pipelines de desarrollo.",
                    includes: "MFA, SSO, IAM, Active Directory, Kerberos, OAuth 2.0, OpenID Connect, SAML, PAM, FIDO2, WebAuthn, ABAC, RBAC, sesiones, OWASP Top 10, SQLi, XSS, CSRF, SSRF, IDOR, JWT, CORS, CSP, ASVS, SAST, DAST, SCA, SBOM y CI/CD seguro.",
                    keyConcepts: "Sujeto, principal, claim, scope, token, cookie, sesión, recurso, rol, permiso, política, input, sink, payload, dependencia, artefacto y pipeline.",
                    technicalUse: "Diseñar accesos, revisar APIs, detectar fallos de autorización, proteger sesiones, validar entradas, controlar dependencias y traducir vulnerabilidades web a impacto real."
                },
                {
                    id: "cloud_virtualization",
                    index: "05",
                    name: "Cloud, Virtualización y Entornos Modernos",
                    short: "Cloud, contenedores, Kubernetes, serverless y seguridad de plataforma.",
                    definition: "Dominio que estudia infraestructuras consumidas mediante APIs. La seguridad depende de identidad, configuración, red, automatización, secretos, telemetría y responsabilidad compartida.",
                    includes: "IaaS, PaaS, SaaS, responsabilidad compartida, virtualización, Docker, Kubernetes, VPC, subredes cloud, balanceo, CSPM, CWPP, CNAPP, CASB, SSPM, IAM cloud, Kubernetes RBAC, admission controllers, network policies, service mesh y serverless.",
                    keyConcepts: "Cuenta, tenant, región, zona, VPC/VNet, subnet, bucket, role, policy, workload, imagen, cluster, namespace, pod, función, secreto y servicio gestionado.",
                    technicalUse: "Revisar permisos cloud, aislar redes, proteger secretos, endurecer contenedores, controlar Kubernetes, analizar logs cloud, evaluar postura y responder a incidentes de plataforma."
                },
                {
                    id: "threats_monitoring",
                    index: "06",
                    name: "Amenazas, Monitorización e Inteligencia",
                    short: "Amenazas, logs, SIEM, SOAR, EDR, hunting e inteligencia.",
                    definition: "Dominio que relaciona comportamiento adversario con señales observables. Permite convertir actividad técnica en eventos, alertas, casos, detecciones e inteligencia accionable.",
                    includes: "Malware, phishing, MitM, fuerza bruta, credential stuffing, DDoS, supply chain, zero-day, APT, insider threat, replay, privilege escalation, living off the land, logs, NetFlow, PCAP, SIEM, SOAR, Splunk, Sentinel, Elastic, EDR, NDR, XDR, IOC, IOA, TTP, MITRE ATT&CK, STIX y TAXII.",
                    keyConcepts: "Evento, alerta, caso, IOC, IOA, TTP, regla, baseline, falso positivo, falso negativo, severidad, contexto, timeline, enriquecimiento y cadena de ataque.",
                    technicalUse: "Construir detecciones, investigar alertas, interpretar tráfico, priorizar incidentes, mapear técnicas a MITRE ATT&CK y convertir inteligencia en controles defensivos."
                },
                {
                    id: "frameworks_compliance",
                    index: "07",
                    name: "Frameworks, Normativas y Gestión",
                    short: "Gobierno, auditoría, cumplimiento, riesgo y continuidad.",
                    definition: "Dominio que organiza la seguridad como sistema de gestión. Define controles, responsables, evidencias, alcance, madurez, riesgo aceptado y mejora continua.",
                    includes: "NIST CSF, NIST RMF, NIST SP 800-53, ISO 27001, ISO 27002, CIS Controls, COBIT, SOC 2, OWASP, GDPR/RGPD, ENS, NIS2, DORA, PCI-DSS, HIPAA, auditorías, políticas, BCP y DRP.",
                    keyConcepts: "Control, requisito, evidencia, alcance, propietario, riesgo inherente, riesgo residual, auditoría, hallazgo, excepción, madurez, plan de tratamiento y continuidad.",
                    technicalUse: "Preparar auditorías, mapear controles, justificar decisiones, documentar políticas, gestionar terceros, demostrar cumplimiento y conectar seguridad técnica con responsabilidad organizativa."
                }
            ]
        };
    }
};
</script>

<style scoped>
.saruman-index-content {
    max-width: 1040px;
}

.saruman-index-hero {
    display: grid;
    gap: 12px;
}

.technical-glossary,
.topic-detail-list {
    margin-top: 22px;
}

.reading-prose {
    display: grid;
    gap: 14px;
    max-width: 94ch;
}

.reading-prose p {
    margin: 0;
    color: var(--view-text-soft);
    font-size: 1rem;
    line-height: 1.82;
}

.technical-glossary {
    display: grid;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--view-surface-strong);
}

.technical-row {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 18px;
    padding: 15px 16px;
    border-bottom: 1px solid var(--view-border);
}

.technical-row:last-child {
    border-bottom: 0;
}

.technical-head {
    background: color-mix(in srgb, var(--view-surface-soft) 88%, black 12%);
}

.technical-head span,
.technical-row strong,
.topic-detail header span {
    color: var(--view-accent);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.technical-row p {
    margin: 0;
    color: var(--view-text-soft);
    line-height: 1.72;
}

.topic-detail-list {
    display: grid;
    gap: 18px;
}

.topic-detail {
    display: grid;
    gap: 16px;
    padding: 22px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.topic-detail header {
    padding-bottom: 14px;
    border-bottom: 1px solid var(--view-border);
}

.topic-detail h3 {
    margin: 8px 0 0;
    color: var(--view-text-strong);
    font-size: 1.35rem;
}

.topic-detail header small {
    display: block;
    margin-top: 6px;
    color: var(--view-text-muted);
    font-size: 0.92rem;
    line-height: 1.5;
}

.topic-detail > p {
    margin: 0;
    max-width: 96ch;
    color: var(--view-text-soft);
    line-height: 1.78;
}

.topic-detail dl {
    display: grid;
    margin: 0;
    border-top: 1px solid var(--view-border);
}

.topic-detail dl div {
    padding: 14px 0;
    border-bottom: 1px solid var(--view-border);
}

.topic-detail dl div:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.topic-detail dt {
    color: var(--view-text);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.topic-detail dd {
    margin: 6px 0 0;
    color: var(--view-text-soft);
    line-height: 1.68;
}

@media (max-width: 767px) {
    .technical-row {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
