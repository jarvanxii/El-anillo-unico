<template>
    <div class="gollum-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-gollum.png" alt="La identidad de Gollum" />
        </section>

        <div class="container py-5">
            <section class="section-box intro-box">
                <div class="section-heading">
                    <span class="section-kicker">WhoAmI local</span>
                    <h1 class="section-name">La Identidad de Gollum</h1>
                    <p class="section-copy">
                        Lectura tecnica del navegador, red, dispositivo, permisos, almacenamiento y pagina actual.
                        La ubicacion se solicita al entrar en la vista y el informe se genera localmente.
                    </p>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Resumen</span>
                    <h2 class="module-title">Lectura operativa</h2>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" :disabled="loading" @click="refreshAll">
                        {{ loading ? "Actualizando..." : "Actualizar lectura" }}
                    </button>
                    <button class="btn btn-subtle" :disabled="copying || !reportText" @click="copyReport">
                        {{ copying ? "Copiando..." : "Copiar informe" }}
                    </button>
                    <button class="btn btn-subtle" :disabled="!reportText" @click="downloadJson">
                        Descargar JSON
                    </button>
                    <button class="btn btn-subtle" :disabled="geoLoading" @click="requestGeoLocation()">
                        {{ geoLoading ? "Leyendo ubicacion..." : "Reintentar ubicacion" }}
                    </button>
                </div>

                <p class="helper-copy">
                    {{ statusMessage }}
                </p>

                <div class="row g-3">
                    <div class="col-6 col-lg-3" v-for="item in summaryCards" :key="item.label">
                        <div class="metric-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>

                <div class="verdict-card mt-4" :class="verdictTone">
                    <div class="verdict-icon">
                        <span>ID</span>
                    </div>
                    <div class="verdict-body">
                        <strong>{{ verdictTitle }}</strong>
                        <p>{{ verdictBody }}</p>
                    </div>
                </div>

                <div class="finding-list mt-4">
                    <div class="finding-row" v-for="item in operationalFindings" :key="item.label">
                        <strong>{{ item.label }}</strong>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small>{{ item.note }}</small>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Navegador</span>
                    <h2 class="module-title">Identidad y sesion</h2>
                </div>

                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in identityCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Red</span>
                    <h2 class="module-title">Red, privacidad y almacenamiento</h2>
                </div>

                <h5 class="subsection-title">Red y conectividad</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-6 col-xl-3" v-for="item in networkCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>

                <h5 class="subsection-title">Privacidad y persistencia</h5>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in privacyCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Dispositivo</span>
                    <h2 class="module-title">Hardware, pantalla y render</h2>
                </div>

                <h5 class="subsection-title">Dispositivo y pantalla</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-6 col-xl-3" v-for="item in hardwareCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>

                <h5 class="subsection-title">Capacidades de render y media</h5>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in capabilityCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Permisos</span>
                    <h2 class="module-title">Permisos, geolocalizacion y superficie de pagina</h2>
                </div>

                <h5 class="subsection-title">Permisos observables</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-6 col-xl-3" v-for="item in permissionCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>

                <h5 class="subsection-title">Ubicacion y pagina</h5>
                <div class="row g-3">
                    <div class="col-md-6 col-xl-3" v-for="item in pageSurfaceCards" :key="item.label">
                        <div class="signal-card">
                            <label>{{ item.label }}</label>
                            <span :class="item.tone">{{ item.value }}</span>
                            <small>{{ item.note }}</small>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Salida tecnica</span>
                    <h2 class="module-title">Paneles crudos</h2>
                </div>

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
const PERMISSION_MAP = [
    { key: "geolocation", label: "Geolocalizacion" },
    { key: "notifications", label: "Notificaciones" },
    { key: "camera", label: "Camara" },
    { key: "microphone", label: "Microfono" },
    { key: "clipboard-read", label: "Clipboard read" },
    { key: "clipboard-write", label: "Clipboard write" }
];

const TRACKER_PATTERNS = [
    { name: "Google", pattern: /google|googletagmanager|doubleclick|google-analytics/i },
    { name: "Meta", pattern: /facebook|meta/i },
    { name: "Hotjar", pattern: /hotjar/i },
    { name: "Clarity", pattern: /clarity/i },
    { name: "Matomo", pattern: /matomo|piwik/i },
    { name: "Plausible", pattern: /plausible/i }
];

export default {
    name: "IdentidadGollumView",

    data() {
        return {
            loading: false,
            geoLoading: false,
            copying: false,
            statusMessage: "Listo para leer el entorno local.",
            publicIpStatus: "Pendiente",
            reportText: "",
            snapshot: {
                scannedAt: "-",
                publicIp: "-",
                ipSource: "-",
                city: "-",
                region: "-",
                country: "-",
                isp: "-",
                timezone: "-",
                online: "-",
                secureContext: "-",
                crossOriginIsolated: "-",
                browser: "-",
                browserVersion: "-",
                engine: "-",
                os: "-",
                platform: "-",
                userAgent: "-",
                language: "-",
                languages: "-",
                locale: "-",
                vendor: "-",
                cookiesEnabled: "-",
                doNotTrack: "-",
                globalPrivacyControl: "-",
                webdriver: "-",
                connectionType: "-",
                effectiveType: "-",
                downlink: "-",
                rtt: "-",
                saveData: "-",
                cpuCores: "-",
                deviceMemory: "-",
                maxTouchPoints: "-",
                screenResolution: "-",
                availableScreen: "-",
                viewport: "-",
                pixelRatio: "-",
                colorDepth: "-",
                orientation: "-",
                darkMode: "-",
                reducedMotion: "-",
                contrast: "-",
                colorGamut: "-",
                dynamicRange: "-",
                batteryLevel: "-",
                batteryCharging: "-",
                batteryTime: "-",
                webglVendor: "-",
                webglRenderer: "-",
                storageUsage: "-",
                storageQuota: "-",
                storagePersisted: "-",
                storageEstimateStatus: "-",
                localStorageItems: "-",
                sessionStorageItems: "-",
                cookieCount: "-",
                firstPartyScripts: "-",
                thirdPartyScripts: "-",
                trackerMatches: "-",
                pluginsCount: "-",
                mimeTypesCount: "-",
                historyLength: "-",
                referrer: "-",
                mediaDevices: "-",
                audioInputs: "-",
                videoInputs: "-",
                audioOutputs: "-",
                serviceWorker: "-",
                shareApi: "-",
                bluetoothApi: "-",
                usbApi: "-",
                serialApi: "-",
                hidApi: "-",
                nfcApi: "-",
                clipboardApi: "-",
                credentialApi: "-",
                pdfViewerEnabled: "-",
                geoPermission: "Sin consultar",
                notificationPermission: "Sin consultar",
                cameraPermission: "Sin consultar",
                microphonePermission: "Sin consultar",
                clipboardReadPermission: "Sin consultar",
                clipboardWritePermission: "Sin consultar",
                geoLat: "-",
                geoLon: "-",
                geoAccuracy: "-",
                geoTimestamp: "-",
                issues: []
            },
            permissionState: {}
        };
    },

    computed: {
        summaryCards() {
            return [
                {
                    label: "Exposicion local",
                    value: `${this.exposureScore}/100`,
                    tone: this.scoreTone(this.exposureScore, true),
                    note: "Cuanto mas alto, mas superficie visible."
                },
                {
                    label: "Permisos concedidos",
                    value: String(this.permissionGrantedCount),
                    tone: this.permissionGrantedCount > 1 ? "tone-warning" : "tone-success",
                    note: `${this.permissionPromptCount} permisos pendientes de decidir`
                },
                {
                    label: "Scripts de terceros",
                    value: String(this.numericValue(this.snapshot.thirdPartyScripts)),
                    tone: this.numericValue(this.snapshot.thirdPartyScripts) > 0 ? "tone-warning" : "tone-success",
                    note: `${this.snapshot.trackerMatches} coincidencias con proveedores conocidos`
                },
                {
                    label: "Persistencia",
                    value: this.snapshot.storageUsage,
                    tone: "tone-neutral",
                    note: `${this.snapshot.localStorageItems} claves locales y ${this.snapshot.cookieCount} cookies`
                }
            ];
        },

        operationalFindings() {
            const thirdPartyScripts = this.numericValue(this.snapshot.thirdPartyScripts);
            const localKeys = this.numericValue(this.snapshot.localStorageItems) + this.numericValue(this.snapshot.sessionStorageItems);
            const locationReady = this.snapshot.geoLat !== "-";
            const permissionTotal = Object.keys(this.permissionState).length;

            return [
                {
                    label: "Ubicacion",
                    value: this.geoLoading ? "Consultando" : (locationReady ? "Disponible" : "No disponible"),
                    note: locationReady
                        ? `${this.snapshot.geoLat}, ${this.snapshot.geoLon} (${this.snapshot.geoAccuracy})`
                        : `Permiso: ${this.formatPermission(this.permissionState.geolocation)}`,
                    tone: locationReady ? "tone-warning" : "tone-neutral"
                },
                {
                    label: "IP publica",
                    value: this.publicIpStatus,
                    note: `${this.snapshot.publicIp} - ${this.snapshot.ipSource}`,
                    tone: this.publicIpStatus === "Error" ? "tone-warning" : "tone-neutral"
                },
                {
                    label: "Permisos",
                    value: `${this.permissionGrantedCount}/${permissionTotal || 0}`,
                    note: `${this.permissionPromptCount} pendientes; concedidos elevan la superficie visible.`,
                    tone: this.permissionGrantedCount ? "tone-warning" : "tone-success"
                },
                {
                    label: "Persistencia",
                    value: `${localKeys} claves`,
                    note: `${this.snapshot.cookieCount} cookies visibles en el dominio actual.`,
                    tone: localKeys || this.numericValue(this.snapshot.cookieCount) ? "tone-warning" : "tone-success"
                },
                {
                    label: "Terceros",
                    value: `${thirdPartyScripts} scripts`,
                    note: `${this.snapshot.trackerMatches} coincidencias con proveedores conocidos.`,
                    tone: thirdPartyScripts ? "tone-warning" : "tone-success"
                }
            ];
        },

        verdictTone() {
            if (this.exposureScore >= 70) return "verdict-warning";
            if (this.exposureScore >= 45) return "verdict-success";
            return "verdict-neutral";
        },

        verdictTitle() {
            if (this.exposureScore >= 70) {
                return "Sesion con bastante superficie visible";
            }

            if (this.exposureScore >= 45) {
                return "Lectura equilibrada, con varias senales accesibles";
            }

            return "Sesion relativamente contenida";
        },

        verdictBody() {
            const lines = [
                `IP publica: ${this.snapshot.publicIp}.`,
                `Permisos concedidos: ${this.permissionGrantedCount}.`,
                `Scripts de terceros: ${this.snapshot.thirdPartyScripts}.`
            ];

            if (this.snapshot.geoLat !== "-") {
                lines.push(`Geolocalizacion compartida: ${this.snapshot.geoLat}, ${this.snapshot.geoLon}.`);
            }

            return lines.join(" ");
        },

        identityCards() {
            return [
                this.buildCard("Navegador", this.composeBrowserLabel(), this.snapshot.engine, "tone-neutral"),
                this.buildCard("Sistema", this.snapshot.os, this.snapshot.platform, "tone-neutral"),
                this.buildCard("Idioma", this.snapshot.language, this.snapshot.languages, "tone-neutral"),
                this.buildCard("Zona horaria", this.snapshot.timezone, this.snapshot.locale, "tone-neutral"),
                this.buildCard("Contexto seguro", this.snapshot.secureContext, `Cross-origin isolated: ${this.snapshot.crossOriginIsolated}`, this.booleanTone(this.snapshot.secureContext)),
                this.buildCard("WebDriver", this.snapshot.webdriver, "Indica si el navegador declara automatizacion", this.snapshot.webdriver === "Si" ? "tone-warning" : "tone-success"),
                this.buildCard("Historial", this.snapshot.historyLength, "Longitud del history stack", "tone-neutral"),
                this.buildCard("Referrer", this.compactValue(this.snapshot.referrer), "Procedencia visible de la navegacion", "tone-neutral"),
                this.buildCard("Vendor", this.snapshot.vendor, "Marca expuesta por navigator.vendor", "tone-neutral"),
                this.buildCard("User Agent", this.compactValue(this.snapshot.userAgent), "Cadena completa expuesta al cliente", "tone-neutral")
            ];
        },

        networkCards() {
            return [
                this.buildCard("IP publica", this.snapshot.publicIp, `Fuente: ${this.snapshot.ipSource}`, this.publicIpStatus === "Error" ? "tone-warning" : "tone-neutral"),
                this.buildCard("Proveedor", this.snapshot.isp, `${this.snapshot.city}, ${this.snapshot.region}, ${this.snapshot.country}`, "tone-neutral"),
                this.buildCard("Conexion", this.snapshot.connectionType, `Effective type: ${this.snapshot.effectiveType}`, "tone-neutral"),
                this.buildCard("Downlink", this.snapshot.downlink, `RTT: ${this.snapshot.rtt}`, "tone-neutral"),
                this.buildCard("Ahorro de datos", this.snapshot.saveData, "Bandera saveData del navegador", this.booleanTone(this.snapshot.saveData)),
                this.buildCard("Online", this.snapshot.online, "Estado informado por navigator.onLine", this.booleanTone(this.snapshot.online))
            ];
        },

        privacyCards() {
            return [
                this.buildCard("Cookies", this.snapshot.cookiesEnabled, `${this.snapshot.cookieCount} cookies visibles`, this.booleanTone(this.snapshot.cookiesEnabled)),
                this.buildCard("Do Not Track", this.snapshot.doNotTrack, "Preferencia clasica del navegador", this.snapshot.doNotTrack === "Activado" ? "tone-success" : "tone-warning"),
                this.buildCard("Global Privacy Control", this.snapshot.globalPrivacyControl, "Senal moderna anti rastreo", this.snapshot.globalPrivacyControl === "Activado" ? "tone-success" : "tone-warning"),
                this.buildCard("Storage usado", this.snapshot.storageUsage, `Cuota estimada: ${this.snapshot.storageQuota}`, "tone-neutral"),
                this.buildCard("Storage persistente", this.snapshot.storagePersisted, this.snapshot.storageEstimateStatus, this.booleanTone(this.snapshot.storagePersisted)),
                this.buildCard("Local storage", this.snapshot.localStorageItems, "Claves almacenadas en el dominio actual", "tone-neutral"),
                this.buildCard("Session storage", this.snapshot.sessionStorageItems, "Claves vivas en esta pestana", "tone-neutral"),
                this.buildCard("Scripts de terceros", this.snapshot.thirdPartyScripts, `${this.snapshot.trackerMatches} trackers reconocidos`, this.numericValue(this.snapshot.thirdPartyScripts) > 0 ? "tone-warning" : "tone-success"),
                this.buildCard("Scripts propios", this.snapshot.firstPartyScripts, "Scripts servidos desde el mismo origen", "tone-neutral"),
                this.buildCard("Plugins legacy", this.snapshot.pluginsCount, `${this.snapshot.mimeTypesCount} mime types`, "tone-neutral")
            ];
        },

        hardwareCards() {
            return [
                this.buildCard("CPU", this.snapshot.cpuCores, "Nucleos lógicos informados", "tone-neutral"),
                this.buildCard("Memoria", this.snapshot.deviceMemory, "deviceMemory expuesto por el navegador", "tone-neutral"),
                this.buildCard("Touch", this.snapshot.maxTouchPoints, "Puntos tactiles maximos", "tone-neutral"),
                this.buildCard("Pantalla", this.snapshot.screenResolution, `Disponible: ${this.snapshot.availableScreen}`, "tone-neutral"),
                this.buildCard("Viewport", this.snapshot.viewport, `Pixel ratio: ${this.snapshot.pixelRatio}`, "tone-neutral"),
                this.buildCard("Color", this.snapshot.colorDepth, `Orientacion: ${this.snapshot.orientation}`, "tone-neutral"),
                this.buildCard("Tema oscuro", this.snapshot.darkMode, "Preferencia prefers-color-scheme", this.booleanTone(this.snapshot.darkMode)),
                this.buildCard("Reduced motion", this.snapshot.reducedMotion, "Preferencia prefers-reduced-motion", this.booleanTone(this.snapshot.reducedMotion)),
                this.buildCard("Contraste", this.snapshot.contrast, "Media query prefers-contrast", "tone-neutral"),
                this.buildCard("Bateria", this.snapshot.batteryLevel, `${this.snapshot.batteryCharging} · ${this.snapshot.batteryTime}`, "tone-neutral")
            ];
        },

        capabilityCards() {
            return [
                this.buildCard("GPU vendor", this.snapshot.webglVendor, "Lectura WebGL si esta disponible", "tone-neutral"),
                this.buildCard("GPU renderer", this.compactValue(this.snapshot.webglRenderer), "Renderer visible via WebGL", "tone-neutral"),
                this.buildCard("Media devices", this.snapshot.mediaDevices, `${this.snapshot.audioInputs} audio in · ${this.snapshot.videoInputs} video in`, "tone-neutral"),
                this.buildCard("Audio out", this.snapshot.audioOutputs, "Salidas detectadas por enumerateDevices", "tone-neutral"),
                this.buildCard("Service Worker", this.snapshot.serviceWorker, "Soporte del navegador", this.booleanTone(this.snapshot.serviceWorker)),
                this.buildCard("Clipboard API", this.snapshot.clipboardApi, "Disponibilidad de navigator.clipboard", this.booleanTone(this.snapshot.clipboardApi)),
                this.buildCard("Share API", this.snapshot.shareApi, "Disponibilidad de navigator.share", this.booleanTone(this.snapshot.shareApi)),
                this.buildCard("Bluetooth", this.snapshot.bluetoothApi, "Disponibilidad de Web Bluetooth", this.booleanTone(this.snapshot.bluetoothApi)),
                this.buildCard("USB / Serial", `${this.snapshot.usbApi} / ${this.snapshot.serialApi}`, `HID: ${this.snapshot.hidApi} · NFC: ${this.snapshot.nfcApi}`, "tone-neutral"),
                this.buildCard("Credenciales", this.snapshot.credentialApi, `PDF viewer: ${this.snapshot.pdfViewerEnabled}`, "tone-neutral"),
                this.buildCard("Color gamut", this.snapshot.colorGamut, `Dynamic range: ${this.snapshot.dynamicRange}`, "tone-neutral")
            ];
        },

        permissionCards() {
            return PERMISSION_MAP.map((item) => {
                const value = this.permissionState[item.key] || "No soportado";
                return this.buildCard(item.label, this.formatPermission(value), "Estado visible mediante Permissions API", this.permissionTone(value));
            });
        },

        pageSurfaceCards() {
            return [
                this.buildCard("Latitud", this.snapshot.geoLat, `Timestamp: ${this.snapshot.geoTimestamp}`, this.snapshot.geoLat === "-" ? "tone-neutral" : "tone-warning"),
                this.buildCard("Longitud", this.snapshot.geoLon, `Precision: ${this.snapshot.geoAccuracy}`, this.snapshot.geoLon === "-" ? "tone-neutral" : "tone-warning"),
                this.buildCard("Pagina segura", this.snapshot.secureContext, "La API sensible depende de este contexto", this.booleanTone(this.snapshot.secureContext)),
                this.buildCard("Hora del escaneo", this.snapshot.scannedAt, "Marca temporal local", "tone-neutral"),
                this.buildCard("Issues", String(this.snapshot.issues.length), this.snapshot.issues[0] || "Sin incidencias relevantes", this.snapshot.issues.length ? "tone-warning" : "tone-success")
            ];
        },

        rawPanels() {
            return [
                {
                    title: "Identidad y sesion",
                    badge: "browser",
                    content: this.prettyPrint({
                        browser: this.composeBrowserLabel(),
                        engine: this.snapshot.engine,
                        os: this.snapshot.os,
                        platform: this.snapshot.platform,
                        language: this.snapshot.language,
                        languages: this.snapshot.languages,
                        locale: this.snapshot.locale,
                        timezone: this.snapshot.timezone,
                        userAgent: this.snapshot.userAgent,
                        vendor: this.snapshot.vendor,
                        secureContext: this.snapshot.secureContext,
                        crossOriginIsolated: this.snapshot.crossOriginIsolated,
                        referrer: this.snapshot.referrer,
                        historyLength: this.snapshot.historyLength
                    })
                },
                {
                    title: "Red y persistencia",
                    badge: "network",
                    content: this.prettyPrint({
                        publicIp: this.snapshot.publicIp,
                        ipSource: this.snapshot.ipSource,
                        isp: this.snapshot.isp,
                        city: this.snapshot.city,
                        region: this.snapshot.region,
                        country: this.snapshot.country,
                        connectionType: this.snapshot.connectionType,
                        effectiveType: this.snapshot.effectiveType,
                        downlink: this.snapshot.downlink,
                        rtt: this.snapshot.rtt,
                        saveData: this.snapshot.saveData,
                        cookiesEnabled: this.snapshot.cookiesEnabled,
                        cookieCount: this.snapshot.cookieCount,
                        localStorageItems: this.snapshot.localStorageItems,
                        sessionStorageItems: this.snapshot.sessionStorageItems,
                        storageUsage: this.snapshot.storageUsage,
                        storageQuota: this.snapshot.storageQuota,
                        storagePersisted: this.snapshot.storagePersisted,
                        thirdPartyScripts: this.snapshot.thirdPartyScripts,
                        trackerMatches: this.snapshot.trackerMatches
                    })
                },
                {
                    title: "Hardware y capacidades",
                    badge: "device",
                    content: this.prettyPrint({
                        cpuCores: this.snapshot.cpuCores,
                        deviceMemory: this.snapshot.deviceMemory,
                        maxTouchPoints: this.snapshot.maxTouchPoints,
                        screenResolution: this.snapshot.screenResolution,
                        availableScreen: this.snapshot.availableScreen,
                        viewport: this.snapshot.viewport,
                        pixelRatio: this.snapshot.pixelRatio,
                        colorDepth: this.snapshot.colorDepth,
                        orientation: this.snapshot.orientation,
                        darkMode: this.snapshot.darkMode,
                        reducedMotion: this.snapshot.reducedMotion,
                        contrast: this.snapshot.contrast,
                        colorGamut: this.snapshot.colorGamut,
                        dynamicRange: this.snapshot.dynamicRange,
                        batteryLevel: this.snapshot.batteryLevel,
                        batteryCharging: this.snapshot.batteryCharging,
                        webglVendor: this.snapshot.webglVendor,
                        webglRenderer: this.snapshot.webglRenderer
                    })
                },
                {
                    title: "Permisos y multimedia",
                    badge: "permissions",
                    content: this.prettyPrint({
                        permissionState: this.permissionState,
                        geoLat: this.snapshot.geoLat,
                        geoLon: this.snapshot.geoLon,
                        geoAccuracy: this.snapshot.geoAccuracy,
                        geoTimestamp: this.snapshot.geoTimestamp,
                        mediaDevices: this.snapshot.mediaDevices,
                        audioInputs: this.snapshot.audioInputs,
                        videoInputs: this.snapshot.videoInputs,
                        audioOutputs: this.snapshot.audioOutputs,
                        features: {
                            serviceWorker: this.snapshot.serviceWorker,
                            shareApi: this.snapshot.shareApi,
                            bluetoothApi: this.snapshot.bluetoothApi,
                            usbApi: this.snapshot.usbApi,
                            serialApi: this.snapshot.serialApi,
                            hidApi: this.snapshot.hidApi,
                            nfcApi: this.snapshot.nfcApi,
                            clipboardApi: this.snapshot.clipboardApi,
                            credentialApi: this.snapshot.credentialApi,
                            pdfViewerEnabled: this.snapshot.pdfViewerEnabled
                        },
                        issues: this.snapshot.issues
                    })
                }
            ];
        },

        permissionGrantedCount() {
            return Object.values(this.permissionState).filter((state) => state === "granted").length;
        },

        permissionPromptCount() {
            return Object.values(this.permissionState).filter((state) => state === "prompt").length;
        },

        exposureScore() {
            let score = 18;

            score += this.numericValue(this.snapshot.thirdPartyScripts) * 8;
            score += this.numericValue(this.snapshot.cookieCount) * 2;
            score += this.numericValue(this.snapshot.localStorageItems) * 3;
            score += this.permissionGrantedCount * 9;

            if (this.snapshot.publicIp !== "-" && this.snapshot.publicIp !== "No disponible") score += 10;
            if (this.snapshot.geoLat !== "-") score += 14;
            if (this.snapshot.webglRenderer !== "-") score += 6;
            if (this.snapshot.mediaDevices !== "-" && this.snapshot.mediaDevices !== "0") score += 4;
            if (this.snapshot.globalPrivacyControl === "Activado") score -= 6;
            if (this.snapshot.doNotTrack === "Activado") score -= 4;

            return Math.max(0, Math.min(100, score));
        }
    },

    mounted() {
        this.refreshAll().finally(() => {
            this.requestGeoLocation({ automatic: true });
        });
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("online", this.handleConnectivityChange);
        window.addEventListener("offline", this.handleConnectivityChange);

        if (navigator.connection && typeof navigator.connection.addEventListener === "function") {
            navigator.connection.addEventListener("change", this.handleConnectivityChange);
        }
    },

    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("online", this.handleConnectivityChange);
        window.removeEventListener("offline", this.handleConnectivityChange);

        if (navigator.connection && typeof navigator.connection.removeEventListener === "function") {
            navigator.connection.removeEventListener("change", this.handleConnectivityChange);
        }
    },

    methods: {
        async refreshAll() {
            this.loading = true;
            this.statusMessage = "Leyendo red, entorno, almacenamiento, permisos y capacidades...";
            this.snapshot.issues = [];
            this.snapshot.scannedAt = new Date().toLocaleString();

            this.captureEnvironment();

            const tasks = [
                this.fetchPublicIp(),
                this.inspectStorage(),
                this.inspectPermissions(),
                this.inspectMediaDevices(),
                this.inspectBattery(),
                this.inspectWebGl()
            ];

            await Promise.allSettled(tasks);
            this.buildReport();
            this.statusMessage = "Lectura actualizada con datos visibles del cliente.";
            this.loading = false;
        },

        captureEnvironment() {
            const nav = navigator;
            const connection = nav.connection || nav.mozConnection || nav.webkitConnection || null;
            const intl = Intl.DateTimeFormat().resolvedOptions();

            this.snapshot.online = nav.onLine ? "Si" : "No";
            this.snapshot.secureContext = window.isSecureContext ? "Si" : "No";
            this.snapshot.crossOriginIsolated = window.crossOriginIsolated ? "Si" : "No";
            this.snapshot.browser = this.detectBrowser(nav.userAgent);
            this.snapshot.browserVersion = this.detectBrowserVersion(nav.userAgent);
            this.snapshot.engine = this.detectEngine(nav.userAgent);
            this.snapshot.os = this.detectOS(nav.userAgent);
            this.snapshot.platform = nav.userAgentData?.platform || nav.platform || "No expuesto";
            this.snapshot.userAgent = nav.userAgent || "No expuesto";
            this.snapshot.language = nav.language || "No expuesto";
            this.snapshot.languages = Array.isArray(nav.languages) && nav.languages.length ? nav.languages.join(", ") : "No expuesto";
            this.snapshot.locale = intl.locale || "No expuesto";
            this.snapshot.timezone = intl.timeZone || "No expuesto";
            this.snapshot.vendor = nav.vendor || "No expuesto";
            this.snapshot.cookiesEnabled = nav.cookieEnabled ? "Si" : "No";
            this.snapshot.doNotTrack = nav.doNotTrack === "1" ? "Activado" : "Desactivado";
            this.snapshot.globalPrivacyControl = nav.globalPrivacyControl ? "Activado" : "No expuesto";
            this.snapshot.webdriver = nav.webdriver ? "Si" : "No";
            this.snapshot.connectionType = connection?.type || "No expuesto";
            this.snapshot.effectiveType = connection?.effectiveType || "No expuesto";
            this.snapshot.downlink = connection?.downlink ? `${connection.downlink} Mbps` : "No expuesto";
            this.snapshot.rtt = connection?.rtt ? `${connection.rtt} ms` : "No expuesto";
            this.snapshot.saveData = connection?.saveData ? "Si" : "No";
            this.snapshot.cpuCores = nav.hardwareConcurrency ? String(nav.hardwareConcurrency) : "No expuesto";
            this.snapshot.deviceMemory = nav.deviceMemory ? `${nav.deviceMemory} GB` : "No expuesto";
            this.snapshot.maxTouchPoints = String(nav.maxTouchPoints || 0);
            this.snapshot.screenResolution = `${window.screen.width} x ${window.screen.height}`;
            this.snapshot.availableScreen = `${window.screen.availWidth} x ${window.screen.availHeight}`;
            this.snapshot.viewport = `${window.innerWidth} x ${window.innerHeight}`;
            this.snapshot.pixelRatio = String(window.devicePixelRatio || 1);
            this.snapshot.colorDepth = `${window.screen.colorDepth} bits`;
            this.snapshot.orientation = window.screen.orientation?.type || "No expuesto";
            this.snapshot.darkMode = this.matchMediaState("(prefers-color-scheme: dark)");
            this.snapshot.reducedMotion = this.matchMediaState("(prefers-reduced-motion: reduce)");
            this.snapshot.contrast = this.detectContrast();
            this.snapshot.colorGamut = this.detectColorGamut();
            this.snapshot.dynamicRange = this.matchMedia("(dynamic-range: high)") ? "Alta" : "Estandar o no expuesto";
            this.snapshot.historyLength = String(window.history.length);
            this.snapshot.referrer = document.referrer || "Directo / vacio";
            this.snapshot.localStorageItems = this.safeStorageLength(window.localStorage);
            this.snapshot.sessionStorageItems = this.safeStorageLength(window.sessionStorage);
            this.snapshot.cookieCount = document.cookie ? String(document.cookie.split(";").filter(Boolean).length) : "0";
            this.captureScriptSurface();
            this.captureFeatureSurface();
        },

        async fetchPublicIp() {
            this.publicIpStatus = "Cargando";

            const sources = [
                {
                    name: "ipwho.is",
                    url: "https://ipwho.is/",
                    map: (json) => ({
                        publicIp: json.ip,
                        city: json.city,
                        region: json.region,
                        country: json.country,
                        timezone: json.timezone?.id || json.timezone?.timezone || this.snapshot.timezone,
                        isp: json.connection?.isp || "No expuesto"
                    })
                },
                {
                    name: "ipapi.co",
                    url: "https://ipapi.co/json/",
                    map: (json) => ({
                        publicIp: json.ip,
                        city: json.city,
                        region: json.region,
                        country: json.country_name,
                        timezone: json.timezone,
                        isp: json.org || "No expuesto"
                    })
                }
            ];

            for (const source of sources) {
                try {
                    const response = await fetch(source.url);
                    if (!response.ok) continue;

                    const json = await response.json();
                    const mapped = source.map(json);
                    if (!mapped.publicIp) continue;

                    this.snapshot.publicIp = mapped.publicIp;
                    this.snapshot.city = mapped.city || "No expuesto";
                    this.snapshot.region = mapped.region || "No expuesto";
                    this.snapshot.country = mapped.country || "No expuesto";
                    this.snapshot.timezone = mapped.timezone || this.snapshot.timezone;
                    this.snapshot.isp = mapped.isp || "No expuesto";
                    this.snapshot.ipSource = source.name;
                    this.publicIpStatus = "Disponible";
                    return;
                } catch (error) {
                    continue;
                }
            }

            this.snapshot.publicIp = "No disponible";
            this.snapshot.ipSource = "Sin respuesta";
            this.publicIpStatus = "Error";
            this.snapshot.issues.push("No se pudo resolver la IP publica desde los proveedores externos.");
        },

        async inspectStorage() {
            try {
                if (!navigator.storage || typeof navigator.storage.estimate !== "function") {
                    this.snapshot.storageEstimateStatus = "StorageManager no disponible";
                    this.snapshot.storageUsage = "No expuesto";
                    this.snapshot.storageQuota = "No expuesto";
                    this.snapshot.storagePersisted = "No expuesto";
                    return;
                }

                const estimate = await navigator.storage.estimate();
                this.snapshot.storageUsage = this.formatBytes(estimate.usage);
                this.snapshot.storageQuota = this.formatBytes(estimate.quota);
                this.snapshot.storageEstimateStatus = "Estimate disponible";

                if (typeof navigator.storage.persisted === "function") {
                    const persisted = await navigator.storage.persisted();
                    this.snapshot.storagePersisted = persisted ? "Si" : "No";
                }
            } catch (error) {
                this.snapshot.storageEstimateStatus = "No se pudo estimar storage";
                this.snapshot.storageUsage = "No expuesto";
                this.snapshot.storageQuota = "No expuesto";
                this.snapshot.storagePersisted = "No expuesto";
                this.snapshot.issues.push("El navegador no permitio consultar el uso de almacenamiento.");
            }
        },

        async inspectPermissions() {
            if (!navigator.permissions || typeof navigator.permissions.query !== "function") {
                this.permissionState = {};
                this.snapshot.issues.push("Permissions API no disponible en este navegador.");
                return;
            }

            const states = {};

            for (const permission of PERMISSION_MAP) {
                try {
                    const result = await navigator.permissions.query({ name: permission.key });
                    states[permission.key] = result.state;
                } catch (error) {
                    states[permission.key] = "unsupported";
                }
            }

            this.permissionState = states;
            this.snapshot.geoPermission = this.formatPermission(states.geolocation);
            this.snapshot.notificationPermission = this.formatPermission(states.notifications);
            this.snapshot.cameraPermission = this.formatPermission(states.camera);
            this.snapshot.microphonePermission = this.formatPermission(states.microphone);
            this.snapshot.clipboardReadPermission = this.formatPermission(states["clipboard-read"]);
            this.snapshot.clipboardWritePermission = this.formatPermission(states["clipboard-write"]);
        },

        async inspectMediaDevices() {
            try {
                if (!navigator.mediaDevices || typeof navigator.mediaDevices.enumerateDevices !== "function") {
                    this.snapshot.mediaDevices = "No soportado";
                    this.snapshot.audioInputs = "No soportado";
                    this.snapshot.videoInputs = "No soportado";
                    this.snapshot.audioOutputs = "No soportado";
                    return;
                }

                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter((item) => item.kind === "audioinput").length;
                const videoInputs = devices.filter((item) => item.kind === "videoinput").length;
                const audioOutputs = devices.filter((item) => item.kind === "audiooutput").length;

                this.snapshot.mediaDevices = String(devices.length);
                this.snapshot.audioInputs = String(audioInputs);
                this.snapshot.videoInputs = String(videoInputs);
                this.snapshot.audioOutputs = String(audioOutputs);
            } catch (error) {
                this.snapshot.mediaDevices = "Bloqueado";
                this.snapshot.audioInputs = "Bloqueado";
                this.snapshot.videoInputs = "Bloqueado";
                this.snapshot.audioOutputs = "Bloqueado";
                this.snapshot.issues.push("No fue posible enumerar los dispositivos multimedia.");
            }
        },

        async inspectBattery() {
            try {
                if (typeof navigator.getBattery !== "function") {
                    this.snapshot.batteryLevel = "No soportado";
                    this.snapshot.batteryCharging = "No soportado";
                    this.snapshot.batteryTime = "No soportado";
                    return;
                }

                const battery = await navigator.getBattery();
                this.snapshot.batteryLevel = `${Math.round(battery.level * 100)}%`;
                this.snapshot.batteryCharging = battery.charging ? "Cargando" : "Descargando";
                this.snapshot.batteryTime = battery.charging
                    ? (battery.chargingTime === Infinity ? "Tiempo indeterminado" : `${battery.chargingTime}s para carga`)
                    : (battery.dischargingTime === Infinity ? "Tiempo indeterminado" : `${battery.dischargingTime}s restantes`);
            } catch (error) {
                this.snapshot.batteryLevel = "No expuesto";
                this.snapshot.batteryCharging = "No expuesto";
                this.snapshot.batteryTime = "No expuesto";
            }
        },

        async inspectWebGl() {
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

                if (!gl) {
                    this.snapshot.webglVendor = "No disponible";
                    this.snapshot.webglRenderer = "No disponible";
                    return;
                }

                const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                this.snapshot.webglVendor = debugInfo
                    ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
                    : "Generico";
                this.snapshot.webglRenderer = debugInfo
                    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                    : "Renderer oculto";
            } catch (error) {
                this.snapshot.webglVendor = "No disponible";
                this.snapshot.webglRenderer = "No disponible";
            }
        },

        captureScriptSurface() {
            const currentHost = window.location.host;
            const scripts = Array.from(document.scripts || []);
            let firstParty = 0;
            let thirdParty = 0;
            let trackerHits = 0;

            scripts.forEach((script) => {
                if (!script.src) return;

                try {
                    const url = new URL(script.src, window.location.href);
                    const isFirstParty = url.host === currentHost;

                    if (isFirstParty) {
                        firstParty += 1;
                    } else {
                        thirdParty += 1;
                    }

                    trackerHits += TRACKER_PATTERNS.some((item) => item.pattern.test(url.href)) ? 1 : 0;
                } catch (error) {
                    firstParty += 1;
                }
            });

            this.snapshot.firstPartyScripts = String(firstParty);
            this.snapshot.thirdPartyScripts = String(thirdParty);
            this.snapshot.trackerMatches = String(trackerHits);
        },

        captureFeatureSurface() {
            const nav = navigator;
            this.snapshot.pluginsCount = typeof nav.plugins?.length === "number" ? String(nav.plugins.length) : "No expuesto";
            this.snapshot.mimeTypesCount = typeof nav.mimeTypes?.length === "number" ? String(nav.mimeTypes.length) : "No expuesto";
            this.snapshot.serviceWorker = "serviceWorker" in nav ? "Si" : "No";
            this.snapshot.shareApi = "share" in nav ? "Si" : "No";
            this.snapshot.bluetoothApi = "bluetooth" in nav ? "Si" : "No";
            this.snapshot.usbApi = "usb" in nav ? "Si" : "No";
            this.snapshot.serialApi = "serial" in nav ? "Si" : "No";
            this.snapshot.hidApi = "hid" in nav ? "Si" : "No";
            this.snapshot.nfcApi = "NDEFReader" in window ? "Si" : "No";
            this.snapshot.clipboardApi = nav.clipboard ? "Si" : "No";
            this.snapshot.credentialApi = "credentials" in nav ? "Si" : "No";
            this.snapshot.pdfViewerEnabled = typeof nav.pdfViewerEnabled === "boolean" ? (nav.pdfViewerEnabled ? "Si" : "No") : "No expuesto";
        },

        async requestGeoLocation(options = {}) {
            if (!navigator.geolocation) {
                this.pushIssue("Geolocation API no soportada.");
                this.buildReport();
                return false;
            }

            if (this.geoLoading) {
                return false;
            }

            this.geoLoading = true;
            this.statusMessage = options.automatic
                ? "Solicitando ubicacion al acceder..."
                : "Esperando permiso y lectura de geolocalizacion...";

            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.snapshot.geoLat = position.coords.latitude.toFixed(5);
                        this.snapshot.geoLon = position.coords.longitude.toFixed(5);
                        this.snapshot.geoAccuracy = `${Math.round(position.coords.accuracy)} m`;
                        this.snapshot.geoTimestamp = new Date(position.timestamp).toLocaleString();
                        this.statusMessage = "Ubicacion local actualizada.";
                        this.geoLoading = false;
                        this.inspectPermissions().finally(() => {
                            this.buildReport();
                            resolve(true);
                        });
                    },
                    (error) => {
                        this.pushIssue(`Geolocalizacion: ${this.describeGeolocationError(error)}`);
                        this.statusMessage = "No se pudo completar la geolocalizacion.";
                        this.geoLoading = false;
                        this.inspectPermissions().finally(() => {
                            this.buildReport();
                            resolve(false);
                        });
                    },
                    {
                        enableHighAccuracy: false,
                        maximumAge: 60000,
                        timeout: 10000
                    }
                );
            });
        },

        describeGeolocationError(error) {
            if (error?.code === 1) return "permiso denegado por el navegador.";
            if (error?.code === 2) return "posicion no disponible.";
            if (error?.code === 3) return "tiempo de espera agotado.";
            return error?.message || "error desconocido.";
        },

        pushIssue(message) {
            if (!message || this.snapshot.issues.includes(message)) {
                return;
            }

            this.snapshot.issues.push(message);
        },

        downloadJson() {
            const payload = this.buildExportPayload();
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");

            link.href = url;
            link.download = `identidad-gollum-${stamp}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            this.statusMessage = "JSON descargado con la lectura actual.";
        },

        buildExportPayload() {
            return {
                tool: "Identidad de Gollum",
                scannedAt: this.snapshot.scannedAt,
                exposureScore: this.exposureScore,
                permissionState: this.permissionState,
                findings: this.operationalFindings.map((item) => ({
                    label: item.label,
                    value: item.value,
                    note: item.note
                })),
                snapshot: {
                    ...this.snapshot,
                    issues: [...this.snapshot.issues]
                }
            };
        },

        async copyReport() {
            if (!this.reportText || !navigator.clipboard?.writeText) return;

            this.copying = true;

            try {
                await navigator.clipboard.writeText(this.reportText);
                this.statusMessage = "Informe copiado al portapapeles.";
            } catch (error) {
                this.statusMessage = "No se pudo copiar el informe desde este navegador.";
            } finally {
                this.copying = false;
            }
        },

        buildReport() {
            this.reportText = [
                `Identidad de Gollum`,
                `Escaneo: ${this.snapshot.scannedAt}`,
                "",
                `[Resumen]`,
                `Exposicion local: ${this.exposureScore}/100`,
                `Permisos concedidos: ${this.permissionGrantedCount}`,
                `Scripts de terceros: ${this.snapshot.thirdPartyScripts}`,
                "",
                `[Red]`,
                `IP publica: ${this.snapshot.publicIp}`,
                `Proveedor: ${this.snapshot.isp}`,
                `Ubicacion IP: ${this.snapshot.city}, ${this.snapshot.region}, ${this.snapshot.country}`,
                `Conexion: ${this.snapshot.connectionType} / ${this.snapshot.effectiveType}`,
                `Downlink: ${this.snapshot.downlink}`,
                `RTT: ${this.snapshot.rtt}`,
                "",
                `[Navegador]`,
                `Browser: ${this.composeBrowserLabel()}`,
                `OS: ${this.snapshot.os}`,
                `Idioma: ${this.snapshot.language}`,
                `Zona horaria: ${this.snapshot.timezone}`,
                `User Agent: ${this.snapshot.userAgent}`,
                "",
                `[Privacidad]`,
                `Cookies: ${this.snapshot.cookiesEnabled} (${this.snapshot.cookieCount})`,
                `Do Not Track: ${this.snapshot.doNotTrack}`,
                `Global Privacy Control: ${this.snapshot.globalPrivacyControl}`,
                `Storage usado: ${this.snapshot.storageUsage}`,
                `Storage persistente: ${this.snapshot.storagePersisted}`,
                "",
                `[Hardware]`,
                `CPU: ${this.snapshot.cpuCores}`,
                `RAM: ${this.snapshot.deviceMemory}`,
                `Pantalla: ${this.snapshot.screenResolution}`,
                `Viewport: ${this.snapshot.viewport}`,
                `GPU: ${this.snapshot.webglVendor} / ${this.snapshot.webglRenderer}`,
                "",
                `[Permisos]`,
                ...PERMISSION_MAP.map((item) => `${item.label}: ${this.formatPermission(this.permissionState[item.key])}`),
                "",
                `[Geolocalizacion]`,
                `Latitud: ${this.snapshot.geoLat}`,
                `Longitud: ${this.snapshot.geoLon}`,
                `Precision: ${this.snapshot.geoAccuracy}`,
                "",
                `[Incidencias]`,
                ...(this.snapshot.issues.length ? this.snapshot.issues : ["Sin incidencias relevantes"])
            ].join("\n");
        },

        handleResize() {
            this.snapshot.viewport = `${window.innerWidth} x ${window.innerHeight}`;
            this.buildReport();
        },

        handleConnectivityChange() {
            this.captureEnvironment();
            this.buildReport();
        },

        buildCard(label, value, note, tone = "tone-neutral") {
            return {
                label,
                value,
                note,
                tone
            };
        },

        formatPermission(state) {
            if (state === "granted") return "Concedido";
            if (state === "denied") return "Denegado";
            if (state === "prompt") return "Pendiente";
            if (state === "unsupported") return "No soportado";
            return "No consultado";
        },

        permissionTone(state) {
            if (state === "granted") return "tone-warning";
            if (state === "denied") return "tone-success";
            if (state === "prompt") return "tone-neutral";
            return "tone-neutral";
        },

        booleanTone(value) {
            return value === "Si" || value === "Activado" ? "tone-success" : "tone-neutral";
        },

        scoreTone(score, highMeansWarning = false) {
            if (highMeansWarning) {
                if (score >= 70) return "tone-warning";
                if (score >= 45) return "tone-success";
                return "tone-neutral";
            }

            if (score >= 70) return "tone-success";
            if (score >= 45) return "tone-warning";
            return "tone-danger";
        },

        numericValue(value) {
            const parsed = Number.parseInt(String(value), 10);
            return Number.isFinite(parsed) ? parsed : 0;
        },

        safeStorageLength(storage) {
            try {
                return String(storage.length);
            } catch (error) {
                return "No accesible";
            }
        },

        matchMedia(query) {
            return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
        },

        matchMediaState(query) {
            return this.matchMedia(query) ? "Si" : "No";
        },

        detectContrast() {
            if (this.matchMedia("(prefers-contrast: more)")) return "Mas contraste";
            if (this.matchMedia("(prefers-contrast: less)")) return "Menos contraste";
            return "Normal o no expuesto";
        },

        detectColorGamut() {
            if (this.matchMedia("(color-gamut: rec2020)")) return "rec2020";
            if (this.matchMedia("(color-gamut: p3)")) return "p3";
            if (this.matchMedia("(color-gamut: srgb)")) return "srgb";
            return "No expuesto";
        },

        formatBytes(value) {
            if (typeof value !== "number" || Number.isNaN(value)) return "No expuesto";
            if (value === 0) return "0 B";

            const units = ["B", "KB", "MB", "GB", "TB"];
            const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
            const amount = value / (1024 ** exponent);
            return `${amount.toFixed(amount >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
        },

        prettyPrint(value) {
            try {
                return JSON.stringify(value, null, 2);
            } catch (error) {
                return String(value);
            }
        },

        compactValue(value) {
            const text = String(value || "-");
            return text.length > 120 ? `${text.slice(0, 117)}...` : text;
        },

        composeBrowserLabel() {
            return `${this.snapshot.browser} ${this.snapshot.browserVersion}`.trim();
        },

        detectBrowser(ua) {
            if (/Edg\//i.test(ua)) return "Edge";
            if (/OPR\//i.test(ua)) return "Opera";
            if (/Firefox\//i.test(ua)) return "Firefox";
            if (/Chrome\//i.test(ua)) return "Chrome";
            if (/Safari\//i.test(ua)) return "Safari";
            return "Otro";
        },

        detectBrowserVersion(ua) {
            const matchers = [
                /Edg\/([\d.]+)/i,
                /OPR\/([\d.]+)/i,
                /Firefox\/([\d.]+)/i,
                /Chrome\/([\d.]+)/i,
                /Version\/([\d.]+)/i
            ];

            for (const matcher of matchers) {
                const match = ua.match(matcher);
                if (match) return match[1];
            }

            return "N/D";
        },

        detectEngine(ua) {
            if (/AppleWebKit/i.test(ua) && /Chrome|Edg|OPR/i.test(ua)) return "Blink";
            if (/AppleWebKit/i.test(ua) && /Safari/i.test(ua)) return "WebKit";
            if (/Gecko\//i.test(ua) && /Firefox/i.test(ua)) return "Gecko";
            return "No detectado";
        },

        detectOS(ua) {
            if (/Windows NT/i.test(ua)) return "Windows";
            if (/Android/i.test(ua)) return "Android";
            if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
            if (/Mac OS X/i.test(ua)) return "macOS";
            if (/Linux/i.test(ua)) return "Linux";
            return "Otro";
        }
    }
};
</script>

<style scoped>
.gollum-page {
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

.intro-box,
.section-heading,
.module-header {
    display: grid;
    gap: 10px;
}

.section-kicker {
    color: #94a3b8;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.section-name,
.module-title {
    margin: 0;
    color: #f8fafc;
    font-size: clamp(1.45rem, 2.1vw, 2rem);
    font-weight: 700;
}

.section-copy {
    margin: 0;
    color: #9ca3af;
    line-height: 1.7;
    max-width: 960px;
}

.tool-card,
.signal-card,
.metric-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
}

.metric-card label,
.signal-card label {
    color: #9ca3af;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    display: block;
    margin-bottom: 6px;
}

.inline-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 18px 0 10px;
}

.helper-copy {
    margin: 0 0 20px;
    color: #94a3b8;
    line-height: 1.6;
}

.btn-main,
.btn-subtle {
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 600;
}

.btn-main {
    background: #334155;
    color: #f8fafc;
    border: 1px solid #475569;
}

.btn-main:hover,
.btn-main:focus {
    background: #475569;
    color: #f8fafc;
}

.btn-main:disabled,
.btn-subtle:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.btn-subtle {
    background: #0f172a;
    color: #dbe4ee;
    border: 1px solid #334155;
}

.btn-subtle:hover,
.btn-subtle:focus {
    background: #1e293b;
    color: #f8fafc;
}

.metric-card,
.signal-card {
    padding: 14px;
    height: 100%;
    display: grid;
    gap: 4px;
}

.metric-card span,
.signal-card span {
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 600;
    word-break: break-word;
}

.metric-card small,
.signal-card small {
    color: #94a3b8;
    line-height: 1.5;
}

.subsection-title {
    margin: 0 0 14px;
    color: #e2e8f0;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.verdict-card {
    display: flex;
    gap: 14px;
    border-radius: 10px;
    padding: 16px 18px;
    border: 1px solid rgba(148, 163, 184, 0.22);
}

.verdict-icon {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.8);
    color: #e2e8f0;
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.verdict-body strong {
    display: block;
    color: #f8fafc;
    margin-bottom: 4px;
}

.verdict-body p {
    margin: 0;
    color: #c9d4df;
    line-height: 1.6;
}

.verdict-success {
    background: rgba(22, 101, 52, 0.14);
    border-color: rgba(34, 197, 94, 0.3);
}

.verdict-warning {
    background: rgba(146, 64, 14, 0.14);
    border-color: rgba(245, 158, 11, 0.3);
}

.verdict-neutral {
    background: rgba(30, 41, 59, 0.45);
    border-color: rgba(148, 163, 184, 0.24);
}

.finding-list {
    display: grid;
    gap: 8px;
}

.finding-row {
    display: grid;
    grid-template-columns: minmax(130px, 0.8fr) minmax(120px, 0.7fr) minmax(0, 2fr);
    gap: 12px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid #1e293b;
    border-radius: 8px;
    background: #020617;
}

.finding-row strong {
    color: #e2e8f0;
    font-size: 0.86rem;
}

.finding-row span {
    font-weight: 700;
}

.finding-row small {
    color: #94a3b8;
    line-height: 1.45;
}

.tool-card {
    padding: 16px;
    display: grid;
    gap: 12px;
    height: 100%;
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
    text-transform: uppercase;
}

.output-box {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 14px;
    max-height: 420px;
    overflow: auto;
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

@media (max-width: 767px) {
    .section-box {
        padding: 18px;
    }

    .finding-row {
        grid-template-columns: 1fr;
        gap: 4px;
    }

    .inline-actions {
        flex-direction: column;
    }

    .inline-actions .btn {
        width: 100%;
    }

    .card-head {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
