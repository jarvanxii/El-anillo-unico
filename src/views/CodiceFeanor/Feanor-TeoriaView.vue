<template>
    <div class="feanor-page text-light">
        <main class="container py-5 theory-shell">
            <section class="section-box theory-hero">
                <div class="theory-heading">
                    <span class="section-kicker">Teoria de Feanor</span>
                    <h1 class="section-name">{{ topic.label }}</h1>
                    <p class="section-copy">{{ topic.summary }}</p>
                </div>

                <aside class="theory-side">
                    <span class="mini-badge">{{ topic.badge }}</span>
                    <strong>Herramientas cubiertas</strong>
                    <div class="covered-tools">
                        <router-link
                            v-for="tool in coveredTools"
                            :key="tool.routeName"
                            :to="{ name: tool.routeName }">
                            {{ tool.label }}
                        </router-link>
                    </div>
                </aside>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Mapa mental</span>
                    <h2 class="module-title">Ideas que debes dominar</h2>
                </div>

                <div class="pillar-grid">
                    <article v-for="pillar in topic.pillars" :key="pillar" class="pillar-card">
                        {{ pillar }}
                    </article>
                </div>
            </section>

            <section
                v-for="section in topic.sections"
                :key="section.title"
                class="section-box theory-section">
                <div class="module-header">
                    <span class="section-kicker">{{ topic.badge }}</span>
                    <h2 class="module-title">{{ section.title }}</h2>
                    <p class="module-copy">{{ section.body }}</p>
                </div>

                <div class="theory-content-grid">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Puntos clave</h5>
                            <span class="mini-badge">learn</span>
                        </div>
                        <ul class="theory-list">
                            <li v-for="item in section.bullets" :key="item">{{ item }}</li>
                        </ul>
                    </div>

                    <div class="tool-card">
                        <div class="card-head">
                            <h5>{{ section.exampleTitle }}</h5>
                            <span class="mini-badge">ejemplo</span>
                        </div>
                        <pre class="result-pre">{{ section.exampleLines.join("\n") }}</pre>
                    </div>
                </div>
            </section>

            <section v-if="topic.useCases && topic.useCases.length" class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Casos de uso</span>
                    <h2 class="module-title">Cuando aplicarlo y como practicarlo</h2>
                    <p class="module-copy">
                        Escenarios concretos para conectar la teoria con decisiones reales de laboratorio, depuracion o
                        arquitectura.
                    </p>
                </div>

                <div class="use-case-grid">
                    <article v-for="useCase in topic.useCases" :key="useCase.title" class="use-case-card">
                        <div class="card-head">
                            <h5>{{ useCase.title }}</h5>
                            <span class="mini-badge">{{ useCase.badge || "caso" }}</span>
                        </div>
                        <p>{{ useCase.body }}</p>
                        <ul v-if="useCase.steps && useCase.steps.length" class="theory-list">
                            <li v-for="step in useCase.steps" :key="step">{{ step }}</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Antes de usar la herramienta</span>
                    <h2 class="module-title">Checklist practica</h2>
                </div>

                <div class="check-grid">
                    <div v-for="item in topic.checklist" :key="item" class="check-card">
                        <span></span>
                        <p>{{ item }}</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { feanorTheoryTopics } from "@/features/codiceFeanor/data/feanorTheory";
import { feanorUtilities } from "@/features/codiceFeanor/data/feanorUtilities";

const props = defineProps({
    topicId: {
        type: String,
        required: true
    }
});

const topic = computed(() => feanorTheoryTopics.find(item => item.id === props.topicId) || feanorTheoryTopics[0]);
const coveredTools = computed(() => topic.value.toolRouteNames
    .map(routeName => feanorUtilities.find(utility => utility.routeName === routeName))
    .filter(Boolean));
</script>

<style scoped>
.feanor-page {
    min-height: 100vh;
    background: #0b0f17;
    font-family: "Inter", sans-serif;
}

.theory-shell {
    display: flex;
    flex-direction: column;
    padding-top: calc(var(--main-header-height) + var(--secondary-header-height) + 24px) !important;
}

.section-box {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
}

.theory-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(240px, 360px);
    gap: 22px;
    align-items: start;
}

.theory-heading,
.module-header {
    display: grid;
    gap: 8px;
}

.section-kicker {
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.section-name,
.module-title {
    margin: 0;
    color: #f8fafc;
    font-size: 2rem;
    font-weight: 700;
}

.section-copy,
.module-copy {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.7;
    max-width: 84ch;
}

.theory-side,
.tool-card,
.pillar-card,
.check-card,
.use-case-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 8px;
}

.theory-side {
    display: grid;
    gap: 12px;
    padding: 16px;
}

.theory-side strong {
    color: #f8fafc;
}

.covered-tools {
    display: grid;
    gap: 8px;
}

.covered-tools a {
    color: #d6a756;
    text-decoration: none;
    line-height: 1.35;
}

.covered-tools a:hover,
.covered-tools a:focus {
    color: #ffe2a3;
}

.pillar-grid,
.check-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}

.pillar-card {
    padding: 14px;
    color: #dbe7f3;
    line-height: 1.6;
}

.theory-content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;
}

.use-case-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
}

.use-case-card {
    display: grid;
    gap: 12px;
    align-content: start;
    padding: 16px;
}

.use-case-card p {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.6;
}

.tool-card {
    display: grid;
    gap: 12px;
    padding: 16px;
    min-width: 0;
}

.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.card-head h5 {
    margin: 0;
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 700;
}

.mini-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid #334155;
    background: rgba(15, 23, 42, 0.72);
    color: #cbd5e1;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
}

.theory-list {
    display: grid;
    gap: 9px;
    margin: 0;
    padding-left: 1.1rem;
    color: #cbd5e1;
    line-height: 1.6;
}

.theory-list li::marker {
    color: #d6a756;
}

.result-pre {
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: "Courier New", monospace;
    color: #cbd5e1;
    font-size: 0.86rem;
    line-height: 1.65;
}

.check-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    padding: 14px;
}

.check-card span {
    width: 10px;
    height: 10px;
    margin-top: 7px;
    border-radius: 999px;
    background: #d6a756;
    box-shadow: 0 0 12px rgba(214, 167, 86, 0.42);
}

.check-card p {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.6;
}

@media (max-width: 1199px) {
    .theory-hero,
    .theory-content-grid,
    .use-case-grid {
        grid-template-columns: 1fr;
    }

    .pillar-grid,
    .check-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767px) {
    .section-box {
        padding: 16px;
    }

    .section-name,
    .module-title {
        font-size: 1.55rem;
    }

    .card-head {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
