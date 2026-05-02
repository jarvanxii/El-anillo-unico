<template>
    <div class="celebrimbor-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-celebrimbor.webp" alt="La forja de Celebrimbor" />
        </section>

        <main class="container py-5">
            <section class="section-box page-intro">
                <span class="section-kicker">Herramientas externas</span>
                <h1 class="section-name">La Forja de Celebrimbor</h1>
                <p class="section-copy">
                    Directorio de herramientas de ciberseguridad organizadas por dominio. Cada entrada muestra para qué
                    sirve y deja sus enlaces principales a mano.
                </p>
            </section>

            <nav class="section-box category-nav" aria-label="Tipos de herramienta">
                <button
                    v-for="category in categories"
                    :key="category.id"
                    type="button"
                    class="category-link"
                    @click="scrollToCategory(category.id)"
                >
                    <span>{{ category.name }}</span>
                    <small>{{ category.tools.length }}</small>
                </button>
            </nav>

            <section
                v-for="category in categories"
                :key="category.id"
                :id="category.id"
                class="section-box category-section"
            >
                <header class="category-header">
                    <div>
                        <span class="section-kicker">{{ category.tools.length }} herramientas</span>
                        <h2 class="module-title">{{ category.name }}</h2>
                        <p class="module-copy">{{ category.summary }}</p>
                    </div>
                </header>

                <div class="tool-list">
                    <article v-for="tool in category.tools" :key="tool.name" class="tool-card">
                        <div class="tool-main">
                            <h3>{{ tool.name }}</h3>
                            <p>{{ tool.purpose }}</p>
                        </div>

                        <div class="tool-actions" aria-label="Enlaces externos">
                            <a
                                v-for="action in tool.actions"
                                :key="`${tool.name}-${action.label}`"
                                class="tool-link"
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
        </main>
    </div>
</template>

<script>
import { celebrimborToolCategories } from "@/data/celebrimborTools";

export default {
    name: "ForjaCelebrimborView",

    data() {
        return {
            categories: celebrimborToolCategories
        };
    },

    methods: {
        scrollToCategory(categoryId) {
            const target = document.getElementById(categoryId);

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }
};
</script>

<style scoped>
.celebrimbor-page {
    --forge-amber: #d8a75c;
    --forge-amber-soft: rgba(216, 167, 92, 0.16);
    --forge-green-hover: #1d4a3d;
    --forge-border: #2d453e;

    min-height: 100vh;
    background: #0b0f17;
    color: #e6edf3;
    font-family: "Inter", sans-serif;
}

.hero-banner {
    margin-top: 112px;
}

.hero-banner img {
    display: block;
    width: 100%;
    object-fit: cover;
}

.section-box {
    margin-bottom: 22px;
    padding: 22px;
    border: 1px solid #1f2937;
    border-radius: 8px;
    background: #111827;
}

.category-section {
    scroll-margin-top: calc(var(--main-header-height) + 16px);
}

.page-intro,
.category-header {
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
    font-weight: 700;
}

.section-name {
    font-size: clamp(1.55rem, 2.3vw, 2.2rem);
}

.module-title {
    font-size: clamp(1.25rem, 1.8vw, 1.65rem);
}

.section-copy,
.module-copy {
    max-width: 920px;
    margin: 0;
    color: #a7b2c1;
    line-height: 1.65;
}

.category-nav {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
}

.category-link {
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    min-height: 48px;
    padding: 11px 13px;
    border: 1px solid var(--forge-border);
    border-radius: 8px;
    background:
        linear-gradient(180deg, rgba(22, 56, 47, 0.92), rgba(8, 19, 17, 0.96)),
        #020617;
    color: #ecfdf5;
    font: inherit;
    line-height: 1.2;
    text-decoration: none;
    text-align: left;
    margin: 0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
    cursor: pointer;
    transition:
        transform 0.18s ease,
        border-color 0.18s ease,
        background 0.18s ease,
        box-shadow 0.18s ease,
        color 0.18s ease;
}

.category-link:hover {
    transform: translateY(-1px);
    border-color: var(--forge-amber);
    background:
        linear-gradient(180deg, rgba(29, 74, 61, 0.96), rgba(10, 24, 20, 0.98)),
        #0f172a;
    color: #f8fafc;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--forge-amber-soft);
}

.category-link:focus-visible {
    border-color: var(--forge-amber);
    outline: 2px solid rgba(216, 167, 92, 0.42);
    outline-offset: 2px;
}

.category-link:active {
    transform: translateY(0);
}

.category-link span {
    min-width: 0;
    overflow: hidden;
    font-size: 0.92rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.category-link small {
    flex: 0 0 auto;
    min-width: 28px;
    padding: 3px 8px;
    border: 1px solid rgba(216, 167, 92, 0.28);
    border-radius: 999px;
    background: rgba(216, 167, 92, 0.1);
    color: #f1d29c;
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
}

.tool-list {
    display: grid;
    gap: 10px;
    margin-top: 18px;
}

.tool-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
    width: 100%;
    padding: 16px;
    border: 1px solid #1e293b;
    border-radius: 8px;
    background: #020617;
}

.tool-main {
    min-width: 0;
}

.tool-main h3 {
    margin: 0 0 6px;
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 700;
}

.tool-main p {
    margin: 0;
    color: #c9d4df;
    font-size: 0.94rem;
    line-height: 1.55;
}

.tool-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
}

.tool-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    padding: 8px 12px;
    border: 1px solid var(--forge-border);
    border-radius: 8px;
    background: rgba(22, 56, 47, 0.58);
    color: #e9f3ee;
    font-size: 0.86rem;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    transition:
        border-color 0.18s ease,
        background 0.18s ease,
        box-shadow 0.18s ease,
        color 0.18s ease;
}

.tool-link:hover {
    border-color: var(--forge-amber);
    background: var(--forge-green-hover);
    color: #f8fafc;
    box-shadow: 0 0 0 1px var(--forge-amber-soft);
}

.tool-link:focus-visible {
    border-color: var(--forge-amber);
    outline: 2px solid rgba(216, 167, 92, 0.42);
    outline-offset: 2px;
}

.tool-link:active {
    background: #173a30;
}

@media (max-width: 991px) {
    .category-nav {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .tool-card {
        grid-template-columns: minmax(0, 1fr);
        align-items: stretch;
    }

    .tool-actions {
        justify-content: flex-start;
    }
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .section-box {
        padding: 18px;
    }

    .category-nav {
        grid-template-columns: minmax(0, 1fr);
    }

    .tool-actions {
        flex-direction: column;
    }

    .tool-link {
        width: 100%;
    }
}
</style>
