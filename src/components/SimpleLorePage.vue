<template>
    <div :class="[pageClass, 'app-view', 'text-light']">
        <section class="hero-banner">
            <img :src="bannerSrc" :alt="bannerAlt" />
        </section>

        <main class="container app-view-content">
            <section class="section-box intro-box">
                <div class="intro-layout">
                    <div class="section-heading">
                        <span class="section-kicker">{{ kicker }}</span>
                        <h1 class="section-name">{{ title }}</h1>
                        <p class="section-copy">{{ description }}</p>
                    </div>

                    <div class="intro-emblem">
                        <img :src="logoSrc" :alt="logoAlt" />
                        <span>{{ emblemTitle }}</span>
                        <small>{{ emblemCopy }}</small>
                    </div>
                </div>

                <div class="guide-grid">
                    <div v-for="card in guideCards" :key="card.label" class="guide-card">
                        <label>{{ card.label }}</label>
                        <span>{{ card.copy }}</span>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">{{ moduleKicker }}</span>
                    <h2 class="module-title">{{ moduleTitle }}</h2>
                    <p class="module-copy">{{ moduleCopy }}</p>
                </div>

                <div class="card-grid">
                    <article v-for="card in focusCards" :key="card.label" class="signal-card">
                        <label>{{ card.label }}</label>
                        <span class="tone-info">{{ card.value }}</span>
                        <small>{{ card.copy }}</small>
                    </article>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "SimpleLorePage",
    props: {
        pageClass: { type: String, required: true },
        bannerSrc: { type: String, required: true },
        bannerAlt: { type: String, required: true },
        logoSrc: { type: String, required: true },
        logoAlt: { type: String, required: true },
        kicker: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        emblemTitle: { type: String, required: true },
        emblemCopy: { type: String, required: true },
        moduleKicker: { type: String, required: true },
        moduleTitle: { type: String, required: true },
        moduleCopy: { type: String, required: true },
        guideCards: { type: Array, required: true },
        focusCards: { type: Array, required: true }
    }
};
</script>
