<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Motor de reglas</span>
                    <h1 class="section-name">Reglas de monitorizacion</h1>
                    <p class="section-copy">
                        Aqui defines que condiciones generan alertas en el navegador. Las reglas se aplican a uno o a
                        todos los hosts y quedan persistidas localmente para reutilizarlas entre sesiones.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Rules</span>
                    <small>{{ thorondorRules.length }} reglas configuradas.</small>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="row g-3">
                <div class="col-xl-7">
                    <div class="tool-card h-100 active-rules-card">
                        <div class="card-head">
                            <h5>Reglas activas</h5>
                            <span class="mini-badge">JS</span>
                        </div>
                        <div class="table-wrap">
                            <table class="table table-dark align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Umbral</th>
                                        <th>Ambito</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="rule in thorondorRules" :key="rule.id">
                                        <td>{{ rule.name }}</td>
                                        <td>{{ humanizeRuleType(rule.type) }}</td>
                                        <td>{{ formatRuleThreshold(rule) }}</td>
                                        <td>{{ rule.scope === 'all' ? 'Todos' : agentNameById(rule.scope) }}</td>
                                        <td>
                                            <span class="state-chip" :class="rule.enabled ? 'chip-success' : 'chip-muted'">
                                                {{ rule.enabled ? "Activa" : "Pausada" }}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="table-actions">
                                                <button class="btn btn-quiet" @click="editRule(rule)">Editar</button>
                                                <button class="btn btn-quiet" @click="toggleRule(rule)">{{ rule.enabled ? "Pausar" : "Activar" }}</button>
                                                <button class="btn btn-quiet danger-text" @click="deleteRule(rule.id)">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-xl-5">
                    <div class="rule-studio">
                        <div class="tool-card rule-helper-card">
                            <div class="card-head">
                                <h5>Plantillas recomendadas</h5>
                                <span class="mini-badge">Presets</span>
                            </div>
                            <div class="preset-grid">
                                <button v-for="preset in rulePresets" :key="preset.type" class="preset-pill" @click="applyPreset(preset)">
                                    {{ preset.label }}
                                </button>
                            </div>
                            <div class="helper-list">
                                <div class="helper-item" v-for="note in helperNotes" :key="note.title">
                                    <strong>{{ note.title }}</strong>
                                    <p>{{ note.copy }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="tool-card rule-preview-card">
                            <div class="card-head">
                                <h5>Resumen de la regla</h5>
                                <span class="mini-badge">{{ ruleDraft.enabled ? "Activa" : "Pausada" }}</span>
                            </div>
                            <div class="rule-preview-grid">
                                <div class="preview-line">
                                    <label>Nombre</label>
                                    <span>{{ ruleDraft.name || "Sin nombre todavia" }}</span>
                                </div>
                                <div class="preview-line">
                                    <label>Tipo</label>
                                    <span>{{ humanizeRuleType(ruleDraft.type) }}</span>
                                </div>
                                <div class="preview-line">
                                    <label>Ambito</label>
                                    <span>{{ ruleDraft.scope === "all" ? "Todos los hosts" : agentNameById(ruleDraft.scope) }}</span>
                                </div>
                                <div class="preview-line">
                                    <label>Condicion</label>
                                    <span>{{ formatRuleThreshold(ruleDraft) }}</span>
                                </div>
                                <div class="preview-line">
                                    <label>Ventana</label>
                                    <span>{{ ruleDraft.durationMinutes }} minutos</span>
                                </div>
                            </div>
                        </div>

                        <div class="tool-card rule-editor-card">
                            <div class="card-head">
                                <h5>{{ ruleDraft.id ? "Editar regla" : "Nueva regla" }}</h5>
                                <span class="mini-badge">Editor</span>
                            </div>
                            <div class="control-grid compact-grid">
                                <div class="control-field">
                                    <label class="field-label" for="rule-name">Nombre</label>
                                    <input id="rule-name" v-model="ruleDraft.name" class="form-control input-dark" />
                                </div>
                                <div class="control-field">
                                    <label class="field-label" for="rule-type">Tipo</label>
                                    <select id="rule-type" v-model="ruleDraft.type" class="form-select input-dark">
                                        <option v-for="type in ruleTypeOptions" :key="type" :value="type">{{ humanizeRuleType(type) }}</option>
                                    </select>
                                </div>
                                <div class="control-field">
                                    <label class="field-label" for="rule-threshold">Umbral</label>
                                    <input id="rule-threshold" v-model.number="ruleDraft.threshold" type="number" min="1" class="form-control input-dark" />
                                </div>
                                <div class="control-field">
                                    <label class="field-label" for="rule-duration">Minutos</label>
                                    <input id="rule-duration" v-model.number="ruleDraft.durationMinutes" type="number" min="1" class="form-control input-dark" />
                                </div>
                                <div class="control-field full-span">
                                    <label class="field-label" for="rule-scope">Sistema</label>
                                    <select id="rule-scope" v-model="ruleDraft.scope" class="form-select input-dark">
                                        <option value="all">Todos</option>
                                        <option v-for="agent in dashboardCards" :key="agent.id" :value="agent.id">{{ agent.displayName }}</option>
                                    </select>
                                </div>
                                <div class="control-field full-span">
                                    <label class="field-label" for="rule-description">Descripcion operativa</label>
                                    <textarea id="rule-description" v-model="ruleDraft.description" rows="3" class="form-control input-dark textarea-dark"></textarea>
                                </div>
                                <div class="control-field full-span">
                                    <label class="toggle-line">
                                        <input type="checkbox" v-model="ruleDraft.enabled" />
                                        <span>Regla activada</span>
                                    </label>
                                </div>
                            </div>

                            <div class="inline-actions">
                                <button class="btn btn-main" @click="saveRule">Guardar regla</button>
                                <button class="btn btn-subtle" @click="resetRuleDraft">Limpiar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="tool-card">
                <div class="card-head">
                    <h5>Alertas activas globales</h5>
                    <span class="mini-badge">{{ activeAlerts.length }}</span>
                </div>
                <div class="table-wrap scrollable-wrap">
                    <table class="table table-dark align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Sistema</th>
                                <th>Tipo</th>
                                <th>Descripcion</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="alert in activeAlerts" :key="alert.id">
                                <td>{{ agentNameById(alert.agentId) }}</td>
                                <td>{{ alert.typeLabel }}</td>
                                <td>{{ alert.description }}</td>
                                <td>{{ formatDateTime(alert.createdAt) }}</td>
                                <td>{{ alert.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorPageShell from "@/components/VueloThorondor/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";

export default {
    name: "ThorondorReglasMonitorizacionView",

    components: {
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    data() {
        return {
            ruleDraft: this.createEmptyRule()
        };
    },

    computed: {
        ruleTypeOptions() {
            return [
                "cpu",
                "ram",
                "disk",
                "failedLogins",
                "unknownLoginIp",
                "criticalFileChange",
                "heartbeat",
                "sudoUnauthorized",
                "newUser",
                "networkExposure"
            ];
        },

        rulePresets() {
            return [
                { label: "CPU alta", name: "CPU sostenida alta", type: "cpu", threshold: 85, durationMinutes: 5, description: "Alerta si la CPU permanece alta varios minutos." },
                { label: "RAM alta", name: "RAM alta sostenida", type: "ram", threshold: 90, durationMinutes: 3, description: "Detecta presion de memoria sostenida." },
                { label: "Disco alto", name: "Disco en nivel alto", type: "disk", threshold: 90, durationMinutes: 10, description: "Advierte de particiones cerca del limite." },
                { label: "Heartbeat perdido", name: "Agente sin heartbeat reciente", type: "heartbeat", threshold: 3, durationMinutes: 3, description: "Marca agentes sin respuesta reciente." },
                { label: "Logins fallidos", name: "Rafaga de logins fallidos", type: "failedLogins", threshold: 5, durationMinutes: 10, description: "Detecta rafagas de autenticacion fallida." }
            ];
        },

        helperNotes() {
            return [
                {
                    title: "Empieza por reglas simples",
                    copy: "CPU, RAM, disco y heartbeat suelen darte la mejor base para validar que la monitorizacion funciona bien."
                },
                {
                    title: "Evita umbrales demasiado bajos",
                    copy: "Si disparas alertas por ruido normal del sistema, el panel perdera valor operativo en muy poco tiempo."
                },
                {
                    title: "Ajusta por host cuando haga falta",
                    copy: "Los servidores mas cargados o los equipos de laboratorio no deberian compartir siempre los mismos umbrales."
                }
            ];
        }
    },

    methods: {
        createEmptyRule() {
            return {
                id: "",
                name: "",
                type: "cpu",
                enabled: true,
                threshold: 80,
                durationMinutes: 5,
                scope: "all",
                description: ""
            };
        },

        humanizeRuleType(type) {
            const map = {
                cpu: "CPU sostenida alta",
                ram: "RAM alta",
                disk: "Disco alto",
                failedLogins: "Fallos de login",
                unknownLoginIp: "Login desde IP desconocida",
                criticalFileChange: "Cambio en archivo critico",
                heartbeat: "Heartbeat ausente",
                sudoUnauthorized: "Sudo no autorizado",
                newUser: "Nuevo usuario o grupo",
                networkExposure: "Puerto sensible expuesto"
            };
            return map[type] || type;
        },

        formatRuleThreshold(rule) {
            if (rule.type === "heartbeat") {
                return `Sin heartbeat durante ${rule.threshold} min`;
            }
            if (rule.type === "failedLogins") {
                return `${rule.threshold} eventos en ${rule.durationMinutes} min`;
            }
            if (["cpu", "ram", "disk"].includes(rule.type)) {
                return `${rule.threshold}% durante ${rule.durationMinutes} min`;
            }
            return `Umbral ${rule.threshold}`;
        },

        applyPreset(preset) {
            this.ruleDraft = {
                ...this.ruleDraft,
                name: preset.name || preset.label,
                type: preset.type,
                threshold: preset.threshold,
                durationMinutes: preset.durationMinutes,
                description: preset.description
            };
        },

        resetRuleDraft() {
            this.ruleDraft = this.createEmptyRule();
        },

        editRule(rule) {
            this.ruleDraft = { ...rule };
        },

        async saveRule() {
            const fallbackNames = {
                cpu: "CPU sostenida alta",
                ram: "RAM alta",
                disk: "Disco alto",
                failedLogins: "Exceso de logins fallidos",
                unknownLoginIp: "Login desde IP desconocida",
                criticalFileChange: "Cambio en archivo critico",
                heartbeat: "Agente sin heartbeat",
                sudoUnauthorized: "Sudo no autorizado",
                newUser: "Nuevo usuario",
                networkExposure: "Puerto sensible expuesto"
            };

            const rule = {
                ...this.ruleDraft,
                id: this.ruleDraft.id || `rule-${Date.now()}`,
                name: this.ruleDraft.name || fallbackNames[this.ruleDraft.type],
                description: this.ruleDraft.description || "Regla creada desde el panel de monitorizacion."
            };
            await this.$store.dispatch("saveThorondorRule", rule);
            this.resetRuleDraft();
        },

        async deleteRule(ruleId) {
            await this.$store.dispatch("deleteThorondorRule", ruleId);
        },

        async toggleRule(rule) {
            await this.$store.dispatch("saveThorondorRule", {
                ...rule,
                enabled: !rule.enabled
            });
        }
    }
};
</script>

<style scoped>
.rule-studio {
    display: grid;
    gap: 1rem;
}

.active-rules-card {
    align-content: start;
}

.active-rules-card .table-wrap {
    align-self: start;
}

.rule-helper-card,
.rule-preview-card,
.rule-editor-card {
    background: linear-gradient(180deg, rgba(25, 36, 50, 0.98), rgba(17, 25, 36, 0.98));
    border: 1px solid rgba(148, 163, 184, 0.22);
}

.preset-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-bottom: 1rem;
}

.preset-pill {
    border: 1px solid rgba(148, 163, 184, 0.34);
    background: rgba(48, 63, 80, 0.5);
    color: #dce6ef;
    border-radius: 999px;
    padding: 0.55rem 0.9rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.preset-pill:hover {
    background: rgba(48, 63, 80, 0.88);
    border-color: rgba(169, 186, 203, 0.48);
}

.helper-list {
    display: grid;
    gap: 0.9rem;
}

.helper-item strong {
    display: block;
    color: #f4f8fb;
    margin-bottom: 0.3rem;
}

.helper-item p {
    margin: 0;
    color: rgba(218, 229, 240, 0.82);
}

.rule-preview-grid {
    display: grid;
    gap: 0.85rem;
}

.preview-line {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.16);
}

.preview-line:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.preview-line label {
    color: rgba(198, 210, 222, 0.7);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.preview-line span {
    color: #eef4f9;
    text-align: right;
}
</style>
