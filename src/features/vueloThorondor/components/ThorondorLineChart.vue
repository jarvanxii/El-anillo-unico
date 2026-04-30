<template>
    <div class="chart-shell">
        <canvas ref="canvas"></canvas>
        <div v-if="showFallback" class="chart-fallback">
            Chart.js no esta disponible en este navegador. La tabla de metricas sigue operativa.
        </div>
    </div>
</template>

<script>
export default {
    name: "ThorondorLineChart",

    props: {
        chartId: {
            type: String,
            required: true
        },
        labels: {
            type: Array,
            default: () => []
        },
        datasets: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ""
        }
    },

    data() {
        return {
            chart: null,
            showFallback: false,
            _destroyed: false
        };
    },

    computed: {
        chartData() {
            return { labels: this.labels, datasets: this.datasets };
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.renderChart();
        });
    },

    beforeUnmount() {
        this._destroyed = true;
        this.destroyChart();
    },

    watch: {
        chartData: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.renderChart();
                });
            }
        }
    },

    methods: {
        destroyChart() {
            if (this.chart) {
                try { this.chart.destroy(); } catch (_) {}
                this.chart = null;
            }
        },

        renderChart() {
            if (this._destroyed) return;

            const ChartLib = typeof window !== "undefined" ? window.Chart : null;
            if (!ChartLib || !this.$refs.canvas) {
                this.showFallback = true;
                return;
            }

            const canvas = this.$refs.canvas;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                this.showFallback = true;
                return;
            }

            this.destroyChart();

            if (typeof ChartLib.getChart === "function") {
                const orphaned = ChartLib.getChart(canvas);
                if (orphaned) {
                    try { orphaned.destroy(); } catch (_) {}
                }
            }

            if (this._destroyed) return;

            this.showFallback = false;

            try {
                this.chart = new ChartLib(canvas, {
                    type: "line",
                    data: {
                        labels: this.labels,
                        datasets: this.datasets
                    },
                    options: {
                        animation: false,
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: "index",
                            intersect: false
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: "#cbd5e1"
                                }
                            },
                            title: {
                                display: !!this.title,
                                text: this.title,
                                color: "#f8fafc"
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: "#94a3b8"
                                },
                                grid: {
                                    color: "rgba(51, 65, 85, 0.35)"
                                }
                            },
                            y: {
                                ticks: {
                                    color: "#94a3b8"
                                },
                                grid: {
                                    color: "rgba(51, 65, 85, 0.35)"
                                }
                            }
                        }
                    }
                });
            } catch (err) {
                console.error("[ThorondorLineChart] Error al inicializar Chart.js:", err);
                this.showFallback = true;
            }
        }
    }
};
</script>

<style scoped>
.chart-shell {
    position: relative;
    min-height: 320px;
}

.chart-shell canvas {
    width: 100% !important;
    height: 320px !important;
}

.chart-fallback {
    display: grid;
    place-items: center;
    min-height: 320px;
    color: #94a3b8;
    font-size: 0.95rem;
    text-align: center;
}
</style>
