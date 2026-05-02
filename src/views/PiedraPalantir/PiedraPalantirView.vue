<template>
    <SimpleLorePage
        page-class="palantir-page"
        :banner-src="bannerPalantir"
        banner-alt="La Piedra Palantir"
        :logo-src="logoPalantir"
        logo-alt="Sello de Palantir"
        kicker="IA aplicada"
        title="La Piedra Palantir"
        description="Una entrada limpia para recorrer fundamentos de inteligencia artificial, herramientas generativas, productividad, conceptos tecnicos y cruces con ciberseguridad."
        emblem-title="6 bloques de IA"
        emblem-copy="La vista queda alineada con el resto del proyecto: tono tecnico, jerarquia clara y una base visual compartida con las paginas mas maduras."
        module-kicker="Recorrido"
        module-title="Que conviene mirar primero"
        module-copy="La cabecera secundaria deja pasar de fundamentos a casos de uso, conceptos tecnicos y riesgos. Esta portada funciona como marco para entrar con contexto."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerPalantir from "@/assets/banners/banner-palantir.webp";
import logoPalantir from "@/assets/logos/palantir.webp";

export default {
    name: "PalantirPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerPalantir,
            logoPalantir,
            guideCards: [
                { label: "Fundamentos", copy: "Tipos de IA, machine learning, deep learning y modelos generativos." },
                { label: "Herramientas", copy: "Chatbots, imagen, voz, video y automatizacion con foco practico." },
                { label: "Trabajo", copy: "Como aterrizar IA en estudio, desarrollo, empresa y flujos de contenido." },
                { label: "Riesgos", copy: "Privacidad, regulacion, sesgos y uso ofensivo o defensivo en seguridad." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Uso real", copy: "Pasa de teoria a productividad y luego vuelve a conceptos tecnicos con mas criterio." },
                { label: "Uso rapido", value: "Mapa", copy: "Sirve como indice para entender en que parte del stack encaja cada tema." },
                { label: "Valor", value: "Contexto", copy: "La vista deja de ser solo un banner y gana estructura de biblioteca tecnica." }
            ]
        };
    }
};
</script>
