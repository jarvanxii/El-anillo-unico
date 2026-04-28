<template>
    <div class="mirror-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-galadriel.png" alt="El espejo de Galadriel" />
        </section>

        <div class="container py-5">
            <section class="section-box intro-box">
                <div class="section-heading">
                    <span class="section-kicker">OSINT pasivo</span>
                    <h1 class="section-name">El Espejo de Galadriel</h1>
                    <p class="section-copy">
                        Un panel de reconocimiento pasivo para revisar correo, contrasenas y dominio sin backend
                        propio y sin API keys privadas. Todo lo que aparece aqui se obtiene desde fuentes publicas,
                        consultas DNS, inteligencia abierta y calculos locales en el navegador.
                    </p>
                </div>

                <div class="guide-grid">
                    <div class="guide-card">
                        <label>Sin tokens</label>
                        <span>Solo fuentes publicas o gratuitas: DNS over HTTPS, RDAP, HIBP Pwned Passwords, Gravatar,
                            SecurityHeaders, crt.sh, URLHaus y Wayback.</span>
                    </div>
                    <div class="guide-card">
                        <label>Sin backend</label>
                        <span>Las consultas salen desde el navegador. Cuando un servicio no expone CORS de forma
                            estable, se usan proxies GET publicos como fallback.</span>
                    </div>
                    <div class="guide-card">
                        <label>Lectura explicada</label>
                        <span>Cada modulo devuelve puntuacion, hallazgos, controles observables, fuentes consultadas y
                            recomendaciones accionables.</span>
                    </div>
                    <div class="guide-card">
                        <label>Privacidad local</label>
                        <span>La contrasena nunca se envia completa: solo viaja el prefijo SHA-1 al rango de HIBP,
                            siguiendo el modelo k-anonymity.</span>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Modulo 01</span>
                    <h2 class="module-title">Inteligencia de correo</h2>
                    <p class="module-copy">
                        Valida sintaxis, detecta buzones temporales o de rol, inspecciona MX, SPF, DMARC, BIMI y
                        MTA-STS del dominio, consulta RDAP publico y busca huella publica en Gravatar.
                    </p>
                </div>

                <div class="control-row">
                    <div class="control-field">
                        <label class="field-label" for="email-input">Direccion de correo</label>
                        <input
                            id="email-input"
                            v-model.trim="emailInput"
                            type="email"
                            class="form-control input-dark"
                            placeholder="usuario@dominio.com"
                            @keyup.enter="analyzeEmail"
                        />
                    </div>
                    <button class="btn btn-main action-button" :disabled="emailLoading || !emailInput" @click="analyzeEmail">
                        {{ emailLoading ? "Analizando..." : "Analizar correo" }}
                    </button>
                </div>

                <div v-if="emailLoading" class="loading-panel">
                    <div class="loading-step" v-for="step in emailSteps" :key="step.name" :class="step.state">
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

                <template v-if="emailResult && !emailLoading">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in emailResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone || scoreClass(item.numeric)">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="emailResult.verdictTone">
                        <div class="verdict-icon">
                            <span>MAIL</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ emailResult.verdictTitle }}</strong>
                            <p>{{ emailResult.verdictBody }}</p>
                        </div>
                    </div>

                    <h5 class="subsection-title">Fuentes consultadas</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in emailResult.sourceCards" :key="item.name">
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

                    <h5 class="subsection-title">Senales observadas</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-4" v-for="item in emailResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-6" v-for="panel in emailResult.rawPanels" :key="panel.title">
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
                </template>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Modulo 02</span>
                    <h2 class="module-title">Inteligencia de contrasena</h2>
                    <p class="module-copy">
                        Cruza la contrasena contra HIBP Pwned Passwords sin exponerla completa, calcula fortaleza con
                        zxcvbn y explica patrones, tiempos de crack y mejoras concretas.
                    </p>
                </div>

                <div class="control-row">
                    <div class="control-field">
                        <label class="field-label" for="password-input">Contrasena a revisar</label>
                        <div class="password-shell">
                            <input
                                id="password-input"
                                v-model="passwordInput"
                                :type="showPassword ? 'text' : 'password'"
                                class="form-control input-dark"
                                placeholder="Introduce la contrasena"
                                @keyup.enter="analyzePassword"
                            />
                            <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-main action-button" :disabled="passwordLoading || !passwordInput" @click="analyzePassword">
                        {{ passwordLoading ? "Analizando..." : "Analizar contrasena" }}
                    </button>
                </div>

                <div v-if="passwordLoading" class="loading-panel">
                    <div class="loading-step" v-for="step in passwordSteps" :key="step.name" :class="step.state">
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

                <template v-if="passwordResult && !passwordLoading">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in passwordResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone || scoreClass(item.numeric)">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="passwordResult.verdictTone">
                        <div class="verdict-icon">
                            <span>PASS</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ passwordResult.verdictTitle }}</strong>
                            <p>{{ passwordResult.verdictBody }}</p>
                        </div>
                    </div>

                    <h5 class="subsection-title">Senales observadas</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-4" v-for="item in passwordResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="pattern-cloud" v-if="passwordResult.patterns.length">
                        <span class="pattern-chip" v-for="pattern in passwordResult.patterns" :key="pattern">{{ pattern }}</span>
                    </div>

                    <div class="row g-3 mt-1">
                        <div class="col-xl-6" v-for="panel in passwordResult.rawPanels" :key="panel.title">
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
                </template>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Modulo 03</span>
                    <h2 class="module-title">Inteligencia de dominio y URL</h2>
                    <p class="module-copy">
                        Analiza DNS, cabeceras publicas, superficie visible, certificados, reputacion en URLHaus,
                        huella historica en Wayback y registro RDAP de un dominio o URL.
                    </p>
                </div>

                <div class="control-row">
                    <div class="control-field">
                        <label class="field-label" for="target-input">Dominio o URL</label>
                        <input
                            id="target-input"
                            v-model.trim="targetInput"
                            class="form-control input-dark"
                            placeholder="ejemplo.com o https://ejemplo.com/login"
                            @keyup.enter="analyzeTarget"
                        />
                    </div>
                    <button class="btn btn-main action-button" :disabled="targetLoading || !targetInput" @click="analyzeTarget">
                        {{ targetLoading ? "Analizando..." : "Analizar dominio" }}
                    </button>
                </div>

                <div v-if="targetLoading" class="loading-panel">
                    <div class="loading-step" v-for="step in targetSteps" :key="step.name" :class="step.state">
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

                <template v-if="targetResult && !targetLoading">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in targetResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone || scoreClass(item.numeric)">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="targetResult.verdictTone">
                        <div class="verdict-icon">
                            <span>URL</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ targetResult.verdictTitle }}</strong>
                            <p>{{ targetResult.verdictBody }}</p>
                        </div>
                    </div>

                    <h5 class="subsection-title">Fuentes consultadas</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-4" v-for="item in targetResult.sourceCards" :key="item.name">
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

                    <h5 class="subsection-title">Senales observadas</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-4" v-for="item in targetResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="stack-panels">
                        <div class="tool-card" v-for="panel in targetResult.rawPanels" :key="panel.title">
                            <div class="card-head">
                                <h5>{{ panel.title }}</h5>
                                <span class="mini-badge">{{ panel.badge }}</span>
                            </div>
                            <div class="output-box">
                                <pre class="result-pre">{{ panel.content }}</pre>
                            </div>
                        </div>
                    </div>
                </template>
            </section>

            <section v-if="globalScore !== null" class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Resultado final</span>
                    <h2 class="module-title">Juicio del espejo</h2>
                    <p class="module-copy">
                        La puntuacion final es el promedio de los modulos que ya tienen resultado. No mide bondad
                        absoluta: resume exposicion, blindaje observable y calidad operativa en este analisis pasivo.
                    </p>
                </div>

                <div class="global-layout">
                    <div class="gauge-shell">
                        <svg viewBox="0 0 120 120" class="gauge-svg">
                            <circle cx="60" cy="60" r="50" class="gauge-track" />
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                class="gauge-fill"
                                :class="scoreClass(globalScore)"
                                :style="{ strokeDashoffset: gaugeOffset }"
                            />
                        </svg>
                        <div class="gauge-label">
                            <span class="gauge-number">{{ globalScore }}</span>
                            <span class="gauge-sub">/ 100</span>
                        </div>
                    </div>

                    <div class="global-side">
                        <div class="verdict-card compact" :class="verdictTone(globalScore)">
                            <div class="verdict-icon">
                                <span>OSINT</span>
                            </div>
                            <div class="verdict-body">
                                <strong>{{ globalVerdict }}</strong>
                                <p>{{ globalNarrative }}</p>
                            </div>
                        </div>

                        <div class="recommendation-box">
                            <h5>Recomendaciones agregadas</h5>
                            <ul class="recommendation-list">
                                <li v-for="item in globalRecommendations" :key="item">
                                    <i class="bi bi-chevron-right"></i>
                                    <span>{{ item }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import zxcvbn from 'zxcvbn'

const emailInput = ref('')
const emailLoading = ref(false)
const emailResult = ref(null)
const emailSteps = ref([])

const passwordInput = ref('')
const passwordLoading = ref(false)
const passwordResult = ref(null)
const passwordSteps = ref([])
const showPassword = ref(false)

const targetInput = ref('')
const targetLoading = ref(false)
const targetResult = ref(null)
const targetSteps = ref([])

const moduleScores = computed(() =>
    [emailResult.value?.score, passwordResult.value?.score, targetResult.value?.score]
        .filter(score => typeof score === 'number')
)

const globalScore = computed(() => {
    if (!moduleScores.value.length) return null
    const total = moduleScores.value.reduce((sum, score) => sum + score, 0)
    return Math.round(total / moduleScores.value.length)
})

const gaugeOffset = computed(() => {
    if (globalScore.value === null) return 314
    return 314 - (globalScore.value / 100) * 314
})

const globalRecommendations = computed(() => {
    const recommendations = uniqueList([
        ...(emailResult.value?.recommendations || []),
        ...(passwordResult.value?.recommendations || []),
        ...(targetResult.value?.recommendations || [])
    ])
    return recommendations.length
        ? recommendations
        : ['Mantener la higiene actual y repetir el analisis de forma periodica.']
})

const globalVerdict = computed(() => {
    if (globalScore.value === null) return ''
    if (globalScore.value >= 80) return 'Blindaje observable solido'
    if (globalScore.value >= 55) return 'Postura mixta con puntos de mejora'
    return 'Exposicion visible y controles incompletos'
})

const globalNarrative = computed(() => {
    if (globalScore.value === null) return ''
    if (globalScore.value >= 80) {
        return 'La superficie visible muestra varios controles presentes y pocas senales de riesgo inmediato.'
    }
    if (globalScore.value >= 55) {
        return 'Hay buenas practicas en algunas zonas, pero aun aparecen huecos que conviene cerrar cuanto antes.'
    }
    return 'La combinacion de senales observadas sugiere revisar configuracion, higiene operativa y protecciones basicas.'
})

function buildSteps(names) {
    return names.map(name => ({
        name,
        state: 'pending',
        status: 'En espera...'
    }))
}

function updateStep(stepsRef, index, patch) {
    stepsRef.value[index] = {
        ...stepsRef.value[index],
        ...patch
    }
}

function scoreClass(score) {
    if (typeof score !== 'number') return 'tone-neutral'
    if (score >= 80) return 'tone-success'
    if (score >= 55) return 'tone-warning'
    return 'tone-danger'
}

function verdictTone(score) {
    if (typeof score !== 'number') return 'tone-neutral'
    if (score >= 80) return 'verdict-success'
    if (score >= 55) return 'verdict-warning'
    return 'verdict-danger'
}

function uniqueList(items) {
    return [...new Set(items.filter(Boolean))]
}

function safeJsonParse(text) {
    return JSON.parse(String(text).trim())
}

function prettyPrint(value) {
    if (value === null || value === undefined || value === '') return 'Sin datos.'
    if (typeof value === 'string') return value
    try {
        return JSON.stringify(value, null, 2)
    } catch (error) {
        return String(value)
    }
}

function normalizeTxtRecord(value) {
    return String(value).replace(/^"+|"+$/g, '').replace(/"\s*"/g, '')
}

function formatDate(value) {
    if (!value) return 'No disponible'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function formatDateTime(value) {
    if (!value) return 'No disponible'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function hostFromEmail(email) {
    return String(email).split('@')[1]?.toLowerCase() || ''
}

function normalizeTargetInput(raw) {
    const trimmed = String(raw || '').trim()
    if (!trimmed) throw new Error('Introduce un dominio o URL valida.')

    const candidate = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const parsed = new URL(candidate)

    return {
        raw: trimmed,
        url: parsed.toString(),
        origin: parsed.origin,
        host: parsed.hostname.toLowerCase(),
        https: parsed.protocol === 'https:'
    }
}

async function sha1Hex(value) {
    const buffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(value))
    return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
}

async function sha256Hex(value) {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
    return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
}

async function fetchTextDirect(url, options = {}) {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.text()
}

async function fetchTextViaProxy(url) {
    const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
    ]

    let lastError = null
    for (const proxyUrl of proxies) {
        try {
            const response = await fetch(proxyUrl)
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            return await response.text()
        } catch (error) {
            lastError = error
        }
    }

    throw lastError || new Error('No se pudo recuperar el recurso.')
}

async function fetchTextSmart(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase()
    if (method !== 'GET') {
        return await fetchTextDirect(url, options)
    }

    try {
        return await fetchTextDirect(url, options)
    } catch (error) {
        return await fetchTextViaProxy(url)
    }
}

async function fetchJsonSmart(url, options = {}) {
    const text = await fetchTextSmart(url, options)
    return safeJsonParse(text)
}

async function fetchPublicText(url) {
    try {
        const content = await fetchTextSmart(url)
        return { success: true, content }
    } catch (error) {
        return { success: false, content: '', error: error.message }
    }
}

async function fetchDnsRecords(name, type) {
    try {
        const json = await fetchJsonSmart(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`)
        const records = (json.Answer || []).map(answer => {
            return type === 'TXT' ? normalizeTxtRecord(answer.data) : answer.data
        })
        return { success: true, records, raw: json, status: json.Status }
    } catch (error) {
        return { success: false, records: [], raw: null, error: error.message }
    }
}

async function fetchEmailValidation(email) {
    try {
        const json = await fetchJsonSmart(`https://api.eva.pingutil.com/email?email=${encodeURIComponent(email)}`)
        const data = json.data || json
        return {
            success: true,
            valid: data.valid_syntax ?? data.valid ?? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            disposable: data.disposable ?? false,
            role: data.role_account ?? data.role ?? false,
            deliverable: data.deliverable ?? null,
            domain: data.domain || hostFromEmail(email)
        }
    } catch (error) {
        return {
            success: false,
            valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            disposable: false,
            role: false,
            deliverable: null,
            domain: hostFromEmail(email),
            error: error.message
        }
    }
}

async function fetchGravatarProfile(email) {
    const hash = await sha256Hex(email.toLowerCase().trim())
    const profileUrl = `https://www.gravatar.com/${hash}.json`

    try {
        const response = await fetch(profileUrl)
        if (response.status === 404) {
            return { success: true, hasProfile: false, hash }
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const json = await response.json()
        const entry = json.entry?.[0]
        return {
            success: true,
            hasProfile: Boolean(entry),
            hash,
            raw: json,
            displayName: entry?.displayName || entry?.preferredUsername || 'Sin alias visible',
            profileUrl: entry?.profileUrl || '',
            thumbnail: entry?.thumbnailUrl || '',
            location: entry?.currentLocation || ''
        }
    } catch (directError) {
        try {
            const json = await fetchJsonSmart(profileUrl)
            const entry = json.entry?.[0]
            return {
                success: true,
                hasProfile: Boolean(entry),
                hash,
                raw: json,
                displayName: entry?.displayName || entry?.preferredUsername || 'Sin alias visible',
                profileUrl: entry?.profileUrl || '',
                thumbnail: entry?.thumbnailUrl || '',
                location: entry?.currentLocation || ''
            }
        } catch (error) {
            return {
                success: false,
                hasProfile: false,
                hash,
                error: error.message
            }
        }
    }
}

function readVCardField(entity, fieldName) {
    const entries = entity?.vcardArray?.[1] || []
    const match = entries.find(entry => entry[0] === fieldName)
    return match?.[3] || ''
}

function findRegistrarName(entities = []) {
    const registrar = entities.find(entity => entity.roles?.includes('registrar'))
    return readVCardField(registrar, 'fn') || registrar?.handle || 'No disponible'
}

function findEventDate(events = [], eventAction) {
    return events.find(event => event.eventAction === eventAction)?.eventDate || ''
}

async function fetchDomainRdap(domain) {
    try {
        const raw = await fetchJsonSmart(`https://rdap.org/domain/${encodeURIComponent(domain)}`)
        return {
            success: true,
            raw,
            registrar: findRegistrarName(raw.entities),
            created: findEventDate(raw.events, 'registration'),
            expires: findEventDate(raw.events, 'expiration'),
            updated: findEventDate(raw.events, 'last changed'),
            status: raw.status || [],
            nameservers: (raw.nameservers || []).map(item => item.ldhName)
        }
    } catch (error) {
        return {
            success: false,
            raw: null,
            registrar: 'No disponible',
            created: '',
            expires: '',
            updated: '',
            status: [],
            nameservers: [],
            error: error.message
        }
    }
}

async function fetchMailDomainSignals(domain) {
    const [mx, txt, dmarcTxt, bimiTxt, mtaStsTxt, mtaStsPolicy] = await Promise.all([
        fetchDnsRecords(domain, 'MX'),
        fetchDnsRecords(domain, 'TXT'),
        fetchDnsRecords(`_dmarc.${domain}`, 'TXT'),
        fetchDnsRecords(`default._bimi.${domain}`, 'TXT'),
        fetchDnsRecords(`_mta-sts.${domain}`, 'TXT'),
        fetchPublicText(`https://mta-sts.${domain}/.well-known/mta-sts.txt`)
    ])

    const spf = txt.records.find(record => record.toLowerCase().startsWith('v=spf1')) || ''
    const dmarc = dmarcTxt.records.find(record => record.toLowerCase().startsWith('v=dmarc1')) || ''
    const bimi = bimiTxt.records.find(record => record.toLowerCase().startsWith('v=bimi1')) || ''
    const mtaSts = mtaStsTxt.records.find(record => record.toLowerCase().startsWith('v=stsv1')) || ''

    return {
        mx,
        txt,
        dmarcTxt,
        bimiTxt,
        mtaStsTxt,
        mtaStsPolicy,
        spf,
        dmarc,
        bimi,
        mtaSts
    }
}

async function queryPwnedPasswords(password) {
    const hex = await sha1Hex(password)
    const prefix = hex.slice(0, 5)
    const suffix = hex.slice(5)
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: { 'Add-Padding': 'true' }
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const body = await response.text()
    const match = body
        .split('\n')
        .map(line => line.trim())
        .find(line => line.toUpperCase().startsWith(suffix))
    const count = match ? parseInt(match.split(':')[1], 10) : 0
    return {
        count,
        prefix,
        hashSuffixMatched: Boolean(match)
    }
}

async function fetchSecurityHeadersReport(targetUrl) {
    try {
        const raw = await fetchJsonSmart(
            `https://securityheaders.com/?q=${encodeURIComponent(targetUrl)}&followRedirects=on&format=json`
        )
        return { success: true, raw }
    } catch (error) {
        return { success: false, raw: null, error: error.message }
    }
}

function extractSecurityHeadersGrade(report) {
    if (!report?.raw) return ''
    return report.raw.grade || report.raw.summary?.grade || report.raw.result?.grade || ''
}

async function fetchCertificateTransparency(domain) {
    try {
        const raw = await fetchJsonSmart(`https://crt.sh/?q=${encodeURIComponent(`%.${domain}`)}&output=json`)
        const rows = Array.isArray(raw) ? raw : []
        const names = uniqueList(rows.flatMap(row => String(row.name_value || '').split('\n')))
        return {
            success: true,
            raw: rows,
            uniqueNames: names,
            latestEntry: rows[0]?.entry_timestamp || '',
            sample: names.slice(0, 12)
        }
    } catch (error) {
        return {
            success: false,
            raw: [],
            uniqueNames: [],
            latestEntry: '',
            sample: [],
            error: error.message
        }
    }
}

async function fetchWaybackSnapshots(host) {
    try {
        const raw = await fetchJsonSmart(
            `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(host)}&fl=timestamp,original,statuscode&filter=statuscode:200&limit=6&output=json`
        )
        const rows = Array.isArray(raw) ? raw.slice(1) : []
        const latest = rows.length ? rows[rows.length - 1] : null
        return {
            success: true,
            raw: rows,
            count: rows.length,
            latest: latest ? { timestamp: latest[0], original: latest[1], status: latest[2] } : null
        }
    } catch (error) {
        return {
            success: false,
            raw: [],
            count: 0,
            latest: null,
            error: error.message
        }
    }
}

async function fetchUrlhaus(url) {
    try {
        const response = await fetch('https://urlhaus-api.abuse.ch/v1/url/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `url=${encodeURIComponent(url)}`
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const raw = await response.json()
        return { success: true, raw }
    } catch (error) {
        return { success: false, raw: null, error: error.message }
    }
}

async function fetchSurfaceFiles(origin) {
    const [robots, sitemap, securityWellKnown, securityRoot] = await Promise.all([
        fetchPublicText(`${origin}/robots.txt`),
        fetchPublicText(`${origin}/sitemap.xml`),
        fetchPublicText(`${origin}/.well-known/security.txt`),
        fetchPublicText(`${origin}/security.txt`)
    ])

    const securityTxt = securityWellKnown.success
        ? { ...securityWellKnown, path: '/.well-known/security.txt' }
        : securityRoot.success
            ? { ...securityRoot, path: '/security.txt' }
            : { success: false, content: '', error: securityWellKnown.error || securityRoot.error || 'No disponible', path: '' }

    return { robots, sitemap, securityTxt }
}

async function fetchTargetDnsBundle(host) {
    const [a, aaaa, mx, ns, txt, caa] = await Promise.all([
        fetchDnsRecords(host, 'A'),
        fetchDnsRecords(host, 'AAAA'),
        fetchDnsRecords(host, 'MX'),
        fetchDnsRecords(host, 'NS'),
        fetchDnsRecords(host, 'TXT'),
        fetchDnsRecords(host, 'CAA')
    ])

    return { a, aaaa, mx, ns, txt, caa }
}

function shortList(records, max = 3) {
    if (!records?.length) return 'Sin datos'
    return records.slice(0, max).join(' | ')
}

async function analyzeEmail() {
    if (!emailInput.value) return

    const email = emailInput.value.trim().toLowerCase()
    const domain = hostFromEmail(email)
    if (!domain) {
        window.alert('Introduce un correo valido.')
        return
    }

    emailLoading.value = true
    emailResult.value = null
    emailSteps.value = buildSteps([
        'Validacion base',
        'Controles del dominio de correo',
        'Huella publica en Gravatar',
        'Registro RDAP del dominio'
    ])

    try {
        updateStep(emailSteps, 0, { state: 'active', status: 'Consultando EVA Pingutil...' })
        const validation = await fetchEmailValidation(email)
        updateStep(emailSteps, 0, {
            state: validation.success ? 'done' : 'error',
            status: validation.success ? 'Sintaxis y flags recibidos.' : `Fallback local: ${validation.error}`
        })

        updateStep(emailSteps, 1, { state: 'active', status: 'Consultando MX, TXT, DMARC, BIMI y MTA-STS...' })
        const mailSignals = await fetchMailDomainSignals(domain)
        const mailSignalSuccess = mailSignals.mx.success || mailSignals.txt.success || mailSignals.dmarcTxt.success
        updateStep(emailSteps, 1, {
            state: mailSignalSuccess ? 'done' : 'error',
            status: mailSignalSuccess ? 'Politicas y transporte de correo recopilados.' : 'No se pudieron leer los registros DNS.'
        })

        updateStep(emailSteps, 2, { state: 'active', status: 'Buscando perfil publico en Gravatar...' })
        const gravatar = await fetchGravatarProfile(email)
        updateStep(emailSteps, 2, {
            state: gravatar.success ? 'done' : 'error',
            status: gravatar.success
                ? (gravatar.hasProfile ? 'Perfil publico encontrado.' : 'Sin perfil publico visible.')
                : `No disponible: ${gravatar.error}`
        })

        updateStep(emailSteps, 3, { state: 'active', status: 'Consultando RDAP del dominio...' })
        const rdap = await fetchDomainRdap(domain)
        updateStep(emailSteps, 3, {
            state: rdap.success ? 'done' : 'error',
            status: rdap.success ? 'Registro del dominio obtenido.' : `No disponible: ${rdap.error}`
        })

        const hasMx = mailSignals.mx.records.length > 0
        const hasSpf = Boolean(mailSignals.spf)
        const hasDmarc = Boolean(mailSignals.dmarc)
        const hasMtaSts = Boolean(mailSignals.mtaSts)
        const hasBimi = Boolean(mailSignals.bimi)

        let score = 100
        if (!validation.valid) score -= 35
        if (validation.disposable) score -= 25
        if (validation.role) score -= 10
        if (!hasMx) score -= 25
        if (!hasSpf) score -= 10
        if (!hasDmarc) score -= 15
        if (!hasMtaSts) score -= 8
        if (validation.deliverable === false) score -= 10
        score = Math.max(0, Math.min(100, Math.round(score)))

        const antiSpoofing = hasSpf && hasDmarc
            ? 'SPF y DMARC presentes'
            : hasSpf || hasDmarc
                ? 'Solo un control visible'
                : 'Sin blindaje antisuplantacion'

        const recommendations = uniqueList([
            !validation.valid ? 'Corrige el formato del correo antes de usarlo en procesos criticos.' : '',
            validation.disposable ? 'Evita cuentas temporales en servicios donde la recuperacion sea importante.' : '',
            validation.role ? 'Los buzones de rol suelen recibir mas phishing y filtraciones.' : '',
            !hasMx ? 'El dominio no publica MX visibles; revisa si el correo realmente es operativo.' : '',
            !hasSpf ? 'Publica un registro SPF para limitar envios no autorizados.' : '',
            !hasDmarc ? 'Activa DMARC para endurecer la proteccion frente a spoofing.' : '',
            !hasMtaSts ? 'MTA-STS sigue ausente o no visible; el transporte SMTP puede endurecerse.' : '',
            rdap.expires ? `Vigila la fecha de expiracion del dominio: ${formatDate(rdap.expires)}.` : ''
        ])

        const verdictTitle = score >= 80
            ? 'Correo con infraestructura razonablemente sana'
            : score >= 55
                ? 'Correo util, pero con blindaje parcial'
                : 'Correo con senales de riesgo o controles insuficientes'

        const verdictBody = antiSpoofing === 'SPF y DMARC presentes'
            ? 'La superficie de correo publica muestra controles antisuplantacion visibles y una topologia de entrega reconocible.'
            : 'Faltan controles que ayuden a reducir suplantacion, degradacion SMTP o abuso de la identidad del dominio.'

        emailResult.value = {
            score,
            verdictTone: verdictTone(score),
            verdictTitle,
            verdictBody,
            summaryCards: [
                {
                    label: 'Puntuacion',
                    value: `${score}/100`,
                    numeric: score,
                    note: domain
                },
                {
                    label: 'Sintaxis',
                    value: validation.valid ? 'Valida' : 'Dudosa',
                    tone: validation.valid ? 'tone-success' : 'tone-danger',
                    note: validation.deliverable === null ? 'Entrega no confirmada' : (validation.deliverable ? 'Entrega plausible' : 'Entrega dudosa')
                },
                {
                    label: 'Blindaje de correo',
                    value: antiSpoofing,
                    tone: antiSpoofing === 'SPF y DMARC presentes' ? 'tone-success' : 'tone-warning',
                    note: hasMtaSts ? 'MTA-STS visible' : 'MTA-STS no visible'
                },
                {
                    label: 'MX visibles',
                    value: hasMx ? String(mailSignals.mx.records.length) : '0',
                    tone: hasMx ? 'tone-success' : 'tone-danger',
                    note: shortList(mailSignals.mx.records, 2)
                }
            ],
            sourceCards: [
                {
                    name: 'EVA Pingutil',
                    state: validation.success ? 'Exitoso' : 'Fallback',
                    tone: validation.success ? 'tone-success' : 'tone-warning',
                    description: 'Validacion sintactica, cuentas temporales, buzones de rol y entrega probable.',
                    note: validation.success ? 'Respuesta publica procesada.' : (validation.error || 'Solo se uso regex local.')
                },
                {
                    name: 'DNS over HTTPS',
                    state: mailSignalSuccess ? 'Exitoso' : 'Fallido',
                    tone: mailSignalSuccess ? 'tone-success' : 'tone-danger',
                    description: 'Consulta de MX, TXT, SPF, DMARC, BIMI y MTA-STS desde dns.google.',
                    note: hasMx ? `MX: ${shortList(mailSignals.mx.records, 2)}` : 'Sin MX visibles.'
                },
                {
                    name: 'Gravatar',
                    state: gravatar.success ? (gravatar.hasProfile ? 'Perfil visible' : 'Sin perfil') : 'No disponible',
                    tone: gravatar.success ? (gravatar.hasProfile ? 'tone-success' : 'tone-warning') : 'tone-danger',
                    description: 'Busqueda de huella publica y alias expuestos a partir del hash SHA-256 del correo.',
                    note: gravatar.success
                        ? (gravatar.hasProfile ? `${gravatar.displayName}${gravatar.location ? ` · ${gravatar.location}` : ''}` : 'No se encontro perfil publico.')
                        : gravatar.error
                },
                {
                    name: 'RDAP',
                    state: rdap.success ? 'Exitoso' : 'No disponible',
                    tone: rdap.success ? 'tone-success' : 'tone-warning',
                    description: 'Registro publico del dominio: alta, expiracion, registrar y nameservers.',
                    note: rdap.success
                        ? `Alta: ${formatDate(rdap.created)} · Expira: ${formatDate(rdap.expires)}`
                        : (rdap.error || 'Sin respuesta util.')
                }
            ],
            signalCards: [
                {
                    label: 'Cuenta temporal',
                    value: validation.disposable ? 'Si' : 'No',
                    tone: validation.disposable ? 'tone-danger' : 'tone-success',
                    note: validation.disposable ? 'Los buzones desechables suelen elevar riesgo operativo.' : 'No se detecta proveedor temporal.'
                },
                {
                    label: 'Buzon de rol',
                    value: validation.role ? 'Si' : 'No',
                    tone: validation.role ? 'tone-warning' : 'tone-success',
                    note: validation.role ? 'Alias generico con mas superficie de abuso.' : 'Parece una cuenta personal o nominal.'
                },
                {
                    label: 'SPF',
                    value: hasSpf ? 'Visible' : 'Ausente',
                    tone: hasSpf ? 'tone-success' : 'tone-danger',
                    note: hasSpf ? mailSignals.spf : 'Sin SPF publico en TXT raiz.'
                },
                {
                    label: 'DMARC',
                    value: hasDmarc ? 'Visible' : 'Ausente',
                    tone: hasDmarc ? 'tone-success' : 'tone-danger',
                    note: hasDmarc ? mailSignals.dmarc : 'No hay politica DMARC publicada.'
                },
                {
                    label: 'BIMI',
                    value: hasBimi ? 'Visible' : 'No visible',
                    tone: hasBimi ? 'tone-success' : 'tone-neutral',
                    note: hasBimi ? mailSignals.bimi : 'BIMI es opcional y aqui no aparece.'
                },
                {
                    label: 'MTA-STS',
                    value: hasMtaSts ? 'TXT visible' : 'No visible',
                    tone: hasMtaSts ? 'tone-success' : 'tone-warning',
                    note: mailSignals.mtaStsPolicy.success
                        ? `Politica recuperada desde ${domain}.`
                        : 'No se pudo leer la politica en /.well-known/mta-sts.txt.'
                },
                {
                    label: 'Registrar',
                    value: rdap.registrar,
                    tone: rdap.success ? 'tone-neutral' : 'tone-warning',
                    note: rdap.success ? `Nameservers: ${rdap.nameservers.length}` : 'Sin respuesta RDAP consistente.'
                },
                {
                    label: 'Huella publica',
                    value: gravatar.hasProfile ? 'Perfil visible' : 'Sin perfil',
                    tone: gravatar.hasProfile ? 'tone-warning' : 'tone-success',
                    note: gravatar.hasProfile ? 'Existe correlacion publica del correo en Gravatar.' : 'No se observa perfil publico en este origen.'
                }
            ],
            rawPanels: [
                {
                    title: 'TXT y controles de correo',
                    badge: 'SPF / DMARC / BIMI / MTA-STS',
                    content: prettyPrint({
                        mx: mailSignals.mx.records,
                        txt: mailSignals.txt.records,
                        spf: mailSignals.spf || 'No visible',
                        dmarc: mailSignals.dmarc || 'No visible',
                        bimi: mailSignals.bimi || 'No visible',
                        mta_sts_txt: mailSignals.mtaSts || 'No visible',
                        mta_sts_policy: mailSignals.mtaStsPolicy.success
                            ? mailSignals.mtaStsPolicy.content
                            : (mailSignals.mtaStsPolicy.error || 'No disponible')
                    })
                },
                {
                    title: 'RDAP del dominio',
                    badge: 'Registro publico',
                    content: prettyPrint(
                        rdap.success
                            ? {
                                registrar: rdap.registrar,
                                created: rdap.created,
                                expires: rdap.expires,
                                updated: rdap.updated,
                                status: rdap.status,
                                nameservers: rdap.nameservers
                            }
                            : { error: rdap.error || 'Sin respuesta util.' }
                    )
                }
            ],
            recommendations
        }
    } finally {
        emailLoading.value = false
    }
}

async function analyzePassword() {
    if (!passwordInput.value) return

    passwordLoading.value = true
    passwordResult.value = null
    passwordSteps.value = buildSteps([
        'Analisis local con zxcvbn',
        'Consulta HIBP Pwned Passwords'
    ])

    try {
        updateStep(passwordSteps, 0, { state: 'active', status: 'Calculando patrones, longitud y complejidad...' })
        const strength = zxcvbn(passwordInput.value)
        updateStep(passwordSteps, 0, { state: 'done', status: 'Modelo local completado.' })

        updateStep(passwordSteps, 1, { state: 'active', status: 'Enviando solo el prefijo SHA-1 a HIBP...' })
        let pwned
        try {
            pwned = await queryPwnedPasswords(passwordInput.value)
            updateStep(passwordSteps, 1, {
                state: 'done',
                status: pwned.count > 0
                    ? `Coincidencia encontrada: ${pwned.count.toLocaleString()} exposiciones.`
                    : 'Sin coincidencias en HIBP.'
            })
        } catch (error) {
            pwned = { count: 0, error: error.message, prefix: 'N/D', hashSuffixMatched: false }
            updateStep(passwordSteps, 1, { state: 'error', status: `Error: ${error.message}` })
        }

        const baseScoreMap = [16, 36, 58, 79, 93]
        let score = baseScoreMap[strength.score] ?? 20
        if (pwned.count > 0) score = Math.min(score, pwned.count > 1000 ? 8 : pwned.count > 10 ? 20 : 32)
        score = Math.max(0, Math.min(100, Math.round(score)))

        const feedback = uniqueList([
            strength.feedback.warning,
            ...(strength.feedback.suggestions || [])
        ])

        const patterns = strength.sequence
            .slice(0, 8)
            .map(sequence => `${translatePattern(sequence.pattern)}: ${sequence.token}`)

        const crackTime =
            strength.crack_times_display?.offline_slow_hashing_1e4_per_second ||
            strength.crack_times_display?.offline_fast_hashing_1e10_per_second ||
            'No disponible'

        const recommendations = uniqueList([
            pwned.count > 0 ? 'La contrasena aparece en brechas reales: cambia esta clave y todas sus reutilizaciones.' : '',
            passwordInput.value.length < 14 ? 'Sube la longitud a 14-16 caracteres o mas.' : '',
            !/[A-Z]/.test(passwordInput.value) ? 'Anade mayusculas para elevar diversidad del alfabeto.' : '',
            !/[0-9]/.test(passwordInput.value) ? 'Introduce numeros no triviales.' : '',
            !/[^A-Za-z0-9]/.test(passwordInput.value) ? 'Incluye simbolos para ampliar combinaciones.' : '',
            feedback[0] || '',
            feedback[1] || ''
        ])

        const verdictTitle = pwned.count > 0
            ? 'Contrasena comprometida en brechas reales'
            : score >= 80
                ? 'Contrasena robusta y sin coincidencias en HIBP'
                : score >= 55
                    ? 'Contrasena razonable, pero mejorable'
                    : 'Contrasena debil o predecible'

        const verdictBody = pwned.count > 0
            ? `Se ha observado en HIBP ${pwned.count.toLocaleString()} veces. Aunque su forma parezca compleja, ya no puede considerarse secreta.`
            : `zxcvbn la clasifica con ${strength.score}/4 y estima tiempos de crack muy variables segun el atacante y el hash.`

        passwordResult.value = {
            score,
            verdictTone: verdictTone(score),
            verdictTitle,
            verdictBody,
            patterns,
            summaryCards: [
                {
                    label: 'Puntuacion',
                    value: `${score}/100`,
                    numeric: score,
                    note: `zxcvbn ${strength.score}/4`
                },
                {
                    label: 'Estado HIBP',
                    value: pwned.count > 0 ? 'Expuesta' : 'No encontrada',
                    tone: pwned.count > 0 ? 'tone-danger' : 'tone-success',
                    note: pwned.error || 'Consulta por rango SHA-1'
                },
                {
                    label: 'Apariciones',
                    value: pwned.count.toLocaleString(),
                    tone: pwned.count > 0 ? 'tone-danger' : 'tone-success',
                    note: 'Coincidencias en brechas publicas'
                },
                {
                    label: 'Crack offline',
                    value: crackTime,
                    tone: score >= 80 ? 'tone-success' : score >= 55 ? 'tone-warning' : 'tone-danger',
                    note: 'Modelo lento 1e4 hashes/seg'
                }
            ],
            signalCards: [
                {
                    label: 'Longitud',
                    value: `${passwordInput.value.length} caracteres`,
                    tone: passwordInput.value.length >= 14 ? 'tone-success' : 'tone-warning',
                    note: passwordInput.value.length >= 16 ? 'Muy buena base estructural.' : 'La longitud sigue siendo el multiplicador mas rentable.'
                },
                {
                    label: 'Diversidad',
                    value: describeAlphabet(passwordInput.value),
                    tone: /[^A-Za-z0-9]/.test(passwordInput.value) && /[A-Z]/.test(passwordInput.value) && /[0-9]/.test(passwordInput.value)
                        ? 'tone-success'
                        : 'tone-warning',
                    note: 'Mayusculas, minusculas, numeros y simbolos elevan cobertura del espacio de claves.'
                },
                {
                    label: 'Guesses log10',
                    value: strength.guesses_log10.toFixed(2),
                    tone: strength.guesses_log10 >= 10 ? 'tone-success' : strength.guesses_log10 >= 7 ? 'tone-warning' : 'tone-danger',
                    note: 'Estimacion logaritmica de intentos necesarios.'
                },
                {
                    label: 'Patrones detectados',
                    value: patterns.length ? String(patterns.length) : '0',
                    tone: patterns.length > 2 ? 'tone-warning' : 'tone-success',
                    note: patterns.length ? patterns.slice(0, 2).join(' | ') : 'No se han detectado patrones obvios.'
                },
                {
                    label: 'Warning principal',
                    value: strength.feedback.warning || 'Sin warning fuerte',
                    tone: strength.feedback.warning ? 'tone-warning' : 'tone-success',
                    note: feedback.join(' | ') || 'Sin sugerencias adicionales.'
                },
                {
                    label: 'Consulta k-anonymity',
                    value: pwned.prefix,
                    tone: 'tone-neutral',
                    note: 'Solo el prefijo SHA-1 viaja al servicio remoto.'
                }
            ],
            rawPanels: [
                {
                    title: 'Lectura tecnica zxcvbn',
                    badge: 'Analisis local',
                    content: prettyPrint({
                        score: strength.score,
                        guesses: strength.guesses,
                        guesses_log10: strength.guesses_log10,
                        crack_times_display: strength.crack_times_display,
                        warning: strength.feedback.warning,
                        suggestions: strength.feedback.suggestions,
                        sequence: strength.sequence.map(sequence => ({
                            pattern: sequence.pattern,
                            token: sequence.token,
                            guesses: sequence.guesses
                        }))
                    })
                },
                {
                    title: 'Consulta HIBP Pwned Passwords',
                    badge: 'Rango SHA-1',
                    content: prettyPrint({
                        prefix_sent: pwned.prefix,
                        exposed_count: pwned.count,
                        suffix_match: pwned.hashSuffixMatched,
                        error: pwned.error || null
                    })
                }
            ],
            recommendations
        }
    } finally {
        passwordLoading.value = false
    }
}

async function analyzeTarget() {
    if (!targetInput.value) return

    let normalized
    try {
        normalized = normalizeTargetInput(targetInput.value)
    } catch (error) {
        window.alert(error.message)
        return
    }

    targetLoading.value = true
    targetResult.value = null
    targetSteps.value = buildSteps([
        'DNS y registros base',
        'Cabeceras publicas',
        'Superficie visible',
        'Certificados en crt.sh',
        'RDAP del dominio',
        'Wayback y URLHaus'
    ])

    try {
        updateStep(targetSteps, 0, { state: 'active', status: 'Consultando A, AAAA, MX, NS, TXT y CAA...' })
        const dns = await fetchTargetDnsBundle(normalized.host)
        updateStep(targetSteps, 0, {
            state: dns.a.success || dns.aaaa.success || dns.ns.success ? 'done' : 'error',
            status: `A: ${dns.a.records.length} · AAAA: ${dns.aaaa.records.length} · NS: ${dns.ns.records.length}`
        })

        updateStep(targetSteps, 1, { state: 'active', status: 'Consultando SecurityHeaders...' })
        const securityHeaders = await fetchSecurityHeadersReport(normalized.url)
        const headerGrade = extractSecurityHeadersGrade(securityHeaders)
        updateStep(targetSteps, 1, {
            state: securityHeaders.success ? 'done' : 'error',
            status: securityHeaders.success ? `Respuesta recibida${headerGrade ? ` · grado ${headerGrade}` : ''}` : `No disponible: ${securityHeaders.error}`
        })

        updateStep(targetSteps, 2, { state: 'active', status: 'Recuperando robots, sitemap y security.txt...' })
        const surface = await fetchSurfaceFiles(normalized.origin)
        updateStep(targetSteps, 2, {
            state: surface.robots.success || surface.sitemap.success || surface.securityTxt.success ? 'done' : 'error',
            status: `robots: ${surface.robots.success ? 'si' : 'no'} · sitemap: ${surface.sitemap.success ? 'si' : 'no'} · security.txt: ${surface.securityTxt.success ? 'si' : 'no'}`
        })

        updateStep(targetSteps, 3, { state: 'active', status: 'Consultando transparencia de certificados...' })
        const ct = await fetchCertificateTransparency(normalized.host)
        updateStep(targetSteps, 3, {
            state: ct.success ? 'done' : 'error',
            status: ct.success ? `${ct.uniqueNames.length} nombres unicos observados.` : `No disponible: ${ct.error}`
        })

        updateStep(targetSteps, 4, { state: 'active', status: 'Consultando RDAP...' })
        const rdap = await fetchDomainRdap(normalized.host)
        updateStep(targetSteps, 4, {
            state: rdap.success ? 'done' : 'error',
            status: rdap.success ? `Registrar: ${rdap.registrar}` : `No disponible: ${rdap.error}`
        })

        updateStep(targetSteps, 5, { state: 'active', status: 'Consultando Wayback y URLHaus...' })
        const [wayback, urlhaus] = await Promise.all([
            fetchWaybackSnapshots(normalized.host),
            fetchUrlhaus(normalized.url)
        ])
        updateStep(targetSteps, 5, {
            state: wayback.success || urlhaus.success ? 'done' : 'error',
            status: `${wayback.count} snapshots · ${urlhaus.raw?.query_status || urlhaus.error || 'URLHaus sin datos'}`
        })

        let score = 100
        const hasIp = dns.a.records.length > 0 || dns.aaaa.records.length > 0
        const hasSecurityTxt = surface.securityTxt.success
        const urlhausState = urlhaus.raw?.query_status || ''

        if (!normalized.https) score -= 25
        if (!hasIp) score -= 25
        if (!dns.caa.records.length) score -= 5
        if (!hasSecurityTxt) score -= 8
        if (headerGrade.startsWith('F')) score -= 40
        else if (headerGrade.startsWith('D')) score -= 28
        else if (headerGrade.startsWith('C')) score -= 18
        else if (headerGrade.startsWith('B')) score -= 8
        if (urlhausState === 'ok') score = Math.min(score, 8)
        score = Math.max(0, Math.min(100, Math.round(score)))

        const recommendations = uniqueList([
            !normalized.https ? 'Publica la URL primaria bajo HTTPS y evita entradas canonicas en HTTP.' : '',
            !dns.caa.records.length ? 'Anade registros CAA para limitar autoridades certificadoras validas.' : '',
            !hasSecurityTxt ? 'Publica security.txt para facilitar contacto responsable de hallazgos.' : '',
            !surface.robots.success ? 'Si el sitio es publico, exponer robots.txt ayuda a documentar politicas de crawling.' : '',
            !surface.sitemap.success ? 'Un sitemap visible mejora trazabilidad y descubrimiento legitimo.' : '',
            !headerGrade ? 'La lectura de SecurityHeaders no devolvio grado; revisa cabeceras manualmente.' : '',
            headerGrade.startsWith('C') || headerGrade.startsWith('D') || headerGrade.startsWith('F')
                ? 'Endurece CSP, HSTS, Referrer-Policy, X-Frame-Options y Permissions-Policy.'
                : '',
            urlhausState === 'ok' ? 'URLHaus marca esta URL con senales maliciosas; verifica el recurso antes de interactuar.' : ''
        ])

        const verdictTitle = urlhausState === 'ok'
            ? 'La reputacion publica merece atencion inmediata'
            : score >= 80
                ? 'Superficie bastante cuidada para un analisis pasivo'
                : score >= 55
                    ? 'Dominio razonable con huecos visibles'
                    : 'Superficie expuesta con protecciones mejorables'

        const verdictBody = hasSecurityTxt
            ? 'El sitio expone al menos un canal visible para coordinacion de seguridad y varias senales operativas observables.'
            : 'La lectura pasiva encuentra controles parciales, pero faltan algunas piezas que mejoran higiene y respuesta.'

        targetResult.value = {
            score,
            verdictTone: verdictTone(score),
            verdictTitle,
            verdictBody,
            summaryCards: [
                {
                    label: 'Puntuacion',
                    value: `${score}/100`,
                    numeric: score,
                    note: normalized.host
                },
                {
                    label: 'HTTPS',
                    value: normalized.https ? 'Activo' : 'No',
                    tone: normalized.https ? 'tone-success' : 'tone-danger',
                    note: normalized.url
                },
                {
                    label: 'SecurityHeaders',
                    value: headerGrade || 'Sin grado',
                    tone: headerGrade.startsWith('A') ? 'tone-success' : headerGrade ? 'tone-warning' : 'tone-neutral',
                    note: securityHeaders.success ? 'Respuesta parseada' : (securityHeaders.error || 'No disponible')
                },
                {
                    label: 'URLHaus',
                    value: urlhausState || 'Sin datos',
                    tone: urlhausState === 'ok' ? 'tone-danger' : 'tone-success',
                    note: urlhausState === 'ok' ? 'Coincidencia encontrada' : 'Sin coincidencia publica'
                }
            ],
            sourceCards: [
                {
                    name: 'DNS over HTTPS',
                    state: hasIp ? 'Exitoso' : 'Parcial',
                    tone: hasIp ? 'tone-success' : 'tone-warning',
                    description: 'A, AAAA, MX, NS, TXT y CAA desde dns.google.',
                    note: `A: ${dns.a.records.length} · AAAA: ${dns.aaaa.records.length} · NS: ${dns.ns.records.length}`
                },
                {
                    name: 'SecurityHeaders',
                    state: securityHeaders.success ? 'Exitoso' : 'No disponible',
                    tone: securityHeaders.success ? 'tone-success' : 'tone-warning',
                    description: 'Lectura de cabeceras visibles y calificacion sintetica.',
                    note: headerGrade ? `Grado ${headerGrade}` : (securityHeaders.error || 'Sin grado visible')
                },
                {
                    name: 'crt.sh',
                    state: ct.success ? 'Exitoso' : 'No disponible',
                    tone: ct.success ? 'tone-success' : 'tone-warning',
                    description: 'Transparencia de certificados y nombres asociados al dominio.',
                    note: ct.success ? `${ct.uniqueNames.length} nombres unicos` : (ct.error || 'Sin respuesta util')
                },
                {
                    name: 'RDAP',
                    state: rdap.success ? 'Exitoso' : 'No disponible',
                    tone: rdap.success ? 'tone-success' : 'tone-warning',
                    description: 'Registro del dominio, alta, expiracion, registrar y nameservers.',
                    note: rdap.success ? `Alta ${formatDate(rdap.created)} · Expira ${formatDate(rdap.expires)}` : (rdap.error || 'Sin datos')
                },
                {
                    name: 'Wayback Machine',
                    state: wayback.success ? 'Exitoso' : 'No disponible',
                    tone: wayback.success ? 'tone-success' : 'tone-warning',
                    description: 'Huella historica publica de capturas archivadas.',
                    note: wayback.success ? `${wayback.count} snapshots visibles` : (wayback.error || 'Sin datos')
                },
                {
                    name: 'URLHaus',
                    state: urlhaus.success ? 'Exitoso' : 'No disponible',
                    tone: urlhausState === 'ok' ? 'tone-danger' : (urlhaus.success ? 'tone-success' : 'tone-warning'),
                    description: 'Reputacion publica de URL maliciosas observadas en campañas reales.',
                    note: urlhausState || urlhaus.error || 'Sin respuesta'
                }
            ],
            signalCards: [
                {
                    label: 'IPv4',
                    value: dns.a.records.length ? String(dns.a.records.length) : '0',
                    tone: dns.a.records.length ? 'tone-success' : 'tone-warning',
                    note: shortList(dns.a.records, 2)
                },
                {
                    label: 'IPv6',
                    value: dns.aaaa.records.length ? String(dns.aaaa.records.length) : '0',
                    tone: dns.aaaa.records.length ? 'tone-success' : 'tone-neutral',
                    note: shortList(dns.aaaa.records, 2)
                },
                {
                    label: 'Nameservers',
                    value: dns.ns.records.length ? String(dns.ns.records.length) : '0',
                    tone: dns.ns.records.length ? 'tone-success' : 'tone-warning',
                    note: shortList(dns.ns.records, 2)
                },
                {
                    label: 'CAA',
                    value: dns.caa.records.length ? 'Visible' : 'Ausente',
                    tone: dns.caa.records.length ? 'tone-success' : 'tone-warning',
                    note: dns.caa.records.length ? shortList(dns.caa.records, 2) : 'No restringe CA validas.'
                },
                {
                    label: 'security.txt',
                    value: hasSecurityTxt ? 'Visible' : 'Ausente',
                    tone: hasSecurityTxt ? 'tone-success' : 'tone-warning',
                    note: hasSecurityTxt ? surface.securityTxt.path : 'Sin canal publico de contacto de seguridad.'
                },
                {
                    label: 'robots.txt',
                    value: surface.robots.success ? 'Visible' : 'Ausente',
                    tone: surface.robots.success ? 'tone-success' : 'tone-neutral',
                    note: surface.robots.success ? 'Superficie de rastreo documentada.' : 'No se encontro robots.txt.'
                },
                {
                    label: 'sitemap.xml',
                    value: surface.sitemap.success ? 'Visible' : 'Ausente',
                    tone: surface.sitemap.success ? 'tone-success' : 'tone-neutral',
                    note: surface.sitemap.success ? 'Indice publico de URLs recuperado.' : 'No se encontro sitemap.xml.'
                },
                {
                    label: 'Certificados',
                    value: ct.uniqueNames.length ? String(ct.uniqueNames.length) : '0',
                    tone: ct.uniqueNames.length ? 'tone-success' : 'tone-warning',
                    note: ct.latestEntry ? `Ultimo registro ${formatDateTime(ct.latestEntry)}` : 'Sin registros visibles.'
                },
                {
                    label: 'Wayback',
                    value: wayback.count ? `${wayback.count} capturas` : 'Sin capturas',
                    tone: wayback.count ? 'tone-neutral' : 'tone-warning',
                    note: wayback.latest ? `Ultima ${wayback.latest.timestamp}` : 'No se encontraron snapshots.'
                }
            ],
            rawPanels: [
                {
                    title: 'DNS snapshot',
                    badge: 'A / AAAA / MX / NS / TXT / CAA',
                    content: prettyPrint({
                        A: dns.a.records,
                        AAAA: dns.aaaa.records,
                        MX: dns.mx.records,
                        NS: dns.ns.records,
                        TXT: dns.txt.records,
                        CAA: dns.caa.records
                    })
                },
                {
                    title: 'Superficie publica',
                    badge: 'robots / sitemap / security.txt',
                    content: prettyPrint({
                        robots: surface.robots.success ? surface.robots.content : surface.robots.error,
                        sitemap: surface.sitemap.success ? surface.sitemap.content : surface.sitemap.error,
                        security_txt_path: surface.securityTxt.path || 'No visible',
                        security_txt: surface.securityTxt.success ? surface.securityTxt.content : surface.securityTxt.error
                    })
                },
                {
                    title: 'SecurityHeaders y reputacion',
                    badge: 'SecurityHeaders / URLHaus',
                    content: prettyPrint({
                        security_headers: securityHeaders.success ? securityHeaders.raw : { error: securityHeaders.error },
                        urlhaus: urlhaus.success ? urlhaus.raw : { error: urlhaus.error }
                    })
                },
                {
                    title: 'Certificados, RDAP y Wayback',
                    badge: 'crt.sh / RDAP / Archive',
                    content: prettyPrint({
                        certificate_names: ct.sample,
                        rdap: rdap.success
                            ? {
                                registrar: rdap.registrar,
                                created: rdap.created,
                                expires: rdap.expires,
                                status: rdap.status,
                                nameservers: rdap.nameservers
                            }
                            : { error: rdap.error },
                        wayback: wayback.latest || { count: wayback.count, error: wayback.error || null }
                    })
                }
            ],
            recommendations
        }
    } finally {
        targetLoading.value = false
    }
}

function translatePattern(pattern) {
    const labels = {
        dictionary: 'Diccionario',
        spatial: 'Patron de teclado',
        repeat: 'Repeticion',
        sequence: 'Secuencia',
        regex: 'Regex',
        date: 'Fecha',
        bruteforce: 'Fuerza bruta'
    }
    return labels[pattern] || pattern
}

function describeAlphabet(password) {
    const parts = []
    if (/[a-z]/.test(password)) parts.push('minusculas')
    if (/[A-Z]/.test(password)) parts.push('mayusculas')
    if (/[0-9]/.test(password)) parts.push('numeros')
    if (/[^A-Za-z0-9]/.test(password)) parts.push('simbolos')
    return parts.length ? parts.join(' + ') : 'alfabeto minimo'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.mirror-page {
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
.module-header {
    display: grid;
    gap: 10px;
}

.section-heading {
    display: grid;
    gap: 12px;
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

.section-copy,
.module-copy {
    margin: 0;
    color: #9ca3af;
    line-height: 1.7;
    max-width: 960px;
}

.guide-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-top: 8px;
}

.guide-card,
.tool-card,
.source-card,
.signal-card,
.metric-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
}

.guide-card {
    padding: 16px;
    display: grid;
    gap: 6px;
}

.guide-card label,
.field-label,
.metric-card label,
.signal-card label {
    color: #9ca3af;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    display: block;
    margin-bottom: 6px;
}

.guide-card span {
    color: #dbe4ee;
    line-height: 1.6;
}

.control-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: end;
    margin: 20px 0 18px;
}

.control-field {
    min-width: 0;
}

.input-dark {
    background: #020617;
    border: 1px solid #334155;
    color: #f8fafc !important;
    min-height: 46px;
    caret-color: #f8fafc;
}

.input-dark::placeholder {
    color: #64748b;
}

.input-dark:focus {
    background: #020617;
    border-color: #475569;
    box-shadow: 0 0 0 0.2rem rgba(71, 85, 105, 0.2);
}

.action-button {
    min-width: 180px;
    height: 46px;
}

.btn-main {
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

.password-shell {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    background: transparent;
    color: #94a3b8;
}

.loading-panel {
    display: grid;
    gap: 10px;
    margin-top: 16px;
}

.loading-step {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
}

.loading-step.active {
    border-color: #475569;
}

.loading-step.done {
    border-color: rgba(34, 197, 94, 0.35);
}

.loading-step.error {
    border-color: rgba(248, 113, 113, 0.35);
}

.loading-step-icon {
    width: 20px;
    display: flex;
    justify-content: center;
    color: #cbd5e1;
    flex-shrink: 0;
}

.loading-step-body {
    display: grid;
    gap: 2px;
}

.loading-step-body strong {
    font-size: 0.92rem;
    color: #f8fafc;
}

.loading-step-body span {
    font-size: 0.82rem;
    color: #94a3b8;
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
.signal-card small,
.source-card small {
    color: #94a3b8;
    line-height: 1.5;
}

.subsection-title {
    margin: 24px 0 14px;
    color: #e2e8f0;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.source-card {
    padding: 16px;
    height: 100%;
    display: grid;
    gap: 8px;
}

.source-card.tone-success {
    border-color: rgba(34, 197, 94, 0.28);
}

.source-card.tone-warning {
    border-color: rgba(245, 158, 11, 0.28);
}

.source-card.tone-danger {
    border-color: rgba(248, 113, 113, 0.28);
}

.source-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
}

.source-head span:first-child {
    color: #f8fafc;
    font-weight: 600;
}

.source-card p {
    margin: 0;
    color: #d6dde7;
    line-height: 1.6;
    font-size: 0.9rem;
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

.verdict-card {
    display: flex;
    gap: 14px;
    border-radius: 10px;
    padding: 16px 18px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    margin-bottom: 18px;
}

.verdict-card.compact {
    margin-bottom: 0;
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

.verdict-danger {
    background: rgba(127, 29, 29, 0.14);
    border-color: rgba(248, 113, 113, 0.3);
}

.tool-card {
    padding: 16px;
    display: grid;
    gap: 12px;
    height: 100%;
}

.stack-panels {
    display: grid;
    gap: 16px;
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

.pattern-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 6px 0 2px;
}

.pattern-chip {
    background: rgba(51, 65, 85, 0.45);
    border: 1px solid #334155;
    border-radius: 999px;
    color: #dbe7f3;
    font-size: 0.8rem;
    padding: 6px 10px;
}

.global-layout {
    display: flex;
    gap: 26px;
    align-items: center;
    flex-wrap: wrap;
}

.gauge-shell {
    position: relative;
    width: 150px;
    height: 150px;
    flex-shrink: 0;
}

.gauge-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

.gauge-track {
    fill: none;
    stroke: #1f2937;
    stroke-width: 8;
}

.gauge-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 314;
    transition: stroke-dashoffset 0.4s ease;
}

.gauge-label {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    text-align: center;
}

.gauge-number {
    color: #f8fafc;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1;
}

.gauge-sub {
    color: #94a3b8;
    font-size: 0.78rem;
}

.global-side {
    flex: 1;
    min-width: 260px;
    display: grid;
    gap: 16px;
}

.recommendation-box {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 16px;
}

.recommendation-box h5 {
    margin: 0 0 12px;
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 700;
}

.recommendation-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
}

.recommendation-list li {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    color: #dbe4ee;
    line-height: 1.6;
}

.recommendation-list i {
    color: #94a3b8;
    margin-top: 3px;
    flex-shrink: 0;
}

.tone-success {
    color: #86efac !important;
    stroke: #22c55e;
}

.tone-warning {
    color: #fcd34d !important;
    stroke: #f59e0b;
}

.tone-danger {
    color: #fca5a5 !important;
    stroke: #ef4444;
}

.tone-neutral {
    color: #cbd5e1 !important;
    stroke: #94a3b8;
}

@media (max-width: 1199px) {
    .guide-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 767px) {
    .section-box {
        padding: 18px;
    }

    .guide-grid {
        grid-template-columns: 1fr;
    }

    .control-row {
        grid-template-columns: 1fr;
    }

    .action-button {
        width: 100%;
    }

    .card-head {
        flex-direction: column;
        align-items: flex-start;
    }

    .global-layout {
        gap: 18px;
    }

    .gauge-shell {
        width: 128px;
        height: 128px;
    }
}
</style>
