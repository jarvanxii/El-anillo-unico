<template>
    <div class="sauron-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-sauron.png" alt="La mano de Sauron" />
        </section>
        <main class="content container">
            <section class="section-box">
                <h2>Loren Ipsum1121</h2>
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
    name: "SauronPage"
};
</script>

<style scoped>
.sauron-page {
    background: #0f1419;
    color: #e8f4fd;
    min-height: 100vh;
    font-family: "EB Garamond", serif;
}

.hero-banner {
    margin-top: 54px; /* 52px header + 2px gap */
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
        margin-top: 54px; /* 52px header + 2px gap */
    }

    .content {
        padding-top: 30px;
    }
}
</style>