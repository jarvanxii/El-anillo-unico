<template>
    <div class="radagast-page radagast-index-page app-view text-light">
        <section class="hero-banner">
            <img :src="bannerRadagast" alt="Los champinones de Radagast" />
        </section>

        <main class="container app-view-content radagast-index-content">
            <section class="section-box radagast-index-hero">
                <span class="section-kicker">Rendimiento cognitivo</span>
                <h1 class="section-name">Los Champinones de Radagast</h1>
                <p class="section-copy">
                    Indice tecnico sobre sustancias y practicas asociadas al foco, la vigilia, la fatiga mental y la
                    percepcion de rendimiento. No es un manual de consumo: ordena compuestos legales, compuestos
                    ilegales o controlados y riesgos practicos.
                </p>
                <p class="section-copy">
                    La seccion no incluye dosis, mezclas, proveedores ni pautas de administracion. Cada entrada debe
                    servir para entender que es el compuesto, que efecto se busca, que riesgos concentra y que limites
                    legales o medicos tiene.
                </p>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Definicion</span>
                    <h2 class="module-title">Que cubre esta seccion</h2>
                </div>

                <div class="reading-prose">
                    <p v-for="paragraph in definition" :key="paragraph">{{ paragraph }}</p>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Glosario</span>
                    <h2 class="module-title">Terminos base</h2>
                </div>

                <div class="technical-glossary">
                    <div class="technical-row technical-head">
                        <span>Termino</span>
                        <span>Definicion</span>
                    </div>
                    <div v-for="term in coreTerms" :key="term.term" class="technical-row">
                        <strong>{{ term.term }}</strong>
                        <p>{{ term.definition }}</p>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Diccionario</span>
                    <h2 class="module-title">Bloques de la cabecera</h2>
                </div>

                <div class="topic-detail-list">
                    <article v-for="block in topicBlocks" :key="block.id" class="topic-detail">
                        <header>
                            <span>{{ block.index }}</span>
                            <h3>{{ block.name }}</h3>
                            <small>{{ block.short }}</small>
                        </header>
                        <p>{{ block.definition }}</p>
                        <dl>
                            <div>
                                <dt>Incluye</dt>
                                <dd>{{ block.includes }}</dd>
                            </div>
                            <div>
                                <dt>Uso real</dt>
                                <dd>{{ block.use }}</dd>
                            </div>
                            <div>
                                <dt>Riesgo principal</dt>
                                <dd>{{ block.risk }}</dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import bannerRadagast from "@/assets/banners/banner-radagast.png";

export default {
    name: "RadagastPage",
    data() {
        return {
            bannerRadagast,
            definition: [
                "Rendimiento cognitivo significa capacidad funcional de atencion, vigilia, memoria de trabajo, control impulsivo, velocidad de procesamiento y resistencia a la fatiga. No equivale a inteligencia ni a aprendizaje profundo.",
                "Las sustancias que se asocian a rendimiento cognitivo suelen actuar sobre vigilia, dopamina, noradrenalina, acetilcolina, glutamato, serotonina, sueno o percepcion subjetiva de energia. El efecto util puede depender del contexto: privacion de sueno, deficit previo, tolerancia, ansiedad, dosis, interacciones y estado basal.",
                "Esta seccion separa tres cosas: compuestos legales, compuestos ilegales o controlados y cuestiones practicas. La frontera importante no es si algo suena potente, sino si tiene evidencia razonable, margen de seguridad, control sanitario, legalidad y bajo riesgo de dependencia."
            ],
            coreTerms: [
                {
                    term: "Nootropico",
                    definition: "Sustancia usada con la intencion de mejorar memoria, foco, vigilia o claridad mental. El termino es amplio: puede incluir compuestos con evidencia limitada, suplementos, farmacos y estimulantes."
                },
                {
                    term: "Estimulante",
                    definition: "Compuesto que aumenta activacion del sistema nervioso central. Puede elevar alerta, energia y motivacion, pero tambien ansiedad, presion arterial, insomnio, impulsividad y riesgo de abuso."
                },
                {
                    term: "Tolerancia",
                    definition: "Reduccion del efecto tras uso repetido. El usuario necesita mas exposicion para sentir lo mismo o conserva menos beneficio con el mismo patron."
                },
                {
                    term: "Dependencia",
                    definition: "Adaptacion fisica o psicologica que genera necesidad de uso, malestar al retirar, perdida de control o consumo pese a consecuencias negativas."
                },
                {
                    term: "Microdosis",
                    definition: "Uso de cantidades subperceptuales o apenas perceptibles de una sustancia. En conversaciones de IT suele asociarse a psicodelicos o disociativos, pero la evidencia, legalidad y seguridad varian mucho."
                },
                {
                    term: "Interaccion",
                    definition: "Cambio de efecto o toxicidad cuando se combinan sustancias, farmacos, alcohol, falta de sueno, cafeina u otros estimulantes."
                },
                {
                    term: "Efecto rebote",
                    definition: "Empeoramiento posterior al efecto buscado: fatiga, bajon animico, irritabilidad, ansiedad, insomnio o perdida de rendimiento."
                }
            ],
            topicBlocks: [
                {
                    id: "compuestos_legales",
                    index: "01",
                    name: "Compuestos Legales",
                    short: "Sustancias legales o disponibles bajo control sanitario que suelen vincularse a foco, vigilia o energia mental.",
                    definition: "Bloque para compuestos con acceso legal, suplemento comercial o prescripcion medica segun pais. Legal no significa seguro: el interes tecnico esta en separar efecto esperado, evidencia, contraindicaciones y margen de riesgo.",
                    includes: "Nootropicos, cafeina, L-teanina, creatina y modafinilo con receta.",
                    use: "Consulta rapida para distinguir estimulantes suaves, suplementos con uso extendido y farmacos que requieren diagnostico, receta y supervision.",
                    risk: "Falsa sensacion de inocuidad, uso cronico sin criterio, insomnio, ansiedad, interacciones y sustitucion de sueno o descanso por estimulacion."
                },
                {
                    id: "compuestos_ilegales",
                    index: "02",
                    name: "Compuestos Ilegales",
                    short: "Sustancias ilegales o controladas mencionadas en contextos de foco, euforia, microdosis o productividad extrema.",
                    definition: "Bloque de referencia para sustancias que pueden aparecer en entornos de alto rendimiento, cultura startup o consumo recreativo desplazado al trabajo. La utilidad de la seccion es identificar riesgos y no normalizar su uso.",
                    includes: "Anfetaminas, speed, cocaina, LSD, psilocibina, ketamina, MDMA y mescalina.",
                    use: "Inventario para futuras entradas: que son, que efecto busca la gente, por que se consumen en microdosis o sesiones de trabajo y que problemas legales o medicos implican.",
                    risk: "Dependencia, adulteracion, crisis de ansiedad, psicosis, alteracion cardiovascular, deterioro del juicio, tolerancia rapida y consecuencias legales."
                },
                {
                    id: "cuestiones_practicas",
                    index: "03",
                    name: "Cuestiones Practicas",
                    short: "Problemas reales que aparecen cuando se intenta usar sustancias para sostener rendimiento.",
                    definition: "Bloque para ordenar fenomenos practicos: perdida de efecto, necesidad de repetir, mezclas, bajones, senales de alarma y distancia entre percepcion subjetiva y rendimiento real.",
                    includes: "Tolerancia y dependencia, microdosis, interacciones peligrosas, efecto rebote y senales de alarma.",
                    use: "Sirve para leer cualquier compuesto con criterio: que se busca, que coste aparece despues, que combinaciones elevan el riesgo y cuando parar o pedir ayuda.",
                    risk: "Convertir una herramienta puntual en patron de consumo, confundir activacion con rendimiento y tapar fatiga, ansiedad o falta de sueno con sustancias."
                }
            ]
        };
    }
};
</script>

<style scoped>
.radagast-index-content {
    max-width: 1040px;
}

.radagast-index-hero {
    display: grid;
    gap: 12px;
}

.technical-glossary,
.topic-detail-list {
    margin-top: 22px;
}

.reading-prose {
    display: grid;
    gap: 14px;
    max-width: 94ch;
}

.reading-prose p {
    margin: 0;
    color: var(--view-text-soft);
    font-size: 1rem;
    line-height: 1.82;
}

.technical-glossary {
    display: grid;
    overflow: hidden;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.technical-row {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 18px;
    padding: 15px 16px;
    border-bottom: 1px solid var(--view-border);
}

.technical-row:last-child {
    border-bottom: 0;
}

.technical-head {
    background: color-mix(in srgb, var(--view-surface-soft) 88%, black 12%);
}

.technical-head span,
.technical-row strong,
.topic-detail header span {
    color: var(--view-accent);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.technical-row p {
    margin: 0;
    color: var(--view-text-soft);
    line-height: 1.72;
}

.topic-detail-list {
    display: grid;
    gap: 18px;
}

.topic-detail {
    display: grid;
    gap: 16px;
    padding: 22px;
    border: 1px solid var(--view-border);
    border-radius: 8px;
    background: var(--view-surface-strong);
}

.topic-detail header {
    padding-bottom: 14px;
    border-bottom: 1px solid var(--view-border);
}

.topic-detail h3 {
    margin: 8px 0 0;
    color: var(--view-text-strong);
    font-size: 1.35rem;
}

.topic-detail header small {
    display: block;
    margin-top: 6px;
    color: var(--view-text-muted);
    font-size: 0.92rem;
    line-height: 1.5;
}

.topic-detail > p {
    max-width: 96ch;
    margin: 0;
    color: var(--view-text-soft);
    line-height: 1.78;
}

.topic-detail dl {
    display: grid;
    margin: 0;
    border-top: 1px solid var(--view-border);
}

.topic-detail dl div {
    padding: 14px 0;
    border-bottom: 1px solid var(--view-border);
}

.topic-detail dl div:last-child {
    padding-bottom: 0;
    border-bottom: 0;
}

.topic-detail dt {
    color: var(--view-text);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.topic-detail dd {
    margin: 6px 0 0;
    color: var(--view-text-soft);
    line-height: 1.68;
}

@media (max-width: 767px) {
    .technical-row {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
