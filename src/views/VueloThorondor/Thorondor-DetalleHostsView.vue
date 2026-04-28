<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Analisis por host</span>
                    <h1 class="section-name">Detalle por host</h1>
                    <p class="section-copy">
                        Selecciona un agente para inspeccionar sus metricas, procesos, timeline de seguridad, logs,
                        alertas e historico. Esta vista concentra la investigacion operativa de cada sistema.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Deep Dive</span>
                    <small>{{ selectedAgent ? selectedAgent.displayName : "Sin sistema seleccionado" }}</small>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="control-grid compact-grid">
                <div class="control-field">
                    <label class="field-label" for="selected-agent">Sistema</label>
                    <select id="selected-agent" class="form-select input-dark" :value="selectedAgentId" @change="selectAgentAndSync($event.target.value)">
                        <option v-for="agent in dashboardCards" :key="agent.id" :value="agent.id">
                            {{ agent.displayName }} · {{ agent.systemName }}
                        </option>
                    </select>
                </div>
                <div class="control-field">
                    <label class="field-label" for="history-range">Rango historico</label>
                    <select id="history-range" v-model.number="historyRangeDays" class="form-select input-dark">
                        <option :value="1">Ultimas 24 horas</option>
                        <option :value="7">Ultimos 7 dias</option>
                        <option :value="30">Ultimos 30 dias</option>
                    </select>
                </div>
            </div>

            <div v-if="selectedAgent" class="detail-tabs">
                <button v-for="tab in detailTabs" :key="tab.id" class="detail-tab" :class="{ active: detailTab === tab.id }" @click="detailTab = tab.id">
                    {{ tab.label }}
                </button>
            </div>
        </section>

        <section v-if="selectedAgent && detailTab === 'overview'" class="section-box">
            <div class="row g-3 mb-4">
                <div class="col-md-6 col-xl-3" v-for="item in selectedOverviewCards" :key="item.label">
                    <div class="signal-card">
                        <label>{{ item.label }}</label>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small>{{ item.note }}</small>
                    </div>
                </div>
            </div>

            <div class="tool-card mb-4">
                <div class="card-head">
                    <h5>Evolucion temporal del sistema seleccionado</h5>
                    <span class="mini-badge">{{ historyRangeDays }}d</span>
                </div>
                <ThorondorLineChart chart-id="thorondor-agent-history-chart" :labels="selectedHistoryChart.labels" :datasets="selectedHistoryChart.datasets" title="CPU, RAM y disco" />
            </div>

            <div class="row g-3">
                <div class="col-xl-6">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Procesos mas consumidores</h5>
                            <span class="mini-badge">Top 10</span>
                        </div>
                        <div class="table-wrap">
                            <table class="table table-dark table-sm align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Proceso</th>
                                        <th>PID</th>
                                        <th>Usuario</th>
                                        <th>CPU%</th>
                                        <th>RAM%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="process in topProcesses" :key="`${process.pid}-${process.name}`">
                                        <td>{{ process.name }}</td>
                                        <td>{{ process.pid }}</td>
                                        <td>{{ process.user }}</td>
                                        <td>{{ process.cpuPercent }}</td>
                                        <td>{{ process.memoryPercent }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Interfaces de red y trafico</h5>
                            <span class="mini-badge">NIC</span>
                        </div>
                        <div class="table-wrap">
                            <table class="table table-dark table-sm align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Interfaz</th>
                                        <th>IPv4</th>
                                        <th>Enviado</th>
                                        <th>Recibido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="iface in selectedLatestSnapshot?.interfaces || []" :key="iface.name">
                                        <td>{{ iface.name }}</td>
                                        <td>{{ formatList(iface.ipv4) }}</td>
                                        <td>{{ formatBytes(iface.bytesSent) }}</td>
                                        <td>{{ formatBytes(iface.bytesRecv) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-else-if="selectedAgent && detailTab === 'security'" class="section-box">
            <div class="tool-card mb-4">
                <div class="card-head">
                    <h5>Timeline de eventos de seguridad</h5>
                    <span class="mini-badge">Timeline</span>
                </div>
                <div class="timeline-list">
                    <article v-for="event in selectedSecurityEvents" :key="event.id" class="timeline-entry">
                        <div class="timeline-dot"></div>
                        <div class="timeline-body">
                            <strong>{{ humanizeEventKind(event.kind) }}</strong>
                            <p>{{ event.message || event.file || event.subject || "Evento detectado" }}</p>
                            <small>{{ formatDateTime(event.timestamp) }} · {{ event.user || event.sourceIp || "sin origen" }}</small>
                        </div>
                    </article>
                    <div v-if="!selectedSecurityEvents.length" class="empty-box compact-empty">Sin eventos de seguridad para este sistema.</div>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-xl-6">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Logins fallidos</h5>
                            <span class="mini-badge">Auth</span>
                        </div>
                        <div class="table-wrap">
                            <table class="table table-dark table-sm align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>IP</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="event in failedLoginsForSelected" :key="event.id">
                                        <td>{{ event.user }}</td>
                                        <td>{{ event.sourceIp }}</td>
                                        <td>{{ formatDateTime(event.timestamp) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Sudo y cambios criticos</h5>
                            <span class="mini-badge">Privileged</span>
                        </div>
                        <div class="timeline-list compact-timeline">
                            <article v-for="event in selectedPrivilegedEvents" :key="event.id" class="timeline-entry">
                                <div class="timeline-dot warning-dot"></div>
                                <div class="timeline-body">
                                    <strong>{{ humanizeEventKind(event.kind) }}</strong>
                                    <p>{{ event.message || event.file || event.subject }}</p>
                                    <small>{{ formatDateTime(event.timestamp) }}</small>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-else-if="selectedAgent && detailTab === 'logs'" class="section-box">
            <div class="control-grid compact-grid">
                <div class="control-field">
                    <label class="field-label" for="log-level">Nivel</label>
                    <select id="log-level" v-model="logFilters.level" class="form-select input-dark">
                        <option value="all">Todos</option>
                        <option value="INFO">INFO</option>
                        <option value="WARNING">WARNING</option>
                        <option value="ERROR">ERROR</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>
                </div>
                <div class="control-field">
                    <label class="field-label" for="log-source">Fuente</label>
                    <select id="log-source" v-model="logFilters.source" class="form-select input-dark">
                        <option v-for="source in logSourceOptions" :key="source.value" :value="source.value">{{ source.label }}</option>
                    </select>
                </div>
                <div class="control-field full-span">
                    <label class="field-label" for="log-search">Filtro de texto libre</label>
                    <input id="log-search" v-model="logFilters.text" class="form-control input-dark" placeholder="ssh, sudo, error, nginx..." />
                </div>
            </div>

            <div class="inline-actions">
                <button class="btn btn-subtle" @click="exportSelectedLogs('json')">Exportar JSON</button>
                <button class="btn btn-subtle" @click="exportSelectedLogs('csv')">Exportar CSV</button>
            </div>

            <div class="output-box tall-output">
                <pre class="result-pre">{{ formattedFilteredLogs }}</pre>
            </div>
        </section>

        <section v-else-if="selectedAgent && detailTab === 'alerts'" class="section-box">
            <div class="table-wrap">
                <table class="table table-dark align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alert in selectedAlerts" :key="alert.id">
                            <td>{{ alert.typeLabel }}</td>
                            <td>{{ alert.description }}</td>
                            <td>{{ formatDateTime(alert.createdAt) }}</td>
                            <td><span class="state-chip" :class="alertStatusClass(alert.status)">{{ alert.status }}</span></td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-quiet" @click="setAlertStatus(alert.id, 'reviewed')">Revisada</button>
                                    <button class="btn btn-quiet" @click="setAlertStatus(alert.id, 'resolved')">Resuelta</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section v-else-if="selectedAgent" class="section-box">
            <div class="tool-card mb-4">
                <div class="card-head">
                    <h5>Historico de metricas</h5>
                    <span class="mini-badge">{{ historyRangeDays }}d</span>
                </div>
                <ThorondorLineChart chart-id="thorondor-history-only-chart" :labels="selectedHistoryChart.labels" :datasets="selectedHistoryChart.datasets" title="Historico del sistema" />
            </div>

            <div class="table-wrap">
                <table class="table table-dark table-sm align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>CPU</th>
                            <th>RAM</th>
                            <th>Disco</th>
                            <th>Usuarios conectados</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="snapshot in historicalSnapshots" :key="snapshot.id">
                            <td>{{ formatDateTime(snapshot.timestamp) }}</td>
                            <td>{{ formatPercent(snapshot.cpuTotal) }}</td>
                            <td>{{ formatPercent(snapshot.memoryPercent) }}</td>
                            <td>{{ formatPercent(snapshot.diskPercent) }}</td>
                            <td>{{ snapshot.connectedUsers?.length || 0 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section v-else class="section-box">
            <div class="empty-box">No hay hosts seleccionados. Registra uno desde el generador o elige un agente en dashboard.</div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorLineChart from "@/features/vueloThorondor/components/ThorondorLineChart.vue";
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";
import { THORONDOR_LOG_SOURCES } from "@/features/vueloThorondor/data/thorondorDefaults";
import { deriveThorondorAgentStatus } from "@/features/vueloThorondor/services/thorondorRules";
import { toCsv } from "@/features/vueloThorondor/utils/formatters";

export default {
    name: "ThorondorDetalleHostsView",

    components: {
        ThorondorLineChart,
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    data() {
        return {
            detailTab: "overview",
            historyRangeDays: 7,
            logFilters: {
                level: "all",
                text: "",
                source: "all"
            }
        };
    },

    computed: {
        logSourceOptions() {
            return THORONDOR_LOG_SOURCES;
        },

        detailTabs() {
            return [
                { id: "overview", label: "Vision general" },
                { id: "security", label: "Seguridad" },
                { id: "logs", label: "Logs" },
                { id: "alerts", label: "Alertas" },
                { id: "history", label: "Historico" }
            ];
        },

        selectedOverviewCards() {
            if (!this.selectedAgent || !this.selectedLatestSnapshot) return [];
            const status = deriveThorondorAgentStatus(this.selectedAgent);

            return [
                { label: "Hostname", value: this.selectedLatestSnapshot.hostname, tone: "tone-neutral", note: this.selectedLatestSnapshot.localIp },
                { label: "Estado", value: status.label, tone: status.color === "success" ? "tone-success" : (status.color === "warning" ? "tone-warning" : "tone-danger"), note: status.note },
                { label: "Kernel", value: this.selectedLatestSnapshot.kernel, tone: "tone-blue", note: this.selectedAgent.distro },
                { label: "Uptime", value: this.formatDurationSeconds(this.selectedLatestSnapshot.uptimeSeconds), tone: "tone-neutral", note: `${this.selectedLatestSnapshot.connectedUsers?.length || 0} usuarios conectados` },
                { label: "CPU", value: this.formatPercent(this.selectedLatestSnapshot.cpuTotal), tone: "tone-warning", note: `${this.selectedLatestSnapshot.cpuPerCore?.length || 0} nucleos visibles` },
                { label: "RAM", value: this.formatPercent(this.selectedLatestSnapshot.memoryPercent), tone: "tone-success", note: `${this.formatBytes(this.selectedLatestSnapshot.memoryUsed)} / ${this.formatBytes(this.selectedLatestSnapshot.memoryTotal)}` },
                { label: "Swap", value: this.formatPercent(this.selectedLatestSnapshot.swapPercent), tone: "tone-neutral", note: "Intercambio actual" },
                { label: "Disco", value: this.formatPercent(this.selectedLatestSnapshot.diskPercent), tone: "tone-warning", note: `${this.selectedLatestSnapshot.disks?.length || 0} particiones` }
            ];
        },

        historicalSnapshots() {
            const cutoff = Date.now() - (this.historyRangeDays * 86400000);
            return this.selectedAgentSnapshots.filter((snapshot) => new Date(snapshot.timestamp).getTime() >= cutoff);
        },

        selectedHistoryChart() {
            const snapshots = this.historicalSnapshots;
            return {
                labels: snapshots.map((snapshot) => this.formatDateTime(snapshot.timestamp)),
                datasets: [
                    { label: "CPU", data: snapshots.map((snapshot) => snapshot.cpuTotal), borderColor: "rgba(56, 189, 248, 1)", backgroundColor: "rgba(56, 189, 248, 0.18)", tension: 0.25, spanGaps: true },
                    { label: "RAM", data: snapshots.map((snapshot) => snapshot.memoryPercent), borderColor: "rgba(74, 222, 128, 1)", backgroundColor: "rgba(74, 222, 128, 0.18)", tension: 0.25, spanGaps: true },
                    { label: "Disco", data: snapshots.map((snapshot) => snapshot.diskPercent), borderColor: "rgba(251, 191, 36, 1)", backgroundColor: "rgba(251, 191, 36, 0.18)", tension: 0.25, spanGaps: true }
                ]
            };
        },

        topProcesses() {
            return (this.selectedLatestSnapshot?.processes || []).slice(0, 10);
        },

        failedLoginsForSelected() {
            return this.selectedSecurityEvents.filter((event) => event.kind === "failed_login");
        },

        selectedPrivilegedEvents() {
            return this.selectedSecurityEvents.filter((event) => ["sudo_command", "critical_file_change", "new_user"].includes(event.kind));
        },

        filteredLogs() {
            return this.selectedAgentLogs.filter((entry) => {
                const levelMatch = this.logFilters.level === "all" || entry.level === this.logFilters.level;
                const sourceMatch = this.logFilters.source === "all" || entry.source === this.logFilters.source;
                const textMatch = !this.logFilters.text || entry.message.toLowerCase().includes(this.logFilters.text.toLowerCase());
                return levelMatch && sourceMatch && textMatch;
            });
        },

        formattedFilteredLogs() {
            if (!this.filteredLogs.length) return "Sin logs para el filtro actual.";
            return this.filteredLogs.map((entry) => `[${entry.timestamp}] [${entry.level}] [${entry.source}] ${entry.message}`).join("\n");
        }
    },

    mounted() {
        this.syncSelectedAgentFromRoute();
    },

    watch: {
        "$route.query.agent": {
            immediate: true,
            handler() {
                this.syncSelectedAgentFromRoute();
            }
        }
    },

    methods: {
        syncSelectedAgentFromRoute() {
            const routeAgent = this.$route.query.agent;
            if (routeAgent && this.dashboardCards.find((item) => item.id === routeAgent)) {
                this.selectAgent(routeAgent);
                return;
            }

            this.ensureSelectedAgent();
        },

        selectAgentAndSync(agentId) {
            this.selectAgent(agentId);
            this.$router.replace({
                name: "thorondor-host-detail",
                query: { agent: agentId }
            });
        },

        exportSelectedLogs(kind) {
            const rows = this.filteredLogs;
            const fileName = `${this.selectedAgent?.systemName || "thorondor-logs"}-${Date.now()}.${kind}`;
            if (kind === "json") {
                this.downloadTextFile(fileName, JSON.stringify(rows, null, 2));
                return;
            }
            this.downloadTextFile(fileName, toCsv(rows));
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

        async setAlertStatus(id, status) {
            await this.$store.dispatch("setThorondorAlertStatus", { id, status });
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";
</style>
