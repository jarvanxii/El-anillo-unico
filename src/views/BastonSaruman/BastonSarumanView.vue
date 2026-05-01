<template>
    <SimpleLorePage
        page-class="saruman-page"
        :banner-src="bannerSaruman"
        banner-alt="El baston de Saruman"
        :logo-src="logoSaruman"
        logo-alt="Sello de Saruman"
        kicker="Fundamentos tecnicos"
        title="El Baston de Saruman"
        description="Una vista base para recorrer redes, protocolos y conceptos troncales de ciberseguridad con una lectura mas ordenada, editorial y util para estudiar sin ruido."
        emblem-title="8 dominios de estudio"
        emblem-copy="La cabecera agrupa capas de red, criptografia, identidad, cloud, monitorizacion y marcos de seguridad en una sola ruta formativa."
        module-kicker="Recorrido"
        module-title="Como aprovechar esta seccion"
        module-copy="La idea es usar esta vista como mapa de conceptos: entrar por bloques, bajar a terminos concretos desde la barra superior y volver a la portada con el contexto todavia fresco."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerSaruman from "@/assets/banners/banner-saruman.png";
import logoSaruman from "@/assets/logos/saruman.png";

export default {
    name: "SarumanPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerSaruman,
            logoSaruman,
            guideCards: [
                { label: "Redes", copy: "OSI, TCP/IP, direccionamiento, switching y routing como base de todo el resto." },
                { label: "Seguridad", copy: "CIA, hardening, controles, PKI y criptografia explicados con foco practico." },
                { label: "Identidad", copy: "IAM, MFA, SSO, OAuth, cookies, JWT y superficie de aplicacion." },
                { label: "Operacion", copy: "SIEM, detecciones, threat intel, cumplimiento y cloud con hilo conductor." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Modelo mental", copy: "Empieza por redes y fundamentos de seguridad antes de saltar a cloud o web." },
                { label: "Uso rapido", value: "Repaso", copy: "Sirve para refrescar conceptos antes de entrevistas, estudio o laboratorios." },
                { label: "Valor", value: "Contexto", copy: "La navegacion secundaria convierte la vista en un indice navegable en lugar de un bloque plano." }
            ]
        };
    }
};
</script>
