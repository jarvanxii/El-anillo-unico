<template>
    <ResponsiveSubheader :items="subItems" theme="feanor" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";
import { feanorHeaderItems } from "@/features/codiceFeanor/data/feanorHeaderItems";

export default {
    name: "HeaderFeanor",
    components: { ResponsiveSubheader },
    data() {
        return {
            subItems: feanorHeaderItems
        };
    }
};
</script>
