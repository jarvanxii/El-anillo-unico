<template>
    <SimpleLorePage
        page-class="pippin-page"
        :banner-src="bannerPippin"
        banner-alt="La jarra de Pippin"
        :logo-src="logoPippin"
        logo-alt="Sello de Pippin"
        kicker="Curiosidad y apoyo"
        title="La Jarra de Pippin"
        description="La portada gana el mismo pulso visual que las vistas mas ricas del proyecto para que incluso las secciones ligeras se sientan cuidadas y coherentes."
        emblem-title="5 claves de entrada"
        emblem-copy="Una base simple, reutilizable y mas limpia para sostener esta vista sin repetir CSS ni dejarla a medio hacer."
        module-kicker="Lectura"
        module-title="Para que sirve esta portada"
        module-copy="Te situa rapido, presenta el caracter de la seccion y evita que la experiencia cambie bruscamente frente al resto de vistas interiores."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerPippin from "@/assets/banners/banner-pippin.png";
import logoPippin from "@/assets/logos/pippin.png";

export default {
    name: "PippinPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerPippin,
            logoPippin,
            guideCards: [
                { label: "Ligereza", copy: "Mantiene una entrada sencilla sin caer en una pagina vacia o generica." },
                { label: "Coherencia", copy: "Usa el mismo sistema visual que el resto de vistas salvo la home." },
                { label: "Escaneo", copy: "Resume la seccion en bloques faciles de leer y con mejor ritmo." },
                { label: "Mantenimiento", copy: "Toda la base visual pasa a vivir en estilos y componentes compartidos." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Resumen", copy: "Empieza por la portada y decide desde ahi que categoria abrir." },
                { label: "Uso rapido", value: "Puerta de entrada", copy: "Ideal para igualar la experiencia de esta vista con el resto del sitio." },
                { label: "Valor", value: "Simplicidad", copy: "Consigue una vista mas profesional sin añadir complejidad innecesaria." }
            ]
        };
    }
};
</script>
