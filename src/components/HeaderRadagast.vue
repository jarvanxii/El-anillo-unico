<template>
    <ResponsiveSubheader :items="subItems" theme="radagast" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderRadagast',
    components: { ResponsiveSubheader },
    data() {
        return {
            active: null,
            dropdownLeft: 0,
            dropdownTop: 0,
            dropdownWidth: 0,
            hideTimeout: null,
            subItems: [
                {
                    id: "learning_science",
                    name: "Aprendizaje y Memoria",
                    subs: [
                        "Spaced repetition",
                        "Active recall",
                        "Interleaving y variacion de practica",
                        "Elaboracion y tecnica Feynman",
                        "Mapas mentales y modelos mentales",
                        "Cornell notes y notas atomicas",
                        "Flashcards para certificaciones",
                        "Practica deliberada",
                        "Simulacros de examen",
                        "Correccion de errores y diario de fallos",
                        "Retencion a largo plazo",
                        "Planificacion de estudio por bloques"
                    ]
                },
                {
                    id: "sleep_recovery",
                    name: "Sueno y Recuperacion",
                    subs: [
                        "Arquitectura del sueno",
                        "Ritmo circadiano",
                        "Higiene del sueno",
                        "Luz matinal y luz azul nocturna",
                        "Cafeina y vida media",
                        "Siestas estrategicas",
                        "Descanso activo",
                        "Fatiga mental y senales de sobrecarga",
                        "Recuperacion despues de jornadas largas",
                        "Burnout en ciberseguridad",
                        "Guardias, turnos y recuperacion",
                        "Rutinas pre-examen"
                    ]
                },
                {
                    id: "focus_energy",
                    name: "Foco y Energia Mental",
                    subs: [
                        "Deep work",
                        "Pomodoro y variantes",
                        "Control de interrupciones",
                        "Diseno del entorno de trabajo",
                        "Cafeina y L-teanina",
                        "Hidratacion y electrolitos",
                        "Creatina y rendimiento cognitivo",
                        "Tyrosina y estres agudo",
                        "Teacrina y estimulantes legales",
                        "Tolerancia, ciclos y descanso",
                        "Riesgos de dependencia a estimulantes",
                        "Medicion subjetiva vs objetiva del foco"
                    ]
                },
                {
                    id: "health_foundations",
                    name: "Salud Base para Rendimiento",
                    subs: [
                        "Ejercicio aerobico y cognicion",
                        "Fuerza y salud metabolica",
                        "Nutricion para estabilidad energetica",
                        "Proteina, fibra y micronutrientes",
                        "Omega 3",
                        "Vitamina D y analiticas",
                        "Magnesio",
                        "Glucosa, picos y energia",
                        "Respiracion y regulacion del estres",
                        "Meditacion y atencion",
                        "Ergonomia de escritorio",
                        "Vision, pausas y fatiga ocular"
                    ]
                },
                {
                    id: "productivity_systems",
                    name: "Sistemas de Productividad",
                    subs: [
                        "GTD y captura confiable",
                        "Time blocking",
                        "Kanban personal",
                        "Segundo cerebro",
                        "PKM: Obsidian, Notion y markdown",
                        "Gestion de objetivos trimestrales",
                        "Checklists para laboratorios",
                        "Plantillas de informes",
                        "Automatizacion de tareas repetitivas",
                        "Gestion de contexto entre proyectos",
                        "Revision semanal",
                        "Sistemas anti-procrastinacion"
                    ]
                },
                {
                    id: "exam_performance",
                    name: "Rendimiento en Examenes",
                    subs: [
                        "Plan de estudio por blueprint",
                        "Descomponer dominios y pesos",
                        "Practicar PBQs y laboratorios",
                        "Gestion del tiempo de examen",
                        "Lectura de preguntas trampa",
                        "Tecnica de descarte",
                        "Ansiedad pre-examen",
                        "Repaso final de alto rendimiento",
                        "Simulacros con revision profunda",
                        "Memorizacion de puertos, comandos y frameworks",
                        "Dormir antes del examen",
                        "Post-mortem despues de suspender o aprobar"
                    ]
                },
                {
                    id: "tools_tracking",
                    name: "Medicion y Herramientas",
                    subs: [
                        "Tracking de habitos",
                        "Reaction time tests",
                        "Diario de energia y foco",
                        "Wearables y HRV",
                        "Ruido, musica y concentracion",
                        "Bloqueadores de distracciones",
                        "Lectura rapida vs lectura profunda",
                        "Dictado y notas por voz",
                        "Automatizacion de flashcards",
                        "Dashboards personales",
                        "Metricas utiles y metricas vanidosas",
                        "Privacidad al medir salud y productividad"
                    ]
                },
                {
                    id: "safety_legal_ethics",
                    name: "Seguridad, Legalidad y Limites",
                    subs: [
                        "Diferenciar habitos, suplementos y medicamentos",
                        "Consultar profesionales sanitarios cuando proceda",
                        "Interacciones y contraindicaciones",
                        "No mezclar sustancias sin criterio",
                        "Legalidad por pais",
                        "Riesgos de comprar compuestos online",
                        "Etiquetado, pureza y terceros laboratorios",
                        "Efecto placebo y sesgos de medicion",
                        "Principio de minima intervencion",
                        "Red flags de comunidades de biohacking",
                        "Etica del rendimiento extremo",
                        "Sostenibilidad a largo plazo"
                    ]
                }
            ]
        };
    },
    computed: {
        currentSubs() {
            const found = this.subItems.find(i => i.id === this.active);
            return found ? found.subs : [];
        }
    },
    methods: {
        openDropdown(id, event) {
            this.active = id;
            const rect = event.currentTarget.getBoundingClientRect();
            this.dropdownLeft = rect.left;
            this.dropdownTop = rect.bottom;
            this.dropdownWidth = rect.width;
            this.cancelClose();
        },
        closeDropdownDelayed() {
            this.hideTimeout = setTimeout(() => {
                this.active = null;
            }, 250);
        },
        cancelClose() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        }
    }
}
</script>

<style scoped>
.subheader {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    z-index: 2400;
    background: #12161e;
    border-top: 1px solid rgba(255, 214, 102, 0.08);
    border-bottom: 2px solid #c8a96a;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
}

.sub-item {
    min-height: 54px;
    padding: 12px 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: normal;
    line-height: 1.25;
    color: #e6d3a3;
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .3px;
    cursor: pointer;
    border-left: 1px solid rgba(200, 169, 106, 0.18);
    border-right: 1px solid rgba(200, 169, 106, 0.18);
    transition: all .22s ease;
    position: relative;
}

.sub-item:hover,
.sub-item.active {
    background: #1b1813;
    color: #f3cf75;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16), inset 0 0 18px rgba(212, 175, 55, 0.14);
}

.sub-item::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg,
            transparent 0%,
            #d4af37 20%,
            #ffd700 50%,
            #d4af37 80%,
            transparent 100%);
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(255, 215, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 1px;
}

.sub-item:hover::after,
.sub-item.active::after {
    width: 95%;
    bottom: -1px;
}

.sub-dropdown {
    position: fixed;
    max-height: 72vh;
    overflow-y: auto;
    background: linear-gradient(180deg, #141414 0%, #0f0f0f 100%);
    border-left: 1px solid rgba(255, 214, 102, 0.22);
    border-right: 1px solid rgba(255, 214, 102, 0.22);
    border-bottom: 1px solid rgba(255, 214, 102, 0.22);
    border-radius: 0 0 6px 6px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.50),
        0 0 40px rgba(200, 169, 106, 0.08),
        inset 0 1px 0 rgba(255, 220, 120, 0.03);
    animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(1px);
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a {
    color: #f3e7c2;
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.submenu a:hover {
    color: #ffd98e;
    font-family: "Cinzel", serif;
    transform: translateX(1px);
}

.sub-dropdown::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
    background: rgba(200, 169, 106, 0.35);
    border-radius: 10px;
}

@keyframes dropdownFade {
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
        filter: blur(1px);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

@media (max-width: 1199px) {
    .sub-item {
        padding: 12px 18px;
        font-size: 12px;
        min-height: 58px;
    }
}

@media (max-width: 767px) {
    .subheader {
        display: none;
    }
}
</style>
