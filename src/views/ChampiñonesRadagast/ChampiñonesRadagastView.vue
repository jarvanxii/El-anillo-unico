<template>
    <SimpleLorePage
        page-class="radagast-page"
        :banner-src="bannerRadagast"
        banner-alt="Los champinones de Radagast"
        :logo-src="logoRadagast"
        logo-alt="Sello de Radagast"
        kicker="Exploracion organica"
        title="Los Champinones de Radagast"
        description="Una portada con mas cuerpo para una seccion que ahora respira mejor, mantiene el tono de bosque oscuro del header y se integra con el sistema visual comun."
        emblem-title="6 senderos de entrada"
        emblem-copy="La seccion gana una identidad mas refinada sin perder su caracter: fondo profundo, acento verde y bloques faciles de escanear."
        module-kicker="Uso recomendado"
        module-title="Como aprovechar la portada"
        module-copy="Piensala como un indice editorial: entra por el resumen, localiza la categoria que te interesa en la cabecera y profundiza desde ahi."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerRadagast from "@/assets/banners/banner-radagast.png";
import logoRadagast from "@/assets/logos/radagast.png";

export default {
    name: "RadagastPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerRadagast,
            logoRadagast,
            guideCards: [
                { label: "Ambiente", copy: "Conserva la identidad verde y terrosa, pero con una composicion mucho mas solida." },
                { label: "Resumen", copy: "Ofrece una introduccion breve que ayuda a entender para que sirve esta rama." },
                { label: "Ruta", copy: "Deja claras las entradas posibles antes de bajar a categorias y subcategorias." },
                { label: "Escaneo", copy: "Las tarjetas sintetizan el valor de la seccion en segundos, sin parrafos de relleno." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Vista general", copy: "Empieza por el resumen y usa el menu para ir directo a cada tema." },
                { label: "Uso rapido", value: "Portada", copy: "Ideal para ubicarte antes de navegar por las categorias secundarias." },
                { label: "Valor", value: "Presencia", copy: "La pagina deja de parecer provisional y pasa a sentirse parte del sistema comun." }
            ]
        };
    }
};
</script>
