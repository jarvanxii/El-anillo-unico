<template>
    <ThorondorPageShell :show-banner="true">
        <section class="section-box intro-box">
            <div class="intro-layout">
                <div class="section-heading">
                    <span class="section-kicker">SIEM personal — Linux · Windows · navegador</span>
                    <h1 class="section-name">El vuelo de Thorondor</h1>
                    <p class="section-copy">
                        Thorondor es un SIEM personal sin backend: un agente Python autocontenido expone dos endpoints
                        HTTP (<code>/health</code>, <code>/telemetry</code>) sobre un endpoint alcanzable desde el
                        navegador: localhost, LAN, VPN, IP publica o DNS. El frontend ejecuta polling HTTP directo,
                        persiste la telemetria en IndexedDB y aplica reglas de correlacion en JavaScript. Compatible con
                        Linux (systemd, Debian/Ubuntu/RHEL/Arch) y Windows (Task Scheduler).
                    </p>
                </div>

                <div class="intro-emblem">
                    <img src="@/assets/logos/thorondor.webp" alt="Sello de Thorondor" />
                    <span>Monitorizacion desde el navegador</span>
                    <small>
                        Arquitectura pull sin backend: el navegador consulta directamente a cada agente por su URL base
                        y puerto TCP. Soporta local, LAN, VPN y endpoints publicos con token. Sin relay, sin broker.
                    </small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in foundationalNotes" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Vision general</span>
                    <h2 class="module-title">Que hace Thorondor y para quien sirve</h2>
                    <p class="module-copy">
                        Thorondor monitoriza hosts Linux y Windows desde el navegador sin infraestructura centralizada.
                        El agente Python expone telemetria via HTTP; el frontend la consume por polling, la persiste en
                        IndexedDB y aplica reglas de correlacion localmente. Orientado a laboratorios, homelab, servidores
                        propios y entornos donde la telemetria no debe atravesar infraestructura de terceros.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Info</span>
                    <small>Base conceptual y operativa del modulo.</small>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-6 col-xl-3" v-for="item in overviewCards" :key="item.label">
                    <div class="metric-card">
                        <label>{{ item.label }}</label>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small>{{ item.note }}</small>
                    </div>
                </div>
            </div>

            <div class="verdict-card verdict-neutral">
                <div class="verdict-icon">
                    <span>Uso</span>
                </div>
                <div class="verdict-body">
                    <strong>Datos en el navegador, correlacion local y endpoints directos</strong>
                    <p>
                        La telemetria de todos los hosts reside en IndexedDB del navegador. No existe canal de exfiltrado
                        ni servidor central: cada agente es un endpoint HTTP independiente y cada alerta se calcula en el
                        frontend sobre los datos que el navegador ya ha recogido. Si el agente esta en Internet, la URL
                        publica debe estar protegida con token y filtrado de red.
                    </p>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Arquitectura</span>
                    <h2 class="module-title">Flujo tecnico extremo a extremo</h2>
                    <p class="module-copy">
                        El generador produce un agente Python parametrizado (host, puerto, modulos, usuario de servicio)
                        que se despliega en el sistema destino. El frontend realiza polling HTTP al agente, decodifica
                        el JSON de telemetria, lo persiste en IndexedDB y aplica las reglas de correlacion registradas.
                        Sin dependencia de backend externo: solo hace falta conectividad directa desde el navegador hasta
                        la URL registrada del agente.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Flow</span>
                    <small>Sin backend intermedio.</small>
                </div>
            </div>

            <div class="card-grid">
                <article class="tool-card" v-for="item in architectureCards" :key="item.label">
                    <div class="card-head">
                        <h5>{{ item.label }}</h5>
                        <span class="mini-badge">{{ item.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ item.copy }}</p>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Persistencia</span>
                    <h2 class="module-title">Que guarda el navegador y como se limpia</h2>
                    <p class="module-copy">
                        Thorondor usa IndexedDB y Vuex para guardar lo importante sin saturar memoria: agentes,
                        snapshots, eventos, logs utiles, alertas y reglas. Lo antiguo se purga automaticamente.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">IndexedDB</span>
                    <small>Persistencia local del cliente.</small>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-md-6 col-xl-3" v-for="item in storageCards" :key="item.label">
                    <div class="signal-card">
                        <label>{{ item.label }}</label>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small>{{ item.note }}</small>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Primeros pasos</span>
                    <h2 class="module-title">Ruta recomendada para empezar sin perderte</h2>
                    <p class="module-copy">
                        Si vas a usar Thorondor por primera vez, sigue este orden. La cabecera superior ya enlaza cada
                        paso a su vista correspondiente para que puedas avanzar sin volver atras.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Onboarding</span>
                    <small>Secuencia pensada para principiantes.</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="step in startSteps" :key="step.label">
                    <label>{{ step.label }}</label>
                    <span>{{ step.copy }}</span>
                </div>
            </div>
        </section>

        <section class="section-box">
            <ThorondorMarkdownArticle :source="thorondorDocumentation" />
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorMarkdownArticle from "@/components/VueloThorondor/ThorondorMarkdownArticle.vue";
import ThorondorPageShell from "@/components/VueloThorondor/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";
import { thorondorDocumentation } from "@/features/vueloThorondor/data/thorondorDocumentation";

export default {
    name: "VueloThorondorView",

    components: {
        ThorondorMarkdownArticle,
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    computed: {
        thorondorDocumentation() {
            return thorondorDocumentation;
        },

        foundationalNotes() {
            return [
                {
                    label: "Arquitectura pull sin backend",
                    copy: "El agente es stateless. No mantiene sesion ni abre conexiones salientes. El navegador realiza polling HTTP directo contra /health y /telemetry. No existe relay, broker ni canal inverso."
                },
                {
                    label: "Multi-plataforma: Linux y Windows",
                    copy: "En Linux se despliega como unidad systemd con cuenta sin shell interactivo. En Windows como tarea programada en Task Scheduler. El agente Python es identico en ambos casos."
                },
                {
                    label: "Persistencia en IndexedDB",
                    copy: "Snapshots, logs, eventos de seguridad, alertas y reglas se persisten en IndexedDB del navegador con cursor sweep automatico. Sin escrituras en servidor central ni telemetria a terceros."
                },
                {
                    label: "Correlacion local",
                    copy: "Las reglas se ejecutan en JavaScript sobre snapshots, eventos y logs ya persistidos. El motor evalua umbrales, heartbeat, fallos de autenticacion, uso de sudo y cambios en ficheros criticos."
                }
            ];
        },

        overviewCards() {
            return [
                {
                    label: "Agentes registrados",
                    value: String(this.dashboardCards.length),
                    tone: "tone-blue",
                    note: "Hosts dados de alta en esta instancia del navegador."
                },
                {
                    label: "Alertas activas",
                    value: String(this.activeAlerts.length),
                    tone: this.activeAlerts.length ? "tone-warning" : "tone-success",
                    note: "Reglas disparadas por la logica JS del frontend."
                },
                {
                    label: "Eventos 24h",
                    value: String(this.eventsLast24h.length),
                    tone: "tone-neutral",
                    note: "Eventos recientes que el navegador ha persistido."
                },
                {
                    label: "Ultimo polling",
                    value: this.thorondorLastPollAt ? this.formatRelativeTime(this.thorondorLastPollAt) : "Pendiente",
                    tone: "tone-success",
                    note: "El navegador consulta cada host directamente."
                }
            ];
        },

        storageCards() {
            return [
                {
                    label: "Retencion",
                    value: `${this.thorondorState.retentionDays} dias`,
                    tone: "tone-success",
                    note: "Ventana local antes del purgado automatico."
                },
                {
                    label: "Snapshots",
                    value: String(Object.values(this.thorondorSnapshots).flat().length),
                    tone: "tone-blue",
                    note: "Historico resumido por host monitorizado."
                },
                {
                    label: "Eventos",
                    value: String(this.allSecurityEvents.length),
                    tone: "tone-warning",
                    note: "Seguridad, sudo, logins y cambios criticos."
                },
                {
                    label: "Ultima limpieza",
                    value: this.thorondorState.lastSweepAt ? this.formatRelativeTime(this.thorondorState.lastSweepAt) : "Pendiente",
                    tone: "tone-neutral",
                    note: "Thorondor borra historico antiguo para no saturar memoria."
                }
            ];
        },

        architectureCards() {
            return [
                {
                    label: "1. Genera el agente",
                    badge: "Frontend",
                    copy: "El generador parametriza el agente Python con hostname, puerto, endpoint accesible, alcance de red, token opcional, usuario de servicio, distro, modulos activos y rutas de log. Produce thorondor-agent.py y thorondor-agent.service (Linux) o una tarea PS1 (Windows)."
                },
                {
                    label: "2. Despliega en el host",
                    badge: "Host",
                    copy: "Linux: cuenta sin shell, /opt/thorondor-agent/, grupos adm+systemd-journal, psutil via apt/dnf/pacman, unidad systemd. Windows: C:\\ProgramData\\Thorondor-Agent\\, psutil via pip, tarea en Task Scheduler con RunLevel Highest."
                },
                {
                    label: "3. El navegador hace polling",
                    badge: "Polling",
                    copy: "Peticion HTTP GET al /telemetry del agente cada N segundos. El agente responde JSON con system, metrics (CPU, RAM, disco por particion, temperatura), security (logins, sudo, file integrity) y logs."
                },
                {
                    label: "4. Persistencia en IndexedDB",
                    badge: "Storage",
                    copy: "El store Vuex decodifica el payload y lo distribuye en IndexedDB: hasta 500 snapshots, 2000 logs y 1000 eventos por agente. Un cursor sweep con cooldown de 1h poda los registros mas antiguos."
                },
                {
                    label: "5. Correlacion y alertas",
                    badge: "Rules",
                    copy: "El motor de reglas JavaScript evalua thresholds de CPU, RAM, heartbeat, frecuencia de fallos de autenticacion, sudo fuera de whitelist y cambios en el baseline de integridad de archivos."
                },
                {
                    label: "6. Exposicion remota",
                    badge: "Network",
                    copy: "Para remoto, registra una URL que el navegador pueda resolver. Si es publica, usa Authorization Bearer, firewall con origen restringido y HTTPS cuando el frontend se sirva por HTTPS."
                }
            ];
        },

        startSteps() {
            return [
                {
                    label: "Paso 1 — Guia de instalacion",
                    copy: "Selecciona la distribucion del host (Ubuntu/Debian, RHEL/Rocky, Arch, Windows) y sigue las fases: fingerprint, cuenta de servicio, dependencias Python, smoke test y registro en systemd o Task Scheduler."
                },
                {
                    label: "Paso 2 — Generador de agentes",
                    copy: "Rellena el formulario con hostname, URL accesible, IP o DNS del host, alcance de red, puerto (ej. 8765), token si procede, distro, usuario de servicio y modulos activos. Descarga el .py y el fichero de servicio generados."
                },
                {
                    label: "Paso 3 — Despliega y valida",
                    copy: "Copia los ficheros al host, instala dependencias segun la distro, ejecuta el smoke test en foreground (curl /health y /telemetry), despues instala el servicio y verifica NRestarts=0."
                },
                {
                    label: "Paso 4 — Dashboard y alertas",
                    copy: "El host aparece en el dashboard con heartbeat, CPU, RAM y disco. Ajusta las reglas de monitorizacion segun el rol del sistema y revisa las alertas desde la vista de reglas."
                }
            ];
        }
    }
};
</script>
