<template>
    <div class="feanor-result">
        <div class="row g-3 mb-4">
            <div class="col-6 col-lg-3" v-for="item in result.summaryCards" :key="item.label">
                <div class="metric-card">
                    <label>{{ item.label }}</label>
                    <span :class="item.tone">{{ item.value }}</span>
                    <small v-if="item.note">{{ item.note }}</small>
                </div>
            </div>
        </div>

        <div class="verdict-card" :class="result.verdictTone">
            <div class="verdict-icon">
                <span>{{ icon }}</span>
            </div>
            <div class="verdict-body">
                <strong>{{ result.verdictTitle }}</strong>
                <p>{{ result.verdictBody }}</p>
            </div>
        </div>

        <div v-if="result.signalCards?.length" class="row g-3 mb-4">
            <div class="col-md-6 col-xl-3" v-for="item in result.signalCards" :key="item.label">
                <div class="signal-card">
                    <label>{{ item.label }}</label>
                    <span :class="item.tone">{{ item.value }}</span>
                    <small>{{ item.note }}</small>
                </div>
            </div>
        </div>

        <div v-if="result.panels?.length" class="row g-3">
            <div class="col-xl-6" v-for="panel in result.panels" :key="panel.title">
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
                    <div class="output-box">
                        <pre class="result-pre">{{ panel.content }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    result: {
        type: Object,
        required: true
    },
    icon: {
        type: String,
        default: "LAB"
    }
});

defineEmits(["copy"]);
</script>

<style scoped>
.metric-card,
.signal-card,
.tool-card {
    background: #111827;
    border: 1px solid #1f2937;
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
    color: #f8fafc;
    font-size: 0.83rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.metric-card span,
.signal-card span {
    color: #f8fafc;
    font-size: 1.05rem;
    font-weight: 700;
    word-break: break-word;
}

.metric-card small,
.signal-card small {
    color: #94a3b8;
    line-height: 1.55;
}

.verdict-card {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 16px;
    margin-bottom: 18px;
}

.verdict-icon {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(15, 23, 42, 0.9);
    color: #e2e8f0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.verdict-body strong {
    display: block;
    margin-bottom: 4px;
    color: #f8fafc;
}

.verdict-body p {
    margin: 0;
    color: #c9d4df;
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
    color: #f8fafc;
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
    border: 1px solid #334155;
    background: rgba(15, 23, 42, 0.72);
    color: #cbd5e1;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
}

.btn-quiet {
    padding: 5px 10px;
    background: transparent;
    border: 1px solid #334155;
    border-radius: 6px;
    color: #cbd5e1;
    font-size: 0.8rem;
    font-weight: 600;
}

.btn-quiet:hover,
.btn-quiet:focus {
    background: rgba(51, 65, 85, 0.4);
    color: #f8fafc;
}

.output-box {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 14px;
    max-height: 420px;
    overflow: auto;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
}

.result-pre {
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: "Courier New", monospace;
    color: #cbd5e1;
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
    color: #cbd5e1 !important;
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
