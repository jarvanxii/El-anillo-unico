<template>
    <div class="saruman-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-saruman.png" alt="El bastón de Saruman" />
        </section>
        <main class="content container">
            <section class="section-box">
                <h2>Loren Ipsum</h2>
                <p>
                    Loren ipsun dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "SarumanPage"
};
</script>

<style scoped>
.saruman-page {
    background: #0b0f17;
    color: #e6e0d4;
    min-height: 100vh;
    font-family: "EB Garamond", serif;
}

.hero-banner {
    margin-top: 131px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.content {
    padding-top: 45px;
    padding-bottom: 60px;
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .content {
        padding-top: 30px;
    }
}
</style>