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
            showFallback: false
        };
    },

    mounted() {
        this.renderChart();
    },

    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    },

    watch: {
        labels: {
            deep: true,
            handler() {
                this.renderChart();
            }
        },
        datasets: {
            deep: true,
            handler() {
                this.renderChart();
            }
        }
    },

    methods: {
        renderChart() {
            const ChartLib = typeof window !== "undefined" ? window.Chart : null;
            if (!ChartLib || !this.$refs.canvas) {
                this.showFallback = true;
                return;
            }

            this.showFallback = false;

            if (this.chart) {
                this.chart.destroy();
                this.chart = null;
            }

            this.chart = new ChartLib(this.$refs.canvas, {
                type: "line",
                data: {
                    labels: this.labels,
                    datasets: this.datasets
                },
                options: {
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
