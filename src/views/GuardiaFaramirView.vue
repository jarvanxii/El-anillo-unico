<template>
    <div class="faramir-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-faramir.png" />
        </section>
        <main class="content container">
            <section class="section-box">
                <h2 class="text-center">Análisis de seguridad de URL</h2>
                <div class="url-box">
                    <input v-model="url" placeholder="https://ejemplo.com" />
                    <button @click="analyze">Analizar</button>
                </div>
                <div v-if="loading" class="loading">Analizando...</div>
                <div v-if="results">
                    <section class="card">
                        <h3>🌐 Información HTTP</h3>
                        <pre>{{ results.http }}</pre>
                    </section>
                    <section class="card">
                        <h3>🛡 Cabeceras de seguridad</h3>
                        <pre>{{ results.headers }}</pre>
                    </section>
                    <section class="card">
                        <h3>📂 robots.txt</h3>
                        <pre>{{ results.robots }}</pre>
                    </section>
                    <section class="card">
                        <h3>🗺 sitemap.xml</h3>
                        <pre>{{ results.sitemap }}</pre>
                    </section>
                    <section class="card">
                        <h3>⚠ Malware (URLHaus)</h3>
                        <pre>{{ results.malware }}</pre>
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: "",
            loading: false,
            results: null
        };
    },

    methods: {
        async fetchWithProxy(url) {
            const proxies = [
                `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
                `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
            ];
            for (let proxy of proxies) {
                try {
                    const res = await fetch(proxy);
                    if (res.ok) return await res.text();
                } catch {}
            }
            return "No accesible";
        },

        async analyze() {
            if (!this.url.startsWith("http")) {
                alert("URL inválida");
                return;
            }
            this.loading = true;
            this.results = null;
            const target = this.url.replace(/\/$/, "");
            let http = {};
            try {
                const res = await fetch(target, { redirect: "follow" });
                http = {
                    final_url: res.url,
                    status: res.status,
                    redirected: res.redirected,
                    https: res.url.startsWith("https"),
                    headers: [...res.headers.entries()]
                };
            } catch {
                http = "No accesible por CORS";
            }
            let headers = "No disponible";
            try {
                const raw = await this.fetchWithProxy(
                    `https://securityheaders.com/?q=${target}&followRedirects=on&format=json`
                );
                headers = raw.includes("{")
                    ? JSON.parse(raw)
                    : raw;
            } catch {
                headers = "Error al obtener cabeceras";
            }
            const robots = await this.fetchWithProxy(`${target}/robots.txt`);
            const sitemap = await this.fetchWithProxy(`${target}/sitemap.xml`);
            let malware = {};
            try {
                malware = await fetch("https://urlhaus-api.abuse.ch/v1/url/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `url=${encodeURIComponent(target)}`
                }).then(r => r.json());
            } catch {
                malware = "No disponible";
            }
            this.results = {
                http,
                headers,
                robots,
                sitemap,
                malware
            };
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.faramir-page {
    background: #0f1419;
    color: #e8f4fd;
    min-height: 100vh;
}

.hero-banner img {
    margin-top: 53px;
    width: 100%;
}

.content {
    padding: 40px;
}

.url-box {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.url-box input {
    width: 60%;
    padding: 10px;
}

.url-box button {
    padding: 10px 20px;
}

.card {
    background: #1a1f25;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
}

pre {
    background: #111;
    padding: 10px;
    border-radius: 8px;
}
</style>