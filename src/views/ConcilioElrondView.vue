<template>
    <SimpleLorePage
        page-class="elrond-page"
        :banner-src="bannerElrond"
        banner-alt="El concilio de Elrond"
        :logo-src="logoElrond"
        logo-alt="Sello de Elrond"
        kicker="Analisis y perspectiva"
        title="El Concilio de Elrond"
        description="Una portada mas solida y serena para esta seccion, alineada con el lenguaje visual que ya funciona en Feanor, Gollum y Thorondor."
        emblem-title="6 lineas de lectura"
        emblem-copy="La composicion combina contexto rapido, identidad visual y bloques de apoyo sin volver la pagina pesada."
        module-kicker="Recorrido"
        module-title="Como leer esta seccion"
        module-copy="Primero situate con la portada, luego usa la cabecera superior para entrar en el area que te interesa con una nocion mas clara del conjunto."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerElrond from "@/assets/banners/banner-elrond.webp";
import logoElrond from "@/assets/logos/elrond.webp";

export default {
    name: "ElrondPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerElrond,
            logoElrond,
            guideCards: [
                { label: "Sintesis", copy: "Introduce el area con una presentacion sobria y sin ruido visual." },
                { label: "Jerarquia", copy: "Ordena mejor titulo, contexto, emblema y llamadas de lectura." },
                { label: "Continuidad", copy: "Mantiene la experiencia visual entre vistas informativas y vistas mas interactivas." },
                { label: "Sistema", copy: "Aprovecha el mismo componente base para reducir mantenimiento y divergencias." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Mapa", copy: "Usa esta vista como panorama general antes de navegar por apartados." },
                { label: "Uso rapido", value: "Contexto", copy: "Ayuda a recuperar la idea general de la seccion en una lectura breve." },
                { label: "Valor", value: "Unidad", copy: "Hace que la vista encaje de verdad dentro del ecosistema del proyecto." }
            ]
        };
    }
};
</script>
