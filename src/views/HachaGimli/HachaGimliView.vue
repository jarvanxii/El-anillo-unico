<template>
    <div class="gimli-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-gimli.png" alt="El hacha de Gimli" />
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
    name: "GimliPage"
};
</script>

<style scoped>
.gimli-page {
    background: #1a0c0c;
    color: #f0e8d8;
    min-height: 100vh;
    font-family: "EB Garamond", serif;
}

.hero-banner {
    margin-top: 113px;
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