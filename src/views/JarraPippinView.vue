<template>
    <div class="pippin-page humor-page app-view text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-pippin.webp" alt="La jarra de Pippin" />
        </section>

        <main class="container app-view-content">
            <section class="section-box humor-head">
                <div class="module-header">
                    <span class="section-kicker">Humor tecnico</span>
                    <h1 class="module-title">La Jarra de Pippin</h1>
                    <p class="module-copy">
                        Humor de programacion, ciberseguridad e informatica.
                    </p>
                </div>
            </section>

            <section class="section-box humor-controls">
                <div v-if="categories.length" class="tag-row" aria-label="Filtros por categoria">
                    <button
                        type="button"
                        class="tag-chip"
                        :class="{ active: activeCategory === '' }"
                        @click="activeCategory = ''"
                    >
                        Todo
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category"
                        type="button"
                        class="tag-chip"
                        :class="{ active: activeCategory === category }"
                        @click="activeCategory = activeCategory === category ? '' : category"
                    >
                        {{ category }}
                    </button>
                </div>
            </section>

            <section v-if="visibleMemes.length" class="humor-grid" aria-label="Galeria de humor">
                <article v-for="meme in visibleMemes" :key="meme.path" class="meme-card">
                    <button type="button" class="meme-button" @click="openMeme(meme)">
                        <img :src="meme.src" :alt="meme.title" loading="lazy" decoding="async" />
                    </button>
                </article>
            </section>

            <section v-else class="section-box empty-state">
                <h2>Sin imagenes</h2>
                <p>Cuando dejes imagenes en <span class="inline-code">src/assets/humor</span>, apareceran aqui ordenadas por creacion.</p>
            </section>

            <div v-if="canLoadMore" class="load-more-row">
                <button type="button" class="btn btn-main" @click="visibleLimit += batchSize">
                    Cargar mas
                </button>
            </div>
        </main>

        <div v-if="selectedMeme" class="lightbox" role="dialog" aria-modal="true" @click.self="closeLightbox">
            <button type="button" class="lightbox-close" aria-label="Cerrar imagen" @click.stop="closeLightbox">&times;</button>
            <button
                v-if="filteredMemes.length > 1"
                type="button"
                class="lightbox-nav lightbox-nav-prev"
                aria-label="Imagen anterior"
                @click.stop="showPreviousMeme"
            >
                &#8249;
            </button>
            <figure class="lightbox-frame">
                <img :src="selectedMeme.src" :alt="selectedMeme.title" />
            </figure>
            <button
                v-if="filteredMemes.length > 1"
                type="button"
                class="lightbox-nav lightbox-nav-next"
                aria-label="Imagen siguiente"
                @click.stop="showNextMeme"
            >
                &#8250;
            </button>
        </div>
    </div>
</template>

<script>
import humorManifest from "@/assets/humor/humor-manifest";

const humorImages = require.context("@/assets/humor", true, /\.(avif|gif|jpe?g|png|svg|webp)$/i);

function loadImage(path) {
    try {
        return humorImages(`./${path}`);
    } catch (error) {
        return "";
    }
}

export default {
    name: "PippinPage",
    data() {
        return {
            activeCategory: "",
            visibleLimit: 60,
            batchSize: 60,
            selectedMeme: null,
            memes: humorManifest
                .map(item => ({
                    ...item,
                    src: loadImage(item.path)
                }))
                .filter(item => item.src)
        };
    },
    computed: {
        filteredMemes() {
            return this.memes.filter(meme => {
                const matchesCategory = !this.activeCategory || meme.category === this.activeCategory;
                return matchesCategory;
            });
        },
        visibleMemes() {
            return this.filteredMemes.slice(0, this.visibleLimit);
        },
        canLoadMore() {
            return this.visibleLimit < this.filteredMemes.length;
        },
        categories() {
            const counts = new Map();
            this.memes.forEach(meme => {
                if (meme.category) {
                    counts.set(meme.category, (counts.get(meme.category) || 0) + 1);
                }
            });

            return [...counts.entries()]
                .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
                .slice(0, 12)
                .map(([category]) => category);
        },
        selectedMemeIndex() {
            if (!this.selectedMeme) return -1;
            return this.filteredMemes.findIndex(meme => meme.path === this.selectedMeme.path);
        }
    },
    watch: {
        activeCategory() {
            this.visibleLimit = this.batchSize;
            this.selectedMeme = null;
        }
    },
    mounted() {
        window.addEventListener("keydown", this.handleLightboxKeys);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleLightboxKeys);
    },
    methods: {
        openMeme(meme) {
            this.selectedMeme = meme;
        },
        closeLightbox() {
            this.selectedMeme = null;
        },
        showPreviousMeme() {
            this.moveLightbox(-1);
        },
        showNextMeme() {
            this.moveLightbox(1);
        },
        moveLightbox(direction) {
            if (!this.selectedMeme || this.filteredMemes.length < 2) return;
            const fallbackIndex = direction > 0 ? -1 : 0;
            const currentIndex = this.selectedMemeIndex >= 0 ? this.selectedMemeIndex : fallbackIndex;
            const nextIndex = (currentIndex + direction + this.filteredMemes.length) % this.filteredMemes.length;
            this.selectedMeme = this.filteredMemes[nextIndex];
        },
        handleLightboxKeys(event) {
            if (!this.selectedMeme) return;
            if (event.key === "Escape") {
                this.closeLightbox();
            } else if (event.key === "ArrowLeft") {
                this.showPreviousMeme();
            } else if (event.key === "ArrowRight") {
                this.showNextMeme();
            }
        }
    }
};
</script>

<style scoped>
.humor-page {
    min-height: 100vh;
}

.hero-banner {
    margin-top: 53px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.humor-head {
    position: relative;
    overflow: hidden;
    display: block;
    padding-top: 34px;
    padding-bottom: 34px;
    text-align: center;
}

.humor-head::before,
.humor-head::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 210px;
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--view-accent) 56%, #f4d89a), transparent);
    opacity: 0.72;
}

.humor-head::before {
    top: 18px;
}

.humor-head::after {
    bottom: 18px;
}

.humor-head .module-header {
    align-items: center;
    max-width: 760px;
    margin: 0 auto;
}

.humor-head .section-kicker {
    color: color-mix(in srgb, var(--view-accent) 72%, #f5dfad);
    font-size: 0.78rem;
    font-weight: 800;
}

.humor-head .module-title {
    margin: 0;
    color: var(--view-text-strong);
    font-size: 2.35rem;
    font-weight: 900;
    letter-spacing: 0;
    text-shadow: 0 14px 32px rgba(0, 0, 0, 0.34);
}

.humor-head .module-title::after {
    content: "";
    display: block;
    width: 76px;
    height: 2px;
    margin: 12px auto 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--view-accent) 68%, #f0c36a);
    box-shadow: 0 0 22px color-mix(in srgb, var(--view-accent) 40%, transparent);
}

.humor-head .module-copy {
    max-width: 520px;
    margin: 0 auto;
    color: color-mix(in srgb, var(--view-text) 82%, #f2d8aa);
    font-size: 0.98rem;
    line-height: 1.65;
}

.humor-controls {
    display: grid;
    gap: 16px;
}

.tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag-chip {
    border: 1px solid color-mix(in srgb, var(--view-accent) 22%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--view-surface-strong) 88%, black 12%);
    color: var(--view-text);
    padding: 7px 12px;
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: capitalize;
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}

.tag-chip:hover,
.tag-chip.active {
    background: color-mix(in srgb, var(--view-accent) 18%, var(--view-surface));
    border-color: color-mix(in srgb, var(--view-accent) 52%, transparent);
    color: var(--view-accent-strong);
}

.humor-grid {
    columns: 4 240px;
    column-gap: 18px;
}

.meme-card {
    display: inline-block;
    width: 100%;
    margin: 0 0 18px;
    overflow: hidden;
    break-inside: avoid;
    background: var(--view-surface-strong);
    border: 1px solid var(--view-border);
    border-radius: 8px;
    box-shadow: 0 16px 32px var(--view-shadow);
}

.meme-button {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: color-mix(in srgb, var(--view-surface-soft) 88%, black 12%);
    cursor: zoom-in;
}

.meme-button img {
    display: block;
    width: 100%;
    height: auto;
}

.empty-state {
    text-align: center;
}

.empty-state h2 {
    color: var(--view-text-strong);
    font-size: 1.25rem;
}

.empty-state p {
    margin: 0;
    color: var(--view-text-soft);
}

.load-more-row {
    display: flex;
    justify-content: center;
    margin-top: 26px;
}

.lightbox {
    position: fixed;
    inset: 0;
    z-index: 200000;
    display: grid;
    place-items: center;
    padding: 72px 96px 44px;
    background: rgba(6, 4, 3, 0.86);
    backdrop-filter: blur(7px);
}

.lightbox-frame {
    max-width: min(1120px, 96vw);
    max-height: 88vh;
    margin: 0;
    display: block;
    line-height: 0;
}

.lightbox-frame img {
    max-width: 100%;
    max-height: 84vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow:
        0 30px 70px rgba(0, 0, 0, 0.64),
        0 0 0 1px rgba(255, 255, 255, 0.1);
}

.lightbox-close {
    position: fixed;
    top: 22px;
    right: 26px;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border: 1px solid color-mix(in srgb, var(--view-accent) 32%, rgba(255, 255, 255, 0.24));
    border-radius: 999px;
    background: linear-gradient(145deg, rgba(42, 28, 16, 0.82), rgba(10, 7, 5, 0.72));
    color: color-mix(in srgb, var(--view-text-strong) 88%, #f2c778);
    font-size: 1.7rem;
    line-height: 1;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.38);
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.lightbox-nav {
    position: fixed;
    top: 50%;
    display: grid;
    place-items: center;
    width: 58px;
    height: 86px;
    transform: translateY(-50%);
    border: 1px solid color-mix(in srgb, var(--view-accent) 30%, rgba(255, 255, 255, 0.2));
    border-radius: 999px;
    background: linear-gradient(145deg, rgba(48, 30, 17, 0.82), rgba(9, 7, 5, 0.68));
    color: color-mix(in srgb, var(--view-text-strong) 86%, #f0c36a);
    font-size: 3.2rem;
    line-height: 1;
    box-shadow: 0 22px 46px rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(10px);
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.lightbox-close:hover,
.lightbox-nav:hover {
    border-color: color-mix(in srgb, var(--view-accent) 68%, rgba(255, 255, 255, 0.24));
    background: linear-gradient(145deg, color-mix(in srgb, var(--view-accent) 24%, rgba(52, 32, 16, 0.88)), rgba(14, 9, 5, 0.78));
    color: #fff8df;
}

.lightbox-close:hover {
    transform: scale(1.06);
}

.lightbox-nav:hover {
    transform: translateY(-50%) scale(1.05);
}

.lightbox-close:focus-visible,
.lightbox-nav:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--view-accent) 70%, white);
    outline-offset: 4px;
}

.lightbox-nav-prev {
    left: clamp(12px, 4vw, 44px);
}

.lightbox-nav-next {
    right: clamp(12px, 4vw, 44px);
}

@media (max-width: 991px) {
    .humor-head {
        padding-top: 30px;
        padding-bottom: 30px;
    }
}

@media (max-width: 767px) {
    .humor-head .module-title {
        font-size: 1.9rem;
    }

    .lightbox {
        padding: 72px 14px 28px;
    }

    .lightbox-nav {
        width: 44px;
        height: 60px;
        font-size: 2.5rem;
    }

    .lightbox-close {
        top: 16px;
        right: 16px;
        width: 42px;
        height: 42px;
        font-size: 1.45rem;
    }
}
</style>
