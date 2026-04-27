<template>
    <div class="galadriel-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-galadriel.png" alt="El espejo de Galadriel - OSINT Dashboard" />
        </section>
        <main class="content container py-5">
            <section class="mb-5">
                <div class="section-header mb-4">
                    <span class="section-label">Protocolo de análisis</span>
                    <h2 class="section-title">La Sabiduría del Espejo</h2>
                </div>
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="info-card h-100">
                            <div class="info-card-icon"><i class="bi bi-shield-lock"></i></div>
                            <h5>Hashing SHA-1</h5>
                            <p>Tus credenciales se transforman en hashes indescifrables. Solo los primeros 5 caracteres
                                viajan por la red, protegiendo tu secreto mediante <strong>k-anonymity</strong>.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info-card h-100">
                            <div class="info-card-icon"><i class="bi bi-search"></i></div>
                            <h5>Consulta en las Sombras</h5>
                            <p>Los servidores devuelven hashes similares. La comparación final ocurre <strong>en tu
                                    propio dispositivo</strong>, sin revelar tu identidad a ningún servidor externo.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info-card h-100">
                            <div class="info-card-icon"><i class="bi bi-eye-slash"></i></div>
                            <h5>Privacidad Garantizada</h5>
                            <p>Ninguna contraseña ni credencial completa abandona tu navegador. El análisis sigue el
                                estándar de privacidad de <strong>Have I Been Pwned</strong>.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="api-notice mb-5" v-if="!hibpApiKey">
                <div class="api-notice-icon"><i class="bi bi-key"></i></div>
                <div class="api-notice-body">
                    <strong>Consulta de brechas por email requiere API key de HIBP</strong>
                    <p class="mb-0 mt-1">
                        Have I Been Pwned requiere una API key para consultar brechas asociadas a un correo electrónico.
                        Puedes obtenerla en <a href="https://haveibeenpwned.com/API/Key" target="_blank"
                            rel="noopener">haveibeenpwned.com/API/Key</a>.
                        La consulta de contraseñas comprometidas <strong>no requiere key</strong> y funciona
                        completamente.
                    </p>
                    <div class="mt-3 d-flex gap-2 align-items-center flex-wrap">
                        <input v-model="hibpApiKeyInput" type="password"
                            class="form-control analysis-input api-key-input"
                            placeholder="Introduce tu HIBP API key (opcional)" />
                        <button class="btn btn-outline-gold" @click="saveApiKey" :disabled="!hibpApiKeyInput">
                            <i class="bi bi-check-lg me-1"></i>Guardar key
                        </button>
                    </div>
                </div>
            </div>
            <div class="api-notice api-notice-success mb-5" v-else>
                <div class="api-notice-icon"><i class="bi bi-key-fill"></i></div>
                <div class="api-notice-body">
                    <strong>HIBP API key configurada</strong>
                    <p class="mb-0 mt-1">Las consultas de brechas por email están activadas.</p>
                    <button class="btn btn-sm btn-outline-danger mt-2" @click="clearApiKey">
                        <i class="bi bi-x me-1"></i>Eliminar key
                    </button>
                </div>
            </div>

            <!-- Email Intelligence -->
            <section class="mb-5">
                <div class="section-header mb-4">
                    <span class="section-label">Módulo 01</span>
                    <h2 class="section-title">Inteligencia de Correo Electrónico</h2>
                </div>

                <div class="analysis-card">
                    <div class="row g-4 align-items-end mb-4">
                        <div class="col-md-8">
                            <label class="form-label field-label">Dirección de correo electrónico</label>
                            <input v-model="email" type="email" class="form-control analysis-input"
                                placeholder="usuario@dominio.com" @keyup.enter="checkEmail" />
                        </div>
                        <div class="col-md-4">
                            <button @click="checkEmail" :disabled="emailLoading || !email"
                                class="btn btn-analyze w-100">
                                <span v-if="emailLoading"
                                    class="d-flex align-items-center justify-content-center gap-2">
                                    <span class="spinner-border spinner-border-sm"></span>
                                    Consultando oráculos...
                                </span>
                                <span v-else class="d-flex align-items-center justify-content-center gap-2">
                                    <i class="bi bi-send"></i>
                                    Iniciar análisis
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Loading steps -->
                    <div v-if="emailLoading" class="loading-panel">
                        <div class="loading-steps">
                            <div v-for="(step, i) in emailLoadingSteps" :key="i"
                                :class="['loading-step', { active: step.active, done: step.done, failed: step.failed, skipped: step.skipped }]">
                                <div class="loading-step-icon">
                                    <span v-if="step.done" class="bi bi-check-lg"></span>
                                    <span v-else-if="step.failed" class="bi bi-x-lg"></span>
                                    <span v-else-if="step.skipped" class="bi bi-dash-lg"></span>
                                    <span v-else-if="step.active" class="spinner-border spinner-border-sm"></span>
                                    <span v-else class="bi bi-circle"></span>
                                </div>
                                <div class="loading-step-text">
                                    <span class="loading-step-name">{{ step.name }}</span>
                                    <span class="loading-step-status">{{ step.status }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Results -->
                    <div v-if="emailResult && !emailLoading" class="results-panel">

                        <div class="results-summary row g-3 mb-4">
                            <div class="col-6 col-md-3">
                                <div class="metric-box">
                                    <span class="metric-label">Puntuación de riesgo</span>
                                    <span :class="['metric-value', getScoreBadgeClass(emailScore)]">
                                        {{ emailScore }}<small>/100</small>
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="metric-box">
                                    <span class="metric-label">Correo válido</span>
                                    <span
                                        :class="['metric-badge', emailResult.valid ? 'badge-success' : 'badge-danger']">
                                        {{ emailResult.valid ? 'Válido' : 'Inválido' }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="metric-box">
                                    <span class="metric-label">Brechas detectadas</span>
                                    <span
                                        :class="['metric-value', (emailResult.breaches?.length || 0) > 0 ? 'text-danger' : 'text-success']">
                                        {{ emailResult.breaches?.length || 0 }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="metric-box">
                                    <span class="metric-label">Brechas recientes</span>
                                    <span
                                        :class="['metric-value', recentBreaches > 0 ? 'text-warning' : 'text-success']">
                                        {{ recentBreaches }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Source status -->
                        <h6 class="results-section-title mb-3">Oráculos consultados</h6>
                        <div class="row g-3 mb-4">

                            <!-- HIBP -->
                            <div class="col-md-4">
                                <div :class="['source-card', getSourceCardClass(emailResult.sources?.hibp)]">
                                    <div class="source-card-header">
                                        <span class="source-name">Have I Been Pwned</span>
                                        <span :class="['source-badge', getSourceBadgeClass(emailResult.sources?.hibp)]">
                                            {{ getSourceLabel(emailResult.sources?.hibp) }}
                                        </span>
                                    </div>
                                    <p class="source-desc">Base de datos de brechas de seguridad con k-anonymity.</p>
                                    <div class="source-data">
                                        <template v-if="emailResult.sources?.hibp?.success">
                                            <span>Brechas encontradas: <strong>{{
                                                    emailResult.sources.hibp.breaches?.length || 0 }}</strong></span>
                                        </template>
                                        <template v-else-if="emailResult.sources?.hibp?.skipped">
                                            <span class="text-muted">Requiere API key. <a
                                                    href="https://haveibeenpwned.com/API/Key" target="_blank"
                                                    rel="noopener" class="link-gold">Obtener key →</a></span>
                                        </template>
                                        <template v-else>
                                            <span class="text-danger small">{{ emailResult.sources?.hibp?.error ||
                                                'Error al consultar la API.' }}</span>
                                        </template>
                                    </div>
                                </div>
                            </div>

                            <!-- Validation -->
                            <div class="col-md-4">
                                <div :class="['source-card', getSourceCardClass(emailResult.sources?.validation)]">
                                    <div class="source-card-header">
                                        <span class="source-name">Validación de Email</span>
                                        <span
                                            :class="['source-badge', getSourceBadgeClass(emailResult.sources?.validation)]">
                                            {{ getSourceLabel(emailResult.sources?.validation) }}
                                        </span>
                                    </div>
                                    <p class="source-desc">Análisis sintáctico, detección de cuentas temporales y de
                                        rol.</p>
                                    <div class="source-data">
                                        <template v-if="emailResult.sources?.validation?.success">
                                            <span>Válido: <strong>{{ emailResult.valid ? 'Sí' : 'No' }}</strong></span>
                                            <span>Temporal: <strong>{{ emailResult.sources.validation.disposable ? 'Sí'
                                                    : 'No' }}</strong></span>
                                            <span>Cuenta de rol: <strong>{{ emailResult.sources.validation.role ? 'Sí' :
                                                    'No' }}</strong></span>
                                            <span v-if="emailResult.sources.validation.deliverable !== null">
                                                Entregable: <strong>{{ emailResult.sources.validation.deliverable ? 'Sí'
                                                    : 'No' }}</strong>
                                            </span>
                                        </template>
                                        <template v-else>
                                            <span class="text-muted small">{{ emailResult.sources?.validation?.error ||
                                                'No se pudo contactar la API.' }}</span>
                                            <span class="text-muted small">Se usó validación básica de formato.</span>
                                        </template>
                                    </div>
                                </div>
                            </div>

                            <!-- Gravatar -->
                            <div class="col-md-4">
                                <div :class="['source-card', getSourceCardClass(emailResult.sources?.gravatar)]">
                                    <div class="source-card-header">
                                        <span class="source-name">Gravatar</span>
                                        <span
                                            :class="['source-badge', getSourceBadgeClass(emailResult.sources?.gravatar)]">
                                            {{ getSourceLabel(emailResult.sources?.gravatar) }}
                                        </span>
                                    </div>
                                    <p class="source-desc">Indicador de presencia digital y actividad en servicios web.
                                    </p>
                                    <div class="source-data">
                                        <template v-if="emailResult.sources?.gravatar?.success">
                                            <span>Avatar registrado: <strong>{{ emailResult.hasGravatar ? 'Sí' : 'No'
                                                    }}</strong></span>
                                        </template>
                                        <template v-else>
                                            <span class="text-muted small">{{ emailResult.sources?.gravatar?.error ||
                                                'No se pudo contactar el servicio.' }}</span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Breach list -->
                        <div v-if="emailResult.breaches?.length > 0">
                            <h6 class="results-section-title mb-3">Brechas identificadas</h6>
                            <div class="row g-2">
                                <div v-for="breach in emailResult.breaches" :key="breach.Name || breach"
                                    class="col-6 col-md-4 col-lg-3">
                                    <div :class="['breach-tag', { 'breach-tag-recent': isRecentBreach(breach) }]">
                                        <i class="bi bi-exclamation-triangle me-1"></i>
                                        {{ breach.Name || breach }}
                                        <span v-if="isRecentBreach(breach)"
                                            class="breach-tag-recent-label">Reciente</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- Password Intelligence -->
            <section class="mb-5">
                <div class="section-header mb-4">
                    <span class="section-label">Módulo 02</span>
                    <h2 class="section-title">Inteligencia de Contraseña</h2>
                </div>

                <div class="analysis-card">
                    <div class="mb-3 p-3 rounded border border-success-subtle bg-success-subtle-dark">
                        <small class="text-success d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill"></i>
                            Esta consulta usa la API pública de HIBP Pwned Passwords. <strong>No requiere API
                                key</strong> y los
                            resultados son 100% reales.
                        </small>
                    </div>

                    <div class="row g-4 align-items-end mb-4">
                        <div class="col-md-8">
                            <label class="form-label field-label">Contraseña a analizar</label>
                            <div class="password-input-wrapper">
                                <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                    class="form-control analysis-input" placeholder="Introduce la contraseña"
                                    @keyup.enter="checkPassword" />
                                <button class="password-toggle" @click="showPassword = !showPassword" type="button">
                                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button @click="checkPassword" :disabled="passwordLoading || !password"
                                class="btn btn-analyze w-100">
                                <span v-if="passwordLoading"
                                    class="d-flex align-items-center justify-content-center gap-2">
                                    <span class="spinner-border spinner-border-sm"></span>
                                    Calculando hash SHA-1...
                                </span>
                                <span v-else class="d-flex align-items-center justify-content-center gap-2">
                                    <i class="bi bi-send"></i>
                                    Iniciar análisis
                                </span>
                            </button>
                        </div>
                    </div>

                    <div v-if="passwordLoading" class="loading-panel">
                        <div class="loading-steps">
                            <div :class="['loading-step', { active: true }]">
                                <div class="loading-step-icon">
                                    <span class="spinner-border spinner-border-sm"></span>
                                </div>
                                <div class="loading-step-text">
                                    <span class="loading-step-name">HIBP Pwned Passwords API</span>
                                    <span class="loading-step-status">Enviando prefijo SHA-1 · Comparando
                                        localmente...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="passwordResult && !passwordLoading" class="results-panel">
                        <div class="results-summary row g-3 mb-4">
                            <div class="col-6 col-md-4">
                                <div class="metric-box">
                                    <span class="metric-label">Fortaleza estimada</span>
                                    <span :class="['metric-value', getScoreBadgeClass(passwordScore)]">
                                        {{ passwordScore }}<small>/100</small>
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div class="metric-box">
                                    <span class="metric-label">Estado real (HIBP)</span>
                                    <span
                                        :class="['metric-badge', passwordResult.count > 0 ? 'badge-danger' : 'badge-success']">
                                        {{ passwordResult.count > 0 ? 'Comprometida' : 'No encontrada' }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div class="metric-box">
                                    <span class="metric-label">Apariciones en brechas</span>
                                    <span
                                        :class="['metric-value', passwordResult.count > 0 ? 'text-danger' : 'text-success']">
                                        {{ passwordResult.count.toLocaleString() }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div :class="['password-verdict', getPasswordVerdictClass()]">
                            <div class="password-verdict-icon">
                                <i
                                    :class="passwordResult.count > 0 ? 'bi bi-shield-x' : passwordScore >= 75 ? 'bi bi-shield-check' : 'bi bi-shield-exclamation'"></i>
                            </div>
                            <div class="password-verdict-body">
                                <strong>{{ getPasswordStatus() }}</strong>
                                <p class="mb-0 mt-1">{{ getPasswordRecommendation() }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Global Score -->
            <section v-if="globalScore !== null" class="mb-5">
                <div class="section-header mb-4">
                    <span class="section-label">Resultado final</span>
                    <h2 class="section-title">El Juicio del Espejo</h2>
                </div>
                <div class="analysis-card">
                    <div class="global-score-layout">
                        <div class="global-score-gauge">
                            <svg viewBox="0 0 120 120" class="gauge-svg">
                                <circle cx="60" cy="60" r="50" class="gauge-track" />
                                <circle cx="60" cy="60" r="50" class="gauge-fill"
                                    :style="{ strokeDashoffset: gaugeOffset }"
                                    :class="getScoreBadgeClass(globalScore)" />
                            </svg>
                            <div class="gauge-label">
                                <span class="gauge-number">{{ globalScore }}</span>
                                <span class="gauge-sub">/ 100</span>
                            </div>
                        </div>
                        <div class="global-score-details">
                            <div :class="['global-verdict-badge', getGlobalVerdictClass()]">
                                {{ getGlobalRiskLevel() }}
                            </div>
                            <ul class="recommendations-list mt-3">
                                <li v-for="rec in getRecommendations()" :key="rec">
                                    <i class="bi bi-chevron-right"></i>{{ rec }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── State ─────────────────────────────────────────────────────────────────────
const email = ref('')
const emailLoading = ref(false)
const emailResult = ref(null)

const password = ref('')
const passwordLoading = ref(false)
const passwordResult = ref(null)
const showPassword = ref(false)

const hibpApiKey = ref(localStorage.getItem('hibp_api_key') || '')
const hibpApiKeyInput = ref('')

const emailLoadingSteps = ref([])

function buildLoadingSteps() {
    return [
        { name: 'Have I Been Pwned', status: hibpApiKey.value ? 'En espera...' : 'Sin API key — se omitirá', active: false, done: false, failed: false, skipped: !hibpApiKey.value },
        { name: 'Validación de email', status: 'En espera...', active: false, done: false, failed: false, skipped: false },
        { name: 'Gravatar', status: 'En espera...', active: false, done: false, failed: false, skipped: false },
    ]
}

function saveApiKey() {
    hibpApiKey.value = hibpApiKeyInput.value.trim()
    localStorage.setItem('hibp_api_key', hibpApiKey.value)
    hibpApiKeyInput.value = ''
}
function clearApiKey() {
    hibpApiKey.value = ''
    localStorage.removeItem('hibp_api_key')
}

// ── Computed ──────────────────────────────────────────────────────────────────
const recentBreaches = computed(() => {
    if (!emailResult.value?.breaches?.length) return 0
    const currentYear = new Date().getFullYear()
    return emailResult.value.breaches.filter(b => {
        const year = b.BreachDate
            ? parseInt(b.BreachDate.substring(0, 4))
            : parseInt((b.Name || b).toString().split('-')[0])
        return year && (currentYear - year) <= 2
    }).length
})

const emailScore = computed(() => {
    if (!emailResult.value) return null
    let score = 100
    const breaches = emailResult.value.breaches?.length || 0
    score -= (breaches * 5) + (recentBreaches.value * 10)
    if (!emailResult.value.valid) score -= 30
    if (emailResult.value.hasGravatar) score += 5
    if (emailResult.value.sources?.validation?.disposable) score -= 20
    if (emailResult.value.sources?.validation?.role) score -= 10
    return Math.max(0, Math.min(100, Math.round(score)))
})

const passwordScore = computed(() => {
    if (password.value === '') return null
    let score = 0
    const pwd = password.value
    if (pwd.length >= 16) score += 35
    else if (pwd.length >= 12) score += 25
    else if (pwd.length >= 8) score += 12
    else score += 4
    if (/[A-Z]/.test(pwd)) score += 12
    if (/[a-z]/.test(pwd)) score += 8
    if (/[0-9]/.test(pwd)) score += 10
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20
    if (/123|password|admin|qwerty|letmein|welcome/i.test(pwd)) score -= 30
    if (/(.)\1{2,}/.test(pwd)) score -= 15
    if (passwordResult.value?.count > 0) score = Math.min(score, 20)
    return Math.max(0, Math.min(100, score))
})

const globalScore = computed(() => {
    if (emailScore.value === null || passwordScore.value === null) return null
    return Math.round((emailScore.value + passwordScore.value) / 2)
})

const gaugeOffset = computed(() => {
    if (globalScore.value === null) return 314
    return 314 - (globalScore.value / 100) * 314
})

// ── Email check ───────────────────────────────────────────────────────────────
async function checkEmail() {
    if (!email.value) return
    emailLoading.value = true
    emailResult.value = null
    emailLoadingSteps.value = buildLoadingSteps()
    const step = emailLoadingSteps.value

    // 1. HIBP breaches
    let hibpResult
    if (!hibpApiKey.value) {
        hibpResult = { success: false, skipped: true, found: false, breaches: [], error: 'API key no configurada.' }
    } else {
        step[0].active = true
        step[0].skipped = false
        step[0].status = 'Consultando haveibeenpwned.com...'
        hibpResult = await fetchHIBPBreaches(email.value)
        step[0].active = false
        if (hibpResult.success) { step[0].done = true; step[0].status = `${hibpResult.breaches.length} brechas encontradas` }
        else { step[0].failed = true; step[0].status = hibpResult.error || 'Error de red' }
    }

    // 2. Email validation
    step[1].active = true
    step[1].status = 'Consultando eva.pingutil.com...'
    const validationResult = await fetchEmailValidation(email.value)
    step[1].active = false
    if (validationResult.success) { step[1].done = true; step[1].status = 'Validación completada' }
    else { step[1].failed = true; step[1].status = validationResult.error || 'Error de red' }

    // 3. Gravatar
    step[2].active = true
    step[2].status = 'Consultando gravatar.com...'
    const gravatarResult = await fetchGravatar(email.value)
    step[2].active = false
    if (gravatarResult.success) { step[2].done = true; step[2].status = gravatarResult.hasGravatar ? 'Avatar encontrado' : 'Sin avatar registrado' }
    else { step[2].failed = true; step[2].status = gravatarResult.error || 'Error de red' }

    emailResult.value = {
        found: hibpResult.found,
        breaches: hibpResult.breaches || [],
        valid: validationResult.valid,
        hasGravatar: gravatarResult.hasGravatar,
        sources: {
            hibp: hibpResult,
            validation: validationResult,
            gravatar: gravatarResult,
        }
    }

    emailLoading.value = false
}

// ── Password check ────────────────────────────────────────────────────────────
async function checkPassword() {
    if (!password.value) return
    passwordLoading.value = true
    passwordResult.value = null
    try {
        const enc = new TextEncoder().encode(password.value)
        const buf = await crypto.subtle.digest('SHA-1', enc)
        const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
        const prefix = hex.slice(0, 5)
        const suffix = hex.slice(5)

        const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: { 'Add-Padding': 'true' }   // padding mode for extra privacy
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        const match = text.split('\n').find(l => l.toUpperCase().startsWith(suffix))
        const count = match ? parseInt(match.split(':')[1], 10) : 0
        passwordResult.value = { count, success: true }
    } catch (err) {
        passwordResult.value = { count: 0, success: false, error: err.message }
    } finally {
        passwordLoading.value = false
    }
}

// ── API helpers ───────────────────────────────────────────────────────────────

/**
 * HIBP v3 — requires API key (paid, ~3.50 USD/mo)
 * https://haveibeenpwned.com/API/v3#BreachedAccount
 */
async function fetchHIBPBreaches(emailAddr) {
    try {
        const res = await fetch(
            `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(emailAddr)}?truncateResponse=false`,
            {
                headers: {
                    'hibp-api-key': hibpApiKey.value,
                    'User-Agent': 'GaladrielOSINT/1.0',
                }
            }
        )
        if (res.status === 404) {
            // 404 means "no breaches found" — this is a valid successful response
            return { success: true, found: false, breaches: [] }
        }
        if (res.status === 401) {
            return { success: false, found: false, breaches: [], error: 'API key inválida o sin permisos.' }
        }
        if (res.status === 429) {
            return { success: false, found: false, breaches: [], error: 'Límite de peticiones alcanzado. Espera un momento.' }
        }
        if (!res.ok) {
            return { success: false, found: false, breaches: [], error: `Error HTTP ${res.status}` }
        }
        const data = await res.json()
        return { success: true, found: true, breaches: data }
    } catch (err) {
        return { success: false, found: false, breaches: [], error: `Error de red: ${err.message}` }
    }
}

/**
 * EVA by Pingutil — free, no key required
 * https://eva.pingutil.com/
 */
async function fetchEmailValidation(emailAddr) {
    try {
        const res = await fetch(`https://api.eva.pingutil.com/email?email=${encodeURIComponent(emailAddr)}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        // EVA returns { status, data: { email_address, domain, valid_syntax, disposable, ... } }
        const d = json.data || json
        return {
            success: true,
            valid: d.valid_syntax ?? d.valid ?? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr),
            disposable: d.disposable ?? false,
            role: d.role_account ?? d.role ?? false,
            deliverable: d.deliverable ?? null,
        }
    } catch (err) {
        // Graceful fallback: basic regex validation if API unreachable
        return {
            success: false,
            valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddr),
            disposable: false,
            role: false,
            deliverable: null,
            error: `No se pudo contactar eva.pingutil.com: ${err.message}`,
        }
    }
}

/**
 * Gravatar — public, no key required
 * SHA-256 of lowercase email → HEAD request
 */
async function fetchGravatar(emailAddr) {
    try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(emailAddr.toLowerCase().trim()))
        const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
        const res = await fetch(`https://www.gravatar.com/avatar/${hex}?d=404&s=1`, { method: 'HEAD' })
        return { success: true, hasGravatar: res.ok }
    } catch (err) {
        return { success: false, hasGravatar: false, error: `No se pudo contactar gravatar.com: ${err.message}` }
    }
}

function getSourceCardClass(src) {
    if (!src) return ''
    if (src.skipped) return 'source-skipped'
    if (src.success) return 'source-ok'
    return 'source-fail'
}
function getSourceBadgeClass(src) {
    if (!src) return 'badge-muted'
    if (src.skipped) return 'badge-muted'
    if (src.success) return 'badge-success'
    return 'badge-danger'
}
function getSourceLabel(src) {
    if (!src) return '—'
    if (src.skipped) return 'Omitido'
    if (src.success) return 'Exitoso'
    return 'Fallido'
}

function getScoreBadgeClass(score) {
    if (score >= 75) return 'score-good'
    if (score >= 45) return 'score-medium'
    return 'score-bad'
}
function getPasswordVerdictClass() {
    if (!passwordResult.value) return ''
    if (passwordResult.value.count > 0) return 'verdict-danger'
    if (passwordScore.value >= 75) return 'verdict-success'
    return 'verdict-warning'
}
function getPasswordStatus() {
    if (passwordResult.value?.count > 0) return 'Contraseña comprometida'
    if (passwordScore.value >= 75) return 'Contraseña robusta'
    if (passwordScore.value >= 45) return 'Contraseña mejorable'
    return 'Contraseña muy débil'
}
function getPasswordRecommendation() {
    if (passwordResult.value?.count > 0)
        return `Expuesta ${passwordResult.value.count.toLocaleString()} veces en brechas reales según HIBP. Cámbiala de inmediato en todos los servicios donde la uses.`
    if (passwordScore.value >= 75)
        return 'No se encontró esta contraseña en ninguna brecha conocida. Recuerda no reutilizarla en otros servicios.'
    if (passwordScore.value >= 45)
        return 'No está comprometida, pero su fortaleza es mejorable. Añade longitud y símbolos especiales.'
    return 'Contraseña muy débil. Usa un gestor de contraseñas para generar una robusta y única.'
}
function getGlobalVerdictClass() {
    if (globalScore.value >= 75) return 'verdict-success'
    if (globalScore.value >= 45) return 'verdict-warning'
    return 'verdict-danger'
}
function getGlobalRiskLevel() {
    if (globalScore.value >= 75) return 'Riesgo bajo — Las sombras se retiran'
    if (globalScore.value >= 45) return 'Riesgo medio — La niebla se espesa'
    return 'Riesgo alto — Las huestes oscuras se acercan'
}
function getRecommendations() {
    const recs = []
    if (emailScore.value !== null && emailScore.value < 60)
        recs.push('Activa la autenticación de dos factores en todos tus servicios críticos.')
    if (passwordScore.value !== null && passwordScore.value < 60)
        recs.push('Cambia tu contraseña y no la reutilices en otros servicios.')
    if (emailResult.value?.breaches?.length > 0)
        recs.push('Revisa los servicios donde apareces comprometido y rota las credenciales afectadas.')
    if (recentBreaches.value > 0)
        recs.push('Hay brechas recientes. Prioriza el cambio de contraseña en esos servicios ahora mismo.')
    if (recs.length === 0)
        recs.push('Mantén buenas prácticas: contraseñas únicas, 2FA activo y revisiones periódicas.')
    return recs
}
function isRecentBreach(breach) {
    const year = breach.BreachDate
        ? parseInt(breach.BreachDate.substring(0, 4))
        : parseInt((breach.Name || breach).toString().split('-')[0])
    return year && (new Date().getFullYear() - year) <= 2
}
</script>

<style scoped>
.galadriel-page {
    background-color: #0d1117;
    color: #e6edf3;
    min-height: 100vh;
    font-family: 'EB Garamond', 'Palatino Linotype', Georgia, serif;
}

/* Hero */
.hero-banner {
    position: relative;
    margin-top: 53px;
    max-height: 420px;
}

.hero-banner img {
    width: 100%;
    display: block;
}

/* Section header */
.section-label {
    display: block;
    font-family: 'Courier New', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 0.35rem;
}

.section-title {
    font-size: 1.6rem;
    font-weight: 400;
    color: #e6edf3;
    margin: 0;
}

/* Info cards */
.info-card {
    background: #161b22;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1.5rem;
    transition: border-color 0.2s;
}

.info-card:hover {
    border-color: rgba(201, 168, 76, 0.3);
}

.info-card-icon {
    font-size: 1.4rem;
    color: #c9a84c;
    margin-bottom: 0.75rem;
}

.info-card h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #e6edf3;
    margin-bottom: 0.5rem;
}

.info-card p {
    font-size: 0.875rem;
    color: #8b949e;
    margin: 0;
    line-height: 1.6;
}

/* API notice */
.api-notice {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: #161b22;
    border: 1px solid rgba(210, 153, 34, 0.3);
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
}

.api-notice-success {
    border-color: rgba(63, 185, 80, 0.3);
}

.api-notice-icon {
    font-size: 1.3rem;
    color: #c9a84c;
    flex-shrink: 0;
    padding-top: 2px;
}

.api-notice-success .api-notice-icon {
    color: #3fb950;
}

.api-notice-body {
    flex: 1;
    font-size: 0.9rem;
    color: #e6edf3;
}

.api-notice-body p {
    color: #8b949e;
    font-size: 0.85rem;
}

.api-notice-body a {
    color: #c9a84c;
    text-decoration: none;
}

.api-notice-body a:hover {
    text-decoration: underline;
}

.api-key-input {
    max-width: 320px;
}

.btn-outline-gold {
    background: transparent;
    border: 1px solid #c9a84c;
    color: #c9a84c;
    border-radius: 6px;
    font-size: 0.85rem;
    padding: 0.45rem 1rem;
    font-family: inherit;
    white-space: nowrap;
}

.btn-outline-gold:hover:not(:disabled) {
    background: rgba(201, 168, 76, 0.1);
    color: #c9a84c;
}

.btn-outline-gold:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.analysis-card {
    background: #161b22;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 2rem;
}

.field-label {
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #8b949e;
    margin-bottom: 0.5rem;
}

.analysis-input {
    background: #1c2333 !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 6px !important;
    color: #e6edf3 !important;
    font-family: inherit;
    font-size: 0.95rem;
    padding: 0.65rem 1rem;
    transition: border-color 0.2s;
}

.analysis-input:focus {
    border-color: #c9a84c !important;
    box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1) !important;
    outline: none;
}

.analysis-input::placeholder {
    color: rgba(139, 148, 158, 0.4) !important;
}

.password-input-wrapper {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #8b949e;
    cursor: pointer;
    padding: 0;
}

.password-toggle:hover {
    color: #e6edf3;
}

.btn-analyze {
    background: #c9a84c;
    border: none;
    border-radius: 6px;
    color: #0d1117;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.65rem 1.5rem;
    letter-spacing: 0.02em;
    transition: background 0.2s, opacity 0.2s;
}

.btn-analyze:hover:not(:disabled) {
    background: #d4b05a;
    color: #0d1117;
}

.btn-analyze:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.bg-success-subtle-dark {
    background: rgba(63, 185, 80, 0.06) !important;
}

.border-success-subtle {
    border-color: rgba(63, 185, 80, 0.25) !important;
}

/* Loading */
.loading-panel {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1.5rem;
}

.loading-steps {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.loading-step {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: #1c2333;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    transition: border-color 0.3s;
}

.loading-step.active {
    border-color: #c9a84c;
}

.loading-step.done {
    border-color: rgba(63, 185, 80, 0.4);
}

.loading-step.failed {
    border-color: rgba(248, 81, 73, 0.4);
}

.loading-step.skipped {
    opacity: 0.45;
}

.loading-step-icon {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
}

.loading-step.active .loading-step-icon {
    color: #c9a84c;
}

.loading-step.done .loading-step-icon {
    color: #3fb950;
}

.loading-step.failed .loading-step-icon {
    color: #f85149;
}

.loading-step.skipped .loading-step-icon {
    color: #8b949e;
}

.loading-step-text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.loading-step-name {
    font-size: 0.88rem;
    color: #e6edf3;
}

.loading-step-status {
    font-size: 0.73rem;
    color: #8b949e;
    font-family: 'Courier New', monospace;
}

.results-panel {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1.5rem;
    animation: fadeSlideIn 0.35s ease;
}

@keyframes fadeSlideIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.results-section-title {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #8b949e;
}

/* Metrics */
.metric-box {
    background: #1c2333;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    height: 100%;
}

.metric-label {
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8b949e;
}

.metric-value {
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1;
}

.metric-value small {
    font-size: 0.85rem;
    opacity: 0.55;
    margin-left: 2px;
}

.score-good {
    color: #3fb950;
}

.score-medium {
    color: #d29922;
}

.score-bad {
    color: #f85149;
}

.metric-badge {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.28rem 0.7rem;
    border-radius: 20px;
}

.badge-success {
    background: rgba(63, 185, 80, 0.15);
    color: #3fb950;
    border: 1px solid rgba(63, 185, 80, 0.3);
}

.badge-danger {
    background: rgba(248, 81, 73, 0.15);
    color: #f85149;
    border: 1px solid rgba(248, 81, 73, 0.3);
}

.badge-warning {
    background: rgba(210, 153, 34, 0.15);
    color: #d29922;
    border: 1px solid rgba(210, 153, 34, 0.3);
}

.badge-muted {
    background: rgba(139, 148, 158, 0.1);
    color: #8b949e;
    border: 1px solid rgba(139, 148, 158, 0.2);
}

/* Source cards */
.source-card {
    background: #1c2333;
    border-radius: 8px;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.07);
    height: 100%;
}

.source-ok {
    border-color: rgba(63, 185, 80, 0.25);
}

.source-fail {
    border-color: rgba(248, 81, 73, 0.2);
}

.source-skipped {
    opacity: 0.6;
}

.source-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.source-name {
    font-size: 0.88rem;
    font-weight: 600;
    color: #e6edf3;
}

.source-desc {
    font-size: 0.78rem;
    color: #8b949e;
    margin-bottom: 0.75rem;
    line-height: 1.5;
}

.source-data {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.8rem;
    color: #8b949e;
}

.source-data strong {
    color: #e6edf3;
}

.link-gold {
    color: #c9a84c;
    text-decoration: none;
}

.link-gold:hover {
    text-decoration: underline;
}

/* Breach tags */
.breach-tag {
    background: #1c2333;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 5px;
    padding: 0.4rem 0.7rem;
    font-size: 0.76rem;
    color: #8b949e;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-wrap: wrap;
}

.breach-tag-recent {
    border-color: rgba(210, 153, 34, 0.4);
    color: #d29922;
}

.breach-tag-recent-label {
    font-size: 0.62rem;
    background: rgba(210, 153, 34, 0.15);
    border-radius: 3px;
    padding: 1px 5px;
    margin-left: auto;
}

/* Password verdict */
.password-verdict {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 8px;
    border: 1px solid;
}

.verdict-success {
    background: rgba(63, 185, 80, 0.07);
    border-color: rgba(63, 185, 80, 0.3);
}

.verdict-warning {
    background: rgba(210, 153, 34, 0.07);
    border-color: rgba(210, 153, 34, 0.3);
}

.verdict-danger {
    background: rgba(248, 81, 73, 0.07);
    border-color: rgba(248, 81, 73, 0.3);
}

.password-verdict-icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
    padding-top: 2px;
}

.verdict-success .password-verdict-icon {
    color: #3fb950;
}

.verdict-warning .password-verdict-icon {
    color: #d29922;
}

.verdict-danger .password-verdict-icon {
    color: #f85149;
}

.password-verdict-body {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #e6edf3;
}

.password-verdict-body p {
    color: #8b949e;
    font-size: 0.85rem;
}

/* Gauge */
.global-score-layout {
    display: flex;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
}

.global-score-gauge {
    position: relative;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
}

.gauge-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

.gauge-track {
    fill: none;
    stroke: #1c2333;
    stroke-width: 8;
}

.gauge-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 314;
    transition: stroke-dashoffset 1s ease;
}

.gauge-fill.score-good {
    stroke: #3fb950;
}

.gauge-fill.score-medium {
    stroke: #d29922;
}

.gauge-fill.score-bad {
    stroke: #f85149;
}

.gauge-label {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.gauge-number {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1;
    color: #e6edf3;
}

.gauge-sub {
    font-size: 0.75rem;
    color: #8b949e;
}

.global-score-details {
    flex: 1;
    min-width: 200px;
}

.global-verdict-badge {
    display: inline-block;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: 20px;
}

.recommendations-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.recommendations-list li {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #8b949e;
    line-height: 1.5;
}

.recommendations-list .bi-chevron-right {
    color: #c9a84c;
    font-size: 0.7rem;
    flex-shrink: 0;
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .hero-overlay {
        padding: 1.5rem;
    }

    .analysis-card {
        padding: 1.25rem;
    }

    .api-notice {
        flex-direction: column;
    }

    .global-score-layout {
        gap: 1.5rem;
    }

    .global-score-gauge {
        width: 110px;
        height: 110px;
    }
}

.info-card p,
.api-notice-body p,
.field-label,
.loading-step-status,
.source-desc,
.source-data,
.breach-tag,
.password-verdict-body p,
.recommendations-list li {
    color: #c9d1d9 !important;
}

.analysis-input::placeholder {
    color: rgba(180, 190, 200, 0.55) !important;
}

.field-label,
.metric-label,
.results-section-title {
    color: #c9d1d9 !important;
}
</style>