<template>
    <div class="libro-rojo-page faq-page app-view text-light">
        <section class="hero-banner">
            <img :src="bannerLibroRojo" alt="El libro rojo de la frontera del Oeste" />
        </section>

        <main class="container app-view-content faq-content">
            <div class="faq-heading">
                <span class="faq-kicker">El Libro Rojo de la Frontera del Oeste</span>
                <h1 class="faq-title" aria-label="Frecuently Asqued Questions">
                    <span class="title-word"><span class="title-cap">F</span>recuently</span>
                    <span class="title-word"><span class="title-cap">A</span>squed</span>
                    <span class="title-word"><span class="title-cap">Q</span>uestions</span>
                </h1>
                <p>Preguntas breves para entender el proposito, los limites y el uso correcto de esta plataforma.</p>
            </div>

            <div class="faq-list">
                <article
                    v-for="(item, index) in faqs"
                    :key="item.question"
                    class="faq-item"
                    :class="{ open: isOpen(index) }"
                >
                    <button
                        type="button"
                        class="faq-question"
                        :aria-expanded="isOpen(index).toString()"
                        @click="toggleFaq(index)"
                    >
                        <span>{{ item.question }}</span>
                    </button>
                    <div class="faq-answer-shell" :aria-hidden="(!isOpen(index)).toString()">
                        <div class="faq-answer">
                            <p>{{ item.answer }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    </div>
</template>

<script>
import bannerLibroRojo from "@/assets/banners/banner-libro.webp";

export default {
    name: "LibroRojoPage",
    data() {
        return {
            openItems: [],
            bannerLibroRojo,
            faqs: [
                {
                    question: "Que es El Anillo Unico?",
                    answer: "Es una plataforma personal de aprendizaje de ciberseguridad. Reune teoria, laboratorios, utilidades y referencias para estudiar ahora y consultar despues cuando trabajes en el sector."
                },
                {
                    question: "Es una herramienta profesional de produccion?",
                    answer: "No. El proyecto esta pensado como entorno de estudio, practica y documentacion. Algunas utilidades pueden ayudar en tareas reales, pero siempre deben validarse con herramientas profesionales y criterio tecnico."
                },
                {
                    question: "Por que existe este proyecto?",
                    answer: "Nace como cuaderno de viaje de un estudiante de ciberseguridad: ordenar conocimiento, practicar conceptos, construir herramientas propias y dejar una wiki util para el futuro."
                },
                {
                    question: "Como deberia usarse la plataforma?",
                    answer: "Usala como mapa de estudio. Primero entiende el concepto, despues prueba la herramienta asociada y finalmente documenta lo aprendido con tus propias notas, comandos y conclusiones."
                },
                {
                    question: "La teoria pretende sustituir documentacion oficial o certificaciones?",
                    answer: "No. Debe servir como base de aprendizaje y consulta rapida. Para examenes, certificaciones o trabajo real, contrasta siempre con documentacion oficial, RFC, guias del fabricante y laboratorios verificados."
                },
                {
                    question: "Que apartados son mas importantes para empezar?",
                    answer: "Saruman para redes y fundamentos, Feanor para codificacion y criptografia, Faramir para analisis de URLs, Galadriel para OSINT basico, Thorondor para monitorizacion y Boromir para defensa."
                },
                {
                    question: "Puedo usar las herramientas contra sistemas de terceros?",
                    answer: "Solo debes analizar sistemas propios, entornos de laboratorio o objetivos donde tengas autorizacion explicita. La frontera entre aprendizaje y abuso no la marca la herramienta, la marca el permiso."
                },
                {
                    question: "La plataforma almacena datos personales?",
                    answer: "La aplicacion funciona principalmente en el navegador. Algunas consultas pueden llamar a servicios publicos externos, por lo que no debes introducir secretos reales salvo que entiendas que datos viajan y a que servicio."
                },
                {
                    question: "Que debo tener en cuenta al probar correos, contrasenas o URLs?",
                    answer: "Usa datos de laboratorio o datos propios. No pegues contraseñas reales reutilizadas, tokens, claves privadas, informacion de clientes ni material sensible."
                },
                {
                    question: "Por que hay referencias a Tolkien?",
                    answer: "Porque el proyecto usa la Tierra Media como sistema de nombres y memoria. La fantasia ayuda a ubicar secciones, pero el contenido debe seguir siendo tecnico, preciso y util."
                },
                {
                    question: "Como se decide si una funcionalidad entra en el proyecto?",
                    answer: "Debe cumplir al menos una de estas condiciones: ensenar un concepto importante, servir como referencia futura o permitir practicar una tarea frecuente de ciberseguridad."
                },
                {
                    question: "Como deberia estudiar con esta plataforma?",
                    answer: "El ciclo recomendado es leer, ejecutar, romper, corregir y escribir conclusiones. Si no puedes explicar un concepto sin mirar la pantalla, aun no lo has conquistado."
                },
                {
                    question: "Que papel tienen las certificaciones?",
                    answer: "Son objetivos utiles para medir progreso, pero no sustituyen la practica. La plataforma debe ayudarte a entender la materia, no solo a memorizar respuestas."
                },
                {
                    question: "Que limitaciones tecnicas tiene el proyecto?",
                    answer: "Al ejecutarse en frontend, algunas consultas dependen de CORS, APIs publicas, disponibilidad de terceros y limites del navegador. Un fallo de consulta no siempre significa que el objetivo este mal configurado."
                },
                {
                    question: "Cual es el criterio final del proyecto?",
                    answer: "Que sea util para aprender de verdad. Cada modulo debe acercarte un poco mas a pensar como analista, defensor, auditor o investigador, no solo a pulsar botones."
                }
            ]
        };
    },
    methods: {
        isOpen(index) {
            return this.openItems.includes(index);
        },
        toggleFaq(index) {
            if (this.isOpen(index)) {
                this.openItems = this.openItems.filter(item => item !== index);
                return;
            }

            this.openItems = [...this.openItems, index];
        }
    }
};
</script>

<style scoped>
.faq-page {
    min-height: 100vh;
}

.faq-content {
    padding-bottom: 64px;
}

.faq-heading {
    position: relative;
    margin-bottom: 24px;
    padding: 22px 24px;
    overflow: hidden;
    background:
        linear-gradient(135deg, color-mix(in srgb, var(--view-surface) 92%, black 8%), color-mix(in srgb, var(--view-surface-strong) 92%, black 8%));
    border: 1px solid color-mix(in srgb, var(--view-accent) 24%, var(--view-border));
    border-radius: 10px;
    box-shadow: 0 18px 34px var(--view-shadow);
}

.faq-heading::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--view-accent-faint) 72%, transparent) 48%, transparent 100%),
        repeating-linear-gradient(135deg, transparent 0 12px, rgba(255, 255, 255, 0.018) 12px 13px);
    opacity: 0.8;
}

.faq-heading::after {
    content: "";
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--view-accent), transparent);
    opacity: 0.55;
}

.faq-kicker,
.faq-title,
.faq-heading p {
    position: relative;
}

.faq-kicker {
    display: block;
    margin-bottom: 6px;
    color: var(--view-accent);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.faq-title {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.42em;
    align-items: baseline;
    margin: 0;
    color: var(--view-text-soft);
    font-family: "Cinzel", serif;
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: 0.015em;
    text-wrap: balance;
}

.title-word {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    font-size: clamp(1.28rem, 2vw, 1.82rem);
}

.title-cap {
    color: var(--view-accent-strong);
    font-size: 1.18em;
    font-weight: 700;
    margin-right: 0.015em;
    text-shadow:
        0 0 14px var(--view-accent-faint),
        0 1px 0 rgba(255, 255, 255, 0.08);
}

.faq-title::after {
    content: "";
    display: block;
    flex-basis: 100%;
    width: min(240px, 72%);
    height: 1px;
    margin-top: 12px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--view-accent), color-mix(in srgb, var(--view-accent) 14%, transparent));
    box-shadow: 0 0 16px var(--view-accent-faint);
}

.faq-heading p {
    max-width: 760px;
    margin: 8px 0 0;
    color: var(--view-text-soft);
    line-height: 1.65;
}

.faq-list {
    display: grid;
    gap: 12px;
}

.faq-item {
    position: relative;
    background: var(--view-surface);
    border: 1px solid var(--view-border);
    border-radius: 8px;
    box-shadow: 0 14px 28px var(--view-shadow);
    overflow: hidden;
    transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.faq-item::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: color-mix(in srgb, var(--view-accent) 72%, transparent);
    opacity: 0;
    transition: opacity 0.18s ease;
}

.faq-item:hover,
.faq-item.open {
    border-color: color-mix(in srgb, var(--view-accent) 34%, var(--view-border));
    box-shadow: 0 18px 34px var(--view-shadow);
}

.faq-item:hover::before,
.faq-item.open::before {
    opacity: 1;
}

.faq-question {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px 18px;
    border: 0;
    background: transparent;
    color: var(--view-text-strong);
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: color 0.18s ease, background 0.18s ease;
}

.faq-question:hover {
    color: var(--view-accent-strong);
    background: color-mix(in srgb, var(--view-accent-faint) 28%, transparent);
}

.faq-question::after {
    content: "+";
    color: var(--view-accent);
    font-size: 1.1rem;
    line-height: 1;
    transition: transform 0.24s ease, color 0.24s ease;
}

.faq-item.open .faq-question::after {
    content: "-";
    color: var(--view-accent-strong);
    transform: rotate(180deg);
}

.faq-answer-shell {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transform: translateY(-4px);
    transition:
        grid-template-rows 0.28s ease,
        opacity 0.22s ease,
        transform 0.22s ease;
}

.faq-item.open .faq-answer-shell {
    grid-template-rows: 1fr;
    opacity: 1;
    transform: translateY(0);
}

.faq-answer {
    min-height: 0;
    overflow: hidden;
}

.faq-answer p {
    margin: 0;
    padding: 14px 18px 18px;
    border-top: 1px solid color-mix(in srgb, var(--view-accent) 16%, transparent);
    background: linear-gradient(180deg, color-mix(in srgb, var(--view-accent-faint) 34%, transparent), transparent 42%);
    color: var(--view-text-soft);
    line-height: 1.7;
}

@media (max-width: 767px) {
    .faq-content {
        padding-bottom: 42px;
    }

    .faq-question {
        padding: 14px 15px;
    }

    .faq-answer p {
        padding: 12px 15px 15px;
    }
}
</style>
