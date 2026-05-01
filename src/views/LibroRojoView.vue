<template>
    <SimpleLorePage
        page-class="libro-rojo-page"
        :banner-src="bannerLibroRojo"
        banner-alt="El libro rojo de la frontera del Oeste"
        :logo-src="logoLibroRojo"
        logo-alt="Sello del Libro Rojo"
        kicker="Memoria y referencia"
        title="El Libro Rojo"
        description="Esta portada se rehace con la misma base reutilizable del resto de vistas para dejar atras el estilo provisional y ganar una identidad mas pulida."
        emblem-title="6 notas de consulta"
        emblem-copy="El resultado es una pagina mas compacta, mejor jerarquizada y mucho mas consistente con el resto del proyecto."
        module-kicker="Enfoque"
        module-title="Que aporta esta revision"
        module-copy="Ordena la entrada a la seccion, refuerza la sensacion de archivo de referencia y evita repetir estructuras y estilos en cada vista."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerLibroRojo from "@/assets/banners/banner-libro.png";
import logoLibroRojo from "@/assets/logos/librorojo.png";

export default {
    name: "LibroRojoPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerLibroRojo,
            logoLibroRojo,
            guideCards: [
                { label: "Referencia", copy: "Presenta la seccion como un punto de consulta claro y reconocible." },
                { label: "Orden", copy: "Los bloques reparten mejor el contexto para no depender solo de un banner." },
                { label: "Coherencia", copy: "La portada sigue la misma plantilla editorial del resto de paginas interiores." },
                { label: "Reutilizacion", copy: "Menos CSS repetido y una base mas facil de evolucionar despues." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Contexto", copy: "Lee primero la portada y despues baja al contenido concreto que necesites." },
                { label: "Uso rapido", value: "Indice visual", copy: "Te permite recuperar de un vistazo la funcion de la seccion." },
                { label: "Valor", value: "Mantenimiento", copy: "Reduce mucho la duplicacion que habia en las vistas mas simples." }
            ]
        };
    }
};
</script>
