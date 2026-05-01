<template>
    <div class="thorondor-page text-light">
        <section v-if="showBanner" class="hero-banner">
            <img src="@/assets/banners/banner-thorondor.png" alt="El vuelo de Thorondor" />
        </section>

        <div class="container thorondor-content" :class="{ 'with-banner': showBanner }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "ThorondorPageShell",

    props: {
        showBanner: {
            type: Boolean,
            default: false
        }
    }
};
</script>
