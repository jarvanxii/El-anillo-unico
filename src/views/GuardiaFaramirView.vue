<template>
    <div class="faramir-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-faramir.png" alt="La guardia de Faramir" />
        </section>

        <div class="container py-5">
            <section class="section-box intro-box">
                <div class="section-heading">
                    <span class="section-kicker">Inspeccion de objetivos web</span>
                    <h2 class="section-name">La Guardia de Faramir</h2>
                    <p class="section-copy">
                        Analiza un dominio o una URL con reconocimiento pasivo desde el navegador: DNS, transporte HTTP,
                        cabeceras, ficheros publicos, certificados, RDAP, Wayback y reputacion en URLHaus.
                    </p>
                </div>

                <div class="scan-panel">
                    <label class="field-label" for="target-url">Dominio o URL</label>
                    <div class="scan-row">
                        <input
                            id="target-url"
                            v-model.trim="url"
                            class="form-control input-dark"
                            placeholder="ejemplo.com o https://ejemplo.com/login"
                            @keyup.enter="analyze"
                        />
                        <button class="btn btn-main" :disabled="loading || !url" @click="analyze">
                            {{ loading ? "Analizando..." : "Analizar objetivo" }}
                        </button>
                    </div>
                    <p class="helper-copy">
                        No ejecuta pruebas intrusivas. Solo consulta fuentes publicas y respuestas accesibles desde el
                        navegador o mediante proxies publicos de lectura.
                    </p>
                </div>

                <div v-if="loading" class="loading-panel">
                    <div class="loading-step" v-for="step in steps" :key="step.name" :class="step.state">
                        <div class="loading-step-icon">
                            <span v-if="step.state === 'done'" class="bi bi-check-lg"></span>
                            <span v-else-if="step.state === 'error'" class="bi bi-x-lg"></span>
                            <span v-else-if="step.state === 'active'" class="spinner-border spinner-border-sm"></span>
                            <span v-else class="bi bi-circle"></span>
                        </div>
                        <div class="loading-step-body">
                            <strong>{{ step.name }}</strong>
                            <span>{{ step.status }}</span>
                        </div>
                    </div>
                </div>

                <div class="quick-guide">
                    <div class="guide-card">
                        <label>DNS y registro</label>
                        <span>A, AAAA, MX, NS, TXT, CAA y RDAP del dominio.</span>
                    </div>
                    <div class="guide-card">
                        <label>HTTP y superficie</label>
                        <span>HTTPS, estado, redirecciones, cabeceras, robots.txt, sitemap.xml y security.txt.</span>
                    </div>
                    <div class="guide-card">
                        <label>Reputacion e historial</label>
                        <span>URLHaus, certificados en crt.sh y capturas publicas en Wayback.</span>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Resumen tecnico</h4>
                <div class="row g-3 mb-4">
                    <div class="col-md-6 col-xl-3" v-for="item in summaryCards" :key="item.label">
                        <div class="item metric-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small v-if="item.note">{{ item.note }}</small>
                        </div>
                    </div>
                </div>

                <div class="verdict-card" :class="results.verdictTone">
                    <div class="verdict-icon">URL</div>
                    <div class="verdict-body">
                        <strong>{{ results.verdictTitle }}</strong>
                        <p>{{ results.verdictBody }}</p>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">DNS y transporte</h4>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in transportCards" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small v-if="item.note">{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Cabeceras y superficie</h4>
                <div class="row g-3 mb-4">
                    <div class="col-md-6 col-xl-4" v-for="item in visibleHeaderCards" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in surfaceCards" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Fuentes consultadas</h4>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in sourceCards" :key="item.name">
                        <div class="source-card" :class="item.tone">
                            <div class="source-head">
                                <span>{{ item.name }}</span>
                                <span class="mini-badge">{{ item.state }}</span>
                            </div>
                            <p>{{ item.description }}</p>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="results" class="section-box">
                <h4 class="section-title">Datos tecnicos</h4>
                <div class="row g-3">
                    <div class="col-xl-6" v-for="panel in rawPanels" :key="panel.title">
                        <div class="tool-card">
                            <div class="card-head">
                                <h5>{{ panel.title }}</h5>
                                <span class="mini-badge">{{ panel.badge }}</span>
                            </div>
                            <div class="output-box">
                                <pre class="result-pre">{{ panel.content }}</pre>
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
            steps: [],
            results: null
        };
    },

    computed: {
        summaryCards() {
            if (!this.results) return [];

            return [
                {
                    label: "Puntuacion",
                    value: `${this.results.score}/100`,
                    tone: this.scoreTone(this.results.score),
                    note: this.results.host
                },
                {
                    label: "HTTPS",
                    value: this.results.normalized.https ? "Activo" : "No",
                    tone: this.results.normalized.https ? "tone-success" : "tone-danger",
                    note: this.results.http.finalUrl || this.results.normalized.url
                },
                {
                    label: "SecurityHeaders",
                    value: this.results.headerGrade || "Sin grado",
                    tone: this.results.headerGrade?.startsWith("A") ? "tone-success" : this.results.headerGrade ? "tone-warning" : "tone-neutral",
                    note: this.results.securityHeaders.success ? "Informe parseado" : (this.results.securityHeaders.error || "No disponible")
                },
                {
                    label: "URLHaus",
                    value: this.malwareLabel,
                    tone: this.malwareToneClass,
                    note: this.results.urlhaus.raw?.query_status || this.results.urlhaus.error || "Sin datos"
                }
            ];
        },

        transportCards() {
            if (!this.results) return [];
            const dns = this.results.dns;
            const rdap = this.results.rdap;

            return [
                {
                    label: "URL final",
                    value: this.results.http.finalUrl || this.results.normalized.url,
                    tone: this.results.http.error ? "tone-warning" : "tone-neutral",
                    note: this.results.http.redirected ? "Hubo redireccion" : "Sin redireccion confirmada"
                },
                {
                    label: "Codigo HTTP",
                    value: this.results.http.status || "Sin respuesta",
                    tone: this.results.http.status ? "tone-success" : "tone-warning",
                    note: this.results.http.error || "Respuesta directa del navegador"
                },
                {
                    label: "IPv4",
                    value: String(dns.a.records.length),
                    tone: dns.a.records.length ? "tone-success" : "tone-warning",
                    note: this.shortList(dns.a.records, 2)
                },
                {
                    label: "IPv6",
                    value: String(dns.aaaa.records.length),
                    tone: dns.aaaa.records.length ? "tone-success" : "tone-neutral",
                    note: this.shortList(dns.aaaa.records, 2)
                },
                {
                    label: "Nameservers",
                    value: String(dns.ns.records.length),
                    tone: dns.ns.records.length ? "tone-success" : "tone-warning",
                    note: this.shortList(dns.ns.records, 2)
                },
                {
                    label: "CAA",
                    value: dns.caa.records.length ? "Visible" : "Ausente",
                    tone: dns.caa.records.length ? "tone-success" : "tone-warning",
                    note: dns.caa.records.length ? this.shortList(dns.caa.records, 2) : "No limita autoridades certificadoras"
                },
                {
                    label: "Registrar",
                    value: rdap.registrar || "No disponible",
                    tone: rdap.success ? "tone-neutral" : "tone-warning",
                    note: rdap.expires ? `Expira ${this.formatDate(rdap.expires)}` : (rdap.error || "Sin fecha de expiracion")
                },
                {
                    label: "Cabeceras visibles",
                    value: String(this.results.http.headerCount),
                    tone: this.results.http.headerCount ? "tone-neutral" : "tone-warning",
                    note: "Cabeceras expuestas por CORS al navegador"
                }
            ];
        },

        visibleHeaderCards() {
            if (!this.results) return [];

            return [
                this.buildHeaderCard("Strict-Transport-Security", "HSTS"),
                this.buildHeaderCard("Content-Security-Policy", "CSP"),
                this.buildHeaderCard("X-Frame-Options", "X-Frame-Options"),
                this.buildHeaderCard("Referrer-Policy", "Referrer-Policy"),
                this.buildHeaderCard("Permissions-Policy", "Permissions-Policy"),
                this.buildHeaderCard("X-Content-Type-Options", "X-Content-Type-Options")
            ];
        },

        surfaceCards() {
            if (!this.results) return [];
            const surface = this.results.surface;
            const ct = this.results.ct;
            const wayback = this.results.wayback;

            return [
                {
                    label: "robots.txt",
                    value: surface.robots.success ? "Visible" : "Ausente",
                    tone: surface.robots.success ? "tone-success" : "tone-neutral",
                    note: surface.robots.success ? "Politica de rastreo recuperada" : (surface.robots.error || "No recuperado")
                },
                {
                    label: "sitemap.xml",
                    value: surface.sitemap.success ? "Visible" : "Ausente",
                    tone: surface.sitemap.success ? "tone-success" : "tone-neutral",
                    note: surface.sitemap.success ? "Indice publico recuperado" : (surface.sitemap.error || "No recuperado")
                },
                {
                    label: "security.txt",
                    value: surface.securityTxt.success ? "Visible" : "Ausente",
                    tone: surface.securityTxt.success ? "tone-success" : "tone-warning",
                    note: surface.securityTxt.path || surface.securityTxt.error || "Sin canal publico"
                },
                {
                    label: "Certificados",
                    value: String(ct.uniqueNames.length),
                    tone: ct.uniqueNames.length ? "tone-success" : "tone-warning",
                    note: ct.latestEntry ? `Ultimo ${this.formatDateTime(ct.latestEntry)}` : (ct.error || "Sin registros visibles")
                },
                {
                    label: "Wayback",
                    value: wayback.count ? `${wayback.count} capturas` : "Sin capturas",
                    tone: wayback.count ? "tone-neutral" : "tone-warning",
                    note: wayback.latest ? wayback.latest.original : (wayback.error || "Sin historial publico")
                }
            ];
        },

        sourceCards() {
            if (!this.results) return [];
            const dns = this.results.dns;
            const hasIp = dns.a.records.length > 0 || dns.aaaa.records.length > 0;
            const urlhausStatus = this.results.urlhaus.raw?.query_status || "";

            return [
                {
                    name: "DNS over HTTPS",
                    state: hasIp ? "Exitoso" : "Parcial",
                    tone: hasIp ? "tone-success" : "tone-warning",
                    description: "A, AAAA, MX, NS, TXT y CAA desde dns.google.",
                    note: `A: ${dns.a.records.length} | AAAA: ${dns.aaaa.records.length} | NS: ${dns.ns.records.length}`
                },
                {
                    name: "HTTP fetch",
                    state: this.results.http.error ? "Limitado" : "Exitoso",
                    tone: this.results.http.error ? "tone-warning" : "tone-success",
                    description: "Estado, redireccion final y cabeceras visibles desde el navegador.",
                    note: this.results.http.error || `HTTP ${this.results.http.status}`
                },
                {
                    name: "SecurityHeaders",
                    state: this.results.securityHeaders.success ? "Exitoso" : "No disponible",
                    tone: this.results.securityHeaders.success ? "tone-success" : "tone-warning",
                    description: "Lectura externa de cabeceras de seguridad y grado sintetico.",
                    note: this.results.headerGrade ? `Grado ${this.results.headerGrade}` : (this.results.securityHeaders.error || "Sin grado")
                },
                {
                    name: "crt.sh",
                    state: this.results.ct.success ? "Exitoso" : "No disponible",
                    tone: this.results.ct.success ? "tone-success" : "tone-warning",
                    description: "Transparencia de certificados y nombres asociados al dominio.",
                    note: this.results.ct.success ? `${this.results.ct.uniqueNames.length} nombres unicos` : (this.results.ct.error || "Sin datos")
                },
                {
                    name: "RDAP",
                    state: this.results.rdap.success ? "Exitoso" : "No disponible",
                    tone: this.results.rdap.success ? "tone-success" : "tone-warning",
                    description: "Registro publico del dominio, registrar, fechas y nameservers.",
                    note: this.results.rdap.success ? `Alta ${this.formatDate(this.results.rdap.created)}` : (this.results.rdap.error || "Sin respuesta")
                },
                {
                    name: "Wayback",
                    state: this.results.wayback.success ? "Exitoso" : "No disponible",
                    tone: this.results.wayback.success ? "tone-success" : "tone-warning",
                    description: "Capturas historicas publicas del host.",
                    note: this.results.wayback.success ? `${this.results.wayback.count} capturas` : (this.results.wayback.error || "Sin datos")
                },
                {
                    name: "URLHaus",
                    state: this.results.urlhaus.success ? "Exitoso" : "No disponible",
                    tone: urlhausStatus === "ok" ? "tone-danger" : (this.results.urlhaus.success ? "tone-success" : "tone-warning"),
                    description: "Coincidencias publicas con URLs maliciosas reportadas.",
                    note: urlhausStatus || this.results.urlhaus.error || "Sin respuesta"
                },
                {
                    name: "Ficheros publicos",
                    state: this.results.surface.robots.success || this.results.surface.sitemap.success || this.results.surface.securityTxt.success ? "Parcial" : "Sin datos",
                    tone: this.results.surface.securityTxt.success ? "tone-success" : "tone-neutral",
                    description: "robots.txt, sitemap.xml y security.txt en el origen.",
                    note: `security.txt: ${this.results.surface.securityTxt.success ? "si" : "no"}`
                }
            ];
        },

        rawPanels() {
            if (!this.results) return [];

            return [
                {
                    title: "DNS snapshot",
                    badge: "A / AAAA / MX / NS / TXT / CAA",
                    content: this.formatBlock({
                        A: this.results.dns.a.records,
                        AAAA: this.results.dns.aaaa.records,
                        MX: this.results.dns.mx.records,
                        NS: this.results.dns.ns.records,
                        TXT: this.results.dns.txt.records,
                        CAA: this.results.dns.caa.records
                    })
                },
                {
                    title: "Superficie publica",
                    badge: "robots / sitemap / security.txt",
                    content: this.formatBlock({
                        robots: this.results.surface.robots.success ? this.results.surface.robots.content : this.results.surface.robots.error,
                        sitemap: this.results.surface.sitemap.success ? this.results.surface.sitemap.content : this.results.surface.sitemap.error,
                        security_txt_path: this.results.surface.securityTxt.path || "No visible",
                        security_txt: this.results.surface.securityTxt.success ? this.results.surface.securityTxt.content : this.results.surface.securityTxt.error
                    })
                },
                {
                    title: "SecurityHeaders y URLHaus",
                    badge: "cabeceras / reputacion",
                    content: this.formatBlock({
                        security_headers: this.results.securityHeaders.success ? this.results.securityHeaders.raw : { error: this.results.securityHeaders.error },
                        urlhaus: this.results.urlhaus.success ? this.results.urlhaus.raw : { error: this.results.urlhaus.error }
                    })
                },
                {
                    title: "Certificados, RDAP y Wayback",
                    badge: "crt.sh / rdap / archive",
                    content: this.formatBlock({
                        certificate_names: this.results.ct.sample,
                        rdap: this.results.rdap.success
                            ? {
                                registrar: this.results.rdap.registrar,
                                created: this.results.rdap.created,
                                expires: this.results.rdap.expires,
                                status: this.results.rdap.status,
                                nameservers: this.results.rdap.nameservers
                            }
                            : { error: this.results.rdap.error },
                        wayback: this.results.wayback.latest || { count: this.results.wayback.count, error: this.results.wayback.error || null }
                    })
                }
            ];
        },

        malwareLabel() {
            if (!this.results) return "Sin datos";
            const status = this.results.urlhaus.raw?.query_status;
            if (status === "ok") return "Coincidencia detectada";
            if (status === "no_results") return "Sin coincidencias";
            return status || "Sin datos";
        },

        malwareToneClass() {
            if (!this.results) return "tone-neutral";
            return this.results.urlhaus.raw?.query_status === "ok" ? "tone-danger" : "tone-success";
        }
    },

    methods: {
        buildSteps(names) {
            return names.map(name => ({
                name,
                state: "pending",
                status: "En espera..."
            }));
        },

        updateStep(index, patch) {
            this.steps[index] = {
                ...this.steps[index],
                ...patch
            };
        },

        scoreTone(score) {
            if (score >= 80) return "tone-success";
            if (score >= 55) return "tone-warning";
            return "tone-danger";
        },

        verdictTone(score) {
            if (score >= 80) return "verdict-success";
            if (score >= 55) return "verdict-warning";
            return "verdict-danger";
        },

        normalizeTarget(raw) {
            const trimmed = String(raw || "").trim();
            if (!trimmed) throw new Error("Introduce un dominio o URL valida.");

            const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
            const parsed = new URL(candidate);
            if (!["http:", "https:"].includes(parsed.protocol)) {
                throw new Error("Solo se aceptan objetivos HTTP o HTTPS.");
            }

            return {
                raw: trimmed,
                url: parsed.toString(),
                origin: parsed.origin,
                host: parsed.hostname.toLowerCase(),
                https: parsed.protocol === "https:"
            };
        },

        async analyze() {
            let normalized;
            try {
                normalized = this.normalizeTarget(this.url);
            } catch (error) {
                window.alert(error.message);
                return;
            }

            this.loading = true;
            this.results = null;
            this.steps = this.buildSteps([
                "DNS y RDAP",
                "HTTP y cabeceras",
                "Ficheros publicos",
                "Certificados",
                "Wayback y URLHaus"
            ]);

            try {
                this.updateStep(0, { state: "active", status: "Consultando DNS y registro RDAP..." });
                const [dns, rdap] = await Promise.all([
                    this.fetchTargetDnsBundle(normalized.host),
                    this.fetchDomainRdap(normalized.host)
                ]);
                this.updateStep(0, {
                    state: dns.a.success || dns.aaaa.success || dns.ns.success || rdap.success ? "done" : "error",
                    status: `A: ${dns.a.records.length} | AAAA: ${dns.aaaa.records.length} | NS: ${dns.ns.records.length}`
                });

                this.updateStep(1, { state: "active", status: "Consultando HTTP y SecurityHeaders..." });
                const [http, securityHeaders] = await Promise.all([
                    this.fetchHttpInfo(normalized.url),
                    this.fetchSecurityHeadersReport(normalized.url)
                ]);
                const headerGrade = this.extractSecurityHeadersGrade(securityHeaders);
                this.updateStep(1, {
                    state: http.error && !securityHeaders.success ? "error" : "done",
                    status: `${http.status || "sin HTTP"} | ${headerGrade ? `grado ${headerGrade}` : "sin grado"}`
                });

                this.updateStep(2, { state: "active", status: "Recuperando robots, sitemap y security.txt..." });
                const surface = await this.fetchSurfaceFiles(normalized.origin);
                this.updateStep(2, {
                    state: surface.robots.success || surface.sitemap.success || surface.securityTxt.success ? "done" : "error",
                    status: `robots: ${surface.robots.success ? "si" : "no"} | sitemap: ${surface.sitemap.success ? "si" : "no"} | security.txt: ${surface.securityTxt.success ? "si" : "no"}`
                });

                this.updateStep(3, { state: "active", status: "Consultando transparencia de certificados..." });
                const ct = await this.fetchCertificateTransparency(normalized.host);
                this.updateStep(3, {
                    state: ct.success ? "done" : "error",
                    status: ct.success ? `${ct.uniqueNames.length} nombres unicos` : (ct.error || "Sin datos")
                });

                this.updateStep(4, { state: "active", status: "Consultando Wayback y URLHaus..." });
                const [wayback, urlhaus] = await Promise.all([
                    this.fetchWaybackSnapshots(normalized.host),
                    this.fetchUrlhaus(normalized.url)
                ]);
                this.updateStep(4, {
                    state: wayback.success || urlhaus.success ? "done" : "error",
                    status: `${wayback.count} capturas | ${urlhaus.raw?.query_status || urlhaus.error || "URLHaus sin datos"}`
                });

                const score = this.calculateScore({ normalized, http, dns, surface, headerGrade, urlhaus });
                const urlhausStatus = urlhaus.raw?.query_status || "";
                const verdictTitle = urlhausStatus === "ok"
                    ? "Coincidencia de reputacion maliciosa"
                    : score >= 80
                        ? "Superficie pasiva controlada"
                        : score >= 55
                            ? "Superficie valida con huecos visibles"
                            : "Superficie debil o poco observable";
                const verdictBody = urlhausStatus === "ok"
                    ? "URLHaus contiene una entrada para este objetivo. Trata el enlace como sospechoso hasta verificarlo por otra via."
                    : "El resultado resume exposicion observable, configuracion HTTP, DNS publico y senales de reputacion.";

                this.results = {
                    normalized,
                    target: normalized.url,
                    origin: normalized.origin,
                    host: normalized.host,
                    scannedAt: new Date().toLocaleString(),
                    score,
                    verdictTone: this.verdictTone(score),
                    verdictTitle,
                    verdictBody,
                    http,
                    dns,
                    surface,
                    securityHeaders,
                    headerGrade,
                    ct,
                    rdap,
                    wayback,
                    urlhaus
                };
            } finally {
                this.loading = false;
            }
        },

        calculateScore({ normalized, http, dns, surface, headerGrade, urlhaus }) {
            let score = 100;
            const hasIp = dns.a.records.length > 0 || dns.aaaa.records.length > 0;
            const urlhausStatus = urlhaus.raw?.query_status || "";

            if (!normalized.https) score -= 20;
            if (!hasIp) score -= 20;
            if (http.error) score -= 10;
            if (!dns.caa.records.length) score -= 5;
            if (!surface.securityTxt.success) score -= 8;
            if (headerGrade.startsWith("F")) score -= 40;
            else if (headerGrade.startsWith("D")) score -= 28;
            else if (headerGrade.startsWith("C")) score -= 18;
            else if (headerGrade.startsWith("B")) score -= 8;
            if (urlhausStatus === "ok") score = Math.min(score, 8);

            return Math.max(0, Math.min(100, Math.round(score)));
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

        async fetchTextDirect(url, options = {}) {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        },

        async fetchTextViaProxy(url) {
            const proxies = [
                `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
                `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
            ];

            let lastError = null;
            for (const proxyUrl of proxies) {
                try {
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return await response.text();
                } catch (error) {
                    lastError = error;
                }
            }

            throw lastError || new Error("No se pudo recuperar el recurso.");
        },

        async fetchTextSmart(url, options = {}) {
            const method = (options.method || "GET").toUpperCase();
            if (method !== "GET") {
                return await this.fetchTextDirect(url, options);
            }

            try {
                return await this.fetchTextDirect(url, options);
            } catch (error) {
                return await this.fetchTextViaProxy(url);
            }
        },

        async fetchJsonSmart(url, options = {}) {
            const text = await this.fetchTextSmart(url, options);
            return JSON.parse(String(text).trim());
        },

        async fetchPublicText(url) {
            try {
                const content = await this.fetchTextSmart(url);
                return { success: true, content };
            } catch (error) {
                return { success: false, content: "", error: error.message };
            }
        },

        async fetchDnsRecords(name, type) {
            try {
                const json = await this.fetchJsonSmart(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`);
                const records = (json.Answer || []).map(answer => {
                    return type === "TXT" ? this.normalizeTxtRecord(answer.data) : answer.data;
                });
                return { success: true, records, raw: json, status: json.Status };
            } catch (error) {
                return { success: false, records: [], raw: null, error: error.message };
            }
        },

        async fetchTargetDnsBundle(host) {
            const [a, aaaa, mx, ns, txt, caa] = await Promise.all([
                this.fetchDnsRecords(host, "A"),
                this.fetchDnsRecords(host, "AAAA"),
                this.fetchDnsRecords(host, "MX"),
                this.fetchDnsRecords(host, "NS"),
                this.fetchDnsRecords(host, "TXT"),
                this.fetchDnsRecords(host, "CAA")
            ]);

            return { a, aaaa, mx, ns, txt, caa };
        },

        async fetchSecurityHeadersReport(targetUrl) {
            try {
                const raw = await this.fetchJsonSmart(
                    `https://securityheaders.com/?q=${encodeURIComponent(targetUrl)}&followRedirects=on&format=json`
                );
                return { success: true, raw };
            } catch (error) {
                return { success: false, raw: null, error: error.message };
            }
        },

        extractSecurityHeadersGrade(report) {
            if (!report?.raw) return "";
            return report.raw.grade || report.raw.summary?.grade || report.raw.result?.grade || "";
        },

        async fetchCertificateTransparency(domain) {
            try {
                const raw = await this.fetchJsonSmart(`https://crt.sh/?q=${encodeURIComponent(`%.${domain}`)}&output=json`);
                const rows = Array.isArray(raw) ? raw : [];
                const names = this.uniqueList(rows.flatMap(row => String(row.name_value || "").split("\n")));
                return {
                    success: true,
                    raw: rows,
                    uniqueNames: names,
                    latestEntry: rows[0]?.entry_timestamp || "",
                    sample: names.slice(0, 12)
                };
            } catch (error) {
                return {
                    success: false,
                    raw: [],
                    uniqueNames: [],
                    latestEntry: "",
                    sample: [],
                    error: error.message
                };
            }
        },

        async fetchWaybackSnapshots(host) {
            try {
                const raw = await this.fetchJsonSmart(
                    `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(host)}&fl=timestamp,original,statuscode&filter=statuscode:200&limit=6&output=json`
                );
                const rows = Array.isArray(raw) ? raw.slice(1) : [];
                const latest = rows.length ? rows[rows.length - 1] : null;
                return {
                    success: true,
                    raw: rows,
                    count: rows.length,
                    latest: latest ? { timestamp: latest[0], original: latest[1], status: latest[2] } : null
                };
            } catch (error) {
                return {
                    success: false,
                    raw: [],
                    count: 0,
                    latest: null,
                    error: error.message
                };
            }
        },

        async fetchUrlhaus(url) {
            try {
                const response = await fetch("https://urlhaus-api.abuse.ch/v1/url/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `url=${encodeURIComponent(url)}`
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const raw = await response.json();
                return { success: true, raw };
            } catch (error) {
                return { success: false, raw: null, error: error.message };
            }
        },

        async fetchSurfaceFiles(origin) {
            const [robots, sitemap, securityWellKnown, securityRoot] = await Promise.all([
                this.fetchPublicText(`${origin}/robots.txt`),
                this.fetchPublicText(`${origin}/sitemap.xml`),
                this.fetchPublicText(`${origin}/.well-known/security.txt`),
                this.fetchPublicText(`${origin}/security.txt`)
            ]);

            const securityTxt = securityWellKnown.success
                ? { ...securityWellKnown, path: "/.well-known/security.txt" }
                : securityRoot.success
                    ? { ...securityRoot, path: "/security.txt" }
                    : { success: false, content: "", error: securityWellKnown.error || securityRoot.error || "No disponible", path: "" };

            return { robots, sitemap, securityTxt };
        },

        async fetchDomainRdap(domain) {
            try {
                const raw = await this.fetchJsonSmart(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
                return {
                    success: true,
                    raw,
                    registrar: this.findRegistrarName(raw.entities),
                    created: this.findEventDate(raw.events, "registration"),
                    expires: this.findEventDate(raw.events, "expiration"),
                    updated: this.findEventDate(raw.events, "last changed"),
                    status: raw.status || [],
                    nameservers: (raw.nameservers || []).map(item => item.ldhName)
                };
            } catch (error) {
                return {
                    success: false,
                    raw: null,
                    registrar: "No disponible",
                    created: "",
                    expires: "",
                    updated: "",
                    status: [],
                    nameservers: [],
                    error: error.message
                };
            }
        },

        buildHeaderCard(headerName, label) {
            const headerValue = this.getVisibleHeader(headerName);
            const isVisible = Boolean(headerValue);

            return {
                label,
                value: isVisible ? "Visible" : "No visible",
                note: isVisible ? headerValue : "No expuesta por CORS; revisa tambien el informe SecurityHeaders",
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

        readVCardField(entity, fieldName) {
            const entries = entity?.vcardArray?.[1] || [];
            const match = entries.find(entry => entry[0] === fieldName);
            return match?.[3] || "";
        },

        findRegistrarName(entities = []) {
            const registrar = entities.find(entity => entity.roles?.includes("registrar"));
            return this.readVCardField(registrar, "fn") || registrar?.handle || "No disponible";
        },

        findEventDate(events = [], eventAction) {
            return events.find(event => event.eventAction === eventAction)?.eventDate || "";
        },

        normalizeTxtRecord(value) {
            return String(value).replace(/^"+|"+$/g, "").replace(/"\s*"/g, "");
        },

        uniqueList(items) {
            return [...new Set(items.filter(Boolean))];
        },

        shortList(records, max = 3) {
            if (!records?.length) return "Sin datos";
            return records.slice(0, max).join(" | ");
        },

        formatDate(value) {
            if (!value) return "No disponible";
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return String(value);
            return date.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        },

        formatDateTime(value) {
            if (!value) return "No disponible";
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return String(value);
            return date.toLocaleString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
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
    max-width: 920px;
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
    font-weight: 600;
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
    border-color: #64748b;
    box-shadow: 0 0 0 0.2rem rgba(100, 116, 139, 0.22);
}

.btn-main {
    min-width: 170px;
    background: #334155;
    color: #f8fafc;
    border: 1px solid #475569;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 700;
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

.quick-guide {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.guide-card,
.tool-card,
.source-card {
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

.loading-panel {
    display: grid;
    gap: 10px;
}

.loading-step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid #1f2937;
    border-radius: 8px;
    background: #020617;
}

.loading-step-icon {
    color: #94a3b8;
    width: 22px;
    text-align: center;
}

.loading-step.done .loading-step-icon {
    color: #86efac;
}

.loading-step.error .loading-step-icon {
    color: #fca5a5;
}

.loading-step.active .loading-step-icon {
    color: #cbd5e1;
}

.loading-step-body {
    display: grid;
    gap: 2px;
}

.loading-step-body strong {
    color: #e5e7eb;
    font-size: 0.9rem;
}

.loading-step-body span {
    color: #94a3b8;
    font-size: 0.84rem;
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
.metric-card small,
.source-card small {
    color: #94a3b8;
    line-height: 1.5;
}

.metric-card span {
    font-size: 1rem;
}

.verdict-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
    align-items: start;
    padding: 16px;
    border: 1px solid #334155;
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.88);
}

.verdict-success {
    border-color: rgba(34, 197, 94, 0.35);
    background: rgba(20, 83, 45, 0.18);
}

.verdict-warning {
    border-color: rgba(245, 158, 11, 0.35);
    background: rgba(120, 53, 15, 0.18);
}

.verdict-danger {
    border-color: rgba(248, 113, 113, 0.35);
    background: rgba(127, 29, 29, 0.18);
}

.verdict-icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border: 1px solid #334155;
    border-radius: 8px;
    color: #cbd5e1;
    font-size: 0.78rem;
    font-weight: 800;
}

.verdict-body {
    display: grid;
    gap: 6px;
}

.verdict-body strong {
    color: #f8fafc;
    font-size: 1rem;
}

.verdict-body p,
.source-card p {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.6;
}

.source-card {
    height: 100%;
    display: grid;
    gap: 10px;
    border-color: #1f2937;
}

.source-card.tone-success {
    border-color: rgba(34, 197, 94, 0.3);
}

.source-card.tone-warning {
    border-color: rgba(245, 158, 11, 0.3);
}

.source-card.tone-danger {
    border-color: rgba(248, 113, 113, 0.35);
}

.source-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
}

.source-head > span:first-child {
    color: #f8fafc;
    font-weight: 700;
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
    font-weight: 700;
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

    .card-head,
    .source-head {
        flex-direction: column;
        align-items: flex-start;
    }

    .output-box {
        min-height: 220px;
    }
}
</style>
