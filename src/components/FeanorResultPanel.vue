<template>
    <div class="feanor-result">
        <div v-if="resultPanels.length" class="row g-3 result-panels">
            <div class="col-xl-6" v-for="panel in resultPanels" :key="panel.title">
                <div class="tool-card">
                    <div class="card-head">
                        <h5>{{ panel.title }}</h5>
                        <div class="card-actions">
                            <span class="mini-badge">{{ panel.badge }}</span>
                            <button
                                v-if="panel.copyValue"
                                class="btn btn-quiet"
                                @click="$emit('copy', panel.copyValue)"
                            >
                                Copiar
                            </button>
                        </div>
                    </div>
                    <div class="output-box" :class="outputToneClass">
                        <pre class="result-pre">{{ panel.content }}</pre>
                    </div>
                </div>
            </div>
        </div>

        <div class="analysis-block">
            <div class="verdict-card" :class="result.verdictTone">
                <div class="verdict-icon">
                    <span>{{ icon }}</span>
                </div>
                <div class="verdict-body">
                    <strong>{{ result.verdictTitle }}</strong>
                    <p>{{ result.verdictBody }}</p>
                </div>
            </div>

            <div v-if="analysisCards.length" class="row g-3">
                <div class="col-md-6 col-xl-3" v-for="item in analysisCards" :key="item.label">
                    <div class="metric-card">
                        <label>{{ item.label }}</label>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small v-if="item.note">{{ item.note }}</small>
                    </div>
                </div>
            </div>

            <details v-if="detailPanels.length" class="detail-panels">
                <summary>Detalles tecnicos</summary>
                <div class="row g-3">
                    <div class="col-xl-6" v-for="panel in detailPanels" :key="`detail-${panel.title}`">
                        <div class="tool-card detail-card">
                            <div class="card-head">
                                <h5>{{ panel.title }}</h5>
                                <div class="card-actions">
                                    <span class="mini-badge">{{ panel.badge }}</span>
                                    <button
                                        v-if="panel.copyValue"
                                        class="btn btn-quiet"
                                        @click="$emit('copy', panel.copyValue)"
                                    >
                                        Copiar
                                    </button>
                                </div>
                            </div>
                            <div class="output-box" :class="outputToneClass">
                                <pre class="result-pre">{{ panel.content }}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    result: {
        type: Object,
        required: true
    },
    icon: {
        type: String,
        default: "LAB"
    }
});

const DETAIL_PANEL_TITLES = [
    "lectura",
    "metadatos",
    "tabla de sustitucion",
    "representaciones",
    "linea temporal",
    "relacion de cadena",
    "detalles",
    "analisis zxcvbn",
    "lectura de caracteres",
    "pseudocodigo",
    "parametros"
];

const allPanels = computed(() => props.result.panels || []);

function normalizeTitle(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function isDetailPanel(panel) {
    const title = normalizeTitle(panel?.title);
    return DETAIL_PANEL_TITLES.some(item => title.includes(item));
}

const resultPanels = computed(() => {
    const primaryPanels = allPanels.value.filter(panel => !isDetailPanel(panel));
    return primaryPanels.length || !allPanels.value.length ? primaryPanels : [allPanels.value[0]];
});

const detailPanels = computed(() => {
    const primaryPanelSet = new Set(resultPanels.value);
    return allPanels.value.filter(panel => !primaryPanelSet.has(panel));
});

const outputToneClass = computed(() => {
    const tone = String(props.result.verdictTone || "");
    if (tone.includes("danger")) return "output-box-danger";
    if (tone.includes("warning")) return "output-box-warning";
    if (tone.includes("success")) return "output-box-success";
    return "output-box-neutral";
});

const analysisCards = computed(() => [
    ...(props.result.summaryCards || []).slice(0, 2),
    ...(props.result.signalCards || []).slice(0, 2)
]);

defineEmits(["copy"]);
</script>

<style scoped>
.metric-card,
.signal-card,
.tool-card {
    background: #181510;
    border: 1px solid #2b2418;
    border-radius: 8px;
}

.metric-card,
.signal-card {
    display: grid;
    gap: 6px;
    padding: 14px;
    height: 100%;
}

.metric-card label,
.signal-card label {
    color: #f7f1e4;
    font-size: 0.83rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.metric-card span,
.signal-card span {
    color: #f7f1e4;
    font-size: 1.05rem;
    font-weight: 700;
    word-break: break-word;
}

.metric-card small,
.signal-card small {
    color: #a79c88;
    line-height: 1.55;
}

.result-panels {
    margin-bottom: 18px;
}

.analysis-block {
    display: grid;
    gap: 14px;
}

.detail-panels {
    border: 1px solid #2b2418;
    border-radius: 8px;
    background: rgba(24, 21, 16, 0.72);
    padding: 12px;
}

.detail-panels summary {
    cursor: pointer;
    color: #f7f1e4;
    font-size: 0.88rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.detail-panels[open] summary {
    margin-bottom: 12px;
}

.detail-card {
    background: #100d09;
}

.verdict-card {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 16px;
    margin-bottom: 0;
}

.verdict-icon {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(16, 13, 9, 0.9);
    color: #e7dcc8;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.verdict-body strong {
    display: block;
    margin-bottom: 4px;
    color: #f7f1e4;
}

.verdict-body p {
    margin: 0;
    color: #d8cfbf;
    line-height: 1.65;
}

.verdict-success {
    background: rgba(22, 101, 52, 0.14);
    border-color: rgba(34, 197, 94, 0.3);
}

.verdict-warning {
    background: rgba(146, 64, 14, 0.14);
    border-color: rgba(245, 158, 11, 0.3);
}

.verdict-danger {
    background: rgba(127, 29, 29, 0.14);
    border-color: rgba(248, 113, 113, 0.3);
}

.tool-card {
    display: grid;
    gap: 12px;
    padding: 16px;
    height: 100%;
}

.card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.card-head h5 {
    margin: 0;
    color: #f7f1e4;
    font-size: 1rem;
    font-weight: 600;
}

.card-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.mini-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid #5b4a2e;
    background: rgba(16, 13, 9, 0.78);
    color: #d8cfbf;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
}

.btn-quiet {
    padding: 5px 10px;
    background: transparent;
    border: 1px solid #5b4a2e;
    border-radius: 6px;
    color: #d8cfbf;
    font-size: 0.8rem;
    font-weight: 600;
}

.btn-quiet:hover,
.btn-quiet:focus {
    background: rgba(91, 74, 46, 0.4);
    color: #f7f1e4;
}

.output-box {
    position: relative;
    background: #080705;
    border: 1px solid #302817;
    border-left-width: 4px;
    border-radius: 8px;
    padding: 14px;
    max-height: 420px;
    overflow: auto;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
    transition: border-color 0.18s ease, background 0.18s ease;
}

.output-box-success {
    background: #07120b;
    border-color: rgba(34, 197, 94, 0.74);
}

.output-box-warning {
    background: #120d04;
    border-color: rgba(245, 158, 11, 0.72);
}

.output-box-danger {
    background: #140707;
    border-color: rgba(248, 113, 113, 0.78);
}

.result-pre {
    position: relative;
    z-index: 1;
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: "Courier New", monospace;
    color: #d8cfbf;
    font-size: 0.84rem;
    line-height: 1.65;
}

.tone-success {
    color: #86efac !important;
}

.tone-warning {
    color: #fcd34d !important;
}

.tone-danger {
    color: #fca5a5 !important;
}

.tone-neutral {
    color: #d8cfbf !important;
}

@media (max-width: 767px) {
    .verdict-card {
        flex-direction: column;
        align-items: flex-start;
    }

    .card-head {
        flex-direction: column;
        align-items: flex-start;
    }

    .card-actions {
        justify-content: flex-start;
        width: 100%;
    }

    .card-actions .btn,
    .btn-quiet {
        width: 100%;
    }

    .result-pre {
        font-size: 0.78rem;
    }
}
</style>
