<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Generador dinamico</span>
                    <h1 class="section-name">Generador de agentes</h1>
                    <p class="section-copy">
                        Esta vista crea el agente Python, la unidad systemd y el script de instalacion a partir del
                        formulario. Tambien deja preparadas las reglas JavaScript que el frontend utilizara para
                        consultar ese host Linux desde tu navegador.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Build</span>
                    <small>Agente .py + .service + .sh + reglas de peticion.</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in generatorHighlights" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="control-grid">
                <div class="control-field">
                    <label class="field-label" for="host-display-name">Nombre visible del host</label>
                    <input id="host-display-name" v-model="agentDraft.displayName" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="system-name">Identificador del sistema</label>
                    <input id="system-name" v-model="agentDraft.systemName" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="distro">Distribucion Linux</label>
                    <select id="distro" v-model="agentDraft.distro" class="form-select input-dark">
                        <option v-for="item in distroOptions" :key="item" :value="item">{{ item }}</option>
                    </select>
                </div>
                <div class="control-field">
                    <label class="field-label" for="os-version">Version aproximada</label>
                    <input id="os-version" v-model="agentDraft.osVersion" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="receiver-url">URL o IP del navegador que consulta</label>
                    <input id="receiver-url" v-model="agentDraft.receiverUrl" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="host-ip">IP privada del host Linux</label>
                    <input id="host-ip" v-model="agentDraft.hostIp" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="receiver-port">Puerto del agente</label>
                    <input id="receiver-port" v-model.number="agentDraft.port" type="number" min="1" max="65535" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="poll-interval">Intervalo de envio en segundos</label>
                    <input id="poll-interval" v-model.number="agentDraft.intervalSeconds" type="number" min="10" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="install-user">Usuario del servicio</label>
                    <input id="install-user" v-model="agentDraft.installUser" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="service-name">Nombre del servicio</label>
                    <input id="service-name" v-model="agentDraft.serviceName" class="form-control input-dark" />
                </div>
                <div class="control-field full-span">
                    <label class="field-label" for="additional-logs">Rutas de logs adicionales</label>
                    <textarea id="additional-logs" v-model="agentDraft.additionalLogPaths" rows="4" class="form-control input-dark textarea-dark"></textarea>
                </div>
                <div class="control-field full-span">
                    <label class="field-label">Modulos a activar</label>
                    <div class="checkbox-grid">
                        <label class="toggle-line" v-for="moduleItem in moduleOptions" :key="moduleItem.key">
                            <input type="checkbox" v-model="agentDraft.modules[moduleItem.key]" />
                            <span>{{ moduleItem.label }}</span>
                        </label>
                    </div>
                </div>
                <div class="control-field full-span">
                    <label class="toggle-line">
                        <input type="checkbox" v-model="agentDraft.generateSystemd" />
                        <span>Generar tambien archivo .service para systemd</span>
                    </label>
                </div>
            </div>

            <div class="inline-actions">
                <button class="btn btn-main" @click="generateAndDownload">Generar y descargar</button>
                <button class="btn btn-subtle" @click="registerCurrentDraft">Registrar host</button>
                <button class="btn btn-subtle" @click="pollNow">Probar polling ahora</button>
            </div>

            <p class="helper-copy">
                El borrador del formulario se conserva mientras navegas entre pantallas. En cuanto generes los
                ficheros, el formulario se limpia para dejar preparado el siguiente despliegue.
            </p>
        </section>

        <section class="section-box">
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

        <section v-if="generatedBundle" class="section-box">
            <div class="verdict-card verdict-success mb-4">
                <div class="verdict-icon">
                    <span>OK</span>
                </div>
                <div class="verdict-body">
                    <strong>Paquete generado y listo para desplegar</strong>
                    <p>
                        El host se ha registrado en tu navegador y ya puedes usar estas descargas para instalar el
                        agente en Linux, validarlo con la guia de instalacion y empezar a recibir telemetria.
                    </p>
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col-xl-6">
                    <div class="tool-card h-100">
                        <div class="card-head">
                            <h5>Resumen de despliegue</h5>
                            <span class="mini-badge">Checklist</span>
                        </div>
                        <div class="deployment-summary">
                            <div class="summary-line">
                                <label>Host</label>
                                <span>{{ buildAgentRecordFromDraft(generatedSnapshot).displayName }}</span>
                            </div>
                            <div class="summary-line">
                                <label>Destino</label>
                                <span>{{ generatedSnapshot.hostIp }}:{{ generatedSnapshot.port }}</span>
                            </div>
                            <div class="summary-line">
                                <label>Servicio</label>
                                <span>{{ generatedSnapshot.serviceName }}</span>
                            </div>
                            <div class="summary-line">
                                <label>Intervalo</label>
                                <span>{{ generatedSnapshot.intervalSeconds }} segundos</span>
                            </div>
                            <div class="summary-line">
                                <label>Modulos</label>
                                <span>{{ summarizeModules(generatedSnapshot.modules) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="tool-card h-100">
                        <div class="card-head">
                            <h5>Reglas JS de peticion</h5>
                            <span class="mini-badge">Frontend</span>
                        </div>
                        <div class="output-box">
                            <pre class="result-pre">{{ prettyJson(requestRulePreview) }}</pre>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tool-card mb-3">
                <div class="card-head">
                    <h5>Instrucciones de instalacion</h5>
                    <span class="mini-badge">Markdown</span>
                </div>
                <div class="output-box tall-output">
                    <ThorondorMarkdownArticle :source="generatedBundle.instructions" />
                </div>
            </div>

            <div class="row g-3 mt-1">
                <div class="col-xl-4">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Agente Python</h5>
                            <div class="card-actions">
                                <span class="mini-badge">.py</span>
                                <button class="btn btn-quiet" @click="downloadTextFile(generatedBundle.agentFileName, generatedBundle.python)">Descargar</button>
                                <button class="btn btn-quiet" @click="copyText(generatedBundle.python)">Copiar</button>
                            </div>
                        </div>
                        <div class="output-box fixed-output">
                            <pre class="result-pre">{{ generatedBundle.python }}</pre>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Unidad systemd</h5>
                            <div class="card-actions">
                                <span class="mini-badge">.service</span>
                                <button class="btn btn-quiet" @click="downloadTextFile(generatedBundle.serviceFileName, generatedBundle.systemd)">Descargar</button>
                                <button class="btn btn-quiet" @click="copyText(generatedBundle.systemd)">Copiar</button>
                            </div>
                        </div>
                        <div class="output-box fixed-output">
                            <pre class="result-pre">{{ generatedBundle.systemd }}</pre>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Script de instalacion</h5>
                            <div class="card-actions">
                                <span class="mini-badge">.sh</span>
                                <button class="btn btn-quiet" @click="downloadTextFile(generatedBundle.installFileName, generatedBundle.installScript)">Descargar</button>
                                <button class="btn btn-quiet" @click="copyText(generatedBundle.installScript)">Copiar</button>
                            </div>
                        </div>
                        <div class="output-box fixed-output">
                            <pre class="result-pre">{{ generatedBundle.installScript }}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorMarkdownArticle from "@/features/vueloThorondor/components/ThorondorMarkdownArticle.vue";
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";
import { THORONDOR_DISTRO_OPTIONS, THORONDOR_MODULE_KEYS, buildThorondorAgentDraft } from "@/features/vueloThorondor/data/thorondorDefaults";
import { buildThorondorAgentFiles } from "@/features/vueloThorondor/services/thorondorGenerator";
import { buildThorondorRequestRules } from "@/features/vueloThorondor/services/thorondorApi";

function cloneDraft(value) {
    return JSON.parse(JSON.stringify(value));
}

export default {
    name: "ThorondorGeneradorAgentesView",

    components: {
        ThorondorMarkdownArticle,
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    data() {
        return {
            agentDraft: buildThorondorAgentDraft(),
            generatedBundle: null,
            generatedSnapshot: null
        };
    },

    computed: {
        distroOptions() {
            return THORONDOR_DISTRO_OPTIONS;
        },

        moduleOptions() {
            return THORONDOR_MODULE_KEYS;
        },

        generatorHighlights() {
            return [
                {
                    label: "Autocontenido",
                    copy: "El .py incluye host, puerto, logs, modulos y usuario del servicio ya embebidos en el propio fichero."
                },
                {
                    label: "Con CORS",
                    copy: "El agente responde con Access-Control-Allow-Origin para que el navegador pueda consumirlo por HTTP."
                },
                {
                    label: "Con systemd",
                    copy: "Puedes generar la unidad del servicio y dejar que el host arranque el agente automaticamente."
                },
                {
                    label: "Con persistencia local",
                    copy: "Si navegas a otras pantallas, el formulario conserva su borrador hasta que generas las descargas."
                }
            ];
        },

        requestRulePreview() {
            const source = this.generatedSnapshot || this.agentDraft;
            return buildThorondorRequestRules(this.buildAgentRecordFromDraft(source));
        },

        storageCards() {
            return [
                {
                    label: "Hosts registrados",
                    value: String(this.dashboardCards.length),
                    tone: "tone-blue",
                    note: "Agentes persistidos localmente en IndexedDB."
                },
                {
                    label: "Ultimo polling",
                    value: this.thorondorLastPollAt ? this.formatRelativeTime(this.thorondorLastPollAt) : "Pendiente",
                    tone: "tone-success",
                    note: "El navegador ya puede probar los hosts guardados."
                },
                {
                    label: "Alertas activas",
                    value: String(this.activeAlerts.length),
                    tone: this.activeAlerts.length ? "tone-warning" : "tone-success",
                    note: "Visibles despues de registrar el agente y empezar el polling."
                },
                {
                    label: "Retencion local",
                    value: `${this.thorondorState.retentionDays} dias`,
                    tone: "tone-neutral",
                    note: "La telemetria no crece indefinidamente."
                }
            ];
        }
    },

    watch: {
        agentDraft: {
            deep: true,
            handler(value) {
                this.$store.dispatch("saveThorondorGeneratorDraft", cloneDraft(value));
            }
        }
    },

    mounted() {
        const persistedDraft = this.thorondorState.generatorDraft || buildThorondorAgentDraft();
        this.agentDraft = cloneDraft(persistedDraft);

        if (typeof window !== "undefined" && !this.agentDraft.receiverUrl) {
            this.agentDraft.receiverUrl = window.location.origin;
        }
    },

    methods: {
        prettyJson(value) {
            return JSON.stringify(value, null, 2);
        },

        buildAgentRecordFromDraft(source = this.agentDraft) {
            const systemName = source.systemName.trim() || "thorondor-host";
            const hostIp = source.hostIp.trim() || "127.0.0.1";
            const port = Number(source.port) || 8765;

            return {
                id: `${systemName}-${hostIp}-${port}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
                displayName: source.displayName.trim() || systemName,
                systemName,
                distro: source.distro,
                osVersion: source.osVersion,
                receiverUrl: source.receiverUrl.trim() || `http://${hostIp}:${port}`,
                hostIp,
                port,
                intervalSeconds: Number(source.intervalSeconds) || 30,
                additionalLogPaths: source.additionalLogPaths,
                modules: { ...source.modules },
                generateSystemd: !!source.generateSystemd,
                installUser: source.installUser.trim() || "thorondor",
                serviceName: source.serviceName.trim() || "thorondor-agent",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        },

        async registerCurrentDraft() {
            const record = this.buildAgentRecordFromDraft();
            await this.$store.dispatch("registerThorondorAgent", record);
            this.$store.commit("setThorondorSelectedAgent", record.id);
        },

        async generateAndDownload() {
            const draftSnapshot = cloneDraft(this.agentDraft);
            const record = this.buildAgentRecordFromDraft(draftSnapshot);

            this.generatedSnapshot = draftSnapshot;
            this.generatedBundle = buildThorondorAgentFiles(draftSnapshot);

            await this.$store.dispatch("registerThorondorAgent", record);
            this.$store.commit("setThorondorSelectedAgent", record.id);

            this.downloadTextFile(this.generatedBundle.agentFileName, this.generatedBundle.python);
            if (draftSnapshot.generateSystemd) {
                this.downloadTextFile(this.generatedBundle.serviceFileName, this.generatedBundle.systemd);
            }
            this.downloadTextFile(this.generatedBundle.installFileName, this.generatedBundle.installScript);

            const freshDraft = buildThorondorAgentDraft(typeof window !== "undefined" ? window.location.origin : "");
            this.agentDraft = freshDraft;
            await this.$store.dispatch("clearThorondorGeneratorDraft");
        },

        downloadTextFile(filename, content) {
            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = filename;
            anchor.click();
            URL.revokeObjectURL(url);
        },

        async copyText(text) {
            if (!navigator.clipboard?.writeText) return;
            await navigator.clipboard.writeText(text);
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";

.deployment-summary {
    display: grid;
    gap: 0.85rem;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(130, 170, 230, 0.16);
}

.summary-line:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.summary-line label {
    color: rgba(198, 216, 245, 0.7);
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.summary-line span {
    color: #f3f7fd;
    text-align: right;
}
</style>
