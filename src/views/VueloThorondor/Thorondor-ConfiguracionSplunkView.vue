<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Configuracion de conexion</span>
                    <h1 class="section-name">Configuracion Splunk</h1>
                    <p class="section-copy">
                        Define los endpoints de tu instancia Splunk y las credenciales de acceso. La configuracion
                        se persiste en <code>localStorage</code> y es compartida por la vista de Splunk para ingesta
                        HEC y ejecucion de busquedas SPL. Consulta la guia de instalacion para la puesta en marcha
                        completa de Splunk, la creacion del token HEC y la configuracion CORS necesaria.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Config</span>
                    <small>REST API · HEC · IndexedDB</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in configHighlights" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <div class="splunk-statusbar" :class="statusBarClass">
            <span class="statusbar-dot"></span>
            <span class="statusbar-label">{{ connectionStatusLabel }}</span>
            <span class="statusbar-url">{{ splunkConfig.apiUrl || 'Sin configurar' }}</span>
            <span v-if="connectionError" class="statusbar-error">{{ connectionError }}</span>
        </div>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Endpoints y credenciales</span>
                    <h2 class="module-title">Parametros de conexion</h2>
                    <p class="module-copy">
                        La REST API (puerto 8089) se usa para autenticar y ejecutar busquedas SPL desde el navegador.
                        El HTTP Event Collector (puerto 8088) recibe los eventos de telemetria enviados por Thorondor.
                        Ambos deben ser accesibles desde el equipo cliente donde corre el navegador.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Setup</span>
                    <small>Puerto 8089 (REST) · 8088 (HEC)</small>
                </div>
            </div>

            <div class="control-grid">
                <div class="control-field">
                    <label class="field-label" for="cfg-api-url">URL API REST</label>
                    <input id="cfg-api-url" v-model="splunkConfig.apiUrl" class="form-control input-dark" placeholder="https://localhost:8089" />
                    <small class="field-hint">Endpoint principal de la REST API. Usado para autenticacion y SPL.</small>
                </div>
                <div class="control-field">
                    <label class="field-label" for="cfg-hec-url">URL HTTP Event Collector</label>
                    <input id="cfg-hec-url" v-model="splunkConfig.hecUrl" class="form-control input-dark" placeholder="http://localhost:8088" />
                    <small class="field-hint">Endpoint HEC. Recibe los eventos de telemetria de Thorondor.</small>
                </div>
                <div class="control-field">
                    <label class="field-label" for="cfg-user">Usuario</label>
                    <input id="cfg-user" v-model="splunkConfig.username" class="form-control input-dark" placeholder="admin" autocomplete="username" />
                    <small class="field-hint">Usuario con permisos de busqueda SPL en Splunk.</small>
                </div>
                <div class="control-field">
                    <label class="field-label" for="cfg-pass">Contrasena</label>
                    <input id="cfg-pass" v-model="splunkConfig.password" type="password" class="form-control input-dark" placeholder="••••••••" autocomplete="current-password" />
                    <small class="field-hint">No se almacena en texto plano; se guarda en localStorage del navegador.</small>
                </div>
                <div class="control-field">
                    <label class="field-label" for="cfg-hec-token">Token HEC</label>
                    <input id="cfg-hec-token" v-model="splunkConfig.hecToken" class="form-control input-dark" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
                    <small class="field-hint">UUID generado en Settings &gt; Data inputs &gt; HTTP Event Collector.</small>
                </div>
                <div class="control-field">
                    <label class="field-label" for="cfg-index">Indice</label>
                    <input id="cfg-index" v-model="splunkConfig.index" class="form-control input-dark" placeholder="thorondor" />
                    <small class="field-hint">Indice Splunk de destino. Debe existir antes de enviar datos.</small>
                </div>
            </div>

            <div class="inline-actions mt-3">
                <button class="btn btn-main" :disabled="connectionStatus === 'testing'" @click="testConnection">
                    {{ connectionStatus === 'testing' ? 'Probando...' : 'Probar conexion' }}
                </button>
                <button class="btn btn-subtle" @click="saveConfig">Guardar configuracion</button>
                <button class="btn btn-danger-subtle" @click="clearConfig">Borrar datos del formulario</button>
            </div>

            <div v-if="saveConfirmed" class="verdict-card verdict-ok mt-3">
                <div class="verdict-icon"><span>OK</span></div>
                <div class="verdict-body">
                    <strong>Configuracion guardada</strong>
                    <p>Los parametros de conexion han sido persistidos en localStorage y estan disponibles para la vista de Splunk.</p>
                </div>
            </div>

            <div v-if="connectionStatus === 'ok'" class="verdict-card verdict-ok mt-3">
                <div class="verdict-icon"><span>✓</span></div>
                <div class="verdict-body">
                    <strong>Conexion establecida</strong>
                    <p>La REST API de Splunk responde correctamente en <code>{{ splunkConfig.apiUrl }}</code>. La configuracion ha sido guardada automaticamente.</p>
                </div>
            </div>

            <div v-if="connectionStatus === 'error'" class="verdict-card verdict-critical mt-3">
                <div class="verdict-icon"><span>!</span></div>
                <div class="verdict-body">
                    <strong>Error de conexion</strong>
                    <p>{{ connectionError }}</p>
                    <p style="font-size:0.83rem; color: rgba(203,213,225,0.7); margin-top:0.5rem;">
                        Verifica que Splunk esta corriendo, que la URL es correcta, que CORS esta configurado en
                        <code>web.conf</code> y que el puerto 8089 es alcanzable desde este equipo.
                        Consulta la guia de instalacion para los pasos de configuracion CORS.
                    </p>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Referencia rapida</span>
                    <h2 class="module-title">Obtencion de credenciales Splunk</h2>
                    <p class="module-copy">
                        Si aun no tienes Splunk instalado o no has generado el token HEC, sigue la guia de instalacion.
                        La licencia Developer es gratuita y no requiere tarjeta de credito.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Links</span>
                    <small>dev.splunk.com</small>
                </div>
            </div>

            <div class="card-grid">
                <article class="tool-card" v-for="ref in quickRefs" :key="ref.title">
                    <div class="card-head">
                        <h5>{{ ref.title }}</h5>
                        <span class="mini-badge">{{ ref.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ ref.copy }}</p>
                    <a v-if="ref.url" :href="ref.url" target="_blank" rel="noopener noreferrer" class="ref-link mt-2">
                        {{ ref.urlLabel }} →
                    </a>
                </article>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";

const SPLUNK_CONFIG_KEY = "thorondor_splunk_config";

const DEFAULT_CONFIG = () => ({
    apiUrl: "",
    hecUrl: "",
    username: "",
    password: "",
    hecToken: "",
    index: "thorondor"
});

export default {
    name: "ThorondorConfiguracionSplunkView",

    components: {
        ThorondorPageShell
    },

    data() {
        return {
            splunkConfig: DEFAULT_CONFIG(),
            connectionStatus: "unconfigured",
            connectionError: "",
            saveConfirmed: false
        };
    },

    computed: {
        statusBarClass() {
            if (this.connectionStatus === "ok") return "status-ok";
            if (this.connectionStatus === "error") return "status-error";
            if (this.connectionStatus === "testing") return "status-testing";
            return "status-unconfigured";
        },

        connectionStatusLabel() {
            const map = {
                ok: "Conectado a Splunk",
                error: "Error de conexion",
                testing: "Probando conexion...",
                unconfigured: "Sin configurar"
            };
            return map[this.connectionStatus] || "Sin configurar";
        },

        configHighlights() {
            return [
                {
                    label: "Persistencia en localStorage",
                    copy: "La configuracion se guarda en localStorage con la clave thorondor_splunk_config. La vista de Splunk lee esta misma clave para ingesta HEC y busquedas SPL."
                },
                {
                    label: "REST API — puerto 8089",
                    copy: "Autenticacion basica (Basic Auth) sobre HTTPS. Necesaria para crear jobs SPL y recuperar resultados. Requiere CORS configurado en web.conf para acceso desde navegador."
                },
                {
                    label: "HEC — puerto 8088",
                    copy: "Autenticacion por token Bearer. Recibe eventos JSON en /services/collector/event. Se puede usar sin SSL en LAN privada (enableSSL=0 en inputs.conf)."
                },
                {
                    label: "Source types",
                    copy: "Thorondor usa tres source types: thorondor:snapshot (metricas), thorondor:events (seguridad) y thorondor:logs (entradas de log). Deben definirse al crear el token HEC."
                }
            ];
        },

        quickRefs() {
            return [
                {
                    title: "Licencia Developer gratuita",
                    badge: "500 MB/dia",
                    copy: "Splunk Enterprise con licencia Developer es gratuita, sin limite temporal y con 500 MB de ingesta diaria. Suficiente para varios hosts con polling cada 30 segundos.",
                    url: "https://dev.splunk.com/enterprise/dev_license",
                    urlLabel: "Solicitar en dev.splunk.com"
                },
                {
                    title: "Descarga Splunk Enterprise",
                    badge: "Download",
                    copy: "Descarga el paquete para tu plataforma (DEB, RPM, MSI o tarball). La guia de instalacion incluye los comandos de instalacion y configuracion para cada distribucion.",
                    url: "https://www.splunk.com/en_us/download/splunk-enterprise.html",
                    urlLabel: "Ir a splunk.com/download"
                },
                {
                    title: "Configuracion CORS y HEC",
                    badge: "Guia",
                    copy: "La configuracion de CORS en web.conf y la creacion del token HEC se documentan en la guia de instalacion de Thorondor, en la seccion de Splunk del servidor.",
                    url: null,
                    urlLabel: null
                },
                {
                    title: "Verificar la conexion",
                    badge: "Test",
                    copy: "Usa el boton Probar conexion para validar la REST API. Si la prueba falla con error CORS, revisa que crossOriginSharingPolicy en web.conf incluye el origen de esta aplicacion.",
                    url: null,
                    urlLabel: null
                }
            ];
        }
    },

    mounted() {
        this.loadConfig();
    },

    methods: {
        loadConfig() {
            try {
                const raw = localStorage.getItem(SPLUNK_CONFIG_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    this.splunkConfig = { ...DEFAULT_CONFIG(), ...parsed };
                    if (this.splunkConfig.apiUrl) this.connectionStatus = "unconfigured";
                }
            } catch {
                // ignore
            }
        },

        saveConfig() {
            try {
                localStorage.setItem(SPLUNK_CONFIG_KEY, JSON.stringify(this.splunkConfig));
                this.saveConfirmed = true;
                setTimeout(() => { this.saveConfirmed = false; }, 3000);
            } catch {
                // ignore
            }
        },

        clearConfig() {
            this.splunkConfig = DEFAULT_CONFIG();
            this.connectionStatus = "unconfigured";
            this.connectionError = "";
            try {
                localStorage.removeItem(SPLUNK_CONFIG_KEY);
            } catch {
                // ignore
            }
        },

        async testConnection() {
            if (!this.splunkConfig.apiUrl || !this.splunkConfig.username || !this.splunkConfig.password) {
                this.connectionStatus = "error";
                this.connectionError = "Introduce la URL de la API REST, el usuario y la contrasena antes de probar la conexion.";
                return;
            }

            this.connectionStatus = "testing";
            this.connectionError = "";

            try {
                const url = `${this.splunkConfig.apiUrl.replace(/\/$/, "")}/services/server/info?output_mode=json`;
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Basic ${btoa(`${this.splunkConfig.username}:${this.splunkConfig.password}`)}`
                    }
                });

                if (response.ok) {
                    this.connectionStatus = "ok";
                    this.saveConfig();
                } else {
                    this.connectionStatus = "error";
                    this.connectionError = `HTTP ${response.status} — Verifica las credenciales y que la API REST esta accesible desde este equipo.`;
                }
            } catch (err) {
                this.connectionStatus = "error";
                this.connectionError = `No se pudo conectar: ${err.message}. Verifica la URL, el puerto y la configuracion CORS de Splunk (web.conf).`;
            }
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";

.control-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
}

@media (max-width: 767px) {
    .control-grid {
        grid-template-columns: 1fr;
    }
}

.control-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(190, 215, 255, 0.8);
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.field-hint {
    font-size: 0.76rem;
    color: rgba(160, 190, 220, 0.55);
    line-height: 1.4;
}

.inline-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
}

.btn-danger-subtle {
    background: transparent;
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: rgba(252, 165, 165, 0.8);
    padding: 0.45rem 1rem;
    border-radius: 7px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
}

.btn-danger-subtle:hover {
    border-color: rgba(239, 68, 68, 0.55);
    color: #fca5a5;
}

.splunk-statusbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(94, 156, 255, 0.14);
    background: rgba(10, 18, 34, 0.7);
    font-size: 0.85rem;
    flex-wrap: wrap;
}

.statusbar-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(148, 163, 184, 0.4);
    flex-shrink: 0;
}

.status-ok .statusbar-dot { background: #4ade80; box-shadow: 0 0 6px rgba(74, 222, 128, 0.5); }
.status-error .statusbar-dot { background: #f87171; box-shadow: 0 0 6px rgba(248, 113, 113, 0.5); }
.status-testing .statusbar-dot { background: #facc15; box-shadow: 0 0 6px rgba(250, 204, 21, 0.5); animation: pulse 1s infinite; }

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

.statusbar-label {
    font-weight: 600;
    color: rgba(200, 220, 255, 0.85);
}

.statusbar-url {
    font-family: monospace;
    font-size: 0.82rem;
    color: rgba(160, 190, 220, 0.6);
}

.statusbar-error {
    color: #fca5a5;
    font-size: 0.82rem;
}

.ref-link {
    display: inline-block;
    color: #7db8ff;
    font-size: 0.83rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.15s ease;
}

.ref-link:hover {
    color: #b3d4ff;
    text-decoration: underline;
}
</style>
