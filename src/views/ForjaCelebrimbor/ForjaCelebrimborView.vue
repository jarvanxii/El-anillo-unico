<template>
    <div class="celebrimbor-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-celebrimbor.png" alt="La forja de Celebrimbor" />
        </section>

        <div class="container py-5">
            <section class="section-box intro-box">
                <div class="section-heading">
                    <span class="section-kicker">Hub de herramientas</span>
                    <h1 class="section-name">La Forja de Celebrimbor</h1>
                    <p class="section-copy">
                        Un directorio principal con las categorias y herramientas que aparecen en
                        <code class="inline-code">HeaderCelebrimbor.vue</code>. Cada ficha resume para que sirve la
                        herramienta, como encaja en un flujo real y deja a mano los enlaces imprescindibles para
                        empezar: pagina oficial, documentacion y descarga o repositorio.
                    </p>
                </div>

                <div class="guide-grid">
                    <div class="guide-card">
                        <label>Categorias reales</label>
                        <span>La estructura replica exactamente el mapa de herramientas que vive en el header.</span>
                    </div>
                    <div class="guide-card">
                        <label>Lectura operativa</label>
                        <span>No es un catalogo plano: cada herramienta tiene contexto de uso y enlaces utiles.</span>
                    </div>
                    <div class="guide-card">
                        <label>Acceso rapido</label>
                        <span>Buscador, resumen por dominio y salto directo a cada categoria.</span>
                    </div>
                    <div class="guide-card">
                        <label>Uso responsable</label>
                        <span>Estas herramientas deben emplearse solo con autorizacion y alcance claramente definidos.</span>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Vista general</span>
                    <h2 class="module-title">Mapa de la forja</h2>
                    <p class="module-copy">
                        Desde aqui puedes ver cuantos dominios cubre la forja, cuantas herramientas contiene y donde
                        conviene empezar segun el tipo de trabajo.
                    </p>
                </div>

                <div class="row g-3 mb-4">
                    <div class="col-6 col-lg-3" v-for="item in summaryCards" :key="item.label">
                        <div class="metric-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>

                <div class="verdict-card compact verdict-neutral">
                    <div class="verdict-icon">
                        <span>Forge</span>
                    </div>
                    <div class="verdict-body">
                        <strong>Ruta recomendada</strong>
                        <p>
                            Si buscas descubrir activos, empieza por OSINT. Si quieres validar exposicion real, pasa a
                            Pentesting. Para monitorizar o investigar, la pareja natural es Blue Team y Forense.
                            DevSecOps y Privacidad cierran la cadena hacia build, cloud y proteccion del usuario.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Navegacion</span>
                    <h2 class="module-title">Encontrar herramientas</h2>
                    <p class="module-copy">
                        Filtra por nombre o descripcion y usa las categorias como puntos de salto rapido.
                    </p>
                </div>

                <div class="control-row">
                    <div class="control-field">
                        <label class="field-label" for="tool-search">Buscar herramienta</label>
                        <input
                            id="tool-search"
                            v-model.trim="searchTerm"
                            class="form-control input-dark"
                            placeholder="Ejemplo: Burp, YARA, Tor, Volatility..."
                        />
                    </div>
                </div>

                <div class="category-nav">
                    <a
                        v-for="category in filteredCategories"
                        :key="category.id"
                        class="category-pill"
                        :href="`#${category.id}`"
                    >
                        <span>{{ category.name }}</span>
                        <small>{{ category.filteredTools.length }}</small>
                    </a>
                </div>
            </section>

            <section
                v-for="category in filteredCategories"
                :key="category.id"
                :id="category.id"
                class="section-box"
            >
                <div class="category-header">
                    <div class="section-heading">
                        <span class="section-kicker">Categoria</span>
                        <h2 class="module-title">{{ category.name }}</h2>
                        <p class="module-copy">{{ category.summary }}</p>
                    </div>

                    <div class="category-emblem">
                        <span>{{ category.filteredTools.length }}</span>
                        <small>herramientas visibles</small>
                    </div>
                </div>

                <div class="row g-3 mb-4">
                    <div class="col-md-6 col-xl-4">
                        <div class="signal-card">
                            <label>Cuando usar esta categoria</label>
                            <span class="tone-neutral">{{ category.guidance }}</span>
                            <small>Consejo operativo para elegir bien la herramienta.</small>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-4">
                        <div class="signal-card">
                            <label>Herramientas</label>
                            <span class="tone-blue">{{ category.filteredTools.length }}</span>
                            <small>{{ category.name }} dentro del inventario actual.</small>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-4">
                        <div class="signal-card">
                            <label>Prioridad de lectura</label>
                            <span class="tone-success">{{ category.filteredTools[0]?.name || "Sin coincidencias" }}</span>
                            <small>Primera ficha visible segun el filtro aplicado.</small>
                        </div>
                    </div>
                </div>

                <div class="tool-grid">
                    <article v-for="tool in category.filteredTools" :key="tool.name" class="tool-card">
                        <div class="card-head">
                            <div class="tool-title-block">
                                <h5>{{ tool.name }}</h5>
                                <span class="mini-badge">{{ category.name }}</span>
                            </div>
                        </div>

                        <div class="tool-body">
                            <div class="tool-copy-block">
                                <label>Para que sirve</label>
                                <p>{{ tool.purpose }}</p>
                            </div>

                            <div class="tool-copy-block">
                                <label>Como empezar</label>
                                <p>{{ tool.usage }}</p>
                            </div>
                        </div>

                        <div class="tool-actions">
                            <a
                                v-for="action in tool.actions"
                                :key="`${tool.name}-${action.label}`"
                                class="btn btn-subtle action-link"
                                :href="action.url"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {{ action.label }}
                            </a>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { celebrimborToolCategories } from "@/data/celebrimborTools";

export default {
    name: "ForjaCelebrimborView",

    data() {
        return {
            searchTerm: "",
            categories: celebrimborToolCategories
        };
    },

    computed: {
        totalTools() {
            return this.categories.reduce((sum, category) => sum + category.tools.length, 0);
        },

        filteredCategories() {
            const query = this.searchTerm.toLowerCase();

            return this.categories
                .map((category) => {
                    const filteredTools = !query
                        ? category.tools
                        : category.tools.filter((tool) => {
                            const haystack = [
                                tool.name,
                                tool.purpose,
                                tool.usage,
                                category.name,
                                category.summary
                            ].join(" ").toLowerCase();

                            return haystack.includes(query);
                        });

                    return {
                        ...category,
                        filteredTools
                    };
                })
                .filter((category) => category.filteredTools.length > 0);
        },

        filteredToolCount() {
            return this.filteredCategories.reduce((sum, category) => sum + category.filteredTools.length, 0);
        },

        summaryCards() {
            return [
                {
                    label: "Categorias",
                    value: String(this.categories.length),
                    tone: "tone-blue",
                    note: "Dominios principales del header de Celebrimbor"
                },
                {
                    label: "Herramientas",
                    value: String(this.totalTools),
                    tone: "tone-success",
                    note: "Inventario total enlazado en esta pagina"
                },
                {
                    label: "Coincidencias",
                    value: String(this.filteredToolCount),
                    tone: "tone-warning",
                    note: this.searchTerm ? `Filtro activo: ${this.searchTerm}` : "Sin filtro aplicado"
                },
                {
                    label: "Primeros pasos",
                    value: "OSINT -> Pentest -> Defensa",
                    tone: "tone-neutral",
                    note: "Cadena recomendada para orientarte rapidamente"
                }
            ];
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.celebrimbor-page {
    background: #0b0f17;
    color: #e6edf3;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
}

.hero-banner {
    margin-top: 112px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
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
    max-width: 980px;
}

.guide-grid,
.tool-grid {
    display: grid;
    gap: 16px;
}

.guide-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 8px;
}

.tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.guide-card,
.metric-card,
.signal-card,
.tool-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
}

.guide-card,
.metric-card,
.signal-card {
    padding: 16px;
    display: grid;
    gap: 6px;
    height: 100%;
}

.guide-card label,
.metric-card label,
.signal-card label,
.field-label,
.tool-copy-block label {
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
.signal-card small,
.tool-copy-block p,
.module-copy,
.section-copy {
    line-height: 1.6;
}

.metric-card span,
.signal-card span {
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 600;
    word-break: break-word;
}

.metric-card small,
.signal-card small,
.guide-card span {
    color: #94a3b8;
}

.inline-code {
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid #334155;
    border-radius: 6px;
    color: #e2e8f0;
    padding: 2px 6px;
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

.verdict-neutral {
    background: rgba(30, 41, 59, 0.45);
    border-color: rgba(148, 163, 184, 0.24);
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

.verdict-body p {
    margin: 0;
    color: #c9d4df;
    line-height: 1.6;
}

.control-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    margin-top: 18px;
}

.input-dark {
    background: #020617;
    border: 1px solid #334155;
    color: #f8fafc !important;
    min-height: 46px;
    caret-color: #f8fafc;
}

.input-dark::placeholder {
    color: #64748b;
}

.input-dark:focus {
    background: #020617;
    border-color: #475569;
    box-shadow: 0 0 0 0.2rem rgba(71, 85, 105, 0.2);
}

.category-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
}

.category-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    border-radius: 999px;
    border: 1px solid #334155;
    background: #0f172a;
    color: #dbe4ee;
    text-decoration: none;
    font-weight: 600;
}

.category-pill:hover {
    background: #1e293b;
    color: #f8fafc;
}

.category-pill small {
    color: #94a3b8;
}

.category-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 180px;
    gap: 24px;
    align-items: center;
    margin-bottom: 18px;
}

.category-emblem {
    display: grid;
    justify-items: center;
    text-align: center;
    padding: 18px;
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.96));
    border: 1px solid rgba(71, 85, 105, 0.42);
}

.category-emblem span {
    color: #f8fafc;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
}

.category-emblem small {
    color: #94a3b8;
    margin-top: 8px;
}

.tool-card {
    padding: 16px;
    display: grid;
    gap: 14px;
    height: 100%;
}

.card-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
}

.tool-title-block {
    display: grid;
    gap: 8px;
}

.tool-title-block h5 {
    margin: 0;
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 600;
}

.mini-badge {
    background: rgba(71, 85, 105, 0.35);
    border: 1px solid #334155;
    border-radius: 999px;
    color: #cbd5e1;
    font-size: 0.72rem;
    padding: 4px 10px;
    white-space: nowrap;
    width: fit-content;
}

.tool-body {
    display: grid;
    gap: 12px;
}

.tool-copy-block p {
    margin: 0;
    color: #d6dde7;
    font-size: 0.92rem;
}

.tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;
}

.btn-subtle {
    background: #0f172a;
    border: 1px solid #334155;
    color: #cbd5e1;
    border-radius: 8px;
    padding: 9px 14px;
    font-weight: 600;
    text-decoration: none;
}

.btn-subtle:hover,
.btn-subtle:focus {
    background: #1e293b;
    color: #f8fafc;
}

.action-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.tone-success {
    color: #86efac !important;
}

.tone-warning {
    color: #fcd34d !important;
}

.tone-blue {
    color: #93c5fd !important;
}

.tone-neutral {
    color: #cbd5e1 !important;
}

@media (max-width: 1399px) {
    .tool-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 1199px) {
    .guide-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .category-header {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .section-box {
        padding: 18px;
    }

    .guide-grid,
    .tool-grid {
        grid-template-columns: 1fr;
    }

    .tool-actions {
        flex-direction: column;
    }

    .tool-actions .btn-subtle {
        width: 100%;
    }
}
</style>
