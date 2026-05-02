<template>
    <div class="bilbo-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-bilbo.webp" alt="El antiguo mapa de Bilbo" />
        </section>

        <div class="container bilbo-content">
            <section class="section-box intro-box">
                <div class="section-heading">
                    <span class="section-kicker">Ruta guiada de aprendizaje</span>
                    <h1 class="section-name">El Antiguo Mapa de Bilbo</h1>
                    <p class="section-copy">
                        Escoge una categoria y recorre 15 preguntas en orden creciente de dificultad. La experiencia
                        esta centrada en contestar, recibir feedback claro y avanzar con una sola pregunta cada vez.
                    </p>
                </div>

                <div class="guide-grid">
                    <div class="guide-card">
                        <label>1 categoria cada vez</label>
                        <span>Cada test agrupa 15 preguntas del mismo dominio, de nivel 1 a nivel 15.</span>
                    </div>
                    <div class="guide-card">
                        <label>Feedback inmediato</label>
                        <span>Tras cada respuesta ves el concepto clave, la explicacion y la opcion correcta.</span>
                    </div>
                    <div class="guide-card">
                        <label>Progreso persistente</label>
                        <span>Las respuestas quedan guardadas en Vuex y puedes reiniciar una categoria cuando quieras.</span>
                    </div>
                    <div class="guide-card">
                        <label>Lectura limpia</label>
                        <span>Menos ruido visual, mas foco en la pregunta activa y en aprender de verdad.</span>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Selector de test</span>
                    <h2 class="module-title">Categorias disponibles</h2>
                    <p class="module-copy">
                        Cambia de dominio cuando quieras. Cada categoria tiene su propio progreso, puntuacion y reset.
                    </p>
                </div>

                <div class="category-grid">
                    <button
                        v-for="theme in categorySummaries"
                        :key="theme.id"
                        type="button"
                        class="category-card"
                        :class="{ active: theme.id === activeCategoryId }"
                        @click="selectCategory(theme.id)"
                    >
                        <div class="category-card-head">
                            <div>
                                <label>{{ theme.label }}</label>
                                <strong>{{ theme.percent }}%</strong>
                            </div>
                            <span class="mini-badge">{{ theme.correct }}/{{ theme.total }}</span>
                        </div>
                        <p>{{ theme.description }}</p>
                        <div class="progress-rail compact-rail">
                            <div class="progress-fill" :class="theme.tone" :style="{ width: `${theme.percent}%` }"></div>
                        </div>
                        <small>{{ theme.answered }} respondidas - nivel actual {{ theme.currentLevel }}</small>
                    </button>
                </div>
            </section>

            <section class="section-box">
                <div class="test-layout">
                    <div class="test-main">
                        <div class="module-header">
                            <span class="section-kicker">Test activo</span>
                            <h2 class="module-title">{{ activeTheme.label }}</h2>
                            <p class="module-copy">{{ activeTheme.description }}</p>
                        </div>

                        <div class="row g-3 mb-4">
                            <div class="col-6 col-lg-3" v-for="item in activeCards" :key="item.label">
                                <div class="metric-card">
                                    <label>{{ item.label }}</label>
                                    <span :class="item.tone">{{ item.value }}</span>
                                    <small>{{ item.note }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="verdict-card compact" :class="activeVerdictTone">
                            <div class="verdict-icon">
                                <span>{{ activeTheme.shortLabel }}</span>
                            </div>
                            <div class="verdict-body">
                                <strong>{{ activeVerdictTitle }}</strong>
                                <p>{{ activeVerdictBody }}</p>
                            </div>
                        </div>

                        <div class="inline-actions test-actions">
                            <button class="btn btn-main" :disabled="!canGoNext" @click="goToNextQuestion">
                                {{ activeCategoryComplete ? "Revisar desde el principio" : "Siguiente pregunta" }}
                            </button>
                            <button class="btn btn-subtle" :disabled="activeSummary.answered === 0" @click="resetActiveCategory">
                                Reiniciar este test
                            </button>
                        </div>

                        <div class="question-stage">
                            <template v-if="activeQuestionEntry">
                                <div class="question-top">
                                    <div class="question-chip-row">
                                        <span class="mini-badge">Nivel {{ activeQuestionEntry.level }}</span>
                                        <span class="mini-badge subtle-badge">{{ activeQuestionEntry.difficulty }}</span>
                                        <span class="mini-badge subtle-badge">Pregunta {{ currentQuestionIndex + 1 }}/15</span>
                                    </div>
                                    <div class="progress-rail">
                                        <div class="progress-fill tone-blue" :style="{ width: `${activeSummary.completionPercent}%` }"></div>
                                    </div>
                                </div>

                                <article class="question-card focus-card">
                                    <div class="question-head">
                                        <div>
                                            <label class="question-label">Concepto a trabajar</label>
                                            <h3>{{ activeQuestionEntry.prompt }}</h3>
                                        </div>
                                        <span class="question-state" :class="questionStateTone(activeQuestionEntry)">
                                            {{ questionStateLabel(activeQuestionEntry) }}
                                        </span>
                                    </div>

                                    <div class="option-grid">
                                        <button
                                            v-for="(option, optionIndex) in activeQuestionEntry.options"
                                            :key="`${activeQuestionEntry.id}-${optionIndex}`"
                                            type="button"
                                            class="option-card"
                                            :class="optionClass(activeQuestionEntry, optionIndex)"
                                            :disabled="isAnswered(activeQuestionEntry)"
                                            @click="answerQuestion(activeQuestionEntry, optionIndex)"
                                        >
                                            <span class="option-index">{{ optionLetter(optionIndex) }}</span>
                                            <span class="option-copy">{{ option }}</span>
                                        </button>
                                    </div>

                                    <div v-if="isAnswered(activeQuestionEntry)" class="feedback-card" :class="activeAnswer.isCorrect ? 'feedback-success' : 'feedback-warning'">
                                        <div class="feedback-head">
                                            <strong>
                                                {{ activeAnswer.isCorrect ? "Respuesta correcta" : "Respuesta incorrecta" }}
                                            </strong>
                                            <span class="mini-badge">{{ activeQuestionEntry.concept }}</span>
                                        </div>
                                        <p>{{ activeQuestionEntry.explanation }}</p>
                                        <small>
                                            Respuesta valida: {{ optionLetter(activeQuestionEntry.correctIndex) }}.
                                            {{ activeQuestionEntry.options[activeQuestionEntry.correctIndex] }}
                                        </small>
                                    </div>
                                </article>
                            </template>
                        </div>
                    </div>

                    <aside class="test-sidebar">
                        <div class="side-card">
                            <label>Guia del usuario</label>
                            <strong>Como aprovechar mejor el test</strong>
                            <ul class="plain-list">
                                <li>Responde sin mirar la explicacion primero.</li>
                                <li>Si fallas, intenta verbalizar por que la correcta era mejor.</li>
                                <li>Reinicia la categoria cuando quieras consolidar memoria.</li>
                            </ul>
                        </div>

                        <div class="side-card">
                            <label>Mapa de niveles</label>
                            <strong>Tu avance en {{ activeTheme.label }}</strong>
                            <div class="level-track">
                                <button
                                    v-for="(entry, index) in activeCategoryEntries"
                                    :key="entry.id"
                                    type="button"
                                    class="level-node"
                                    :class="levelNodeClass(entry, index)"
                                    @click="jumpToQuestion(index)"
                                >
                                    <span>{{ entry.level }}</span>
                                </button>
                            </div>
                            <small>
                                Verde: correcta - Oro: respondida con fallo - Azul: actual - Gris: pendiente
                            </small>
                        </div>

                        <div class="side-card">
                            <label>Resumen rapido</label>
                            <strong>{{ activeSummary.correct }}/{{ activeSummary.total }} correctas</strong>
                            <ul class="plain-list compact-list">
                                <li>Acierto: {{ activeSummary.percent }}%</li>
                                <li>Respondidas: {{ activeSummary.answered }}/15</li>
                                <li>Pendientes: {{ activeSummary.total - activeSummary.answered }}</li>
                                <li>Siguiente nivel recomendado: {{ nextUnansweredLevel }}</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { bilboQuizLevels, bilboThemes } from "@/data/bilboQuiz";

export default {
    name: "MapaBilboView",

    data() {
        return {
            levels: bilboQuizLevels,
            themes: bilboThemes,
            activeCategoryId: bilboThemes[0]?.id || "",
            currentQuestionIndex: 0,
            reviewQuestionId: null
        };
    },

    computed: {
        academyLevelsState() {
            return this.$store.state.bilboAcademy?.levels || {};
        },

        categorySummaries() {
            return this.themes.map((theme) => {
                const entries = this.categoryEntries(theme.id);
                const answered = entries.filter((entry) => this.answerEntry(entry.levelId, entry.id)).length;
                const correct = entries.filter((entry) => this.answerEntry(entry.levelId, entry.id)?.isCorrect).length;
                const percent = answered ? Math.round((correct / answered) * 100) : 0;
                const nextPending = entries.find((entry) => !this.answerEntry(entry.levelId, entry.id));

                return {
                    ...theme,
                    entries,
                    answered,
                    correct,
                    total: entries.length,
                    percent,
                    tone: this.scoreTone(percent),
                    currentLevel: nextPending ? nextPending.level : 15
                };
            });
        },

        activeTheme() {
            return this.themes.find((theme) => theme.id === this.activeCategoryId) || this.themes[0];
        },

        activeCategoryEntries() {
            return this.categoryEntries(this.activeCategoryId);
        },

        activeSummary() {
            const summary = this.categorySummaries.find((item) => item.id === this.activeCategoryId);
            return summary || {
                answered: 0,
                correct: 0,
                total: 0,
                percent: 0,
                currentLevel: 1
            };
        },

        activeCategoryComplete() {
            return this.activeSummary.answered === this.activeSummary.total;
        },

        activeQuestionEntry() {
            if (!this.activeCategoryEntries.length) return null;
            return this.activeCategoryEntries[this.currentQuestionIndex] || this.activeCategoryEntries[0];
        },

        activeAnswer() {
            if (!this.activeQuestionEntry) return null;
            return this.answerEntry(this.activeQuestionEntry.levelId, this.activeQuestionEntry.id);
        },

        canGoNext() {
            if (!this.activeQuestionEntry) return false;
            if (!this.isAnswered(this.activeQuestionEntry)) return false;
            return true;
        },

        nextUnansweredLevel() {
            const pending = this.activeCategoryEntries.find((entry) => !this.answerEntry(entry.levelId, entry.id));
            return pending ? pending.level : 15;
        },

        activeCards() {
            return [
                {
                    label: "Progreso",
                    value: `${Math.round((this.activeSummary.answered / this.activeSummary.total) * 100) || 0}%`,
                    tone: "tone-blue",
                    note: `${this.activeSummary.answered}/${this.activeSummary.total} respondidas`
                },
                {
                    label: "Acierto",
                    value: `${this.activeSummary.percent}%`,
                    tone: this.scoreTone(this.activeSummary.percent),
                    note: `${this.activeSummary.correct} correctas acumuladas`
                },
                {
                    label: "Nivel activo",
                    value: this.activeQuestionEntry ? `Nivel ${this.activeQuestionEntry.level}` : "-",
                    tone: "tone-neutral",
                    note: this.activeQuestionEntry ? this.activeQuestionEntry.difficulty : "Sin datos"
                },
                {
                    label: "Siguiente hito",
                    value: this.activeCategoryComplete ? "Ruta cerrada" : `Nivel ${this.nextUnansweredLevel}`,
                    tone: this.activeCategoryComplete ? "tone-success" : "tone-warning",
                    note: this.activeCategoryComplete ? "Puedes reiniciar o repasar" : "Primer nivel pendiente"
                }
            ];
        },

        activeVerdictTone() {
            if (this.activeSummary.percent >= 80 && this.activeSummary.answered > 0) return "verdict-success";
            if (this.activeSummary.answered > 0) return "verdict-warning";
            return "verdict-neutral";
        },

        activeVerdictTitle() {
            if (!this.activeSummary.answered) return "Listo para empezar este test";
            if (this.activeCategoryComplete && this.activeSummary.percent >= 80) return "Categoria muy bien resuelta";
            if (this.activeCategoryComplete) return "Categoria completada con margen de mejora";
            return "Categoria en curso";
        },

        activeVerdictBody() {
            if (!this.activeSummary.answered) {
                return `Empiezas en ${this.activeTheme.label} con una progresion completa desde nivel 1 hasta nivel 15.`;
            }

            if (this.activeCategoryComplete) {
                return `Has terminado las 15 preguntas de ${this.activeTheme.label}. Reiniciar el test es buena idea para fijar conceptos donde todavia fallas.`;
            }

            return `Vas por ${this.activeSummary.answered} de 15 preguntas. La siguiente prioridad es consolidar el nivel ${this.nextUnansweredLevel}.`;
        }
    },

    mounted() {
        this.syncCursorWithCategory();
    },

    methods: {
        categoryEntries(categoryId) {
            return this.levels
                .map((level) => {
                    const question = level.questions.find((item) => item.category === categoryId);
                    return question
                        ? {
                            ...question,
                            level: level.level,
                            levelId: level.id,
                            difficulty: level.difficulty,
                            learningGoal: level.learningGoal
                        }
                        : null;
                })
                .filter(Boolean);
        },

        levelState(levelId) {
            return this.academyLevelsState[levelId] || { answers: {} };
        },

        answerEntry(levelId, questionId) {
            return this.levelState(levelId).answers?.[questionId] || null;
        },

        selectCategory(categoryId) {
            this.activeCategoryId = categoryId;
            this.reviewQuestionId = null;
            this.syncCursorWithCategory();
        },

        syncCursorWithCategory() {
            const entries = this.categoryEntries(this.activeCategoryId);
            const pendingIndex = entries.findIndex((entry) => !this.answerEntry(entry.levelId, entry.id));
            this.currentQuestionIndex = pendingIndex >= 0 ? pendingIndex : 0;
            this.reviewQuestionId = entries[this.currentQuestionIndex]?.id || null;
        },

        answerQuestion(question, optionIndex) {
            if (this.isAnswered(question)) return;

            this.$store.commit("submitBilboAnswer", {
                levelId: question.levelId,
                questionId: question.id,
                selectedIndex: optionIndex,
                isCorrect: optionIndex === question.correctIndex
            });

            this.reviewQuestionId = question.id;
        },

        isAnswered(question) {
            return Boolean(this.answerEntry(question.levelId, question.id));
        },

        goToNextQuestion() {
            if (this.activeCategoryComplete) {
                this.currentQuestionIndex = 0;
                this.reviewQuestionId = this.activeCategoryEntries[0]?.id || null;
                return;
            }

            const nextPendingIndex = this.activeCategoryEntries.findIndex(
                (entry, index) => index > this.currentQuestionIndex && !this.answerEntry(entry.levelId, entry.id)
            );

            if (nextPendingIndex >= 0) {
                this.currentQuestionIndex = nextPendingIndex;
                this.reviewQuestionId = this.activeCategoryEntries[nextPendingIndex].id;
                return;
            }

            this.syncCursorWithCategory();
        },

        jumpToQuestion(index) {
            this.currentQuestionIndex = index;
            this.reviewQuestionId = this.activeCategoryEntries[index]?.id || null;
        },

        resetActiveCategory() {
            const payload = {
                levels: this.activeCategoryEntries.map((entry) => entry.levelId),
                questionIds: this.activeCategoryEntries.map((entry) => entry.id)
            };

            this.$store.commit("resetBilboCategory", payload);
            this.currentQuestionIndex = 0;
            this.reviewQuestionId = this.activeCategoryEntries[0]?.id || null;
        },

        optionClass(question, optionIndex) {
            const record = this.answerEntry(question.levelId, question.id);
            if (!record) return "option-idle";
            if (optionIndex === question.correctIndex) return "option-correct";
            if (record.selectedIndex === optionIndex && !record.isCorrect) return "option-wrong";
            return "option-muted";
        },

        questionStateLabel(question) {
            const record = this.answerEntry(question.levelId, question.id);
            if (!record) return "Pendiente";
            return record.isCorrect ? "Correcta" : "Respondida";
        },

        questionStateTone(question) {
            const record = this.answerEntry(question.levelId, question.id);
            if (!record) return "tone-neutral";
            return record.isCorrect ? "tone-success" : "tone-warning";
        },

        levelNodeClass(entry, index) {
            const answer = this.answerEntry(entry.levelId, entry.id);
            if (index === this.currentQuestionIndex) return "node-current";
            if (answer?.isCorrect) return "node-success";
            if (answer) return "node-warning";
            return "node-pending";
        },

        optionLetter(index) {
            return ["A", "B", "C", "D"][index] || "?";
        },

        scoreTone(score) {
            if (score >= 80) return "tone-success";
            if (score >= 55) return "tone-warning";
            return "tone-blue";
        }
    }
};
</script>

<style scoped>
.bilbo-page {
    background: #0b0f17;
    color: #e6edf3;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
}

.hero-banner {
    margin-top: 53px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.bilbo-content {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.section-box {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 10px;
    padding: 24px;
    margin-bottom: 24px;
}

.intro-box,
.section-heading,
.module-header {
    display: grid;
    gap: 10px;
}

.section-kicker {
    color: #94a3b8;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.section-name,
.module-title {
    margin: 0;
    color: #f8fafc;
    font-size: clamp(1.45rem, 2.1vw, 2rem);
    font-weight: 700;
}

.section-copy,
.module-copy {
    margin: 0;
    color: #9ca3af;
    line-height: 1.7;
    max-width: 940px;
}

.guide-grid,
.category-grid {
    display: grid;
    gap: 16px;
    margin-top: 8px;
}

.guide-grid {
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

.category-grid {
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
}

.guide-card,
.category-card,
.metric-card,
.question-card,
.side-card,
.feedback-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
}

.guide-card,
.metric-card,
.side-card {
    padding: 16px;
}

.guide-card,
.metric-card,
.side-card,
.category-card {
    display: grid;
    gap: 6px;
}

.guide-card label,
.metric-card label,
.category-card label,
.question-label,
.side-card label {
    color: #9ca3af;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    display: block;
    margin-bottom: 6px;
}

.guide-card span,
.guide-card small,
.metric-card small,
.category-card small,
.side-card small {
    color: #94a3b8;
    line-height: 1.55;
}

.metric-card span,
.category-card strong,
.side-card strong {
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 600;
}

.category-card {
    padding: 16px;
    text-align: left;
    color: inherit;
    min-width: 0;
    transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
    touch-action: manipulation;
}

.category-card:hover,
.category-card.active {
    border-color: #475569;
    background: #0b1220;
    transform: translateY(-1px);
}

.category-card p,
.verdict-body p,
.feedback-card p {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.6;
    overflow-wrap: anywhere;
}

.category-card-head,
.question-head,
.feedback-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    min-width: 0;
}

.category-card-head strong {
    display: block;
    margin-top: 2px;
    word-break: break-word;
}

.progress-rail {
    width: 100%;
    height: 10px;
    border-radius: 999px;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid #1e293b;
}

.compact-rail {
    height: 8px;
}

.progress-fill {
    height: 100%;
    border-radius: inherit;
}

.tone-blue {
    color: #93c5fd !important;
    background: linear-gradient(90deg, #2563eb, #60a5fa);
}

.tone-success {
    color: #86efac !important;
    background: linear-gradient(90deg, #15803d, #22c55e);
}

.tone-warning {
    color: #fcd34d !important;
    background: linear-gradient(90deg, #b45309, #f59e0b);
}

.tone-neutral {
    color: #cbd5e1 !important;
}

.verdict-card {
    display: flex;
    gap: 14px;
    border-radius: 10px;
    padding: 16px 18px;
    border: 1px solid rgba(148, 163, 184, 0.22);
}

.verdict-card.compact {
    margin-bottom: 0;
}

.verdict-icon {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.8);
    color: #e2e8f0;
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.verdict-body strong {
    display: block;
    color: #f8fafc;
    margin-bottom: 4px;
}

.verdict-success {
    background: rgba(22, 101, 52, 0.14);
    border-color: rgba(34, 197, 94, 0.3);
}

.verdict-warning {
    background: rgba(146, 64, 14, 0.14);
    border-color: rgba(245, 158, 11, 0.3);
}

.verdict-neutral {
    background: rgba(30, 41, 59, 0.45);
    border-color: rgba(148, 163, 184, 0.24);
}

.test-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
    gap: 24px;
}

.test-main {
    display: grid;
    gap: 18px;
}

.test-sidebar {
    display: grid;
    gap: 16px;
    align-content: start;
}

.plain-list {
    margin: 0;
    padding-left: 18px;
    color: #cbd5e1;
    line-height: 1.65;
    overflow-wrap: anywhere;
}

.compact-list {
    margin-top: 2px;
}

.test-actions {
    margin-top: -2px;
}

.question-stage {
    display: grid;
    gap: 16px;
}

.question-top {
    display: grid;
    gap: 10px;
}

.question-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.focus-card {
    padding: 20px;
}

.question-card {
    display: grid;
    gap: 18px;
}

.question-head {
    align-items: flex-start;
}

.question-head h3 {
    margin: 0;
    color: #f8fafc;
    font-size: clamp(1.15rem, 1.8vw, 1.35rem);
    line-height: 1.55;
}

.question-state {
    white-space: nowrap;
    font-size: 0.85rem;
    font-weight: 600;
}

.option-grid {
    display: grid;
    gap: 10px;
}

.option-card {
    width: 100%;
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    text-align: left;
    background: #0f172a;
    border: 1px solid #1f2937;
    border-radius: 8px;
    padding: 14px;
    color: #e2e8f0;
    transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
    touch-action: manipulation;
}

.option-card:hover:enabled {
    border-color: #475569;
    background: #132033;
    transform: translateY(-1px);
}

.option-index {
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: 1px solid #334155;
    background: rgba(15, 23, 42, 0.8);
    font-size: 0.82rem;
    font-weight: 700;
    color: #cbd5e1;
}

.option-copy {
    line-height: 1.6;
    min-width: 0;
    overflow-wrap: anywhere;
}

.option-idle {
    background: #0f172a;
}

.option-correct {
    border-color: rgba(34, 197, 94, 0.4);
    background: rgba(21, 128, 61, 0.14);
}

.option-wrong {
    border-color: rgba(245, 158, 11, 0.45);
    background: rgba(180, 83, 9, 0.14);
}

.option-muted {
    opacity: 0.72;
}

.feedback-card {
    padding: 14px;
    display: grid;
    gap: 8px;
}

.feedback-success {
    border-color: rgba(34, 197, 94, 0.3);
    background: rgba(22, 101, 52, 0.14);
}

.feedback-warning {
    border-color: rgba(245, 158, 11, 0.3);
    background: rgba(146, 64, 14, 0.14);
}

.level-track {
    display: grid;
    grid-template-columns: repeat(5, minmax(42px, 1fr));
    gap: 10px;
    margin: 4px 0 2px;
}

.level-node {
    min-height: 42px;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    border: 1px solid #334155;
    background: #0f172a;
    color: #cbd5e1;
    font-weight: 700;
}

.level-node span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.node-current {
    border-color: #60a5fa;
    background: rgba(37, 99, 235, 0.18);
    color: #bfdbfe;
}

.node-success {
    border-color: rgba(34, 197, 94, 0.4);
    background: rgba(21, 128, 61, 0.14);
    color: #86efac;
}

.node-warning {
    border-color: rgba(245, 158, 11, 0.45);
    background: rgba(180, 83, 9, 0.14);
    color: #fcd34d;
}

.node-pending {
    color: #94a3b8;
}

.mini-badge {
    background: rgba(71, 85, 105, 0.35);
    border: 1px solid #334155;
    border-radius: 999px;
    color: #cbd5e1;
    font-size: 0.72rem;
    padding: 4px 10px;
    white-space: nowrap;
}

.subtle-badge {
    background: rgba(15, 23, 42, 0.72);
}

.inline-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.btn-main,
.btn-subtle {
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 600;
}

.btn-main {
    background: #334155;
    color: #f8fafc;
    border: 1px solid #475569;
}

.btn-main:hover,
.btn-main:focus {
    background: #475569;
    color: #f8fafc;
}

.btn-subtle {
    background: #0f172a;
    border: 1px solid #334155;
    color: #cbd5e1;
}

.btn-subtle:hover,
.btn-subtle:focus {
    background: #1e293b;
    color: #f8fafc;
}

.btn-main:disabled,
.btn-subtle:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

@media (max-width: 1399px) {
    .category-grid {
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    }
}

@media (max-width: 1199px) {
    .test-layout {
        grid-template-columns: 1fr;
    }

    .test-sidebar {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .bilbo-content {
        width: 100%;
        max-width: 100%;
        padding: 28px 14px 40px;
    }

    .section-box {
        padding: 16px;
        margin-bottom: 16px;
    }

    .guide-grid,
    .category-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .test-layout,
    .test-main,
    .test-sidebar,
    .question-card,
    .question-stage {
        gap: 14px;
    }

    .test-sidebar {
        grid-template-columns: 1fr;
    }

    .category-card-head,
    .question-head,
    .feedback-head {
        flex-direction: column;
        align-items: flex-start;
    }

    .inline-actions {
        flex-direction: column;
    }

    .inline-actions .btn {
        width: 100%;
    }

    .metric-card,
    .side-card,
    .guide-card,
    .category-card,
    .focus-card,
    .feedback-card {
        padding: 14px;
    }

    .option-card {
        grid-template-columns: 30px minmax(0, 1fr);
        gap: 10px;
        padding: 12px;
    }

    .option-index {
        width: 30px;
        height: 30px;
    }

    .level-track {
        grid-template-columns: repeat(5, minmax(42px, 1fr));
        gap: 8px;
    }

    .level-node {
        min-height: 40px;
        font-size: 0.86rem;
    }

    .mini-badge {
        white-space: normal;
        text-align: center;
    }

    .question-state {
        white-space: normal;
    }
}

@media (max-width: 420px) {
    .bilbo-content {
        padding-left: 10px;
        padding-right: 10px;
    }

    .section-box {
        padding: 14px;
        border-radius: 8px;
    }

    .level-track {
        grid-template-columns: repeat(3, minmax(44px, 1fr));
    }
}
</style>
