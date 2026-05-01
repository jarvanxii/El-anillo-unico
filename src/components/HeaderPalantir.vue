<template>
    <ResponsiveSubheader :items="subItems" theme="palantir" />
</template>

<script>
import ResponsiveSubheader from "./ResponsiveSubheader.vue";

export default {
    name: 'HeaderPalantir',
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
                    id: "ai_ml_foundations",
                    name: "Fundamentos de IA y ML",
                    subs: [
                        "IA, ML, Deep Learning e IA generativa",
                        "Aprendizaje supervisado, no supervisado y por refuerzo",
                        "Clasificación, regresión, clustering y ranking",
                        "Redes neuronales, transformers y embeddings",
                        "Datasets, features, labels y data leakage",
                        "Entrenamiento, validación y test",
                        "Overfitting, underfitting y regularización",
                        "Métricas: accuracy, precision, recall, F1, ROC-AUC",
                        "Sesgo, varianza y generalización",
                        "Tokenización, contexto y ventanas de contexto",
                        "Latencia, coste, throughput y calidad de inferencia",
                        "Limitaciones: alucinaciones, deriva y falta de causalidad"
                    ]
                },
                {
                    id: "llm_prompting_evaluation",
                    name: "LLMs, Prompting y Evaluación",
                    subs: [
                        "Modelos fundacionales y modelos especializados",
                        "Prompt engineering: rol, contexto, restricciones y ejemplos",
                        "Zero-shot, few-shot y chain-of-thought controlado",
                        "System prompts, tool prompts y prompt templates",
                        "Prompt injection y jailbreaks",
                        "Evaluación humana vs evaluación automatizada",
                        "Evals de seguridad, calidad, factualidad y robustez",
                        "Red teaming de modelos de IA",
                        "Guardrails, filtros y políticas de salida",
                        "Grounding y citación de fuentes",
                        "Trazabilidad de decisiones y explicabilidad",
                        "Benchmarks y límites de los benchmarks"
                    ]
                },
                {
                    id: "rag_agents_automation",
                    name: "RAG, Agentes y Automatización",
                    subs: [
                        "RAG: chunking, embeddings, retrieval y reranking",
                        "Bases vectoriales y búsqueda semántica",
                        "RAG híbrido: BM25 + vectores",
                        "Calidad del corpus y gobierno documental",
                        "Fine-tuning vs RAG vs prompting",
                        "Function calling y tool use",
                        "Agentes autónomos y agentes supervisados",
                        "Planificación, memoria y ejecución por pasos",
                        "Automatización de flujos SOC, GRC y desarrollo",
                        "Human-in-the-loop y aprobaciones seguras",
                        "Observabilidad de agentes",
                        "Fallos comunes: loops, acciones no autorizadas y drift"
                    ]
                },
                {
                    id: "ai_security_defense",
                    name: "IA Defensiva",
                    subs: [
                        "Detección de phishing y fraude con IA",
                        "Clasificación y priorización de alertas",
                        "Enriquecimiento de IOCs e inteligencia de amenazas",
                        "Resumen de incidentes y timeline automático",
                        "Análisis de logs y lenguaje natural para SIEM",
                        "UEBA y detección de anomalías",
                        "Análisis de malware asistido por IA",
                        "Revisión de código seguro con IA",
                        "Threat hunting asistido",
                        "Generación de reglas Sigma, YARA y KQL",
                        "Copilotos defensivos y riesgos operativos",
                        "Validación humana de resultados de IA"
                    ]
                },
                {
                    id: "ai_offensive_abuse",
                    name: "Abuso Ofensivo y Riesgos",
                    subs: [
                        "Phishing, vishing y deepfakes con IA",
                        "Generación de malware y ofuscación asistida",
                        "Automatización de OSINT hostil",
                        "Suplantación de identidad y fraude sintético",
                        "Data poisoning y model poisoning",
                        "Adversarial examples",
                        "Model extraction y model inversion",
                        "Membership inference",
                        "Exfiltración mediante prompts y herramientas",
                        "Abuso de agentes con permisos excesivos",
                        "Riesgos de modelos locales no confiables",
                        "Detección y respuesta ante abuso de IA"
                    ]
                },
                {
                    id: "llm_appsec",
                    name: "Seguridad de Apps con IA",
                    subs: [
                        "OWASP Top 10 for LLM Applications",
                        "Prompt injection directa e indirecta",
                        "Insecure output handling",
                        "Excessive agency",
                        "Data leakage y fuga de secretos",
                        "Vector and embedding weaknesses",
                        "RAG poisoning",
                        "Autorización en herramientas y conectores",
                        "Aislamiento de tenants y memoria",
                        "Rate limiting, abuso y costes inesperados",
                        "Logging seguro de prompts y respuestas",
                        "Pruebas de seguridad para aplicaciones LLM"
                    ]
                },
                {
                    id: "ai_governance_privacy",
                    name: "Gobierno, Privacidad y Cumplimiento",
                    subs: [
                        "AI governance y modelo de responsabilidades",
                        "Inventario de sistemas de IA",
                        "Clasificación de riesgos de IA",
                        "Privacidad, minimización y retención de datos",
                        "Datos sensibles en prompts",
                        "Propiedad intelectual y licencias",
                        "Transparencia, explicabilidad y auditabilidad",
                        "Evaluación de proveedores de IA",
                        "NIST AI RMF",
                        "ISO/IEC 42001",
                        "EU AI Act y enfoque basado en riesgo",
                        "Políticas internas de uso aceptable de IA"
                    ]
                },
                {
                    id: "mlops_ai_operations",
                    name: "MLOps y Operación de IA",
                    subs: [
                        "Ciclo de vida de modelos",
                        "Versionado de datos, modelos y prompts",
                        "Model registry y aprobaciones",
                        "CI/CD para modelos y prompts",
                        "Monitorización de drift y degradación",
                        "Seguridad de pipelines de datos",
                        "Secretos y credenciales en notebooks",
                        "Controles de acceso a modelos y datasets",
                        "Cost management y cuotas",
                        "Evaluación continua en producción",
                        "Rollback y respuesta ante incidentes de IA",
                        "Documentación: model cards y datasheets"
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
