<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Visibilidad general</span>
                    <h1 class="section-name">Dashboard general</h1>
                    <p class="section-copy">
                        Esta vista resume el estado de todos los agentes, el ultimo heartbeat, el consumo principal, las
                        alertas activas y los eventos de seguridad que mas importan en las ultimas 24 horas.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Live</span>
                    <small>Ultimo polling: {{ thorondorLastPollAt ? formatRelativeTime(thorondorLastPollAt) : "Pendiente" }}</small>
                </div>
            </div>

            <div class="inline-actions">
                <button class="btn btn-main" @click="pollNow">Actualizar ahora</button>
            </div>

            <div class="row g-3">
                <div class="col-md-6 col-xl-3" v-for="item in dashboardSummaryCards" :key="item.label">
                    <div class="metric-card">
                        <label>{{ item.label }}</label>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small>{{ item.note }}</small>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="tool-card">
                <div class="card-head">
                    <h5>Evolucion de CPU y RAM de las ultimas 2 horas</h5>
                    <span class="mini-badge">Chart.js</span>
                </div>
                <ThorondorLineChart
                    chart-id="thorondor-dashboard-chart"
                    :labels="dashboardChart.labels"
                    :datasets="dashboardChart.datasets"
                    title="CPU y RAM por sistema"
                />
            </div>
        </section>

        <section class="section-box">
            <div v-if="dashboardCards.length" class="card-grid">
                <article v-for="card in dashboardCards" :key="card.id" class="tool-card clickable-card" @click="openAgentDetail(card.id)">
                    <div class="card-head">
                        <div>
                            <h5>{{ card.displayName }}</h5>
                            <small class="muted-copy">{{ card.systemName }} · {{ card.targetOs === 'windows' ? card.osVersion || 'Windows' : card.distro }}</small>
                        </div>
                        <div class="card-head-right">
                            <span class="os-badge" :class="card.targetOs === 'windows' ? 'os-badge--win' : 'os-badge--linux'">{{ card.targetOs === 'windows' ? '🪟 Win' : '🐧 Linux' }}</span>
                            <span class="state-chip" :class="statusClass(card.status.color)">{{ card.status.label }}</span>
                        </div>
                    </div>

                    <div class="mini-grid">
                        <div class="mini-stat">
                            <label>Ultimo heartbeat</label>
                            <span>{{ formatRelativeTime(card.lastHeartbeatAt) }}</span>
                        </div>
                        <div class="mini-stat">
                            <label>CPU</label>
                            <span>{{ formatPercent(card.latestSnapshot?.cpuTotal) }}</span>
                        </div>
                        <div class="mini-stat">
                            <label>RAM</label>
                            <span>{{ formatPercent(card.latestSnapshot?.memoryPercent) }}</span>
                        </div>
                        <div class="mini-stat">
                            <label>Disco</label>
                            <span>{{ formatPercent(card.latestSnapshot?.diskPercent) }}</span>
                        </div>
                        <div class="mini-stat">
                            <label>Alertas</label>
                            <span>{{ card.alertCount }}</span>
                        </div>
                        <div class="mini-stat">
                            <label>Alcance</label>
                            <span>{{ networkScopeLabel(card) }}</span>
                        </div>
                        <div class="mini-stat endpoint-mini-stat">
                            <label>Endpoint</label>
                            <span class="endpoint-text">{{ agentEndpoint(card) }}</span>
                        </div>
                    </div>
                </article>
            </div>
            <div v-else class="empty-box">
                No hay agentes registrados todavia. Empieza por la vista de generador.
            </div>
        </section>

        <section class="section-box">
            <div class="row g-3">
                <div class="col-xl-6">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Eventos de seguridad en las ultimas 24 horas</h5>
                            <span class="mini-badge">24h</span>
                        </div>
                        <div class="table-wrap">
                            <table class="table table-dark table-sm align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Sistema</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in eventsPerSystem24h" :key="item.agentId">
                                        <td>{{ item.agentName }}</td>
                                        <td>{{ item.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>IPs de origen con intentos fallidos</h5>
                            <span class="mini-badge">Top</span>
                        </div>
                        <div class="table-wrap">
                            <table class="table table-dark table-sm align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>IP</th>
                                        <th>Intentos</th>
                                        <th>Ultimo sistema</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in failedOrigins" :key="item.ip">
                                        <td>{{ item.ip }}</td>
                                        <td>{{ item.count }}</td>
                                        <td>{{ item.agentName }}</td>
                                    </tr>
                                    <tr v-if="!failedOrigins.length">
                                        <td colspan="3" class="text-muted">Sin intentos fallidos recientes.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorLineChart from "@/components/VueloThorondor/ThorondorLineChart.vue";
import ThorondorPageShell from "@/components/VueloThorondor/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";

function colorFromSeed(seed, alpha = 1) {
    const palette = [
        [148, 163, 184],
        [251, 191, 36],
        [74, 222, 128],
        [248, 113, 113],
        [125, 140, 158],
        [251, 146, 60]
    ];
    const [r, g, b] = palette[Math.abs(seed) % palette.length];
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default {
    name: "ThorondorDashboardView",

    components: {
        ThorondorLineChart,
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    computed: {
        dashboardSummaryCards() {
            const online = this.dashboardCards.filter((item) => item.status.color === "success").length;
            const warning = this.dashboardCards.filter((item) => item.status.color === "warning").length;
            const danger = this.dashboardCards.filter((item) => item.status.color === "danger").length;

            return [
                {
                    label: "Sistemas online",
                    value: String(online),
                    tone: "tone-success",
                    note: `${warning} con datos antiguos y ${danger} desconectados`
                },
                {
                    label: "Alertas activas",
                    value: String(this.activeAlerts.length),
                    tone: this.activeAlerts.length ? "tone-warning" : "tone-success",
                    note: "Disparadas por reglas del frontend"
                },
                {
                    label: "Eventos 24h",
                    value: String(this.eventsLast24h.length),
                    tone: "tone-blue",
                    note: "Actividad de seguridad reciente"
                },
                {
                    label: "Intentos fallidos",
                    value: String(this.failedOrigins.reduce((sum, item) => sum + item.count, 0)),
                    tone: "tone-danger",
                    note: "Agregados por IP de origen"
                }
            ];
        },

        dashboardChart() {
            const points = [];
            this.dashboardCards.forEach((agent) => {
                (this.thorondorSnapshots[agent.id] || []).forEach((snapshot) => {
                    const timestamp = new Date(snapshot.timestamp).getTime();
                    if (timestamp >= Date.now() - 7200000) {
                        points.push({
                            agentId: agent.id,
                            agentName: agent.displayName,
                            label: new Date(snapshot.timestamp).toLocaleTimeString(),
                            cpu: snapshot.cpuTotal,
                            ram: snapshot.memoryPercent
                        });
                    }
                });
            });

            const labels = Array.from(new Set(points.map((point) => point.label)));
            const datasets = [];

            this.dashboardCards.forEach((agent, index) => {
                const agentPoints = points.filter((point) => point.agentId === agent.id);
                if (!agentPoints.length) return;

                datasets.push({
                    label: `${agent.displayName} CPU`,
                    data: labels.map((label) => agentPoints.find((point) => point.label === label)?.cpu ?? null),
                    borderColor: colorFromSeed(index, 1),
                    backgroundColor: colorFromSeed(index, 0.18),
                    tension: 0.3,
                    spanGaps: true
                });

                datasets.push({
                    label: `${agent.displayName} RAM`,
                    data: labels.map((label) => agentPoints.find((point) => point.label === label)?.ram ?? null),
                    borderColor: colorFromSeed(index + 11, 1),
                    backgroundColor: colorFromSeed(index + 11, 0.18),
                    tension: 0.3,
                    borderDash: [6, 4],
                    spanGaps: true
                });
            });

            return { labels, datasets };
        }
    },

    methods: {
        openAgentDetail(agentId) {
            this.selectAgent(agentId);
            this.$router.push({
                name: "thorondor-host-detail",
                query: { agent: agentId }
            });
        }
    }
};
</script>

<style scoped>
.card-head-right {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
}

.os-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.18rem 0.55rem;
    border-radius: 5px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    white-space: nowrap;
}

.os-badge--linux {
    background: rgba(74, 222, 128, 0.12);
    border: 1px solid rgba(74, 222, 128, 0.3);
    color: #86efac;
}

.os-badge--win {
    background: rgba(148, 163, 184, 0.14);
    border: 1px solid rgba(169, 186, 203, 0.34);
    color: #dbe5ef;
}
</style>
