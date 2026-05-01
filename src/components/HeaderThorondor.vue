<template>
    <ResponsiveSubheader :items="subItems" theme="thorondor" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";
import { thorondorHeaderItems } from "@/features/vueloThorondor/data/thorondorHeaderItems";

export default {
    name: "HeaderThorondor",
    components: { ResponsiveSubheader },
    data() {
        return {
            subItems: thorondorHeaderItems
        };
    }
};
</script>
