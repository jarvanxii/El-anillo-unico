<template>
    <SimpleLorePage
        page-class="gimli-page"
        :banner-src="bannerGimli"
        banner-alt="El hacha de Gimli"
        :logo-src="logoGimli"
        logo-alt="Sello de Gimli"
        kicker="Potencia y perseverancia"
        title="El Hacha de Gimli"
        description="Una portada mas consistente para esta seccion, con el mismo tono tecnico-editorial que ya tienen las vistas mas trabajadas del proyecto."
        emblem-title="6 bloques de enfoque"
        emblem-copy="La vista pasa a funcionar como una puerta de entrada clara: conceptos, practicas, herramientas y recorrido de lectura."
        module-kicker="Lectura guiada"
        module-title="Como moverse por esta vista"
        module-copy="La idea es entrar por contexto, identificar el bloque que necesitas desde la cabecera y bajar al detalle sin perder la orientacion general."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerGimli from "@/assets/banners/banner-gimli.png";
import logoGimli from "@/assets/logos/gimli.png";

export default {
    name: "GimliPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerGimli,
            logoGimli,
            guideCards: [
                { label: "Base", copy: "Conceptos nucleares ordenados para entrar rapido en materia y entender el alcance de la seccion." },
                { label: "Practica", copy: "Un enfoque pensado para enlazar teoria con herramientas, comandos y criterios de uso." },
                { label: "Navegacion", copy: "La cabecera secundaria sirve como indice persistente para no perderte al cambiar de tema." },
                { label: "Contexto", copy: "La portada resume de un vistazo que aporta esta rama frente al resto del proyecto." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Fundamentos", copy: "Empieza por los bloques base y usa el menu para saltar a terminos concretos." },
                { label: "Uso rapido", value: "Referencia", copy: "Funciona bien como pagina de contexto antes de profundizar en categorias internas." },
                { label: "Valor", value: "Consistencia", copy: "Ahora encaja visualmente con Feanor, Gollum y Thorondor sin perder su identidad propia." }
            ]
        };
    }
};
</script>
