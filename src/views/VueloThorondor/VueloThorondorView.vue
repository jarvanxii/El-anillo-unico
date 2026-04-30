<template>
    <ThorondorPageShell :show-banner="true">
        <section class="section-box intro-box">
            <div class="intro-layout">
                <div class="section-heading">
                    <span class="section-kicker">SIEM personal para sistemas Linux</span>
                    <h1 class="section-name">El vuelo de Thorondor</h1>
                    <p class="section-copy">
                        Este apartado de información es la puerta de entrada para cualquier usuario que quiera
                        monitorizar una red local con un sistema Linux. Aquí se explica como funciona la monitorizacion,
                        que papel juega el agente Python, que guarda el navegador, como se conectan los hosts y por que
                        este modulo esta planteado como un SIEM personal y no corporativo.
                    </p>
                </div>

                <div class="intro-emblem">
                    <img src="@/assets/logos/thorondor.png" alt="Sello de Thorondor" />
                    <span>Monitorizacion desde el navegador</span>
                    <small>
                        Todo gira alrededor de tu navegador, la IP privada del host Linux y un agente Python
                        autocontenido que responde peticiones HTTP en tu red local.
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
                        Thorondor te ayuda a vigilar varios sistemas Linux desde una web local, sin desplegar un
                        backend tradicional ni una plataforma centralizada. Es util para laboratorios, equipos caseros,
                        servidores propios y entornos donde prefieres visibilidad directa sin compartir datos.
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
                    <strong>Solo en tu navegador, pero con varios hosts</strong>
                    <p>
                        Puedes registrar varios agentes y monitorizar varios usuarios o varias maquinas, pero los datos
                        viven en tu navegador y en tu IndexedDB local. No se ha planteado como consola multiempresa ni
                        como servicio para compartir telemetria entre terceros.
                    </p>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Arquitectura</span>
                    <h2 class="module-title">Resumen técnico</h2>
                    <p class="module-copy">
                        Si nunca has montado algo parecido, piensa en Thorondor como una combinacion de generador,
                        sonda local y panel de control. El frontend genera el agente, el host Linux lo ejecuta y tu
                        navegador hace las consultas.
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
import ThorondorMarkdownArticle from "@/features/vueloThorondor/components/ThorondorMarkdownArticle.vue";
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";
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
                    label: "Solo en tu navegador",
                    copy: "La consola guarda los datos en IndexedDB del cliente. No dependes de un backend central para usarla."
                },
                {
                    label: "Varios hosts o usuarios",
                    copy: "Puedes registrar varios sistemas Linux, cada uno con su IP privada, puerto, modulos activos y politicas propias de monitorizacion."
                },
                {
                    label: "No compartes datos",
                    copy: "La telemetria queda pensada para uso personal. No esta orientada a enviar datos a terceros ni a un panel corporativo."
                },
                {
                    label: "Reglas en JavaScript",
                    copy: "El frontend define las peticiones a los agentes, interpreta sus respuestas y dispara alertas localmente."
                }
            ];
        },

        overviewCards() {
            return [
                {
                    label: "Agentes locales",
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
                    label: "1. Generas el agente",
                    badge: "Frontend",
                    copy: "Desde la vista de generador defines nombre del host, distro, puerto, logs, modulos y usuario del servicio. La web compone un .py y un .service listos para descargar."
                },
                {
                    label: "2. Lo instalas en Linux",
                    badge: "Host",
                    copy: "Copias los archivos al servidor o equipo Linux, instalas Python y psutil, das permisos al usuario y dejas el agente como servicio systemd."
                },
                {
                    label: "3. El navegador consulta",
                    badge: "Polling",
                    copy: "Tu navegador hace peticiones HTTP al host Linux a traves de su IP privada y del puerto configurado. El agente responde JSON con metricas, logs y eventos."
                },
                {
                    label: "4. Se guarda lo importante",
                    badge: "Storage",
                    copy: "El frontend resume, persiste y limpia snapshots, logs y alertas con IndexedDB. Vuex sostiene el estado vivo para dashboard, detalle y reglas."
                },
                {
                    label: "5. Se evalua el riesgo",
                    badge: "Rules",
                    copy: "Las reglas JavaScript vigilan CPU, RAM, heartbeat, fallos de login, sudo y cambios criticos para disparar alertas sin depender de un backend."
                },
                {
                    label: "6. Revisas cada host",
                    badge: "UX",
                    copy: "Desde dashboard y detalle por host puedes bajar a procesos, logs, timeline de seguridad, historico, estado del agente y eventos exportables."
                }
            ];
        },

        startSteps() {
            return [
                {
                    label: "Paso 1 - Lee la guia",
                    copy: "Empieza por la informacion principal y la guia de instalacion para entender de donde sacar IP, logs, permisos y paquetes del sistema."
                },
                {
                    label: "Paso 2 - Genera el agente",
                    copy: "Configura un solo host Linux con un puerto sencillo, por ejemplo 8765, y con un intervalo de 30 segundos para validar el flujo."
                },
                {
                    label: "Paso 3 - Activa systemd",
                    copy: "Haz que el servicio arranque al encender el equipo. Asi el host seguira accesible para el navegador sin lanzar manualmente el script."
                },
                {
                    label: "Paso 4 - Revisa dashboard",
                    copy: "Comprueba heartbeat, CPU, RAM, disco y eventos recientes. Si todo responde, anade mas hosts o ajusta reglas de monitorizacion."
                }
            ];
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";
</style>
