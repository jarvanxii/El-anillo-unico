<template>
    <SimpleLorePage
        page-class="boromir-page"
        :banner-src="bannerBoromir"
        banner-alt="El escudo de Boromir"
        :logo-src="logoBoromir"
        logo-alt="Sello de Boromir"
        kicker="Defensa y criterio"
        title="El Escudo de Boromir"
        description="Esta vista adopta el mismo sistema visual sobrio del resto de paginas maduras para presentar la seccion con mas jerarquia, respiracion y claridad."
        emblem-title="6 puntos de lectura"
        emblem-copy="La portada resume el tono de la seccion y deja la navegacion preparada para pasar de contexto a detalle con menos friccion."
        module-kicker="Recorrido"
        module-title="Que aporta esta portada"
        module-copy="Sirve como antesala ordenada: presenta la tematica, marca prioridades y deja cada categoria a una accion de distancia desde la cabecera."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerBoromir from "@/assets/banners/banner-boromir.webp";
import logoBoromir from "@/assets/logos/boromir.webp";

export default {
    name: "BoromirPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerBoromir,
            logoBoromir,
            guideCards: [
                { label: "Panorama", copy: "Introduce la seccion con una estructura legible y menos aspecto de plantilla vacia." },
                { label: "Jerarquia", copy: "Destaca mejor el mensaje principal, la identidad visual y las rutas de entrada." },
                { label: "Navegacion", copy: "Alinea la portada con la experiencia de cabeceras secundarias responsive que ya tenemos." },
                { label: "Lectura", copy: "Permite escanear rapido antes de sumergirse en subcategorias o recursos concretos." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Mapa general", copy: "Empieza por la portada y salta despues a las categorias que necesites consultar." },
                { label: "Uso rapido", value: "Contexto", copy: "Es util para situarte antes de entrar en una ficha o un bloque tematico concreto." },
                { label: "Valor", value: "Coherencia", copy: "La vista deja de ser una excepcion visual dentro del proyecto y gana presencia." }
            ]
        };
    }
};
</script>
