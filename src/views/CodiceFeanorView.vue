<template>
    <div class="feanor-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-feanor.png" alt="El Codice de Feanor" />
        </section>

        <div class="container py-5">
            <section class="section-box intro-box">
                <div class="intro-layout">
                    <div class="section-heading">
                        <span class="section-kicker">Criptografia local y parsing tecnico</span>
                        <h1 class="section-name">El Codice de Feanor</h1>
                        <p class="section-copy">
                            Un taller local para transformar, inspeccionar y comparar material tecnico desde el
                            navegador. Todo ocurre en cliente: hashes, HMAC, PBKDF2, cifrado simetrico, JWT, Base64,
                            JSON, regex y generacion de secretos sin depender de backend.
                        </p>
                    </div>

                    <div class="intro-emblem">
                        <img src="@/assets/logos/feanor.png" alt="Sello de Feanor" />
                        <span>6 modulos enlazados</span>
                        <small>Utilidades pensadas para trabajo de auditoria, debugging y validacion rapida.</small>
                    </div>
                </div>

                <div class="guide-grid">
                    <div class="guide-card">
                        <label>Hashing serio</label>
                        <span>Digest, HMAC y PBKDF2 con control de algoritmo, salt, iteraciones, formato y
                            comparacion.</span>
                    </div>
                    <div class="guide-card">
                        <label>Cifrado local</label>
                        <span>AES, DES, TripleDES, RC4 y Rabbit para pruebas rapidas de texto y compatibilidad.</span>
                    </div>
                    <div class="guide-card">
                        <label>Parsing util</label>
                        <span>JWT, Base64, Base64URL, URL, Hex, JSON canonico y diffs listos para revisar.</span>
                    </div>
                    <div class="guide-card">
                        <label>Cadena de trabajo</label>
                        <span>Los resultados se pueden copiar o reaprovechar entre modulos para iterar sin salir de la
                            vista.</span>
                    </div>
                </div>
            </section>

            <section class="section-box">
                <div class="module-header">
                    <span class="section-kicker">Modulo 01</span>
                    <h2 class="module-title">Laboratorio de hash, HMAC y PBKDF2</h2>
                    <p class="module-copy">
                        Calcula huellas, deriva claves, compara salidas esperadas y valida si el material coincide con
                        un valor de referencia. Pensado para verificacion rapida, no para custodiar secretos.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="hash-mode">Modo</label>
                        <select id="hash-mode" v-model="hashMode" class="form-select input-dark">
                            <option v-for="item in hashModes" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="hash-algorithm">Algoritmo</label>
                        <select id="hash-algorithm" v-model="hashAlgorithm" class="form-select input-dark">
                            <option v-for="item in hashAlgorithms" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="hash-encoding">Salida</label>
                        <select id="hash-encoding" v-model="hashEncoding" class="form-select input-dark">
                            <option v-for="item in hashEncodings" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="hash-expected">Comparar con</label>
                        <input
                            id="hash-expected"
                            v-model.trim="hashExpected"
                            class="form-control input-dark"
                            placeholder="Valor esperado opcional"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="hash-input">Mensaje o material base</label>
                        <textarea
                            id="hash-input"
                            v-model="hashInput"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Texto, contrasena, payload o cualquier material de entrada"
                        ></textarea>
                    </div>
                    <div v-if="hashMode === 'hmac'" class="control-field full-span">
                        <label class="field-label" for="hash-secret">Clave secreta</label>
                        <input
                            id="hash-secret"
                            v-model="hashSecret"
                            class="form-control input-dark"
                            placeholder="Clave para el HMAC"
                        />
                    </div>
                    <template v-if="hashMode === 'pbkdf2'">
                        <div class="control-field">
                            <label class="field-label" for="hash-salt">Salt</label>
                            <input
                                id="hash-salt"
                                v-model="hashSalt"
                                class="form-control input-dark"
                                placeholder="Salt unico"
                            />
                        </div>
                        <div class="control-field">
                            <label class="field-label" for="hash-iterations">Iteraciones</label>
                            <input
                                id="hash-iterations"
                                v-model.number="hashIterations"
                                type="number"
                                min="1000"
                                step="1000"
                                class="form-control input-dark"
                            />
                        </div>
                        <div class="control-field">
                            <label class="field-label" for="hash-key-size">Bytes derivados</label>
                            <input
                                id="hash-key-size"
                                v-model.number="hashKeySize"
                                type="number"
                                min="16"
                                step="16"
                                class="form-control input-dark"
                            />
                        </div>
                    </template>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runHashLab">Calcular</button>
                    <button class="btn btn-subtle" @click="fillHashExample">Cargar ejemplo</button>
                    <button v-if="hashMode === 'pbkdf2'" class="btn btn-subtle" @click="generateHashSalt">
                        Nuevo salt
                    </button>
                    <button
                        v-if="secretResult?.generated"
                        class="btn btn-subtle"
                        @click="hashSecret = secretResult.generated"
                    >
                        Usar ultimo secreto
                    </button>
                </div>
                <p class="helper-copy">
                    Consejo: usa <code class="inline-code">PBKDF2</code> para derivacion, <code class="inline-code">HMAC</code>
                    para integridad y evita <code class="inline-code">MD5</code> o <code class="inline-code">SHA1</code>
                    salvo compatibilidad.
                </p>

                <template v-if="hashResult">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in hashResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="hashResult.verdictTone">
                        <div class="verdict-icon">
                            <span>HASH</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ hashResult.verdictTitle }}</strong>
                            <p>{{ hashResult.verdictBody }}</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in hashResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-6" v-for="panel in hashResult.panels" :key="panel.title">
                            <div class="tool-card">
                                <div class="card-head">
                                    <h5>{{ panel.title }}</h5>
                                    <div class="card-actions">
                                        <span class="mini-badge">{{ panel.badge }}</span>
                                        <button
                                            v-if="panel.copyValue"
                                            class="btn btn-quiet"
                                            @click="copyText(panel.copyValue)"
                                        >
                                            Copiar
                                        </button>
                                    </div>
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
                    <h2 class="module-title">Cifrado y descifrado simetrico</h2>
                    <p class="module-copy">
                        Prueba cifrados soportados por <code class="inline-code">crypto-js</code>, genera claves de
                        apoyo y reutiliza resultados entre modulos para comprobar pipelines sencillos.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="cipher-algorithm">Algoritmo</label>
                        <select id="cipher-algorithm" v-model="cipherAlgorithm" class="form-select input-dark">
                            <option v-for="item in cipherAlgorithms" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="cipher-key">Clave o passphrase</label>
                        <input
                            id="cipher-key"
                            v-model="cipherKey"
                            class="form-control input-dark"
                            placeholder="Clave usada para cifrar o descifrar"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="cipher-input">Texto plano o cifrado</label>
                        <textarea
                            id="cipher-input"
                            v-model="cipherInput"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Introduce el texto plano o la cadena cifrada"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runCipher('encrypt')">Cifrar</button>
                    <button class="btn btn-subtle" @click="runCipher('decrypt')">Descifrar</button>
                    <button class="btn btn-subtle" @click="generateCipherKey">Generar clave</button>
                    <button class="btn btn-subtle" @click="fillCipherExample">Cargar ejemplo</button>
                    <button
                        v-if="cipherResult?.primaryValue"
                        class="btn btn-subtle"
                        @click="cipherInput = cipherResult.primaryValue"
                    >
                        Pasar salida a entrada
                    </button>
                </div>
                <p class="helper-copy">
                    Nota: este modulo usa la interfaz de passphrase de <code class="inline-code">crypto-js</code>. Es
                    perfecto para pruebas locales, no para disenar un esquema criptografico de produccion.
                </p>

                <template v-if="cipherResult">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in cipherResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="cipherResult.verdictTone">
                        <div class="verdict-icon">
                            <span>CIPH</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ cipherResult.verdictTitle }}</strong>
                            <p>{{ cipherResult.verdictBody }}</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in cipherResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-6" v-for="panel in cipherResult.panels" :key="panel.title">
                            <div class="tool-card">
                                <div class="card-head">
                                    <h5>{{ panel.title }}</h5>
                                    <div class="card-actions">
                                        <span class="mini-badge">{{ panel.badge }}</span>
                                        <button
                                            v-if="panel.copyValue"
                                            class="btn btn-quiet"
                                            @click="copyText(panel.copyValue)"
                                        >
                                            Copiar
                                        </button>
                                    </div>
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
                    <h2 class="module-title">Inspector de JWT</h2>
                    <p class="module-copy">
                        Decodifica cabecera y payload, revisa tiempos, algoritmos, audiencias, emisor y cabeceras
                        delicadas sin verificar la firma. Ideal para revisar estructura y claims de forma inmediata.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field full-span">
                        <label class="field-label" for="jwt-input">Token JWT</label>
                        <textarea
                            id="jwt-input"
                            v-model="jwtInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="eyJhbGciOi...payload...firma"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="decodeJwtToken">Inspeccionar</button>
                    <button class="btn btn-subtle" @click="fillJwtExample">Cargar ejemplo</button>
                    <button
                        v-if="jwtResult?.payloadText"
                        class="btn btn-subtle"
                        @click="jsonDocA = jwtResult.payloadText"
                    >
                        Enviar payload a JSON
                    </button>
                </div>
                <p class="helper-copy">
                    Este modulo no valida firmas. Lee la estructura del token y resalta senales visibles desde el lado
                    cliente.
                </p>

                <template v-if="jwtResult">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in jwtResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="jwtResult.verdictTone">
                        <div class="verdict-icon">
                            <span>JWT</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ jwtResult.verdictTitle }}</strong>
                            <p>{{ jwtResult.verdictBody }}</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in jwtResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-6" v-for="panel in jwtResult.panels" :key="panel.title">
                            <div class="tool-card">
                                <div class="card-head">
                                    <h5>{{ panel.title }}</h5>
                                    <div class="card-actions">
                                        <span class="mini-badge">{{ panel.badge }}</span>
                                        <button
                                            v-if="panel.copyValue"
                                            class="btn btn-quiet"
                                            @click="copyText(panel.copyValue)"
                                        >
                                            Copiar
                                        </button>
                                    </div>
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
                    <span class="section-kicker">Modulo 04</span>
                    <h2 class="module-title">Transformaciones y codificaciones</h2>
                    <p class="module-copy">
                        Convierte material entre Base64, Base64URL, URL encoding y Hex, y detecta si la salida tiene
                        pinta de JSON o de segmento reutilizable en otros modulos.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="transform-operation">Operacion</label>
                        <select id="transform-operation" v-model="transformOperation" class="form-select input-dark">
                            <option v-for="item in transformOperations" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="transform-input">Entrada</label>
                        <textarea
                            id="transform-input"
                            v-model="transformInput"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Texto o material codificado"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runTransform">Aplicar</button>
                    <button class="btn btn-subtle" @click="fillTransformExample">Cargar ejemplo</button>
                    <button
                        v-if="transformResult?.primaryValue"
                        class="btn btn-subtle"
                        @click="transformInput = transformResult.primaryValue"
                    >
                        Pasar salida a entrada
                    </button>
                    <button
                        v-if="transformResult?.primaryValue"
                        class="btn btn-subtle"
                        @click="jsonDocA = transformResult.primaryValue"
                    >
                        Enviar a JSON
                    </button>
                </div>

                <template v-if="transformResult">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in transformResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="transformResult.verdictTone">
                        <div class="verdict-icon">
                            <span>XFRM</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ transformResult.verdictTitle }}</strong>
                            <p>{{ transformResult.verdictBody }}</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in transformResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-6" v-for="panel in transformResult.panels" :key="panel.title">
                            <div class="tool-card">
                                <div class="card-head">
                                    <h5>{{ panel.title }}</h5>
                                    <div class="card-actions">
                                        <span class="mini-badge">{{ panel.badge }}</span>
                                        <button
                                            v-if="panel.copyValue"
                                            class="btn btn-quiet"
                                            @click="copyText(panel.copyValue)"
                                        >
                                            Copiar
                                        </button>
                                    </div>
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
                    <span class="section-kicker">Modulo 05</span>
                    <h2 class="module-title">Laboratorio JSON y diff canonico</h2>
                    <p class="module-copy">
                        Formatea, minifica, valida y compara dos documentos JSON ignorando el orden de las claves para
                        obtener una lectura mas fiel de los cambios reales.
                    </p>
                </div>

                <div class="row g-3">
                    <div class="col-xl-6">
                        <div class="control-field">
                            <label class="field-label" for="json-doc-a">Documento A</label>
                            <textarea
                                id="json-doc-a"
                                v-model="jsonDocA"
                                class="form-control input-dark textarea-dark tall-textarea"
                                rows="10"
                                placeholder='{"servicio":"gateway","tls":true}'
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="control-field">
                            <label class="field-label" for="json-doc-b">Documento B</label>
                            <textarea
                                id="json-doc-b"
                                v-model="jsonDocB"
                                class="form-control input-dark textarea-dark tall-textarea"
                                rows="10"
                                placeholder='{"servicio":"gateway","tls":false}'
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="inspectJsonDocs('comparacion')">Comparar</button>
                    <button class="btn btn-subtle" @click="formatJsonDoc('a', true)">Formatear A</button>
                    <button class="btn btn-subtle" @click="formatJsonDoc('b', true)">Formatear B</button>
                    <button class="btn btn-subtle" @click="formatJsonDoc('a', false)">Minificar A</button>
                    <button class="btn btn-subtle" @click="formatJsonDoc('b', false)">Minificar B</button>
                    <button class="btn btn-subtle" @click="fillJsonExample">Cargar ejemplo</button>
                </div>
                <p class="helper-copy">
                    La comparacion usa una representacion canonica para que un simple cambio de orden no parezca una
                    diferencia semantica.
                </p>

                <template v-if="jsonResult">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in jsonResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="jsonResult.verdictTone">
                        <div class="verdict-icon">
                            <span>JSON</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ jsonResult.verdictTitle }}</strong>
                            <p>{{ jsonResult.verdictBody }}</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in jsonResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-4" v-for="panel in jsonResult.panels" :key="panel.title">
                            <div class="tool-card">
                                <div class="card-head">
                                    <h5>{{ panel.title }}</h5>
                                    <div class="card-actions">
                                        <span class="mini-badge">{{ panel.badge }}</span>
                                        <button
                                            v-if="panel.copyValue"
                                            class="btn btn-quiet"
                                            @click="copyText(panel.copyValue)"
                                        >
                                            Copiar
                                        </button>
                                    </div>
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
                    <span class="section-kicker">Modulo 06</span>
                    <h2 class="module-title">Generador de secretos y banco regex</h2>
                    <p class="module-copy">
                        Crea credenciales auxiliares y valida expresiones regulares con grupos, flags y detalle de
                        coincidencias para pruebas rapidas.
                    </p>
                </div>

                <div class="row g-4">
                    <div class="col-xl-5">
                        <div class="stack-panel">
                            <div class="control-grid compact-grid">
                                <div class="control-field">
                                    <label class="field-label" for="secret-kind">Tipo de secreto</label>
                                    <select id="secret-kind" v-model="secretKind" class="form-select input-dark">
                                        <option v-for="item in secretKinds" :key="item.value" :value="item.value">
                                            {{ item.label }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="secretKind !== 'uuid'" class="control-field">
                                    <label class="field-label" for="secret-length">Longitud</label>
                                    <input
                                        id="secret-length"
                                        v-model.number="secretLength"
                                        type="number"
                                        min="8"
                                        max="128"
                                        class="form-control input-dark"
                                    />
                                </div>
                            </div>

                            <div v-if="secretKind === 'password'" class="checkbox-grid">
                                <label class="toggle-line"><input v-model="secretOptions.upper" type="checkbox" /> Mayusculas</label>
                                <label class="toggle-line"><input v-model="secretOptions.lower" type="checkbox" /> Minusculas</label>
                                <label class="toggle-line"><input v-model="secretOptions.numbers" type="checkbox" /> Numeros</label>
                                <label class="toggle-line"><input v-model="secretOptions.symbols" type="checkbox" /> Simbolos</label>
                            </div>

                            <div class="inline-actions">
                                <button class="btn btn-main" @click="generateSecret">Generar</button>
                                <button
                                    v-if="secretResult?.generated"
                                    class="btn btn-subtle"
                                    @click="cipherKey = secretResult.generated"
                                >
                                    Usar como clave
                                </button>
                                <button
                                    v-if="secretResult?.generated"
                                    class="btn btn-subtle"
                                    @click="hashSecret = secretResult.generated"
                                >
                                    Usar en HMAC
                                </button>
                            </div>

                            <template v-if="secretResult">
                                <div class="row g-3 mb-4">
                                    <div class="col-6 col-lg-3" v-for="item in secretResult.summaryCards" :key="item.label">
                                        <div class="metric-card">
                                            <label>{{ item.label }}</label>
                                            <span :class="item.tone">{{ item.value }}</span>
                                            <small v-if="item.note">{{ item.note }}</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="verdict-card" :class="secretResult.verdictTone">
                                    <div class="verdict-icon">
                                        <span>KEY</span>
                                    </div>
                                    <div class="verdict-body">
                                        <strong>{{ secretResult.verdictTitle }}</strong>
                                        <p>{{ secretResult.verdictBody }}</p>
                                    </div>
                                </div>

                                <div class="row g-3">
                                    <div class="col-12" v-for="panel in secretResult.panels" :key="panel.title">
                                        <div class="tool-card">
                                            <div class="card-head">
                                                <h5>{{ panel.title }}</h5>
                                                <div class="card-actions">
                                                    <span class="mini-badge">{{ panel.badge }}</span>
                                                    <button
                                                        v-if="panel.copyValue"
                                                        class="btn btn-quiet"
                                                        @click="copyText(panel.copyValue)"
                                                    >
                                                        Copiar
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="output-box">
                                                <pre class="result-pre">{{ panel.content }}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="col-xl-7">
                        <div class="stack-panel">
                            <div class="control-grid">
                                <div class="control-field">
                                    <label class="field-label" for="regex-pattern">Patron</label>
                                    <input
                                        id="regex-pattern"
                                        v-model="regexPattern"
                                        class="form-control input-dark"
                                        placeholder="Bearer\\s+([A-Za-z0-9._-]+)"
                                    />
                                </div>
                                <div class="control-field full-span">
                                    <label class="field-label" for="regex-text">Texto de prueba</label>
                                    <textarea
                                        id="regex-text"
                                        v-model="regexText"
                                        class="form-control input-dark textarea-dark"
                                        rows="7"
                                        placeholder="Texto multilinea para probar coincidencias"
                                    ></textarea>
                                </div>
                            </div>

                            <div class="checkbox-grid">
                                <label class="toggle-line"><input v-model="regexOptions.g" type="checkbox" /> g</label>
                                <label class="toggle-line"><input v-model="regexOptions.i" type="checkbox" /> i</label>
                                <label class="toggle-line"><input v-model="regexOptions.m" type="checkbox" /> m</label>
                                <label class="toggle-line"><input v-model="regexOptions.s" type="checkbox" /> s</label>
                                <label class="toggle-line"><input v-model="regexOptions.u" type="checkbox" /> u</label>
                                <label class="toggle-line"><input v-model="regexOptions.y" type="checkbox" /> y</label>
                            </div>

                            <div class="inline-actions">
                                <button class="btn btn-main" @click="runRegexTest">Probar regex</button>
                                <button class="btn btn-subtle" @click="fillRegexExample">Cargar ejemplo</button>
                            </div>

                            <template v-if="regexResult">
                                <div class="row g-3 mb-4">
                                    <div class="col-6 col-lg-3" v-for="item in regexResult.summaryCards" :key="item.label">
                                        <div class="metric-card">
                                            <label>{{ item.label }}</label>
                                            <span :class="item.tone">{{ item.value }}</span>
                                            <small v-if="item.note">{{ item.note }}</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="verdict-card" :class="regexResult.verdictTone">
                                    <div class="verdict-icon">
                                        <span>REGX</span>
                                    </div>
                                    <div class="verdict-body">
                                        <strong>{{ regexResult.verdictTitle }}</strong>
                                        <p>{{ regexResult.verdictBody }}</p>
                                    </div>
                                </div>

                                <div class="row g-3 mb-4">
                                    <div class="col-md-6 col-xl-3" v-for="item in regexResult.signalCards" :key="item.label">
                                        <div class="signal-card">
                                            <label>{{ item.label }}</label>
                                            <span :class="item.tone">{{ item.value }}</span>
                                            <small>{{ item.note }}</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="row g-3">
                                    <div class="col-xl-6" v-for="panel in regexResult.panels" :key="panel.title">
                                        <div class="tool-card">
                                            <div class="card-head">
                                                <h5>{{ panel.title }}</h5>
                                                <div class="card-actions">
                                                    <span class="mini-badge">{{ panel.badge }}</span>
                                                    <button
                                                        v-if="panel.copyValue"
                                                        class="btn btn-quiet"
                                                        @click="copyText(panel.copyValue)"
                                                    >
                                                        Copiar
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="output-box">
                                                <pre class="result-pre">{{ panel.content }}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="clipboardNotice" class="copy-toast">
                {{ clipboardNotice }}
            </section>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import CryptoJS from "crypto-js";
import * as Diff from "diff";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

const hashModes = [
    { label: "Digest", value: "digest" },
    { label: "HMAC", value: "hmac" },
    { label: "PBKDF2", value: "pbkdf2" }
];

const hashAlgorithms = ["SHA256", "SHA512", "SHA3", "SHA1", "MD5"];
const hashEncodings = [
    { label: "Hex", value: "hex" },
    { label: "Base64", value: "base64" }
];

const cipherAlgorithms = ["AES", "DES", "TripleDES", "RC4", "Rabbit"];

const transformOperations = [
    { label: "Base64 codificar", value: "base64-encode" },
    { label: "Base64 decodificar", value: "base64-decode" },
    { label: "Base64URL codificar", value: "base64url-encode" },
    { label: "Base64URL decodificar", value: "base64url-decode" },
    { label: "URL codificar", value: "url-encode" },
    { label: "URL decodificar", value: "url-decode" },
    { label: "Hex codificar", value: "hex-encode" },
    { label: "Hex decodificar", value: "hex-decode" }
];

const secretKinds = [
    { label: "Password", value: "password" },
    { label: "UUID v4", value: "uuid" },
    { label: "Hex key", value: "hex" },
    { label: "Base64URL secret", value: "base64url" }
];

const hashMode = ref("digest");
const hashAlgorithm = ref("SHA256");
const hashEncoding = ref("hex");
const hashInput = ref("");
const hashSecret = ref("");
const hashSalt = ref(randomHex(16));
const hashIterations = ref(120000);
const hashKeySize = ref(32);
const hashExpected = ref("");
const hashResult = ref(null);

const cipherAlgorithm = ref("AES");
const cipherInput = ref("");
const cipherKey = ref("");
const cipherResult = ref(null);

const jwtInput = ref("");
const jwtResult = ref(null);

const transformOperation = ref("base64-encode");
const transformInput = ref("");
const transformResult = ref(null);

const jsonDocA = ref("");
const jsonDocB = ref("");
const jsonResult = ref(null);

const secretKind = ref("password");
const secretLength = ref(24);
const secretOptions = reactive({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true
});
const secretResult = ref(null);

const regexPattern = ref("");
const regexText = ref("");
const regexOptions = reactive({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false
});
const regexResult = ref(null);

const clipboardNotice = ref("");
let clipboardTimer = null;

const digestMap = {
    SHA256: CryptoJS.SHA256,
    SHA512: CryptoJS.SHA512,
    SHA3: CryptoJS.SHA3,
    SHA1: CryptoJS.SHA1,
    MD5: CryptoJS.MD5
};

const hmacMap = {
    SHA256: CryptoJS.HmacSHA256,
    SHA512: CryptoJS.HmacSHA512,
    SHA3: CryptoJS.HmacSHA3,
    SHA1: CryptoJS.HmacSHA1,
    MD5: CryptoJS.HmacMD5
};

const cipherMap = {
    AES: CryptoJS.AES,
    DES: CryptoJS.DES,
    TripleDES: CryptoJS.TripleDES,
    RC4: CryptoJS.RC4,
    Rabbit: CryptoJS.Rabbit
};

function randomHex(bytes = 16) {
    return CryptoJS.lib.WordArray.random(bytes).toString(CryptoJS.enc.Hex);
}

function wordArrayToString(wordArray, encoding) {
    return encoding === "base64"
        ? wordArray.toString(CryptoJS.enc.Base64)
        : wordArray.toString(CryptoJS.enc.Hex);
}

function safeJson(value) {
    return JSON.stringify(value, null, 2);
}

function buildTextList(title, lines) {
    const filtered = lines.filter(Boolean);
    if (!filtered.length) return `${title}\n- Sin observaciones`;
    return `${title}\n${filtered.map(line => `- ${line}`).join("\n")}`;
}

function normalizeValue(value) {
    return String(value ?? "").replace(/\s+/g, "").trim();
}

function utf8ToBase64(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}

function base64ToUtf8(value) {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function base64ToBase64Url(value) {
    return value.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBase64(value) {
    let normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    while (normalized.length % 4 !== 0) {
        normalized += "=";
    }
    return normalized;
}

function utf8ToHex(value) {
    return Array.from(new TextEncoder().encode(value))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

function hexToUtf8(value) {
    const normalized = value.trim();
    if (!normalized || normalized.length % 2 !== 0 || /[^0-9a-f]/i.test(normalized)) {
        throw new Error("La cadena Hex debe tener longitud par y solo caracteres 0-9 / a-f.");
    }
    const pairs = normalized.match(/.{1,2}/g) || [];
    const bytes = new Uint8Array(pairs.map(pair => Number.parseInt(pair, 16)));
    return new TextDecoder().decode(bytes);
}

function looksLikeJson(value) {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return false;
    if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) return false;
    try {
        JSON.parse(trimmed);
        return true;
    } catch {
        return false;
    }
}

function countUniqueCharacters(value) {
    return new Set(String(value ?? "").split("")).size;
}

function toneFromBoolean(value) {
    return value ? "tone-success" : "tone-warning";
}

function toneFromRisk(value) {
    if (value === "danger") return "tone-danger";
    if (value === "warning") return "tone-warning";
    return "tone-success";
}

function formatDateTime(value) {
    if (!Number.isFinite(value)) return "N/D";
    return new Date(value).toLocaleString("es-ES");
}

function formatRelativeTime(deltaMs) {
    const abs = Math.abs(deltaMs);
    const units = [
        { limit: 60000, label: "seg" },
        { limit: 3600000, label: "min" },
        { limit: 86400000, label: "h" },
        { limit: 604800000, label: "d" }
    ];

    let value;
    let label;

    if (abs < units[0].limit) {
        value = Math.max(1, Math.round(abs / 1000));
        label = units[0].label;
    } else if (abs < units[1].limit) {
        value = Math.max(1, Math.round(abs / 60000));
        label = units[1].label;
    } else if (abs < units[2].limit) {
        value = Math.max(1, Math.round(abs / 3600000));
        label = units[2].label;
    } else if (abs < units[3].limit) {
        value = Math.max(1, Math.round(abs / 86400000));
        label = units[3].label;
    } else {
        value = Math.max(1, Math.round(abs / 604800000));
        label = "sem";
    }

    return deltaMs >= 0 ? `en ${value} ${label}` : `hace ${value} ${label}`;
}

function summarizeClaim(seconds) {
    if (!Number.isFinite(seconds)) return "N/D";
    const timestamp = seconds * 1000;
    return `${formatDateTime(timestamp)} (${formatRelativeTime(timestamp - Date.now())})`;
}

function uniqueFlags(value) {
    return Array.from(new Set(value.split(""))).join("");
}

function currentRegexFlags() {
    return Object.entries(regexOptions)
        .filter(([, enabled]) => enabled)
        .map(([flag]) => flag)
        .join("");
}

function randomIndex(max) {
    if (globalThis.crypto?.getRandomValues) {
        const buffer = new Uint32Array(1);
        globalThis.crypto.getRandomValues(buffer);
        return buffer[0] % max;
    }
    return Math.floor(Math.random() * max);
}

function entropyLabel(bits) {
    if (!Number.isFinite(bits)) return "N/D";
    return `${Math.round(bits)} bits`;
}

function canonicalizeJson(value) {
    if (Array.isArray(value)) {
        return value.map(canonicalizeJson);
    }
    if (value && typeof value === "object") {
        return Object.keys(value)
            .sort()
            .reduce((accumulator, key) => {
                accumulator[key] = canonicalizeJson(value[key]);
                return accumulator;
            }, {});
    }
    return value;
}

function flattenJsonPaths(value, prefix = "") {
    if (Array.isArray(value)) {
        return value.flatMap((item, index) => flattenJsonPaths(item, `${prefix}[${index}]`));
    }
    if (value && typeof value === "object") {
        return Object.keys(value).flatMap(key => {
            const path = prefix ? `${prefix}.${key}` : key;
            return [path, ...flattenJsonPaths(value[key], path)];
        });
    }
    return prefix ? [prefix] : [];
}

function setClipboardNotice(message) {
    clipboardNotice.value = message;
    clearTimeout(clipboardTimer);
    clipboardTimer = window.setTimeout(() => {
        clipboardNotice.value = "";
    }, 1800);
}

async function copyText(value) {
    try {
        await navigator.clipboard.writeText(String(value ?? ""));
        setClipboardNotice("Copiado al portapapeles");
    } catch {
        setClipboardNotice("No se pudo copiar desde este navegador");
    }
}

function buildErrorResult(code, title, message) {
    return {
        verdictTone: "verdict-danger",
        verdictTitle: title,
        verdictBody: message,
        summaryCards: [
            { label: "Estado", value: "Error", tone: "tone-danger", note: code },
            { label: "Revision", value: "Necesaria", tone: "tone-warning", note: "Comprueba los datos de entrada" },
            { label: "Ejecucion", value: "Abortada", tone: "tone-warning", note: "No se genero salida" },
            { label: "Ambito", value: "Local", tone: "tone-neutral", note: "El fallo ocurrio en cliente" }
        ],
        signalCards: [
            { label: "Detalle", value: code, tone: "tone-danger", note: message },
            { label: "Siguiente paso", value: "Revisar entrada", tone: "tone-warning", note: "Corrige formato y vuelve a lanzar" },
            { label: "Riesgo", value: "Bajo", tone: "tone-success", note: "No se envio nada a un backend" },
            { label: "Salida", value: "Vacia", tone: "tone-neutral", note: "No hay resultado reutilizable" }
        ],
        panels: [
            {
                title: "Detalle del error",
                badge: "local",
                content: `${code}\n\n${message}`,
                copyValue: `${code}: ${message}`
            }
        ]
    };
}

function generateHashSalt() {
    hashSalt.value = randomHex(16);
}

function fillHashExample() {
    hashMode.value = "pbkdf2";
    hashAlgorithm.value = "SHA256";
    hashEncoding.value = "hex";
    hashInput.value = "Mithril-Forge-2026";
    hashSalt.value = randomHex(16);
    hashIterations.value = 180000;
    hashKeySize.value = 32;
    hashExpected.value = "";
}

function runHashLab() {
    if (!hashInput.value.trim()) {
        hashResult.value = buildErrorResult("INPUT_EMPTY", "Falta material base", "Introduce texto o material para calcular la salida.");
        return;
    }

    try {
        let outputWordArray;
        const mode = hashMode.value;
        const algorithm = hashAlgorithm.value;
        const notes = [];
        let comparisonNote = "Sin referencia";
        let comparisonTone = "tone-neutral";
        let verdictTone = "verdict-success";
        let verdictTitle = "Huella generada";
        let verdictBody = "La operacion se completo y la salida queda lista para contrastar o reutilizar.";

        if (mode === "digest") {
            outputWordArray = digestMap[algorithm](hashInput.value);
            notes.push(`Digest ${algorithm} calculado solo sobre el texto de entrada.`);
            if (["MD5", "SHA1"].includes(algorithm)) {
                notes.push("Este algoritmo solo deberia mantenerse por compatibilidad o huellas heredadas.");
            }
        } else if (mode === "hmac") {
            if (!hashSecret.value) {
                throw new Error("Necesitas indicar una clave secreta para HMAC.");
            }
            outputWordArray = hmacMap[algorithm](hashInput.value, hashSecret.value);
            notes.push(`HMAC ${algorithm} calculado con una clave de ${hashSecret.value.length} caracteres.`);
            notes.push("Si compartes el mensaje sin la clave, la salida por si sola no permite recalcular el HMAC.");
        } else {
            if (!hashSalt.value) {
                throw new Error("Introduce un salt para derivar la clave.");
            }
            const iterations = Math.max(1000, Number(hashIterations.value) || 1000);
            const keyBytes = Math.max(16, Number(hashKeySize.value) || 32);
            outputWordArray = CryptoJS.PBKDF2(hashInput.value, hashSalt.value, {
                keySize: keyBytes / 4,
                iterations,
                hasher: CryptoJS.algo[algorithm]
            });
            notes.push(`PBKDF2 usando ${algorithm}, ${iterations.toLocaleString("es-ES")} iteraciones y ${keyBytes} bytes derivados.`);
            notes.push(iterations < 100000
                ? "La derivacion funciona, pero subir iteraciones suele endurecer ataques offline."
                : "El numero de iteraciones ya entra en un rango razonable para pruebas actuales.");
            verdictTone = iterations < 100000 ? "verdict-warning" : "verdict-success";
            verdictTitle = iterations < 100000 ? "Derivacion valida pero conservadora" : "Derivacion robusta para pruebas";
            verdictBody = iterations < 100000
                ? "La salida es correcta, aunque conviene endurecer el coste si esta configuracion quiere parecerse a un entorno moderno."
                : "La derivacion combina salt, iteraciones y longitud suficiente para una simulacion seria en cliente.";
        }

        const output = wordArrayToString(outputWordArray, hashEncoding.value);
        const normalizedExpected = normalizeValue(hashExpected.value);
        const normalizedOutput = normalizeValue(output);
        const hasComparison = Boolean(normalizedExpected);

        if (hasComparison) {
            const matches = normalizedExpected === normalizedOutput;
            comparisonNote = matches ? "Coincide" : "No coincide";
            comparisonTone = matches ? "tone-success" : "tone-danger";
            verdictTone = matches ? "verdict-success" : "verdict-danger";
            verdictTitle = matches ? "La salida coincide con la referencia" : "La salida no coincide con la referencia";
            verdictBody = matches
                ? "La huella calculada es identica al valor esperado tras normalizar espacios."
                : "El valor resultante no casa con la referencia. Revisa algoritmo, formato, salt o clave.";
        }

        hashResult.value = {
            verdictTone,
            verdictTitle,
            verdictBody,
            summaryCards: [
                { label: "Modo", value: mode.toUpperCase(), tone: "tone-neutral", note: "Operacion local" },
                { label: "Algoritmo", value: algorithm, tone: ["MD5", "SHA1"].includes(algorithm) ? "tone-warning" : "tone-success", note: "Funcion activa" },
                { label: "Bytes", value: String(outputWordArray.sigBytes), tone: "tone-neutral", note: hashEncoding.value.toUpperCase() },
                { label: "Comparacion", value: comparisonNote, tone: comparisonTone, note: hasComparison ? "Se uso referencia" : "Sin valor esperado" }
            ],
            signalCards: [
                { label: "Entrada", value: `${hashInput.value.length} chars`, tone: "tone-neutral", note: `${countUniqueCharacters(hashInput.value)} caracteres unicos` },
                { label: "Formato", value: hashEncoding.value.toUpperCase(), tone: "tone-success", note: output.length + " caracteres de salida" },
                { label: mode === "pbkdf2" ? "Iteraciones" : "Secreto", value: mode === "pbkdf2" ? `${Number(hashIterations.value).toLocaleString("es-ES")}` : (hashSecret.value ? `${hashSecret.value.length} chars` : "N/D"), tone: mode === "pbkdf2" ? toneFromBoolean(Number(hashIterations.value) >= 100000) : toneFromBoolean(Boolean(hashSecret.value)), note: mode === "pbkdf2" ? "Coste de derivacion" : "Clave del HMAC" },
                { label: "Salt", value: mode === "pbkdf2" ? `${hashSalt.value.length / 2} bytes` : "No aplica", tone: mode === "pbkdf2" ? "tone-success" : "tone-neutral", note: mode === "pbkdf2" ? hashSalt.value.slice(0, 24) + "..." : "Solo en derivacion" }
            ],
            panels: [
                {
                    title: "Resultado",
                    badge: hashEncoding.value.toUpperCase(),
                    content: output,
                    copyValue: output
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", notes),
                    copyValue: notes.join("\n")
                },
                {
                    title: "Metadatos",
                    badge: "json",
                    content: safeJson({
                        mode,
                        algorithm,
                        encoding: hashEncoding.value,
                        salt: mode === "pbkdf2" ? hashSalt.value : null,
                        iterations: mode === "pbkdf2" ? Number(hashIterations.value) : null,
                        keyBytes: mode === "pbkdf2" ? Number(hashKeySize.value) : null,
                        comparedAgainst: hasComparison ? hashExpected.value : null
                    }),
                    copyValue: safeJson({
                        mode,
                        algorithm,
                        encoding: hashEncoding.value,
                        salt: mode === "pbkdf2" ? hashSalt.value : null,
                        iterations: mode === "pbkdf2" ? Number(hashIterations.value) : null,
                        keyBytes: mode === "pbkdf2" ? Number(hashKeySize.value) : null
                    })
                }
            ]
        };
    } catch (error) {
        hashResult.value = buildErrorResult("HASH_FAILED", "No se pudo calcular la salida", error.message);
    }
}

function generateCipherKey() {
    cipherKey.value = randomHex(16);
}

function fillCipherExample() {
    cipherAlgorithm.value = "AES";
    cipherKey.value = randomHex(16);
    cipherInput.value = "Las puertas del oeste solo se abren para quien conoce la clave.";
}

function runCipher(action) {
    if (!cipherInput.value.trim()) {
        cipherResult.value = buildErrorResult("CIPHER_EMPTY", "Falta material de entrada", "Necesitas texto plano o una cadena cifrada.");
        return;
    }
    if (!cipherKey.value.trim()) {
        cipherResult.value = buildErrorResult("CIPHER_KEY_EMPTY", "Falta la clave", "Introduce una clave o genera una antes de ejecutar.");
        return;
    }

    try {
        const engine = cipherMap[cipherAlgorithm.value];
        let primaryValue = "";
        let verdictTone = action === "encrypt" ? "verdict-success" : "verdict-warning";
        let verdictTitle = action === "encrypt" ? "Texto cifrado" : "Intento de descifrado completado";
        let verdictBody = action === "encrypt"
            ? "Se genero una salida cifrada compatible con la API de passphrase de crypto-js."
            : "La cadena se ha procesado usando la clave indicada. Si el texto sale vacio, suele apuntar a clave o algoritmo incorrectos.";

        if (action === "encrypt") {
            primaryValue = engine.encrypt(cipherInput.value, cipherKey.value).toString();
        } else {
            const bytes = engine.decrypt(cipherInput.value, cipherKey.value);
            primaryValue = bytes.toString(CryptoJS.enc.Utf8);
            if (!primaryValue) {
                throw new Error("No se obtuvo texto UTF-8. Probablemente la clave o el algoritmo no corresponden.");
            }
        }

        const notes = [
            `${cipherAlgorithm.value} se ha ejecutado en modo local a traves de crypto-js.`,
            action === "encrypt"
                ? "La salida incluye el formato esperado por la libreria para passphrases."
                : "Un descifrado correcto depende de repetir la misma passphrase y algoritmo."
        ];

        if (["DES", "TripleDES", "RC4"].includes(cipherAlgorithm.value)) {
            notes.push("El algoritmo elegido sigue siendo util para compatibilidad o analisis, pero hoy no seria la primera opcion para un diseno nuevo.");
        }

        cipherResult.value = {
            primaryValue,
            verdictTone,
            verdictTitle,
            verdictBody,
            summaryCards: [
                { label: "Operacion", value: action === "encrypt" ? "Encrypt" : "Decrypt", tone: "tone-neutral", note: "Ejecucion local" },
                { label: "Algoritmo", value: cipherAlgorithm.value, tone: ["AES", "Rabbit"].includes(cipherAlgorithm.value) ? "tone-success" : "tone-warning", note: "Motor seleccionado" },
                { label: "Clave", value: `${cipherKey.value.length} chars`, tone: cipherKey.value.length >= 16 ? "tone-success" : "tone-warning", note: "Passphrase" },
                { label: "Salida", value: `${primaryValue.length} chars`, tone: "tone-neutral", note: action === "encrypt" ? "Texto cifrado" : "Texto plano" }
            ],
            signalCards: [
                { label: "Entrada", value: `${cipherInput.value.length} chars`, tone: "tone-neutral", note: "Material procesado" },
                { label: "Reutilizable", value: action === "encrypt" ? "Si" : "Si", tone: "tone-success", note: "Puedes mover la salida a otros modulos" },
                { label: "Compatibilidad", value: ["DES", "TripleDES", "RC4"].includes(cipherAlgorithm.value) ? "Legacy" : "Actual", tone: ["DES", "TripleDES", "RC4"].includes(cipherAlgorithm.value) ? "tone-warning" : "tone-success", note: "Lectura orientativa" },
                { label: "Riesgo", value: action === "encrypt" ? "Bajo" : "Depende de la clave", tone: action === "encrypt" ? "tone-success" : "tone-warning", note: "No hay verificacion de autenticidad" }
            ],
            panels: [
                {
                    title: action === "encrypt" ? "Cadena cifrada" : "Texto descifrado",
                    badge: action === "encrypt" ? "ciphertext" : "plaintext",
                    content: primaryValue,
                    copyValue: primaryValue
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", notes),
                    copyValue: notes.join("\n")
                }
            ]
        };
    } catch (error) {
        cipherResult.value = buildErrorResult("CIPHER_FAILED", "Operacion no completada", error.message);
    }
}

function createSampleJwt() {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const header = {
        alg: "HS256",
        typ: "JWT",
        kid: "feanor-demo"
    };
    const payload = {
        sub: "analyst-01",
        iss: "https://auth.middle-earth.local",
        aud: ["front-web", "api-gateway"],
        roles: ["auditor", "observer"],
        scope: "read:reports inspect:tokens",
        iat: nowSeconds,
        nbf: nowSeconds - 60,
        exp: nowSeconds + 86400 * 14
    };

    return [
        base64ToBase64Url(utf8ToBase64(safeJson(header))),
        base64ToBase64Url(utf8ToBase64(safeJson(payload))),
        "firma-demo-no-verificada"
    ].join(".");
}

function fillJwtExample() {
    jwtInput.value = createSampleJwt();
}

function decodeJwtToken() {
    if (!jwtInput.value.trim()) {
        jwtResult.value = buildErrorResult("JWT_EMPTY", "Falta el token", "Pega un JWT para inspeccionarlo.");
        return;
    }

    try {
        const parts = jwtInput.value.trim().split(".");
        if (parts.length < 2) {
            throw new Error("El token no tiene la estructura esperada de cabecera.payload.firma.");
        }

        const header = jwtDecode(jwtInput.value, { header: true });
        const payload = jwtDecode(jwtInput.value);
        const payloadText = safeJson(payload);
        const headerText = safeJson(header);
        const algorithm = header.alg || "N/D";
        const audiences = Array.isArray(payload.aud) ? payload.aud : payload.aud ? [payload.aud] : [];
        const hasExp = Number.isFinite(Number(payload.exp));
        const expSeconds = hasExp ? Number(payload.exp) : Number.NaN;
        const expired = hasExp ? expSeconds * 1000 < Date.now() : false;
        const riskyHeader = Boolean(header.jku || header.x5u);
        const unsigned = String(algorithm).toLowerCase() === "none" || parts.length < 3 || !parts[2];
        const signalLines = [
            `alg: ${algorithm}`,
            `typ: ${header.typ || "N/D"}`,
            `iss: ${payload.iss || "N/D"}`,
            `sub: ${payload.sub || "N/D"}`,
            `aud: ${audiences.length ? audiences.join(", ") : "N/D"}`,
            `iat: ${summarizeClaim(Number(payload.iat))}`,
            `nbf: ${summarizeClaim(Number(payload.nbf))}`,
            `exp: ${summarizeClaim(expSeconds)}`
        ];

        let verdictTone = "verdict-success";
        let verdictTitle = "Token estructuralmente legible";
        let verdictBody = "La cabecera y el payload se han decodificado correctamente. Recuerda que esto no implica firma valida.";

        if (unsigned || riskyHeader) {
            verdictTone = "verdict-danger";
            verdictTitle = "El token presenta senales delicadas";
            verdictBody = unsigned
                ? "El algoritmo o la firma sugieren que el token podria no estar protegido criptograficamente."
                : "La cabecera expone referencias remotas que suelen merecer una revision adicional.";
        } else if (!hasExp || expired) {
            verdictTone = "verdict-warning";
            verdictTitle = !hasExp ? "Token sin expiracion visible" : "Token expirado";
            verdictBody = !hasExp
                ? "La ausencia de exp no invalida el token por si sola, pero elimina un control temporal basico."
                : "El claim exp ya queda por detras del reloj actual, asi que el token deberia considerarse fuera de ventana.";
        }

        const securityNotes = [
            unsigned ? "La firma falta o alg=none." : "La estructura incluye una firma o al menos un tercer segmento.",
            riskyHeader ? "La cabecera contiene jku o x5u; si una plataforma los consume, conviene vigilar su origen." : "No se observan jku ni x5u en cabecera.",
            !hasExp ? "No existe claim exp." : expired ? "El claim exp ya caduco." : "El claim exp sigue en ventana.",
            payload.scope || payload.scp ? `Scopes declarados: ${payload.scope || payload.scp}` : "No se detectaron scopes explicitos."
        ];

        jwtResult.value = {
            payloadText,
            verdictTone,
            verdictTitle,
            verdictBody,
            summaryCards: [
                { label: "Algoritmo", value: algorithm, tone: unsigned ? "tone-danger" : "tone-success", note: header.typ || "JWT" },
                { label: "Expiracion", value: hasExp ? (expired ? "Expirado" : "Vigente") : "Sin exp", tone: !hasExp ? "tone-warning" : expired ? "tone-danger" : "tone-success", note: hasExp ? summarizeClaim(expSeconds) : "No declarada" },
                { label: "Audiencias", value: String(audiences.length || 0), tone: audiences.length ? "tone-success" : "tone-warning", note: audiences.join(", ") || "No declaradas" },
                { label: "Tamano", value: `${jwtInput.value.length} chars`, tone: "tone-neutral", note: `${parts.length} segmentos` }
            ],
            signalCards: [
                { label: "Issuer", value: payload.iss || "N/D", tone: payload.iss ? "tone-success" : "tone-warning", note: "Emisor declarado" },
                { label: "Subject", value: payload.sub || "N/D", tone: payload.sub ? "tone-success" : "tone-warning", note: "Identidad principal" },
                { label: "kid", value: header.kid || "N/D", tone: header.kid ? "tone-success" : "tone-neutral", note: "Selector de clave" },
                { label: "Riesgo visible", value: unsigned || riskyHeader ? "Elevado" : (!hasExp || expired ? "Medio" : "Contenido"), tone: unsigned || riskyHeader ? "tone-danger" : (!hasExp || expired ? "tone-warning" : "tone-success"), note: "Lectura solo estructural" }
            ],
            panels: [
                {
                    title: "Cabecera",
                    badge: "header",
                    content: headerText,
                    copyValue: headerText
                },
                {
                    title: "Payload",
                    badge: "payload",
                    content: payloadText,
                    copyValue: payloadText
                },
                {
                    title: "Linea temporal",
                    badge: "claims",
                    content: buildTextList("Claims temporales", signalLines),
                    copyValue: signalLines.join("\n")
                },
                {
                    title: "Lectura de riesgo",
                    badge: "notas",
                    content: buildTextList("Senales", securityNotes),
                    copyValue: securityNotes.join("\n")
                }
            ]
        };
    } catch (error) {
        jwtResult.value = buildErrorResult("JWT_FAILED", "No se pudo decodificar el JWT", error.message);
    }
}

function fillTransformExample() {
    transformOperation.value = "base64url-decode";
    transformInput.value = base64ToBase64Url(utf8ToBase64('{"scope":"read:reports","active":true}'));
}

function runTransform() {
    if (!transformInput.value.trim()) {
        transformResult.value = buildErrorResult("TRANSFORM_EMPTY", "Falta la entrada", "Introduce texto o una cadena codificada.");
        return;
    }

    try {
        let output = "";
        let reversible = "Si";
        let note = "";

        switch (transformOperation.value) {
        case "base64-encode":
            output = utf8ToBase64(transformInput.value);
            note = "Texto UTF-8 convertido a Base64 clasico.";
            break;
        case "base64-decode":
            output = base64ToUtf8(transformInput.value.trim());
            note = "Cadena Base64 convertida a texto UTF-8.";
            break;
        case "base64url-encode":
            output = base64ToBase64Url(utf8ToBase64(transformInput.value));
            note = "Texto convertido al alfabeto URL-safe.";
            break;
        case "base64url-decode":
            output = base64ToUtf8(base64UrlToBase64(transformInput.value.trim()));
            note = "Cadena Base64URL devuelta a texto plano.";
            break;
        case "url-encode":
            output = encodeURIComponent(transformInput.value);
            note = "Texto preparado para viajar en query strings o fragments.";
            break;
        case "url-decode":
            output = decodeURIComponent(transformInput.value);
            note = "La cadena se ha decodificado desde percent-encoding.";
            break;
        case "hex-encode":
            output = utf8ToHex(transformInput.value);
            note = "Texto convertido a representacion hexadecimal.";
            break;
        case "hex-decode":
            output = hexToUtf8(transformInput.value);
            note = "Cadena hexadecimal decodificada a UTF-8.";
            break;
        default:
            throw new Error("Operacion no soportada.");
        }

        const jsonHint = looksLikeJson(output) ? "La salida parece JSON valido." : "La salida no parece JSON.";

        transformResult.value = {
            primaryValue: output,
            verdictTone: "verdict-success",
            verdictTitle: "Transformacion aplicada",
            verdictBody: `${note} ${jsonHint}`,
            summaryCards: [
                { label: "Operacion", value: transformOperation.value, tone: "tone-neutral", note: "Pipeline activo" },
                { label: "Entrada", value: `${transformInput.value.length} chars`, tone: "tone-neutral", note: `${countUniqueCharacters(transformInput.value)} unicos` },
                { label: "Salida", value: `${output.length} chars`, tone: "tone-success", note: "Lista para copiar" },
                { label: "Reversible", value: reversible, tone: "tone-success", note: "Existe operacion inversa" }
            ],
            signalCards: [
                { label: "JSON probable", value: looksLikeJson(output) ? "Si" : "No", tone: looksLikeJson(output) ? "tone-success" : "tone-neutral", note: "Heuristica local" },
                { label: "URL-safe", value: /^[A-Za-z0-9\-_.~%]*$/.test(output) ? "Si" : "No", tone: /^[A-Za-z0-9\-_.~%]*$/.test(output) ? "tone-success" : "tone-warning", note: "Caracteres compatibles con URL" },
                { label: "Operacion", value: transformOperation.value.includes("decode") ? "Decode" : "Encode", tone: "tone-neutral", note: note },
                { label: "Salida vacia", value: output ? "No" : "Si", tone: output ? "tone-success" : "tone-warning", note: "Revision de contenido" }
            ],
            panels: [
                {
                    title: "Resultado",
                    badge: "output",
                    content: output,
                    copyValue: output
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", [note, jsonHint]),
                    copyValue: `${note}\n${jsonHint}`
                }
            ]
        };
    } catch (error) {
        transformResult.value = buildErrorResult("TRANSFORM_FAILED", "Transformacion no completada", error.message);
    }
}

function fillJsonExample() {
    jsonDocA.value = safeJson({
        service: "gateway",
        tls: true,
        headers: {
            csp: true,
            hsts: true
        },
        paths: ["/", "/health"]
    });
    jsonDocB.value = safeJson({
        tls: true,
        service: "gateway",
        headers: {
            csp: false,
            hsts: true,
            permissionsPolicy: false
        },
        paths: ["/", "/health", "/metrics"]
    });
}

function formatJsonDoc(side, pretty) {
    const target = side === "a" ? jsonDocA : jsonDocB;
    if (!target.value.trim()) {
        jsonResult.value = buildErrorResult("JSON_EMPTY", `Documento ${side.toUpperCase()} vacio`, "Introduce JSON antes de formatear o minificar.");
        return;
    }

    try {
        const parsed = JSON.parse(target.value);
        target.value = pretty ? safeJson(parsed) : JSON.stringify(parsed);
        inspectJsonDocs(pretty ? `Documento ${side.toUpperCase()} formateado` : `Documento ${side.toUpperCase()} minificado`);
    } catch (error) {
        jsonResult.value = buildErrorResult("JSON_PARSE_FAILED", `Documento ${side.toUpperCase()} invalido`, error.message);
    }
}

function inspectJsonDocs(context = "comparacion") {
    if (!jsonDocA.value.trim() && !jsonDocB.value.trim()) {
        jsonResult.value = buildErrorResult("JSON_BOTH_EMPTY", "No hay documentos para analizar", "Necesitas al menos un JSON en A o B.");
        return;
    }

    let parsedA = null;
    let parsedB = null;
    let validA = false;
    let validB = false;
    let errorA = "";
    let errorB = "";

    try {
        if (jsonDocA.value.trim()) {
            parsedA = JSON.parse(jsonDocA.value);
            validA = true;
        }
    } catch (error) {
        errorA = error.message;
    }

    try {
        if (jsonDocB.value.trim()) {
            parsedB = JSON.parse(jsonDocB.value);
            validB = true;
        }
    } catch (error) {
        errorB = error.message;
    }

    if ((jsonDocA.value.trim() && !validA) || (jsonDocB.value.trim() && !validB)) {
        jsonResult.value = {
            verdictTone: "verdict-danger",
            verdictTitle: "Al menos un documento no es JSON valido",
            verdictBody: "Corrige la sintaxis antes de comparar o reutilizar el contenido.",
            summaryCards: [
                { label: "Documento A", value: validA ? "Valido" : "Error", tone: validA ? "tone-success" : "tone-danger", note: validA ? "Parse correcto" : errorA || "Sin analizar" },
                { label: "Documento B", value: validB ? "Valido" : "Error", tone: validB ? "tone-success" : "tone-danger", note: validB ? "Parse correcto" : errorB || "Sin analizar" },
                { label: "Contexto", value: context, tone: "tone-neutral", note: "Operacion solicitada" },
                { label: "Comparacion", value: "Bloqueada", tone: "tone-warning", note: "Hace falta JSON valido" }
            ],
            signalCards: [
                { label: "Error A", value: errorA || "Sin error", tone: errorA ? "tone-danger" : "tone-success", note: "Documento A" },
                { label: "Error B", value: errorB || "Sin error", tone: errorB ? "tone-danger" : "tone-success", note: "Documento B" },
                { label: "Riesgo", value: "Parsing", tone: "tone-warning", note: "La sintaxis impide analisis fiable" },
                { label: "Siguiente paso", value: "Corregir JSON", tone: "tone-warning", note: "Vuelve a lanzar al guardar" }
            ],
            panels: [
                {
                    title: "Detalle",
                    badge: "error",
                    content: buildTextList("Problemas detectados", [
                        errorA ? `Documento A: ${errorA}` : "",
                        errorB ? `Documento B: ${errorB}` : ""
                    ]),
                    copyValue: [errorA && `Documento A: ${errorA}`, errorB && `Documento B: ${errorB}`].filter(Boolean).join("\n")
                }
            ]
        };
        return;
    }

    const canonicalA = validA ? safeJson(canonicalizeJson(parsedA)) : "";
    const canonicalB = validB ? safeJson(canonicalizeJson(parsedB)) : "";
    const leftText = validA ? safeJson(parsedA) : "Documento A vacio";
    const rightText = validB ? safeJson(parsedB) : "Documento B vacio";
    const hasBoth = validA && validB;
    const semanticEqual = hasBoth ? canonicalA === canonicalB : false;
    const diffParts = hasBoth ? Diff.diffLines(canonicalA, canonicalB) : [];
    const addedLines = diffParts.reduce((sum, part) => sum + (part.added ? part.count || 0 : 0), 0);
    const removedLines = diffParts.reduce((sum, part) => sum + (part.removed ? part.count || 0 : 0), 0);
    const patch = hasBoth
        ? Diff.createPatch("json", canonicalA, canonicalB, "Documento A", "Documento B")
        : "Comparacion disponible cuando ambos documentos son JSON validos.";
    const pathsA = validA ? new Set(flattenJsonPaths(parsedA)) : new Set();
    const pathsB = validB ? new Set(flattenJsonPaths(parsedB)) : new Set();
    const differingPaths = hasBoth
        ? new Set([...pathsA].filter(path => !pathsB.has(path)).concat([...pathsB].filter(path => !pathsA.has(path))))
        : new Set();

    let verdictTone = "verdict-success";
    let verdictTitle = hasBoth ? "Comparacion completada" : "Documento validado";
    let verdictBody = hasBoth
        ? (semanticEqual
            ? "Los dos documentos son semanticamente equivalentes tras ordenar sus claves."
            : "Existen diferencias reales entre A y B mas alla del orden o del formato.")
        : "El documento disponible es JSON valido y ya queda listo para seguir trabajando.";

    if (hasBoth && !semanticEqual) {
        verdictTone = "verdict-warning";
    }

    jsonResult.value = {
        verdictTone,
        verdictTitle,
        verdictBody,
        summaryCards: [
            { label: "Documento A", value: validA ? "Valido" : "Vacio", tone: validA ? "tone-success" : "tone-neutral", note: validA ? `${pathsA.size} rutas` : "Sin contenido" },
            { label: "Documento B", value: validB ? "Valido" : "Vacio", tone: validB ? "tone-success" : "tone-neutral", note: validB ? `${pathsB.size} rutas` : "Sin contenido" },
            { label: "Igualdad", value: hasBoth ? (semanticEqual ? "Si" : "No") : "N/D", tone: hasBoth ? (semanticEqual ? "tone-success" : "tone-warning") : "tone-neutral", note: hasBoth ? "Canonico por claves" : "Falta un segundo documento" },
            { label: "Contexto", value: context, tone: "tone-neutral", note: "Ultima accion" }
        ],
        signalCards: [
            { label: "Rutas distintas", value: hasBoth ? String(differingPaths.size) : "N/D", tone: hasBoth && differingPaths.size ? "tone-warning" : "tone-success", note: "Claves no compartidas" },
            { label: "Lineas anadidas", value: hasBoth ? String(addedLines) : "0", tone: addedLines ? "tone-warning" : "tone-success", note: "Desde A hacia B" },
            { label: "Lineas retiradas", value: hasBoth ? String(removedLines) : "0", tone: removedLines ? "tone-warning" : "tone-success", note: "Desde A hacia B" },
            { label: "Comparacion", value: hasBoth ? "Activa" : "Parcial", tone: hasBoth ? "tone-success" : "tone-neutral", note: hasBoth ? "Patch generado" : "Solo validacion" }
        ],
        panels: [
            {
                title: "Documento A formateado",
                badge: "A",
                content: leftText,
                copyValue: validA ? leftText : ""
            },
            {
                title: "Documento B formateado",
                badge: "B",
                content: rightText,
                copyValue: validB ? rightText : ""
            },
            {
                title: "Diff canonico",
                badge: "patch",
                content: patch,
                copyValue: patch
            }
        ]
    };
}

function generateSecret() {
    try {
        let generated = "";
        let entropyBits = 0;
        let charsetSummary = "N/D";

        if (secretKind.value === "password") {
            const sets = [];
            if (secretOptions.upper) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            if (secretOptions.lower) sets.push("abcdefghijklmnopqrstuvwxyz");
            if (secretOptions.numbers) sets.push("0123456789");
            if (secretOptions.symbols) sets.push("!@#$%^&*()-_=+[]{}:,.?");
            const charset = sets.join("");

            if (!charset) {
                throw new Error("Selecciona al menos un conjunto de caracteres para la password.");
            }

            const length = Math.max(8, Number(secretLength.value) || 24);
            generated = Array.from({ length }, () => charset[randomIndex(charset.length)]).join("");
            entropyBits = length * Math.log2(charset.length);
            charsetSummary = `${charset.length} simbolos`;
        } else if (secretKind.value === "uuid") {
            generated = uuidv4();
            entropyBits = 122;
            charsetSummary = "UUID RFC 4122";
        } else if (secretKind.value === "hex") {
            const length = Math.max(8, Number(secretLength.value) || 32);
            generated = randomHex(Math.ceil(length / 2)).slice(0, length);
            entropyBits = generated.length * 4;
            charsetSummary = "Hexadecimal";
        } else {
            const length = Math.max(12, Number(secretLength.value) || 32);
            const raw = CryptoJS.lib.WordArray.random(Math.ceil((length * 3) / 4)).toString(CryptoJS.enc.Base64);
            generated = base64ToBase64Url(raw).slice(0, length);
            entropyBits = generated.length * 6;
            charsetSummary = "Base64URL";
        }

        const destinationNote = secretKind.value === "password"
            ? "Adecuado para pruebas de login o semilla temporal."
            : secretKind.value === "uuid"
                ? "Util para correlacion, IDs y trazas."
                : secretKind.value === "hex"
                    ? "Encaja bien como clave visual o material de laboratorio."
                    : "Comodo para secretos que viajan por URL, cookies o JWT.";

        secretResult.value = {
            generated,
            verdictTone: "verdict-success",
            verdictTitle: "Secreto generado",
            verdictBody: destinationNote,
            summaryCards: [
                { label: "Tipo", value: secretKind.value.toUpperCase(), tone: "tone-neutral", note: "Generacion local" },
                { label: "Longitud", value: `${generated.length} chars`, tone: "tone-success", note: charsetSummary },
                { label: "Entropia", value: entropyLabel(entropyBits), tone: entropyBits >= 96 ? "tone-success" : "tone-warning", note: "Estimacion aproximada" },
                { label: "URL-safe", value: /^[A-Za-z0-9\-_]+$/.test(generated) ? "Si" : "No", tone: /^[A-Za-z0-9\-_]+$/.test(generated) ? "tone-success" : "tone-neutral", note: "Compatibilidad de transporte" }
            ],
            panels: [
                {
                    title: "Secreto",
                    badge: secretKind.value,
                    content: generated,
                    copyValue: generated
                },
                {
                    title: "Lectura practica",
                    badge: "notas",
                    content: buildTextList("Uso sugerido", [
                        destinationNote,
                        `Resumen de charset: ${charsetSummary}.`,
                        `Entropia aproximada: ${entropyLabel(entropyBits)}.`
                    ]),
                    copyValue: `${destinationNote}\n${charsetSummary}\n${entropyLabel(entropyBits)}`
                }
            ]
        };
    } catch (error) {
        secretResult.value = buildErrorResult("SECRET_FAILED", "No se pudo generar el secreto", error.message);
    }
}

function fillRegexExample() {
    regexPattern.value = "Bearer\\s+([A-Za-z0-9._-]+)";
    regexText.value = [
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.demo.payload",
        "X-Alt: Bearer token-secundario_01",
        "Cookie: session=abc123"
    ].join("\n");
    regexOptions.g = true;
    regexOptions.i = false;
    regexOptions.m = true;
    regexOptions.s = false;
    regexOptions.u = false;
    regexOptions.y = false;
}

function runRegexTest() {
    if (!regexPattern.value.trim()) {
        regexResult.value = buildErrorResult("REGEX_EMPTY", "Falta el patron", "Introduce una expresion regular antes de probar.");
        return;
    }

    try {
        const flags = currentRegexFlags();
        const regex = new RegExp(regexPattern.value, flags);
        const collector = new RegExp(regexPattern.value, uniqueFlags(flags.includes("g") ? flags : `${flags}g`));
        const matches = Array.from(regexText.value.matchAll(collector)).map((match, index) => ({
            index: index + 1,
            value: match[0],
            offset: match.index ?? 0,
            groups: match.slice(1),
            namedGroups: match.groups || null
        }));

        const matchLines = matches.length
            ? matches.map(match => {
                const groupSummary = match.groups.length ? ` | grupos: ${match.groups.join(" | ")}` : "";
                const namedSummary = match.namedGroups ? ` | named: ${safeJson(match.namedGroups)}` : "";
                return `#${match.index} @${match.offset}: ${match.value}${groupSummary}${namedSummary}`;
            })
            : ["Sin coincidencias"];

        const maxGroups = matches.reduce((max, match) => Math.max(max, match.groups.length), 0);
        const uniqueMatches = new Set(matches.map(match => match.value)).size;
        const verdictTone = matches.length ? "verdict-success" : "verdict-warning";

        regexResult.value = {
            verdictTone,
            verdictTitle: matches.length ? "Regex con coincidencias" : "Regex sin coincidencias",
            verdictBody: matches.length
                ? `Se localizaron ${matches.length} coincidencias y ${uniqueMatches} valores unicos.`
                : "La expresion compila, pero no encuentra resultados sobre el texto actual.",
            summaryCards: [
                { label: "Flags", value: flags || "(sin flags)", tone: flags ? "tone-success" : "tone-neutral", note: "Compilacion activa" },
                { label: "Matches", value: String(matches.length), tone: matches.length ? "tone-success" : "tone-warning", note: `${uniqueMatches} unicos` },
                { label: "Grupos", value: String(maxGroups), tone: maxGroups ? "tone-success" : "tone-neutral", note: "Capturas maximas" },
                { label: "Multilinea", value: regex.multiline ? "Si" : "No", tone: regex.multiline ? "tone-success" : "tone-neutral", note: "Flag m" }
            ],
            signalCards: [
                { label: "Case-insensitive", value: regex.ignoreCase ? "Si" : "No", tone: regex.ignoreCase ? "tone-success" : "tone-neutral", note: "Flag i" },
                { label: "Unicode", value: regex.unicode ? "Si" : "No", tone: regex.unicode ? "tone-success" : "tone-neutral", note: "Flag u" },
                { label: "Sticky", value: regex.sticky ? "Si" : "No", tone: regex.sticky ? "tone-warning" : "tone-neutral", note: "Flag y" },
                { label: "Texto", value: `${regexText.value.length} chars`, tone: "tone-neutral", note: "Corpus probado" }
            ],
            panels: [
                {
                    title: "Coincidencias",
                    badge: "match",
                    content: matchLines.join("\n"),
                    copyValue: matchLines.join("\n")
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", [
                        `Expresion compilada con flags: ${flags || "ninguna"}.`,
                        matches.length ? "Las coincidencias quedan indexadas con offset para depuracion." : "Prueba a relajar el patron o a revisar los flags activados."
                    ]),
                    copyValue: `Flags: ${flags || "ninguna"}\nMatches: ${matches.length}`
                }
            ]
        };
    } catch (error) {
        regexResult.value = buildErrorResult("REGEX_FAILED", "La expresion regular no es valida", error.message);
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.feanor-page {
    min-height: 100vh;
    background: #0b0f17;
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
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
}

.intro-box {
    display: grid;
    gap: 22px;
}

.intro-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(220px, 320px);
    gap: 24px;
    align-items: center;
}

.section-heading,
.module-header {
    display: grid;
    gap: 8px;
}

.section-kicker {
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.section-name,
.module-title {
    margin: 0;
    color: #f8fafc;
    font-size: 2rem;
    font-weight: 700;
}

.section-copy,
.module-copy {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.7;
    max-width: 84ch;
}

.intro-emblem {
    display: grid;
    gap: 10px;
    justify-items: center;
    text-align: center;
    padding: 18px;
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.96));
    border: 1px solid rgba(71, 85, 105, 0.42);
}

.intro-emblem img {
    width: 112px;
    height: 112px;
    object-fit: contain;
}

.intro-emblem span {
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 700;
}

.intro-emblem small {
    color: #94a3b8;
    line-height: 1.6;
}

.guide-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.guide-card,
.tool-card,
.metric-card,
.signal-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 8px;
}

.guide-card {
    display: grid;
    gap: 8px;
    padding: 16px;
}

.guide-card label,
.metric-card label,
.signal-card label {
    color: #f8fafc;
    font-size: 0.83rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.guide-card span {
    color: #c9d4df;
    line-height: 1.65;
    font-size: 0.92rem;
}

.module-header {
    margin-bottom: 18px;
}

.field-label {
    display: inline-block;
    margin-bottom: 8px;
    color: #dbe7f3;
    font-size: 0.9rem;
    font-weight: 600;
}

.control-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-bottom: 14px;
}

.compact-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.control-field {
    min-width: 0;
}

.control-field.full-span {
    grid-column: 1 / -1;
}

.input-dark {
    background: #1f2937;
    border: 1px solid #334155;
    color: #f8fafc !important;
    caret-color: #f8fafc;
}

.input-dark::placeholder {
    color: #94a3b8;
}

.input-dark:focus {
    background: #1f2937;
    border-color: #64748b;
    box-shadow: 0 0 0 0.2rem rgba(100, 116, 139, 0.18);
    color: #f8fafc;
}

.textarea-dark {
    resize: vertical;
    min-height: 128px;
}

.tall-textarea {
    min-height: 260px;
}

.inline-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 14px 0 8px;
}

.helper-copy {
    margin: 0 0 18px;
    color: #94a3b8;
    line-height: 1.6;
}

.inline-code {
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid #334155;
    border-radius: 6px;
    color: #e2e8f0;
    padding: 2px 6px;
}

.btn-main,
.btn-subtle,
.btn-quiet {
    border-radius: 6px;
    font-weight: 600;
    padding: 9px 14px;
}

.btn-main {
    background: #334155;
    border: 1px solid #475569;
    color: #f8fafc;
}

.btn-main:hover,
.btn-main:focus {
    background: #475569;
    color: #f8fafc;
}

.btn-subtle {
    background: #0f172a;
    border: 1px solid #334155;
    color: #cbd5e1;
}

.btn-subtle:hover,
.btn-subtle:focus {
    background: #1e293b;
    color: #f8fafc;
}

.btn-quiet {
    padding: 5px 10px;
    background: transparent;
    border: 1px solid #334155;
    color: #cbd5e1;
    font-size: 0.8rem;
}

.btn-quiet:hover,
.btn-quiet:focus {
    background: rgba(51, 65, 85, 0.4);
    color: #f8fafc;
}

.metric-card,
.signal-card {
    display: grid;
    gap: 6px;
    padding: 14px;
    height: 100%;
}

.metric-card span,
.signal-card span {
    color: #f8fafc;
    font-size: 1.05rem;
    font-weight: 700;
    word-break: break-word;
}

.metric-card small,
.signal-card small {
    color: #94a3b8;
    line-height: 1.55;
}

.verdict-card {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 16px;
    margin-bottom: 18px;
}

.verdict-icon {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(15, 23, 42, 0.9);
    color: #e2e8f0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.verdict-body strong {
    display: block;
    margin-bottom: 4px;
    color: #f8fafc;
}

.verdict-body p {
    margin: 0;
    color: #c9d4df;
    line-height: 1.65;
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
    display: grid;
    gap: 12px;
    padding: 16px;
    height: 100%;
}

.stack-panel {
    display: grid;
    gap: 16px;
}

.card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.card-head h5 {
    margin: 0;
    color: #f8fafc;
    font-size: 1rem;
    font-weight: 600;
}

.card-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.mini-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid #334155;
    background: rgba(15, 23, 42, 0.72);
    color: #cbd5e1;
    font-size: 0.74rem;
    font-weight: 700;
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
    white-space: pre-wrap;
    word-break: break-word;
    font-family: 'Courier New', monospace;
    color: #cbd5e1;
    font-size: 0.84rem;
    line-height: 1.65;
}

.checkbox-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    margin: 4px 0;
}

.toggle-line {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #dbe7f3;
    font-size: 0.9rem;
}

.toggle-line input {
    accent-color: #94a3b8;
}

.copy-toast {
    position: sticky;
    bottom: 16px;
    margin-left: auto;
    width: fit-content;
    background: rgba(15, 23, 42, 0.94);
    border: 1px solid #334155;
    border-radius: 999px;
    color: #e2e8f0;
    padding: 8px 14px;
    font-size: 0.85rem;
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

@media (max-width: 1199px) {
    .intro-layout {
        grid-template-columns: 1fr;
    }

    .guide-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .control-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 767px) {
    .section-box {
        padding: 18px;
    }

    .section-name,
    .module-title {
        font-size: 1.55rem;
    }

    .guide-grid,
    .control-grid,
    .compact-grid {
        grid-template-columns: 1fr;
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

    .card-actions {
        justify-content: flex-start;
    }
}
</style>
