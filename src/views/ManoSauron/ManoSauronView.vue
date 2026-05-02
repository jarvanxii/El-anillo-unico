<template>
    <SimpleLorePage
        page-class="sauron-page"
        :banner-src="bannerSauron"
        banner-alt="La mano de Sauron"
        :logo-src="logoSauron"
        logo-alt="Sello de Sauron"
        kicker="Darkweb y OPSEC"
        title="La Mano de Sauron"
        description="Una vista de contexto para separar mito y realidad sobre darkweb, acceso seguro, riesgos operativos, directorios utiles, estafas y limites legales."
        emblem-title="7 rutas de exploracion"
        emblem-copy="El objetivo es dar una lectura tecnica, contenida y sin sensacionalismo sobre acceso, amenazas y uso responsable."
        module-kicker="Panorama"
        module-title="Como esta organizada"
        module-copy="La cabecera secundaria reparte el contenido entre acceso seguro, directorios, privacidad, amenazas, OSINT y criterios legales para navegar con mas contexto."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerSauron from "@/assets/banners/banner-sauron.webp";
import logoSauron from "@/assets/logos/sauron.webp";

export default {
    name: "SauronPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerSauron,
            logoSauron,
            guideCards: [
                { label: "Acceso", copy: "Tor, Tails, separacion de identidades y errores de OPSEC que rompen el modelo." },
                { label: "Directorios", copy: "Busqueda, mirrors, enlaces falsos y senales para validar recursos." },
                { label: "Amenazas", copy: "Scams, phishing, malware y mercados falsos vistos desde la defensa." },
                { label: "Uso responsable", copy: "OSINT, legalidad, limites eticos y contexto periodistico o academico." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "OPSEC", copy: "Sin higiene operacional, ninguna otra herramienta compensa errores de base." },
                { label: "Uso rapido", value: "Contexto", copy: "Buena como vista de referencia para no mezclar curiosidad con exposicion innecesaria." },
                { label: "Valor", value: "Criterio", copy: "Ordena el tema alrededor de riesgo real, no de estetica ni folklore." }
            ]
        };
    }
};
</script>
