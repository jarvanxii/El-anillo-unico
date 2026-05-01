<template>
    <SimpleLorePage
        page-class="nazgul-page"
        :banner-src="bannerNazgul"
        banner-alt="La capa de los Nazgul"
        :logo-src="logoNazgul"
        logo-alt="Sello de los Nazgul"
        kicker="Privacidad y anonimato"
        title="La Capa de los Nazgul"
        description="Una ruta de privacidad personal para entender huella digital, telemetria, navegacion privada, sistemas orientados al anonimato y practicas de compartmentalizacion."
        emblem-title="7 bloques de privacidad"
        emblem-copy="La seccion esta pensada como guia de lectura sobria: menos impacto visual gratuito y mas claridad al recorrer conceptos delicados."
        module-kicker="Lectura guiada"
        module-title="Que vas a encontrar aqui"
        module-copy="Desde modelos de amenaza hasta comunicaciones cifradas, la vista funciona mejor como biblioteca de contexto rapido y como recordatorio de practicas concretas."
        :guide-cards="guideCards"
        :focus-cards="focusCards"
    />
</template>

<script>
import SimpleLorePage from "@/components/SimpleLorePage.vue";
import bannerNazgul from "@/assets/banners/banner-nazgul.png";
import logoNazgul from "@/assets/logos/nazgul.png";

export default {
    name: "NazgulPage",
    components: { SimpleLorePage },
    data() {
        return {
            bannerNazgul,
            logoNazgul,
            guideCards: [
                { label: "Modelo de amenaza", copy: "Aclara que proteges, frente a quien y con que coste operativo." },
                { label: "Navegacion", copy: "Tor, VPN, DNS privado, anti-fingerprinting y limites reales del anonimato." },
                { label: "Comunicacion", copy: "Signal, correo cifrado, alias y canales seguros segun el contexto." },
                { label: "Dispositivos", copy: "OS privados, permisos, telemetria, cifrado local y compartimentacion." }
            ],
            focusCards: [
                { label: "Entrada recomendada", value: "Huella", copy: "Empieza por metadatos, rastreo y superficie observable antes de cambiar herramientas." },
                { label: "Uso rapido", value: "Checklist", copy: "La navegacion secundaria sirve como lista de control para revisar riesgos comunes." },
                { label: "Valor", value: "Criterio", copy: "No solo lista herramientas: organiza cuando conviene cada una y que no resuelve." }
            ]
        };
    }
};
</script>
