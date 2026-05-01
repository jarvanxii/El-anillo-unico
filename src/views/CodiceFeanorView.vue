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
                            Utilidades locales para criptografia aplicada, parsing tecnico, JWT, certificados,
                            codificaciones, secretos, OTP, JSON y regex. Todo se ejecuta en el navegador.
                        </p>
                    </div>

                    <div class="intro-emblem">
                        <img src="@/assets/logos/feanor.png" alt="Sello de Feanor" />
                        <span>19 modulos enlazados</span>
                        <small>Procesamiento en cliente.</small>
                    </div>
                </div>
            </section>

            <section class="section-box hash-module">
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
                        class="btn btn-subtle"
                        @click="useLastSecretAsHashSecret"
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

            <section class="section-box symmetric-module">
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
                        class="btn btn-subtle"
                        @click="useCipherOutputAsInput"
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

            <section class="section-box asymmetric-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 03</span>
                    <div class="module-title-line">
                        <h2 class="module-title">Cifrado y descifrado asimetrico</h2>
                        <div class="info-hover">
                            <button type="button" class="info-button" aria-label="Como funciona el cifrado asimetrico">Información</button>
                            <div class="info-popover" role="tooltip">
                                <strong>Flujo asimetrico</strong>
                                <p>El servidor genera dos claves: publica y privada. La publica se comparte; la privada no sale del servidor.</p>
                                <p>RSA-OAEP directo cifra mensajes pequenos con la clave publica y los descifra con la privada.</p>
                                <p>El modo hibrido cifra el mensaje con AES-GCM y protege la clave AES con RSA-OAEP. Es el patron correcto para cargas largas.</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            class="guide-button"
                            :class="{ active: showAsymmetricGuide }"
                            @click="showAsymmetricGuide = !showAsymmetricGuide"
                        >
                            GUIA
                        </button>
                    </div>
                    <p class="module-copy">
                        Genera pares RSA, exporta claves PEM, cifra mensajes pequenos con RSA-OAEP y prueba un esquema
                        hibrido realista: RSA-OAEP para proteger una clave AES-GCM y AES-GCM para cifrar el contenido.
                    </p>
                </div>

                <div v-if="showAsymmetricGuide" class="asymmetric-guide-panel">
                    <div>
                        <span class="guide-kicker">Uso tecnico</span>
                        <h3>Flujo recomendado de practica</h3>
                    </div>
                    <ol class="guide-steps">
                        <li><strong>Genera claves RSA del servidor.</strong> La clave publica queda disponible para el cliente; la privada debe permanecer en el servidor.</li>
                        <li><strong>Escribe el mensaje del cliente.</strong> Ese texto es el plaintext que se cifrara antes de enviarse.</li>
                        <li><strong>Usa cifrado hibrido.</strong> El cliente cifra el mensaje con AES-GCM y cifra la clave AES con la clave publica RSA-OAEP del servidor.</li>
                        <li><strong>Observa el paquete recibido.</strong> El JSON contiene `wrappedKey`, `iv`, `ciphertext` y metadatos. `wrappedKey` es la clave AES protegida con RSA-OAEP.</li>
                        <li><strong>Descifra desde el servidor.</strong> El servidor usa su clave privada para recuperar la clave AES y despues usa AES-GCM para validar y descifrar el mensaje.</li>
                        <li><strong>Altera el paquete hibrido.</strong> Si modificas el ciphertext, AES-GCM debe fallar: eso demuestra autenticacion e integridad del contenido.</li>
                    </ol>
                    <div class="guide-note">
                        <strong>RSA directo</strong>
                        <span>Sirve para mensajes pequenos y para entender publica/privada. Para datos reales usa el modo hibrido porque RSA-OAEP no esta pensado para cifrar cargas grandes.</span>
                    </div>
                </div>

                <div class="control-grid compact-grid">
                    <div class="control-field">
                        <label class="field-label" for="asymmetric-key-size">Tamano RSA</label>
                        <select id="asymmetric-key-size" v-model.number="asymmetricKeySize" class="form-select input-dark">
                            <option v-for="item in asymmetricKeySizes" :key="item" :value="item">{{ item }} bits</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="asymmetric-hash">Hash OAEP</label>
                        <select id="asymmetric-hash" v-model="asymmetricHash" class="form-select input-dark">
                            <option v-for="item in asymmetricHashes" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="inline-actions module-actions">
                    <button class="btn btn-main" @click="generateAsymmetricKeyPair">Generar claves RSA servidor</button>
                    <button class="btn btn-subtle" @click="generateAsymmetricClientAesKey">Generar clave AES cliente</button>
                </div>

                <div class="asymmetric-transfer-grid">
                    <article class="transfer-panel client-panel">
                        <header class="transfer-panel-head">
                            <span>Cliente</span>
                            <h3>Cifra el mensaje</h3>
                            <p>Usa la clave publica del servidor. El cliente puede cifrar, pero no puede descifrar.</p>
                        </header>

                        <div class="control-field">
                            <label class="field-label" for="asymmetric-public-key">Clave publica del servidor</label>
                            <textarea
                                id="asymmetric-public-key"
                                v-model="asymmetricPublicKeyPem"
                                class="form-control input-dark textarea-dark mono-textarea"
                                rows="5"
                                placeholder="-----BEGIN PUBLIC KEY-----"
                            ></textarea>
                        </div>

                        <div class="control-field">
                            <label class="field-label" for="asymmetric-plaintext">Mensaje del cliente</label>
                            <textarea
                                id="asymmetric-plaintext"
                                v-model="asymmetricPlaintext"
                                class="form-control input-dark textarea-dark"
                                rows="8"
                                placeholder="Texto que el cliente quiere enviar al servidor"
                            ></textarea>
                        </div>

                        <div class="flow-note">
                            <strong>Salida del cliente</strong>
                            <span>RSA directo produce Base64. El modo hibrido produce un JSON con clave AES envuelta, IV y ciphertext.</span>
                        </div>

                        <div class="key-exchange-box">
                            <div class="key-exchange-head">
                                <strong>Material que envia el cliente</strong>
                                <span>Modo hibrido</span>
                            </div>
                            <div class="control-field">
                                <label class="field-label" for="asymmetric-client-aes-key">Clave AES del cliente (didactica)</label>
                                <textarea
                                    id="asymmetric-client-aes-key"
                                    v-model="asymmetricClientAesKey"
                                    class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                                    rows="2"
                                    placeholder="Se genera al crear la clave AES o al cifrar en modo hibrido"
                                    readonly
                                ></textarea>
                            </div>
                            <div class="control-field">
                                <label class="field-label" for="asymmetric-wrapped-key">Clave AES cifrada enviada al servidor</label>
                                <textarea
                                    id="asymmetric-wrapped-key"
                                    v-model="asymmetricWrappedKeyPreview"
                                    class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                                    rows="3"
                                    placeholder="wrappedKey: RSA-OAEP(clave AES)"
                                    readonly
                                ></textarea>
                            </div>
                            <div class="control-field">
                                <label class="field-label" for="asymmetric-iv">IV AES-GCM enviado</label>
                                <input
                                    id="asymmetric-iv"
                                    v-model="asymmetricIvPreview"
                                    class="form-control input-dark mono-input"
                                    placeholder="IV de 12 bytes en Base64"
                                    readonly
                                />
                            </div>
                        </div>

                        <div class="inline-actions">
                            <button class="btn btn-main" @click="runHybridEncrypt">Cifrar envio hibrido</button>
                            <button class="btn btn-subtle" @click="runAsymmetricEncrypt">Cifrar RSA directo</button>
                            <button class="btn btn-subtle" @click="generateAsymmetricClientAesKey">Generar clave AES cliente</button>
                            <button class="btn btn-subtle" @click="fillAsymmetricExample">Cargar ejemplo</button>
                        </div>
                    </article>

                    <article class="transfer-panel server-panel">
                        <header class="transfer-panel-head">
                            <span>Servidor</span>
                            <h3>Descifra el paquete</h3>
                            <p>Genera el par RSA, comparte la publica y usa la privada para recuperar el mensaje.</p>
                        </header>

                        <div class="control-field">
                            <label class="field-label" for="asymmetric-private-key">Clave privada del servidor</label>
                            <textarea
                                id="asymmetric-private-key"
                                v-model="asymmetricPrivateKeyPem"
                                class="form-control input-dark textarea-dark mono-textarea"
                                rows="6"
                                placeholder="-----BEGIN PRIVATE KEY-----"
                            ></textarea>
                        </div>

                        <div class="control-field">
                            <label class="field-label" for="asymmetric-ciphertext">Paquete recibido</label>
                            <textarea
                                id="asymmetric-ciphertext"
                                v-model="asymmetricCiphertext"
                                class="form-control input-dark textarea-dark mono-textarea"
                                rows="8"
                                placeholder="JSON hibrido recibido desde el cliente o Base64 RSA-OAEP"
                            ></textarea>
                        </div>

                        <div class="control-field">
                            <label class="field-label" for="asymmetric-server-output">Mensaje descifrado</label>
                            <textarea
                                id="asymmetric-server-output"
                                v-model="asymmetricServerOutput"
                                class="form-control input-dark textarea-dark"
                                rows="5"
                                readonly
                                placeholder="El contenido descifrado aparecera aqui"
                            ></textarea>
                        </div>

                        <div class="inline-actions">
                            <button class="btn btn-main" @click="generateAsymmetricKeyPair">Generar claves servidor</button>
                            <button class="btn btn-subtle" @click="runHybridDecrypt">Descifrar envio hibrido</button>
                            <button class="btn btn-subtle" @click="runAsymmetricDecrypt">Descifrar RSA directo</button>
                            <button class="btn btn-subtle" @click="tamperHybridEnvelope">Alterar paquete hibrido</button>
                        </div>
                    </article>
                </div>
                <p class="helper-copy">
                    RSA-OAEP solo cifra cargas pequenas. Para mensajes reales, el patron normal es hibrido: se cifra el
                    contenido con AES-GCM y se protege la clave AES con la clave publica RSA.
                </p>

                <template v-if="asymmetricResult">
                    <div class="row g-3 mb-4">
                        <div class="col-6 col-lg-3" v-for="item in asymmetricResult.summaryCards" :key="item.label">
                            <div class="metric-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="verdict-card" :class="asymmetricResult.verdictTone">
                        <div class="verdict-icon">
                            <span>RSA</span>
                        </div>
                        <div class="verdict-body">
                            <strong>{{ asymmetricResult.verdictTitle }}</strong>
                            <p>{{ asymmetricResult.verdictBody }}</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-6 col-xl-3" v-for="item in asymmetricResult.signalCards" :key="item.label">
                            <div class="signal-card">
                                <label>{{ item.label }}</label>
                                <span :class="item.tone">{{ item.value }}</span>
                                <small>{{ item.note }}</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-xl-6" v-for="panel in asymmetricResult.panels" :key="panel.title">
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

            <section class="section-box signature-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 04</span>
                    <h2 class="module-title">Firma digital y verificacion</h2>
                    <p class="module-copy">
                        Genera claves, firma un mensaje con clave privada y verifica la firma con clave publica. La
                        practica separa integridad, autenticidad y confidencialidad: firmar no cifra.
                    </p>
                </div>

                <div class="control-grid compact-grid">
                    <div class="control-field">
                        <label class="field-label" for="signature-algorithm">Algoritmo</label>
                        <select id="signature-algorithm" v-model="signatureAlgorithm" class="form-select input-dark">
                            <option value="RSA-PSS">RSA-PSS SHA-256</option>
                            <option value="ECDSA-P256">ECDSA P-256 SHA-256</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="signature-salt">Salt RSA-PSS</label>
                        <input
                            id="signature-salt"
                            v-model.number="signatureSaltLength"
                            type="number"
                            min="0"
                            max="64"
                            class="form-control input-dark"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="signature-message">Mensaje</label>
                        <textarea
                            id="signature-message"
                            v-model="signatureMessage"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Mensaje que sera firmado byte a byte"
                        ></textarea>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="signature-public-key">Clave publica</label>
                        <textarea
                            id="signature-public-key"
                            v-model="signaturePublicKeyPem"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="4"
                            placeholder="-----BEGIN PUBLIC KEY-----"
                        ></textarea>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="signature-private-key">Clave privada</label>
                        <textarea
                            id="signature-private-key"
                            v-model="signaturePrivateKeyPem"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="4"
                            placeholder="-----BEGIN PRIVATE KEY-----"
                        ></textarea>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="signature-output">Firma Base64</label>
                        <textarea
                            id="signature-output"
                            v-model="signatureValue"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="3"
                            placeholder="Firma generada o firma recibida para verificar"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="generateSignatureKeyPair">Generar claves</button>
                    <button class="btn btn-main" @click="signMessage">Firmar</button>
                    <button class="btn btn-subtle" @click="verifySignature">Verificar</button>
                    <button class="btn btn-subtle" @click="fillSignatureExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel
                    v-if="signatureResult"
                    :result="signatureResult"
                    icon="SIGN"
                    @copy="copyText"
                />
            </section>

            <section class="section-box aead-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 05</span>
                    <h2 class="module-title">Laboratorio AEAD con AES-GCM</h2>
                    <p class="module-copy">
                        Cifra con autenticacion. AES-GCM produce ciphertext y tag; si cambian el texto cifrado, el IV,
                        la clave o el AAD, el descifrado debe fallar.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="aead-key-size">Tamano de clave</label>
                        <select id="aead-key-size" v-model.number="aeadKeySize" class="form-select input-dark">
                            <option :value="128">128 bits</option>
                            <option :value="192">192 bits</option>
                            <option :value="256">256 bits</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="aead-tag-length">Tag</label>
                        <select id="aead-tag-length" v-model.number="aeadTagLength" class="form-select input-dark">
                            <option :value="128">128 bits</option>
                            <option :value="96">96 bits</option>
                            <option :value="64">64 bits</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="aead-key">Clave AES Base64</label>
                        <input
                            id="aead-key"
                            v-model="aeadKey"
                            class="form-control input-dark mono-input"
                            placeholder="Clave simetrica en Base64"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="aead-iv">IV / nonce Base64</label>
                        <input
                            id="aead-iv"
                            v-model="aeadIv"
                            class="form-control input-dark mono-input"
                            placeholder="12 bytes en Base64 recomendado"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="aead-aad">AAD</label>
                        <input
                            id="aead-aad"
                            v-model="aeadAad"
                            class="form-control input-dark"
                            placeholder="Datos autenticados no cifrados"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="aead-plaintext">Texto plano</label>
                        <textarea
                            id="aead-plaintext"
                            v-model="aeadPlaintext"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Contenido a cifrar"
                        ></textarea>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="aead-ciphertext">Ciphertext + tag Base64</label>
                        <textarea
                            id="aead-ciphertext"
                            v-model="aeadCiphertext"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="4"
                            placeholder="Salida AES-GCM para descifrar o alterar"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="generateAeadMaterial">Generar clave e IV</button>
                    <button class="btn btn-main" @click="encryptAead">Cifrar</button>
                    <button class="btn btn-subtle" @click="decryptAead">Descifrar</button>
                    <button class="btn btn-subtle" @click="tamperAeadCiphertext">Alterar ciphertext</button>
                    <button class="btn btn-subtle" @click="fillAeadExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="aeadResult" :result="aeadResult" icon="AEAD" @copy="copyText" />
            </section>

            <section class="section-box ecdh-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 06</span>
                    <h2 class="module-title">Intercambio ECDH</h2>
                    <p class="module-copy">
                        Dos partes generan claves de curva eliptica, intercambian claves publicas y derivan el mismo
                        secreto compartido sin enviarlo por la red.
                    </p>
                </div>

                <div class="control-grid compact-grid">
                    <div class="control-field">
                        <label class="field-label" for="ecdh-curve">Curva</label>
                        <select id="ecdh-curve" v-model="ecdhCurve" class="form-select input-dark">
                            <option value="P-256">P-256</option>
                            <option value="P-384">P-384</option>
                            <option value="P-521">P-521</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="ecdh-bits">Bits derivados</label>
                        <input
                            id="ecdh-bits"
                            v-model.number="ecdhDerivedBits"
                            type="number"
                            min="128"
                            max="512"
                            step="32"
                            class="form-control input-dark"
                        />
                    </div>
                </div>

                <div class="asymmetric-transfer-grid">
                    <article class="transfer-panel client-panel">
                        <header class="transfer-panel-head">
                            <span>Cliente</span>
                            <h3>Clave publica ECDH</h3>
                            <p>Esta clave se puede enviar al servidor. No contiene el secreto derivado.</p>
                        </header>
                        <textarea
                            v-model="ecdhClientPublicKeyPem"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="5"
                            readonly
                            placeholder="Clave publica del cliente"
                        ></textarea>
                    </article>
                    <article class="transfer-panel server-panel">
                        <header class="transfer-panel-head">
                            <span>Servidor</span>
                            <h3>Clave publica ECDH</h3>
                            <p>El cliente usa esta clave publica para derivar el mismo secreto.</p>
                        </header>
                        <textarea
                            v-model="ecdhServerPublicKeyPem"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="5"
                            readonly
                            placeholder="Clave publica del servidor"
                        ></textarea>
                    </article>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="generateEcdhPairs">Generar pares ECDH</button>
                    <button class="btn btn-subtle" @click="deriveEcdhSharedSecret">Derivar secreto</button>
                    <button class="btn btn-subtle" @click="fillEcdhExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="ecdhResult" :result="ecdhResult" icon="ECDH" @copy="copyText" />
            </section>

            <section class="section-box kdf-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 07</span>
                    <h2 class="module-title">Derivacion de claves PBKDF2 y HKDF</h2>
                    <p class="module-copy">
                        PBKDF2 endurece material humano con salt e iteraciones. HKDF expande material de alta entropia
                        usando salt e info de contexto.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="kdf-mode">Modo</label>
                        <select id="kdf-mode" v-model="kdfMode" class="form-select input-dark">
                            <option value="PBKDF2">PBKDF2</option>
                            <option value="HKDF">HKDF</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="kdf-hash">Hash</label>
                        <select id="kdf-hash" v-model="kdfHash" class="form-select input-dark">
                            <option value="SHA-256">SHA-256</option>
                            <option value="SHA-384">SHA-384</option>
                            <option value="SHA-512">SHA-512</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="kdf-length">Bytes salida</label>
                        <input id="kdf-length" v-model.number="kdfLength" type="number" min="16" max="128" class="form-control input-dark" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="kdf-iterations">Iteraciones PBKDF2</label>
                        <input id="kdf-iterations" v-model.number="kdfIterations" type="number" min="1000" step="1000" class="form-control input-dark" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="kdf-input">Material de entrada</label>
                        <input id="kdf-input" v-model="kdfInput" class="form-control input-dark" placeholder="Password, semilla o secreto base" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="kdf-salt">Salt Base64</label>
                        <input id="kdf-salt" v-model="kdfSalt" class="form-control input-dark mono-input" placeholder="Salt aleatorio" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="kdf-info">Info HKDF</label>
                        <input id="kdf-info" v-model="kdfInfo" class="form-control input-dark" placeholder="Contexto: app, protocolo, uso de clave" />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="deriveKdfMaterial">Derivar</button>
                    <button class="btn btn-subtle" @click="generateKdfSalt">Generar salt</button>
                    <button class="btn btn-subtle" @click="fillKdfExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="kdfResult" :result="kdfResult" icon="KDF" @copy="copyText" />
            </section>

            <section class="section-box certificate-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 08</span>
                    <h2 class="module-title">Inspector X.509</h2>
                    <p class="module-copy">
                        Analiza certificados PEM: sujeto, emisor, validez, huella SHA-256, SAN y relacion basica entre
                        certificados pegados en la misma cadena.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field full-span">
                        <label class="field-label" for="certificate-input">Certificado o cadena PEM</label>
                        <textarea
                            id="certificate-input"
                            v-model="certificateInput"
                            class="form-control input-dark textarea-dark mono-textarea tall-textarea"
                            rows="10"
                            placeholder="-----BEGIN CERTIFICATE-----"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="inspectCertificates">Inspeccionar</button>
                    <button class="btn btn-subtle" @click="useCertificateFromPemConverter">Usar entrada del conversor</button>
                </div>

                <FeanorResultPanel v-if="certificateResult" :result="certificateResult" icon="X509" @copy="copyText" />
            </section>

            <section class="section-box key-converter-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 09</span>
                    <h2 class="module-title">Conversor PEM, DER y JWK</h2>
                    <p class="module-copy">
                        Convierte claves RSA o EC entre PEM y JWK cuando WebCrypto puede importarlas. Tambien extrae y
                        reconstruye DER Base64 desde bloques PEM.
                    </p>
                </div>

                <div class="control-grid compact-grid">
                    <div class="control-field">
                        <label class="field-label" for="key-converter-kind">Tipo</label>
                        <select id="key-converter-kind" v-model="keyConverterKind" class="form-select input-dark">
                            <option value="spki">Publica PEM/SPKI</option>
                            <option value="pkcs8">Privada PEM/PKCS8</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="key-converter-algorithm">Algoritmo</label>
                        <select id="key-converter-algorithm" v-model="keyConverterAlgorithm" class="form-select input-dark">
                            <option value="RSA-OAEP">RSA-OAEP</option>
                            <option value="RSA-PSS">RSA-PSS</option>
                            <option value="ECDSA">ECDSA P-256</option>
                            <option value="ECDH">ECDH P-256</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="key-converter-input">Entrada PEM, DER Base64 o JWK</label>
                        <textarea
                            id="key-converter-input"
                            v-model="keyConverterInput"
                            class="form-control input-dark textarea-dark mono-textarea tall-textarea"
                            rows="9"
                            placeholder="Pega una clave PEM, DER Base64 o un objeto JWK"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="convertPemToJwk">PEM a JWK</button>
                    <button class="btn btn-subtle" @click="convertJwkToPem">JWK a PEM</button>
                    <button class="btn btn-subtle" @click="extractDerFromPem">PEM a DER Base64</button>
                    <button class="btn btn-subtle" @click="wrapDerAsPem">DER Base64 a PEM</button>
                    <button class="btn btn-subtle" @click="useAsymmetricKeyForConverter">Usar clave RSA actual</button>
                </div>

                <FeanorResultPanel v-if="keyConverterResult" :result="keyConverterResult" icon="KEY" @copy="copyText" />
            </section>

            <section class="section-box jwt-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 10</span>
                    <h2 class="module-title">Inspector y validador de JWT</h2>
                    <p class="module-copy">
                        Decodifica cabecera y payload, revisa tiempos, algoritmos, audiencias, emisor y cabeceras
                        delicadas, y valida firmas HMAC o JWKS cuando aportas el material criptografico.
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
                    <div class="control-field full-span">
                        <label class="field-label" for="jwt-jwks">JWKS / JWK publico</label>
                        <textarea
                            id="jwt-jwks"
                            v-model="jwtJwksInput"
                            class="form-control input-dark textarea-dark mono-textarea compact-textarea"
                            rows="4"
                            placeholder='{"keys":[{"kty":"RSA","kid":"...","n":"...","e":"..."}]}'
                        ></textarea>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="jwt-hmac-secret">Secreto HMAC</label>
                        <input
                            id="jwt-hmac-secret"
                            v-model="jwtHmacSecret"
                            class="form-control input-dark"
                            placeholder="Clave compartida para HS256 / HS384 / HS512"
                        />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="decodeJwtToken">Inspeccionar</button>
                    <button class="btn btn-main" @click="validateJwtWithJwks">Validar JWKS</button>
                    <button class="btn btn-subtle" @click="validateJwtWithHmac">Validar HMAC</button>
                    <button class="btn btn-subtle" @click="fillJwtExample">Cargar ejemplo</button>
                    <button
                        class="btn btn-subtle"
                        @click="sendJwtPayloadToJson"
                    >
                        Enviar payload a JSON
                    </button>
                </div>
                <p class="helper-copy">
                    La inspeccion solo decodifica. La validacion comprueba la firma con JWKS/JWK publico o secreto HMAC,
                    segun el algoritmo del token.
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

            <section class="section-box transform-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 11</span>
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
                        class="btn btn-subtle"
                        @click="useTransformOutputAsInput"
                    >
                        Pasar salida a entrada
                    </button>
                    <button
                        class="btn btn-subtle"
                        @click="sendTransformOutputToJson"
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

            <section class="section-box byte-inspector-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 12</span>
                    <h2 class="module-title">Inspector de bytes y encoding</h2>
                    <p class="module-copy">
                        Descompone texto o bytes en UTF-8, Hex, Base64, Base64URL, binario y decimal. Sirve para ver
                        exactamente que bytes existen antes de hashear, firmar, cifrar o parsear.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="byte-input-mode">Entrada</label>
                        <select id="byte-input-mode" v-model="byteInputMode" class="form-select input-dark">
                            <option value="text">Texto UTF-8</option>
                            <option value="hex">Hex</option>
                            <option value="base64">Base64</option>
                            <option value="base64url">Base64URL</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="byte-input">Material</label>
                        <textarea
                            id="byte-input"
                            v-model="byteInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Texto, hexadecimal o Base64"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="inspectBytes">Inspeccionar bytes</button>
                    <button class="btn btn-subtle" @click="useTransformOutputForBytes">Usar salida transformada</button>
                    <button class="btn btn-subtle" @click="fillByteExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="byteResult" :result="byteResult" icon="BYTE" @copy="copyText" />
            </section>

            <section class="section-box json-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 13</span>
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

            <section class="section-box json-sign-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 14</span>
                    <h2 class="module-title">Canonicalizacion y firma de JSON</h2>
                    <p class="module-copy">
                        Ordena claves de forma determinista y calcula firma HMAC sobre los bytes canonicos. Es el paso
                        previo para que dos sistemas firmen exactamente el mismo JSON.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="json-sign-algorithm">Algoritmo</label>
                        <select id="json-sign-algorithm" v-model="jsonSignAlgorithm" class="form-select input-dark">
                            <option value="SHA256">HMAC-SHA256</option>
                            <option value="SHA512">HMAC-SHA512</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="json-sign-secret">Clave HMAC</label>
                        <input
                            id="json-sign-secret"
                            v-model="jsonSignSecret"
                            class="form-control input-dark"
                            placeholder="Clave compartida para firmar el JSON canonico"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="json-sign-input">JSON</label>
                        <textarea
                            id="json-sign-input"
                            v-model="jsonSignInput"
                            class="form-control input-dark textarea-dark tall-textarea"
                            rows="9"
                            placeholder='{"b":2,"a":1}'
                        ></textarea>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="json-signature">Firma Hex</label>
                        <input
                            id="json-signature"
                            v-model="jsonSignature"
                            class="form-control input-dark mono-input"
                            placeholder="Firma esperada o firma generada"
                        />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="canonicalizeJsonInput">Canonicalizar</button>
                    <button class="btn btn-main" @click="signCanonicalJson">Firmar</button>
                    <button class="btn btn-subtle" @click="verifyCanonicalJsonSignature">Verificar</button>
                    <button class="btn btn-subtle" @click="useJsonDocAForSigning">Usar JSON A</button>
                    <button class="btn btn-subtle" @click="fillJsonSignExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="jsonSignResult" :result="jsonSignResult" icon="JWS" @copy="copyText" />
            </section>

            <section class="section-box secret-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 15</span>
                    <h2 class="module-title">Generador de secretos</h2>
                    <p class="module-copy">
                        Genera contrasenas, tokens, cadenas hexadecimales y UUIDs locales para pruebas tecnicas. El
                        resultado no se envia a ningun backend.
                    </p>
                </div>

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
                                    class="btn btn-subtle"
                                    @click="useSecretAsCipherKey"
                                >
                                    Usar como clave
                                </button>
                                <button
                                    class="btn btn-subtle"
                                    @click="useSecretAsHashSecret"
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
            </section>

            <section class="section-box entropy-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 16</span>
                    <h2 class="module-title">Analizador de entropia</h2>
                    <p class="module-copy">
                        Evalua passwords, tokens o claves: longitud, charset, entropia estimada, puntuacion zxcvbn,
                        repeticion y compatibilidad de transporte.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field full-span">
                        <label class="field-label" for="entropy-input">Material</label>
                        <textarea
                            id="entropy-input"
                            v-model="entropyInput"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Password, token, API key o secreto"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="analyzeEntropy">Analizar</button>
                    <button class="btn btn-subtle" @click="useGeneratedSecretForEntropy">Usar ultimo secreto</button>
                    <button class="btn btn-subtle" @click="fillEntropyExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="entropyResult" :result="entropyResult" icon="ENT" @copy="copyText" />
            </section>

            <section class="section-box otp-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 17</span>
                    <h2 class="module-title">TOTP y HOTP</h2>
                    <p class="module-copy">
                        Genera secretos Base32, calcula codigos HOTP/TOTP y verifica codigos de un solo uso usando
                        HMAC, contador o ventana temporal.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="otp-mode">Modo</label>
                        <select id="otp-mode" v-model="otpMode" class="form-select input-dark">
                            <option value="TOTP">TOTP</option>
                            <option value="HOTP">HOTP</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="otp-algorithm">Algoritmo</label>
                        <select id="otp-algorithm" v-model="otpAlgorithm" class="form-select input-dark">
                            <option value="SHA1">SHA1</option>
                            <option value="SHA256">SHA256</option>
                            <option value="SHA512">SHA512</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="otp-digits">Digitos</label>
                        <input id="otp-digits" v-model.number="otpDigits" type="number" min="6" max="8" class="form-control input-dark" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="otp-step">Paso TOTP</label>
                        <input id="otp-step" v-model.number="otpStep" type="number" min="15" max="120" class="form-control input-dark" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="otp-secret">Secreto Base32</label>
                        <input id="otp-secret" v-model="otpSecret" class="form-control input-dark mono-input" placeholder="JBSWY3DPEHPK3PXP" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="otp-counter">Contador HOTP</label>
                        <input id="otp-counter" v-model.number="otpCounter" type="number" min="0" class="form-control input-dark" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="otp-code">Codigo a verificar</label>
                        <input id="otp-code" v-model="otpCodeToVerify" class="form-control input-dark mono-input" placeholder="123456" />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="generateOtpSecret">Generar secreto</button>
                    <button class="btn btn-main" @click="generateOtpCode">Generar codigo</button>
                    <button class="btn btn-subtle" @click="verifyOtpCode">Verificar codigo</button>
                    <button class="btn btn-subtle" @click="fillOtpExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="otpResult" :result="otpResult" icon="OTP" @copy="copyText" />
            </section>

            <section class="section-box timing-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 18</span>
                    <h2 class="module-title">Comparador constante</h2>
                    <p class="module-copy">
                        Compara dos valores byte a byte con una rutina de tiempo constante. La practica muestra por que
                        comparar secretos con igualdad directa puede filtrar informacion por timing.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="timing-iterations">Iteraciones medicion</label>
                        <input id="timing-iterations" v-model.number="timingIterations" type="number" min="1000" max="200000" step="1000" class="form-control input-dark" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="timing-left">Valor A</label>
                        <input id="timing-left" v-model="timingLeft" class="form-control input-dark mono-input" placeholder="Hash, token o firma esperada" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="timing-right">Valor B</label>
                        <input id="timing-right" v-model="timingRight" class="form-control input-dark mono-input" placeholder="Hash, token o firma recibida" />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="compareConstantTime">Comparar</button>
                    <button class="btn btn-subtle" @click="useHashForTimingCompare">Usar ultimo hash</button>
                    <button class="btn btn-subtle" @click="fillTimingExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="timingResult" :result="timingResult" icon="TIME" @copy="copyText" />
            </section>

            <section class="section-box regex-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 19</span>
                    <h2 class="module-title">Banco regex</h2>
                    <p class="module-copy">
                        Prueba expresiones regulares contra texto real, activa flags y revisa coincidencias, indices y
                        grupos capturados.
                    </p>
                </div>

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
import zxcvbn from "zxcvbn";
import FeanorResultPanel from "@/components/FeanorResultPanel.vue";

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
const asymmetricKeySizes = [2048, 3072, 4096];
const asymmetricHashes = ["SHA-256", "SHA-384", "SHA-512"];
const asymmetricHashBytes = {
    "SHA-256": 32,
    "SHA-384": 48,
    "SHA-512": 64
};

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

const asymmetricKeySize = ref(2048);
const asymmetricHash = ref("SHA-256");
const asymmetricPublicKeyPem = ref("");
const asymmetricPrivateKeyPem = ref("");
const asymmetricPlaintext = ref("");
const asymmetricCiphertext = ref("");
const asymmetricServerOutput = ref("");
const asymmetricClientAesKey = ref("");
const asymmetricWrappedKeyPreview = ref("");
const asymmetricIvPreview = ref("");
const asymmetricResult = ref(null);
const showAsymmetricGuide = ref(false);

const signatureAlgorithm = ref("RSA-PSS");
const signatureSaltLength = ref(32);
const signatureMessage = ref("");
const signaturePublicKeyPem = ref("");
const signaturePrivateKeyPem = ref("");
const signatureValue = ref("");
const signatureResult = ref(null);

const aeadKeySize = ref(256);
const aeadTagLength = ref(128);
const aeadKey = ref("");
const aeadIv = ref("");
const aeadAad = ref("");
const aeadPlaintext = ref("");
const aeadCiphertext = ref("");
const aeadResult = ref(null);

const ecdhCurve = ref("P-256");
const ecdhDerivedBits = ref(256);
const ecdhClientPublicKeyPem = ref("");
const ecdhServerPublicKeyPem = ref("");
const ecdhClientKeyPair = ref(null);
const ecdhServerKeyPair = ref(null);
const ecdhResult = ref(null);

const kdfMode = ref("PBKDF2");
const kdfHash = ref("SHA-256");
const kdfLength = ref(32);
const kdfIterations = ref(180000);
const kdfInput = ref("");
const kdfSalt = ref("");
const kdfInfo = ref("");
const kdfResult = ref(null);

const certificateInput = ref("");
const certificateResult = ref(null);

const keyConverterKind = ref("spki");
const keyConverterAlgorithm = ref("RSA-OAEP");
const keyConverterInput = ref("");
const keyConverterResult = ref(null);

const jwtInput = ref("");
const jwtJwksInput = ref("");
const jwtHmacSecret = ref("");
const jwtResult = ref(null);

const transformOperation = ref("base64-encode");
const transformInput = ref("");
const transformResult = ref(null);

const byteInputMode = ref("text");
const byteInput = ref("");
const byteResult = ref(null);

const jsonDocA = ref("");
const jsonDocB = ref("");
const jsonResult = ref(null);

const jsonSignAlgorithm = ref("SHA256");
const jsonSignSecret = ref("");
const jsonSignInput = ref("");
const jsonSignature = ref("");
const jsonSignResult = ref(null);

const secretKind = ref("password");
const secretLength = ref(24);
const secretOptions = reactive({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true
});
const secretResult = ref(null);

const entropyInput = ref("");
const entropyResult = ref(null);

const otpMode = ref("TOTP");
const otpAlgorithm = ref("SHA1");
const otpDigits = ref(6);
const otpStep = ref(30);
const otpSecret = ref("");
const otpCounter = ref(0);
const otpCodeToVerify = ref("");
const otpResult = ref(null);

const timingLeft = ref("");
const timingRight = ref("");
const timingIterations = ref(50000);
const timingResult = ref(null);

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

function bytesToBase64(value) {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
    let binary = "";
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}

function base64ToBytes(value) {
    const normalized = String(value ?? "").replace(/\s+/g, "");
    const binary = atob(normalized);
    return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function bytesToBase64Url(value) {
    return base64ToBase64Url(bytesToBase64(value));
}

function base64UrlToBytes(value) {
    return base64ToBytes(base64UrlToBase64(String(value ?? "")));
}

function textToBytes(value) {
    return new TextEncoder().encode(String(value ?? ""));
}

function bytesToUtf8(value) {
    return new TextDecoder().decode(value);
}

function bytesToHex(value) {
    return Array.from(value instanceof Uint8Array ? value : new Uint8Array(value))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

function hexToBytes(value) {
    const normalized = String(value ?? "").replace(/\s+/g, "");
    if (!normalized || normalized.length % 2 !== 0 || /[^0-9a-f]/i.test(normalized)) {
        throw new Error("La entrada Hex debe tener longitud par y caracteres 0-9 / a-f.");
    }
    const pairs = normalized.match(/.{1,2}/g) || [];
    return new Uint8Array(pairs.map(pair => Number.parseInt(pair, 16)));
}

function wordArrayToBytes(wordArray) {
    const bytes = [];
    for (let index = 0; index < wordArray.sigBytes; index += 1) {
        bytes.push((wordArray.words[index >>> 2] >>> (24 - (index % 4) * 8)) & 0xff);
    }
    return new Uint8Array(bytes);
}

function bytesToWordArray(bytes) {
    const words = [];
    bytes.forEach((byte, index) => {
        words[index >>> 2] |= byte << (24 - (index % 4) * 8);
    });
    return CryptoJS.lib.WordArray.create(words, bytes.length);
}

function arrayBufferToPem(buffer, label) {
    const base64 = bytesToBase64(buffer);
    const lines = base64.match(/.{1,64}/g) || [];
    return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----`;
}

function pemToArrayBuffer(pem, label) {
    const normalized = String(pem ?? "").trim();
    const body = normalized
        .replace(`-----BEGIN ${label}-----`, "")
        .replace(`-----END ${label}-----`, "")
        .replace(/\s+/g, "");

    if (!body) {
        throw new Error(`La clave ${label} esta vacia o no tiene formato PEM valido.`);
    }

    return base64ToBytes(body).buffer;
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

function parsePemBlocks(value, expectedLabel = null) {
    const blocks = [];
    const pattern = /-----BEGIN ([A-Z0-9 ]+)-----([\s\S]*?)-----END \1-----/g;
    let match = pattern.exec(String(value ?? ""));
    while (match) {
        const label = match[1];
        if (!expectedLabel || label === expectedLabel) {
            const base64 = match[2].replace(/\s+/g, "");
            blocks.push({
                label,
                base64,
                bytes: base64ToBytes(base64)
            });
        }
        match = pattern.exec(String(value ?? ""));
    }
    return blocks;
}

function getPemBlock(value, label) {
    const blocks = parsePemBlocks(value, label);
    if (!blocks.length) {
        throw new Error(`No se encontro un bloque PEM ${label}.`);
    }
    return blocks[0];
}

function compactDerBase64(value) {
    return String(value ?? "").replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
}

function canonicalJsonString(value) {
    if (Array.isArray(value)) {
        return `[${value.map(canonicalJsonString).join(",")}]`;
    }
    if (value && typeof value === "object") {
        return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJsonString(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

function splitJwt(token) {
    const parts = String(token ?? "").trim().split(".");
    if (parts.length !== 3) {
        throw new Error("Un JWT firmado debe tener cabecera, payload y firma.");
    }
    const header = JSON.parse(base64ToUtf8(base64UrlToBase64(parts[0])));
    const payload = JSON.parse(base64ToUtf8(base64UrlToBase64(parts[1])));
    return {
        parts,
        header,
        payload,
        signingInput: `${parts[0]}.${parts[1]}`,
        signatureBytes: base64UrlToBytes(parts[2])
    };
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

function useLastSecretAsHashSecret() {
    if (!secretResult.value?.generated) {
        hashResult.value = buildErrorResult("SECRET_NOT_GENERATED", "No hay secreto generado", "Genera primero un secreto en el modulo de secretos y vuelve a usar este boton.");
        return;
    }

    hashSecret.value = secretResult.value.generated;
}

function useCipherOutputAsInput() {
    if (!cipherResult.value?.primaryValue) {
        cipherResult.value = buildErrorResult("CIPHER_OUTPUT_EMPTY", "No hay salida cifrada o descifrada", "Ejecuta primero Cifrar o Descifrar para generar una salida reutilizable.");
        return;
    }

    cipherInput.value = cipherResult.value.primaryValue;
}

function useTransformOutputAsInput() {
    if (!transformResult.value?.primaryValue) {
        transformResult.value = buildErrorResult("TRANSFORM_OUTPUT_EMPTY", "No hay salida transformada", "Aplica primero una transformacion para poder pasar la salida a entrada.");
        return;
    }

    transformInput.value = transformResult.value.primaryValue;
}

function sendTransformOutputToJson() {
    if (!transformResult.value?.primaryValue) {
        transformResult.value = buildErrorResult("TRANSFORM_OUTPUT_EMPTY", "No hay salida para JSON", "Aplica primero una transformacion y envia una salida que tenga estructura JSON.");
        return;
    }

    jsonDocA.value = transformResult.value.primaryValue;
}

function sendJwtPayloadToJson() {
    if (!jwtResult.value?.payloadText) {
        jwtResult.value = buildErrorResult("JWT_PAYLOAD_EMPTY", "No hay payload JWT", "Inspecciona primero un JWT valido para extraer su payload en JSON.");
        return;
    }

    jsonDocA.value = jwtResult.value.payloadText;
}

function useSecretAsCipherKey() {
    if (!secretResult.value?.generated) {
        secretResult.value = buildErrorResult("SECRET_NOT_GENERATED", "No hay secreto generado", "Pulsa Generar para crear un secreto antes de usarlo como clave.");
        return;
    }

    cipherKey.value = secretResult.value.generated;
}

function useSecretAsHashSecret() {
    if (!secretResult.value?.generated) {
        secretResult.value = buildErrorResult("SECRET_NOT_GENERATED", "No hay secreto generado", "Pulsa Generar para crear un secreto antes de usarlo en HMAC.");
        return;
    }

    hashSecret.value = secretResult.value.generated;
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
    if (hashMode.value === "hmac" && !hashSecret.value.trim()) {
        hashResult.value = buildErrorResult("HMAC_SECRET_EMPTY", "Falta la clave HMAC", "Introduce una clave secreta o genera un secreto antes de calcular HMAC.");
        return;
    }
    if (hashMode.value === "pbkdf2" && !hashSalt.value.trim()) {
        hashResult.value = buildErrorResult("PBKDF2_SALT_EMPTY", "Falta el salt", "Genera o introduce un salt antes de derivar una clave con PBKDF2.");
        return;
    }
    if (hashMode.value === "pbkdf2" && (!Number(hashIterations.value) || Number(hashIterations.value) < 1000)) {
        hashResult.value = buildErrorResult("PBKDF2_ITERATIONS_INVALID", "Iteraciones invalidas", "PBKDF2 necesita al menos 1000 iteraciones para ejecutar la practica.");
        return;
    }
    if (hashMode.value === "pbkdf2" && (!Number(hashKeySize.value) || Number(hashKeySize.value) < 16)) {
        hashResult.value = buildErrorResult("PBKDF2_KEYSIZE_INVALID", "Longitud derivada invalida", "Indica al menos 16 bytes derivados para ejecutar PBKDF2.");
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
            primaryValue: output,
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

function getSubtleCrypto() {
    if (!globalThis.crypto?.subtle) {
        throw new Error("Web Crypto API no esta disponible. Usa HTTPS o localhost.");
    }
    return globalThis.crypto.subtle;
}

function getRsaAlgorithm(hash = asymmetricHash.value) {
    return {
        name: "RSA-OAEP",
        hash
    };
}

function getRsaGenerationAlgorithm() {
    return {
        ...getRsaAlgorithm(),
        modulusLength: Number(asymmetricKeySize.value),
        publicExponent: new Uint8Array([1, 0, 1])
    };
}

function getDirectRsaLimit() {
    const modulusBytes = Number(asymmetricKeySize.value) / 8;
    const hashBytes = asymmetricHashBytes[asymmetricHash.value] || 32;
    return Math.max(0, modulusBytes - (2 * hashBytes) - 2);
}

function clearAsymmetricServerOutput() {
    asymmetricServerOutput.value = "";
}

function clearAsymmetricExchangePreview() {
    asymmetricWrappedKeyPreview.value = "";
    asymmetricIvPreview.value = "";
}

function getAsymmetricMessagePayload() {
    if (!asymmetricPlaintext.value.trim()) {
        throw new Error("Introduce un mensaje antes de cifrar.");
    }

    const bytes = new TextEncoder().encode(asymmetricPlaintext.value);
    return {
        bytes,
        text: asymmetricPlaintext.value,
        size: bytes.byteLength
    };
}

function assertAesKeyLength(bytes) {
    if (![16, 24, 32].includes(bytes.byteLength)) {
        throw new Error("La clave AES debe tener 16, 24 o 32 bytes. Genera una clave desde el boton del cliente.");
    }
}

async function getClientAesKey(subtle) {
    if (asymmetricClientAesKey.value.trim()) {
        const rawBytes = base64ToBytes(asymmetricClientAesKey.value);
        assertAesKeyLength(rawBytes);
        const key = await subtle.importKey(
            "raw",
            rawBytes,
            { name: "AES-GCM" },
            true,
            ["encrypt", "decrypt"]
        );
        return { key, rawBytes };
    }

    const key = await subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
    const rawBytes = new Uint8Array(await subtle.exportKey("raw", key));
    asymmetricClientAesKey.value = bytesToBase64(rawBytes);
    return { key, rawBytes };
}

async function importAsymmetricPublicKey(hash = asymmetricHash.value) {
    if (!asymmetricPublicKeyPem.value.trim()) {
        throw new Error("Necesitas una clave publica PEM para cifrar.");
    }

    return getSubtleCrypto().importKey(
        "spki",
        pemToArrayBuffer(asymmetricPublicKeyPem.value, "PUBLIC KEY"),
        getRsaAlgorithm(hash),
        true,
        ["encrypt"]
    );
}

async function importAsymmetricPrivateKey(hash = asymmetricHash.value) {
    if (!asymmetricPrivateKeyPem.value.trim()) {
        throw new Error("Necesitas una clave privada PEM para descifrar.");
    }

    return getSubtleCrypto().importKey(
        "pkcs8",
        pemToArrayBuffer(asymmetricPrivateKeyPem.value, "PRIVATE KEY"),
        getRsaAlgorithm(hash),
        true,
        ["decrypt"]
    );
}

function buildAsymmetricResult({ primaryValue = "", primaryTarget = null, verdictTone, verdictTitle, verdictBody, summaryCards, signalCards, panels }) {
    asymmetricResult.value = {
        primaryValue,
        primaryTarget,
        verdictTone,
        verdictTitle,
        verdictBody,
        summaryCards,
        signalCards,
        panels
    };
}

async function generateAsymmetricKeyPair() {
    try {
        const subtle = getSubtleCrypto();
        const keyPair = await subtle.generateKey(
            getRsaGenerationAlgorithm(),
            true,
            ["encrypt", "decrypt"]
        );
        const publicBuffer = await subtle.exportKey("spki", keyPair.publicKey);
        const privateBuffer = await subtle.exportKey("pkcs8", keyPair.privateKey);
        const publicPem = arrayBufferToPem(publicBuffer, "PUBLIC KEY");
        const privatePem = arrayBufferToPem(privateBuffer, "PRIVATE KEY");

        asymmetricPublicKeyPem.value = publicPem;
        asymmetricPrivateKeyPem.value = privatePem;

        buildAsymmetricResult({
            primaryValue: publicPem,
            primaryTarget: "publicKey",
            verdictTone: "verdict-success",
            verdictTitle: "Par RSA generado",
            verdictBody: "Se genero un par RSA-OAEP exportable en formato PEM. La clave publica cifra; la clave privada descifra.",
            summaryCards: [
                { label: "Algoritmo", value: "RSA-OAEP", tone: "tone-success", note: "Cifrado asimetrico" },
                { label: "Tamano", value: `${asymmetricKeySize.value} bits`, tone: Number(asymmetricKeySize.value) >= 3072 ? "tone-success" : "tone-warning", note: "Modulo RSA" },
                { label: "Hash", value: asymmetricHash.value, tone: "tone-success", note: "MGF1/OAEP" },
                { label: "Formato", value: "PEM", tone: "tone-neutral", note: "SPKI + PKCS8" }
            ],
            signalCards: [
                { label: "Clave publica", value: `${publicPem.length} chars`, tone: "tone-success", note: "Compartible" },
                { label: "Clave privada", value: `${privatePem.length} chars`, tone: "tone-warning", note: "Debe protegerse" },
                { label: "Limite RSA", value: `${getDirectRsaLimit()} bytes`, tone: "tone-warning", note: "Carga maxima directa aproximada" },
                { label: "Uso recomendado", value: "Hibrido", tone: "tone-success", note: "RSA protege una clave AES" }
            ],
            panels: [
                {
                    title: "Clave publica",
                    badge: "spki",
                    content: publicPem,
                    copyValue: publicPem
                },
                {
                    title: "Clave privada",
                    badge: "pkcs8",
                    content: privatePem,
                    copyValue: privatePem
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", [
                        "RSA-OAEP cifra con la clave publica y descifra con la clave privada.",
                        "La clave privada permite recuperar el contenido: no debe compartirse.",
                        "RSA no esta pensado para cifrar documentos largos; para eso se usa cifrado hibrido."
                    ]),
                    copyValue: "RSA-OAEP cifra con publica, descifra con privada y se usa normalmente en esquemas hibridos."
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("ASYM_KEYGEN_FAILED", "No se pudo generar el par RSA", error.message);
    }
}

function generateAsymmetricClientAesKey() {
    try {
        const bytes = new Uint8Array(32);
        globalThis.crypto.getRandomValues(bytes);
        asymmetricClientAesKey.value = bytesToBase64(bytes);
        clearAsymmetricExchangePreview();

        buildAsymmetricResult({
            primaryValue: asymmetricClientAesKey.value,
            primaryTarget: null,
            verdictTone: "verdict-success",
            verdictTitle: "Clave AES del cliente generada",
            verdictBody: "Esta clave simetrica cifra el mensaje en modo hibrido. En un envio real no viaja en claro: viaja cifrada con RSA-OAEP.",
            summaryCards: [
                { label: "Algoritmo", value: "AES-GCM", tone: "tone-success", note: "Clave simetrica" },
                { label: "Tamano", value: "256 bits", tone: "tone-success", note: "32 bytes" },
                { label: "Formato visible", value: "Base64", tone: "tone-neutral", note: "Solo laboratorio" },
                { label: "Transporte real", value: "RSA-OAEP", tone: "tone-success", note: "Envuelta antes de enviarse" }
            ],
            signalCards: [
                { label: "Cliente", value: "Genera", tone: "tone-success", note: "Crea la clave AES" },
                { label: "Servidor", value: "Recupera", tone: "tone-success", note: "La obtiene descifrando wrappedKey" },
                { label: "IV", value: "Pendiente", tone: "tone-neutral", note: "Se genera al cifrar" },
                { label: "Paquete", value: "Pendiente", tone: "tone-neutral", note: "Falta cifrar mensaje" }
            ],
            panels: [
                {
                    title: "Clave AES cliente",
                    badge: "base64",
                    content: asymmetricClientAesKey.value,
                    copyValue: asymmetricClientAesKey.value
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Flujo", [
                        "El cliente usa esta clave para cifrar el mensaje con AES-GCM.",
                        "Despues cifra esta clave AES con la clave publica RSA del servidor.",
                        "El servidor descifra wrappedKey con su clave privada y obtiene la misma clave AES."
                    ]),
                    copyValue: "Cliente genera AES; RSA-OAEP protege AES; servidor recupera AES con privada."
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("ASYM_AES_KEY_FAILED", "No se pudo generar la clave AES", error.message);
    }
}

async function fillAsymmetricExample() {
    asymmetricKeySize.value = 2048;
    asymmetricHash.value = "SHA-256";
    asymmetricPlaintext.value = "La clave publica puede viajar por la Comarca; la privada se queda bajo llave.";
    asymmetricCiphertext.value = "";
    asymmetricClientAesKey.value = "";
    clearAsymmetricExchangePreview();
    clearAsymmetricServerOutput();
    await generateAsymmetricKeyPair();
    generateAsymmetricClientAesKey();
}

async function runAsymmetricEncrypt() {
    if (!asymmetricPlaintext.value.trim()) {
        asymmetricResult.value = buildErrorResult("ASYM_EMPTY", "Falta texto plano", "Introduce un mensaje antes de cifrar con RSA-OAEP.");
        return;
    }
    if (!asymmetricPublicKeyPem.value.trim()) {
        asymmetricResult.value = buildErrorResult("ASYM_PUBLIC_EMPTY", "Falta la clave publica", "Genera el par RSA del servidor antes de cifrar desde el cliente.");
        return;
    }

    try {
        const bytes = new TextEncoder().encode(asymmetricPlaintext.value);
        const maxBytes = getDirectRsaLimit();
        if (bytes.byteLength > maxBytes) {
            throw new Error(`El mensaje ocupa ${bytes.byteLength} bytes y RSA-OAEP ${asymmetricKeySize.value}/${asymmetricHash.value} admite aproximadamente ${maxBytes}. Usa el cifrado hibrido.`);
        }

        const publicKey = await importAsymmetricPublicKey();
        const encrypted = await getSubtleCrypto().encrypt(
            getRsaAlgorithm(),
            publicKey,
            bytes
        );
        const cipherText = bytesToBase64(encrypted);
        asymmetricCiphertext.value = cipherText;
        clearAsymmetricExchangePreview();

        buildAsymmetricResult({
            primaryValue: cipherText,
            primaryTarget: "ciphertext",
            verdictTone: "verdict-success",
            verdictTitle: "Mensaje cifrado con RSA-OAEP",
            verdictBody: "La clave publica genero un bloque cifrado en Base64 que solo deberia poder abrir la clave privada correspondiente.",
            summaryCards: [
                { label: "Operacion", value: "Encrypt", tone: "tone-success", note: "Clave publica" },
                { label: "Algoritmo", value: "RSA-OAEP", tone: "tone-success", note: asymmetricHash.value },
                { label: "Entrada", value: `${bytes.byteLength} bytes`, tone: "tone-neutral", note: "Texto UTF-8" },
                { label: "Salida", value: `${cipherText.length} chars`, tone: "tone-neutral", note: "Base64" }
            ],
            signalCards: [
                { label: "Limite directo", value: `${maxBytes} bytes`, tone: bytes.byteLength <= maxBytes ? "tone-success" : "tone-warning", note: "Depende de clave/hash" },
                { label: "Confidencialidad", value: "Si", tone: "tone-success", note: "Si la privada no se filtra" },
                { label: "Autenticidad", value: "No", tone: "tone-warning", note: "Cifrar no firma" },
                { label: "Mensajes grandes", value: "Hibrido", tone: "tone-warning", note: "RSA solo no escala" }
            ],
            panels: [
                {
                    title: "Ciphertext RSA-OAEP",
                    badge: "base64",
                    content: cipherText,
                    copyValue: cipherText
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", [
                        "Se uso la clave publica PEM para cifrar.",
                        "El resultado es un bloque RSA; no incluye firma ni identidad del emisor.",
                        "Si el mensaje crece, usa el modo hibrido del modulo."
                    ]),
                    copyValue: "RSA-OAEP directo: publica cifra, privada descifra, sin firma."
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("ASYM_ENCRYPT_FAILED", "No se pudo cifrar con RSA-OAEP", error.message);
    }
}

async function runAsymmetricDecrypt() {
    if (!asymmetricCiphertext.value.trim()) {
        asymmetricResult.value = buildErrorResult("ASYM_CIPHER_EMPTY", "Falta el cifrado", "Pega una salida Base64 de RSA-OAEP antes de descifrar.");
        return;
    }
    if (!asymmetricPrivateKeyPem.value.trim()) {
        asymmetricResult.value = buildErrorResult("ASYM_PRIVATE_EMPTY", "Falta la clave privada", "Genera o pega la clave privada del servidor antes de descifrar.");
        return;
    }

    try {
        const privateKey = await importAsymmetricPrivateKey();
        const cipherBytes = base64ToBytes(asymmetricCiphertext.value);
        const decrypted = await getSubtleCrypto().decrypt(
            getRsaAlgorithm(),
            privateKey,
            cipherBytes
        );
        const plaintext = new TextDecoder().decode(decrypted);
        asymmetricPlaintext.value = plaintext;
        asymmetricServerOutput.value = plaintext;

        buildAsymmetricResult({
            primaryValue: plaintext,
            primaryTarget: "plaintext",
            verdictTone: "verdict-success",
            verdictTitle: "Mensaje descifrado",
            verdictBody: "La clave privada corresponde al bloque RSA-OAEP y ha recuperado el texto plano.",
            summaryCards: [
                { label: "Operacion", value: "Decrypt", tone: "tone-success", note: "Clave privada" },
                { label: "Algoritmo", value: "RSA-OAEP", tone: "tone-success", note: asymmetricHash.value },
                { label: "Entrada", value: `${cipherBytes.byteLength} bytes`, tone: "tone-neutral", note: "Ciphertext" },
                { label: "Salida", value: `${plaintext.length} chars`, tone: "tone-neutral", note: "Texto plano" }
            ],
            signalCards: [
                { label: "Clave privada", value: "Necesaria", tone: "tone-warning", note: "Sin ella no hay descifrado" },
                { label: "Hash OAEP", value: asymmetricHash.value, tone: "tone-success", note: "Debe coincidir" },
                { label: "Formato", value: "Base64", tone: "tone-neutral", note: "Bloque RSA" },
                { label: "Integridad", value: "OAEP", tone: "tone-success", note: "Falla si se manipula" }
            ],
            panels: [
                {
                    title: "Texto descifrado",
                    badge: "plaintext",
                    content: plaintext,
                    copyValue: plaintext
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("ASYM_DECRYPT_FAILED", "No se pudo descifrar con RSA-OAEP", error.message);
    }
}

async function runHybridEncrypt() {
    if (!asymmetricPlaintext.value.trim()) {
        asymmetricResult.value = buildErrorResult("HYBRID_MESSAGE_EMPTY", "Falta el mensaje", "Introduce un mensaje del cliente antes de generar el sobre hibrido.");
        return;
    }
    if (!asymmetricPublicKeyPem.value.trim()) {
        asymmetricResult.value = buildErrorResult("HYBRID_PUBLIC_EMPTY", "Falta la clave publica", "Genera el par RSA del servidor para que el cliente pueda proteger la clave AES.");
        return;
    }

    try {
        const payload = getAsymmetricMessagePayload();
        const subtle = getSubtleCrypto();
        const publicKey = await importAsymmetricPublicKey();
        const iv = new Uint8Array(12);
        globalThis.crypto.getRandomValues(iv);
        const { key: aesKey, rawBytes: rawAesKey } = await getClientAesKey(subtle);
        const encryptedContent = await subtle.encrypt(
            { name: "AES-GCM", iv, tagLength: 128 },
            aesKey,
            payload.bytes
        );
        const wrappedKey = await subtle.encrypt(
            getRsaAlgorithm(),
            publicKey,
            rawAesKey
        );
        const wrappedKeyBase64 = bytesToBase64(wrappedKey);
        const ivBase64 = bytesToBase64(iv);
        asymmetricClientAesKey.value = bytesToBase64(rawAesKey);
        asymmetricWrappedKeyPreview.value = wrappedKeyBase64;
        asymmetricIvPreview.value = ivBase64;
        const envelope = {
            version: "feanor-hybrid-v1",
            mode: "RSA-OAEP+A256GCM",
            rsa: {
                hash: asymmetricHash.value,
                keySize: Number(asymmetricKeySize.value)
            },
            aes: {
                name: "AES-GCM",
                iv: ivBase64,
                tagLength: 128
            },
            message: {
                type: "text/plain; charset=utf-8",
                size: payload.size,
                encoding: "utf-8"
            },
            wrappedKey: wrappedKeyBase64,
            ciphertext: bytesToBase64(encryptedContent)
        };
        const envelopeText = safeJson(envelope);
        asymmetricCiphertext.value = envelopeText;

        buildAsymmetricResult({
            primaryValue: envelopeText,
            primaryTarget: "ciphertext",
            verdictTone: "verdict-success",
            verdictTitle: "Sobre hibrido generado",
            verdictBody: "El contenido se cifro con AES-GCM y la clave AES quedo protegida mediante RSA-OAEP.",
            summaryCards: [
                { label: "Operacion", value: "Hybrid encrypt", tone: "tone-success", note: "RSA + AES" },
                { label: "Contenido", value: "AES-GCM", tone: "tone-success", note: "256 bits" },
                { label: "Clave AES", value: "Envuelta", tone: "tone-success", note: "RSA-OAEP" },
                { label: "Mensaje", value: `${payload.size} bytes`, tone: "tone-neutral", note: "Texto UTF-8" }
            ],
            signalCards: [
                { label: "Patron", value: "Realista", tone: "tone-success", note: "Uso habitual de RSA" },
                { label: "IV", value: "12 bytes", tone: "tone-success", note: "Aleatorio" },
                { label: "Tag", value: "128 bits", tone: "tone-success", note: "Autenticacion GCM" },
                { label: "Mensaje largo", value: "Soportado", tone: "tone-success", note: "AES cifra el contenido" }
            ],
            panels: [
                {
                    title: "Sobre hibrido",
                    badge: "json",
                    content: envelopeText,
                    copyValue: envelopeText
                },
                {
                    title: "Clave enviada por el cliente",
                    badge: "wrappedKey",
                    content: buildTextList("Material de intercambio", [
                        `Clave AES visible en laboratorio: ${asymmetricClientAesKey.value}`,
                        `Clave AES cifrada enviada: ${wrappedKeyBase64}`,
                        `IV AES-GCM enviado: ${ivBase64}`
                    ]),
                    copyValue: wrappedKeyBase64
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", [
                        "RSA-OAEP no cifra el mensaje: protege la clave AES.",
                        "AES-GCM cifra el contenido y detecta manipulaciones mediante tag.",
                        "Este patron es la base conceptual de muchos esquemas de intercambio seguro."
                    ]),
                    copyValue: "Hibrido: RSA-OAEP envuelve clave AES; AES-GCM cifra contenido."
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("HYBRID_ENCRYPT_FAILED", "No se pudo cifrar en modo hibrido", error.message);
    }
}

async function runHybridDecrypt() {
    if (!asymmetricCiphertext.value.trim()) {
        asymmetricResult.value = buildErrorResult("HYBRID_EMPTY", "Falta el sobre hibrido", "Pega el JSON hibrido antes de descifrar.");
        return;
    }
    if (!asymmetricPrivateKeyPem.value.trim()) {
        asymmetricResult.value = buildErrorResult("HYBRID_PRIVATE_EMPTY", "Falta la clave privada", "Genera o pega la clave privada del servidor para abrir wrappedKey.");
        return;
    }

    try {
        const envelope = JSON.parse(asymmetricCiphertext.value);
        if (envelope.version !== "feanor-hybrid-v1" || envelope.mode !== "RSA-OAEP+A256GCM") {
            throw new Error("El JSON no parece un sobre hibrido generado por este modulo.");
        }

        const subtle = getSubtleCrypto();
        const hash = envelope.rsa?.hash || asymmetricHash.value;
        const privateKey = await importAsymmetricPrivateKey(hash);
        const rawAesKey = await subtle.decrypt(
            getRsaAlgorithm(hash),
            privateKey,
            base64ToBytes(envelope.wrappedKey)
        );
        const aesKey = await subtle.importKey(
            "raw",
            rawAesKey,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );
        const decrypted = await subtle.decrypt(
            {
                name: "AES-GCM",
                iv: base64ToBytes(envelope.aes.iv),
                tagLength: envelope.aes.tagLength || 128
            },
            aesKey,
            base64ToBytes(envelope.ciphertext)
        );
        const decryptedBytes = new Uint8Array(decrypted);
        const plaintext = new TextDecoder().decode(decryptedBytes);
        asymmetricClientAesKey.value = bytesToBase64(rawAesKey);
        asymmetricWrappedKeyPreview.value = envelope.wrappedKey;
        asymmetricIvPreview.value = envelope.aes.iv;
        asymmetricPlaintext.value = plaintext;
        asymmetricServerOutput.value = plaintext;

        buildAsymmetricResult({
            primaryValue: asymmetricServerOutput.value,
            primaryTarget: "plaintext",
            verdictTone: "verdict-success",
            verdictTitle: "Sobre hibrido descifrado",
            verdictBody: "La clave privada recupero la clave AES y AES-GCM valido y descifro el contenido.",
            summaryCards: [
                { label: "Operacion", value: "Hybrid decrypt", tone: "tone-success", note: "RSA + AES" },
                { label: "RSA", value: hash, tone: "tone-success", note: "OAEP" },
                { label: "AES", value: "GCM", tone: "tone-success", note: "Tag validado" },
                { label: "Mensaje", value: `${decryptedBytes.byteLength} bytes`, tone: "tone-neutral", note: envelope.message?.encoding || "utf-8" }
            ],
            signalCards: [
                { label: "Clave privada", value: "Valida", tone: "tone-success", note: "Desenvolvio AES" },
                { label: "Integridad", value: "OK", tone: "tone-success", note: "GCM no fallo" },
                { label: "IV", value: `${base64ToBytes(envelope.aes.iv).byteLength} bytes`, tone: "tone-neutral", note: "Desde JSON" },
                { label: "Formato", value: envelope.version, tone: "tone-neutral", note: "Sobre local" }
            ],
            panels: [
                {
                    title: "Mensaje descifrado",
                    badge: "plaintext",
                    content: asymmetricServerOutput.value,
                    copyValue: asymmetricServerOutput.value
                },
                {
                    title: "Clave recuperada por el servidor",
                    badge: "aes",
                    content: buildTextList("Intercambio", [
                        `wrappedKey recibido: ${envelope.wrappedKey}`,
                        `clave AES recuperada: ${asymmetricClientAesKey.value}`,
                        `IV usado: ${envelope.aes.iv}`
                    ]),
                    copyValue: asymmetricClientAesKey.value
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("HYBRID_DECRYPT_FAILED", "No se pudo descifrar el sobre hibrido", error.message);
    }
}

function mutateBase64Char(value) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const chars = String(value || "").split("");
    const index = chars.findIndex(char => alphabet.includes(char));
    if (index === -1) {
        throw new Error("No hay caracteres Base64 mutables en el ciphertext.");
    }
    chars[index] = chars[index] === "A" ? "B" : "A";
    return chars.join("");
}

function tamperHybridEnvelope() {
    if (!asymmetricCiphertext.value.trim()) {
        asymmetricResult.value = buildErrorResult("HYBRID_TAMPER_EMPTY", "No hay paquete hibrido", "Cifra primero un mensaje en modo hibrido para poder alterar el paquete.");
        return;
    }

    try {
        const envelope = JSON.parse(asymmetricCiphertext.value);
        if (envelope.version !== "feanor-hybrid-v1" || envelope.mode !== "RSA-OAEP+A256GCM") {
            throw new Error("Solo se puede alterar un sobre hibrido generado por este modulo.");
        }
        if (!envelope.ciphertext) {
            throw new Error("El sobre no contiene ciphertext.");
        }

        envelope.ciphertext = mutateBase64Char(envelope.ciphertext);
        const altered = safeJson(envelope);
        asymmetricCiphertext.value = altered;
        asymmetricWrappedKeyPreview.value = envelope.wrappedKey || "";
        asymmetricIvPreview.value = envelope.aes?.iv || "";

        buildAsymmetricResult({
            primaryValue: altered,
            primaryTarget: "ciphertext",
            verdictTone: "verdict-warning",
            verdictTitle: "Paquete hibrido alterado",
            verdictBody: "Se modifico el ciphertext. Al intentar descifrar, AES-GCM deberia fallar porque el tag de autenticacion ya no coincide.",
            summaryCards: [
                { label: "Operacion", value: "Tamper", tone: "tone-warning", note: "Ciphertext alterado" },
                { label: "AES-GCM", value: "Autenticado", tone: "tone-success", note: "Detecta manipulacion" },
                { label: "wrappedKey", value: envelope.wrappedKey ? "Intacto" : "Ausente", tone: envelope.wrappedKey ? "tone-neutral" : "tone-danger", note: "Clave AES cifrada" },
                { label: "Siguiente paso", value: "Descifrar", tone: "tone-warning", note: "Debe fallar" }
            ],
            signalCards: [
                { label: "Integridad", value: "Rota", tone: "tone-danger", note: "Ciphertext modificado" },
                { label: "Confidencialidad", value: "Sin abrir", tone: "tone-success", note: "No se revela plaintext" },
                { label: "Leccion", value: "AEAD", tone: "tone-success", note: "GCM autentica datos" },
                { label: "Paquete", value: "JSON", tone: "tone-neutral", note: "Sobre actualizado" }
            ],
            panels: [
                {
                    title: "Sobre alterado",
                    badge: "json",
                    content: altered,
                    copyValue: altered
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Que observar", [
                        "El ciphertext ya no coincide con el tag generado por AES-GCM.",
                        "Descifrar este paquete debe devolver un error de autenticacion.",
                        "Esta prueba muestra por que el modo hibrido debe usar un cifrado autenticado."
                    ]),
                    copyValue: "AES-GCM detecta manipulacion de ciphertext mediante el tag."
                }
            ]
        });
    } catch (error) {
        asymmetricResult.value = buildErrorResult("HYBRID_TAMPER_FAILED", "No se pudo alterar el paquete", error.message);
    }
}

function applyAsymmetricPrimaryValue() {
    if (!asymmetricResult.value?.primaryValue) return;
    if (asymmetricResult.value.primaryTarget === "ciphertext") {
        asymmetricCiphertext.value = asymmetricResult.value.primaryValue;
    } else if (asymmetricResult.value.primaryTarget === "plaintext") {
        asymmetricPlaintext.value = asymmetricResult.value.primaryValue;
    } else if (asymmetricResult.value.primaryTarget === "publicKey") {
        asymmetricPublicKeyPem.value = asymmetricResult.value.primaryValue;
    }
}

function getSignatureKeyAlgorithm() {
    if (signatureAlgorithm.value === "ECDSA-P256") {
        return {
            generate: { name: "ECDSA", namedCurve: "P-256" },
            import: { name: "ECDSA", namedCurve: "P-256" },
            sign: { name: "ECDSA", hash: "SHA-256" },
            usages: ["sign", "verify"],
            label: "ECDSA P-256 SHA-256"
        };
    }

    return {
        generate: {
            name: "RSA-PSS",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        import: { name: "RSA-PSS", hash: "SHA-256" },
        sign: { name: "RSA-PSS", saltLength: Math.max(0, Number(signatureSaltLength.value) || 32) },
        usages: ["sign", "verify"],
        label: "RSA-PSS SHA-256"
    };
}

async function importSignaturePrivateKey() {
    const subtle = getSubtleCrypto();
    const algorithm = getSignatureKeyAlgorithm();
    return subtle.importKey(
        "pkcs8",
        pemToArrayBuffer(signaturePrivateKeyPem.value, "PRIVATE KEY"),
        algorithm.import,
        true,
        ["sign"]
    );
}

async function importSignaturePublicKey() {
    const subtle = getSubtleCrypto();
    const algorithm = getSignatureKeyAlgorithm();
    return subtle.importKey(
        "spki",
        pemToArrayBuffer(signaturePublicKeyPem.value, "PUBLIC KEY"),
        algorithm.import,
        true,
        ["verify"]
    );
}

async function generateSignatureKeyPair() {
    try {
        const subtle = getSubtleCrypto();
        const algorithm = getSignatureKeyAlgorithm();
        const keyPair = await subtle.generateKey(algorithm.generate, true, algorithm.usages);
        signaturePublicKeyPem.value = arrayBufferToPem(await subtle.exportKey("spki", keyPair.publicKey), "PUBLIC KEY");
        signaturePrivateKeyPem.value = arrayBufferToPem(await subtle.exportKey("pkcs8", keyPair.privateKey), "PRIVATE KEY");

        signatureResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Par de claves generado",
            verdictBody: "La clave privada firma y la clave publica verifica. Ninguna operacion cifra el mensaje.",
            summaryCards: [
                { label: "Algoritmo", value: algorithm.label, tone: "tone-success", note: "WebCrypto" },
                { label: "Publica", value: "SPKI", tone: "tone-neutral", note: `${signaturePublicKeyPem.value.length} chars PEM` },
                { label: "Privada", value: "PKCS8", tone: "tone-warning", note: "No debe compartirse" },
                { label: "Hash", value: "SHA-256", tone: "tone-success", note: signatureAlgorithm.value === "RSA-PSS" ? `salt ${signatureSaltLength.value}` : "curva P-256" }
            ],
            signalCards: [
                { label: "Uso publica", value: "Verify", tone: "tone-success", note: "Validar firma" },
                { label: "Uso privada", value: "Sign", tone: "tone-warning", note: "Custodia local" },
                { label: "Confidencialidad", value: "No", tone: "tone-neutral", note: "Firmar no cifra" },
                { label: "Integridad", value: "Si", tone: "tone-success", note: "Firma del mensaje" }
            ],
            panels: [
                { title: "Clave publica", badge: "spki", content: signaturePublicKeyPem.value, copyValue: signaturePublicKeyPem.value },
                { title: "Clave privada", badge: "pkcs8", content: signaturePrivateKeyPem.value, copyValue: signaturePrivateKeyPem.value }
            ]
        };
    } catch (error) {
        signatureResult.value = buildErrorResult("SIGN_KEYGEN_FAILED", "No se pudieron generar claves", error.message);
    }
}

async function signMessage() {
    if (!signatureMessage.value.trim()) {
        signatureResult.value = buildErrorResult("SIGN_MESSAGE_EMPTY", "Falta el mensaje", "Introduce el mensaje exacto que quieres firmar.");
        return;
    }
    if (!signaturePrivateKeyPem.value.trim()) {
        signatureResult.value = buildErrorResult("SIGN_PRIVATE_EMPTY", "Falta la clave privada", "Genera o pega una clave privada PKCS8 antes de firmar.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const algorithm = getSignatureKeyAlgorithm();
        const privateKey = await importSignaturePrivateKey();
        const signature = await subtle.sign(algorithm.sign, privateKey, textToBytes(signatureMessage.value));
        signatureValue.value = bytesToBase64(signature);

        signatureResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Mensaje firmado",
            verdictBody: "La firma depende del mensaje, la clave privada, el algoritmo y el hash configurado.",
            summaryCards: [
                { label: "Algoritmo", value: algorithm.label, tone: "tone-success", note: "Firma digital" },
                { label: "Mensaje", value: `${textToBytes(signatureMessage.value).byteLength} bytes`, tone: "tone-neutral", note: "UTF-8" },
                { label: "Firma", value: `${base64ToBytes(signatureValue.value).byteLength} bytes`, tone: "tone-success", note: "Base64" },
                { label: "Clave", value: "Privada", tone: "tone-warning", note: "Material sensible" }
            ],
            signalCards: [
                { label: "Integridad", value: "Firmada", tone: "tone-success", note: "Cambiar el mensaje invalida la firma" },
                { label: "Autenticidad", value: "Verificable", tone: "tone-success", note: "Con la clave publica" },
                { label: "No repudio", value: "Conceptual", tone: "tone-neutral", note: "Depende de custodia y PKI" },
                { label: "Cifrado", value: "No aplica", tone: "tone-neutral", note: "El texto no se oculta" }
            ],
            panels: [
                { title: "Firma Base64", badge: "signature", content: signatureValue.value, copyValue: signatureValue.value },
                { title: "Mensaje firmado", badge: "payload", content: signatureMessage.value, copyValue: signatureMessage.value }
            ]
        };
    } catch (error) {
        signatureResult.value = buildErrorResult("SIGN_FAILED", "No se pudo firmar", error.message);
    }
}

async function verifySignature() {
    if (!signatureMessage.value.trim()) {
        signatureResult.value = buildErrorResult("VERIFY_MESSAGE_EMPTY", "Falta el mensaje", "Introduce el mismo mensaje que fue firmado.");
        return;
    }
    if (!signaturePublicKeyPem.value.trim()) {
        signatureResult.value = buildErrorResult("VERIFY_PUBLIC_EMPTY", "Falta la clave publica", "Pega la clave publica que corresponde a la clave privada firmante.");
        return;
    }
    if (!signatureValue.value.trim()) {
        signatureResult.value = buildErrorResult("VERIFY_SIGNATURE_EMPTY", "Falta la firma", "Firma primero un mensaje o pega una firma Base64.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const algorithm = getSignatureKeyAlgorithm();
        const publicKey = await importSignaturePublicKey();
        const valid = await subtle.verify(
            algorithm.sign,
            publicKey,
            base64ToBytes(signatureValue.value),
            textToBytes(signatureMessage.value)
        );

        signatureResult.value = {
            verdictTone: valid ? "verdict-success" : "verdict-danger",
            verdictTitle: valid ? "Firma valida" : "Firma invalida",
            verdictBody: valid
                ? "La clave publica verifica que la firma corresponde exactamente a este mensaje."
                : "La firma no corresponde al mensaje, algoritmo o clave publica actuales.",
            summaryCards: [
                { label: "Resultado", value: valid ? "Valida" : "Invalida", tone: valid ? "tone-success" : "tone-danger", note: "Verificacion criptografica" },
                { label: "Algoritmo", value: algorithm.label, tone: "tone-neutral", note: "Configuracion activa" },
                { label: "Mensaje", value: `${textToBytes(signatureMessage.value).byteLength} bytes`, tone: "tone-neutral", note: "Entrada verificada" },
                { label: "Firma", value: `${base64ToBytes(signatureValue.value).byteLength} bytes`, tone: "tone-neutral", note: "Base64 decodificado" }
            ],
            signalCards: [
                { label: "Clave publica", value: "Importada", tone: "tone-success", note: "SPKI" },
                { label: "Integridad", value: valid ? "OK" : "Rota", tone: valid ? "tone-success" : "tone-danger", note: "Mensaje byte a byte" },
                { label: "Confianza", value: valid ? "Local" : "No valida", tone: valid ? "tone-success" : "tone-danger", note: "No valida identidad PKI" },
                { label: "Salida", value: valid ? "Aceptar" : "Rechazar", tone: valid ? "tone-success" : "tone-danger", note: "Decision de verificacion" }
            ],
            panels: [
                { title: "Firma evaluada", badge: "base64", content: signatureValue.value, copyValue: signatureValue.value },
                { title: "Lectura tecnica", badge: "verify", content: valid ? "La firma verifica con la clave publica actual." : "La firma no verifica. Cambia mensaje, firma, clave o algoritmo.", copyValue: valid ? "Firma valida" : "Firma invalida" }
            ]
        };
    } catch (error) {
        signatureResult.value = buildErrorResult("VERIFY_FAILED", "No se pudo verificar", error.message);
    }
}

async function fillSignatureExample() {
    signatureAlgorithm.value = "RSA-PSS";
    signatureSaltLength.value = 32;
    signatureMessage.value = "Orden firmada: permitir despliegue del bastion norte.";
    await generateSignatureKeyPair();
    await signMessage();
}

async function generateAeadMaterial() {
    try {
        const keyBytes = new Uint8Array(Number(aeadKeySize.value) / 8);
        const ivBytes = new Uint8Array(12);
        globalThis.crypto.getRandomValues(keyBytes);
        globalThis.crypto.getRandomValues(ivBytes);
        aeadKey.value = bytesToBase64(keyBytes);
        aeadIv.value = bytesToBase64(ivBytes);
        aeadResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Material AEAD generado",
            verdictBody: "AES-GCM necesita una clave simetrica y un IV unico por cifrado con la misma clave.",
            summaryCards: [
                { label: "Clave", value: `${aeadKeySize.value} bits`, tone: "tone-success", note: "AES-GCM" },
                { label: "IV", value: "12 bytes", tone: "tone-success", note: "Recomendado GCM" },
                { label: "Tag", value: `${aeadTagLength.value} bits`, tone: "tone-success", note: "Autenticacion" },
                { label: "AAD", value: aeadAad.value ? "Definido" : "Vacio", tone: aeadAad.value ? "tone-success" : "tone-neutral", note: "No se cifra" }
            ],
            signalCards: [
                { label: "IV reutilizado", value: "No", tone: "tone-success", note: "Nuevo material" },
                { label: "Clave visible", value: "Si", tone: "tone-warning", note: "Laboratorio didactico" },
                { label: "Cifrado", value: "Pendiente", tone: "tone-neutral", note: "Pulsa Cifrar" },
                { label: "Integridad", value: "Pendiente", tone: "tone-neutral", note: "Se genera con el tag" }
            ],
            panels: [
                { title: "Clave AES", badge: "base64", content: aeadKey.value, copyValue: aeadKey.value },
                { title: "IV", badge: "base64", content: aeadIv.value, copyValue: aeadIv.value }
            ]
        };
    } catch (error) {
        aeadResult.value = buildErrorResult("AEAD_MATERIAL_FAILED", "No se pudo generar material", error.message);
    }
}

async function importAeadKey() {
    assertAesKeyLength(base64ToBytes(aeadKey.value));
    return getSubtleCrypto().importKey("raw", base64ToBytes(aeadKey.value), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

function getAeadParams(iv) {
    const params = {
        name: "AES-GCM",
        iv,
        tagLength: Number(aeadTagLength.value) || 128
    };
    if (aeadAad.value) {
        params.additionalData = textToBytes(aeadAad.value);
    }
    return params;
}

async function encryptAead() {
    if (!aeadPlaintext.value.trim()) {
        aeadResult.value = buildErrorResult("AEAD_TEXT_EMPTY", "Falta texto plano", "Introduce contenido antes de cifrar con AES-GCM.");
        return;
    }
    if (!aeadKey.value.trim() || !aeadIv.value.trim()) {
        aeadResult.value = buildErrorResult("AEAD_MATERIAL_EMPTY", "Falta clave o IV", "Genera clave e IV antes de cifrar.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const key = await importAeadKey();
        const iv = base64ToBytes(aeadIv.value);
        const ciphertext = await subtle.encrypt(getAeadParams(iv), key, textToBytes(aeadPlaintext.value));
        aeadCiphertext.value = bytesToBase64(ciphertext);
        aeadResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "AES-GCM cifrado",
            verdictBody: "La salida incluye ciphertext y tag de autenticacion. El AAD queda autenticado aunque no cifrado.",
            summaryCards: [
                { label: "Plaintext", value: `${textToBytes(aeadPlaintext.value).byteLength} bytes`, tone: "tone-neutral", note: "UTF-8" },
                { label: "Ciphertext", value: `${new Uint8Array(ciphertext).byteLength} bytes`, tone: "tone-success", note: "Incluye tag" },
                { label: "IV", value: `${iv.byteLength} bytes`, tone: iv.byteLength === 12 ? "tone-success" : "tone-warning", note: "Nonce GCM" },
                { label: "AAD", value: aeadAad.value ? "Si" : "No", tone: aeadAad.value ? "tone-success" : "tone-neutral", note: "Autenticado" }
            ],
            signalCards: [
                { label: "Confidencialidad", value: "Si", tone: "tone-success", note: "AES cifra contenido" },
                { label: "Integridad", value: "Si", tone: "tone-success", note: "Tag GCM" },
                { label: "Reutilizar IV", value: "Nunca", tone: "tone-danger", note: "Con la misma clave" },
                { label: "Decodificacion", value: "Base64", tone: "tone-neutral", note: "Transporte textual" }
            ],
            panels: [
                { title: "Ciphertext + tag", badge: "base64", content: aeadCiphertext.value, copyValue: aeadCiphertext.value },
                { title: "Parametros", badge: "json", content: safeJson({ algorithm: "AES-GCM", keyBits: aeadKeySize.value, iv: aeadIv.value, tagLength: aeadTagLength.value, aad: aeadAad.value }), copyValue: safeJson({ algorithm: "AES-GCM", keyBits: aeadKeySize.value, iv: aeadIv.value, tagLength: aeadTagLength.value, aad: aeadAad.value }) }
            ]
        };
    } catch (error) {
        aeadResult.value = buildErrorResult("AEAD_ENCRYPT_FAILED", "No se pudo cifrar", error.message);
    }
}

async function decryptAead() {
    if (!aeadCiphertext.value.trim()) {
        aeadResult.value = buildErrorResult("AEAD_CIPHERTEXT_EMPTY", "Falta ciphertext", "Cifra primero o pega una salida AES-GCM en Base64.");
        return;
    }
    if (!aeadKey.value.trim() || !aeadIv.value.trim()) {
        aeadResult.value = buildErrorResult("AEAD_MATERIAL_EMPTY", "Falta clave o IV", "La misma clave e IV usados al cifrar son necesarios para descifrar.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const key = await importAeadKey();
        const decrypted = await subtle.decrypt(getAeadParams(base64ToBytes(aeadIv.value)), key, base64ToBytes(aeadCiphertext.value));
        const plaintext = bytesToUtf8(new Uint8Array(decrypted));
        aeadPlaintext.value = plaintext;
        aeadResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "AES-GCM descifrado",
            verdictBody: "El tag ha sido validado. Si el ciphertext, AAD, IV o clave hubieran cambiado, WebCrypto habria rechazado la operacion.",
            summaryCards: [
                { label: "Resultado", value: "Valido", tone: "tone-success", note: "Tag verificado" },
                { label: "Plaintext", value: `${new Uint8Array(decrypted).byteLength} bytes`, tone: "tone-neutral", note: "UTF-8" },
                { label: "AAD", value: aeadAad.value ? "Coincide" : "Vacio", tone: "tone-success", note: "Datos autenticados" },
                { label: "Tag", value: `${aeadTagLength.value} bits`, tone: "tone-success", note: "Autenticacion" }
            ],
            signalCards: [
                { label: "Integridad", value: "OK", tone: "tone-success", note: "GCM acepto tag" },
                { label: "Confidencialidad", value: "Recuperada", tone: "tone-success", note: "Texto plano visible" },
                { label: "Errores", value: "No", tone: "tone-success", note: "Parametros coherentes" },
                { label: "Salida", value: "Texto", tone: "tone-neutral", note: "Decodificado UTF-8" }
            ],
            panels: [
                { title: "Texto descifrado", badge: "plain", content: plaintext, copyValue: plaintext },
                { title: "Ciphertext evaluado", badge: "base64", content: aeadCiphertext.value, copyValue: aeadCiphertext.value }
            ]
        };
    } catch (error) {
        aeadResult.value = buildErrorResult("AEAD_DECRYPT_FAILED", "No se pudo descifrar", `${error.message || "Fallo criptografico"}. En AES-GCM esto suele significar clave, IV, AAD o tag incorrectos.`);
    }
}

function tamperAeadCiphertext() {
    if (!aeadCiphertext.value.trim()) {
        aeadResult.value = buildErrorResult("AEAD_TAMPER_EMPTY", "No hay ciphertext", "Cifra primero para poder alterar la salida.");
        return;
    }
    try {
        aeadCiphertext.value = mutateBase64Char(aeadCiphertext.value);
        aeadResult.value = {
            verdictTone: "verdict-warning",
            verdictTitle: "Ciphertext alterado",
            verdictBody: "El siguiente descifrado deberia fallar porque AES-GCM autentica ciphertext y tag.",
            summaryCards: [
                { label: "Operacion", value: "Tamper", tone: "tone-warning", note: "Un byte logico alterado" },
                { label: "Integridad", value: "Rota", tone: "tone-danger", note: "Tag ya no coincide" },
                { label: "Cifrado", value: "Intacto", tone: "tone-neutral", note: "No revela plaintext" },
                { label: "Prueba", value: "Descifrar", tone: "tone-warning", note: "Debe fallar" }
            ],
            signalCards: [
                { label: "AAD", value: aeadAad.value ? "No alterado" : "Vacio", tone: "tone-neutral", note: "Parametro actual" },
                { label: "IV", value: aeadIv.value ? "No alterado" : "Ausente", tone: aeadIv.value ? "tone-success" : "tone-danger", note: "Parametro actual" },
                { label: "Tag", value: "Invalido", tone: "tone-danger", note: "Tras mutacion" },
                { label: "Leccion", value: "AEAD", tone: "tone-success", note: "Cifrado autenticado" }
            ],
            panels: [
                { title: "Ciphertext alterado", badge: "base64", content: aeadCiphertext.value, copyValue: aeadCiphertext.value }
            ]
        };
    } catch (error) {
        aeadResult.value = buildErrorResult("AEAD_TAMPER_FAILED", "No se pudo alterar", error.message);
    }
}

async function fillAeadExample() {
    aeadKeySize.value = 256;
    aeadTagLength.value = 128;
    aeadAad.value = "method=POST;path=/api/tesoro";
    aeadPlaintext.value = "Transferencia autorizada: 7 fragmentos de mithril.";
    await generateAeadMaterial();
}

async function generateEcdhPairs() {
    try {
        const subtle = getSubtleCrypto();
        const algorithm = { name: "ECDH", namedCurve: ecdhCurve.value };
        ecdhClientKeyPair.value = await subtle.generateKey(algorithm, true, ["deriveBits"]);
        ecdhServerKeyPair.value = await subtle.generateKey(algorithm, true, ["deriveBits"]);
        ecdhClientPublicKeyPem.value = arrayBufferToPem(await subtle.exportKey("spki", ecdhClientKeyPair.value.publicKey), "PUBLIC KEY");
        ecdhServerPublicKeyPem.value = arrayBufferToPem(await subtle.exportKey("spki", ecdhServerKeyPair.value.publicKey), "PUBLIC KEY");
        ecdhResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Pares ECDH generados",
            verdictBody: "Cada parte mantiene su clave privada y comparte solo la clave publica.",
            summaryCards: [
                { label: "Curva", value: ecdhCurve.value, tone: "tone-success", note: "ECDH" },
                { label: "Cliente", value: "Par listo", tone: "tone-success", note: "Privada en memoria" },
                { label: "Servidor", value: "Par listo", tone: "tone-success", note: "Privada en memoria" },
                { label: "Secreto", value: "Pendiente", tone: "tone-neutral", note: "Derivar" }
            ],
            signalCards: [
                { label: "Publicas", value: "Exportadas", tone: "tone-success", note: "SPKI PEM" },
                { label: "Privadas", value: "No visibles", tone: "tone-success", note: "CryptoKey" },
                { label: "MITM", value: "No resuelto", tone: "tone-warning", note: "ECDH no autentica identidad" },
                { label: "Uso", value: "KDF", tone: "tone-neutral", note: "Derivar clave final" }
            ],
            panels: [
                { title: "Publica cliente", badge: "spki", content: ecdhClientPublicKeyPem.value, copyValue: ecdhClientPublicKeyPem.value },
                { title: "Publica servidor", badge: "spki", content: ecdhServerPublicKeyPem.value, copyValue: ecdhServerPublicKeyPem.value }
            ]
        };
    } catch (error) {
        ecdhResult.value = buildErrorResult("ECDH_KEYGEN_FAILED", "No se pudieron generar claves ECDH", error.message);
    }
}

async function deriveEcdhSharedSecret() {
    if (!ecdhClientKeyPair.value || !ecdhServerKeyPair.value) {
        ecdhResult.value = buildErrorResult("ECDH_KEYS_EMPTY", "Faltan claves ECDH", "Genera primero los pares de cliente y servidor.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const bits = Math.max(128, Number(ecdhDerivedBits.value) || 256);
        const clientSecret = new Uint8Array(await subtle.deriveBits({ name: "ECDH", public: ecdhServerKeyPair.value.publicKey }, ecdhClientKeyPair.value.privateKey, bits));
        const serverSecret = new Uint8Array(await subtle.deriveBits({ name: "ECDH", public: ecdhClientKeyPair.value.publicKey }, ecdhServerKeyPair.value.privateKey, bits));
        const clientHex = bytesToHex(clientSecret);
        const serverHex = bytesToHex(serverSecret);
        const matches = clientHex === serverHex;
        ecdhResult.value = {
            verdictTone: matches ? "verdict-success" : "verdict-danger",
            verdictTitle: matches ? "Secreto compartido coincidente" : "Secreto compartido distinto",
            verdictBody: matches
                ? "Cliente y servidor derivaron los mismos bits usando su privada y la publica remota."
                : "La derivacion no coincide. Revisa pares, curva y claves publicas.",
            summaryCards: [
                { label: "Curva", value: ecdhCurve.value, tone: "tone-success", note: "ECDH" },
                { label: "Bits", value: String(bits), tone: "tone-neutral", note: "deriveBits" },
                { label: "Cliente", value: `${clientSecret.byteLength} bytes`, tone: "tone-success", note: "Secreto local" },
                { label: "Coincide", value: matches ? "Si" : "No", tone: matches ? "tone-success" : "tone-danger", note: "Comparacion local" }
            ],
            signalCards: [
                { label: "Servidor", value: `${serverSecret.byteLength} bytes`, tone: "tone-success", note: "Secreto local" },
                { label: "Transporte", value: "Publicas", tone: "tone-success", note: "El secreto no viaja" },
                { label: "Autenticacion", value: "No incluida", tone: "tone-warning", note: "Firmas o certificados aparte" },
                { label: "Siguiente", value: "HKDF", tone: "tone-neutral", note: "Convertir en clave de uso" }
            ],
            panels: [
                { title: "Secreto cliente Hex", badge: "client", content: clientHex, copyValue: clientHex },
                { title: "Secreto servidor Hex", badge: "server", content: serverHex, copyValue: serverHex }
            ]
        };
    } catch (error) {
        ecdhResult.value = buildErrorResult("ECDH_DERIVE_FAILED", "No se pudo derivar el secreto", error.message);
    }
}

async function fillEcdhExample() {
    ecdhCurve.value = "P-256";
    ecdhDerivedBits.value = 256;
    await generateEcdhPairs();
    await deriveEcdhSharedSecret();
}

function generateKdfSalt() {
    const salt = new Uint8Array(16);
    globalThis.crypto.getRandomValues(salt);
    kdfSalt.value = bytesToBase64(salt);
}

async function deriveKdfMaterial() {
    if (!kdfInput.value.trim()) {
        kdfResult.value = buildErrorResult("KDF_INPUT_EMPTY", "Falta material de entrada", "Introduce una password, semilla o secreto base.");
        return;
    }
    if (!kdfSalt.value.trim()) {
        kdfResult.value = buildErrorResult("KDF_SALT_EMPTY", "Falta salt", "Genera o pega un salt Base64.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const lengthBits = Math.max(16, Number(kdfLength.value) || 32) * 8;
        const salt = base64ToBytes(kdfSalt.value);
        let derived;
        if (kdfMode.value === "PBKDF2") {
            if (Number(kdfIterations.value) < 1000) {
                throw new Error("PBKDF2 necesita al menos 1000 iteraciones.");
            }
            const baseKey = await subtle.importKey("raw", textToBytes(kdfInput.value), "PBKDF2", false, ["deriveBits"]);
            derived = new Uint8Array(await subtle.deriveBits({
                name: "PBKDF2",
                salt,
                iterations: Number(kdfIterations.value),
                hash: kdfHash.value
            }, baseKey, lengthBits));
        } else {
            const baseKey = await subtle.importKey("raw", textToBytes(kdfInput.value), "HKDF", false, ["deriveBits"]);
            derived = new Uint8Array(await subtle.deriveBits({
                name: "HKDF",
                salt,
                info: textToBytes(kdfInfo.value),
                hash: kdfHash.value
            }, baseKey, lengthBits));
        }

        const outputHex = bytesToHex(derived);
        const outputBase64 = bytesToBase64(derived);
        kdfResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Clave derivada",
            verdictBody: kdfMode.value === "PBKDF2"
                ? "PBKDF2 aplica hash iterado sobre material humano y salt para dificultar ataques offline."
                : "HKDF extrae y expande material de alta entropia para un uso concreto definido por info.",
            summaryCards: [
                { label: "Modo", value: kdfMode.value, tone: "tone-success", note: "WebCrypto" },
                { label: "Hash", value: kdfHash.value, tone: "tone-success", note: "PRF" },
                { label: "Salida", value: `${derived.byteLength} bytes`, tone: "tone-neutral", note: `${lengthBits} bits` },
                { label: "Salt", value: `${salt.byteLength} bytes`, tone: "tone-success", note: "Base64" }
            ],
            signalCards: [
                { label: "Iteraciones", value: kdfMode.value === "PBKDF2" ? Number(kdfIterations.value).toLocaleString("es-ES") : "No aplica", tone: kdfMode.value === "PBKDF2" ? toneFromBoolean(Number(kdfIterations.value) >= 100000) : "tone-neutral", note: "Coste PBKDF2" },
                { label: "Info", value: kdfMode.value === "HKDF" ? (kdfInfo.value || "Vacia") : "No aplica", tone: kdfMode.value === "HKDF" ? "tone-success" : "tone-neutral", note: "Contexto HKDF" },
                { label: "Hex", value: `${outputHex.length} chars`, tone: "tone-neutral", note: "Representacion" },
                { label: "Base64", value: `${outputBase64.length} chars`, tone: "tone-neutral", note: "Representacion" }
            ],
            panels: [
                { title: "Clave derivada Hex", badge: "hex", content: outputHex, copyValue: outputHex },
                { title: "Clave derivada Base64", badge: "base64", content: outputBase64, copyValue: outputBase64 }
            ]
        };
    } catch (error) {
        kdfResult.value = buildErrorResult("KDF_FAILED", "No se pudo derivar material", error.message);
    }
}

function fillKdfExample() {
    kdfMode.value = "PBKDF2";
    kdfHash.value = "SHA-256";
    kdfLength.value = 32;
    kdfIterations.value = 180000;
    kdfInput.value = "password de laboratorio con sal";
    kdfInfo.value = "feanor/aes-gcm/content";
    generateKdfSalt();
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

function getJwtHash(alg) {
    const size = String(alg || "").slice(-3);
    if (size === "384") return "SHA-384";
    if (size === "512") return "SHA-512";
    return "SHA-256";
}

function getJwksKey(header, jwksValue) {
    const parsed = JSON.parse(jwksValue);
    const keys = Array.isArray(parsed.keys) ? parsed.keys : [parsed];
    const candidates = keys.filter(key => key?.kty);
    if (!candidates.length) {
        throw new Error("El JWKS/JWK no contiene claves.");
    }
    if (header.kid) {
        const match = candidates.find(key => key.kid === header.kid);
        if (match) return match;
    }
    const algPrefix = String(header.alg || "").startsWith("PS") || String(header.alg || "").startsWith("RS") ? "RSA" : "";
    return candidates.find(key => !algPrefix || key.kty === algPrefix) || candidates[0];
}

function buildJwtValidationResult({ valid, header, payload, method, keyNote, signatureLength }) {
    const headerText = safeJson(header);
    const payloadText = safeJson(payload);
    return {
        payloadText,
        verdictTone: valid ? "verdict-success" : "verdict-danger",
        verdictTitle: valid ? "Firma JWT valida" : "Firma JWT invalida",
        verdictBody: valid
            ? "La firma coincide con la cabecera y el payload actuales."
            : "La firma no coincide con el material de verificacion aportado.",
        summaryCards: [
            { label: "Algoritmo", value: header.alg || "N/D", tone: "tone-neutral", note: method },
            { label: "Firma", value: valid ? "Valida" : "Invalida", tone: valid ? "tone-success" : "tone-danger", note: `${signatureLength} bytes` },
            { label: "kid", value: header.kid || "N/D", tone: header.kid ? "tone-success" : "tone-neutral", note: "Selector de clave" },
            { label: "typ", value: header.typ || "N/D", tone: "tone-neutral", note: "Cabecera" }
        ],
        signalCards: [
            { label: "issuer", value: payload.iss || "N/D", tone: payload.iss ? "tone-success" : "tone-neutral", note: "iss" },
            { label: "subject", value: payload.sub || "N/D", tone: payload.sub ? "tone-success" : "tone-neutral", note: "sub" },
            { label: "exp", value: summarizeClaim(Number(payload.exp)), tone: Number(payload.exp) * 1000 > Date.now() ? "tone-success" : "tone-warning", note: "Expiracion" },
            { label: "Clave", value: keyNote, tone: "tone-neutral", note: "Material usado" }
        ],
        panels: [
            { title: "Cabecera", badge: "header", content: headerText, copyValue: headerText },
            { title: "Payload", badge: "payload", content: payloadText, copyValue: payloadText }
        ]
    };
}

async function validateJwtWithJwks() {
    if (!jwtInput.value.trim()) {
        jwtResult.value = buildErrorResult("JWT_EMPTY", "Falta el token", "Pega un JWT firmado antes de validar.");
        return;
    }
    if (!jwtJwksInput.value.trim()) {
        jwtResult.value = buildErrorResult("JWKS_EMPTY", "Falta JWKS/JWK", "Pega una clave publica JWK o un JWKS con keys.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const token = splitJwt(jwtInput.value);
        const alg = token.header.alg;
        const hash = getJwtHash(alg);
        const jwk = getJwksKey(token.header, jwtJwksInput.value);
        let algorithm;
        let verifyParams;
        if (String(alg).startsWith("RS")) {
            algorithm = { name: "RSASSA-PKCS1-v1_5", hash };
            verifyParams = algorithm;
        } else if (String(alg).startsWith("PS")) {
            algorithm = { name: "RSA-PSS", hash };
            verifyParams = { name: "RSA-PSS", saltLength: asymmetricHashBytes[hash] || 32 };
        } else {
            throw new Error("Validacion JWKS soportada para RS256/384/512 y PS256/384/512.");
        }
        const key = await subtle.importKey("jwk", jwk, algorithm, false, ["verify"]);
        const valid = await subtle.verify(verifyParams, key, token.signatureBytes, textToBytes(token.signingInput));
        jwtResult.value = buildJwtValidationResult({
            valid,
            header: token.header,
            payload: token.payload,
            method: "JWKS",
            keyNote: jwk.kid || jwk.kty,
            signatureLength: token.signatureBytes.byteLength
        });
    } catch (error) {
        jwtResult.value = buildErrorResult("JWT_JWKS_FAILED", "No se pudo validar con JWKS", error.message);
    }
}

async function validateJwtWithHmac() {
    if (!jwtInput.value.trim()) {
        jwtResult.value = buildErrorResult("JWT_EMPTY", "Falta el token", "Pega un JWT firmado antes de validar.");
        return;
    }
    if (!jwtHmacSecret.value.trim()) {
        jwtResult.value = buildErrorResult("JWT_HMAC_SECRET_EMPTY", "Falta secreto HMAC", "Introduce la clave compartida para validar HS256/HS384/HS512.");
        return;
    }

    try {
        const subtle = getSubtleCrypto();
        const token = splitJwt(jwtInput.value);
        if (!String(token.header.alg || "").startsWith("HS")) {
            throw new Error("La validacion HMAC solo aplica a HS256, HS384 o HS512.");
        }
        const hash = getJwtHash(token.header.alg);
        const key = await subtle.importKey("raw", textToBytes(jwtHmacSecret.value), { name: "HMAC", hash }, false, ["verify"]);
        const valid = await subtle.verify("HMAC", key, token.signatureBytes, textToBytes(token.signingInput));
        jwtResult.value = buildJwtValidationResult({
            valid,
            header: token.header,
            payload: token.payload,
            method: "HMAC",
            keyNote: `${jwtHmacSecret.value.length} chars`,
            signatureLength: token.signatureBytes.byteLength
        });
    } catch (error) {
        jwtResult.value = buildErrorResult("JWT_HMAC_FAILED", "No se pudo validar con HMAC", error.message);
    }
}

function readAsn1Element(bytes, offset = 0) {
    if (offset >= bytes.length) throw new Error("ASN.1 incompleto.");
    const start = offset;
    const tag = bytes[offset];
    offset += 1;
    let length = bytes[offset];
    offset += 1;
    if (length & 0x80) {
        const octets = length & 0x7f;
        if (!octets || octets > 4) throw new Error("Longitud ASN.1 no soportada.");
        length = 0;
        for (let index = 0; index < octets; index += 1) {
            length = (length << 8) | bytes[offset + index];
        }
        offset += octets;
    }
    const valueStart = offset;
    const end = valueStart + length;
    if (end > bytes.length) throw new Error("Longitud ASN.1 fuera de rango.");
    const element = {
        tag,
        tagClass: tag & 0xc0,
        constructed: Boolean(tag & 0x20),
        tagNumber: tag & 0x1f,
        start,
        headerLength: valueStart - start,
        valueStart,
        valueEnd: end,
        end,
        value: bytes.slice(valueStart, end),
        children: []
    };
    if (element.constructed) {
        let cursor = valueStart;
        while (cursor < end) {
            const child = readAsn1Element(bytes, cursor);
            element.children.push(child.element);
            cursor = child.offset;
        }
    }
    return { element, offset: end };
}

function parseOid(bytes) {
    if (!bytes.length) return "";
    const values = [Math.floor(bytes[0] / 40), bytes[0] % 40];
    let current = 0;
    for (let index = 1; index < bytes.length; index += 1) {
        current = (current << 7) | (bytes[index] & 0x7f);
        if (!(bytes[index] & 0x80)) {
            values.push(current);
            current = 0;
        }
    }
    return values.join(".");
}

function oidName(oid) {
    const names = {
        "2.5.4.3": "CN",
        "2.5.4.6": "C",
        "2.5.4.7": "L",
        "2.5.4.8": "ST",
        "2.5.4.10": "O",
        "2.5.4.11": "OU",
        "1.2.840.113549.1.1.1": "rsaEncryption",
        "1.2.840.113549.1.1.11": "sha256WithRSAEncryption",
        "1.2.840.10045.2.1": "ecPublicKey",
        "1.2.840.10045.4.3.2": "ecdsaWithSHA256",
        "2.5.29.17": "subjectAltName"
    };
    return names[oid] || oid;
}

function decodeAsn1String(element) {
    if ([0x0c, 0x13, 0x16, 0x14, 0x12].includes(element.tag)) {
        return new TextDecoder("utf-8").decode(element.value);
    }
    if (element.tag === 0x1e) {
        let output = "";
        for (let index = 0; index < element.value.length; index += 2) {
            output += String.fromCharCode((element.value[index] << 8) | element.value[index + 1]);
        }
        return output;
    }
    return bytesToHex(element.value);
}

function parseAsn1Time(element) {
    const raw = new TextDecoder("ascii").decode(element.value);
    if (element.tag === 0x17) {
        const year = Number(raw.slice(0, 2));
        const fullYear = year >= 50 ? 1900 + year : 2000 + year;
        return new Date(Date.UTC(fullYear, Number(raw.slice(2, 4)) - 1, Number(raw.slice(4, 6)), Number(raw.slice(6, 8)), Number(raw.slice(8, 10)), Number(raw.slice(10, 12))));
    }
    if (element.tag === 0x18) {
        return new Date(Date.UTC(Number(raw.slice(0, 4)), Number(raw.slice(4, 6)) - 1, Number(raw.slice(6, 8)), Number(raw.slice(8, 10)), Number(raw.slice(10, 12)), Number(raw.slice(12, 14))));
    }
    return null;
}

function parseCertificateName(element) {
    const parts = [];
    element.children.forEach(set => {
        set.children.forEach(sequence => {
            const oid = parseOid(sequence.children[0]?.value || new Uint8Array());
            const value = sequence.children[1] ? decodeAsn1String(sequence.children[1]) : "";
            parts.push(`${oidName(oid)}=${value}`);
        });
    });
    return parts.join(", ");
}

function parseSanExtension(extension) {
    const octet = extension.children.find(child => child.tag === 0x04);
    if (!octet) return [];
    const sequence = readAsn1Element(octet.value, 0).element;
    return sequence.children.map(item => {
        if (item.tag === 0x82) return `DNS:${new TextDecoder("ascii").decode(item.value)}`;
        if (item.tag === 0x86) return `URI:${new TextDecoder("ascii").decode(item.value)}`;
        if (item.tag === 0x87) return `IP:${Array.from(item.value).join(".")}`;
        if (item.tag === 0x81) return `EMAIL:${new TextDecoder("ascii").decode(item.value)}`;
        return `${item.tag.toString(16)}:${bytesToHex(item.value)}`;
    });
}

async function parseCertificateBlock(block, index) {
    const root = readAsn1Element(block.bytes, 0).element;
    const tbs = root.children[0];
    let cursor = tbs.children[0]?.tag === 0xa0 ? 1 : 0;
    const serial = tbs.children[cursor];
    cursor += 1;
    const signatureAlgorithm = oidName(parseOid(tbs.children[cursor]?.children?.[0]?.value || new Uint8Array()));
    cursor += 1;
    const issuer = parseCertificateName(tbs.children[cursor]);
    cursor += 1;
    const validity = tbs.children[cursor];
    const notBefore = parseAsn1Time(validity.children[0]);
    const notAfter = parseAsn1Time(validity.children[1]);
    cursor += 1;
    const subject = parseCertificateName(tbs.children[cursor]);
    cursor += 1;
    const spki = tbs.children[cursor];
    const publicKeyAlgorithm = oidName(parseOid(spki.children[0]?.children?.[0]?.value || new Uint8Array()));
    const extensionWrapper = tbs.children.find(child => child.tag === 0xa3);
    let sans = [];
    if (extensionWrapper?.children?.[0]?.children) {
        const sanExtension = extensionWrapper.children[0].children.find(extension => parseOid(extension.children[0]?.value || new Uint8Array()) === "2.5.29.17");
        if (sanExtension) sans = parseSanExtension(sanExtension);
    }
    const fingerprintBytes = new Uint8Array(await getSubtleCrypto().digest("SHA-256", block.bytes));
    const now = Date.now();
    const expired = notAfter ? notAfter.getTime() < now : false;
    const notYetValid = notBefore ? notBefore.getTime() > now : false;
    return {
        index,
        serial: bytesToHex(serial.value),
        subject,
        issuer,
        notBefore,
        notAfter,
        expired,
        notYetValid,
        signatureAlgorithm,
        publicKeyAlgorithm,
        sans,
        fingerprint: bytesToHex(fingerprintBytes)
    };
}

async function inspectCertificates() {
    if (!certificateInput.value.trim()) {
        certificateResult.value = buildErrorResult("CERT_EMPTY", "Falta certificado", "Pega uno o varios certificados PEM X.509.");
        return;
    }

    try {
        const blocks = parsePemBlocks(certificateInput.value, "CERTIFICATE");
        if (!blocks.length) throw new Error("No se encontro ningun bloque -----BEGIN CERTIFICATE-----.");
        const certificates = [];
        for (let index = 0; index < blocks.length; index += 1) {
            certificates.push(await parseCertificateBlock(blocks[index], index + 1));
        }
        const leaf = certificates[0];
        const expiredCount = certificates.filter(item => item.expired || item.notYetValid).length;
        const chainHints = certificates.map((item, index) => {
            const next = certificates[index + 1];
            if (!next) return `#${item.index}: ${item.subject}`;
            return `#${item.index} issuer ${item.issuer === next.subject ? "coincide" : "no coincide"} con subject del siguiente`;
        });

        certificateResult.value = {
            verdictTone: expiredCount ? "verdict-warning" : "verdict-success",
            verdictTitle: expiredCount ? "Cadena parseada con problemas de validez" : "Certificado parseado",
            verdictBody: "El inspector extrae campos X.509 locales. No realiza validacion criptografica de confianza contra una CA raiz.",
            summaryCards: [
                { label: "Certificados", value: String(certificates.length), tone: "tone-neutral", note: "Bloques PEM" },
                { label: "Leaf CN", value: leaf.subject.split(", ")[0] || "N/D", tone: "tone-success", note: "Subject" },
                { label: "Validez", value: expiredCount ? "Revisar" : "Temporal OK", tone: expiredCount ? "tone-warning" : "tone-success", note: "Fechas locales" },
                { label: "Algoritmo", value: leaf.publicKeyAlgorithm, tone: "tone-neutral", note: "Clave publica" }
            ],
            signalCards: [
                { label: "notBefore", value: leaf.notBefore ? formatDateTime(leaf.notBefore.getTime()) : "N/D", tone: leaf.notYetValid ? "tone-warning" : "tone-success", note: "Inicio" },
                { label: "notAfter", value: leaf.notAfter ? formatDateTime(leaf.notAfter.getTime()) : "N/D", tone: leaf.expired ? "tone-danger" : "tone-success", note: "Fin" },
                { label: "SAN", value: String(leaf.sans.length), tone: leaf.sans.length ? "tone-success" : "tone-warning", note: "Subject Alternative Name" },
                { label: "Firma", value: leaf.signatureAlgorithm, tone: "tone-neutral", note: "Algoritmo declarado" }
            ],
            panels: [
                { title: "Certificados", badge: "x509", content: certificates.map(item => buildTextList(`#${item.index}`, [
                    `Subject: ${item.subject}`,
                    `Issuer: ${item.issuer}`,
                    `Serial: ${item.serial}`,
                    `Validez: ${item.notBefore ? formatDateTime(item.notBefore.getTime()) : "N/D"} -> ${item.notAfter ? formatDateTime(item.notAfter.getTime()) : "N/D"}`,
                    `Public key: ${item.publicKeyAlgorithm}`,
                    `Signature: ${item.signatureAlgorithm}`,
                    `SHA-256: ${item.fingerprint}`,
                    item.sans.length ? `SAN: ${item.sans.join(", ")}` : "SAN: no encontrado"
                ])).join("\n\n"), copyValue: safeJson(certificates) },
                { title: "Relacion de cadena", badge: "chain", content: chainHints.join("\n"), copyValue: chainHints.join("\n") }
            ]
        };
    } catch (error) {
        certificateResult.value = buildErrorResult("CERT_PARSE_FAILED", "No se pudo analizar el certificado", error.message);
    }
}

function useCertificateFromPemConverter() {
    if (!keyConverterInput.value.trim()) {
        certificateResult.value = buildErrorResult("CONVERTER_EMPTY", "Conversor vacio", "Pega primero un certificado PEM en el conversor o directamente en este modulo.");
        return;
    }
    certificateInput.value = keyConverterInput.value;
}

function getKeyConverterAlgorithm() {
    if (keyConverterAlgorithm.value === "ECDSA") return { name: "ECDSA", namedCurve: "P-256" };
    if (keyConverterAlgorithm.value === "ECDH") return { name: "ECDH", namedCurve: "P-256" };
    if (keyConverterAlgorithm.value === "RSA-PSS") return { name: "RSA-PSS", hash: "SHA-256" };
    return { name: "RSA-OAEP", hash: "SHA-256" };
}

function getKeyConverterUsages(kind = keyConverterKind.value) {
    if (keyConverterAlgorithm.value === "ECDH") return kind === "spki" ? [] : ["deriveBits"];
    if (keyConverterAlgorithm.value === "ECDSA") return kind === "spki" ? ["verify"] : ["sign"];
    if (keyConverterAlgorithm.value === "RSA-PSS") return kind === "spki" ? ["verify"] : ["sign"];
    return kind === "spki" ? ["encrypt"] : ["decrypt"];
}

async function convertPemToJwk() {
    if (!keyConverterInput.value.trim()) {
        keyConverterResult.value = buildErrorResult("KEY_INPUT_EMPTY", "Falta clave", "Pega una clave PEM antes de convertir.");
        return;
    }
    try {
        const subtle = getSubtleCrypto();
        const label = keyConverterKind.value === "spki" ? "PUBLIC KEY" : "PRIVATE KEY";
        const format = keyConverterKind.value;
        const key = await subtle.importKey(format, pemToArrayBuffer(keyConverterInput.value, label), getKeyConverterAlgorithm(), true, getKeyConverterUsages());
        const jwk = await subtle.exportKey("jwk", key);
        const output = safeJson(jwk);
        keyConverterResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "PEM convertido a JWK",
            verdictBody: "La clave se importo con WebCrypto y se exporto como JSON Web Key.",
            summaryCards: [
                { label: "Tipo", value: keyConverterKind.value.toUpperCase(), tone: "tone-neutral", note: label },
                { label: "Algoritmo", value: keyConverterAlgorithm.value, tone: "tone-success", note: "Importacion" },
                { label: "kty", value: jwk.kty, tone: "tone-success", note: "JWK" },
                { label: "Exportable", value: "Si", tone: "tone-warning", note: "Laboratorio local" }
            ],
            signalCards: [
                { label: "kid", value: jwk.kid || "N/D", tone: "tone-neutral", note: "Opcional" },
                { label: "use", value: jwk.use || "N/D", tone: "tone-neutral", note: "Opcional" },
                { label: "key_ops", value: jwk.key_ops?.join(", ") || "N/D", tone: "tone-neutral", note: "Usos" },
                { label: "Salida", value: `${output.length} chars`, tone: "tone-neutral", note: "JSON" }
            ],
            panels: [
                { title: "JWK", badge: "json", content: output, copyValue: output }
            ]
        };
    } catch (error) {
        keyConverterResult.value = buildErrorResult("PEM_TO_JWK_FAILED", "No se pudo convertir PEM a JWK", error.message);
    }
}

async function convertJwkToPem() {
    if (!keyConverterInput.value.trim()) {
        keyConverterResult.value = buildErrorResult("JWK_EMPTY", "Falta JWK", "Pega un objeto JWK antes de convertir.");
        return;
    }
    try {
        const subtle = getSubtleCrypto();
        const jwk = JSON.parse(keyConverterInput.value);
        const format = keyConverterKind.value === "spki" ? "spki" : "pkcs8";
        const label = keyConverterKind.value === "spki" ? "PUBLIC KEY" : "PRIVATE KEY";
        const key = await subtle.importKey("jwk", jwk, getKeyConverterAlgorithm(), true, getKeyConverterUsages());
        const pem = arrayBufferToPem(await subtle.exportKey(format, key), label);
        keyConverterResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "JWK convertido a PEM",
            verdictBody: "La clave JWK se importo y se exporto en formato PEM.",
            summaryCards: [
                { label: "Tipo", value: format.toUpperCase(), tone: "tone-neutral", note: label },
                { label: "Algoritmo", value: keyConverterAlgorithm.value, tone: "tone-success", note: "WebCrypto" },
                { label: "kty", value: jwk.kty || "N/D", tone: jwk.kty ? "tone-success" : "tone-warning", note: "JWK" },
                { label: "PEM", value: `${pem.length} chars`, tone: "tone-neutral", note: "Salida" }
            ],
            signalCards: [
                { label: "kid", value: jwk.kid || "N/D", tone: "tone-neutral", note: "Opcional" },
                { label: "Privada", value: keyConverterKind.value === "pkcs8" ? "Si" : "No", tone: keyConverterKind.value === "pkcs8" ? "tone-warning" : "tone-success", note: "Sensibilidad" },
                { label: "Curva", value: jwk.crv || "N/D", tone: "tone-neutral", note: "EC" },
                { label: "Modulo RSA", value: jwk.n ? `${jwk.n.length} chars` : "N/D", tone: "tone-neutral", note: "RSA" }
            ],
            panels: [
                { title: "PEM", badge: format, content: pem, copyValue: pem }
            ]
        };
    } catch (error) {
        keyConverterResult.value = buildErrorResult("JWK_TO_PEM_FAILED", "No se pudo convertir JWK a PEM", error.message);
    }
}

function extractDerFromPem() {
    if (!keyConverterInput.value.trim()) {
        keyConverterResult.value = buildErrorResult("PEM_EMPTY", "Falta PEM", "Pega una clave PEM antes de extraer DER Base64.");
        return;
    }
    try {
        const blocks = parsePemBlocks(keyConverterInput.value);
        if (!blocks.length) throw new Error("No se encontro bloque PEM.");
        const block = blocks[0];
        keyConverterResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "DER Base64 extraido",
            verdictBody: "DER es la representacion binaria ASN.1. PEM es DER codificado en Base64 con cabeceras.",
            summaryCards: [
                { label: "Label", value: block.label, tone: "tone-neutral", note: "PEM" },
                { label: "DER", value: `${block.bytes.byteLength} bytes`, tone: "tone-success", note: "Binario" },
                { label: "Base64", value: `${block.base64.length} chars`, tone: "tone-neutral", note: "Texto" },
                { label: "Formato", value: "Extraido", tone: "tone-success", note: "Sin cabeceras" }
            ],
            signalCards: [
                { label: "Cabecera", value: "Eliminada", tone: "tone-neutral", note: "BEGIN/END" },
                { label: "Contenido", value: "Intacto", tone: "tone-success", note: "Mismos bytes DER" },
                { label: "Uso", value: "Transporte", tone: "tone-neutral", note: "APIs que esperan Base64" },
                { label: "ASN.1", value: "DER", tone: "tone-neutral", note: "Codificacion" }
            ],
            panels: [
                { title: "DER Base64", badge: "der", content: block.base64, copyValue: block.base64 }
            ]
        };
    } catch (error) {
        keyConverterResult.value = buildErrorResult("DER_EXTRACT_FAILED", "No se pudo extraer DER", error.message);
    }
}

function wrapDerAsPem() {
    if (!keyConverterInput.value.trim()) {
        keyConverterResult.value = buildErrorResult("DER_EMPTY", "Falta DER Base64", "Pega DER Base64 antes de envolverlo como PEM.");
        return;
    }
    try {
        const label = keyConverterKind.value === "spki" ? "PUBLIC KEY" : "PRIVATE KEY";
        const base64 = compactDerBase64(keyConverterInput.value);
        const pem = arrayBufferToPem(base64ToBytes(base64), label);
        keyConverterResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "DER envuelto como PEM",
            verdictBody: "Se reconstruyeron cabecera, cuerpo Base64 paginado y pie PEM.",
            summaryCards: [
                { label: "Label", value: label, tone: "tone-neutral", note: "PEM" },
                { label: "DER", value: `${base64ToBytes(base64).byteLength} bytes`, tone: "tone-success", note: "Decodificado" },
                { label: "PEM", value: `${pem.length} chars`, tone: "tone-neutral", note: "Salida" },
                { label: "Tipo", value: keyConverterKind.value.toUpperCase(), tone: "tone-neutral", note: "Seleccionado" }
            ],
            signalCards: [
                { label: "Base64", value: "Normalizado", tone: "tone-success", note: "Sin espacios" },
                { label: "Cabecera", value: "Anadida", tone: "tone-success", note: label },
                { label: "Validacion", value: "Estructural", tone: "tone-neutral", note: "No importa clave" },
                { label: "Uso", value: "PEM", tone: "tone-neutral", note: "Herramientas OpenSSL/API" }
            ],
            panels: [
                { title: "PEM", badge: "pem", content: pem, copyValue: pem }
            ]
        };
    } catch (error) {
        keyConverterResult.value = buildErrorResult("DER_WRAP_FAILED", "No se pudo envolver DER", error.message);
    }
}

function useAsymmetricKeyForConverter() {
    if (asymmetricPublicKeyPem.value.trim()) {
        keyConverterKind.value = "spki";
        keyConverterAlgorithm.value = "RSA-OAEP";
        keyConverterInput.value = asymmetricPublicKeyPem.value;
        return;
    }
    keyConverterResult.value = buildErrorResult("ASYMMETRIC_KEY_EMPTY", "No hay clave RSA actual", "Genera claves en el modulo de cifrado asimetrico antes de reutilizarlas aqui.");
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

function parseByteInput() {
    if (!byteInput.value.trim()) {
        throw new Error("Introduce material para inspeccionar.");
    }
    if (byteInputMode.value === "hex") return hexToBytes(byteInput.value);
    if (byteInputMode.value === "base64") return base64ToBytes(byteInput.value);
    if (byteInputMode.value === "base64url") return base64UrlToBytes(byteInput.value);
    return textToBytes(byteInput.value);
}

function inspectBytes() {
    try {
        const bytes = parseByteInput();
        const hex = bytesToHex(bytes);
        const base64 = bytesToBase64(bytes);
        const base64url = bytesToBase64Url(bytes);
        const binary = Array.from(bytes).map(byte => byte.toString(2).padStart(8, "0")).join(" ");
        const decimal = Array.from(bytes).join(", ");
        const table = Array.from(bytes.slice(0, 96)).map((byte, index) => {
            const char = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".";
            return `${String(index).padStart(3, "0")}  dec=${String(byte).padStart(3, " ")}  hex=${byte.toString(16).padStart(2, "0")}  bin=${byte.toString(2).padStart(8, "0")}  char=${char}`;
        }).join("\n");
        let utf8 = "";
        try {
            utf8 = bytesToUtf8(bytes);
        } catch {
            utf8 = "No decodificable como UTF-8 valido.";
        }

        byteResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Bytes inspeccionados",
            verdictBody: "La salida muestra las mismas unidades binarias representadas en formatos distintos.",
            summaryCards: [
                { label: "Bytes", value: String(bytes.byteLength), tone: "tone-neutral", note: "Longitud real" },
                { label: "Entrada", value: byteInputMode.value.toUpperCase(), tone: "tone-neutral", note: "Modo usado" },
                { label: "Hex", value: `${hex.length} chars`, tone: "tone-success", note: "2 chars por byte" },
                { label: "Base64", value: `${base64.length} chars`, tone: "tone-success", note: "Transporte textual" }
            ],
            signalCards: [
                { label: "ASCII imprimible", value: `${Array.from(bytes).filter(byte => byte >= 32 && byte <= 126).length}`, tone: "tone-neutral", note: "Bytes visibles" },
                { label: "Nulos", value: `${Array.from(bytes).filter(byte => byte === 0).length}`, tone: "tone-neutral", note: "0x00" },
                { label: "Unicos", value: `${new Set(Array.from(bytes)).size}`, tone: "tone-neutral", note: "Valores byte" },
                { label: "UTF-8", value: utf8 ? "Disponible" : "Vacio", tone: utf8 ? "tone-success" : "tone-neutral", note: "Decodificacion" }
            ],
            panels: [
                { title: "Tabla de bytes", badge: "bytes", content: table || "Sin bytes", copyValue: table },
                { title: "Representaciones", badge: "enc", content: buildTextList("Formatos", [
                    `UTF-8: ${utf8}`,
                    `Hex: ${hex}`,
                    `Base64: ${base64}`,
                    `Base64URL: ${base64url}`,
                    `Decimal: ${decimal}`,
                    `Binario: ${binary}`
                ]), copyValue: `Hex: ${hex}\nBase64: ${base64}\nBase64URL: ${base64url}` }
            ]
        };
    } catch (error) {
        byteResult.value = buildErrorResult("BYTE_INSPECT_FAILED", "No se pudieron inspeccionar bytes", error.message);
    }
}

function useTransformOutputForBytes() {
    if (!transformResult.value?.primaryValue) {
        byteResult.value = buildErrorResult("TRANSFORM_OUTPUT_EMPTY", "No hay salida transformada", "Ejecuta primero una transformacion para inspeccionar sus bytes.");
        return;
    }
    byteInput.value = transformResult.value.primaryValue;
    byteInputMode.value = transformOperation.value.includes("hex") && transformOperation.value.includes("encode")
        ? "hex"
        : transformOperation.value.includes("base64") && transformOperation.value.includes("encode")
            ? (transformOperation.value.includes("base64url") ? "base64url" : "base64")
            : "text";
}

function fillByteExample() {
    byteInputMode.value = "text";
    byteInput.value = "JWT header.payload.signature\nlinea=2";
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

function parseJsonSignInput() {
    if (!jsonSignInput.value.trim()) {
        throw new Error("Introduce JSON antes de canonicalizar o firmar.");
    }
    return JSON.parse(jsonSignInput.value);
}

function buildJsonSignResult({ title, body, canonical, signature = "", valid = null }) {
    const parsed = JSON.parse(canonical);
    const paths = flattenJsonPaths(parsed);
    return {
        verdictTone: valid === false ? "verdict-danger" : "verdict-success",
        verdictTitle: title,
        verdictBody: body,
        summaryCards: [
            { label: "Algoritmo", value: `HMAC-${jsonSignAlgorithm.value}`, tone: "tone-success", note: "Firma simetrica" },
            { label: "Bytes", value: `${textToBytes(canonical).byteLength}`, tone: "tone-neutral", note: "JSON canonico" },
            { label: "Rutas", value: `${paths.length}`, tone: "tone-neutral", note: "Claves/indices" },
            { label: "Firma", value: signature ? `${signature.length} chars` : "N/D", tone: signature ? "tone-success" : "tone-neutral", note: "Hex" }
        ],
        signalCards: [
            { label: "Orden claves", value: "Determinista", tone: "tone-success", note: "Lexicografico" },
            { label: "Whitespace", value: "Eliminado", tone: "tone-success", note: "Compacto" },
            { label: "Secreto", value: jsonSignSecret.value ? `${jsonSignSecret.value.length} chars` : "Ausente", tone: jsonSignSecret.value ? "tone-success" : "tone-warning", note: "HMAC" },
            { label: "Verificacion", value: valid === null ? "N/D" : (valid ? "Valida" : "Invalida"), tone: valid === null ? "tone-neutral" : (valid ? "tone-success" : "tone-danger"), note: "Comparacion" }
        ],
        panels: [
            { title: "JSON canonico", badge: "canon", content: canonical, copyValue: canonical },
            { title: "Firma", badge: "hmac", content: signature || "Sin firma calculada", copyValue: signature }
        ]
    };
}

function canonicalizeJsonInput() {
    try {
        const canonical = canonicalJsonString(parseJsonSignInput());
        jsonSignInput.value = canonical;
        jsonSignResult.value = buildJsonSignResult({
            title: "JSON canonicalizado",
            body: "Las claves estan ordenadas y el texto queda estable para hashing o firma.",
            canonical
        });
    } catch (error) {
        jsonSignResult.value = buildErrorResult("JSON_CANON_FAILED", "No se pudo canonicalizar", error.message);
    }
}

function signCanonicalJson() {
    if (!jsonSignSecret.value.trim()) {
        jsonSignResult.value = buildErrorResult("JSON_SIGN_SECRET_EMPTY", "Falta clave HMAC", "Introduce una clave compartida antes de firmar.");
        return;
    }
    try {
        const canonical = canonicalJsonString(parseJsonSignInput());
        const hmac = jsonSignAlgorithm.value === "SHA512"
            ? CryptoJS.HmacSHA512(canonical, jsonSignSecret.value)
            : CryptoJS.HmacSHA256(canonical, jsonSignSecret.value);
        const signature = hmac.toString(CryptoJS.enc.Hex);
        jsonSignature.value = signature;
        jsonSignResult.value = buildJsonSignResult({
            title: "JSON firmado",
            body: "La firma HMAC se calculo sobre el JSON canonico, no sobre el texto original.",
            canonical,
            signature
        });
    } catch (error) {
        jsonSignResult.value = buildErrorResult("JSON_SIGN_FAILED", "No se pudo firmar JSON", error.message);
    }
}

function verifyCanonicalJsonSignature() {
    if (!jsonSignature.value.trim()) {
        jsonSignResult.value = buildErrorResult("JSON_SIGNATURE_EMPTY", "Falta firma", "Firma primero el JSON o pega una firma Hex esperada.");
        return;
    }
    if (!jsonSignSecret.value.trim()) {
        jsonSignResult.value = buildErrorResult("JSON_SIGN_SECRET_EMPTY", "Falta clave HMAC", "La misma clave compartida es necesaria para verificar.");
        return;
    }
    try {
        const canonical = canonicalJsonString(parseJsonSignInput());
        const hmac = jsonSignAlgorithm.value === "SHA512"
            ? CryptoJS.HmacSHA512(canonical, jsonSignSecret.value)
            : CryptoJS.HmacSHA256(canonical, jsonSignSecret.value);
        const expected = hmac.toString(CryptoJS.enc.Hex);
        const valid = constantTimeEqual(textToBytes(expected.toLowerCase()), textToBytes(jsonSignature.value.trim().toLowerCase()));
        jsonSignResult.value = buildJsonSignResult({
            title: valid ? "Firma JSON valida" : "Firma JSON invalida",
            body: valid
                ? "La firma coincide con el JSON canonico actual y la clave HMAC."
                : "La firma no coincide. Cambiaron JSON, clave, algoritmo o firma esperada.",
            canonical,
            signature: expected,
            valid
        });
    } catch (error) {
        jsonSignResult.value = buildErrorResult("JSON_VERIFY_FAILED", "No se pudo verificar JSON", error.message);
    }
}

function useJsonDocAForSigning() {
    if (!jsonDocA.value.trim()) {
        jsonSignResult.value = buildErrorResult("JSON_A_EMPTY", "Documento A vacio", "Introduce o carga JSON A antes de enviarlo a firma.");
        return;
    }
    jsonSignInput.value = jsonDocA.value;
}

function fillJsonSignExample() {
    jsonSignAlgorithm.value = "SHA256";
    jsonSignSecret.value = "clave-compartida-feanor";
    jsonSignInput.value = '{"roles":["auditor","forjador"],"sub":"celebrimbor","active":true}';
    jsonSignature.value = "";
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

function estimateCharsetSize(value) {
    let size = 0;
    if (/[a-z]/.test(value)) size += 26;
    if (/[A-Z]/.test(value)) size += 26;
    if (/[0-9]/.test(value)) size += 10;
    if (/[^A-Za-z0-9\s]/.test(value)) size += 33;
    if (/\s/.test(value)) size += 1;
    if (/[^\x00-\x7F]/.test(value)) size += 64;
    return Math.max(size, countUniqueCharacters(value));
}

function shannonEntropy(value) {
    if (!value) return 0;
    const frequencies = new Map();
    Array.from(value).forEach(char => frequencies.set(char, (frequencies.get(char) || 0) + 1));
    return Array.from(frequencies.values()).reduce((sum, count) => {
        const probability = count / value.length;
        return sum - probability * Math.log2(probability);
    }, 0) * value.length;
}

function analyzeEntropy() {
    if (!entropyInput.value) {
        entropyResult.value = buildErrorResult("ENTROPY_EMPTY", "Falta material", "Introduce una password, token o secreto para analizar.");
        return;
    }

    try {
        const value = entropyInput.value;
        const charset = estimateCharsetSize(value);
        const bruteForceBits = value.length * Math.log2(charset || 1);
        const shannonBits = shannonEntropy(value);
        const zx = zxcvbn(value);
        const repeatedChars = value.length - countUniqueCharacters(value);
        const urlSafe = /^[A-Za-z0-9\-_]+$/.test(value);
        const scoreTone = zx.score >= 4 ? "tone-success" : zx.score >= 2 ? "tone-warning" : "tone-danger";

        entropyResult.value = {
            verdictTone: zx.score >= 3 || bruteForceBits >= 96 ? "verdict-success" : "verdict-warning",
            verdictTitle: "Entropia estimada",
            verdictBody: "La estimacion combina charset teorico, distribucion Shannon y analisis zxcvbn para passwords humanas.",
            summaryCards: [
                { label: "Longitud", value: `${value.length} chars`, tone: "tone-neutral", note: `${textToBytes(value).byteLength} bytes UTF-8` },
                { label: "Charset", value: `${charset}`, tone: "tone-neutral", note: "Estimado" },
                { label: "Bits teoricos", value: entropyLabel(bruteForceBits), tone: bruteForceBits >= 96 ? "tone-success" : "tone-warning", note: "Longitud * log2(charset)" },
                { label: "zxcvbn", value: `${zx.score}/4`, tone: scoreTone, note: zx.feedback.warning || "Sin aviso principal" }
            ],
            signalCards: [
                { label: "Shannon", value: entropyLabel(shannonBits), tone: shannonBits >= 80 ? "tone-success" : "tone-warning", note: "Distribucion observada" },
                { label: "Repeticion", value: `${repeatedChars}`, tone: repeatedChars ? "tone-warning" : "tone-success", note: "Caracteres repetidos" },
                { label: "URL-safe", value: urlSafe ? "Si" : "No", tone: urlSafe ? "tone-success" : "tone-neutral", note: "Transporte" },
                { label: "Crack time", value: zx.crack_times_display.offline_fast_hashing_1e10_per_second, tone: scoreTone, note: "zxcvbn offline rapido" }
            ],
            panels: [
                { title: "Analisis zxcvbn", badge: "score", content: safeJson({
                    score: zx.score,
                    guesses: zx.guesses,
                    crack_times_display: zx.crack_times_display,
                    feedback: zx.feedback
                }), copyValue: safeJson(zx.feedback) },
                { title: "Lectura de caracteres", badge: "chars", content: buildTextList("Caracteristicas", [
                    /[a-z]/.test(value) ? "Incluye minusculas." : "",
                    /[A-Z]/.test(value) ? "Incluye mayusculas." : "",
                    /[0-9]/.test(value) ? "Incluye numeros." : "",
                    /[^A-Za-z0-9\s]/.test(value) ? "Incluye simbolos." : "",
                    /\s/.test(value) ? "Incluye espacios." : "",
                    /[^\x00-\x7F]/.test(value) ? "Incluye caracteres no ASCII." : ""
                ]), copyValue: `Bits teoricos: ${entropyLabel(bruteForceBits)}\nShannon: ${entropyLabel(shannonBits)}` }
            ]
        };
    } catch (error) {
        entropyResult.value = buildErrorResult("ENTROPY_FAILED", "No se pudo analizar entropia", error.message);
    }
}

function useGeneratedSecretForEntropy() {
    if (!secretResult.value?.generated) {
        entropyResult.value = buildErrorResult("SECRET_NOT_GENERATED", "No hay secreto generado", "Genera primero un secreto para analizarlo.");
        return;
    }
    entropyInput.value = secretResult.value.generated;
}

function fillEntropyExample() {
    entropyInput.value = "Tr0n0-de-G0nd0r!7f2b9d4c";
}

const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function bytesToBase32(bytes) {
    let bits = "";
    bytes.forEach(byte => {
        bits += byte.toString(2).padStart(8, "0");
    });
    let output = "";
    for (let index = 0; index < bits.length; index += 5) {
        const chunk = bits.slice(index, index + 5).padEnd(5, "0");
        output += base32Alphabet[Number.parseInt(chunk, 2)];
    }
    return output;
}

function base32ToBytes(value) {
    const clean = String(value ?? "").replace(/=+$/g, "").replace(/\s+/g, "").toUpperCase();
    if (!clean || /[^A-Z2-7]/.test(clean)) {
        throw new Error("El secreto Base32 solo puede contener A-Z y 2-7.");
    }
    let bits = "";
    Array.from(clean).forEach(char => {
        bits += base32Alphabet.indexOf(char).toString(2).padStart(5, "0");
    });
    const bytes = [];
    for (let index = 0; index + 8 <= bits.length; index += 8) {
        bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
    }
    return new Uint8Array(bytes);
}

function counterToBytes(counter) {
    let value = BigInt(Math.max(0, Number(counter) || 0));
    const bytes = new Uint8Array(8);
    for (let index = 7; index >= 0; index -= 1) {
        bytes[index] = Number(value & 0xffn);
        value >>= 8n;
    }
    return bytes;
}

function hmacOtp(secretBytes, counter, algorithm, digits) {
    const counterWords = bytesToWordArray(counterToBytes(counter));
    const secretWords = bytesToWordArray(secretBytes);
    const digest = algorithm === "SHA512"
        ? CryptoJS.HmacSHA512(counterWords, secretWords)
        : algorithm === "SHA256"
            ? CryptoJS.HmacSHA256(counterWords, secretWords)
            : CryptoJS.HmacSHA1(counterWords, secretWords);
    const hmacBytes = wordArrayToBytes(digest);
    const offset = hmacBytes[hmacBytes.length - 1] & 0x0f;
    const binary = ((hmacBytes[offset] & 0x7f) << 24)
        | (hmacBytes[offset + 1] << 16)
        | (hmacBytes[offset + 2] << 8)
        | hmacBytes[offset + 3];
    return String(binary % (10 ** digits)).padStart(digits, "0");
}

function currentOtpCounter() {
    return otpMode.value === "TOTP"
        ? Math.floor(Date.now() / 1000 / Math.max(15, Number(otpStep.value) || 30))
        : Math.max(0, Number(otpCounter.value) || 0);
}

function generateOtpSecret() {
    const bytes = new Uint8Array(20);
    globalThis.crypto.getRandomValues(bytes);
    otpSecret.value = bytesToBase32(bytes);
    otpResult.value = {
        verdictTone: "verdict-success",
        verdictTitle: "Secreto OTP generado",
        verdictBody: "El secreto Base32 es el material compartido entre servidor y autenticador.",
        summaryCards: [
            { label: "Bytes", value: `${bytes.byteLength}`, tone: "tone-success", note: "160 bits" },
            { label: "Formato", value: "Base32", tone: "tone-success", note: "RFC 4648" },
            { label: "Modo", value: otpMode.value, tone: "tone-neutral", note: "Actual" },
            { label: "Algoritmo", value: otpAlgorithm.value, tone: "tone-neutral", note: "HMAC" }
        ],
        signalCards: [
            { label: "Digitos", value: `${otpDigits.value}`, tone: "tone-neutral", note: "Codigo" },
            { label: "Step", value: `${otpStep.value}s`, tone: "tone-neutral", note: "TOTP" },
            { label: "Contador", value: `${otpCounter.value}`, tone: "tone-neutral", note: "HOTP" },
            { label: "Secreto", value: "Visible", tone: "tone-warning", note: "Laboratorio" }
        ],
        panels: [
            { title: "Secreto Base32", badge: "secret", content: otpSecret.value, copyValue: otpSecret.value }
        ]
    };
}

function generateOtpCode() {
    if (!otpSecret.value.trim()) {
        otpResult.value = buildErrorResult("OTP_SECRET_EMPTY", "Falta secreto", "Genera o pega un secreto Base32.");
        return;
    }
    try {
        const secretBytes = base32ToBytes(otpSecret.value);
        const counter = currentOtpCounter();
        const code = hmacOtp(secretBytes, counter, otpAlgorithm.value, Math.max(6, Math.min(8, Number(otpDigits.value) || 6)));
        otpCodeToVerify.value = code;
        otpResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Codigo OTP generado",
            verdictBody: otpMode.value === "TOTP"
                ? "TOTP usa el tiempo Unix dividido por el paso temporal como contador HMAC."
                : "HOTP usa un contador sincronizado entre servidor y cliente.",
            summaryCards: [
                { label: "Codigo", value: code, tone: "tone-success", note: `${otpDigits.value} digitos` },
                { label: "Modo", value: otpMode.value, tone: "tone-neutral", note: "RFC 4226/6238" },
                { label: "Contador", value: `${counter}`, tone: "tone-neutral", note: otpMode.value },
                { label: "Algoritmo", value: otpAlgorithm.value, tone: "tone-success", note: "HMAC" }
            ],
            signalCards: [
                { label: "Secreto", value: `${secretBytes.byteLength} bytes`, tone: "tone-success", note: "Base32 decodificado" },
                { label: "Paso", value: `${otpStep.value}s`, tone: "tone-neutral", note: "Solo TOTP" },
                { label: "Ventana", value: "Actual", tone: "tone-neutral", note: "Sin drift" },
                { label: "Salida", value: "Numerica", tone: "tone-success", note: "OTP" }
            ],
            panels: [
                { title: "Codigo", badge: otpMode.value, content: code, copyValue: code },
                { title: "Parametros", badge: "config", content: safeJson({ mode: otpMode.value, algorithm: otpAlgorithm.value, digits: otpDigits.value, step: otpStep.value, counter }), copyValue: code }
            ]
        };
    } catch (error) {
        otpResult.value = buildErrorResult("OTP_GENERATE_FAILED", "No se pudo generar OTP", error.message);
    }
}

function verifyOtpCode() {
    if (!otpCodeToVerify.value.trim()) {
        otpResult.value = buildErrorResult("OTP_CODE_EMPTY", "Falta codigo", "Introduce el codigo que quieres verificar.");
        return;
    }
    if (!otpSecret.value.trim()) {
        otpResult.value = buildErrorResult("OTP_SECRET_EMPTY", "Falta secreto", "Pega el secreto Base32 compartido.");
        return;
    }
    try {
        const secretBytes = base32ToBytes(otpSecret.value);
        const digits = Math.max(6, Math.min(8, Number(otpDigits.value) || 6));
        const current = currentOtpCounter();
        const counters = otpMode.value === "TOTP" ? [current - 1, current, current + 1] : [current];
        const matches = counters.filter(counter => counter >= 0).map(counter => ({
            counter,
            code: hmacOtp(secretBytes, counter, otpAlgorithm.value, digits)
        }));
        const valid = matches.some(item => item.code === otpCodeToVerify.value.trim());
        otpResult.value = {
            verdictTone: valid ? "verdict-success" : "verdict-danger",
            verdictTitle: valid ? "Codigo OTP valido" : "Codigo OTP invalido",
            verdictBody: valid
                ? "El codigo coincide con el secreto, algoritmo y contador/ventana temporal."
                : "El codigo no coincide. Revisa secreto, algoritmo, digitos, contador o reloj.",
            summaryCards: [
                { label: "Resultado", value: valid ? "Valido" : "Invalido", tone: valid ? "tone-success" : "tone-danger", note: otpMode.value },
                { label: "Codigo", value: otpCodeToVerify.value.trim(), tone: "tone-neutral", note: "Entrada" },
                { label: "Contador", value: `${current}`, tone: "tone-neutral", note: "Actual" },
                { label: "Ventana", value: otpMode.value === "TOTP" ? "-1/0/+1" : "Exacta", tone: "tone-neutral", note: "Verificacion" }
            ],
            signalCards: [
                { label: "Secreto", value: `${secretBytes.byteLength} bytes`, tone: "tone-success", note: "Base32" },
                { label: "Algoritmo", value: otpAlgorithm.value, tone: "tone-neutral", note: "HMAC" },
                { label: "Digitos", value: `${digits}`, tone: "tone-neutral", note: "Modulo decimal" },
                { label: "Step", value: `${otpStep.value}s`, tone: "tone-neutral", note: "TOTP" }
            ],
            panels: [
                { title: "Codigos calculados", badge: "window", content: matches.map(item => `${item.counter}: ${item.code}`).join("\n"), copyValue: matches.map(item => `${item.counter}: ${item.code}`).join("\n") }
            ]
        };
    } catch (error) {
        otpResult.value = buildErrorResult("OTP_VERIFY_FAILED", "No se pudo verificar OTP", error.message);
    }
}

function fillOtpExample() {
    otpMode.value = "TOTP";
    otpAlgorithm.value = "SHA1";
    otpDigits.value = 6;
    otpStep.value = 30;
    otpSecret.value = "JBSWY3DPEHPK3PXP";
    otpCounter.value = 0;
    otpCodeToVerify.value = "";
}

function constantTimeEqual(leftBytes, rightBytes) {
    const max = Math.max(leftBytes.length, rightBytes.length);
    let diff = leftBytes.length ^ rightBytes.length;
    for (let index = 0; index < max; index += 1) {
        diff |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
    }
    return diff === 0;
}

function directEqualMeasured(left, right, iterations) {
    const start = performance.now();
    let result = false;
    for (let index = 0; index < iterations; index += 1) {
        result = left === right;
    }
    return { result, ms: performance.now() - start };
}

function constantEqualMeasured(left, right, iterations) {
    const leftBytes = textToBytes(left);
    const rightBytes = textToBytes(right);
    const start = performance.now();
    let result = false;
    for (let index = 0; index < iterations; index += 1) {
        result = constantTimeEqual(leftBytes, rightBytes);
    }
    return { result, ms: performance.now() - start };
}

function compareConstantTime() {
    if (!timingLeft.value || !timingRight.value) {
        timingResult.value = buildErrorResult("TIMING_EMPTY", "Faltan valores", "Introduce valor A y valor B para comparar.");
        return;
    }

    try {
        const iterations = Math.max(1000, Math.min(200000, Number(timingIterations.value) || 50000));
        const direct = directEqualMeasured(timingLeft.value, timingRight.value, iterations);
        const constant = constantEqualMeasured(timingLeft.value, timingRight.value, iterations);
        const matches = constant.result;
        timingResult.value = {
            verdictTone: matches ? "verdict-success" : "verdict-warning",
            verdictTitle: matches ? "Valores equivalentes" : "Valores distintos",
            verdictBody: "La comparacion constante recorre todos los bytes y mezcla la diferencia acumulada antes de decidir.",
            summaryCards: [
                { label: "Resultado", value: matches ? "Iguales" : "Distintos", tone: matches ? "tone-success" : "tone-warning", note: "Constant-time" },
                { label: "Longitud A", value: `${textToBytes(timingLeft.value).byteLength} bytes`, tone: "tone-neutral", note: "UTF-8" },
                { label: "Longitud B", value: `${textToBytes(timingRight.value).byteLength} bytes`, tone: "tone-neutral", note: "UTF-8" },
                { label: "Iteraciones", value: iterations.toLocaleString("es-ES"), tone: "tone-neutral", note: "Medicion local" }
            ],
            signalCards: [
                { label: "Directo", value: `${direct.ms.toFixed(3)} ms`, tone: "tone-neutral", note: String(direct.result) },
                { label: "Constante", value: `${constant.ms.toFixed(3)} ms`, tone: "tone-neutral", note: String(constant.result) },
                { label: "Longitud", value: timingLeft.value.length === timingRight.value.length ? "Igual" : "Distinta", tone: timingLeft.value.length === timingRight.value.length ? "tone-success" : "tone-warning", note: "Caracteres" },
                { label: "Uso", value: "Secretos", tone: "tone-success", note: "Hash, token, firma" }
            ],
            panels: [
                { title: "Pseudocodigo", badge: "xor", content: [
                    "diff = len(a) XOR len(b)",
                    "for i in 0..maxLen:",
                    "  diff |= byteA[i] XOR byteB[i]",
                    "return diff == 0"
                ].join("\n"), copyValue: "diff |= byteA[i] XOR byteB[i]" },
                { title: "Medicion", badge: "perf", content: safeJson({ iterations, direct, constant }), copyValue: safeJson({ iterations, direct, constant }) }
            ]
        };
    } catch (error) {
        timingResult.value = buildErrorResult("TIMING_FAILED", "No se pudo comparar", error.message);
    }
}

function useHashForTimingCompare() {
    if (!hashResult.value?.primaryValue) {
        timingResult.value = buildErrorResult("HASH_OUTPUT_EMPTY", "No hay hash disponible", "Calcula primero un hash para usarlo en la comparacion.");
        return;
    }
    timingLeft.value = hashResult.value.primaryValue;
    timingRight.value = hashResult.value.primaryValue;
}

function fillTimingExample() {
    timingLeft.value = "a3d9f4c1a3d9f4c1a3d9f4c1a3d9f4c1";
    timingRight.value = "a3d9f4c1a3d9f4c1a3d9f4c1a3d9f4c0";
    timingIterations.value = 50000;
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
    if (!regexText.value.trim()) {
        regexResult.value = buildErrorResult("REGEX_TEXT_EMPTY", "Falta texto de prueba", "Introduce un texto contra el que ejecutar la expresion regular.");
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

.container.py-5 {
    display: flex;
    flex-direction: column;
}

.section-box {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
}

.intro-box {
    order: 0;
    display: grid;
    gap: 22px;
}

.hash-module {
    order: 1;
}

.symmetric-module {
    order: 2;
}

.asymmetric-module {
    order: 3;
}

.signature-module {
    order: 4;
}

.aead-module {
    order: 5;
}

.ecdh-module {
    order: 6;
}

.kdf-module {
    order: 7;
}

.certificate-module {
    order: 8;
}

.key-converter-module {
    order: 9;
}

.jwt-module {
    order: 10;
}

.transform-module {
    order: 11;
}

.byte-inspector-module {
    order: 12;
}

.json-module {
    order: 13;
}

.json-sign-module {
    order: 14;
}

.secret-module {
    order: 15;
}

.entropy-module {
    order: 16;
}

.otp-module {
    order: 17;
}

.timing-module {
    order: 18;
}

.regex-module {
    order: 19;
}

.copy-toast {
    order: 20;
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

.tool-card,
.metric-card,
.signal-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 8px;
}

.metric-card label,
.signal-card label {
    color: #f8fafc;
    font-size: 0.83rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.module-header {
    margin-bottom: 18px;
}

.module-title-line {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}

.info-hover {
    position: relative;
    display: inline-flex;
    align-items: center;
}

.info-button {
    display: grid;
    place-items: center;
    min-width: 112px;
    height: 30px;
    padding: 0 12px;
    border: 1px solid rgba(214, 167, 86, 0.44);
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(75, 54, 24, 0.92), rgba(28, 22, 16, 0.96));
    color: #f7d28a;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    line-height: 1;
    text-transform: uppercase;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.info-button:hover,
.info-button:focus {
    background: linear-gradient(180deg, rgba(103, 74, 30, 0.98), rgba(34, 25, 17, 0.98));
    border-color: rgba(247, 210, 138, 0.78);
    color: #fff7d6;
}

.guide-button {
    min-height: 30px;
    padding: 0 12px;
    border: 1px solid rgba(214, 167, 86, 0.42);
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(42, 34, 24, 0.92), rgba(24, 22, 19, 0.96));
    color: #d6a756;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.08em;
}

.guide-button:hover,
.guide-button:focus,
.guide-button.active {
    background: linear-gradient(180deg, rgba(94, 67, 28, 0.9), rgba(39, 29, 18, 0.98));
    border-color: rgba(247, 210, 138, 0.72);
    color: #ffe2a3;
}

.info-popover {
    position: absolute;
    z-index: 20;
    top: calc(100% + 10px);
    left: 50%;
    width: min(360px, 82vw);
    padding: 14px;
    border: 1px solid rgba(214, 167, 86, 0.26);
    border-radius: 8px;
    background: #17130f;
    box-shadow: 0 18px 40px rgba(10, 7, 4, 0.38);
    color: #cbd5e1;
    line-height: 1.55;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 6px);
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.info-popover strong {
    display: block;
    margin-bottom: 6px;
    color: #f8fafc;
}

.info-popover p {
    margin: 0 0 8px;
}

.info-popover p:last-child {
    margin-bottom: 0;
}

.info-hover:hover .info-popover,
.info-hover:focus-within .info-popover {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0);
}

.asymmetric-guide-panel {
    display: grid;
    gap: 16px;
    margin: 0 0 18px;
    padding: 18px;
    border: 1px solid rgba(214, 167, 86, 0.28);
    border-radius: 8px;
    background:
        linear-gradient(135deg, rgba(120, 83, 30, 0.18), rgba(25, 21, 16, 0.96) 42%),
        #17130f;
}

.guide-kicker {
    display: inline-block;
    margin-bottom: 6px;
    color: #d6a756;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.asymmetric-guide-panel h3 {
    margin: 0;
    color: #f8fafc;
    font-size: 1.02rem;
    font-weight: 700;
}

.guide-steps {
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 1.25rem;
    color: #cbd5e1;
    line-height: 1.65;
}

.guide-steps li::marker {
    color: #d6a756;
    font-weight: 800;
}

.guide-steps strong,
.guide-note strong {
    color: #f8fafc;
}

.guide-note {
    display: grid;
    gap: 6px;
    padding: 12px;
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 8px;
    background: rgba(18, 15, 11, 0.72);
    color: #94a3b8;
    line-height: 1.6;
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

.asymmetric-transfer-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 14px;
}

.transfer-panel {
    display: grid;
    gap: 16px;
    align-content: start;
    min-width: 0;
    padding: 20px;
    border: 1px solid rgba(214, 167, 86, 0.18);
    border-radius: 8px;
    background:
        linear-gradient(180deg, rgba(34, 22, 13, 0.98), rgba(18, 12, 8, 0.98)),
        #171008;
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.035),
        0 16px 34px rgba(10, 7, 4, 0.26);
}

.client-panel {
    border-left: 3px solid rgba(214, 167, 86, 0.78);
    background:
        linear-gradient(145deg, rgba(119, 66, 25, 0.3), rgba(31, 19, 11, 0.98) 40%),
        #1a1008;
}

.server-panel {
    border-left: 3px solid rgba(177, 112, 52, 0.72);
    background:
        linear-gradient(145deg, rgba(92, 49, 22, 0.28), rgba(29, 18, 11, 0.98) 40%),
        #180f08;
}

.transfer-panel-head {
    display: grid;
    gap: 6px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(214, 167, 86, 0.14);
}

.transfer-panel-head span {
    color: #d6a756;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.transfer-panel-head h3 {
    margin: 0;
    color: #f8fafc;
    font-size: 1.08rem;
    font-weight: 700;
}

.transfer-panel-head p {
    margin: 0;
    color: #94a3b8;
    line-height: 1.55;
}

.flow-note {
    display: grid;
    gap: 5px;
    padding: 12px;
    border: 1px solid rgba(214, 167, 86, 0.16);
    border-radius: 8px;
    background: rgba(18, 15, 11, 0.62);
}

.flow-note strong {
    color: #f8fafc;
    font-size: 0.86rem;
}

.flow-note span {
    color: #94a3b8;
    line-height: 1.55;
}

.key-exchange-box {
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 1px solid rgba(214, 167, 86, 0.22);
    border-radius: 8px;
    background: rgba(18, 15, 11, 0.72);
}

.key-exchange-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(214, 167, 86, 0.14);
}

.key-exchange-head strong {
    color: #f8fafc;
    font-size: 0.92rem;
}

.key-exchange-head span {
    color: #d6a756;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
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

.mono-textarea {
    font-family: "Consolas", "Courier New", monospace;
    font-size: 0.86rem;
    line-height: 1.55;
}

.mono-input {
    font-family: "Consolas", "Courier New", monospace;
    font-size: 0.86rem;
}

.compact-textarea {
    min-height: 72px;
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

.module-actions {
    margin-top: -2px;
    margin-bottom: 18px;
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

.asymmetric-module .input-dark {
    background: #17130f;
    border-color: rgba(214, 167, 86, 0.22);
}

.asymmetric-module .input-dark:focus {
    background: #17130f;
    border-color: rgba(247, 210, 138, 0.58);
    box-shadow: 0 0 0 0.2rem rgba(214, 167, 86, 0.14);
}

.asymmetric-module .btn-main {
    background: linear-gradient(180deg, rgba(122, 83, 31, 0.96), rgba(74, 50, 24, 0.98));
    border-color: rgba(247, 210, 138, 0.48);
    color: #fff3d0;
}

.asymmetric-module .btn-main:hover,
.asymmetric-module .btn-main:focus {
    background: linear-gradient(180deg, rgba(151, 103, 39, 0.98), rgba(88, 57, 23, 0.98));
    border-color: rgba(247, 210, 138, 0.78);
    color: #fff9e8;
}

.asymmetric-module .btn-subtle {
    background: linear-gradient(180deg, rgba(49, 39, 25, 0.96), rgba(24, 20, 15, 0.98));
    border-color: rgba(214, 167, 86, 0.26);
    color: #e8d2a6;
}

.asymmetric-module .btn-subtle:hover,
.asymmetric-module .btn-subtle:focus {
    background: linear-gradient(180deg, rgba(70, 53, 29, 0.98), rgba(34, 27, 18, 0.98));
    border-color: rgba(247, 210, 138, 0.58);
    color: #fff3d0;
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

    .control-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .asymmetric-transfer-grid {
        grid-template-columns: minmax(0, 1fr);
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

    .module-title-line {
        align-items: flex-start;
    }

    .info-popover {
        left: auto;
        right: 0;
        transform: translate(0, 6px);
    }

    .info-hover:hover .info-popover,
    .info-hover:focus-within .info-popover {
        transform: translate(0, 0);
    }

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

    .card-head,
    .key-exchange-head {
        flex-direction: column;
        align-items: flex-start;
    }

    .card-actions {
        justify-content: flex-start;
    }
}
</style>
