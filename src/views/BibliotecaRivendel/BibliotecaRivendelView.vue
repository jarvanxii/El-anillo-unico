<template>
    <SimpleLorePage
        page-class="biblioteca-page"
        :banner-src="bannerBiblioteca"
        banner-alt="La Biblioteca de Rivendel"
        :logo-src="logoBiblioteca"
        logo-alt="Sello de la Biblioteca"
        kicker="Consulta y archivo"
        title="La Biblioteca de Rivendel"
        description="La vista adopta una presentacion mas elegante y contenida para reflejar mejor la idea de biblioteca tecnica y repositorio de consulta."
        emblem-title="7 claves de lectura"
        emblem-copy="El tono verde-azulado oscuro se mantiene, pero ahora con una jerarquia mas limpia y componentes compartidos con el resto del proyecto."
        module-kicker="Panorama"
        module-title="Que cambia con esta base"
        module-copy="La portada deja de ser un contenedor vacio y pasa a ser una pieza de orientacion: explica, ordena y enlaza mejor con las categorias de la cabecera."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerBiblioteca from "@/assets/banners/banner-biblioteca.png";
import logoBiblioteca from "@/assets/logos/biblioteca.png";

export default {
    name: "BibliotecaRivendelPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerBiblioteca,
            logoBiblioteca,
            guideCards: [
                { label: "Archivo", copy: "Presenta la seccion como un espacio de consulta con identidad visual mas afinada." },
                { label: "Orientacion", copy: "Marca de entrada que vas a encontrar y por donde conviene empezar." },
                { label: "Cabecera", copy: "Encaja con el subheader responsive y con la nueva separacion de banner respecto a cabeceras." },
                { label: "Lectura", copy: "La maquetacion invita mas a escanear y menos a ver la pagina como un placeholder." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Indice", copy: "Usa la portada como indice de alto nivel antes de bajar a detalles." },
                { label: "Uso rapido", value: "Consulta", copy: "Buena para recordar el alcance general de la seccion de un vistazo." },
                { label: "Valor", value: "Elegancia", copy: "Refuerza la sensacion de biblioteca tecnica sobria y bien estructurada." }
            ]
        };
    }
};
</script>
