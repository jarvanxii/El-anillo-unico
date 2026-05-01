<template>
    <ResponsiveSubheader :items="subItems" theme="radagast" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: "HeaderRadagast",
    components: { ResponsiveSubheader },
    data() {
        return {
            subItems: [
                {
                    id: "compuestos_legales",
                    name: "Compuestos Legales",
                    subs: [
                        "Nootropicos",
                        "Cafeina",
                        "L-teanina",
                        "Creatina",
                        "Modafinilo con receta"
                    ]
                },
                {
                    id: "compuestos_ilegales",
                    name: "Compuestos Ilegales",
                    subs: [
                        "Anfetaminas",
                        "Speed",
                        "Cocaina",
                        "LSD",
                        "Psilocibina",
                        "Ketamina",
                        "MDMA",
                        "Mescalina"
                    ]
                },
                {
                    id: "cuestiones_practicas",
                    name: "Cuestiones Practicas",
                    subs: [
                        "Tolerancia y dependencia",
                        "Microdosis",
                        "Interacciones peligrosas",
                        "Efecto rebote y senales de alarma"
                    ]
                }
            ]
        };
    }
};
</script>
