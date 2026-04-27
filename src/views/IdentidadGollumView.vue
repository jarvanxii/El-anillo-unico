<template>
    <div class="gollum-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-pippin.png" alt="La identidad de Gollum" />
        </section>

        <main class="content container">

            <!-- RED -->
            <section class="section-box">
                <h2 class="section-title">🌐 Red y Conectividad</h2>
                <div class="row g-3">
                    <div class="col-md-4" v-for="item in networkFields" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span>{{ item.value }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SISTEMA -->
            <section class="section-box">
                <h2 class="section-title">💻 Sistema</h2>
                <div class="row g-3">
                    <div class="col-md-4" v-for="item in systemFields" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span :class="{ small: item.small }">{{ item.value }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- HARDWARE -->
            <section class="section-box">
                <h2 class="section-title">🧠 Hardware</h2>
                <div class="row g-3">
                    <div class="col-md-4" v-for="item in hardwareFields" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span>{{ item.value }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PANTALLA -->
            <section class="section-box">
                <h2 class="section-title">🖥️ Pantalla</h2>
                <div class="row g-3">
                    <div class="col-md-4" v-for="item in screenFields" :key="item.label">
                        <div class="item">
                            <label>{{ item.label }}</label>
                            <span>{{ item.value }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- GEO -->
            <section class="section-box">
                <h2 class="section-title">📍 Ubicación</h2>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <div class="item">
                            <label>Latitud</label>
                            <span>{{ data.lat }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="item">
                            <label>Longitud</label>
                            <span>{{ data.lon }}</span>
                        </div>
                    </div>
                </div>

                <button class="btn btn-main" @click="getGeoLocation">
                    Obtener ubicación
                </button>
            </section>

            <!-- IDENTIDAD DIGITAL -->
            <section class="section-box">
                <h2 class="section-title">🕵️ Identidad Digital</h2>

                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="item">
                            <label>Fingerprint</label>
                            <span>{{ data.fingerprint }}</span>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="item">
                            <label>Trackers</label>
                            <span>{{ data.trackers }}</span>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="item">
                            <label>Cookies</label>
                            <span>{{ data.cookieCount }}</span>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="item">
                            <label>IP sospechosa</label>
                            <span>{{ data.proxy }}</span>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="item">
                            <label>Riesgo privacidad</label>
                            <span>{{ data.privacyScore }}</span>
                        </div>
                    </div>
                </div>

                <button class="btn btn-main mt-3" @click="analyzeDigitalIdentity">
                    Analizar identidad
                </button>
            </section>

        </main>
    </div>
</template>

<script>
export default {
    name: "GollumPage",

    data() {
        return {
            data: {
                publicIp: "Detectando...",
                privateIp: "-",
                isp: "-",
                city: "-",
                country: "-",
                timezone: "-",

                connectionType: "-",
                downlink: "-",
                rtt: "-",

                os: "-",
                browser: "-",
                userAgent: "-",
                language: "-",
                languages: "-",
                cookies: "-",
                online: "-",
                dnt: "-",

                cpu: "-",
                ram: "-",
                touch: "-",

                screen: "-",
                viewport: "-",
                pixelRatio: "-",
                colorDepth: "-",
                darkMode: "-",

                lat: "-",
                lon: "-",

                fingerprint: "-",
                trackers: "-",
                cookieCount: "-",
                proxy: "-",
                privacyScore: "-"
            }
        };
    },

    computed: {
        networkFields() {
            return [
                { label: "IP Pública", value: this.data.publicIp },
                { label: "IP Privada", value: this.data.privateIp },
                { label: "Proveedor", value: this.data.isp },
                { label: "Ciudad", value: this.data.city },
                { label: "País", value: this.data.country },
                { label: "Zona Horaria", value: this.data.timezone }
            ];
        },

        systemFields() {
            return [
                { label: "Sistema Operativo", value: this.data.os },
                { label: "Navegador", value: this.data.browser },
                { label: "User Agent", value: this.data.userAgent, small: true },
                { label: "Idioma", value: this.data.language },
                { label: "Idiomas", value: this.data.languages },
                { label: "Cookies", value: this.data.cookies },
                { label: "Online", value: this.data.online },
                { label: "Do Not Track", value: this.data.dnt }
            ];
        },

        hardwareFields() {
            return [
                { label: "CPU Núcleos", value: this.data.cpu },
                { label: "RAM", value: this.data.ram },
                { label: "Touch", value: this.data.touch }
            ];
        },

        screenFields() {
            return [
                { label: "Resolución", value: this.data.screen },
                { label: "Viewport", value: this.data.viewport },
                { label: "Modo Oscuro", value: this.data.darkMode }
            ];
        }
    },

    mounted() {
        this.loadBasicInfo();
        this.getPublicIp();
    },

    methods: {
        async getPublicIp() {
            const res = await fetch("https://ipapi.co/json/");
            const json = await res.json();

            this.data.publicIp = json.ip;
            this.data.city = json.city;
            this.data.country = json.country_name;
            this.data.timezone = json.timezone;
            this.data.isp = json.org;
        },

        loadBasicInfo() {
            const nav = navigator;

            this.data.userAgent = nav.userAgent;
            this.data.language = nav.language;
            this.data.languages = nav.languages?.join(", ");
            this.data.cookies = nav.cookieEnabled ? "Sí" : "No";
            this.data.online = nav.onLine ? "Sí" : "No";
            this.data.dnt = nav.doNotTrack === "1" ? "Activado" : "Desactivado";

            this.data.cpu = nav.hardwareConcurrency;
            this.data.ram = nav.deviceMemory + " GB";
            this.data.touch = nav.maxTouchPoints;

            this.data.screen = `${screen.width} x ${screen.height}`;
            this.data.viewport = `${window.innerWidth} x ${window.innerHeight}`;
            this.data.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "Sí" : "No";

            this.data.os = this.detectOS(nav.userAgent);
            this.data.browser = this.detectBrowser(nav.userAgent);
        },

        detectOS(ua) {
            if (/Windows/i.test(ua)) return "Windows";
            if (/Mac/i.test(ua)) return "MacOS";
            if (/Linux/i.test(ua)) return "Linux";
            return "Otro";
        },

        detectBrowser(ua) {
            if (/Chrome/i.test(ua)) return "Chrome";
            if (/Firefox/i.test(ua)) return "Firefox";
            if (/Safari/i.test(ua)) return "Safari";
            return "Otro";
        },

        analyzeDigitalIdentity() {
            this.generateFingerprint();
            this.analyzeCookies();
            this.detectTrackers();
            this.calculatePrivacyScore();
        },

        generateFingerprint() {
            const fp = [
                navigator.userAgent,
                navigator.language,
                screen.width,
                screen.height
            ].join("|");

            this.data.fingerprint = btoa(fp).substring(0, 20);
        },

        analyzeCookies() {
            const cookies = document.cookie ? document.cookie.split(";") : [];
            this.data.cookieCount = cookies.length;
        },

        detectTrackers() {
            const scripts = [...document.scripts].map(s => s.src);
            this.data.trackers = scripts.filter(src => src.includes("google")).length;
        },

        calculatePrivacyScore() {
            let score = 100;
            if (this.data.cookieCount > 5) score -= 20;
            if (this.data.trackers > 0) score -= 30;
            this.data.privacyScore = score + "/100";
        },

        getGeoLocation() {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    this.data.lat = pos.coords.latitude.toFixed(5);
                    this.data.lon = pos.coords.longitude.toFixed(5);
                }
            );
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

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

.section-title {
    color: #cbd5e1;
    border-left: 4px solid #475569;
    padding-left: 10px;
    font-weight: 600;
    margin-bottom: 15px;
}

.section-box {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.item {
    background: #020617;
    border: 1px solid #1e293b;
    padding: 12px;
    border-radius: 8px;
}

label {
    color: #9ca3af;
    font-size: 13px;
    display: block;
    margin-bottom: 4px;
}

span {
    color: #e5e7eb;
    font-weight: 500;
    word-break: break-word;
}

.small {
    font-size: 12px;
}

.btn-main {
    background: #334155;
    color: #f1f5f9;
    border: 1px solid #475569;
    padding: 6px 14px;
    border-radius: 6px;
}

.btn-main:hover {
    background: #475569;
}
</style>