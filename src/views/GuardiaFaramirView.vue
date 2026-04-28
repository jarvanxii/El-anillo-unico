<template>
    <div class="faramir-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-faramir.png" alt="La guardia de Faramir" />
        </section>

        <div class="container py-5">
            <section class="section-box intro-box">
                <div class="section-heading">
                    <span class="section-kicker">Inspeccion de enlaces</span>
                    <h2 class="section-name">La Guardia de Faramir</h2>
                    <p class="section-copy">
                        Revisa una URL desde el navegador para obtener senales de transporte, politicas visibles,
                        rastros publicos y reputacion basica del enlace.
                    </p>
                </div>

                <div class="scan-panel">
                    <label class="field-label" for="target-url">URL objetivo</label>
                    <div class="scan-row">
                        <input
                            id="target-url"
                            v-model.trim="url"
                            class="form-control input-dark"
                            placeholder="https://ejemplo.com"
                            @keyup.enter="analyze"
                        />
                        <button class="btn btn-main" :disabled="loading" @click="analyze">
                            {{ loading ? "Analizando..." : "Analizar URL" }}
                        </button>
                    </div>
                    <p class="helper-copy">
                        Se consulta transporte, cabeceras observables, <code class="inline-code">robots.txt</code>,
                        <code class="inline-code">sitemap.xml</code> y reputacion basica en URLHaus.
                    </p>
                </div>

                <div class="quick-guide">
                    <div class="guide-card">
                        <label>Transporte</label>
                        <span>HTTPS, estado, redirecciones y cabeceras expuestas.</span>
                    </div>
                    <div class="guide-card">
                        <label>Descubrimiento</label>
                        <span>
                            Revision rapida de <code class="inline-code">robots.txt</code> y
                            <code class="inline-code">sitemap.xml</code>.
                        </span>
                    </div>
                    <div class="guide-card">
                        <label>Reputacion</label>
                        <span>Comprobacion de coincidencias conocidas en URLHaus.</span>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Resumen rapido</h4>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in summaryCards" :key="item.label">
                        <div class="item metric-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small v-if="item.note">{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">HTTP y transporte</h4>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in transportCards" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span>{{ item.value }}</span>
                            <small v-if="item.note">{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Politicas visibles</h4>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-4" v-for="item in visibleHeaderCards" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Descubrimiento publico</h4>
                <div class="row g-3">
                    <div class="col-lg-6">
                        <div class="tool-card">
                            <div class="card-head">
                                <h5>robots.txt</h5>
                                <span class="mini-badge">Ruta publica</span>
                            </div>
                            <div class="output-box">
                                <pre class="result-pre">{{ formatBlock(results.robots) }}</pre>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="tool-card">
                            <div class="card-head">
                                <h5>sitemap.xml</h5>
                                <span class="mini-badge">Indice de URLs</span>
                            </div>
                            <div class="output-box">
                                <pre class="result-pre">{{ formatBlock(results.sitemap) }}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Cabeceras y reputacion</h4>
                <div class="row g-3">
                    <div class="col-12">
                        <div class="tool-card">
                            <div class="card-head">
                                <h5>Informe SecurityHeaders</h5>
                                <span class="mini-badge">{{ securityHeadersState }}</span>
                            </div>
                            <div class="output-box">
                                <pre class="result-pre">{{ formatBlock(results.headers) }}</pre>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="tool-card">
                            <div class="card-head">
                                <h5>Threat intelligence</h5>
                                <span class="mini-badge" :class="malwareToneClass">{{ malwareLabel }}</span>
                            </div>
                            <div class="output-box">
                                <pre class="result-pre">{{ formatBlock(results.malware) }}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "GuardiaFaramirView",

    data() {
        return {
            url: "",
            loading: false,
            results: null
        };
    },

    computed: {
        summaryCards() {
            if (!this.results) return [];

            return [
                {
                    label: "Dominio analizado",
                    value: this.cleanHost(this.results.target),
                    note: this.results.scannedAt
                },
                {
                    label: "Estado HTTP",
                    value: this.results.http.status || "Sin respuesta",
                    note: this.results.http.error || "Peticion completada"
                },
                {
                    label: "HTTPS",
                    value: this.results.http.https ? "Activo" : "No confirmado",
                    note: this.results.http.redirected ? "Se detectaron redirecciones" : "Sin redirecciones"
                },
                {
                    label: "Riesgo URLHaus",
                    value: this.malwareLabel,
                    tone: this.malwareToneClass,
                    note: this.results.http.finalUrl || this.results.target
                }
            ];
        },

        transportCards() {
            if (!this.results) return [];

            return [
                {
                    label: "URL final",
                    value: this.results.http.finalUrl || "No disponible",
                    note: "Destino final tras seguir redirecciones"
                },
                {
                    label: "Codigo",
                    value: this.results.http.status || "N/D",
                    note: this.results.http.redirected ? "Hubo redireccion" : "Respuesta directa"
                },
                {
                    label: "Cabeceras visibles",
                    value: this.results.http.headerCount,
                    note: "Cabeceras accesibles desde el navegador"
                },
                {
                    label: "Observacion",
                    value: this.results.http.error ? "Limitado" : "Correcto",
                    note: this.results.http.error || "Sin errores aparentes"
                }
            ];
        },

        visibleHeaderCards() {
            return [
                this.buildHeaderCard("Strict-Transport-Security", "HSTS"),
                this.buildHeaderCard("Content-Security-Policy", "CSP"),
                this.buildHeaderCard("X-Frame-Options", "X-Frame-Options"),
                this.buildHeaderCard("Referrer-Policy", "Referrer-Policy"),
                this.buildHeaderCard("Permissions-Policy", "Permissions-Policy"),
                this.buildHeaderCard("X-Content-Type-Options", "X-Content-Type-Options")
            ];
        },

        securityHeadersState() {
            if (!this.results) return "Sin datos";
            if (typeof this.results.headers === "string") {
                return this.results.headers === "No accesible" ? "Sin acceso" : "Respuesta textual";
            }

            const raw = this.results.headers;
            return raw.grade || raw.status || raw.score || "Disponible";
        },

        malwareLabel() {
            if (!this.results) return "Sin datos";

            const raw = this.results.malware;
            if (typeof raw === "string") return raw;
            if (raw.query_status === "ok") return "Coincidencia detectada";
            if (raw.query_status === "no_results") return "Sin coincidencias";
            return raw.query_status || "Sin datos";
        },

        malwareToneClass() {
            if (!this.results || typeof this.results.malware === "string") return "tone-neutral";

            return this.results.malware.query_status === "ok" ? "tone-danger" : "tone-success";
        }
    },

    methods: {
        async fetchWithProxy(url) {
            const proxies = [
                `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
                `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
            ];

            for (const proxy of proxies) {
                try {
                    const response = await fetch(proxy);
                    if (response.ok) return await response.text();
                } catch (error) {
                    continue;
                }
            }

            return "No accesible";
        },

        async analyze() {
            const candidate = this.url.trim();
            if (!/^https?:\/\//i.test(candidate)) {
                window.alert("Introduce una URL valida que empiece por http:// o https://");
                return;
            }

            this.loading = true;
            this.results = null;

            const target = candidate.replace(/\/+$/, "");

            try {
                const [http, headers, robots, sitemap, malware] = await Promise.all([
                    this.fetchHttpInfo(target),
                    this.fetchSecurityHeadersReport(target),
                    this.fetchWithProxy(`${target}/robots.txt`),
                    this.fetchWithProxy(`${target}/sitemap.xml`),
                    this.fetchMalwareStatus(target)
                ]);

                this.results = {
                    target,
                    scannedAt: new Date().toLocaleString(),
                    http,
                    headers,
                    robots,
                    sitemap,
                    malware
                };
            } finally {
                this.loading = false;
            }
        },

        async fetchHttpInfo(target) {
            try {
                const response = await fetch(target, { redirect: "follow" });
                const headers = [...response.headers.entries()];

                return {
                    finalUrl: response.url,
                    status: response.status,
                    redirected: response.redirected,
                    https: response.url.startsWith("https://"),
                    headers,
                    headerCount: headers.length,
                    error: ""
                };
            } catch (error) {
                return {
                    finalUrl: target,
                    status: "",
                    redirected: false,
                    https: target.startsWith("https://"),
                    headers: [],
                    headerCount: 0,
                    error: "No accesible desde navegador o bloqueado por CORS"
                };
            }
        },

        async fetchSecurityHeadersReport(target) {
            try {
                const raw = await this.fetchWithProxy(
                    `https://securityheaders.com/?q=${target}&followRedirects=on&format=json`
                );

                if (typeof raw === "string" && raw.trim().startsWith("{")) {
                    return JSON.parse(raw);
                }

                return raw;
            } catch (error) {
                return "Error al obtener el informe";
            }
        },

        async fetchMalwareStatus(target) {
            try {
                const response = await fetch("https://urlhaus-api.abuse.ch/v1/url/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `url=${encodeURIComponent(target)}`
                });

                return await response.json();
            } catch (error) {
                return "No disponible";
            }
        },

        buildHeaderCard(headerName, label) {
            const headerValue = this.getVisibleHeader(headerName);
            const isVisible = Boolean(headerValue);

            return {
                label,
                value: isVisible ? "Visible" : "No visible",
                note: isVisible ? headerValue : "No se pudo observar desde la respuesta del navegador",
                tone: isVisible ? "tone-success" : "tone-warning"
            };
        },

        getVisibleHeader(headerName) {
            if (!this.results || !Array.isArray(this.results.http.headers)) return "";

            const match = this.results.http.headers.find(
                ([key]) => key.toLowerCase() === headerName.toLowerCase()
            );

            return match ? match[1] : "";
        },

        cleanHost(target) {
            try {
                return new URL(target).host;
            } catch (error) {
                return target;
            }
        },

        formatBlock(value) {
            if (value === null || value === undefined || value === "") return "Sin datos.";
            if (typeof value === "string") return value;

            try {
                return JSON.stringify(value, null, 2);
            } catch (error) {
                return String(value);
            }
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.faramir-page {
    background: #0b0f17;
    color: #e6edf3;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
}

.hero-banner {
    margin-top: 53px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.section-box {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 10px;
    padding: 24px;
    margin-bottom: 24px;
}

.intro-box {
    display: grid;
    gap: 24px;
}

.section-heading {
    display: grid;
    gap: 10px;
}

.section-kicker {
    color: #94a3b8;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.section-name {
    margin: 0;
    color: #f8fafc;
    font-size: clamp(1.5rem, 2.2vw, 2rem);
    font-weight: 600;
}

.section-copy {
    margin: 0;
    color: #9ca3af;
    max-width: 840px;
    line-height: 1.7;
}

.section-title {
    color: #cbd5e1;
    border-left: 4px solid #475569;
    padding-left: 10px;
    font-weight: 600;
    margin-bottom: 16px;
}

.field-label,
.item label,
.guide-card label {
    color: #9ca3af;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    display: block;
    margin-bottom: 6px;
}

.scan-panel {
    display: grid;
    gap: 12px;
}

.scan-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
}

.input-dark {
    background: #020617;
    border: 1px solid #334155;
    color: #f8fafc !important;
    caret-color: #f8fafc;
    min-height: 46px;
}

.input-dark::placeholder {
    color: #64748b;
}

.input-dark:focus {
    background: #020617;
    border-color: #475569;
    box-shadow: 0 0 0 0.2rem rgba(71, 85, 105, 0.2);
}

.btn-main {
    min-width: 170px;
    background: #334155;
    color: #f8fafc;
    border: 1px solid #475569;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 600;
}

.btn-main:hover,
.btn-main:focus {
    background: #475569;
    color: #f8fafc;
}

.btn-main:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.helper-copy {
    margin: 0;
    color: #94a3b8;
    font-size: 0.9rem;
}

.inline-code {
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid #334155;
    border-radius: 6px;
    color: #dbeafe;
    font-family: 'Courier New', monospace;
    font-size: 0.82em;
    padding: 0.12rem 0.4rem;
}

.quick-guide {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.guide-card,
.tool-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 16px;
}

.guide-card span,
.item span {
    color: #e5e7eb;
    font-weight: 500;
    word-break: break-word;
}

.guide-card span {
    display: block;
    line-height: 1.6;
}

.item {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 14px;
    height: 100%;
    display: grid;
    gap: 4px;
}

.item small,
.metric-card small {
    color: #94a3b8;
    line-height: 1.5;
}

.metric-card span {
    font-size: 1rem;
}

.tool-card {
    height: 100%;
    display: grid;
    gap: 12px;
}

.card-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
}

.card-head h5 {
    margin: 0;
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 600;
}

.mini-badge {
    background: rgba(71, 85, 105, 0.35);
    border: 1px solid #334155;
    border-radius: 999px;
    color: #cbd5e1;
    font-size: 0.72rem;
    padding: 4px 10px;
    white-space: nowrap;
}

.output-box {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 14px;
    min-height: 260px;
}

.result-pre {
    margin: 0;
    color: #cbd5e1;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.84rem;
    line-height: 1.6;
    font-family: 'Courier New', monospace;
}

.tone-success {
    color: #86efac !important;
}

.tone-warning {
    color: #fcd34d !important;
}

.tone-danger {
    color: #fca5a5 !important;
}

.tone-neutral {
    color: #cbd5e1 !important;
}

@media (max-width: 991px) {
    .quick-guide {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767px) {
    .section-box {
        padding: 18px;
    }

    .scan-row {
        grid-template-columns: 1fr;
    }

    .btn-main {
        width: 100%;
    }

    .card-head {
        flex-direction: column;
        align-items: flex-start;
    }

    .output-box {
        min-height: 220px;
    }
}
</style>
