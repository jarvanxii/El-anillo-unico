<template>
    <div :class="['feanor-page', 'text-light', { 'feanor-page--tool': !isOverviewPage }]">
        <section v-if="isOverviewPage" class="hero-banner">
            <img src="@/assets/banners/banner-feanor.webp" alt="El Codice de Feanor" />
        </section>

        <div class="container py-5">
            <section v-if="isOverviewPage" class="section-box intro-box">
                <div class="intro-layout">
                    <div class="section-heading">
                        <span class="section-kicker">Criptografia local y parsing tecnico</span>
                        <h1 class="section-name">El Codice de Feanor</h1>
                        <p class="section-copy">
                            Utilidades locales para criptografia aplicada, parsing tecnico, JWT, certificados,
                            codificaciones, secretos, OTP, JSON, regex, esteganografia y metadatos. Todo se ejecuta en
                            el navegador.
                        </p>
                    </div>

                    <div class="intro-emblem">
                        <img src="@/assets/logos/feanor.webp" alt="Sello de Feanor" />
                        <span>32 modulos enlazados</span>
                        <small>Procesamiento en cliente.</small>
                    </div>
                </div>
            </section>

            <section v-if="isOverviewPage" class="section-box utilities-summary">
                <div class="module-header">
                    <span class="section-kicker">Teoria</span>
                    <h2 class="module-title">Base teorica para entender cada herramienta</h2>
                    <p class="module-copy">
                        Antes de usar los laboratorios, estos apartados explican que ocurre por debajo: bytes, XOR,
                        XOR, modulo, hashes, KDF, cifrado autenticado, esteganografia, metadatos, JWT, OTP, claves,
                        firmas y certificados.
                    </p>
                </div>

                <div class="utility-link-grid theory-link-grid">
                    <router-link
                        v-for="topic in feanorTheoryTopics"
                        :key="topic.id"
                        class="utility-link"
                        :to="{ name: topic.routeName }">
                        <span class="mini-badge">{{ topic.badge }}</span>
                        <strong>{{ topic.label }}</strong>
                        <p>{{ topic.summary }}</p>
                    </router-link>
                </div>
            </section>

            <section v-if="isOverviewPage" class="section-box utilities-summary">
                <div class="module-header">
                    <span class="section-kicker">Indice de utilidades</span>
                    <h2 class="module-title">Herramientas ordenadas por complejidad</h2>
                    <p class="module-copy">
                        Elige una utilidad concreta para abrir solo su laboratorio. El resumen y el header comparten el
                        mismo catalogo de datos, asi que las rutas y descripciones se mantienen en un unico sitio.
                    </p>
                </div>

                <div class="utility-group-list">
                    <article v-for="group in feanorUtilityGroups" :key="group.id" class="utility-group">
                        <header class="utility-group-head">
                            <span>{{ group.name }}</span>
                            <p>{{ group.summary }}</p>
                        </header>

                        <div class="utility-link-grid">
                            <router-link
                                v-for="utility in group.utilities"
                                :key="utility.id"
                                class="utility-link"
                                :to="{ name: utility.routeName }">
                                <span class="mini-badge">{{ utility.badge }}</span>
                                <strong>{{ utility.label }}</strong>
                                <p>{{ utility.description }}</p>
                            </router-link>
                        </div>
                    </article>
                </div>
            </section>

            <section v-if="isModuleVisible('caesar')" class="section-box caesar-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 01</span>
                    <h2 class="module-title">Cifrado Cesar</h2>
                    <p class="module-copy">
                        Aplica desplazamientos clasicos con logica normal o inversa, eligiendo alfabeto espanol con
                        <code class="inline-code">Ñ</code> o alfabeto ingles. Las letras conservan mayusculas y el resto
                        del texto queda intacto.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="caesar-alphabet">Alfabeto</label>
                        <select id="caesar-alphabet" v-model="caesarAlphabet" class="form-select input-dark">
                            <option v-for="item in caesarAlphabets" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="caesar-logic">Logica</label>
                        <select id="caesar-logic" v-model="caesarLogic" class="form-select input-dark">
                            <option v-for="item in caesarLogicModes" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="caesar-shift">Numero de caracteres</label>
                        <input
                            id="caesar-shift"
                            v-model.number="caesarShift"
                            type="number"
                            min="0"
                            step="1"
                            class="form-control input-dark"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="caesar-input">Texto</label>
                        <textarea
                            id="caesar-input"
                            v-model="caesarInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Texto plano o texto cifrado con Cesar"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runCaesarCipher">Aplicar Cesar</button>
                    <button class="btn btn-subtle" @click="toggleCaesarLogic">Invertir logica</button>
                    <button class="btn btn-subtle" @click="useCaesarOutputAsInput">Pasar salida a entrada</button>
                    <button class="btn btn-subtle" @click="fillCaesarExample">Cargar ejemplo</button>
                </div>
                <p class="helper-copy">
                    La logica normal avanza en el alfabeto; la inversa retrocede el mismo numero de caracteres.
                </p>

                <FeanorResultPanel v-if="caesarResult" :result="caesarResult" icon="CES" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('atbash')" class="section-box atbash-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 02</span>
                    <h2 class="module-title">Cifrado Atbash</h2>
                    <p class="module-copy">
                        Sustitucion por espejo del alfabeto: la primera letra se cambia por la ultima, la segunda por la
                        penultima, y asi sucesivamente. La misma operacion cifra y descifra.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="atbash-alphabet">Alfabeto</label>
                        <select id="atbash-alphabet" v-model="atbashAlphabet" class="form-select input-dark">
                            <option v-for="item in caesarAlphabets" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="atbash-input">Texto</label>
                        <textarea
                            id="atbash-input"
                            v-model="atbashInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Texto plano o texto Atbash"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runAtbashCipher">Aplicar Atbash</button>
                    <button class="btn btn-subtle" @click="useAtbashOutputAsInput">Pasar salida a entrada</button>
                    <button class="btn btn-subtle" @click="fillAtbashExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="atbashResult" :result="atbashResult" icon="ATB" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('booleanOps')" class="section-box boolean-ops-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 03</span>
                    <h2 class="module-title">XOR, NOR y puertas logicas</h2>
                    <p class="module-copy">
                        Integra el antiguo laboratorio XOR con AND, OR, NAND, NOR, XNOR y NOT sobre binario, Hex, texto
                        UTF-8/UTF-16 o bytes decimales. XOR conserva la lectura reversible
                        <code class="inline-code">P XOR K XOR K = P</code>; NOR muestra la puerta universal no reversible.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="boolean-operation">Operacion</label>
                        <select id="boolean-operation" v-model="booleanOperation" class="form-select input-dark">
                            <option v-for="item in booleanOperations" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="boolean-mode">Formato</label>
                        <select id="boolean-mode" v-model="booleanInputMode" class="form-select input-dark">
                            <option v-for="item in xorInputModes" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div v-if="booleanOperation !== 'not'" class="control-field">
                        <label class="field-label" for="boolean-repeat">Clave corta</label>
                        <select id="boolean-repeat" v-model="booleanRepeatKey" class="form-select input-dark">
                            <option :value="false">Exigir misma longitud</option>
                            <option :value="true">Repetir B como mascara</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="boolean-left">A</label>
                        <textarea
                            id="boolean-left"
                            v-model="booleanLeft"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Ejemplo binario: 1010"
                        ></textarea>
                    </div>
                    <div v-if="booleanOperation !== 'not'" class="control-field full-span">
                        <label class="field-label" for="boolean-right">B / mascara</label>
                        <textarea
                            id="boolean-right"
                            v-model="booleanRight"
                            class="form-control input-dark textarea-dark"
                            rows="4"
                            placeholder="Ejemplo binario: 1100"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runBooleanLab">Calcular</button>
                    <button class="btn btn-subtle" @click="useBooleanOutputAsInput">Pasar resultado a A</button>
                    <button class="btn btn-subtle" @click="fillBooleanXorExample">Cargar ejemplo XOR</button>
                    <button class="btn btn-subtle" @click="fillBooleanExample">Cargar ejemplo NOR</button>
                </div>

                <FeanorResultPanel v-if="booleanResult" :result="booleanResult" icon="NOR" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('vigenere')" class="section-box vigenere-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 04</span>
                    <h2 class="module-title">Cifrado Vigenere</h2>
                    <p class="module-copy">
                        Usa una clave alfabetica repetida para aplicar un desplazamiento distinto a cada letra. Es un
                        Cesar polialfabetico y deja intactos espacios, signos y caracteres fuera del alfabeto.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="vigenere-alphabet">Alfabeto</label>
                        <select id="vigenere-alphabet" v-model="vigenereAlphabet" class="form-select input-dark">
                            <option v-for="item in caesarAlphabets" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="vigenere-direction">Operacion</label>
                        <select id="vigenere-direction" v-model="vigenereDirection" class="form-select input-dark">
                            <option value="encrypt">Cifrar</option>
                            <option value="decrypt">Descifrar</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="vigenere-key">Clave</label>
                        <input id="vigenere-key" v-model="vigenereKey" class="form-control input-dark" placeholder="feanor" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="vigenere-input">Texto</label>
                        <textarea
                            id="vigenere-input"
                            v-model="vigenereInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Texto plano o cifrado Vigenere"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runVigenereCipher">Ejecutar</button>
                    <button class="btn btn-subtle" @click="toggleVigenereDirection">Invertir operacion</button>
                    <button class="btn btn-subtle" @click="useVigenereOutputAsInput">Pasar salida a entrada</button>
                    <button class="btn btn-subtle" @click="fillVigenereExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="vigenereResult" :result="vigenereResult" icon="VIG" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('affine')" class="section-box affine-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 05</span>
                    <h2 class="module-title">Cifrado Afin</h2>
                    <p class="module-copy">
                        Sustitucion matematica sobre posiciones de alfabeto: cifrar usa <code class="inline-code">E(x) =
                        (a*x + b) mod m</code>. Para descifrar, <code class="inline-code">a</code> debe tener inverso
                        modular.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="affine-alphabet">Alfabeto</label>
                        <select id="affine-alphabet" v-model="affineAlphabet" class="form-select input-dark">
                            <option v-for="item in caesarAlphabets" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="affine-direction">Operacion</label>
                        <select id="affine-direction" v-model="affineDirection" class="form-select input-dark">
                            <option value="encrypt">Cifrar</option>
                            <option value="decrypt">Descifrar</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="affine-a">a</label>
                        <input id="affine-a" v-model.number="affineA" type="number" step="1" class="form-control input-dark" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="affine-b">b</label>
                        <input id="affine-b" v-model.number="affineB" type="number" step="1" class="form-control input-dark" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="affine-input">Texto</label>
                        <textarea
                            id="affine-input"
                            v-model="affineInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Texto plano o cifrado Afin"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runAffineCipher">Ejecutar Afin</button>
                    <button class="btn btn-subtle" @click="toggleAffineDirection">Invertir operacion</button>
                    <button class="btn btn-subtle" @click="useAffineOutputAsInput">Pasar salida a entrada</button>
                    <button class="btn btn-subtle" @click="fillAffineExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="affineResult" :result="affineResult" icon="AFN" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('railFence')" class="section-box rail-fence-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 06</span>
                    <h2 class="module-title">Cifrado Rail Fence</h2>
                    <p class="module-copy">
                        Transposicion en zigzag: el texto baja y sube por varios railes, y el cifrado se lee por filas.
                        No cambia letras, solo su posicion.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="rail-direction">Operacion</label>
                        <select id="rail-direction" v-model="railFenceDirection" class="form-select input-dark">
                            <option value="encrypt">Cifrar</option>
                            <option value="decrypt">Descifrar</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="rail-count">Railes</label>
                        <input id="rail-count" v-model.number="railFenceRails" type="number" min="2" max="16" step="1" class="form-control input-dark" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="rail-input">Texto</label>
                        <textarea
                            id="rail-input"
                            v-model="railFenceInput"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Texto plano o cifrado por transposicion"
                        ></textarea>
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runRailFenceCipher">Ejecutar Rail Fence</button>
                    <button class="btn btn-subtle" @click="toggleRailFenceDirection">Invertir operacion</button>
                    <button class="btn btn-subtle" @click="useRailFenceOutputAsInput">Pasar salida a entrada</button>
                    <button class="btn btn-subtle" @click="fillRailFenceExample">Cargar ejemplo</button>
                </div>

                <FeanorResultPanel v-if="railFenceResult" :result="railFenceResult" icon="RFL" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('modular')" class="section-box modular-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 07</span>
                    <h2 class="module-title">Operacion modular</h2>
                    <p class="module-copy">
                        Calcula restos con enteros grandes y, si quieres, potencia modular. Es la aritmetica circular
                        que aparece en RSA, Diffie-Hellman, curvas elipticas y muchos ejercicios criptograficos.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="modular-operation">Operacion</label>
                        <select id="modular-operation" v-model="modularOperation" class="form-select input-dark">
                            <option value="mod">A % N</option>
                            <option value="pow">A^E % N</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="modular-base">A</label>
                        <input id="modular-base" v-model="modularBase" class="form-control input-dark mono-input" placeholder="118613842" />
                    </div>
                    <div v-if="modularOperation === 'pow'" class="control-field">
                        <label class="field-label" for="modular-exponent">E</label>
                        <input id="modular-exponent" v-model="modularExponent" class="form-control input-dark mono-input" placeholder="65537" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="modular-modulus">N / Modulo</label>
                        <input id="modular-modulus" v-model="modularModulus" class="form-control input-dark mono-input" placeholder="9091" />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runModularLab">Calcular</button>
                    <button class="btn btn-subtle" @click="fillModularExample">Ejemplo grande</button>
                    <button class="btn btn-subtle" @click="fillModuloSimpleExample">Ejemplo 60 % 12</button>
                </div>

                <FeanorResultPanel v-if="modularResult" :result="modularResult" icon="MOD" @copy="copyText" />
            </section>

            <section v-if="isHashToolVisible" class="section-box hash-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 20</span>
                    <h2 class="module-title">{{ activeHashToolConfig.title }}</h2>
                    <p class="module-copy">{{ activeHashToolConfig.copy }}</p>
                </div>

                <div class="control-grid">
                    <div v-if="activeHashToolConfig.showMode" class="control-field">
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
                        <label class="field-label" for="hash-input-kind">Entrada</label>
                        <select id="hash-input-kind" v-model="hashInputKind" class="form-select input-dark">
                            <option value="text">Texto</option>
                            <option value="file">Fichero</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="hash-text-encoding">Codificacion entrada</label>
                        <select id="hash-text-encoding" v-model="hashTextEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
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
                    <div v-if="hashInputKind === 'file'" class="control-field full-span">
                        <label class="field-label" for="hash-file">Fichero</label>
                        <input
                            id="hash-file"
                            class="form-control input-dark"
                            type="file"
                            accept="*/*"
                            @change="handleHashFile"
                        />
                    </div>
                    <div v-else class="control-field full-span">
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
                    <div v-if="hashMode === 'hmac'" class="control-field">
                        <label class="field-label" for="hash-secret-encoding">Codificacion clave</label>
                        <select id="hash-secret-encoding" v-model="hashSecretEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
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
                    {{ activeHashToolConfig.helper }}
                </p>

                <FeanorResultPanel v-if="hashResult" :result="hashResult" icon="HASH" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('symmetric')" class="section-box symmetric-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 24</span>
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

                <FeanorResultPanel v-if="cipherResult" :result="cipherResult" icon="CIPH" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('asymmetric')" class="section-box asymmetric-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 28</span>
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

                <FeanorResultPanel v-if="asymmetricResult" :result="asymmetricResult" icon="RSA" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('signature')" class="section-box signature-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 29</span>
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
                    <div class="control-field">
                        <label class="field-label" for="signature-text-encoding">Codificacion mensaje</label>
                        <select id="signature-text-encoding" v-model="signatureTextEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
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

            <section v-if="isModuleVisible('aead')" class="section-box aead-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 25</span>
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
                    <div class="control-field">
                        <label class="field-label" for="aead-text-encoding">Codificacion texto/AAD</label>
                        <select id="aead-text-encoding" v-model="aeadTextEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
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

            <section v-if="isModuleVisible('ecdh')" class="section-box ecdh-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 30</span>
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

            <section v-if="isKdfToolVisible" class="section-box kdf-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 21</span>
                    <h2 class="module-title">{{ activeKdfToolConfig.title }}</h2>
                    <p class="module-copy">{{ activeKdfToolConfig.copy }}</p>
                </div>

                <div class="control-grid">
                    <div v-if="activeKdfToolConfig.showMode" class="control-field">
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
                        <label class="field-label" for="kdf-text-encoding">Codificacion material</label>
                        <select id="kdf-text-encoding" v-model="kdfTextEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div v-if="kdfMode === 'PBKDF2'" class="control-field">
                        <label class="field-label" for="kdf-iterations">Iteraciones PBKDF2</label>
                        <input id="kdf-iterations" v-model.number="kdfIterations" type="number" min="1000" step="1000" class="form-control input-dark" />
                    </div>
                    <div v-if="kdfMode === 'HKDF'" class="control-field full-span">
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

            <section v-if="isModuleVisible('certificate')" class="section-box certificate-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 32</span>
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

            <section v-if="isModuleVisible('keyConverter')" class="section-box key-converter-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 31</span>
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

            <section v-if="isModuleVisible('jwt')" class="section-box jwt-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 27</span>
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

                <FeanorResultPanel v-if="jwtResult" :result="jwtResult" icon="JWT" @copy="copyText" />
            </section>

            <section v-if="isTransformToolVisible" class="section-box transform-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 08</span>
                    <h2 class="module-title">{{ activeTransformToolConfig.title }}</h2>
                    <p class="module-copy">{{ activeTransformToolConfig.copy }}</p>
                </div>

                <div class="mode-segment" role="tablist" aria-label="Modo de transformacion">
                    <button
                        type="button"
                        :class="{ active: transformDirection === 'encode' }"
                        @click="setTransformDirection('encode')"
                    >
                        Codificar
                    </button>
                    <button
                        type="button"
                        :class="{ active: transformDirection === 'decode' }"
                        @click="setTransformDirection('decode')"
                    >
                        Decodificar
                    </button>
                </div>

                <div class="base64-category-grid">
                    <button
                        v-for="category in visibleTransformCategories"
                        :key="category.value"
                        type="button"
                        :class="['category-chip', { active: transformCategory === category.value }]"
                        @click="selectTransformCategory(category.value)"
                    >
                        <span>{{ category.badge }}</span>
                        <strong>{{ category.label }}</strong>
                        <small>{{ category.description }}</small>
                    </button>
                </div>

                <div class="control-grid">
                    <div v-if="currentTransformCategory.formats.length > 1" class="control-field">
                        <label class="field-label" for="transform-format">Formato</label>
                        <select id="transform-format" v-model="transformFormat" class="form-select input-dark">
                            <option v-for="item in currentTransformCategory.formats" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div v-if="isTransformEncodingControlVisible" class="control-field">
                        <label class="field-label" for="transform-text-encoding">Codificacion texto</label>
                        <select id="transform-text-encoding" v-model="transformTextEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div v-if="isTransformFileCategory && transformDirection === 'encode'" class="control-field full-span">
                        <label class="field-label" for="transform-file">Fichero</label>
                        <input
                            id="transform-file"
                            class="form-control input-dark"
                            type="file"
                            :accept="currentTransformAccept"
                            @change="handleTransformFile"
                        />
                    </div>
                    <div v-if="isTransformTextInputVisible" class="control-field full-span">
                        <label class="field-label" for="transform-input">Entrada</label>
                        <textarea
                            id="transform-input"
                            v-model="transformInput"
                            class="form-control input-dark textarea-dark"
                            rows="6"
                            :placeholder="transformPlaceholder"
                        ></textarea>
                    </div>
                    <div v-if="isTransformFileCategory && transformDirection === 'decode'" class="control-field">
                        <label class="field-label" for="transform-output-name">Nombre de descarga</label>
                        <input
                            id="transform-output-name"
                            v-model="transformDecodedFileName"
                            class="form-control input-dark"
                            placeholder="salida.png, audio.mp3, video.mp4..."
                        />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runTransform">
                        {{ transformDirection === "encode" ? "Codificar" : "Decodificar" }}
                    </button>
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
                    <a
                        v-if="transformDownloadUrl"
                        class="btn btn-main"
                        :href="transformDownloadUrl"
                        :download="transformDownloadName"
                    >
                        Descargar fichero
                    </a>
                </div>

                <div v-if="transformPreview" class="transform-preview-panel">
                    <div class="card-head">
                        <h5>Previsualizacion</h5>
                        <span class="mini-badge">{{ transformPreview.kind }}</span>
                    </div>
                    <img v-if="transformPreview.kind === 'image'" :src="transformPreview.url" alt="Preview Base64" />
                    <audio v-else-if="transformPreview.kind === 'audio'" :src="transformPreview.url" controls></audio>
                    <video v-else-if="transformPreview.kind === 'video'" :src="transformPreview.url" controls></video>
                    <iframe v-else-if="transformPreview.kind === 'pdf'" :src="transformPreview.url" title="Preview PDF"></iframe>
                    <a v-else :href="transformPreview.url" :download="transformDownloadName">Abrir fichero generado</a>
                </div>

                <FeanorResultPanel v-if="transformResult" :result="transformResult" icon="XFRM" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('byte')" class="section-box byte-inspector-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 09</span>
                    <h2 class="module-title">Inspector de bytes y encoding</h2>
                    <p class="module-copy">
                        Descompone texto o bytes en UTF-8, UTF-16, ASCII, Latin-1, Windows-1252, Hex, Base64, Base64URL, binario y decimal. Sirve para ver
                        exactamente que bytes existen antes de hashear, firmar, cifrar o parsear.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="byte-input-mode">Entrada</label>
                        <select id="byte-input-mode" v-model="byteInputMode" class="form-select input-dark">
                            <option value="text">Texto UTF-8</option>
                            <option value="text-utf16le">Texto UTF-16LE</option>
                            <option value="text-utf16be">Texto UTF-16BE</option>
                            <option value="text-ascii">Texto ASCII</option>
                            <option value="text-latin1">Texto Latin-1</option>
                            <option value="text-windows1252">Texto Windows-1252</option>
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

            <section v-if="isModuleVisible('json')" class="section-box json-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 11</span>
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

                <FeanorResultPanel v-if="jsonResult" :result="jsonResult" icon="JSON" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('stegoAnalyze')" class="section-box stego-analyze-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 12</span>
                    <h2 class="module-title">Analizador de esteganografia y metadatos</h2>
                    <p class="module-copy">
                        Inspecciona ficheros en cliente para detectar tipo real, magic bytes, entropia, cadenas
                        imprimibles, metadatos habituales y senales compatibles con datos ocultos usando Web APIs,
                        exifr y JSZip.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field full-span">
                        <label class="field-label" for="stego-analyze-file">Fichero a analizar</label>
                        <input
                            id="stego-analyze-file"
                            class="form-control input-dark"
                            type="file"
                            accept="image/*,audio/*,video/*,.pdf,.zip,.docx,.xlsx,.pptx,.epub,.txt,.json,.csv,.svg,.xml,.mp3,.wav,.flac,.ogg,.m4a,.mp4,.mov,.webm,.mkv,.avi,.webp,.gif,.bmp,.tif,.tiff,.heic,.heif"
                            @change="handleStegoAnalyzeFile"
                        />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="analyzeStegoFile">Analizar fichero</button>
                    <button class="btn btn-subtle" @click="clearStegoAnalyze">Limpiar analisis</button>
                </div>
                <p class="helper-copy">
                    El analisis es orientativo: puede encontrar indicios y metadatos, pero no puede demostrar que un
                    fichero este completamente libre de informacion oculta.
                </p>

                <FeanorResultPanel v-if="stegoAnalyzeResult" :result="stegoAnalyzeResult" icon="META" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('exif')" class="section-box exif-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 13</span>
                    <h2 class="module-title">Analizador EXIF y metadatos de imagen</h2>
                    <p class="module-copy">
                        Extrae metadatos EXIF, XMP, IPTC, GPS e ICC de imagenes locales y los organiza por contexto:
                        fichero, camara, lente, captura, ubicacion, software y campos crudos.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field full-span">
                        <label class="field-label" for="exif-file">Imagen</label>
                        <input
                            id="exif-file"
                            class="form-control input-dark"
                            type="file"
                            accept="image/jpeg,image/tiff,image/heic,image/heif,image/png,image/webp,image/avif,image/*,.jpg,.jpeg,.png,.webp,.tif,.tiff,.heic,.heif,.avif,.dng,.cr2,.cr3,.arw,.nef,.orf,.rw2,.raf,.pef"
                            @change="handleExifFile"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="exif-profile">Perfil de lectura</label>
                        <select id="exif-profile" v-model="exifProfile" class="form-select input-dark">
                            <option v-for="item in exifProfiles" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="exif-detail-mode">Vista</label>
                        <select id="exif-detail-mode" v-model="exifDetailMode" class="form-select input-dark">
                            <option v-for="item in exifDetailModes" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="exif-tag-filter">Filtro de tags</label>
                        <input
                            id="exif-tag-filter"
                            v-model="exifTagFilter"
                            class="form-control input-dark"
                            placeholder="gps, author, software, serial, xmp, app1..."
                        />
                    </div>
                </div>

                <div class="metadata-format-strip exif-format-strip">
                    <span class="mini-badge">{{ selectedExifProfile.badge }}</span>
                    <strong>{{ selectedExifProfile.command }}</strong>
                    <p>{{ selectedExifProfile.note }}</p>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="analyzeExifFile">Analizar EXIF</button>
                    <button class="btn btn-subtle" @click="clearExifAnalysis">Limpiar</button>
                    <a
                        v-if="exifTxtDownloadUrl"
                        class="btn btn-main"
                        :href="exifTxtDownloadUrl"
                        :download="exifTxtDownloadName"
                    >
                        Descargar TXT
                    </a>
                    <a
                        v-if="exifJsonDownloadUrl"
                        class="btn btn-subtle"
                        :href="exifJsonDownloadUrl"
                        :download="exifJsonDownloadName"
                    >
                        Descargar JSON
                    </a>
                </div>
                <p class="helper-copy">
                    Inspirado en ExifTool: agrupa tags, permite filtrar por nombre/grupo/valor y genera un reporte local.
                    No ejecuta ExifTool real; todo se calcula con Web APIs, exifr y lectura binaria en cliente.
                </p>

                <FeanorResultPanel v-if="exifResult" :result="exifResult" icon="EXIF" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('metadataEditor')" class="section-box metadata-editor-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 14</span>
                    <h2 class="module-title">Editor de metadatos por fichero</h2>
                    <p class="module-copy">
                        Sube un fichero, elige su contenedor y escribe metadatos de laboratorio. MP3, WAV, PNG, JPEG y
                        SVG se modifican directamente en el navegador; el resto genera sidecar tecnico para no romper
                        formatos complejos.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-type">Tipo de fichero</label>
                        <select id="metadata-editor-type" v-model="metadataEditorType" class="form-select input-dark">
                            <option v-for="item in metadataEditorTypes" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-mode">Modo</label>
                        <select id="metadata-editor-mode" v-model="metadataEditorMode" class="form-select input-dark">
                            <option value="auto">Auto: directo si es seguro</option>
                            <option value="direct">Modificar el fichero</option>
                            <option value="sidecar">Crear sidecar XMP/JSON</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="metadata-editor-file">Fichero</label>
                        <input
                            id="metadata-editor-file"
                            class="form-control input-dark"
                            type="file"
                            :accept="metadataEditorAccept"
                            @change="handleMetadataEditorFile"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-title">Titulo</label>
                        <input id="metadata-editor-title" v-model="metadataEditorTitle" class="form-control input-dark" placeholder="Informe, pista, imagen..." />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-author">Autor / artista</label>
                        <input id="metadata-editor-author" v-model="metadataEditorAuthor" class="form-control input-dark" placeholder="Equipo, alias o laboratorio" />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-copyright">Copyright</label>
                        <input id="metadata-editor-copyright" v-model="metadataEditorCopyright" class="form-control input-dark" placeholder="CC BY, interno, publico..." />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-language">Idioma</label>
                        <select id="metadata-editor-language" v-model="metadataEditorLanguage" class="form-select input-dark">
                            <option value="spa">Espanol</option>
                            <option value="eng">Ingles</option>
                            <option value="und">Sin declarar</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="metadata-editor-description">Descripcion / comentario</label>
                        <textarea
                            id="metadata-editor-description"
                            v-model="metadataEditorDescription"
                            class="form-control input-dark textarea-dark compact-textarea"
                            rows="3"
                            placeholder="Comentario visible para visores de metadatos"
                        ></textarea>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-encoding">Codificar payload como</label>
                        <select id="metadata-editor-encoding" v-model="metadataEditorPayloadEncoding" class="form-select input-dark">
                            <option v-for="item in metadataPayloadEncodings" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="metadata-editor-tags">Etiquetas</label>
                        <input id="metadata-editor-tags" v-model="metadataEditorTags" class="form-control input-dark" placeholder="ctf, forense, privado" />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="metadata-editor-payload">Texto codificado a insertar</label>
                        <textarea
                            id="metadata-editor-payload"
                            v-model="metadataEditorPayload"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            placeholder="Mensaje que se guardara en ID3 TXXX, PNG iTXt, JPEG COM, SVG metadata o WAV INFO"
                        ></textarea>
                    </div>
                </div>

                <div class="metadata-format-strip">
                    <span class="mini-badge">{{ selectedMetadataEditorType.family }}</span>
                    <strong>{{ selectedMetadataEditorType.container }}</strong>
                    <p>{{ selectedMetadataEditorType.note }}</p>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runMetadataEditor">Generar fichero</button>
                    <button class="btn btn-subtle" @click="fillMetadataEditorExample">Cargar ejemplo</button>
                    <button class="btn btn-subtle" @click="clearMetadataEditor">Limpiar</button>
                    <a
                        v-if="metadataEditorDownloadUrl"
                        class="btn btn-main"
                        :href="metadataEditorDownloadUrl"
                        :download="metadataEditorDownloadName"
                    >
                        Descargar resultado
                    </a>
                </div>
                <p class="helper-copy">
                    Para MP3 se escribe una etiqueta ID3v2.4 nueva al inicio y el payload viaja en TXXX. En formatos no
                    directos se crea sidecar para practicar sin corromper contenedores como PDF, MP4, Office o WebM.
                </p>

                <FeanorResultPanel v-if="metadataEditorResult" :result="metadataEditorResult" icon="EDIT" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('stegoEmbed')" class="section-box stego-embed-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 15</span>
                    <h2 class="module-title">Incrustar datos en ficheros</h2>
                    <p class="module-copy">
                        Oculta texto, JSON, Base64 o ficheros completos dentro de portadores de imagen, audio,
                        documentos, archivos o binarios. Elige LSB, PNG iTXt, footer universal o paquete ZIP segun el
                        tipo de prueba que quieras hacer.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="stego-embed-carrier-kind">Tipo portador</label>
                        <select id="stego-embed-carrier-kind" v-model="stegoEmbedCarrierHint" class="form-select input-dark">
                            <option v-for="item in stegoCarrierHints" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="stego-embed-mode">Metodo</label>
                        <select id="stego-embed-mode" v-model="stegoEmbedMode" class="form-select input-dark">
                            <option v-for="item in stegoEmbedModes" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="stego-embed-file">Fichero portador</label>
                        <input
                            id="stego-embed-file"
                            class="form-control input-dark"
                            type="file"
                            accept="*/*"
                            @change="handleStegoEmbedFile"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="stego-payload-source">Tipo de datos incrustados</label>
                        <select id="stego-payload-source" v-model="stegoEmbedPayloadSource" class="form-select input-dark">
                            <option v-for="item in stegoPayloadSources" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div v-if="['text', 'json'].includes(stegoEmbedPayloadSource)" class="control-field">
                        <label class="field-label" for="stego-payload-encoding">Codificacion texto</label>
                        <select id="stego-payload-encoding" v-model="stegoEmbedTextEncoding" class="form-select input-dark">
                            <option v-for="item in textEncodingOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div v-if="stegoEmbedPayloadSource === 'file'" class="control-field full-span">
                        <label class="field-label" for="stego-payload-file">Fichero a ocultar</label>
                        <input
                            id="stego-payload-file"
                            class="form-control input-dark"
                            type="file"
                            accept="*/*"
                            @change="handleStegoPayloadFile"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="stego-embed-payload">Datos a ocultar</label>
                        <textarea
                            v-if="stegoEmbedPayloadSource !== 'file'"
                            id="stego-embed-payload"
                            v-model="stegoEmbedPayload"
                            class="form-control input-dark textarea-dark"
                            rows="5"
                            :placeholder="stegoPayloadPlaceholder"
                        ></textarea>
                        <input
                            v-else
                            id="stego-embed-payload-name"
                            v-model="stegoEmbedPayloadName"
                            class="form-control input-dark"
                            placeholder="Nombre interno opcional, por ejemplo secreto.bin"
                        />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="embedStegoPayload">Incrustar datos</button>
                    <button class="btn btn-subtle" @click="fillStegoPayloadExample">Cargar ejemplo</button>
                    <button class="btn btn-subtle" @click="clearStegoEmbed">Limpiar incrustacion</button>
                    <a
                        v-if="stegoEmbedDownloadUrl"
                        class="btn btn-main"
                        :href="stegoEmbedDownloadUrl"
                        :download="stegoEmbedDownloadName"
                    >
                        Descargar resultado
                    </a>
                </div>
                <p class="helper-copy">
                    Auto usa LSB en imagenes cuando el navegador puede dibujarlas, LSB directo en BMP/WAV/AU, iTXt en
                    PNG si lo eliges y footer/ZIP para cualquier otro fichero. Esto oculta, no cifra.
                </p>

                <FeanorResultPanel v-if="stegoEmbedResult" :result="stegoEmbedResult" icon="LSB+" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('stegoExtract')" class="section-box stego-extract-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 16</span>
                    <h2 class="module-title">Extraer datos ocultos de ficheros</h2>
                    <p class="module-copy">
                        Recupera paquetes Feanor desde footer universal, PNG iTXt, LSB de imagenes, BMP/WAV/AU directos
                        y bundles ZIP generados por el laboratorio.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field full-span">
                        <label class="field-label" for="stego-extract-file">Fichero a extraer</label>
                        <input
                            id="stego-extract-file"
                            class="form-control input-dark"
                            type="file"
                            accept="*/*"
                            @change="handleStegoExtractFile"
                        />
                    </div>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="extractStegoPayload">Extraer datos</button>
                    <button class="btn btn-subtle" @click="clearStegoExtract">Limpiar extraccion</button>
                    <a
                        v-if="stegoExtractDownloadUrl"
                        class="btn btn-main"
                        :href="stegoExtractDownloadUrl"
                        :download="stegoExtractDownloadName"
                    >
                        Descargar payload
                    </a>
                </div>
                <p class="helper-copy">
                    Si una imagen fue recomprimida como JPEG o redimensionada, los bits LSB pueden haberse perdido. Los
                    footer universales sobreviven peor ante herramientas que reescriben el contenedor.
                </p>

                <FeanorResultPanel v-if="stegoExtractResult" :result="stegoExtractResult" icon="LSB-" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('steghideSuite')" class="section-box steghide-suite-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 17</span>
                    <h2 class="module-title">Steghide y StegSeek frontend</h2>
                    <p class="module-copy">
                        Laboratorio inspirado en <code class="inline-code">steghide</code> y
                        <code class="inline-code">stegseek</code>: calcula capacidad, incrusta, extrae, prueba
                        diccionarios y genera comandos nativos. En navegador usa un formato compatible de laboratorio
                        con LSB pseudoaleatorio, AES-GCM, PBKDF2 y CRC32.
                    </p>
                </div>

                <div class="control-grid">
                    <div class="control-field">
                        <label class="field-label" for="steghide-operation">Operacion</label>
                        <select id="steghide-operation" v-model="steghideOperation" class="form-select input-dark">
                            <option v-for="item in steghideOperations" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-encryption">Cifrado frontend</label>
                        <select id="steghide-encryption" v-model="steghideEncryption" class="form-select input-dark">
                            <option value="aes-gcm">AES-GCM + PBKDF2</option>
                            <option value="none">Sin cifrado</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="steghide-cover-file">Cover / stego file</label>
                        <input
                            id="steghide-cover-file"
                            class="form-control input-dark"
                            type="file"
                            accept=".jpg,.jpeg,.bmp,.wav,.au,.snd,.png,.webp,image/*,audio/wav,audio/basic"
                            @change="handleSteghideFile"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="steghide-secret-file">Embedded file</label>
                        <input
                            id="steghide-secret-file"
                            class="form-control input-dark"
                            type="file"
                            @change="handleSteghideSecretFile"
                        />
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="steghide-passphrase">Passphrase</label>
                        <input
                            id="steghide-passphrase"
                            v-model="steghidePassphrase"
                            class="form-control input-dark"
                            type="password"
                            autocomplete="off"
                            placeholder="Clave para derivar posiciones y, si procede, cifrar el payload"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-compression">Compresion</label>
                        <select id="steghide-compression" v-model="steghideCompression" class="form-select input-dark">
                            <option value="auto">Auto deflate si el navegador lo soporta</option>
                            <option value="none">-Z / no comprimir</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-compression-level">Nivel -z</label>
                        <input
                            id="steghide-compression-level"
                            v-model.number="steghideCompressionLevel"
                            class="form-control input-dark"
                            type="number"
                            min="1"
                            max="9"
                            step="1"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-crc">Checksum</label>
                        <select id="steghide-crc" v-model="steghideChecksum" class="form-select input-dark">
                            <option :value="true">CRC32 activo</option>
                            <option :value="false">-K / sin checksum</option>
                        </select>
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-name">Nombre embebido</label>
                        <select id="steghide-name" v-model="steghideStoreName" class="form-select input-dark">
                            <option :value="true">Guardar nombre original</option>
                            <option :value="false">-N / no guardar nombre</option>
                        </select>
                    </div>
                    <div class="control-field full-span">
                        <label class="field-label" for="steghide-wordlist-file">Wordlist para crack</label>
                        <input
                            id="steghide-wordlist-file"
                            class="form-control input-dark"
                            type="file"
                            accept=".txt,.lst,.dic,text/plain"
                            @change="handleSteghideWordlistFile"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-max-guesses">Max. intentos</label>
                        <input
                            id="steghide-max-guesses"
                            v-model.number="steghideMaxGuesses"
                            class="form-control input-dark"
                            type="number"
                            min="1"
                            step="100"
                        />
                    </div>
                    <div class="control-field">
                        <label class="field-label" for="steghide-default-guesses">Guesses extra</label>
                        <select id="steghide-default-guesses" v-model="steghideSkipDefaultGuesses" class="form-select input-dark">
                            <option :value="false">Como StegSeek: anadir vacia/nombres</option>
                            <option :value="true">Solo wordlist</option>
                        </select>
                    </div>
                </div>

                <div class="metadata-format-strip steghide-format-strip">
                    <span class="mini-badge">{{ selectedSteghideOperation.badge }}</span>
                    <strong>{{ selectedSteghideOperation.command }}</strong>
                    <p>{{ selectedSteghideOperation.note }}</p>
                </div>

                <div class="inline-actions">
                    <button class="btn btn-main" @click="runSteghideInfo">Info / capacidad</button>
                    <button class="btn btn-main" @click="embedSteghidePayload">Incrustar</button>
                    <button class="btn btn-subtle" @click="extractSteghidePayload">Extraer</button>
                    <button class="btn btn-subtle" @click="crackSteghideWordlist">Crack wordlist</button>
                    <button class="btn btn-subtle" @click="runSteghideSeedProbe">Seed / probe</button>
                    <button class="btn btn-subtle" @click="fillSteghideExample">Cargar ejemplo</button>
                    <button class="btn btn-subtle" @click="clearSteghideLab">Limpiar</button>
                    <a
                        v-if="steghideDownloadUrl"
                        class="btn btn-main"
                        :href="steghideDownloadUrl"
                        :download="steghideDownloadName"
                    >
                        Descargar salida
                    </a>
                </div>
                <p class="helper-copy">
                    Compatibilidad nativa: Steghide real soporta JPEG, BMP, WAV y AU. Este laboratorio reimplementa el
                    flujo completo posible en frontend; JPEG exacto, matching de Steghide y el seed bruteforce completo
                    de 2^32 quedan documentados como comandos nativos porque requieren el motor original o WASM dedicado.
                </p>

                <FeanorResultPanel v-if="steghideResult" :result="steghideResult" icon="STEG" @copy="copyText" />
            </section>

            <section v-if="isModuleVisible('jsonSign')" class="section-box json-sign-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 23</span>
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

            <section v-if="isModuleVisible('secret')" class="section-box secret-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 18</span>
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

                            <FeanorResultPanel v-if="secretResult" :result="secretResult" icon="KEY" @copy="copyText" />
                        </div>
            </section>

            <section v-if="isModuleVisible('entropy')" class="section-box entropy-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 19</span>
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

            <section v-if="isModuleVisible('otp')" class="section-box otp-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 26</span>
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

            <section v-if="isModuleVisible('timing')" class="section-box timing-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 22</span>
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

            <section v-if="isModuleVisible('regex')" class="section-box regex-module">
                <div class="module-header">
                    <span class="section-kicker">Modulo 10</span>
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

                            <FeanorResultPanel v-if="regexResult" :result="regexResult" icon="REGX" @copy="copyText" />
                        </div>
            </section>

            <section v-if="clipboardNotice" class="copy-toast">
                {{ clipboardNotice }}
            </section>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import CryptoJS from "crypto-js";
import * as Diff from "diff";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import zxcvbn from "zxcvbn";
import FeanorResultPanel from "@/components/FeanorResultPanel.vue";
import { feanorTheoryTopics } from "@/features/codiceFeanor/data/feanorTheory";
import { feanorUtilityGroups } from "@/features/codiceFeanor/data/feanorUtilities";

const props = defineProps({
    toolModule: {
        type: String,
        default: ""
    }
});

const isOverviewPage = computed(() => !props.toolModule);

const hashModes = [
    { label: "Digest", value: "digest" },
    { label: "HMAC", value: "hmac" },
    { label: "PBKDF2", value: "pbkdf2" }
];

const hashToolConfigs = {
    hash: {
        title: "Hash digest",
        copy: "Calcula huellas deterministas de mensajes o ficheros textuales y compara contra un valor esperado.",
        helper: "Digest sirve para huellas publicas e integridad sin clave. No es cifrado y no autentica al emisor.",
        mode: "digest",
        showMode: false
    },
    hmac: {
        title: "HMAC",
        copy: "Calcula codigos HMAC con clave secreta para autenticar integridad de un mensaje compartido.",
        helper: "HMAC necesita una clave compartida. Sin esa clave, un atacante no puede recalcular una salida valida.",
        mode: "hmac",
        showMode: false
    }
};

const hashAlgorithms = ["SHA256", "SHA512", "SHA3", "SHA1", "MD5"];
const hashEncodings = [
    { label: "Hex", value: "hex" },
    { label: "Base64", value: "base64" }
];

const kdfToolConfigs = {
    kdf: {
        title: "Derivacion de claves",
        copy: "Laboratorio legacy para alternar PBKDF2 y HKDF. Las vistas principales separan ambos flujos.",
        mode: "PBKDF2",
        showMode: true
    },
    pbkdf2: {
        title: "PBKDF2",
        copy: "Endurece passwords o material humano con salt, hash e iteraciones antes de usarlo como clave.",
        mode: "PBKDF2",
        showMode: false
    },
    hkdf: {
        title: "HKDF",
        copy: "Extrae y expande material de alta entropia usando salt e info de contexto para separar usos de clave.",
        mode: "HKDF",
        showMode: false
    }
};

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

const textEncodingOptions = [
    { label: "UTF-8", value: "utf8", mime: "utf-8", note: "1 a 4 bytes por caracter Unicode" },
    { label: "UTF-16LE", value: "utf16le", mime: "utf-16le", note: "2 bytes por unidad de codigo, little-endian" },
    { label: "UTF-16BE", value: "utf16be", mime: "utf-16be", note: "2 bytes por unidad de codigo, big-endian" },
    { label: "ASCII estricto", value: "ascii", mime: "us-ascii", note: "Solo 0x00-0x7F; falla si hay caracteres extendidos" },
    { label: "ISO-8859-1 / Latin-1", value: "latin1", mime: "iso-8859-1", note: "Un byte por caracter occidental 0x00-0xFF" },
    { label: "Windows-1252", value: "windows1252", mime: "windows-1252", note: "Latin-1 practico con comillas curvas, euro y signos tipograficos" }
];

const transformCategories = [
    {
        value: "base64-text",
        label: "Texto Base64",
        badge: "TXT",
        description: "Texto multi-encoding",
        kind: "text",
        formats: [{ value: "text/plain", label: "Texto (.txt)", extension: "txt", mime: "text/plain" }]
    },
    {
        value: "base64url-text",
        label: "Base64URL",
        badge: "URL64",
        description: "JWT y rutas URL-safe",
        kind: "text",
        formats: [{ value: "text/plain", label: "Texto URL-safe", extension: "txt", mime: "text/plain" }]
    },
    {
        value: "url-text",
        label: "URL encode",
        badge: "URL",
        description: "Percent encoding",
        kind: "text",
        formats: [{ value: "text/plain", label: "Texto URL", extension: "txt", mime: "text/plain" }]
    },
    {
        value: "hex-text",
        label: "Hex",
        badge: "HEX",
        description: "Bytes en hexadecimal",
        kind: "text",
        formats: [{ value: "text/plain", label: "Texto Hex", extension: "txt", mime: "text/plain" }]
    },
    {
        value: "image",
        label: "Imagen",
        badge: "IMG",
        description: "PNG, JPG, GIF, SVG, WebP",
        kind: "image",
        formats: [
            { value: "image/png", label: "PNG (.png)", extension: "png", mime: "image/png" },
            { value: "image/jpeg", label: "JPG / JPEG (.jpg)", extension: "jpg", mime: "image/jpeg" },
            { value: "image/gif", label: "GIF (.gif)", extension: "gif", mime: "image/gif" },
            { value: "image/webp", label: "WebP (.webp)", extension: "webp", mime: "image/webp" },
            { value: "image/svg+xml", label: "SVG (.svg)", extension: "svg", mime: "image/svg+xml" },
            { value: "image/bmp", label: "BMP (.bmp)", extension: "bmp", mime: "image/bmp" },
            { value: "image/x-icon", label: "ICO (.ico)", extension: "ico", mime: "image/x-icon" }
        ]
    },
    {
        value: "audio",
        label: "Audio",
        badge: "AUD",
        description: "MP3, WAV, OGG, FLAC",
        kind: "audio",
        formats: [
            { value: "audio/mpeg", label: "MP3 (.mp3)", extension: "mp3", mime: "audio/mpeg" },
            { value: "audio/wav", label: "WAV (.wav)", extension: "wav", mime: "audio/wav" },
            { value: "audio/ogg", label: "Ogg (.ogg)", extension: "ogg", mime: "audio/ogg" },
            { value: "audio/flac", label: "FLAC (.flac)", extension: "flac", mime: "audio/flac" },
            { value: "audio/mp4", label: "M4A (.m4a)", extension: "m4a", mime: "audio/mp4" },
            { value: "audio/x-ms-wma", label: "WMA (.wma)", extension: "wma", mime: "audio/x-ms-wma" }
        ]
    },
    {
        value: "video",
        label: "Video",
        badge: "VID",
        description: "MP4, WebM, MOV, AVI",
        kind: "video",
        formats: [
            { value: "video/mp4", label: "MP4 (.mp4)", extension: "mp4", mime: "video/mp4" },
            { value: "video/webm", label: "WebM (.webm)", extension: "webm", mime: "video/webm" },
            { value: "video/quicktime", label: "MOV (.mov)", extension: "mov", mime: "video/quicktime" },
            { value: "video/x-msvideo", label: "AVI (.avi)", extension: "avi", mime: "video/x-msvideo" },
            { value: "video/x-matroska", label: "MKV (.mkv)", extension: "mkv", mime: "video/x-matroska" }
        ]
    },
    {
        value: "pdf",
        label: "PDF",
        badge: "PDF",
        description: "Documento embebible",
        kind: "pdf",
        formats: [{ value: "application/pdf", label: "PDF (.pdf)", extension: "pdf", mime: "application/pdf" }]
    },
    {
        value: "file",
        label: "Fichero",
        badge: "FILE",
        description: "ZIP, Office, JSON, binario",
        kind: "file",
        formats: [
            { value: "application/zip", label: "ZIP (.zip)", extension: "zip", mime: "application/zip" },
            { value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "DOCX (.docx)", extension: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
            { value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", label: "XLSX (.xlsx)", extension: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            { value: "application/vnd.openxmlformats-officedocument.presentationml.presentation", label: "PPTX (.pptx)", extension: "pptx", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
            { value: "application/json", label: "JSON (.json)", extension: "json", mime: "application/json" },
            { value: "text/csv", label: "CSV (.csv)", extension: "csv", mime: "text/csv" },
            { value: "application/octet-stream", label: "Binario (.bin)", extension: "bin", mime: "application/octet-stream" }
        ]
    }
];

const transformToolConfigs = {
    transform: {
        title: "Transformaciones ligeras",
        copy: "Laboratorio legacy para transformaciones de texto. Las herramientas principales ahora viven en labs separados.",
        categories: ["base64-text", "base64url-text", "url-text", "hex-text"],
        defaultCategory: "base64-text"
    },
    base64: {
        title: "Laboratorio Base64",
        copy: "Codifica y decodifica texto, imagenes, audio, video, PDF y ficheros genericos como Base64 puro o data URI descargable.",
        categories: ["base64-text", "image", "audio", "video", "pdf", "file"],
        defaultCategory: "base64-text"
    },
    base64url: {
        title: "Laboratorio Base64URL",
        copy: "Convierte texto con encoding configurable a Base64URL y recupera texto desde el alfabeto URL-safe usado en JWT, rutas y parametros.",
        categories: ["base64url-text"],
        defaultCategory: "base64url-text"
    },
    urlEncoding: {
        title: "URL encoding",
        copy: "Codifica o decodifica percent-encoding para query strings, fragments y valores que deben viajar dentro de una URL.",
        categories: ["url-text"],
        defaultCategory: "url-text"
    },
    hex: {
        title: "Hexadecimal",
        copy: "Representa texto con encoding configurable como Hex y recupera texto desde bytes hexadecimales de longitud par.",
        categories: ["hex-text"],
        defaultCategory: "hex-text"
    }
};

const xorInputModes = [
    { label: "Binario bit a bit", value: "binary" },
    { label: "Hex bytes", value: "hex" },
    { label: "Texto UTF-8", value: "text" },
    { label: "Texto UTF-16LE", value: "text-utf16le" },
    { label: "Texto UTF-16BE", value: "text-utf16be" },
    { label: "Texto ASCII", value: "text-ascii" },
    { label: "Texto Latin-1", value: "text-latin1" },
    { label: "Texto Windows-1252", value: "text-windows1252" },
    { label: "Decimal bytes", value: "decimal" }
];

const booleanOperations = [
    { label: "NOR - NOT(A OR B)", value: "nor" },
    { label: "NAND - NOT(A AND B)", value: "nand" },
    { label: "AND - A AND B", value: "and" },
    { label: "OR - A OR B", value: "or" },
    { label: "XOR - A XOR B", value: "xor" },
    { label: "XNOR - NOT(A XOR B)", value: "xnor" },
    { label: "NOT - NOT(A)", value: "not" }
];

const exifProfiles = [
    {
        value: "privacy",
        label: "Privacidad primero",
        badge: "PRIV",
        command: "exiftool -G -a -s -gps:all -xmp:all",
        note: "Prioriza GPS, identidad, seriales, fechas y software antes que campos tecnicos repetitivos."
    },
    {
        value: "forensic",
        label: "Forense completo",
        badge: "FOR",
        command: "exiftool -G -a -s -u -ee",
        note: "Muestra huella del fichero, estructura del contenedor, indicadores y todos los tags legibles."
    },
    {
        value: "exiftool",
        label: "Salida ExifTool-like",
        badge: "GAS",
        command: "exiftool -G -a -s -sort -json",
        note: "Ordena por grupo/tag y genera texto exportable junto a JSON, inspirado en la salida clasica de ExifTool."
    }
];

const exifDetailModes = [
    { label: "Resumen ordenado", value: "grouped" },
    { label: "Riesgos de privacidad", value: "risks" },
    { label: "Crudo / auditoria", value: "raw" }
];

const stegoCarrierHints = [
    { label: "Auto por firma real", value: "auto" },
    { label: "Imagen", value: "image" },
    { label: "Audio", value: "audio" },
    { label: "Video", value: "video" },
    { label: "Documento", value: "document" },
    { label: "Archivo / ZIP", value: "archive" },
    { label: "Binario generico", value: "binary" }
];

const stegoEmbedModes = [
    {
        label: "Auto seguro",
        value: "auto",
        note: "Elige la tecnica mas estable para el portador."
    },
    {
        label: "Imagen LSB -> PNG",
        value: "image-lsb",
        note: "Oculta bytes en pixeles RGB y exporta PNG sin perdida."
    },
    {
        label: "BMP/WAV/AU LSB directo",
        value: "byte-lsb",
        note: "Usa bits menos significativos de muestras o pixeles sin canvas."
    },
    {
        label: "PNG iTXt textual",
        value: "png-itxt",
        note: "Inserta un chunk iTXt antes de IEND."
    },
    {
        label: "Footer universal",
        value: "append",
        note: "Anade un paquete al final del fichero; funciona con casi cualquier binario."
    },
    {
        label: "ZIP bundle",
        value: "zip-bundle",
        note: "Empaqueta portador, payload y manifiesto en un ZIP portable."
    }
];

const stegoPayloadSources = [
    { label: "Texto libre", value: "text" },
    { label: "JSON estructurado", value: "json" },
    { label: "Base64 / data URI", value: "base64" },
    { label: "Fichero completo", value: "file" }
];

const steghideOperations = [
    {
        value: "info",
        label: "Info / capacidad",
        badge: "INFO",
        command: "steghide info <stegofile>",
        note: "Detecta tipo real, capacidad LSB, compatibilidad Steghide y genera comandos nativos equivalentes."
    },
    {
        value: "embed",
        label: "Embed",
        badge: "EMB",
        command: "steghide embed -cf cover -ef secret -sf output -p pass",
        note: "Incrusta un fichero usando posiciones pseudoaleatorias derivadas de la passphrase."
    },
    {
        value: "extract",
        label: "Extract",
        badge: "EXT",
        command: "steghide extract -sf stego -xf output -p pass",
        note: "Recupera el payload si la passphrase deriva el mismo orden de posiciones y el CRC valida."
    },
    {
        value: "crack",
        label: "StegSeek wordlist",
        badge: "CRK",
        command: "stegseek <stegofile> <wordlist.txt>",
        note: "Prueba passphrases de una wordlist contra el formato frontend y muestra comandos StegSeek reales."
    },
    {
        value: "seed",
        label: "Seed / probe",
        badge: "SEED",
        command: "stegseek --seed <stegofile>",
        note: "Explica el modo seed, busca senales locales y prueba extraccion sin passphrase cuando sea posible."
    }
];

const metadataEditorTypes = [
    {
        value: "mp3",
        label: "Audio MP3 (.mp3) - ID3v2.4 directo",
        family: "Audio",
        container: "ID3v2.4 / TXXX",
        extension: "mp3",
        mime: "audio/mpeg",
        accept: ".mp3,audio/mpeg",
        direct: true,
        note: "Escribe una etiqueta ID3v2.4 al inicio del MP3 y guarda el payload codificado en un frame TXXX."
    },
    {
        value: "wav",
        label: "Audio WAV (.wav) - RIFF INFO directo",
        family: "Audio",
        container: "RIFF LIST/INFO",
        extension: "wav",
        mime: "audio/wav",
        accept: ".wav,audio/wav,audio/x-wav",
        direct: true,
        note: "Anade un chunk LIST/INFO con INAM, IART, ICMT, ICOP e ISFT al final del WAVE."
    },
    {
        value: "png",
        label: "Imagen PNG (.png) - iTXt directo",
        family: "Imagen",
        container: "PNG iTXt",
        extension: "png",
        mime: "image/png",
        accept: ".png,image/png",
        direct: true,
        note: "Inserta chunks iTXt antes de IEND para que el texto quede como metadato textual UTF-8."
    },
    {
        value: "jpeg",
        label: "Imagen JPEG (.jpg) - COM directo",
        family: "Imagen",
        container: "JPEG COM",
        extension: "jpg",
        mime: "image/jpeg",
        accept: ".jpg,.jpeg,image/jpeg",
        direct: true,
        note: "Inserta un segmento COM despues de SOI. Es visible para herramientas forenses y no toca pixeles."
    },
    {
        value: "svg",
        label: "Imagen SVG (.svg) - metadata XML directo",
        family: "Imagen",
        container: "SVG metadata",
        extension: "svg",
        mime: "image/svg+xml",
        accept: ".svg,image/svg+xml",
        direct: true,
        note: "Anade un bloque metadata XML dentro del SVG y conserva el documento como texto."
    },
    {
        value: "webp",
        label: "Imagen WebP (.webp) - XMP sidecar",
        family: "Imagen",
        container: "RIFF/WebP XMP",
        extension: "webp",
        mime: "image/webp",
        accept: ".webp,image/webp",
        direct: false,
        note: "WebP usa RIFF y puede transportar EXIF/XMP, pero el lab genera sidecar para evitar romper chunks VP8/VP8X."
    },
    {
        value: "tiff",
        label: "Imagen TIFF/HEIC/RAW - XMP sidecar",
        family: "Imagen",
        container: "EXIF/XMP/IPTC",
        extension: "xmp",
        mime: "application/rdf+xml",
        accept: ".tif,.tiff,.heic,.heif,.dng,.cr2,.nef,image/tiff,image/heic,image/heif",
        direct: false,
        note: "Formatos fotograficos con EXIF profundo y MakerNotes: el modo seguro en navegador es sidecar."
    },
    {
        value: "mp4",
        label: "Video MP4/MOV/M4A - QuickTime sidecar",
        family: "Video",
        container: "QuickTime atoms",
        extension: "xmp",
        mime: "application/rdf+xml",
        accept: ".mp4,.mov,.m4a,video/mp4,video/quicktime,audio/mp4",
        direct: false,
        note: "MP4/MOV/M4A guardan metadatos en atoms; se documenta en sidecar para no reescribir offsets de video."
    },
    {
        value: "webm",
        label: "Video WebM/MKV - Matroska sidecar",
        family: "Video",
        container: "Matroska tags",
        extension: "xmp",
        mime: "application/rdf+xml",
        accept: ".webm,.mkv,video/webm,video/x-matroska",
        direct: false,
        note: "Matroska/WebM soporta tags, pero su reescritura binaria completa queda fuera del lab puro frontend."
    },
    {
        value: "pdf",
        label: "Documento PDF (.pdf) - XMP sidecar",
        family: "Documento",
        container: "PDF Info/XMP",
        extension: "xmp",
        mime: "application/rdf+xml",
        accept: ".pdf,application/pdf",
        direct: false,
        note: "PDF puede tener diccionario Info y XMP; el lab evita updates incrementales inseguros y genera XMP externo."
    },
    {
        value: "office",
        label: "Office DOCX/XLSX/PPTX - core.xml sidecar",
        family: "Documento",
        container: "ZIP + docProps",
        extension: "json",
        mime: "application/json",
        accept: ".docx,.xlsx,.pptx",
        direct: false,
        note: "Office moderno es ZIP con XML interno. La practica genera un descriptor aplicable a docProps/core.xml."
    },
    {
        value: "epub",
        label: "EPUB/ZIP - OPF sidecar",
        family: "Documento",
        container: "ZIP + OPF",
        extension: "json",
        mime: "application/json",
        accept: ".epub,.zip,application/epub+zip,application/zip",
        direct: false,
        note: "EPUB y ZIP admiten manifiestos internos; se crea descriptor para modificar el paquete con una herramienta dedicada."
    }
];

const metadataPayloadEncodings = [
    { label: "Base64", value: "base64" },
    { label: "Base64URL", value: "base64url" },
    { label: "Hex", value: "hex" },
    { label: "Texto plano", value: "plain" }
];

const caesarAlphabets = [
    {
        label: "Espanol (A-Z con Ñ)",
        value: "spanish",
        uppercase: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnñopqrstuvwxyz"
    },
    {
        label: "Ingles (A-Z)",
        value: "english",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz"
    }
];

const caesarLogicModes = [
    { label: "Normal", value: "normal" },
    { label: "Inversa", value: "inverse" }
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
const hashInputKind = ref("text");
const hashFile = ref(null);
const hashTextEncoding = ref("utf8");
const hashSecretEncoding = ref("utf8");
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
const signatureTextEncoding = ref("utf8");
const signatureMessage = ref("");
const signaturePublicKeyPem = ref("");
const signaturePrivateKeyPem = ref("");
const signatureValue = ref("");
const signatureResult = ref(null);

const aeadKeySize = ref(256);
const aeadTagLength = ref(128);
const aeadTextEncoding = ref("utf8");
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
const kdfTextEncoding = ref("utf8");
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

const transformDirection = ref("encode");
const transformCategory = ref("base64-text");
const transformFormat = ref("text/plain");
const transformOperation = ref("base64-encode");
const transformTextEncoding = ref("utf8");
const transformInput = ref("");
const transformFile = ref(null);
const transformDecodedFileName = ref("");
const transformDownloadUrl = ref("");
const transformDownloadName = ref("feanor-base64.bin");
const transformPreview = ref(null);
const transformResult = ref(null);

const caesarAlphabet = ref("spanish");
const caesarLogic = ref("normal");
const caesarShift = ref(3);
const caesarInput = ref("");
const caesarResult = ref(null);

const atbashAlphabet = ref("spanish");
const atbashInput = ref("");
const atbashResult = ref(null);

const booleanInputMode = ref("binary");
const booleanOperation = ref("nor");
const booleanRepeatKey = ref(false);
const booleanLeft = ref("");
const booleanRight = ref("");
const booleanResult = ref(null);

const vigenereAlphabet = ref("spanish");
const vigenereDirection = ref("encrypt");
const vigenereKey = ref("");
const vigenereInput = ref("");
const vigenereResult = ref(null);

const affineAlphabet = ref("spanish");
const affineDirection = ref("encrypt");
const affineA = ref(5);
const affineB = ref(8);
const affineInput = ref("");
const affineResult = ref(null);

const railFenceDirection = ref("encrypt");
const railFenceRails = ref(3);
const railFenceInput = ref("");
const railFenceResult = ref(null);

const modularOperation = ref("mod");
const modularBase = ref("");
const modularExponent = ref("");
const modularModulus = ref("");
const modularResult = ref(null);

const byteInputMode = ref("text");
const byteInput = ref("");
const byteResult = ref(null);

const jsonDocA = ref("");
const jsonDocB = ref("");
const jsonResult = ref(null);

const stegoAnalyzeFile = ref(null);
const stegoAnalyzeResult = ref(null);
const exifFile = ref(null);
const exifProfile = ref("privacy");
const exifDetailMode = ref("grouped");
const exifTagFilter = ref("");
const exifTxtDownloadUrl = ref("");
const exifTxtDownloadName = ref("feanor-exif-report.txt");
const exifJsonDownloadUrl = ref("");
const exifJsonDownloadName = ref("feanor-exif-report.json");
const exifResult = ref(null);
const metadataEditorType = ref("mp3");
const metadataEditorMode = ref("auto");
const metadataEditorFile = ref(null);
const metadataEditorTitle = ref("");
const metadataEditorAuthor = ref("");
const metadataEditorDescription = ref("");
const metadataEditorCopyright = ref("");
const metadataEditorLanguage = ref("spa");
const metadataEditorTags = ref("");
const metadataEditorPayloadEncoding = ref("base64");
const metadataEditorPayload = ref("");
const metadataEditorDownloadUrl = ref("");
const metadataEditorDownloadName = ref("feanor-metadata.bin");
const metadataEditorResult = ref(null);
const stegoEmbedFile = ref(null);
const stegoEmbedCarrierHint = ref("auto");
const stegoEmbedMode = ref("auto");
const stegoEmbedPayloadSource = ref("text");
const stegoEmbedTextEncoding = ref("utf8");
const stegoEmbedPayloadFile = ref(null);
const stegoEmbedPayloadName = ref("");
const stegoEmbedPayload = ref("");
const stegoEmbedDownloadUrl = ref("");
const stegoEmbedDownloadName = ref("feanor-stego.bin");
const stegoEmbedResult = ref(null);
const stegoExtractFile = ref(null);
const stegoExtractDownloadUrl = ref("");
const stegoExtractDownloadName = ref("feanor-payload.bin");
const stegoExtractResult = ref(null);
const steghideOperation = ref("info");
const steghideFile = ref(null);
const steghideSecretFile = ref(null);
const steghideWordlistFile = ref(null);
const steghidePassphrase = ref("");
const steghideEncryption = ref("aes-gcm");
const steghideCompression = ref("auto");
const steghideCompressionLevel = ref(6);
const steghideChecksum = ref(true);
const steghideStoreName = ref(true);
const steghideMaxGuesses = ref(5000);
const steghideSkipDefaultGuesses = ref(false);
const steghideDownloadUrl = ref("");
const steghideDownloadName = ref("feanor-steghide-output.bin");
const steghideResult = ref(null);

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

const activeHashToolConfig = computed(() =>
    hashToolConfigs[props.toolModule] || hashToolConfigs.hash
);

const isHashToolVisible = computed(() =>
    Object.keys(hashToolConfigs).includes(props.toolModule)
);

const activeKdfToolConfig = computed(() =>
    kdfToolConfigs[props.toolModule] || kdfToolConfigs.kdf
);

const isKdfToolVisible = computed(() =>
    Object.keys(kdfToolConfigs).includes(props.toolModule)
);

const currentTransformCategory = computed(() =>
    transformCategories.find(category => category.value === transformCategory.value) || transformCategories[0]
);

const activeTransformToolConfig = computed(() =>
    transformToolConfigs[props.toolModule] || transformToolConfigs.transform
);

const visibleTransformCategories = computed(() =>
    transformCategories.filter(category => activeTransformToolConfig.value.categories.includes(category.value))
);

const isTransformToolVisible = computed(() =>
    Object.keys(transformToolConfigs).includes(props.toolModule)
);

const selectedMetadataEditorType = computed(() =>
    metadataEditorTypes.find(item => item.value === metadataEditorType.value) || metadataEditorTypes[0]
);

const selectedStegoEmbedMode = computed(() =>
    stegoEmbedModes.find(item => item.value === stegoEmbedMode.value) || stegoEmbedModes[0]
);

const selectedStegoPayloadSource = computed(() =>
    stegoPayloadSources.find(item => item.value === stegoEmbedPayloadSource.value) || stegoPayloadSources[0]
);

const selectedExifProfile = computed(() =>
    exifProfiles.find(item => item.value === exifProfile.value) || exifProfiles[0]
);

const selectedSteghideOperation = computed(() =>
    steghideOperations.find(item => item.value === steghideOperation.value) || steghideOperations[0]
);

const metadataEditorAccept = computed(() => selectedMetadataEditorType.value.accept || "*/*");

const stegoPayloadPlaceholder = computed(() => {
    if (stegoEmbedPayloadSource.value === "json") return '{\n  "mensaje": "oculto",\n  "nivel": "lab"\n}';
    if (stegoEmbedPayloadSource.value === "base64") return "Base64 puro o data URI: data:application/octet-stream;base64,...";
    return "Mensaje, token, clave de laboratorio o texto que quieras ocultar";
});

const currentTransformFormat = computed(() =>
    currentTransformCategory.value.formats.find(format => format.value === transformFormat.value)
        || currentTransformCategory.value.formats[0]
);

const isTransformFileCategory = computed(() => !["base64-text", "base64url-text", "url-text", "hex-text"].includes(transformCategory.value));

const isTransformEncodingControlVisible = computed(() =>
    ["base64-text", "base64url-text", "hex-text"].includes(transformCategory.value)
);

const isTransformTextInputVisible = computed(() =>
    !isTransformFileCategory.value || transformDirection.value === "decode"
);

const currentTransformAccept = computed(() =>
    currentTransformCategory.value.formats.map(format => format.mime).join(",")
);

const transformPlaceholder = computed(() => {
    if (transformDirection.value === "encode") {
        if (transformCategory.value === "base64-text") return "Texto que quieres convertir a Base64";
        if (transformCategory.value === "base64url-text") return "Texto que quieres convertir a Base64URL";
        if (transformCategory.value === "url-text") return "Texto que quieres preparar para una URL";
        if (transformCategory.value === "hex-text") return "Texto que quieres representar en Hex";
        return "Selecciona un fichero para codificarlo como Base64";
    }

    if (transformCategory.value === "base64-text") return "Base64 o data URI que quieres decodificar a texto";
    if (transformCategory.value === "base64url-text") return "Base64URL que quieres decodificar a texto";
    if (transformCategory.value === "url-text") return "Texto con percent-encoding, por ejemplo hola%20mundo";
    if (transformCategory.value === "hex-text") return "Hex con longitud par, por ejemplo 486f6c61";
    return "Pega Base64 puro o data URI: data:image/png;base64,...";
});

watch(() => props.toolModule, () => {
    syncTransformToolDefaults();
    syncHashToolDefaults();
    syncKdfToolDefaults();
}, { immediate: true });

const STEGO_MAGIC_TEXT = "FEANOR_STEGO_V1";
const STEGO_MAGIC_BYTES = new TextEncoder().encode(STEGO_MAGIC_TEXT);
const STEGO_LENGTH_BYTES = 4;
const STEGO_HEADER_BYTES = STEGO_MAGIC_BYTES.length + STEGO_LENGTH_BYTES;
const STEGO_PACKET_MAGIC_TEXT = "FEANOR_STEGO_PACKET_V2";
const STEGO_PACKET_MAGIC_BYTES = new TextEncoder().encode(STEGO_PACKET_MAGIC_TEXT);
const STEGO_PACKET_HEADER_BYTES = STEGO_PACKET_MAGIC_BYTES.length + 4;
const STEGO_PACKET_B64_MARKER = "FEANOR_STEGO_PACKET_B64:";
const STEGO_DIRECT_LSB_SEED = 0x4645414e;
const STEGHIDE_MAGIC_TEXT = "FEANOR_STEGHIDE_V1";
const STEGHIDE_MAGIC_BYTES = new TextEncoder().encode(STEGHIDE_MAGIC_TEXT);
const STEGHIDE_LENGTH_BYTES = 4;
const STEGHIDE_HEADER_BYTES = STEGHIDE_MAGIC_BYTES.length + STEGHIDE_LENGTH_BYTES;
const STEGHIDE_KDF_ITERATIONS = 120000;

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
    const chunks = [];
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
        chunks.push(String.fromCharCode(...bytes.subarray(index, index + chunkSize)));
    }
    return btoa(chunks.join(""));
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

function getTextEncoding(value) {
    return textEncodingOptions.find(item => item.value === value) || textEncodingOptions[0];
}

const windows1252DecodeMap = {
    0x80: 0x20ac,
    0x82: 0x201a,
    0x83: 0x0192,
    0x84: 0x201e,
    0x85: 0x2026,
    0x86: 0x2020,
    0x87: 0x2021,
    0x88: 0x02c6,
    0x89: 0x2030,
    0x8a: 0x0160,
    0x8b: 0x2039,
    0x8c: 0x0152,
    0x8e: 0x017d,
    0x91: 0x2018,
    0x92: 0x2019,
    0x93: 0x201c,
    0x94: 0x201d,
    0x95: 0x2022,
    0x96: 0x2013,
    0x97: 0x2014,
    0x98: 0x02dc,
    0x99: 0x2122,
    0x9a: 0x0161,
    0x9b: 0x203a,
    0x9c: 0x0153,
    0x9e: 0x017e,
    0x9f: 0x0178
};

const windows1252EncodeMap = Object.fromEntries(
    Object.entries(windows1252DecodeMap).map(([byte, code]) => [code, Number(byte)])
);

function encodeSingleByteText(text, encoding) {
    const output = [];
    for (const char of Array.from(text)) {
        const codePoint = char.codePointAt(0);
        if (encoding === "ascii") {
            if (codePoint > 0x7f) throw new Error(`ASCII no puede representar "${char}".`);
            output.push(codePoint);
            continue;
        }
        if (encoding === "latin1") {
            if (codePoint > 0xff) throw new Error(`Latin-1 no puede representar "${char}".`);
            output.push(codePoint);
            continue;
        }
        if (codePoint <= 0x7f || (codePoint >= 0xa0 && codePoint <= 0xff)) {
            output.push(codePoint);
            continue;
        }
        const mapped = windows1252EncodeMap[codePoint];
        if (mapped === undefined) throw new Error(`Windows-1252 no puede representar "${char}".`);
        output.push(mapped);
    }
    return new Uint8Array(output);
}

function decodeSingleByteText(bytes, encoding) {
    return Array.from(bytes).map(byte => {
        if (encoding === "ascii" && byte > 0x7f) return "\ufffd";
        if (encoding === "windows1252" && windows1252DecodeMap[byte]) {
            return String.fromCodePoint(windows1252DecodeMap[byte]);
        }
        return String.fromCharCode(byte);
    }).join("");
}

function textToEncodedBytes(value, encoding = "utf8") {
    const text = String(value ?? "");
    if (encoding === "utf8") return textToBytes(text);
    if (["ascii", "latin1", "windows1252"].includes(encoding)) {
        return encodeSingleByteText(text, encoding);
    }

    const output = new Uint8Array(text.length * 2);
    for (let index = 0; index < text.length; index += 1) {
        const code = text.charCodeAt(index);
        if (encoding === "utf16be") {
            output[index * 2] = (code >>> 8) & 0xff;
            output[index * 2 + 1] = code & 0xff;
        } else {
            output[index * 2] = code & 0xff;
            output[index * 2 + 1] = (code >>> 8) & 0xff;
        }
    }
    return output;
}

function bytesToEncodedText(value, encoding = "utf8") {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
    if (encoding === "utf8") return bytesToUtf8(bytes);
    if (["ascii", "latin1", "windows1252"].includes(encoding)) {
        return decodeSingleByteText(bytes, encoding);
    }
    if (bytes.length % 2 !== 0) {
        throw new Error("UTF-16 necesita una cantidad par de bytes.");
    }
    const chunks = [];
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += 2 * chunkSize) {
        const codes = [];
        for (let offset = index; offset < Math.min(bytes.length, index + 2 * chunkSize); offset += 2) {
            const code = encoding === "utf16be"
                ? ((bytes[offset] << 8) | bytes[offset + 1])
                : (bytes[offset] | (bytes[offset + 1] << 8));
            codes.push(code);
        }
        chunks.push(String.fromCharCode(...codes));
    }
    return chunks.join("");
}

function encodingDisplayLabel(encoding = "utf8") {
    return getTextEncoding(encoding).label;
}

function encodingFromTextMode(mode) {
    if (mode === "text") return "utf8";
    if (String(mode || "").startsWith("text-")) return String(mode).slice(5);
    return "utf8";
}

function encodedTextWordArray(value, encoding = "utf8") {
    return bytesToWordArray(textToEncodedBytes(value, encoding));
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

function formatBytesSize(bytes) {
    if (!Number.isFinite(bytes)) return "N/D";
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }
    const digits = unitIndex === 0 ? 0 : 1;
    return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

function asciiSlice(bytes, start = 0, end = bytes.length) {
    let output = "";
    for (let index = start; index < end; index += 1) {
        output += String.fromCharCode(bytes[index]);
    }
    return output;
}

function startsWithBytes(bytes, signature) {
    if (bytes.length < signature.length) return false;
    return signature.every((byte, index) => bytes[index] === byte);
}

function findBytes(bytes, signature, start = 0) {
    if (!signature.length || bytes.length < signature.length) return -1;
    for (let index = start; index <= bytes.length - signature.length; index += 1) {
        let matched = true;
        for (let offset = 0; offset < signature.length; offset += 1) {
            if (bytes[index + offset] !== signature[offset]) {
                matched = false;
                break;
            }
        }
        if (matched) return index;
    }
    return -1;
}

function lastIndexOfBytes(bytes, signature) {
    if (!signature.length || bytes.length < signature.length) return -1;
    for (let index = bytes.length - signature.length; index >= 0; index -= 1) {
        let matched = true;
        for (let offset = 0; offset < signature.length; offset += 1) {
            if (bytes[index + offset] !== signature[offset]) {
                matched = false;
                break;
            }
        }
        if (matched) return index;
    }
    return -1;
}

function byteShannonEntropy(bytes) {
    if (!bytes.length) return 0;
    const frequencies = new Array(256).fill(0);
    bytes.forEach(byte => {
        frequencies[byte] += 1;
    });
    return frequencies.reduce((entropy, count) => {
        if (!count) return entropy;
        const probability = count / bytes.length;
        return entropy - probability * Math.log2(probability);
    }, 0);
}

function scanPrintableStrings(bytes, minLength = 7, maxResults = 24) {
    const results = [];
    let current = "";
    bytes.forEach(byte => {
        const printable = byte >= 32 && byte <= 126;
        if (printable) {
            current += String.fromCharCode(byte);
            return;
        }
        if (current.length >= minLength) {
            results.push(current);
        }
        current = "";
    });
    if (current.length >= minLength) {
        results.push(current);
    }
    return Array.from(new Set(results))
        .sort((a, b) => b.length - a.length)
        .slice(0, maxResults);
}

function sanitizeMetadataValue(value) {
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return value.map(sanitizeMetadataValue).join(", ");
    if (value && typeof value === "object") {
        if (value.description) return value.description;
        return JSON.stringify(value);
    }
    return String(value ?? "");
}

function objectToLines(value, maxEntries = 28) {
    if (!value || typeof value !== "object") return [];
    return Object.entries(value)
        .filter(([, item]) => item !== undefined && item !== null && sanitizeMetadataValue(item) !== "")
        .slice(0, maxEntries)
        .map(([key, item]) => `${key}: ${sanitizeMetadataValue(item)}`);
}

function detectFileType(bytes, file) {
    const first16 = asciiSlice(bytes, 0, Math.min(bytes.length, 16));
    const extension = (file?.name?.split(".").pop() || "").toLowerCase();

    if (startsWithBytes(bytes, [0x89, 0x50, 0x4e, 0x47])) return { label: "PNG", family: "image", extension };
    if (startsWithBytes(bytes, [0xff, 0xd8, 0xff])) return { label: "JPEG", family: "image", extension };
    if (first16.startsWith("GIF87a") || first16.startsWith("GIF89a")) return { label: "GIF", family: "image", extension };
    if (first16.startsWith("BM")) return { label: "BMP", family: "image", extension };
    if (startsWithBytes(bytes, [0x49, 0x49, 0x2a, 0x00]) || startsWithBytes(bytes, [0x4d, 0x4d, 0x00, 0x2a])) return { label: "TIFF", family: "image", extension };
    if (first16.startsWith("RIFF") && asciiSlice(bytes, 8, 12) === "WEBP") return { label: "WEBP", family: "image", extension };
    if (first16.startsWith("RIFF") && asciiSlice(bytes, 8, 12) === "WAVE") return { label: "WAV", family: "audio", extension };
    if (startsWithBytes(bytes, [0x2e, 0x73, 0x6e, 0x64])) return { label: "AU", family: "audio", extension };
    if (first16.startsWith("RIFF") && asciiSlice(bytes, 8, 12) === "AVI ") return { label: "AVI", family: "video", extension };
    if (startsWithBytes(bytes, [0x49, 0x44, 0x33]) || startsWithBytes(bytes, [0xff, 0xfb])) return { label: "MP3", family: "audio", extension };
    if (first16.startsWith("fLaC")) return { label: "FLAC", family: "audio", extension };
    if (first16.startsWith("OggS")) return { label: "OGG", family: "audio", extension };
    if (startsWithBytes(bytes, [0x1a, 0x45, 0xdf, 0xa3])) return { label: extension === "webm" ? "WEBM" : "MKV/WEBM", family: "video", extension };
    if (asciiSlice(bytes, 4, 8) === "ftyp") {
        const brand = asciiSlice(bytes, 8, 12).trim();
        const imageBrands = ["heic", "heix", "hevc", "hevx", "mif1", "msf1", "avif"];
        if (imageBrands.includes(brand)) return { label: brand.toUpperCase(), family: "image", extension };
        if (extension === "m4a" || extension === "aac") return { label: "M4A/MP4", family: "audio", extension };
        return { label: "MP4/MOV", family: "video", extension };
    }
    if (first16.startsWith("%PDF-")) return { label: "PDF", family: "document", extension };
    if (startsWithBytes(bytes, [0x50, 0x4b, 0x03, 0x04])) {
        const officeMap = { docx: "DOCX", xlsx: "XLSX", pptx: "PPTX", epub: "EPUB" };
        return { label: officeMap[extension] || "ZIP", family: "archive", extension };
    }
    if (startsWithBytes(bytes, [0x50, 0x4b, 0x05, 0x06]) || startsWithBytes(bytes, [0x50, 0x4b, 0x07, 0x08])) return { label: "ZIP", family: "archive", extension };
    if (startsWithBytes(bytes, [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07])) return { label: "RAR", family: "archive", extension };
    if (startsWithBytes(bytes, [0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c])) return { label: "7Z", family: "archive", extension };
    if (startsWithBytes(bytes, [0x1f, 0x8b, 0x08])) return { label: "GZIP", family: "archive", extension };
    if (first16.startsWith("BZh")) return { label: "BZIP2", family: "archive", extension };
    if (startsWithBytes(bytes, [0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00])) return { label: "XZ", family: "archive", extension };
    if (asciiSlice(bytes, 257, 262) === "ustar") return { label: "TAR", family: "archive", extension };
    if (first16.startsWith("SQLite format 3")) return { label: "SQLITE", family: "database", extension };
    if (startsWithBytes(bytes, [0x00, 0x61, 0x73, 0x6d])) return { label: "WASM", family: "binary", extension };
    if (startsWithBytes(bytes, [0x7f, 0x45, 0x4c, 0x46])) return { label: "ELF", family: "executable", extension };
    if (first16.startsWith("MZ")) return { label: "PE/EXE", family: "executable", extension };
    if (startsWithBytes(bytes, [0xca, 0xfe, 0xba, 0xbe])) return { label: "JAVA CLASS", family: "executable", extension };
    if (
        startsWithBytes(bytes, [0xfe, 0xed, 0xfa, 0xce])
        || startsWithBytes(bytes, [0xfe, 0xed, 0xfa, 0xcf])
        || startsWithBytes(bytes, [0xce, 0xfa, 0xed, 0xfe])
        || startsWithBytes(bytes, [0xcf, 0xfa, 0xed, 0xfe])
    ) return { label: "MACH-O", family: "executable", extension };
    if (startsWithBytes(bytes, [0x0a, 0x0d, 0x0d, 0x0a])) return { label: "PCAPNG", family: "capture", extension };
    if (
        startsWithBytes(bytes, [0xd4, 0xc3, 0xb2, 0xa1])
        || startsWithBytes(bytes, [0xa1, 0xb2, 0xc3, 0xd4])
        || startsWithBytes(bytes, [0x4d, 0x3c, 0xb2, 0xa1])
        || startsWithBytes(bytes, [0xa1, 0xb2, 0x3c, 0x4d])
    ) return { label: "PCAP", family: "capture", extension };
    if (bytes.length > 132 && asciiSlice(bytes, 128, 132) === "DICM") return { label: "DICOM", family: "medical", extension };
    if (["eml", "msg"].includes(extension) || /^from:|^subject:|^mime-version:/im.test(asciiSlice(bytes, 0, Math.min(bytes.length, 2048)))) return { label: "EMAIL", family: "message", extension };

    const headText = asciiSlice(bytes, 0, Math.min(bytes.length, 512)).trimStart().toLowerCase();
    if (headText.startsWith("<svg")) return { label: "SVG", family: "image", extension };
    if (headText.startsWith("{") || headText.startsWith("[")) return { label: "JSON/TEXTO", family: "text", extension };
    if (headText.startsWith("<")) return { label: "XML/HTML", family: "text", extension };
    if (extension === "csv" || headText.includes(",") && headText.includes("\n")) return { label: "CSV/TEXTO", family: "text", extension };
    return { label: extension ? extension.toUpperCase() : "BINARIO", family: "binary", extension };
}

function analyzeEncodingSignals(bytes) {
    const lines = [];
    const sample = bytes.slice(0, Math.min(bytes.length, 4096));
    if (!sample.length) return ["Fichero vacio."];

    const bomChecks = [
        { name: "UTF-8 BOM", bytes: [0xef, 0xbb, 0xbf] },
        { name: "UTF-16LE BOM", bytes: [0xff, 0xfe] },
        { name: "UTF-16BE BOM", bytes: [0xfe, 0xff] },
        { name: "UTF-32LE BOM", bytes: [0xff, 0xfe, 0x00, 0x00] },
        { name: "UTF-32BE BOM", bytes: [0x00, 0x00, 0xfe, 0xff] }
    ];
    const bom = bomChecks.find(item => startsWithBytes(bytes, item.bytes));
    lines.push(`BOM: ${bom ? bom.name : "No detectado"}.`);

    const nulCount = Array.from(sample).filter(byte => byte === 0).length;
    const asciiPrintable = Array.from(sample).filter(byte => byte === 9 || byte === 10 || byte === 13 || (byte >= 32 && byte <= 126)).length;
    const highBytes = Array.from(sample).filter(byte => byte >= 0x80).length;
    const cp1252Markers = Array.from(sample).filter(byte => windows1252DecodeMap[byte]).length;
    const evenNuls = Array.from(sample).filter((byte, index) => index % 2 === 0 && byte === 0).length;
    const oddNuls = Array.from(sample).filter((byte, index) => index % 2 === 1 && byte === 0).length;
    const crlf = findBytes(sample, [0x0d, 0x0a]) >= 0;
    const lf = sample.includes(0x0a);

    lines.push(`ASCII imprimible en muestra: ${((asciiPrintable / sample.length) * 100).toFixed(1)}%.`);
    lines.push(`Bytes altos >=0x80: ${highBytes} de ${sample.length}.`);
    lines.push(`NUL bytes: ${nulCount} de ${sample.length}.`);
    if (oddNuls > sample.length * 0.2) lines.push("Patron compatible con UTF-16LE: muchos 0x00 en posiciones impares.");
    if (evenNuls > sample.length * 0.2) lines.push("Patron compatible con UTF-16BE: muchos 0x00 en posiciones pares.");
    if (cp1252Markers) lines.push(`Marcadores Windows-1252 en rango 0x80-0x9F: ${cp1252Markers}.`);
    lines.push(`Saltos de linea: ${crlf ? "CRLF" : lf ? "LF" : "No visibles en muestra"}.`);
    lines.push(`Primeros 16 bytes: ${bytesToHex(bytes.slice(0, 16))}.`);
    return lines;
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

function isModuleVisible(module) {
    return props.toolModule === module;
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

function syncHashToolDefaults() {
    if (!isHashToolVisible.value) return;
    hashMode.value = activeHashToolConfig.value.mode;
}

function syncKdfToolDefaults() {
    if (!isKdfToolVisible.value) return;
    kdfMode.value = activeKdfToolConfig.value.mode;
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
    transformDirection.value = transformDirection.value === "encode" ? "decode" : "encode";
    updateTransformOperation();
    clearTransformGeneratedAssets();
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

function handleHashFile(event) {
    hashFile.value = event.target.files?.[0] || null;
    hashResult.value = null;
}

function generateHashSalt() {
    hashSalt.value = randomHex(16);
}

function fillHashExample() {
    hashMode.value = "pbkdf2";
    hashAlgorithm.value = "SHA256";
    hashEncoding.value = "hex";
    hashInputKind.value = "text";
    hashFile.value = null;
    hashTextEncoding.value = "utf8";
    hashSecretEncoding.value = "utf8";
    hashInput.value = "Mithril-Forge-2026";
    hashSalt.value = randomHex(16);
    hashIterations.value = 180000;
    hashKeySize.value = 32;
    hashExpected.value = "";
}

async function getHashInputBytes() {
    if (hashInputKind.value === "file") {
        if (!hashFile.value) throw new Error("Selecciona un fichero para calcular la salida.");
        return {
            bytes: new Uint8Array(await hashFile.value.arrayBuffer()),
            label: hashFile.value.name || "fichero",
            kind: "file",
            note: `${formatBytesSize(hashFile.value.size)} / ${hashFile.value.type || "application/octet-stream"}`
        };
    }
    return {
        bytes: textToEncodedBytes(hashInput.value, hashTextEncoding.value),
        label: "texto",
        kind: "text",
        note: `${hashInput.value.length} chars / ${encodingDisplayLabel(hashTextEncoding.value)}`
    };
}

async function runHashLab() {
    if (hashInputKind.value === "text" && !hashInput.value.trim()) {
        hashResult.value = buildErrorResult("INPUT_EMPTY", "Falta material base", "Introduce texto o material para calcular la salida.");
        return;
    }
    if (hashInputKind.value === "file" && !hashFile.value) {
        hashResult.value = buildErrorResult("HASH_FILE_EMPTY", "Falta fichero", "Selecciona un fichero para calcular la salida.");
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
        const input = await getHashInputBytes();
        const inputBytes = input.bytes;
        const inputWordArray = bytesToWordArray(inputBytes);
        const inputEncodingLabel = input.kind === "file" ? "bytes de fichero" : encodingDisplayLabel(hashTextEncoding.value);
        const notes = [];
        let comparisonNote = "Sin referencia";
        let comparisonTone = "tone-neutral";
        let verdictTone = "verdict-success";
        let verdictTitle = "Huella generada";
        let verdictBody = "La operacion se completo y la salida queda lista para contrastar o reutilizar.";

        if (mode === "digest") {
            outputWordArray = digestMap[algorithm](inputWordArray);
            notes.push(`Digest ${algorithm} calculado sobre ${inputBytes.length} bytes de ${input.label}.`);
            if (["MD5", "SHA1"].includes(algorithm)) {
                notes.push("Este algoritmo solo deberia mantenerse por compatibilidad o huellas heredadas.");
            }
        } else if (mode === "hmac") {
            if (!hashSecret.value) {
                throw new Error("Necesitas indicar una clave secreta para HMAC.");
            }
            const secretBytes = textToEncodedBytes(hashSecret.value, hashSecretEncoding.value);
            outputWordArray = hmacMap[algorithm](inputWordArray, bytesToWordArray(secretBytes));
            notes.push(`HMAC ${algorithm} calculado con ${input.label} y clave ${encodingDisplayLabel(hashSecretEncoding.value)}.`);
            notes.push(`Clave efectiva: ${secretBytes.length} bytes.`);
            notes.push("Si compartes el mensaje sin la clave, la salida por si sola no permite recalcular el HMAC.");
        } else {
            if (!hashSalt.value) {
                throw new Error("Introduce un salt para derivar la clave.");
            }
            const iterations = Math.max(1000, Number(hashIterations.value) || 1000);
            const keyBytes = Math.max(16, Number(hashKeySize.value) || 32);
            const normalizedSalt = normalizeValue(hashSalt.value);
            const saltWordArray = normalizedSalt && normalizedSalt.length % 2 === 0 && !/[^0-9a-f]/i.test(normalizedSalt)
                ? CryptoJS.enc.Hex.parse(normalizedSalt)
                : encodedTextWordArray(hashSalt.value, hashTextEncoding.value);
            outputWordArray = CryptoJS.PBKDF2(inputWordArray, saltWordArray, {
                keySize: keyBytes / 4,
                iterations,
                hasher: CryptoJS.algo[algorithm]
            });
            notes.push(`PBKDF2 usando ${algorithm}, ${iterations.toLocaleString("es-ES")} iteraciones, entrada ${input.label} (${inputEncodingLabel}) y ${keyBytes} bytes derivados.`);
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
                { label: "Entrada", value: `${inputBytes.length} bytes`, tone: "tone-neutral", note: input.note },
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
                        inputKind: hashInputKind.value,
                        inputName: input.label,
                        inputEncoding: hashTextEncoding.value,
                        secretEncoding: mode === "hmac" ? hashSecretEncoding.value : null,
                        salt: mode === "pbkdf2" ? hashSalt.value : null,
                        iterations: mode === "pbkdf2" ? Number(hashIterations.value) : null,
                        keyBytes: mode === "pbkdf2" ? Number(hashKeySize.value) : null,
                        comparedAgainst: hasComparison ? hashExpected.value : null
                    }),
                    copyValue: safeJson({
                        mode,
                        algorithm,
                        encoding: hashEncoding.value,
                        inputKind: hashInputKind.value,
                        inputName: input.label,
                        inputEncoding: hashTextEncoding.value,
                        secretEncoding: mode === "hmac" ? hashSecretEncoding.value : null,
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
        const messageBytes = textToEncodedBytes(signatureMessage.value, signatureTextEncoding.value);
        const signature = await subtle.sign(algorithm.sign, privateKey, messageBytes);
        signatureValue.value = bytesToBase64(signature);

        signatureResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Mensaje firmado",
            verdictBody: "La firma depende del mensaje, la clave privada, el algoritmo y el hash configurado.",
            summaryCards: [
                { label: "Algoritmo", value: algorithm.label, tone: "tone-success", note: "Firma digital" },
                { label: "Mensaje", value: `${messageBytes.byteLength} bytes`, tone: "tone-neutral", note: encodingDisplayLabel(signatureTextEncoding.value) },
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
                { title: "Mensaje firmado", badge: "payload", content: signatureMessage.value, copyValue: signatureMessage.value },
                { title: "Bytes firmados", badge: "hex", content: bytesToHex(messageBytes), copyValue: bytesToHex(messageBytes) }
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
        const messageBytes = textToEncodedBytes(signatureMessage.value, signatureTextEncoding.value);
        const valid = await subtle.verify(
            algorithm.sign,
            publicKey,
            base64ToBytes(signatureValue.value),
            messageBytes
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
                { label: "Mensaje", value: `${messageBytes.byteLength} bytes`, tone: "tone-neutral", note: encodingDisplayLabel(signatureTextEncoding.value) },
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
    signatureTextEncoding.value = "utf8";
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
        params.additionalData = textToEncodedBytes(aeadAad.value, aeadTextEncoding.value);
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
        const plaintextBytes = textToEncodedBytes(aeadPlaintext.value, aeadTextEncoding.value);
        const ciphertext = await subtle.encrypt(getAeadParams(iv), key, plaintextBytes);
        aeadCiphertext.value = bytesToBase64(ciphertext);
        aeadResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "AES-GCM cifrado",
            verdictBody: "La salida incluye ciphertext y tag de autenticacion. El AAD queda autenticado aunque no cifrado.",
            summaryCards: [
                { label: "Plaintext", value: `${plaintextBytes.byteLength} bytes`, tone: "tone-neutral", note: encodingDisplayLabel(aeadTextEncoding.value) },
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
                { title: "Parametros", badge: "json", content: safeJson({ algorithm: "AES-GCM", keyBits: aeadKeySize.value, iv: aeadIv.value, tagLength: aeadTagLength.value, aad: aeadAad.value, textEncoding: aeadTextEncoding.value }), copyValue: safeJson({ algorithm: "AES-GCM", keyBits: aeadKeySize.value, iv: aeadIv.value, tagLength: aeadTagLength.value, aad: aeadAad.value, textEncoding: aeadTextEncoding.value }) }
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
        const plaintext = bytesToEncodedText(new Uint8Array(decrypted), aeadTextEncoding.value);
        aeadPlaintext.value = plaintext;
        aeadResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "AES-GCM descifrado",
            verdictBody: "El tag ha sido validado. Si el ciphertext, AAD, IV o clave hubieran cambiado, WebCrypto habria rechazado la operacion.",
            summaryCards: [
                { label: "Resultado", value: "Valido", tone: "tone-success", note: "Tag verificado" },
                { label: "Plaintext", value: `${new Uint8Array(decrypted).byteLength} bytes`, tone: "tone-neutral", note: encodingDisplayLabel(aeadTextEncoding.value) },
                { label: "AAD", value: aeadAad.value ? "Coincide" : "Vacio", tone: "tone-success", note: "Datos autenticados" },
                { label: "Tag", value: `${aeadTagLength.value} bits`, tone: "tone-success", note: "Autenticacion" }
            ],
            signalCards: [
                { label: "Integridad", value: "OK", tone: "tone-success", note: "GCM acepto tag" },
                { label: "Confidencialidad", value: "Recuperada", tone: "tone-success", note: "Texto plano visible" },
                { label: "Errores", value: "No", tone: "tone-success", note: "Parametros coherentes" },
                { label: "Salida", value: "Texto", tone: "tone-neutral", note: `Decodificado ${encodingDisplayLabel(aeadTextEncoding.value)}` }
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
    aeadTextEncoding.value = "utf8";
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
        const inputBytes = textToEncodedBytes(kdfInput.value, kdfTextEncoding.value);
        const infoBytes = textToEncodedBytes(kdfInfo.value, kdfTextEncoding.value);
        let derived;
        if (kdfMode.value === "PBKDF2") {
            if (Number(kdfIterations.value) < 1000) {
                throw new Error("PBKDF2 necesita al menos 1000 iteraciones.");
            }
            const baseKey = await subtle.importKey("raw", inputBytes, "PBKDF2", false, ["deriveBits"]);
            derived = new Uint8Array(await subtle.deriveBits({
                name: "PBKDF2",
                salt,
                iterations: Number(kdfIterations.value),
                hash: kdfHash.value
            }, baseKey, lengthBits));
        } else {
            const baseKey = await subtle.importKey("raw", inputBytes, "HKDF", false, ["deriveBits"]);
            derived = new Uint8Array(await subtle.deriveBits({
                name: "HKDF",
                salt,
                info: infoBytes,
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
                { label: "Entrada", value: `${inputBytes.length} bytes`, tone: "tone-neutral", note: encodingDisplayLabel(kdfTextEncoding.value) }
            ],
            signalCards: [
                { label: "Iteraciones", value: kdfMode.value === "PBKDF2" ? Number(kdfIterations.value).toLocaleString("es-ES") : "No aplica", tone: kdfMode.value === "PBKDF2" ? toneFromBoolean(Number(kdfIterations.value) >= 100000) : "tone-neutral", note: "Coste PBKDF2" },
                { label: "Salt", value: `${salt.byteLength} bytes`, tone: "tone-success", note: "Base64" },
                { label: "Info", value: kdfMode.value === "HKDF" ? `${infoBytes.length} bytes` : "No aplica", tone: kdfMode.value === "HKDF" ? "tone-success" : "tone-neutral", note: "Contexto HKDF" },
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
    kdfTextEncoding.value = "utf8";
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

function updateTransformOperation() {
    const suffix = transformDirection.value === "encode" ? "encode" : "decode";
    if (transformCategory.value === "base64-text") transformOperation.value = `base64-${suffix}`;
    else if (transformCategory.value === "base64url-text") transformOperation.value = `base64url-${suffix}`;
    else if (transformCategory.value === "url-text") transformOperation.value = `url-${suffix}`;
    else if (transformCategory.value === "hex-text") transformOperation.value = `hex-${suffix}`;
    else transformOperation.value = `${transformCategory.value}-base64-${suffix}`;
}

function setTransformDirection(direction) {
    transformDirection.value = direction;
    updateTransformOperation();
    clearTransformGeneratedAssets();
    transformResult.value = null;
}

function syncTransformToolDefaults() {
    if (!isTransformToolVisible.value) return;
    const allowed = activeTransformToolConfig.value.categories;
    if (!allowed.includes(transformCategory.value)) {
        transformCategory.value = activeTransformToolConfig.value.defaultCategory;
    }
    transformFormat.value = currentTransformCategory.value.formats[0]?.value || "text/plain";
    updateTransformOperation();
}

function selectTransformCategory(category) {
    if (!activeTransformToolConfig.value.categories.includes(category)) return;
    transformCategory.value = category;
    transformFormat.value = currentTransformCategory.value.formats[0]?.value || "application/octet-stream";
    updateTransformOperation();
    clearTransformGeneratedAssets();
    transformResult.value = null;
}

function handleTransformFile(event) {
    transformFile.value = event.target.files?.[0] || null;
    clearTransformGeneratedAssets();
    transformResult.value = null;
}

function clearTransformGeneratedAssets() {
    if (transformDownloadUrl.value) {
        URL.revokeObjectURL(transformDownloadUrl.value);
    }
    if (transformPreview.value?.ownsUrl) {
        URL.revokeObjectURL(transformPreview.value.url);
    }
    transformDownloadUrl.value = "";
    transformDownloadName.value = "feanor-base64.bin";
    transformPreview.value = null;
}

function setTransformPreview(kind, url, ownsUrl = true) {
    if (transformPreview.value?.ownsUrl) {
        URL.revokeObjectURL(transformPreview.value.url);
    }
    transformPreview.value = { kind, url, ownsUrl };
}

function setTransformDownload(blob, filename, kind) {
    clearTransformGeneratedAssets();
    const url = URL.createObjectURL(blob);
    transformDownloadUrl.value = url;
    transformDownloadName.value = filename;
    transformPreview.value = { kind, url, ownsUrl: false };
}

function parseBase64Payload(value) {
    const trimmed = String(value ?? "").trim();
    const match = trimmed.match(/^data:([^;,]+)?(?:;[^,]*)?;base64,([\s\S]+)$/i);
    if (match) {
        return {
            base64: match[2].replace(/\s+/g, ""),
            mime: match[1] || "",
            isDataUri: true
        };
    }
    return {
        base64: trimmed.replace(/\s+/g, ""),
        mime: "",
        isDataUri: false
    };
}

function previewKindFromCategory(category) {
    if (category === "image") return "image";
    if (category === "audio") return "audio";
    if (category === "video") return "video";
    if (category === "pdf") return "pdf";
    return "file";
}

function formatFromMime(mime) {
    const normalized = String(mime || "").toLowerCase();
    return transformCategories
        .flatMap(category => category.formats)
        .find(format => format.mime.toLowerCase() === normalized)
        || null;
}

function inferMimeFromDecodedBytes(bytes, fallbackMime) {
    const detected = detectFileType(bytes, { name: `decoded.${currentTransformFormat.value.extension}` });
    const detectedMap = {
        PNG: "image/png",
        JPEG: "image/jpeg",
        GIF: "image/gif",
        BMP: "image/bmp",
        WEBP: "image/webp",
        PDF: "application/pdf",
        ZIP: "application/zip",
        MP3: "audio/mpeg",
        WAV: "audio/wav"
    };
    return detectedMap[detected.label] || fallbackMime || currentTransformFormat.value.mime;
}

function filenameForDecodedOutput(mime) {
    if (transformDecodedFileName.value.trim()) return transformDecodedFileName.value.trim();
    const format = formatFromMime(mime) || currentTransformFormat.value;
    return `feanor-base64.${format.extension || "bin"}`;
}

function buildDataUri(mime, base64) {
    return `data:${mime};base64,${base64}`;
}

function buildEmbedSnippet(kind, dataUri, filename) {
    if (kind === "image") return `<img src="${dataUri}" alt="${filename}" />`;
    if (kind === "audio") return `<audio controls src="${dataUri}"></audio>`;
    if (kind === "video") return `<video controls src="${dataUri}"></video>`;
    if (kind === "pdf") return `<iframe src="${dataUri}" title="${filename}"></iframe>`;
    return `<a href="${dataUri}" download="${filename}">Descargar ${filename}</a>`;
}

function selectedFileKindLabel() {
    return currentTransformCategory.value.label;
}

function fillTransformExample() {
    clearTransformGeneratedAssets();
    transformDirection.value = "decode";
    transformCategory.value = "base64url-text";
    transformFormat.value = "text/plain";
    transformTextEncoding.value = "utf8";
    updateTransformOperation();
    transformInput.value = base64ToBase64Url(utf8ToBase64('{"scope":"read:reports","active":true}'));
    transformDecodedFileName.value = "";
}

function runTextTransform() {
    if (!transformInput.value.trim()) {
        throw new Error("Introduce texto o una cadena codificada.");
    }

    let output = "";
    let note = "";
    const encoding = transformCategory.value === "url-text" ? "utf8" : transformTextEncoding.value;
    const encodingLabel = encodingDisplayLabel(encoding);

    switch (transformOperation.value) {
    case "base64-encode":
        output = bytesToBase64(textToEncodedBytes(transformInput.value, encoding));
        note = `Texto ${encodingLabel} convertido a Base64 clasico.`;
        break;
    case "base64-decode":
        output = bytesToEncodedText(base64ToBytes(parseBase64Payload(transformInput.value).base64), encoding);
        note = `Cadena Base64 convertida a texto ${encodingLabel}.`;
        break;
    case "base64url-encode":
        output = bytesToBase64Url(textToEncodedBytes(transformInput.value, encoding));
        note = `Texto ${encodingLabel} convertido al alfabeto URL-safe.`;
        break;
    case "base64url-decode":
        output = bytesToEncodedText(base64UrlToBytes(transformInput.value.trim()), encoding);
        note = `Cadena Base64URL devuelta a texto ${encodingLabel}.`;
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
        output = bytesToHex(textToEncodedBytes(transformInput.value, encoding));
        note = `Texto ${encodingLabel} convertido a representacion hexadecimal.`;
        break;
    case "hex-decode":
        output = bytesToEncodedText(hexToBytes(transformInput.value), encoding);
        note = `Cadena hexadecimal decodificada a ${encodingLabel}.`;
        break;
    default:
        throw new Error("Operacion de texto no soportada.");
    }

    const jsonHint = looksLikeJson(output) ? "La salida parece JSON valido." : "La salida no parece JSON.";
    return {
        output,
        note,
        panels: [
            {
                title: "Resultado",
                badge: "texto",
                content: output,
                copyValue: output
            },
            {
                title: "Lectura tecnica",
                badge: "notas",
                content: buildTextList("Observaciones", [note, transformCategory.value === "url-text" ? "" : `Codificacion seleccionada: ${encodingLabel}.`, jsonHint]),
                copyValue: `${note}\n${jsonHint}`
            }
        ],
        jsonHint
    };
}

async function runFileBase64Encode() {
    if (!transformFile.value) {
        throw new Error("Selecciona un fichero para convertirlo a Base64.");
    }

    const file = transformFile.value;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const base64 = bytesToBase64(bytes);
    const mime = file.type || currentTransformFormat.value.mime;
    const dataUri = buildDataUri(mime, base64);
    const kind = previewKindFromCategory(transformCategory.value);
    const previewUrl = URL.createObjectURL(file);
    const snippet = buildEmbedSnippet(kind, dataUri, file.name);
    setTransformPreview(kind, previewUrl, true);

    return {
        output: base64,
        note: `${file.name} convertido a Base64 como ${mime}.`,
        panels: [
            {
                title: "Resultado",
                badge: "base64",
                content: base64,
                copyValue: base64
            },
            {
                title: "Data URI",
                badge: "data",
                content: dataUri,
                copyValue: dataUri
            },
            {
                title: "HTML de uso",
                badge: "embed",
                content: snippet,
                copyValue: snippet
            }
        ],
        file,
        bytes,
        mime,
        dataUri
    };
}

async function runFileBase64Decode() {
    if (!transformInput.value.trim()) {
        throw new Error("Pega Base64 puro o una data URI antes de decodificar.");
    }

    const parsed = parseBase64Payload(transformInput.value);
    const bytes = base64ToBytes(parsed.base64);
    const mime = inferMimeFromDecodedBytes(bytes, parsed.mime || currentTransformFormat.value.mime);
    const filename = filenameForDecodedOutput(mime);
    const kind = previewKindFromCategory(transformCategory.value);
    const blob = new Blob([bytes], { type: mime });
    const dataUri = buildDataUri(mime, parsed.base64);
    setTransformDownload(blob, filename, kind);

    return {
        output: dataUri,
        note: `${formatBytesSize(bytes.byteLength)} decodificados como ${mime}.`,
        panels: [
            {
                title: "Resultado",
                badge: "fichero",
                content: buildTextList("Fichero generado", [
                    `Nombre: ${filename}`,
                    `MIME: ${mime}`,
                    `Tamano: ${formatBytesSize(bytes.byteLength)}.`,
                    "Usa el boton Descargar fichero para guardarlo."
                ]),
                copyValue: filename
            },
            {
                title: "Base64 normalizado",
                badge: "base64",
                content: parsed.base64,
                copyValue: parsed.base64
            }
        ],
        bytes,
        mime,
        filename,
        isDataUri: parsed.isDataUri
    };
}

async function runTransform() {
    updateTransformOperation();
    clearTransformGeneratedAssets();

    try {
        const fileMode = isTransformFileCategory.value;
        const result = fileMode
            ? (transformDirection.value === "encode" ? await runFileBase64Encode() : await runFileBase64Decode())
            : runTextTransform();
        const output = result.output;
        const inputSize = fileMode && transformDirection.value === "encode"
            ? formatBytesSize(result.bytes.byteLength)
            : `${transformInput.value.length} chars`;
        const outputSize = fileMode && transformDirection.value === "decode"
            ? formatBytesSize(result.bytes.byteLength)
            : `${String(output).length} chars`;
        const operationLabel = transformDirection.value === "encode" ? "Codificar" : "Decodificar";
        const typeLabel = fileMode ? selectedFileKindLabel() : currentTransformCategory.value.label;
        const jsonHint = !fileMode && looksLikeJson(output) ? "La salida parece JSON valido." : "";

        transformResult.value = {
            primaryValue: output,
            verdictTone: "verdict-success",
            verdictTitle: fileMode ? "Base64 de fichero procesado" : "Transformacion aplicada",
            verdictBody: fileMode
                ? `${result.note} El flujo se ejecuta integramente en el navegador.`
                : `${result.note} ${jsonHint || "Salida lista para reutilizar."}`,
            summaryCards: [
                { label: "Modo", value: operationLabel, tone: "tone-success", note: transformOperation.value },
                { label: "Categoria", value: typeLabel, tone: "tone-neutral", note: currentTransformFormat.value.label },
                { label: "Entrada", value: inputSize, tone: "tone-neutral", note: fileMode && transformDirection.value === "encode" ? result.file.name : "Material local" },
                { label: "Salida", value: outputSize, tone: "tone-success", note: transformDirection.value === "decode" && fileMode ? "Fichero" : "Texto" }
            ],
            signalCards: [
                { label: "MIME", value: result.mime || currentTransformFormat.value.mime, tone: "tone-neutral", note: "Tipo declarado" },
                { label: "Data URI", value: fileMode ? "Disponible" : "N/D", tone: fileMode ? "tone-success" : "tone-neutral", note: fileMode ? "HTML/CSS embebible" : "Texto simple" },
                { label: "JSON probable", value: !fileMode && looksLikeJson(output) ? "Si" : "No", tone: !fileMode && looksLikeJson(output) ? "tone-success" : "tone-neutral", note: "Heuristica local" },
                { label: "Reversible", value: "Si", tone: "tone-success", note: "Usa el modo opuesto" }
            ],
            panels: result.panels
        };
    } catch (error) {
        transformResult.value = buildErrorResult("TRANSFORM_FAILED", "Transformacion no completada", error.message);
    }
}

function getCaesarAlphabet() {
    return caesarAlphabets.find(item => item.value === caesarAlphabet.value) || caesarAlphabets[0];
}

function normalizeCaesarShift(value, alphabetLength) {
    const shift = Number(value);
    if (!Number.isFinite(shift) || !Number.isInteger(shift) || shift < 0) {
        throw new Error("El numero de caracteres debe ser un entero igual o mayor que 0.");
    }
    return shift % alphabetLength;
}

function applyCaesarShift(value, alphabet, effectiveShift) {
    let shiftedCharacters = 0;
    const output = Array.from(value).map(char => {
        const upperIndex = alphabet.uppercase.indexOf(char);
        if (upperIndex !== -1) {
            shiftedCharacters += 1;
            return alphabet.uppercase[(upperIndex + effectiveShift) % alphabet.uppercase.length];
        }

        const lowerIndex = alphabet.lowercase.indexOf(char);
        if (lowerIndex !== -1) {
            shiftedCharacters += 1;
            return alphabet.lowercase[(lowerIndex + effectiveShift) % alphabet.lowercase.length];
        }

        return char;
    }).join("");

    return {
        output,
        shiftedCharacters,
        untouchedCharacters: Array.from(value).length - shiftedCharacters
    };
}

function buildCaesarSubstitutionTable(alphabet, effectiveShift) {
    return alphabet.uppercase
        .split("")
        .map((char, index) => `${char}->${alphabet.uppercase[(index + effectiveShift) % alphabet.uppercase.length]}`)
        .join("  ");
}

function fillCaesarExample() {
    caesarAlphabet.value = "spanish";
    caesarLogic.value = "normal";
    caesarShift.value = 3;
    caesarInput.value = "El codigo de Feanor protege la Ñ y el anillo.";
}

function toggleCaesarLogic() {
    caesarLogic.value = caesarLogic.value === "normal" ? "inverse" : "normal";
}

function useCaesarOutputAsInput() {
    if (!caesarResult.value?.primaryValue) {
        caesarResult.value = buildErrorResult("CAESAR_OUTPUT_EMPTY", "No hay salida Cesar", "Aplica primero el cifrado para poder pasar el resultado a la entrada.");
        return;
    }

    caesarInput.value = caesarResult.value.primaryValue;
}

function runCaesarCipher() {
    if (!caesarInput.value) {
        caesarResult.value = buildErrorResult("CAESAR_EMPTY", "Falta texto", "Introduce texto plano o cifrado antes de aplicar Cesar.");
        return;
    }

    try {
        const alphabet = getCaesarAlphabet();
        const normalizedShift = normalizeCaesarShift(caesarShift.value, alphabet.uppercase.length);
        const effectiveShift = caesarLogic.value === "inverse"
            ? (alphabet.uppercase.length - normalizedShift) % alphabet.uppercase.length
            : normalizedShift;
        const direction = caesarLogic.value === "inverse" ? "retrocede" : "avanza";
        const result = applyCaesarShift(caesarInput.value, alphabet, effectiveShift);
        const substitutionTable = buildCaesarSubstitutionTable(alphabet, effectiveShift);
        const hasLetters = result.shiftedCharacters > 0;

        caesarResult.value = {
            primaryValue: result.output,
            verdictTone: hasLetters ? "verdict-success" : "verdict-warning",
            verdictTitle: hasLetters ? "Cifrado Cesar aplicado" : "Sin letras transformables",
            verdictBody: hasLetters
                ? `La logica ${caesarLogic.value === "inverse" ? "inversa" : "normal"} ${direction} ${normalizedShift} posiciones sobre el alfabeto seleccionado.`
                : "El texto no contiene letras del alfabeto seleccionado; la salida se mantiene igual.",
            summaryCards: [
                { label: "Logica", value: caesarLogic.value === "inverse" ? "Inversa" : "Normal", tone: "tone-neutral", note: direction },
                { label: "Desplazamiento", value: `${Number(caesarShift.value)} chars`, tone: "tone-success", note: `Modulo ${alphabet.uppercase.length}: ${normalizedShift}` },
                { label: "Alfabeto", value: alphabet.value === "spanish" ? "Espanol" : "Ingles", tone: "tone-neutral", note: `${alphabet.uppercase.length} letras` },
                { label: "Letras", value: `${result.shiftedCharacters}`, tone: hasLetters ? "tone-success" : "tone-warning", note: "Transformadas" }
            ],
            signalCards: [
                { label: "Ñ activa", value: alphabet.value === "spanish" ? "Si" : "No", tone: alphabet.value === "spanish" ? "tone-success" : "tone-neutral", note: alphabet.value === "spanish" ? "Incluida entre N y O" : "Queda sin desplazar" },
                { label: "Mayusculas", value: "Conservadas", tone: "tone-success", note: "Tambien minusculas" },
                { label: "Sin tocar", value: `${result.untouchedCharacters}`, tone: result.untouchedCharacters ? "tone-neutral" : "tone-success", note: "Espacios, signos u otros" },
                { label: "Reversible", value: "Si", tone: "tone-success", note: "Usa la logica opuesta" }
            ],
            panels: [
                {
                    title: "Resultado",
                    badge: "cesar",
                    content: result.output,
                    copyValue: result.output
                },
                {
                    title: "Tabla de sustitucion",
                    badge: alphabet.value === "spanish" ? "A-Ñ-Z" : "A-Z",
                    content: substitutionTable,
                    copyValue: substitutionTable
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Observaciones", [
                        `Alfabeto usado: ${alphabet.uppercase}.`,
                        `La logica ${caesarLogic.value === "inverse" ? "inversa" : "normal"} ${direction} ${normalizedShift} posiciones reales tras aplicar modulo ${alphabet.uppercase.length}.`,
                        "Los caracteres fuera del alfabeto elegido se mantienen sin cambios.",
                        "Para revertir, usa el mismo desplazamiento con la logica opuesta."
                    ]),
                    copyValue: `Alfabeto: ${alphabet.uppercase}\nLogica: ${caesarLogic.value}\nDesplazamiento: ${normalizedShift}`
                }
            ]
        };
    } catch (error) {
        caesarResult.value = buildErrorResult("CAESAR_FAILED", "No se pudo aplicar Cesar", error.message);
    }
}

function alphabetCharacters(alphabet, variant = "uppercase") {
    return Array.from(alphabet[variant] || "");
}

function alphabetIndex(char, alphabet, variant = "uppercase") {
    return alphabetCharacters(alphabet, variant).indexOf(char);
}

function getAlphabetByValue(value) {
    return caesarAlphabets.find(item => item.value === value) || caesarAlphabets[0];
}

function transformAlphabetCharacters(value, alphabet, mapper) {
    let transformed = 0;
    const output = Array.from(value).map(char => {
        const upperChars = alphabetCharacters(alphabet, "uppercase");
        const lowerChars = alphabetCharacters(alphabet, "lowercase");
        const upperIndex = upperChars.indexOf(char);
        if (upperIndex !== -1) {
            transformed += 1;
            return upperChars[mapper(upperIndex, upperChars.length)];
        }
        const lowerIndex = lowerChars.indexOf(char);
        if (lowerIndex !== -1) {
            transformed += 1;
            return lowerChars[mapper(lowerIndex, lowerChars.length)];
        }
        return char;
    }).join("");
    return { output, transformed, untouched: Array.from(value).length - transformed };
}

function buildSubstitutionPairs(alphabet, mapper) {
    const upperChars = alphabetCharacters(alphabet, "uppercase");
    return upperChars
        .map((char, index) => `${char}->${upperChars[mapper(index, upperChars.length)]}`)
        .join("  ");
}

function fillAtbashExample() {
    atbashAlphabet.value = "spanish";
    atbashInput.value = "FEANOR GUARDA EL SECRETO";
}

function useAtbashOutputAsInput() {
    if (!atbashResult.value?.primaryValue) {
        atbashResult.value = buildErrorResult("ATBASH_OUTPUT_EMPTY", "No hay salida Atbash", "Aplica primero Atbash para pasar la salida a la entrada.");
        return;
    }
    atbashInput.value = atbashResult.value.primaryValue;
}

function runAtbashCipher() {
    if (!atbashInput.value) {
        atbashResult.value = buildErrorResult("ATBASH_EMPTY", "Falta texto", "Introduce texto antes de aplicar Atbash.");
        return;
    }

    try {
        const alphabet = getAlphabetByValue(atbashAlphabet.value);
        const result = transformAlphabetCharacters(atbashInput.value, alphabet, (index, length) => length - 1 - index);
        const table = buildSubstitutionPairs(alphabet, (index, length) => length - 1 - index);

        atbashResult.value = {
            primaryValue: result.output,
            verdictTone: result.transformed ? "verdict-success" : "verdict-warning",
            verdictTitle: result.transformed ? "Atbash aplicado" : "Sin letras transformables",
            verdictBody: "Atbash es involutivo: aplicar la misma sustitucion una segunda vez recupera el texto original.",
            summaryCards: [
                { label: "Alfabeto", value: alphabet.value === "spanish" ? "Espanol" : "Ingles", tone: "tone-neutral", note: `${alphabetCharacters(alphabet).length} letras` },
                { label: "Operacion", value: "Espejo", tone: "tone-success", note: "A <-> Z" },
                { label: "Letras", value: String(result.transformed), tone: result.transformed ? "tone-success" : "tone-warning", note: "Transformadas" },
                { label: "Reversible", value: "Si", tone: "tone-success", note: "Misma operacion" }
            ],
            signalCards: [
                { label: "Clave", value: "No", tone: "tone-warning", note: "Sustitucion fija" },
                { label: "Frecuencia", value: "Conservada", tone: "tone-warning", note: "Debil ante analisis" },
                { label: "Espacios", value: "Intactos", tone: "tone-neutral", note: "No alfabeticos" },
                { label: "Uso", value: "Didactico", tone: "tone-neutral", note: "No seguro" }
            ],
            panels: [
                { title: "Resultado", badge: "atbash", content: result.output, copyValue: result.output },
                { title: "Tabla de sustitucion", badge: "mapa", content: table, copyValue: table },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Propiedades", [
                        "Cada indice i se reemplaza por m - 1 - i.",
                        "No hay direccion cifrar/descifrar: la funcion es su propia inversa.",
                        "No oculta frecuencias; solo cambia nombres de letras."
                    ]),
                    copyValue: "Atbash: i -> m - 1 - i"
                }
            ]
        };
    } catch (error) {
        atbashResult.value = buildErrorResult("ATBASH_FAILED", "No se pudo aplicar Atbash", error.message);
    }
}

function normalizeBitString(value) {
    const bits = String(value ?? "").replace(/[\s_]/g, "");
    if (!bits || /[^01]/.test(bits)) {
        throw new Error("En modo binario solo se aceptan bits 0 y 1.");
    }
    return bits;
}

function parseDecimalBytes(value) {
    const parts = String(value ?? "").split(/[\s,;]+/).filter(Boolean);
    if (!parts.length) {
        throw new Error("Introduce bytes decimales separados por espacios o comas.");
    }
    return new Uint8Array(parts.map(part => {
        const byte = Number(part);
        if (!Number.isInteger(byte) || byte < 0 || byte > 255) {
            throw new Error(`Byte decimal invalido: ${part}. Usa valores entre 0 y 255.`);
        }
        return byte;
    }));
}

function repeatStringToLength(value, length) {
    if (!value.length) {
        throw new Error("B no puede estar vacio si se usa como clave.");
    }
    return Array.from({ length }, (_, index) => value[index % value.length]).join("");
}

function repeatBytesToLength(bytes, length) {
    if (!bytes.length) {
        throw new Error("B no puede estar vacio si se usa como clave.");
    }
    return new Uint8Array(Array.from({ length }, (_, index) => bytes[index % bytes.length]));
}

function bitsToBytes(bits) {
    if (bits.length % 8 !== 0) return null;
    const bytes = [];
    for (let index = 0; index < bits.length; index += 8) {
        bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
    }
    return new Uint8Array(bytes);
}

function byteBits(bytes) {
    return Array.from(bytes).map(byte => byte.toString(2).padStart(8, "0")).join(" ");
}

function parseLogicBytes(value, mode) {
    if (mode === "hex") return hexToBytes(value);
    if (mode === "decimal") return parseDecimalBytes(value);
    return textToEncodedBytes(value, encodingFromTextMode(mode));
}

function booleanOperationLabel(operation = booleanOperation.value) {
    const item = booleanOperations.find(entry => entry.value === operation);
    return item?.label || operation.toUpperCase();
}

function applyBooleanBit(left, right, operation) {
    const a = Number(left);
    const b = Number(right || 0);
    if (operation === "and") return a & b;
    if (operation === "or") return a | b;
    if (operation === "xor") return a ^ b;
    if (operation === "nand") return 1 - (a & b);
    if (operation === "nor") return 1 - (a | b);
    if (operation === "xnor") return 1 - (a ^ b);
    if (operation === "not") return 1 - a;
    throw new Error(`Operacion no soportada: ${operation}.`);
}

function applyBooleanByte(left, right, operation) {
    if (operation === "and") return left & right;
    if (operation === "or") return left | right;
    if (operation === "xor") return left ^ right;
    if (operation === "nand") return (~(left & right)) & 0xff;
    if (operation === "nor") return (~(left | right)) & 0xff;
    if (operation === "xnor") return (~(left ^ right)) & 0xff;
    if (operation === "not") return (~left) & 0xff;
    throw new Error(`Operacion no soportada: ${operation}.`);
}

function buildBooleanBitTable(leftBits, rightBits, resultBits, operation) {
    const maxRows = Math.min(leftBits.length, 64);
    const header = operation === "not" ? "i  A  NOT A" : `i  A  B  ${operation.toUpperCase()}`;
    const rows = [header];
    for (let index = 0; index < maxRows; index += 1) {
        rows.push(operation === "not"
            ? `${String(index).padStart(2, "0")}  ${leftBits[index]}     ${resultBits[index]}`
            : `${String(index).padStart(2, "0")}  ${leftBits[index]}  ${rightBits[index]}     ${resultBits[index]}`);
    }
    if (leftBits.length > maxRows) rows.push(`... ${leftBits.length - maxRows} bits mas`);
    return rows.join("\n");
}

function booleanTruthTable(operation) {
    if (operation === "not") {
        return ["A  NOT A", "0    1", "1    0"].join("\n");
    }
    return ["A  B  OUT", "0  0   " + applyBooleanBit(0, 0, operation), "0  1   " + applyBooleanBit(0, 1, operation), "1  0   " + applyBooleanBit(1, 0, operation), "1  1   " + applyBooleanBit(1, 1, operation)].join("\n");
}

function fillBooleanExample() {
    booleanInputMode.value = "binary";
    booleanOperation.value = "nor";
    booleanRepeatKey.value = false;
    booleanLeft.value = "1010";
    booleanRight.value = "1100";
}

function fillBooleanXorExample() {
    booleanInputMode.value = "binary";
    booleanOperation.value = "xor";
    booleanRepeatKey.value = false;
    booleanLeft.value = "1010";
    booleanRight.value = "1100";
}

function useBooleanOutputAsInput() {
    if (!booleanResult.value?.primaryValue) {
        booleanResult.value = buildErrorResult("BOOLEAN_OUTPUT_EMPTY", "No hay salida", "Calcula primero una operacion para pasar el resultado a A.");
        return;
    }
    booleanLeft.value = booleanResult.value.primaryValue;
    if (booleanResult.value.outputMode) booleanInputMode.value = booleanResult.value.outputMode;
}

function runBooleanLab() {
    if (!booleanLeft.value.trim()) {
        booleanResult.value = buildErrorResult("BOOLEAN_LEFT_EMPTY", "Falta A", "Introduce el operando A antes de calcular.");
        return;
    }
    if (booleanOperation.value !== "not" && !booleanRight.value.trim()) {
        booleanResult.value = buildErrorResult("BOOLEAN_RIGHT_EMPTY", "Falta B", "Introduce B o usa NOT para trabajar solo con A.");
        return;
    }

    try {
        let primaryValue = "";
        let outputMode = booleanInputMode.value;
        let resultContent = "";
        let table = "";
        let leftLength = 0;
        let rightLength = booleanOperation.value === "not" ? 0 : null;
        let resultBytes = null;

        if (booleanInputMode.value === "binary") {
            const leftBits = normalizeBitString(booleanLeft.value);
            const rightBaseBits = booleanOperation.value === "not" ? "" : normalizeBitString(booleanRight.value);
            const rightBits = booleanOperation.value === "not"
                ? ""
                : (booleanRepeatKey.value ? repeatStringToLength(rightBaseBits, leftBits.length) : rightBaseBits);
            if (booleanOperation.value !== "not" && leftBits.length !== rightBits.length) {
                throw new Error("A y B deben tener la misma longitud de bits, o activa repetir B como mascara.");
            }
            const resultBits = Array.from(leftBits)
                .map((bit, index) => String(applyBooleanBit(bit, rightBits[index], booleanOperation.value)))
                .join("");
            resultBytes = bitsToBytes(resultBits);
            primaryValue = resultBits;
            table = buildBooleanBitTable(leftBits, rightBits, resultBits, booleanOperation.value);
            leftLength = leftBits.length;
            rightLength = booleanOperation.value === "not" ? 0 : rightBits.length;
            resultContent = buildTextList("Salida booleana", [
                `Binario: ${resultBits}`,
                resultBytes ? `Hex: ${bytesToHex(resultBytes)}` : "",
                resultBytes ? `Decimal: ${Array.from(resultBytes).join(", ")}` : ""
            ]);
        } else {
            const leftBytes = parseLogicBytes(booleanLeft.value, booleanInputMode.value);
            const rightBaseBytes = booleanOperation.value === "not" ? new Uint8Array() : parseLogicBytes(booleanRight.value, booleanInputMode.value);
            const rightBytes = booleanOperation.value === "not"
                ? new Uint8Array(leftBytes.length)
                : (booleanRepeatKey.value ? repeatBytesToLength(rightBaseBytes, leftBytes.length) : rightBaseBytes);
            if (booleanOperation.value !== "not" && leftBytes.length !== rightBytes.length) {
                throw new Error("A y B deben tener la misma longitud en bytes, o activa repetir B como mascara.");
            }
            resultBytes = new Uint8Array(leftBytes.map((byte, index) => applyBooleanByte(byte, rightBytes[index], booleanOperation.value)));
            primaryValue = bytesToHex(resultBytes);
            outputMode = "hex";
            let resultText = "";
            const selectedTextEncoding = encodingFromTextMode(booleanInputMode.value);
            const selectedTextEncodingLabel = encodingDisplayLabel(selectedTextEncoding);
            try {
                resultText = bytesToEncodedText(resultBytes, selectedTextEncoding);
            } catch {
                resultText = `No decodificable como ${selectedTextEncodingLabel}.`;
            }
            const leftBits = byteBits(leftBytes).replace(/\s/g, "");
            const rightBits = booleanOperation.value === "not" ? "" : byteBits(rightBytes).replace(/\s/g, "");
            const resultBits = byteBits(resultBytes).replace(/\s/g, "");
            table = buildBooleanBitTable(leftBits, rightBits, resultBits, booleanOperation.value);
            leftLength = leftBytes.length;
            rightLength = booleanOperation.value === "not" ? 0 : rightBytes.length;
            resultContent = buildTextList("Salida booleana", [
                `Hex: ${primaryValue}`,
                `Base64: ${bytesToBase64(resultBytes)}`,
                `Binario: ${byteBits(resultBytes)}`,
                booleanOperation.value === "xor" ? `${selectedTextEncodingLabel}: ${resultText}` : ""
            ]);
        }

        const reversible = ["xor", "xnor", "not"].includes(booleanOperation.value);
        const isXor = booleanOperation.value === "xor";
        const operationPanels = [
            { title: "Resultado", badge: booleanOperation.value, content: resultContent, copyValue: primaryValue },
            { title: "Tabla bit a bit", badge: "bits", content: table, copyValue: table },
            { title: "Tabla de verdad", badge: "truth", content: booleanTruthTable(booleanOperation.value), copyValue: booleanTruthTable(booleanOperation.value) }
        ];
        if (isXor) {
            operationPanels.push({
                title: "Lectura XOR",
                badge: "xor",
                content: buildTextList("Propiedades usadas", [
                    "Si dos bits son iguales, el resultado es 0; si son distintos, el resultado es 1.",
                    "A XOR A = 0 y A XOR 0 = A.",
                    "Para cifrado simetrico simple: C = P XOR K y P = C XOR K.",
                    "Si B se repite como clave corta, sirve para experimentar, pero reutilizar claves cortas filtra patrones."
                ]),
                copyValue: "A XOR A = 0\nA XOR 0 = A\nC = P XOR K\nP = C XOR K"
            });
        }

        booleanResult.value = {
            primaryValue,
            outputMode,
            verdictTone: "verdict-success",
            verdictTitle: `${booleanOperation.value.toUpperCase()} calculado`,
            verdictBody: isXor
                ? (booleanRepeatKey.value
                    ? "B se ha repetido como clave hasta cubrir A. Aplicar de nuevo XOR con la misma clave recupera A."
                    : "A y B se han combinado bit a bit. Si vuelves a aplicar XOR con B, recuperas A.")
                : booleanOperation.value === "nor"
                ? "NOR equivale a negar OR: solo produce 1 cuando A y B son 0. Como puerta logica es universal, pero no es reversible como cifrado."
                : `${booleanOperationLabel()} aplicado bit a bit sobre el material de entrada.`,
            summaryCards: [
                { label: "Operacion", value: booleanOperation.value.toUpperCase(), tone: "tone-success", note: booleanOperationLabel() },
                { label: "Formato", value: booleanInputMode.value.toUpperCase(), tone: "tone-neutral", note: "Entrada" },
                { label: "A", value: String(leftLength), tone: "tone-neutral", note: booleanInputMode.value === "binary" ? "bits" : "bytes" },
                { label: "Reversible", value: reversible ? "Si" : "No", tone: reversible ? "tone-success" : "tone-warning", note: reversible ? "Con misma mascara" : "Pierde informacion" }
            ],
            signalCards: [
                { label: isXor ? "A XOR A" : "Tabla verdad", value: isXor ? "0" : "Incluida", tone: "tone-success", note: isXor ? "Misma entrada se anula" : "4 casos" },
                { label: "B usado", value: booleanOperation.value === "not" ? "N/D" : String(rightLength), tone: "tone-neutral", note: booleanRepeatKey.value ? "Repetido" : "Directo" },
                { label: isXor ? "A XOR 0" : "NOR universal", value: isXor ? "A" : (booleanOperation.value === "nor" ? "Si" : "N/D"), tone: isXor || booleanOperation.value === "nor" ? "tone-success" : "tone-neutral", note: isXor ? "Identidad" : "Construye otras puertas" },
                { label: "Cripto", value: reversible ? "Util" : "Mascara", tone: reversible ? "tone-success" : "tone-warning", note: reversible ? "Puede descifrar" : "No descifra solo" }
            ],
            panels: operationPanels
        };
    } catch (error) {
        booleanResult.value = buildErrorResult("BOOLEAN_FAILED", "No se pudo calcular la operacion", error.message);
    }
}

function normalizeVigenereKey(key, alphabet) {
    const upperChars = alphabetCharacters(alphabet, "uppercase");
    const lowerChars = alphabetCharacters(alphabet, "lowercase");
    const shifts = [];
    Array.from(key).forEach(char => {
        const upperIndex = upperChars.indexOf(char);
        const lowerIndex = lowerChars.indexOf(char);
        const index = upperIndex !== -1 ? upperIndex : lowerIndex;
        if (index !== -1) shifts.push(index);
    });
    if (!shifts.length) {
        throw new Error("La clave debe contener al menos una letra del alfabeto seleccionado.");
    }
    return shifts;
}

function applyVigenere(value, alphabet, shifts, decrypt = false) {
    let keyIndex = 0;
    let transformed = 0;
    const upperChars = alphabetCharacters(alphabet, "uppercase");
    const lowerChars = alphabetCharacters(alphabet, "lowercase");
    const output = Array.from(value).map(char => {
        const upperIndex = upperChars.indexOf(char);
        const lowerIndex = lowerChars.indexOf(char);
        const isUpper = upperIndex !== -1;
        const sourceIndex = isUpper ? upperIndex : lowerIndex;
        if (sourceIndex === -1) return char;
        const shift = shifts[keyIndex % shifts.length];
        keyIndex += 1;
        transformed += 1;
        const directionShift = decrypt ? -shift : shift;
        const targetIndex = ((sourceIndex + directionShift) % upperChars.length + upperChars.length) % upperChars.length;
        return isUpper ? upperChars[targetIndex] : lowerChars[targetIndex];
    }).join("");
    return { output, transformed, keyUses: keyIndex };
}

function buildVigenereTrace(value, alphabet, shifts, decrypt = false) {
    const upperChars = alphabetCharacters(alphabet, "uppercase");
    const lowerChars = alphabetCharacters(alphabet, "lowercase");
    const rows = ["i  char  shift  out"];
    let keyIndex = 0;
    Array.from(value).some((char, index) => {
        if (rows.length > 42) return true;
        const upperIndex = upperChars.indexOf(char);
        const lowerIndex = lowerChars.indexOf(char);
        const sourceIndex = upperIndex !== -1 ? upperIndex : lowerIndex;
        if (sourceIndex === -1) {
            rows.push(`${String(index).padStart(2, "0")}   ${char}     -     ${char}`);
            return false;
        }
        const shift = shifts[keyIndex % shifts.length];
        const targetIndex = ((sourceIndex + (decrypt ? -shift : shift)) % upperChars.length + upperChars.length) % upperChars.length;
        const out = upperIndex !== -1 ? upperChars[targetIndex] : lowerChars[targetIndex];
        rows.push(`${String(index).padStart(2, "0")}   ${char}    ${String(shift).padStart(2, "0")}     ${out}`);
        keyIndex += 1;
        return false;
    });
    return rows.join("\n");
}

function fillVigenereExample() {
    vigenereAlphabet.value = "spanish";
    vigenereDirection.value = "encrypt";
    vigenereKey.value = "FEANOR";
    vigenereInput.value = "EL MENSAJE VIAJA CIFRADO";
}

function toggleVigenereDirection() {
    vigenereDirection.value = vigenereDirection.value === "encrypt" ? "decrypt" : "encrypt";
}

function useVigenereOutputAsInput() {
    if (!vigenereResult.value?.primaryValue) {
        vigenereResult.value = buildErrorResult("VIGENERE_OUTPUT_EMPTY", "No hay salida Vigenere", "Ejecuta primero el cifrado para pasar la salida a la entrada.");
        return;
    }
    vigenereInput.value = vigenereResult.value.primaryValue;
}

function runVigenereCipher() {
    if (!vigenereInput.value) {
        vigenereResult.value = buildErrorResult("VIGENERE_EMPTY", "Falta texto", "Introduce texto antes de ejecutar Vigenere.");
        return;
    }
    try {
        const alphabet = getAlphabetByValue(vigenereAlphabet.value);
        const shifts = normalizeVigenereKey(vigenereKey.value, alphabet);
        const decrypt = vigenereDirection.value === "decrypt";
        const result = applyVigenere(vigenereInput.value, alphabet, shifts, decrypt);
        const trace = buildVigenereTrace(vigenereInput.value, alphabet, shifts, decrypt);
        vigenereResult.value = {
            primaryValue: result.output,
            verdictTone: result.transformed ? "verdict-success" : "verdict-warning",
            verdictTitle: decrypt ? "Vigenere descifrado" : "Vigenere cifrado",
            verdictBody: "La clave se repite solo sobre letras validas; espacios y signos no consumen clave.",
            summaryCards: [
                { label: "Operacion", value: decrypt ? "Descifrar" : "Cifrar", tone: "tone-success", note: "Polialfabetico" },
                { label: "Clave", value: `${shifts.length} letras`, tone: "tone-neutral", note: "Normalizada" },
                { label: "Alfabeto", value: `${alphabetCharacters(alphabet).length}`, tone: "tone-neutral", note: alphabet.value },
                { label: "Letras", value: String(result.transformed), tone: result.transformed ? "tone-success" : "tone-warning", note: "Transformadas" }
            ],
            signalCards: [
                { label: "Clave repetida", value: "Si", tone: "tone-warning", note: "Patron detectable" },
                { label: "No alfabeticos", value: "Intactos", tone: "tone-neutral", note: "No consumen clave" },
                { label: "Reversible", value: "Si", tone: "tone-success", note: "Resta desplazamientos" },
                { label: "Uso", value: "Historico", tone: "tone-neutral", note: "No moderno" }
            ],
            panels: [
                { title: "Resultado", badge: "vig", content: result.output, copyValue: result.output },
                { title: "Traza", badge: "pasos", content: trace, copyValue: trace },
                { title: "Clave normalizada", badge: "key", content: shifts.join(", "), copyValue: shifts.join(", ") }
            ]
        };
    } catch (error) {
        vigenereResult.value = buildErrorResult("VIGENERE_FAILED", "No se pudo ejecutar Vigenere", error.message);
    }
}

function gcdNumber(a, b) {
    let left = Math.abs(a);
    let right = Math.abs(b);
    while (right) {
        const temp = right;
        right = left % right;
        left = temp;
    }
    return left;
}

function modInverseNumber(value, modulus) {
    let a = ((value % modulus) + modulus) % modulus;
    let m = modulus;
    let x0 = 0;
    let x1 = 1;
    if (modulus === 1) return 0;
    while (a > 1) {
        const quotient = Math.floor(a / m);
        [a, m] = [m, a % m];
        [x0, x1] = [x1 - quotient * x0, x0];
    }
    return x1 < 0 ? x1 + modulus : x1;
}

function validAffineMultipliers(modulus) {
    return Array.from({ length: modulus }, (_, index) => index).filter(value => gcdNumber(value, modulus) === 1);
}

function applyAffine(value, alphabet, a, b, decrypt = false) {
    const modulus = alphabetCharacters(alphabet).length;
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error("a y b deben ser enteros.");
    }
    if (gcdNumber(a, modulus) !== 1) {
        throw new Error(`a=${a} no tiene inverso modulo ${modulus}. Usa uno de: ${validAffineMultipliers(modulus).join(", ")}.`);
    }
    const normalizedB = ((b % modulus) + modulus) % modulus;
    const inverseA = modInverseNumber(a, modulus);
    const mapper = decrypt
        ? index => ((inverseA * (index - normalizedB)) % modulus + modulus) % modulus
        : index => ((a * index + normalizedB) % modulus + modulus) % modulus;
    return {
        ...transformAlphabetCharacters(value, alphabet, mapper),
        normalizedB,
        inverseA,
        table: buildSubstitutionPairs(alphabet, mapper)
    };
}

function fillAffineExample() {
    affineAlphabet.value = "english";
    affineDirection.value = "encrypt";
    affineA.value = 5;
    affineB.value = 8;
    affineInput.value = "AFFINE CIPHER";
}

function toggleAffineDirection() {
    affineDirection.value = affineDirection.value === "encrypt" ? "decrypt" : "encrypt";
}

function useAffineOutputAsInput() {
    if (!affineResult.value?.primaryValue) {
        affineResult.value = buildErrorResult("AFFINE_OUTPUT_EMPTY", "No hay salida Afin", "Ejecuta primero Afin para pasar la salida a la entrada.");
        return;
    }
    affineInput.value = affineResult.value.primaryValue;
}

function runAffineCipher() {
    if (!affineInput.value) {
        affineResult.value = buildErrorResult("AFFINE_EMPTY", "Falta texto", "Introduce texto antes de ejecutar Afin.");
        return;
    }
    try {
        const alphabet = getAlphabetByValue(affineAlphabet.value);
        const decrypt = affineDirection.value === "decrypt";
        const result = applyAffine(affineInput.value, alphabet, Number(affineA.value), Number(affineB.value), decrypt);
        affineResult.value = {
            primaryValue: result.output,
            verdictTone: result.transformed ? "verdict-success" : "verdict-warning",
            verdictTitle: decrypt ? "Afin descifrado" : "Afin cifrado",
            verdictBody: decrypt
                ? `Se uso el inverso modular de a: ${result.inverseA}.`
                : "Cada letra se transforma con una funcion lineal modulo el tamano del alfabeto.",
            summaryCards: [
                { label: "Operacion", value: decrypt ? "Descifrar" : "Cifrar", tone: "tone-success", note: "Funcion afin" },
                { label: "a", value: String(affineA.value), tone: "tone-neutral", note: `inv ${result.inverseA}` },
                { label: "b", value: String(result.normalizedB), tone: "tone-neutral", note: "Modulo alfabeto" },
                { label: "Modulo", value: String(alphabetCharacters(alphabet).length), tone: "tone-neutral", note: alphabet.value }
            ],
            signalCards: [
                { label: "gcd(a,m)", value: "1", tone: "tone-success", note: "Invertible" },
                { label: "Letras", value: String(result.transformed), tone: result.transformed ? "tone-success" : "tone-warning", note: "Transformadas" },
                { label: "Frecuencia", value: "Conservada", tone: "tone-warning", note: "Sustitucion monoalfabetica" },
                { label: "Formula", value: decrypt ? "D(y)" : "E(x)", tone: "tone-neutral", note: decrypt ? "invA*(y-b)" : "a*x+b" }
            ],
            panels: [
                { title: "Resultado", badge: "afin", content: result.output, copyValue: result.output },
                { title: "Tabla de sustitucion", badge: "mapa", content: result.table, copyValue: result.table },
                {
                    title: "Lectura tecnica",
                    badge: "mod",
                    content: buildTextList("Parametros", [
                        `m = ${alphabetCharacters(alphabet).length}.`,
                        `a = ${affineA.value}, b = ${result.normalizedB}.`,
                        `inverso(a) = ${result.inverseA}.`,
                        decrypt ? "Descifrado: x = inv(a) * (y - b) mod m." : "Cifrado: y = (a*x + b) mod m."
                    ]),
                    copyValue: `a=${affineA.value}\nb=${result.normalizedB}\ninvA=${result.inverseA}`
                }
            ]
        };
    } catch (error) {
        affineResult.value = buildErrorResult("AFFINE_FAILED", "No se pudo ejecutar Afin", error.message);
    }
}

function normalizeRailFenceRails(value) {
    const rails = Number(value);
    if (!Number.isInteger(rails) || rails < 2 || rails > 16) {
        throw new Error("El numero de railes debe ser un entero entre 2 y 16.");
    }
    return rails;
}

function railFencePattern(length, rails) {
    if (rails === 2) {
        return Array.from({ length }, (_, index) => index % 2);
    }
    const cycle = (rails - 1) * 2;
    return Array.from({ length }, (_, index) => {
        const mod = index % cycle;
        return mod < rails ? mod : cycle - mod;
    });
}

function encryptRailFence(value, rails) {
    const chars = Array.from(value);
    const pattern = railFencePattern(chars.length, rails);
    const rows = Array.from({ length: rails }, () => []);
    chars.forEach((char, index) => rows[pattern[index]].push(char));
    return {
        output: rows.map(row => row.join("")).join(""),
        rows: rows.map(row => row.join(""))
    };
}

function decryptRailFence(value, rails) {
    const chars = Array.from(value);
    const pattern = railFencePattern(chars.length, rails);
    const counts = Array.from({ length: rails }, (_, rail) => pattern.filter(item => item === rail).length);
    const rows = [];
    let cursor = 0;
    counts.forEach(count => {
        rows.push(chars.slice(cursor, cursor + count));
        cursor += count;
    });
    const positions = Array.from({ length: rails }, () => 0);
    const output = pattern.map(rail => rows[rail][positions[rail]++]).join("");
    return { output, rows: rows.map(row => row.join("")) };
}

function buildRailFenceGrid(value, rails) {
    const chars = Array.from(value);
    const pattern = railFencePattern(chars.length, rails);
    const rows = Array.from({ length: rails }, () => Array.from({ length: chars.length }, () => "."));
    chars.forEach((char, index) => {
        rows[pattern[index]][index] = char === " " ? "_" : char;
    });
    return rows.map((row, index) => `${String(index + 1).padStart(2, "0")}: ${row.join(" ")}`).join("\n");
}

function fillRailFenceExample() {
    railFenceDirection.value = "encrypt";
    railFenceRails.value = 3;
    railFenceInput.value = "WE ARE DISCOVERED FLEE AT ONCE";
}

function toggleRailFenceDirection() {
    railFenceDirection.value = railFenceDirection.value === "encrypt" ? "decrypt" : "encrypt";
}

function useRailFenceOutputAsInput() {
    if (!railFenceResult.value?.primaryValue) {
        railFenceResult.value = buildErrorResult("RAIL_OUTPUT_EMPTY", "No hay salida Rail Fence", "Ejecuta primero Rail Fence para pasar la salida a la entrada.");
        return;
    }
    railFenceInput.value = railFenceResult.value.primaryValue;
}

function runRailFenceCipher() {
    if (!railFenceInput.value) {
        railFenceResult.value = buildErrorResult("RAIL_EMPTY", "Falta texto", "Introduce texto antes de ejecutar Rail Fence.");
        return;
    }
    try {
        const rails = normalizeRailFenceRails(railFenceRails.value);
        const decrypt = railFenceDirection.value === "decrypt";
        const result = decrypt ? decryptRailFence(railFenceInput.value, rails) : encryptRailFence(railFenceInput.value, rails);
        const grid = buildRailFenceGrid(decrypt ? result.output : railFenceInput.value, rails);
        railFenceResult.value = {
            primaryValue: result.output,
            verdictTone: "verdict-success",
            verdictTitle: decrypt ? "Rail Fence descifrado" : "Rail Fence cifrado",
            verdictBody: "Rail Fence es una transposicion: conserva caracteres y longitud, pero cambia el orden de lectura.",
            summaryCards: [
                { label: "Operacion", value: decrypt ? "Descifrar" : "Cifrar", tone: "tone-success", note: "Transposicion" },
                { label: "Railes", value: String(rails), tone: "tone-neutral", note: "Zigzag" },
                { label: "Longitud", value: `${Array.from(railFenceInput.value).length} chars`, tone: "tone-neutral", note: "Conservada" },
                { label: "Reversible", value: "Si", tone: "tone-success", note: "Mismos railes" }
            ],
            signalCards: [
                { label: "Sustitucion", value: "No", tone: "tone-neutral", note: "No cambia letras" },
                { label: "Espacios", value: "Conservados", tone: "tone-neutral", note: "Tambien signos" },
                { label: "Frecuencia", value: "Igual", tone: "tone-warning", note: "Solo permuta" },
                { label: "Seguridad", value: "Historica", tone: "tone-warning", note: "No moderna" }
            ],
            panels: [
                { title: "Resultado", badge: "rail", content: result.output, copyValue: result.output },
                { title: "Zigzag", badge: "grid", content: grid, copyValue: grid },
                { title: "Lectura por railes", badge: "filas", content: buildTextList("Railes", result.rows.map((row, index) => `${index + 1}: ${row}`)), copyValue: result.rows.join("\n") }
            ]
        };
    } catch (error) {
        railFenceResult.value = buildErrorResult("RAIL_FAILED", "No se pudo ejecutar Rail Fence", error.message);
    }
}

function parseBigInteger(value, label) {
    const normalized = String(value ?? "").trim();
    if (!/^-?\d+$/.test(normalized)) {
        throw new Error(`${label} debe ser un entero en base 10.`);
    }
    return BigInt(normalized);
}

function positiveModulo(value, modulus) {
    return ((value % modulus) + modulus) % modulus;
}

function modPow(base, exponent, modulus) {
    if (exponent < 0n) {
        throw new Error("El exponente debe ser igual o mayor que 0.");
    }
    let result = 1n;
    let currentBase = positiveModulo(base, modulus);
    let currentExponent = exponent;
    while (currentExponent > 0n) {
        if (currentExponent % 2n === 1n) {
            result = (result * currentBase) % modulus;
        }
        currentBase = (currentBase * currentBase) % modulus;
        currentExponent /= 2n;
    }
    return result;
}

function fillModularExample() {
    modularOperation.value = "mod";
    modularBase.value = "118613842";
    modularExponent.value = "";
    modularModulus.value = "9091";
}

function fillModuloSimpleExample() {
    modularOperation.value = "mod";
    modularBase.value = "60";
    modularExponent.value = "";
    modularModulus.value = "12";
}

function runModularLab() {
    if (!modularBase.value.trim() || !modularModulus.value.trim()) {
        modularResult.value = buildErrorResult("MOD_EMPTY", "Faltan numeros", "Introduce A y N antes de calcular la operacion modular.");
        return;
    }

    try {
        const base = parseBigInteger(modularBase.value, "A");
        const modulus = parseBigInteger(modularModulus.value, "N");
        if (modulus <= 0n) {
            throw new Error("N debe ser un entero positivo.");
        }

        let result;
        let operationText;
        let identityText;
        let exponent = null;

        if (modularOperation.value === "pow") {
            if (!modularExponent.value.trim()) {
                throw new Error("Introduce E para calcular A^E % N.");
            }
            exponent = parseBigInteger(modularExponent.value, "E");
            result = modPow(base, exponent, modulus);
            operationText = `${base}^${exponent} % ${modulus} = ${result}`;
            identityText = "La potencia modular se calcula reduciendo en cada multiplicacion para no crear enteros gigantes intermedios.";
        } else {
            result = positiveModulo(base, modulus);
            const quotient = (base - result) / modulus;
            operationText = `${base} % ${modulus} = ${result}`;
            identityText = `${base} = ${modulus} x ${quotient} + ${result}`;
        }

        const inRange = result >= 0n && result < modulus;
        modularResult.value = {
            primaryValue: result.toString(),
            verdictTone: "verdict-success",
            verdictTitle: "Operacion modular calculada",
            verdictBody: `El resultado queda en el rango 0..N-1. ${modularOperation.value === "mod" ? "El modulo no es reversible: infinitos A pueden dar el mismo resto." : "La potencia modular es una pieza basica en criptografia de clave publica."}`,
            summaryCards: [
                { label: "Operacion", value: modularOperation.value === "pow" ? "A^E % N" : "A % N", tone: "tone-neutral", note: "Modo" },
                { label: "Resultado", value: result.toString(), tone: "tone-success", note: "Resto" },
                { label: "Modulo N", value: modulus.toString(), tone: "tone-neutral", note: "Entero positivo" },
                { label: "Rango", value: inRange ? "OK" : "Fuera", tone: inRange ? "tone-success" : "tone-danger", note: "0 <= r < N" }
            ],
            signalCards: [
                { label: "Reversible", value: "No", tone: "tone-warning", note: "Muchos A comparten resto" },
                { label: "BigInt", value: "Activo", tone: "tone-success", note: "Enteros grandes" },
                { label: "Cripto", value: "Base", tone: "tone-neutral", note: "RSA/DH/ECC" },
                { label: "Exponente", value: exponent === null ? "N/D" : exponent.toString(), tone: "tone-neutral", note: modularOperation.value === "pow" ? "E" : "No usado" }
            ],
            panels: [
                {
                    title: "Resultado",
                    badge: "mod",
                    content: buildTextList("Calculo", [operationText, identityText]),
                    copyValue: result.toString()
                },
                {
                    title: "Lectura tecnica",
                    badge: "notas",
                    content: buildTextList("Propiedades", [
                        "A % N devuelve el resto de dividir A entre N.",
                        "El resultado siempre queda entre 0 y N - 1 si N es positivo.",
                        "Saber que x % 5 = 4 no permite recuperar x: 4, 9, 14, 19... cumplen la misma ecuacion.",
                        modularOperation.value === "pow" ? "A^E % N permite trabajar con potencias enormes reduciendo en cada paso." : ""
                    ]),
                    copyValue: `${operationText}\n${identityText}`
                }
            ]
        };
    } catch (error) {
        modularResult.value = buildErrorResult("MOD_FAILED", "No se pudo calcular modulo", error.message);
    }
}

function parseByteInput() {
    if (!byteInput.value.trim()) {
        throw new Error("Introduce material para inspeccionar.");
    }
    if (byteInputMode.value === "hex") return hexToBytes(byteInput.value);
    if (byteInputMode.value === "base64") return base64ToBytes(byteInput.value);
    if (byteInputMode.value === "base64url") return base64UrlToBytes(byteInput.value);
    return textToEncodedBytes(byteInput.value, encodingFromTextMode(byteInputMode.value));
}

function inspectBytes() {
    try {
        const bytes = parseByteInput();
        const hex = bytesToHex(bytes);
        const base64 = bytesToBase64(bytes);
        const base64url = bytesToBase64Url(bytes);
        const binary = Array.from(bytes).map(byte => byte.toString(2).padStart(8, "0")).join(" ");
        const decimal = Array.from(bytes).join(", ");
        const encodingSignals = analyzeEncodingSignals(bytes);
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
        let utf16le = "";
        let utf16be = "";
        let ascii = "";
        let latin1 = "";
        let windows1252 = "";
        try {
            utf16le = bytesToEncodedText(bytes, "utf16le");
        } catch {
            utf16le = "No decodificable como UTF-16LE valido.";
        }
        try {
            utf16be = bytesToEncodedText(bytes, "utf16be");
        } catch {
            utf16be = "No decodificable como UTF-16BE valido.";
        }
        ascii = bytesToEncodedText(bytes, "ascii");
        latin1 = bytesToEncodedText(bytes, "latin1");
        windows1252 = bytesToEncodedText(bytes, "windows1252");

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
                { label: "UTF", value: utf8 ? "UTF-8" : "Vacio", tone: utf8 ? "tone-success" : "tone-neutral", note: "UTF-16 incluido" }
            ],
            panels: [
                { title: "Tabla de bytes", badge: "bytes", content: table || "Sin bytes", copyValue: table },
                { title: "Perfil de codificacion", badge: "prof", content: buildTextList("Senales", encodingSignals), copyValue: encodingSignals.join("\n") },
                { title: "Representaciones", badge: "enc", content: buildTextList("Formatos", [
                    `UTF-8: ${utf8}`,
                    `UTF-16LE: ${utf16le}`,
                    `UTF-16BE: ${utf16be}`,
                    `ASCII: ${ascii}`,
                    `Latin-1: ${latin1}`,
                    `Windows-1252: ${windows1252}`,
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

function handleStegoAnalyzeFile(event) {
    stegoAnalyzeFile.value = event.target.files?.[0] || null;
    stegoAnalyzeResult.value = null;
}

function handleExifFile(event) {
    exifFile.value = event.target.files?.[0] || null;
    exifResult.value = null;
    clearExifDownloads();
}

function handleMetadataEditorFile(event) {
    metadataEditorFile.value = event.target.files?.[0] || null;
    metadataEditorResult.value = null;
    clearMetadataEditorDownload();
}

function handleStegoEmbedFile(event) {
    stegoEmbedFile.value = event.target.files?.[0] || null;
    stegoEmbedResult.value = null;
    clearStegoDownload();
}

function handleStegoPayloadFile(event) {
    const file = event.target.files?.[0] || null;
    stegoEmbedPayloadFile.value = file;
    stegoEmbedPayloadName.value = file?.name || "";
    stegoEmbedResult.value = null;
    clearStegoDownload();
}

function handleStegoExtractFile(event) {
    stegoExtractFile.value = event.target.files?.[0] || null;
    stegoExtractResult.value = null;
    clearStegoExtractDownload();
}

function handleSteghideFile(event) {
    steghideFile.value = event.target.files?.[0] || null;
    steghideResult.value = null;
    clearSteghideDownload();
}

function handleSteghideSecretFile(event) {
    steghideSecretFile.value = event.target.files?.[0] || null;
    steghideResult.value = null;
    clearSteghideDownload();
}

function handleSteghideWordlistFile(event) {
    steghideWordlistFile.value = event.target.files?.[0] || null;
    steghideResult.value = null;
}

function clearStegoAnalyze() {
    stegoAnalyzeFile.value = null;
    stegoAnalyzeResult.value = null;
}

function clearExifAnalysis() {
    exifFile.value = null;
    exifResult.value = null;
    exifTagFilter.value = "";
    clearExifDownloads();
}

function clearMetadataEditor() {
    metadataEditorFile.value = null;
    metadataEditorTitle.value = "";
    metadataEditorAuthor.value = "";
    metadataEditorDescription.value = "";
    metadataEditorCopyright.value = "";
    metadataEditorLanguage.value = "spa";
    metadataEditorTags.value = "";
    metadataEditorPayloadEncoding.value = "base64";
    metadataEditorPayload.value = "";
    metadataEditorResult.value = null;
    clearMetadataEditorDownload();
}

function clearStegoExtract() {
    stegoExtractFile.value = null;
    stegoExtractResult.value = null;
    clearStegoExtractDownload();
}

function clearStegoEmbed() {
    stegoEmbedFile.value = null;
    stegoEmbedPayloadFile.value = null;
    stegoEmbedPayloadName.value = "";
    stegoEmbedPayload.value = "";
    stegoEmbedCarrierHint.value = "auto";
    stegoEmbedMode.value = "auto";
    stegoEmbedPayloadSource.value = "text";
    stegoEmbedTextEncoding.value = "utf8";
    stegoEmbedResult.value = null;
    clearStegoDownload();
}

function clearSteghideLab() {
    steghideFile.value = null;
    steghideSecretFile.value = null;
    steghideWordlistFile.value = null;
    steghidePassphrase.value = "";
    steghideEncryption.value = "aes-gcm";
    steghideCompression.value = "auto";
    steghideCompressionLevel.value = 6;
    steghideChecksum.value = true;
    steghideStoreName.value = true;
    steghideMaxGuesses.value = 5000;
    steghideSkipDefaultGuesses.value = false;
    steghideResult.value = null;
    clearSteghideDownload();
}

function clearMetadataEditorDownload() {
    if (metadataEditorDownloadUrl.value) {
        URL.revokeObjectURL(metadataEditorDownloadUrl.value);
    }
    metadataEditorDownloadUrl.value = "";
}

function clearExifDownloads() {
    if (exifTxtDownloadUrl.value) {
        URL.revokeObjectURL(exifTxtDownloadUrl.value);
    }
    if (exifJsonDownloadUrl.value) {
        URL.revokeObjectURL(exifJsonDownloadUrl.value);
    }
    exifTxtDownloadUrl.value = "";
    exifJsonDownloadUrl.value = "";
    exifTxtDownloadName.value = "feanor-exif-report.txt";
    exifJsonDownloadName.value = "feanor-exif-report.json";
}

function setExifDownloads(baseName, reportText, reportJson) {
    clearExifDownloads();
    const safeBase = safeFileBaseName(baseName || "feanor-exif");
    exifTxtDownloadName.value = `${safeBase}-exif-report.txt`;
    exifJsonDownloadName.value = `${safeBase}-exif-report.json`;
    exifTxtDownloadUrl.value = URL.createObjectURL(new Blob([reportText], { type: "text/plain;charset=utf-8" }));
    exifJsonDownloadUrl.value = URL.createObjectURL(new Blob([safeJson(reportJson)], { type: "application/json;charset=utf-8" }));
}

function setMetadataEditorDownload(blob, filename) {
    clearMetadataEditorDownload();
    metadataEditorDownloadUrl.value = URL.createObjectURL(blob);
    metadataEditorDownloadName.value = filename;
}

function clearStegoDownload() {
    if (stegoEmbedDownloadUrl.value) {
        URL.revokeObjectURL(stegoEmbedDownloadUrl.value);
    }
    stegoEmbedDownloadUrl.value = "";
    stegoEmbedDownloadName.value = "feanor-stego.bin";
}

function setStegoDownload(blob, filename) {
    clearStegoDownload();
    stegoEmbedDownloadUrl.value = URL.createObjectURL(blob);
    stegoEmbedDownloadName.value = filename;
}

function clearStegoExtractDownload() {
    if (stegoExtractDownloadUrl.value) {
        URL.revokeObjectURL(stegoExtractDownloadUrl.value);
    }
    stegoExtractDownloadUrl.value = "";
    stegoExtractDownloadName.value = "feanor-payload.bin";
}

function setStegoExtractDownload(blob, filename) {
    clearStegoExtractDownload();
    stegoExtractDownloadUrl.value = URL.createObjectURL(blob);
    stegoExtractDownloadName.value = filename;
}

function clearSteghideDownload() {
    if (steghideDownloadUrl.value) {
        URL.revokeObjectURL(steghideDownloadUrl.value);
    }
    steghideDownloadUrl.value = "";
    steghideDownloadName.value = "feanor-steghide-output.bin";
}

function setSteghideDownload(blob, filename) {
    clearSteghideDownload();
    steghideDownloadUrl.value = URL.createObjectURL(blob);
    steghideDownloadName.value = filename;
}

function safeFileBaseName(name) {
    return String(name || "feanor-stego")
        .replace(/\.[^.]+$/, "")
        .replace(/[^a-z0-9_-]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        || "feanor-stego";
}

function asciiBytes(value) {
    return Uint8Array.from(String(value ?? ""), char => char.charCodeAt(0) & 0xff);
}

function concatBytes(...parts) {
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(total);
    let offset = 0;
    parts.forEach(part => {
        output.set(part, offset);
        offset += part.length;
    });
    return output;
}

function uint32BytesBE(value) {
    const number = Number(value) >>> 0;
    return new Uint8Array([
        (number >>> 24) & 0xff,
        (number >>> 16) & 0xff,
        (number >>> 8) & 0xff,
        number & 0xff
    ]);
}

function uint32BytesLE(value) {
    const number = Number(value) >>> 0;
    return new Uint8Array([
        number & 0xff,
        (number >>> 8) & 0xff,
        (number >>> 16) & 0xff,
        (number >>> 24) & 0xff
    ]);
}

function syncsafeToInt(bytes, offset = 0) {
    return ((bytes[offset] & 0x7f) << 21)
        | ((bytes[offset + 1] & 0x7f) << 14)
        | ((bytes[offset + 2] & 0x7f) << 7)
        | (bytes[offset + 3] & 0x7f);
}

function intToSyncsafe(value) {
    const size = Number(value);
    if (!Number.isInteger(size) || size < 0 || size > 0x0fffffff) {
        throw new Error("El bloque ID3 supera el tamano permitido por un entero syncsafe.");
    }
    return new Uint8Array([
        (size >>> 21) & 0x7f,
        (size >>> 14) & 0x7f,
        (size >>> 7) & 0x7f,
        size & 0x7f
    ]);
}

function xmlEscape(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function metadataTagsList() {
    return metadataEditorTags.value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);
}

function encodeMetadataPayload() {
    const payload = metadataEditorPayload.value;
    if (!payload) return "";
    if (metadataEditorPayloadEncoding.value === "base64") return utf8ToBase64(payload);
    if (metadataEditorPayloadEncoding.value === "base64url") return base64ToBase64Url(utf8ToBase64(payload));
    if (metadataEditorPayloadEncoding.value === "hex") return bytesToHex(textToBytes(payload));
    return payload;
}

function buildMetadataDescriptor(file, format, mode) {
    const encodedPayload = encodeMetadataPayload();
    const tags = metadataTagsList();
    const generatedAt = new Date().toISOString();
    const fields = {
        title: metadataEditorTitle.value.trim(),
        creator: metadataEditorAuthor.value.trim(),
        description: metadataEditorDescription.value.trim(),
        copyright: metadataEditorCopyright.value.trim(),
        language: metadataEditorLanguage.value,
        software: "CodiceFeanor metadata lab",
        tags,
        feanorPayloadEncoding: metadataEditorPayloadEncoding.value,
        feanorPayload: encodedPayload,
        sourceName: file.name,
        targetContainer: format.container,
        writeMode: mode,
        generatedAt
    };

    return {
        fields,
        encodedPayload,
        lines: [
            fields.title ? `Title: ${fields.title}` : "",
            fields.creator ? `Creator/Artist: ${fields.creator}` : "",
            fields.description ? `Description: ${fields.description}` : "",
            fields.copyright ? `Copyright: ${fields.copyright}` : "",
            tags.length ? `Tags: ${tags.join(", ")}` : "",
            encodedPayload ? `FeanorPayload(${fields.feanorPayloadEncoding}): ${encodedPayload}` : "",
            `Software: ${fields.software}`,
            `GeneratedAt: ${generatedAt}`
        ].filter(Boolean)
    };
}

function fillMetadataEditorExample() {
    metadataEditorType.value = "mp3";
    metadataEditorMode.value = "auto";
    metadataEditorTitle.value = "Laboratorio ID3 Feanor";
    metadataEditorAuthor.value = "equipo-forense";
    metadataEditorDescription.value = "MP3 con comentario y payload codificado para practicar lectura de metadatos.";
    metadataEditorCopyright.value = "Uso educativo";
    metadataEditorLanguage.value = "spa";
    metadataEditorTags.value = "ctf, metadata, id3";
    metadataEditorPayloadEncoding.value = "base64";
    metadataEditorPayload.value = safeJson({
        lab: "metadata-editor",
        objetivo: "insertar texto codificado en MP3",
        nota: "buscar frame TXXX FeanorEncodedPayload"
    });
}

function looksLikeMp3(bytes, file) {
    const extension = (file?.name?.split(".").pop() || "").toLowerCase();
    return startsWithBytes(bytes, [0x49, 0x44, 0x33])
        || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)
        || extension === "mp3";
}

function id3TextFrame(id, value) {
    if (!value) return new Uint8Array();
    return id3Frame(id, concatBytes(new Uint8Array([0x03]), textToBytes(value)));
}

function id3TxxxFrame(description, value) {
    if (!value) return new Uint8Array();
    return id3Frame("TXXX", concatBytes(
        new Uint8Array([0x03]),
        textToBytes(description),
        new Uint8Array([0x00]),
        textToBytes(value)
    ));
}

function id3CommentFrame(language, description, value) {
    if (!value) return new Uint8Array();
    const lang = asciiBytes(String(language || "und").slice(0, 3).padEnd(3, "x"));
    return id3Frame("COMM", concatBytes(
        new Uint8Array([0x03]),
        lang,
        textToBytes(description),
        new Uint8Array([0x00]),
        textToBytes(value)
    ));
}

function id3Frame(id, body) {
    return concatBytes(
        asciiBytes(id),
        intToSyncsafe(body.length),
        new Uint8Array([0x00, 0x00]),
        body
    );
}

function buildId3v24Tag(descriptor) {
    const fields = descriptor.fields;
    const frames = [
        id3TextFrame("TIT2", fields.title),
        id3TextFrame("TPE1", fields.creator),
        id3TextFrame("TCOP", fields.copyright),
        id3TextFrame("TSSE", fields.software),
        id3CommentFrame(fields.language, "FeanorComment", fields.description),
        id3TxxxFrame("FeanorEncodedPayload", fields.feanorPayload),
        id3TxxxFrame("FeanorPayloadEncoding", fields.feanorPayloadEncoding),
        id3TxxxFrame("FeanorTags", fields.tags.join(", "))
    ].filter(frame => frame.length);
    const body = concatBytes(...frames);
    return concatBytes(
        asciiBytes("ID3"),
        new Uint8Array([0x04, 0x00, 0x00]),
        intToSyncsafe(body.length),
        body
    );
}

function writeMp3Metadata(bytes, file, descriptor) {
    if (!looksLikeMp3(bytes, file)) {
        throw new Error("El fichero no parece MP3. Revisa el selector o sube un .mp3 real.");
    }
    let audioStart = 0;
    let replacedOldTag = false;
    if (startsWithBytes(bytes, [0x49, 0x44, 0x33]) && bytes.length >= 10) {
        audioStart = 10 + syncsafeToInt(bytes, 6);
        replacedOldTag = true;
    }
    const tag = buildId3v24Tag(descriptor);
    return {
        bytes: concatBytes(tag, bytes.slice(audioStart)),
        technicalLines: [
            "Formato directo: ID3v2.4.",
            `Tag ID3 escrito: ${formatBytesSize(tag.length)}.`,
            replacedOldTag ? `Etiqueta ID3 anterior reemplazada: ${formatBytesSize(audioStart)}.` : "El MP3 no tenia etiqueta ID3v2 inicial legible.",
            "Payload guardado en TXXX:FeanorEncodedPayload."
        ]
    };
}

let pngCrcTable = null;

function getPngCrcTable() {
    if (pngCrcTable) return pngCrcTable;
    pngCrcTable = new Uint32Array(256);
    for (let index = 0; index < 256; index += 1) {
        let value = index;
        for (let bit = 0; bit < 8; bit += 1) {
            value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
        }
        pngCrcTable[index] = value >>> 0;
    }
    return pngCrcTable;
}

function pngCrc32(bytes) {
    const table = getPngCrcTable();
    let crc = 0xffffffff;
    bytes.forEach(byte => {
        crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    });
    return (crc ^ 0xffffffff) >>> 0;
}

function makePngChunk(type, data) {
    const typeBytes = asciiBytes(type);
    return concatBytes(
        uint32BytesBE(data.length),
        typeBytes,
        data,
        uint32BytesBE(pngCrc32(concatBytes(typeBytes, data)))
    );
}

function makePngItxtChunk(keyword, value, language = "und") {
    const safeKeyword = String(keyword).replace(/[^\x20-\x7e]/g, "").slice(0, 79) || "Feanor";
    return makePngChunk("iTXt", concatBytes(
        asciiBytes(safeKeyword),
        new Uint8Array([0x00, 0x00, 0x00]),
        asciiBytes(language),
        new Uint8Array([0x00, 0x00]),
        textToBytes(value)
    ));
}

function writePngMetadata(bytes, descriptor) {
    if (!startsWithBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
        throw new Error("El fichero no tiene firma PNG valida.");
    }
    const parsed = parsePngChunks(bytes);
    const iend = parsed.chunks.find(chunk => chunk.type === "IEND");
    if (!iend) {
        throw new Error("No se encontro chunk IEND; no es seguro reescribir el PNG.");
    }
    const fields = descriptor.fields;
    const chunks = [
        fields.title ? makePngItxtChunk("Title", fields.title, fields.language) : new Uint8Array(),
        fields.creator ? makePngItxtChunk("Author", fields.creator, fields.language) : new Uint8Array(),
        fields.description ? makePngItxtChunk("Description", fields.description, fields.language) : new Uint8Array(),
        fields.copyright ? makePngItxtChunk("Copyright", fields.copyright, fields.language) : new Uint8Array(),
        makePngItxtChunk("Software", fields.software, fields.language),
        fields.feanorPayload ? makePngItxtChunk("FeanorPayload", fields.feanorPayload, fields.language) : new Uint8Array(),
        makePngItxtChunk("FeanorEncoding", fields.feanorPayloadEncoding, fields.language),
        fields.tags.length ? makePngItxtChunk("Keywords", fields.tags.join(", "), fields.language) : new Uint8Array()
    ].filter(chunk => chunk.length);
    const inserted = concatBytes(...chunks);
    return {
        bytes: concatBytes(bytes.slice(0, iend.offset), inserted, bytes.slice(iend.offset)),
        technicalLines: [
            "Formato directo: PNG iTXt UTF-8.",
            `Chunks insertados antes de IEND: ${chunks.length}.`,
            `Metadatos nuevos: ${formatBytesSize(inserted.length)}.`,
            "No se han modificado IDAT ni los pixeles."
        ]
    };
}

function writeJpegMetadata(bytes, descriptor) {
    if (!startsWithBytes(bytes, [0xff, 0xd8])) {
        throw new Error("El fichero no tiene cabecera JPEG SOI.");
    }
    const comment = [
        "CodiceFeanor metadata",
        ...descriptor.lines
    ].join("\n");
    const commentBytes = textToBytes(comment);
    if (commentBytes.length > 65533) {
        throw new Error("El comentario JPEG supera el maximo de 65533 bytes.");
    }
    const length = commentBytes.length + 2;
    const segment = concatBytes(
        new Uint8Array([0xff, 0xfe, (length >>> 8) & 0xff, length & 0xff]),
        commentBytes
    );
    return {
        bytes: concatBytes(bytes.slice(0, 2), segment, bytes.slice(2)),
        technicalLines: [
            "Formato directo: segmento JPEG COM.",
            `Comentario insertado: ${formatBytesSize(commentBytes.length)}.`,
            "No se reinterpreta APP1/EXIF para evitar mover MakerNotes."
        ]
    };
}

function buildSvgMetadataBlock(descriptor) {
    const fields = descriptor.fields;
    const tags = fields.tags.map(tag => `<dc:subject>${xmlEscape(tag)}</dc:subject>`).join("\n        ");
    return `<metadata id="feanor-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:feanor="https://local.feanor/metadata">
      <rdf:Description>
        <dc:title>${xmlEscape(fields.title)}</dc:title>
        <dc:creator>${xmlEscape(fields.creator)}</dc:creator>
        <dc:description>${xmlEscape(fields.description)}</dc:description>
        <dc:rights>${xmlEscape(fields.copyright)}</dc:rights>
        ${tags}
        <feanor:payloadEncoding>${xmlEscape(fields.feanorPayloadEncoding)}</feanor:payloadEncoding>
        <feanor:payload>${xmlEscape(fields.feanorPayload)}</feanor:payload>
        <feanor:software>${xmlEscape(fields.software)}</feanor:software>
      </rdf:Description>
    </rdf:RDF>
  </metadata>`;
}

function writeSvgMetadata(bytes, descriptor) {
    const text = bytesToUtf8(bytes);
    const svgOpen = text.match(/<svg\b[^>]*>/i);
    if (!svgOpen) {
        throw new Error("No se encontro etiqueta <svg> inicial.");
    }
    const withoutOldBlock = text.replace(/\s*<metadata id="feanor-metadata">[\s\S]*?<\/metadata>\s*/i, "\n");
    const output = withoutOldBlock.replace(/<svg\b[^>]*>/i, match => `${match}\n  ${buildSvgMetadataBlock(descriptor)}\n`);
    return {
        bytes: textToBytes(output),
        technicalLines: [
            "Formato directo: bloque SVG metadata XML.",
            "Si ya existia metadata id=feanor-metadata, se reemplazo.",
            "El payload queda escapado como XML."
        ]
    };
}

function wavInfoSubchunk(id, value) {
    if (!value) return new Uint8Array();
    const data = concatBytes(textToBytes(value), new Uint8Array([0x00]));
    const pad = data.length % 2 ? new Uint8Array([0x00]) : new Uint8Array();
    return concatBytes(asciiBytes(id), uint32BytesLE(data.length), data, pad);
}

function writeWavMetadata(bytes, descriptor) {
    if (asciiSlice(bytes, 0, 4) !== "RIFF" || asciiSlice(bytes, 8, 12) !== "WAVE") {
        throw new Error("El fichero no es un RIFF/WAVE valido.");
    }
    const fields = descriptor.fields;
    const comment = [
        fields.description,
        fields.feanorPayload ? `FeanorPayload(${fields.feanorPayloadEncoding}): ${fields.feanorPayload}` : ""
    ].filter(Boolean).join("\n");
    const subchunks = [
        wavInfoSubchunk("INAM", fields.title),
        wavInfoSubchunk("IART", fields.creator),
        wavInfoSubchunk("ICMT", comment),
        wavInfoSubchunk("ICOP", fields.copyright),
        wavInfoSubchunk("ISFT", fields.software),
        wavInfoSubchunk("IKEY", fields.tags.join(", "))
    ].filter(chunk => chunk.length);
    const listData = concatBytes(asciiBytes("INFO"), ...subchunks);
    const pad = listData.length % 2 ? new Uint8Array([0x00]) : new Uint8Array();
    const listChunk = concatBytes(asciiBytes("LIST"), uint32BytesLE(listData.length), listData, pad);
    const output = concatBytes(bytes, listChunk);
    if (output.length - 8 > 0xffffffff) {
        throw new Error("El WAV resultante supera el tamano RIFF clasico.");
    }
    const patched = output.slice();
    patched.set(uint32BytesLE(patched.length - 8), 4);
    return {
        bytes: patched,
        technicalLines: [
            "Formato directo: RIFF LIST/INFO.",
            `Subchunks INFO escritos: ${subchunks.length}.`,
            `Tamano RIFF actualizado: ${formatBytesSize(patched.length)}.`
        ]
    };
}

function buildXmpSidecar(descriptor) {
    const fields = descriptor.fields;
    const subjects = fields.tags.map(tag => `<rdf:li>${xmlEscape(tag)}</rdf:li>`).join("");
    return `<?xml version="1.0" encoding="UTF-8"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:feanor="https://local.feanor/metadata">
    <rdf:Description rdf:about="">
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${xmlEscape(fields.title)}</rdf:li></rdf:Alt></dc:title>
      <dc:creator><rdf:Seq><rdf:li>${xmlEscape(fields.creator)}</rdf:li></rdf:Seq></dc:creator>
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${xmlEscape(fields.description)}</rdf:li></rdf:Alt></dc:description>
      <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${xmlEscape(fields.copyright)}</rdf:li></rdf:Alt></dc:rights>
      <dc:subject><rdf:Bag>${subjects}</rdf:Bag></dc:subject>
      <xmp:CreatorTool>${xmlEscape(fields.software)}</xmp:CreatorTool>
      <feanor:PayloadEncoding>${xmlEscape(fields.feanorPayloadEncoding)}</feanor:PayloadEncoding>
      <feanor:Payload>${xmlEscape(fields.feanorPayload)}</feanor:Payload>
      <feanor:SourceName>${xmlEscape(fields.sourceName)}</feanor:SourceName>
      <feanor:TargetContainer>${xmlEscape(fields.targetContainer)}</feanor:TargetContainer>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
`;
}

function buildMetadataSidecar(file, format, descriptor) {
    if (format.mime === "application/json") {
        return {
            bytes: textToBytes(safeJson({
                type: "CodiceFeanorMetadataSidecar",
                sourceFile: file.name,
                targetContainer: format.container,
                fields: descriptor.fields,
                notes: [
                    "Descriptor seguro para aplicar a contenedores ZIP/Office/EPUB con una herramienta especifica.",
                    "No modifica el fichero original desde el navegador."
                ]
            })),
            mime: "application/json",
            extension: "json"
        };
    }
    return {
        bytes: textToBytes(buildXmpSidecar(descriptor)),
        mime: "application/rdf+xml",
        extension: "xmp"
    };
}

function metadataCoverageLines() {
    return metadataEditorTypes.map(item =>
        `${item.label}: ${item.direct ? "escritura directa en cliente" : "sidecar seguro / formato candidato"}`
    );
}

function metadataOutputName(file, format, mode, extension) {
    const base = safeFileBaseName(file.name || "feanor-metadata");
    if (mode === "sidecar") return `${base}-feanor-metadata.${extension}`;
    return `${base}-metadata.${format.extension}`;
}

function buildMetadataEditorResult({ file, format, descriptor, mode, outputName, oldSize, newSize, technicalLines }) {
    const direct = mode === "direct";
    const payloadBytes = textToBytes(metadataEditorPayload.value).length;
    return {
        primaryValue: descriptor.encodedPayload,
        verdictTone: "verdict-success",
        verdictTitle: direct ? "Metadatos escritos en el fichero" : "Sidecar de metadatos generado",
        verdictBody: direct
            ? `Se genero una copia del ${format.family.toLowerCase()} con metadatos nuevos sin subir nada a servidor.`
            : "El formato seleccionado es susceptible de metadatos, pero se entrega un sidecar seguro para no corromper el contenedor.",
        summaryCards: [
            { label: "Tipo", value: format.family, tone: "tone-neutral", note: format.container },
            { label: "Modo", value: direct ? "Directo" : "Sidecar", tone: direct ? "tone-success" : "tone-warning", note: metadataEditorMode.value },
            { label: "Payload", value: payloadBytes ? formatBytesSize(payloadBytes) : "0 B", tone: payloadBytes ? "tone-success" : "tone-neutral", note: metadataEditorPayloadEncoding.value },
            { label: "Salida", value: outputName, tone: "tone-success", note: formatBytesSize(newSize) }
        ],
        signalCards: [
            { label: "Original", value: formatBytesSize(oldSize), tone: "tone-neutral", note: file.name },
            { label: "Nuevo", value: formatBytesSize(newSize), tone: "tone-success", note: `${newSize - oldSize >= 0 ? "+" : ""}${formatBytesSize(Math.abs(newSize - oldSize))}` },
            { label: "Campos", value: String(descriptor.lines.length), tone: "tone-success", note: "Metadatos" },
            { label: "Privacidad", value: "Revisar", tone: "tone-warning", note: "Ahora contiene datos" }
        ],
        panels: [
            {
                title: "Resultado",
                badge: direct ? "file" : "sidecar",
                content: buildTextList("Fichero generado", [
                    `Archivo: ${outputName}`,
                    `Operacion: ${direct ? "modificacion directa" : "sidecar XMP/JSON"}`,
                    `Contenedor: ${format.container}`,
                    `Descarga disponible desde el boton de la herramienta.`
                ]),
                copyValue: outputName
            },
            {
                title: "Metadatos escritos",
                badge: "meta",
                content: buildTextList("Campos", descriptor.lines),
                copyValue: descriptor.lines.join("\n")
            },
            {
                title: "Detalles tecnicos",
                badge: "tech",
                content: buildTextList("Implementacion", technicalLines),
                copyValue: technicalLines.join("\n")
            },
            {
                title: "Detalles de formatos soportados",
                badge: "map",
                content: buildTextList("Cobertura", metadataCoverageLines()),
                copyValue: metadataCoverageLines().join("\n")
            }
        ]
    };
}

async function runMetadataEditor() {
    if (!metadataEditorFile.value) {
        metadataEditorResult.value = buildErrorResult("METADATA_FILE_EMPTY", "Falta fichero", "Selecciona un fichero local para escribir o crear metadatos.");
        return;
    }

    const format = selectedMetadataEditorType.value;
    const requestedDirect = metadataEditorMode.value === "direct";
    const mode = metadataEditorMode.value === "sidecar" || !format.direct ? "sidecar" : "direct";

    if (requestedDirect && !format.direct) {
        metadataEditorResult.value = buildErrorResult(
            "METADATA_DIRECT_UNSUPPORTED",
            "Escritura directa no segura",
            `${format.label} puede contener metadatos, pero este lab genera sidecar para no romper su estructura interna. Cambia el modo a Auto o Sidecar.`
        );
        return;
    }

    try {
        const file = metadataEditorFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const descriptor = buildMetadataDescriptor(file, format, mode);
        let outputBytes;
        let outputMime = format.mime;
        let outputExtension = format.extension;
        let technicalLines = [];

        if (mode === "sidecar") {
            const sidecar = buildMetadataSidecar(file, format, descriptor);
            outputBytes = sidecar.bytes;
            outputMime = sidecar.mime;
            outputExtension = sidecar.extension;
            technicalLines = [
                `Formato seleccionado: ${format.label}.`,
                "Se crea sidecar porque el contenedor requiere reescritura estructural o libreria especializada.",
                `Referencia del fichero original: ${file.name}.`
            ];
        } else if (format.value === "mp3") {
            ({ bytes: outputBytes, technicalLines } = writeMp3Metadata(bytes, file, descriptor));
        } else if (format.value === "wav") {
            ({ bytes: outputBytes, technicalLines } = writeWavMetadata(bytes, descriptor));
        } else if (format.value === "png") {
            ({ bytes: outputBytes, technicalLines } = writePngMetadata(bytes, descriptor));
        } else if (format.value === "jpeg") {
            ({ bytes: outputBytes, technicalLines } = writeJpegMetadata(bytes, descriptor));
        } else if (format.value === "svg") {
            ({ bytes: outputBytes, technicalLines } = writeSvgMetadata(bytes, descriptor));
        } else {
            throw new Error("Selector sin escritor directo asociado.");
        }

        const outputName = metadataOutputName(file, format, mode, outputExtension);
        const blob = new Blob([outputBytes], { type: outputMime });
        setMetadataEditorDownload(blob, outputName);
        metadataEditorResult.value = buildMetadataEditorResult({
            file,
            format,
            descriptor,
            mode,
            outputName,
            oldSize: file.size,
            newSize: outputBytes.length,
            technicalLines
        });
    } catch (error) {
        metadataEditorResult.value = buildErrorResult("METADATA_WRITE_FAILED", "No se pudieron generar metadatos", error.message);
    }
}

function readUint32BE(bytes, offset) {
    return ((bytes[offset] << 24) >>> 0) + (bytes[offset + 1] << 16) + (bytes[offset + 2] << 8) + bytes[offset + 3];
}

function readUint32LE(bytes, offset) {
    return (bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
}

function parsePngTextChunk(type, data) {
    if (type === "zTXt") {
        const keywordEnd = data.indexOf(0);
        const keyword = keywordEnd >= 0 ? asciiSlice(data, 0, keywordEnd) : "zTXt";
        return `${keyword}: texto comprimido`;
    }

    if (type === "tEXt") {
        const keywordEnd = data.indexOf(0);
        if (keywordEnd < 0) return asciiSlice(data, 0, Math.min(data.length, 240));
        const keyword = asciiSlice(data, 0, keywordEnd);
        const value = asciiSlice(data, keywordEnd + 1, Math.min(data.length, keywordEnd + 241));
        return `${keyword}: ${value}`;
    }

    if (type === "iTXt") {
        return asciiSlice(data, 0, Math.min(data.length, 260)).replace(/\0/g, " | ");
    }

    return "";
}

function parsePngChunks(bytes) {
    const chunks = [];
    let offset = 8;
    let endOffset = bytes.length;

    while (offset + 12 <= bytes.length) {
        const length = readUint32BE(bytes, offset);
        const type = asciiSlice(bytes, offset + 4, offset + 8);
        const dataStart = offset + 8;
        const dataEnd = dataStart + length;
        const chunkEnd = dataEnd + 4;

        if (length < 0 || dataEnd > bytes.length || chunkEnd > bytes.length) break;

        const data = bytes.slice(dataStart, dataEnd);
        chunks.push({
            type,
            length,
            offset,
            data,
            text: parsePngTextChunk(type, data)
        });

        offset = chunkEnd;
        if (type === "IEND") {
            endOffset = chunkEnd;
            break;
        }
    }

    return { chunks, endOffset };
}

function jpegMarkerName(marker) {
    const names = {
        0xc0: "SOF0",
        0xc2: "SOF2",
        0xc4: "DHT",
        0xdb: "DQT",
        0xda: "SOS",
        0xdd: "DRI",
        0xe0: "APP0/JFIF",
        0xe1: "APP1/EXIF-XMP",
        0xe2: "APP2/ICC",
        0xed: "APP13/IPTC",
        0xfe: "COM"
    };
    return names[marker] || (marker >= 0xe0 && marker <= 0xef ? `APP${marker - 0xe0}` : `0x${marker.toString(16)}`);
}

function parseJpegSegments(bytes) {
    const segments = [];
    let offset = 2;

    while (offset + 4 < bytes.length) {
        if (bytes[offset] !== 0xff) {
            offset += 1;
            continue;
        }
        while (bytes[offset] === 0xff) offset += 1;
        const marker = bytes[offset];
        if (marker === 0xda || marker === 0xd9) break;
        const length = (bytes[offset + 1] << 8) | bytes[offset + 2];
        if (!Number.isFinite(length) || length < 2) break;
        segments.push({ marker, name: jpegMarkerName(marker), length });
        offset += 1 + length;
    }

    const eoiIndex = lastIndexOfBytes(bytes, [0xff, 0xd9]);
    return {
        segments,
        endOffset: eoiIndex >= 0 ? eoiIndex + 2 : bytes.length
    };
}

function extractPdfHints(bytes) {
    const text = asciiSlice(bytes, 0, bytes.length);
    const keys = ["Title", "Author", "Subject", "Keywords", "Creator", "Producer", "CreationDate", "ModDate"];
    const metadataLines = keys.flatMap(key => {
        const match = text.match(new RegExp(`/${key}\\s*\\(([^)]{0,240})\\)`));
        return match ? [`${key}: ${match[1]}`] : [];
    });
    const indicators = [
        text.includes("/JavaScript") ? "PDF con referencia a JavaScript embebido." : "",
        text.includes("/EmbeddedFile") ? "PDF con referencia a fichero embebido." : "",
        text.includes("/OpenAction") ? "PDF con accion de apertura definida." : ""
    ].filter(Boolean);
    const eofIndex = lastIndexOfBytes(bytes, textToBytes("%%EOF"));
    const appendedBytes = eofIndex >= 0 ? Math.max(0, bytes.length - (eofIndex + 5)) : 0;

    return { metadataLines, indicators, appendedBytes };
}

function extractXmlValueLines(xml, maxLines = 28) {
    const lines = [];
    const pattern = /<([A-Za-z0-9:_-]+)[^>]*>([^<]{1,500})<\/\1>/g;
    let match = pattern.exec(xml);
    while (match && lines.length < maxLines) {
        const value = match[2].replace(/\s+/g, " ").trim();
        if (value) {
            lines.push(`${match[1]}: ${value}`);
        }
        match = pattern.exec(xml);
    }
    return lines;
}

async function inspectZipLikeFile(file) {
    const metadataLines = [];
    const formatLines = [];
    const indicators = [];

    try {
        const { default: JSZip } = await import("jszip");
        const zip = await JSZip.loadAsync(file);
        const entries = Object.values(zip.files);
        const names = entries.map(entry => entry.name);
        formatLines.push(`Entradas ZIP: ${entries.length}`);
        formatLines.push(...names.slice(0, 30).map(name => `- ${name}`));

        const metadataFiles = [
            "docProps/core.xml",
            "docProps/app.xml",
            "docProps/custom.xml",
            "[Content_Types].xml",
            "META-INF/manifest.xml"
        ];

        for (const path of metadataFiles) {
            const entry = zip.file(path);
            if (entry) {
                const xml = await entry.async("string");
                metadataLines.push(`${path}:`);
                metadataLines.push(...extractXmlValueLines(xml, 12).map(line => `  ${line}`));
            }
        }

        const unusualEntries = names.filter(name => /secret|hidden|payload|stego|\.bin$/i.test(name));
        if (unusualEntries.length) {
            indicators.push(`Entradas con nombres sensibles: ${unusualEntries.slice(0, 6).join(", ")}.`);
        }
    } catch (error) {
        indicators.push(`No se pudo abrir como ZIP en navegador: ${error.message}.`);
    }

    return { metadataLines, formatLines, indicators };
}

async function collectExifMetadata(file, type) {
    if (type.family !== "image" || type.label === "SVG" || type.label === "GIF" || type.label === "BMP") {
        return [];
    }

    try {
        const exifr = await import("exifr");
        const metadata = await exifr.parse(file, {
            tiff: true,
            ifd0: true,
            exif: true,
            gps: true,
            xmp: true,
            iptc: true,
            icc: true,
            jfif: true
        });
        return objectToLines(metadata);
    } catch {
        return [];
    }
}

function pickMetadataLines(metadata, keys) {
    return keys
        .filter(key => metadata?.[key] !== undefined && metadata?.[key] !== null && sanitizeMetadataValue(metadata[key]) !== "")
        .map(key => `${key}: ${sanitizeMetadataValue(metadata[key])}`);
}

function categorizeExifMetadata(metadata) {
    const groups = {
        camera: pickMetadataLines(metadata, ["Make", "Model", "LensMake", "LensModel", "Lens", "SerialNumber", "LensSerialNumber", "BodySerialNumber"]),
        capture: pickMetadataLines(metadata, ["DateTimeOriginal", "CreateDate", "ModifyDate", "ExposureTime", "FNumber", "ISO", "FocalLength", "FocalLengthIn35mmFormat", "ExposureProgram", "MeteringMode", "Flash", "WhiteBalance", "ExposureCompensation"]),
        gps: pickMetadataLines(metadata, ["latitude", "longitude", "GPSLatitude", "GPSLongitude", "GPSAltitude", "GPSDateStamp", "GPSTimeStamp", "GPSImgDirection", "GPSMapDatum"]),
        software: pickMetadataLines(metadata, ["Software", "CreatorTool", "ProcessingSoftware", "Artist", "Creator", "Copyright", "ImageDescription", "DocumentName", "HostComputer"]),
        image: pickMetadataLines(metadata, ["ImageWidth", "ImageHeight", "ExifImageWidth", "ExifImageHeight", "Orientation", "ColorSpace", "ProfileDescription", "BitsPerSample", "Compression", "PhotometricInterpretation"])
    };
    const usedKeys = new Set(Object.values(groups).flatMap(lines => lines.map(line => line.split(":")[0])));
    const raw = Object.entries(metadata || {})
        .filter(([key, value]) => !usedKeys.has(key) && value !== undefined && value !== null && sanitizeMetadataValue(value) !== "")
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, value]) => `${key}: ${sanitizeMetadataValue(value)}`);
    return { ...groups, raw };
}

function gpsMapLink(metadata) {
    const latitude = Number(metadata?.latitude ?? metadata?.GPSLatitude);
    const longitude = Number(metadata?.longitude ?? metadata?.GPSLongitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return "";
    return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;
}

async function parseExifMetadata(file) {
    const exifr = await import("exifr");
    return await exifr.parse(file, {
        tiff: true,
        ifd0: true,
        ifd1: true,
        exif: true,
        gps: true,
        xmp: true,
        iptc: true,
        icc: true,
        jfif: true,
        ihdr: true,
        mergeOutput: true
    });
}

function truncateExifText(value, limit = 760) {
    const text = String(value ?? "").replace(/\s+/g, " ").trim();
    if (text.length <= limit) return text;
    return `${text.slice(0, limit - 3)}...`;
}

function exifPrintableValue(value) {
    if (value instanceof Date) return value.toISOString();
    if (value instanceof ArrayBuffer) {
        const bytes = new Uint8Array(value);
        return `<binary ${formatBytesSize(bytes.byteLength)} ${bytesToHex(bytes.slice(0, 18))}${bytes.byteLength > 18 ? "..." : ""}>`;
    }
    if (ArrayBuffer.isView(value)) {
        const bytes = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        return `<binary ${formatBytesSize(bytes.byteLength)} ${bytesToHex(bytes.slice(0, 18))}${bytes.byteLength > 18 ? "..." : ""}>`;
    }
    if (Array.isArray(value)) return value.map(item => exifPrintableValue(item)).join(", ");
    if (value && typeof value === "object") {
        if (value.description) return truncateExifText(value.description);
        try {
            return truncateExifText(JSON.stringify(value, (key, item) => {
                if (item instanceof Date) return item.toISOString();
                if (item instanceof ArrayBuffer || ArrayBuffer.isView(item)) return exifPrintableValue(item);
                return item;
            }));
        } catch {
            return truncateExifText(sanitizeMetadataValue(value));
        }
    }
    return truncateExifText(value);
}

function inferExifGroup(tag) {
    const key = String(tag || "").toLowerCase();
    if (/gps|latitude|longitude|altitude|geotag|location|mapdatum/.test(key)) return "GPS";
    if (/iptc|caption|byline|credit|source|city|province|country|headline|keywords/.test(key)) return "IPTC";
    if (/xmp|creator|creatortool|rights|subject|dc:|photoshop:|description|title/.test(key)) return "XMP";
    if (/icc|profile|colorspace|colorprofile/.test(key)) return "ICC_Profile";
    if (/maker|makernote|serial|ownername|bodyserial|lensserial/.test(key)) return "MakerNotes";
    if (/make|model|lens|camera|focallength/.test(key)) return "EXIF:Camera";
    if (/date|time|subsec|timezone|offsettime/.test(key)) return "EXIF:Time";
    if (/exposure|fnumber|iso|aperture|shutter|flash|metering|whitebalance|brightness/.test(key)) return "EXIF:Exposure";
    if (/width|height|orientation|compression|bits|resolution|photometric|samples|thumbnail|image/.test(key)) return "EXIF:Image";
    if (/jfif/.test(key)) return "JFIF";
    return "EXIF";
}

function classifyExifRisk(tag, group, value) {
    const text = `${group} ${tag} ${value}`.toLowerCase();
    if (/gps|latitude|longitude|altitude|geotag|location|mapdatum|city|province|country|address/.test(text)) {
        return { level: "high", tone: "tone-warning", label: "Ubicacion" };
    }
    if (/serial|owner|artist|author|creator|copyright|rights|byline|credit|hostcomputer|username|user|email|deviceid|imei|documentname|imagedescription/.test(text)) {
        return { level: "warning", tone: "tone-warning", label: "Identidad" };
    }
    if (/software|creatortool|processingsoftware|modifydate|createdate|datetime|make|model|lens/.test(text)) {
        return { level: "info", tone: "tone-neutral", label: "Contexto" };
    }
    return { level: "neutral", tone: "tone-neutral", label: "Tecnico" };
}

function makeExifRow(group, tag, value, source = "metadata") {
    const printable = exifPrintableValue(value);
    const risk = source === "container-warning"
        ? { level: "warning", tone: "tone-warning", label: "Indicador" }
        : classifyExifRisk(tag, group, printable);
    return {
        group,
        tag: String(tag || "Tag"),
        value: printable,
        source,
        riskLevel: risk.level,
        riskTone: risk.tone,
        riskLabel: risk.label
    };
}

function splitMetadataLine(line, fallbackTag) {
    const text = String(line || "");
    const separator = text.indexOf(":");
    if (separator < 0) return { tag: fallbackTag, value: text };
    return {
        tag: text.slice(0, separator).trim() || fallbackTag,
        value: text.slice(separator + 1).trim()
    };
}

function buildExifRows(metadata, file, bytes, type, sha256, entropy, container, parseError) {
    const magic = bytesToHex(bytes.slice(0, Math.min(16, bytes.length))).match(/.{1,2}/g)?.join(" ") || "N/D";
    const fileRows = [
        makeExifRow("File", "FileName", file.name, "file"),
        makeExifRow("File", "FileSize", formatBytesSize(file.size), "file"),
        makeExifRow("File", "FileType", type.label, "file"),
        makeExifRow("File", "MIMEType", file.type || "N/D", "file"),
        makeExifRow("File", "MagicBytes", magic, "file"),
        makeExifRow("File", "SHA256", sha256 || "No disponible", "file"),
        makeExifRow("File", "Entropy", `${entropy.toFixed(2)} bits/byte`, "file")
    ];

    if (parseError) {
        fileRows.push(makeExifRow("Parser", "BrowserExifParser", parseError, "container-warning"));
    }

    const metadataRows = Object.entries(metadata || {})
        .filter(([, value]) => value !== undefined && value !== null && exifPrintableValue(value) !== "")
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([tag, value]) => makeExifRow(inferExifGroup(tag), tag, value, "metadata"));

    const containerRows = [
        ...(container?.metadataLines || []).slice(0, 36).map((line, index) => {
            const item = splitMetadataLine(line, `ContainerMetadata${index + 1}`);
            return makeExifRow("Container", item.tag, item.value, "container");
        }),
        ...(container?.formatLines || []).slice(0, 42).map((line, index) =>
            makeExifRow("Structure", `Block${String(index + 1).padStart(2, "0")}`, line, "container")
        ),
        ...(container?.indicators || []).map((line, index) =>
            makeExifRow("Warnings", `Indicator${index + 1}`, line, "container-warning")
        )
    ];

    return {
        rows: [...fileRows, ...metadataRows, ...containerRows],
        metadataRows,
        containerRows,
        fileRows
    };
}

function filterExifRows(rows) {
    const tokens = exifTagFilter.value
        .toLowerCase()
        .split(/[,\s]+/)
        .map(token => token.trim())
        .filter(Boolean);
    if (!tokens.length) return rows;
    return rows.filter(row => {
        const haystack = `${row.group} ${row.tag} ${row.value} ${row.source} ${row.riskLabel}`.toLowerCase();
        return tokens.every(token => haystack.includes(token));
    });
}

function exifGroupPriority(group) {
    const order = [
        "File",
        "Parser",
        "Warnings",
        "GPS",
        "XMP",
        "IPTC",
        "MakerNotes",
        "EXIF:Camera",
        "EXIF:Time",
        "EXIF:Exposure",
        "EXIF:Image",
        "ICC_Profile",
        "JFIF",
        "Container",
        "Structure",
        "EXIF"
    ];
    const index = order.indexOf(group);
    return index >= 0 ? index : order.length;
}

function sortExifRows(rows, profile) {
    const riskPriority = { high: 0, warning: 1, info: 2, neutral: 3 };
    return [...rows].sort((left, right) => {
        if (profile === "privacy") {
            const leftFile = left.group === "File" ? -1 : 0;
            const rightFile = right.group === "File" ? -1 : 0;
            if (leftFile !== rightFile) return leftFile - rightFile;
            const riskDiff = (riskPriority[left.riskLevel] ?? 4) - (riskPriority[right.riskLevel] ?? 4);
            if (riskDiff) return riskDiff;
        }
        if (profile === "exiftool") {
            const groupDiff = left.group.localeCompare(right.group);
            if (groupDiff) return groupDiff;
            return left.tag.localeCompare(right.tag);
        }
        const groupDiff = exifGroupPriority(left.group) - exifGroupPriority(right.group);
        if (groupDiff) return groupDiff;
        return left.tag.localeCompare(right.tag);
    });
}

function rowsForExifReport(rows) {
    const sorted = sortExifRows(filterExifRows(rows), exifProfile.value);
    if (exifDetailMode.value === "raw" || exifProfile.value === "forensic") return sorted;
    if (exifProfile.value === "privacy" || exifDetailMode.value === "risks") {
        const focused = sorted.filter(row =>
            row.group === "File"
            || row.group === "Parser"
            || row.group === "Warnings"
            || row.riskLevel === "high"
            || row.riskLevel === "warning"
            || /^(Make|Model|Lens|LensModel|Software|CreatorTool|DateTimeOriginal|CreateDate|ModifyDate)$/i.test(row.tag)
        );
        return focused.length ? focused : sorted.slice(0, 90);
    }
    return sorted.slice(0, 140);
}

function formatExifToolLikeReport(rows, file, type, sha256) {
    const command = selectedExifProfile.value.command;
    const width = Math.min(34, Math.max(12, ...rows.map(row => row.tag.length)));
    const lines = [
        "# CodiceFeanor EXIF report",
        `# Perfil: ${selectedExifProfile.value.label}`,
        `# Inspiracion CLI: ${command}`,
        `# Archivo: ${file.name}`,
        `# Tipo detectado: ${type.label}`,
        `# SHA-256: ${sha256 || "No disponible"}`,
        ""
    ];
    if (!rows.length) {
        lines.push("# No hay filas que coincidan con el filtro actual.");
        return lines.join("\n");
    }
    rows.forEach(row => {
        lines.push(`[${row.group}] ${row.tag.padEnd(width, " ")} : ${row.value}`);
    });
    return lines.join("\n");
}

function summarizeExifGroups(rows) {
    const counts = rows.reduce((map, row) => {
        map.set(row.group, (map.get(row.group) || 0) + 1);
        return map;
    }, new Map());
    return Array.from(counts.entries())
        .sort(([left], [right]) => exifGroupPriority(left) - exifGroupPriority(right) || left.localeCompare(right))
        .map(([group, count]) => `${group}: ${count} campos`);
}

function buildExifRiskLines(rows) {
    const riskRows = rows
        .filter(row => row.riskLevel === "high" || row.riskLevel === "warning")
        .sort((left, right) => (left.riskLevel === "high" ? -1 : 1) - (right.riskLevel === "high" ? -1 : 1))
        .slice(0, 24);
    if (!riskRows.length) {
        return [
            "No se han detectado GPS, identidad, seriales ni indicadores evidentes en los metadatos legibles.",
            "Aun asi, una imagen puede contener datos no interpretados por el navegador o ya procesados fuera del EXIF visible."
        ];
    }
    return riskRows.map(row => `${row.riskLabel}: [${row.group}] ${row.tag} = ${row.value}`);
}

function buildExifKeyLines(groups, mapLink) {
    return [
        ...groups.camera.slice(0, 8).map(line => `Camara: ${line}`),
        ...groups.capture.slice(0, 8).map(line => `Captura: ${line}`),
        ...groups.gps.slice(0, 8).map(line => `GPS: ${line}`),
        mapLink ? `GPS: mapa OpenStreetMap ${mapLink}` : "",
        ...groups.software.slice(0, 8).map(line => `Origen: ${line}`),
        ...groups.image.slice(0, 8).map(line => `Imagen: ${line}`)
    ].filter(Boolean);
}

function buildExifProfileNotes(metadataRows, reportRows, parseError) {
    return [
        `Perfil usado: ${selectedExifProfile.value.label}.`,
        `Tags EXIF/XMP/IPTC/ICC legibles: ${metadataRows.length}.`,
        `Filas mostradas por el filtro actual: ${reportRows.length}.`,
        exifTagFilter.value.trim() ? `Filtro aplicado: ${exifTagFilter.value.trim()}.` : "Filtro aplicado: ninguno.",
        parseError ? `Aviso parser: ${parseError}` : "",
        "Los exports TXT y JSON se generan localmente; no se sube el fichero a ningun servidor."
    ].filter(Boolean);
}

function decodeId3TextFrame(body) {
    if (!body?.length) return "";
    const encoding = body[0];
    const data = body.slice(1).filter(byte => byte !== 0x00);
    try {
        if (encoding === 0x03) return new TextDecoder("utf-8").decode(data);
        if (encoding === 0x00) return new TextDecoder("latin1").decode(data);
        if (encoding === 0x01 || encoding === 0x02) return new TextDecoder("utf-16").decode(data);
    } catch {
        return asciiSlice(data, 0, Math.min(data.length, 220));
    }
    return asciiSlice(data, 0, Math.min(data.length, 220));
}

function decodeId3CommentFrame(body) {
    if (!body?.length) return "";
    const encoding = body[0];
    const content = body.slice(4);
    const separator = content.indexOf(0x00);
    const textBytes = separator >= 0 ? content.slice(separator + 1) : content;
    return decodeId3TextFrame(concatBytes(new Uint8Array([encoding]), textBytes));
}

function decodeId3UserTextFrame(body) {
    if (!body?.length) return "";
    const encoding = body[0];
    const content = body.slice(1);
    const separator = content.indexOf(0x00);
    const descriptionBytes = separator >= 0 ? content.slice(0, separator) : content;
    const valueBytes = separator >= 0 ? content.slice(separator + 1) : new Uint8Array();
    const description = decodeId3TextFrame(concatBytes(new Uint8Array([encoding]), descriptionBytes));
    const value = decodeId3TextFrame(concatBytes(new Uint8Array([encoding]), valueBytes));
    return value ? `${description}: ${value}` : description;
}

function parseId3Metadata(bytes) {
    const metadataLines = [];
    const formatLines = [];
    if (!startsWithBytes(bytes, [0x49, 0x44, 0x33]) || bytes.length < 10) {
        return { metadataLines, formatLines };
    }
    const version = bytes[3];
    const tagSize = syncsafeToInt(bytes, 6);
    const tagEnd = Math.min(bytes.length, 10 + tagSize);
    formatLines.push(`ID3v2.${version}.0 (${formatBytesSize(tagSize)})`);
    let offset = 10;
    while (offset + 10 <= tagEnd && metadataLines.length < 30) {
        const id = asciiSlice(bytes, offset, offset + 4);
        if (!/^[A-Z0-9]{4}$/.test(id)) break;
        const size = version === 4 ? syncsafeToInt(bytes, offset + 4) : readUint32BE(bytes, offset + 4);
        if (!size || offset + 10 + size > tagEnd) break;
        const body = bytes.slice(offset + 10, offset + 10 + size);
        if (id.startsWith("T") && id !== "TXXX") {
            metadataLines.push(`${id}: ${decodeId3TextFrame(body)}`);
        } else if (id === "TXXX") {
            metadataLines.push(`TXXX: ${decodeId3UserTextFrame(body)}`);
        } else if (id === "COMM") {
            metadataLines.push(`COMM: ${decodeId3CommentFrame(body).replace(/\0/g, " | ")}`);
        } else if (id === "APIC") {
            metadataLines.push("APIC: imagen de portada embebida.");
        }
        formatLines.push(`${id} (${formatBytesSize(size)})`);
        offset += 10 + size;
    }
    return { metadataLines, formatLines };
}

function parseRiffChunks(bytes) {
    const chunks = [];
    if (bytes.length < 12 || asciiSlice(bytes, 0, 4) !== "RIFF") return chunks;
    let offset = 12;
    while (offset + 8 <= bytes.length && chunks.length < 80) {
        const id = asciiSlice(bytes, offset, offset + 4);
        const size = readUint32LE(bytes, offset + 4);
        const dataStart = offset + 8;
        const dataEnd = dataStart + size;
        if (!id.trim() || dataEnd > bytes.length) break;
        chunks.push({ id, size, offset, dataStart, dataEnd });
        offset = dataEnd + (size % 2);
    }
    return chunks;
}

function parseWavInfoMetadata(bytes) {
    const metadataLines = [];
    const formatLines = [];
    const chunks = parseRiffChunks(bytes);
    formatLines.push(...chunks.slice(0, 36).map(chunk => `${chunk.id} (${formatBytesSize(chunk.size)}) @${chunk.offset}`));
    chunks
        .filter(chunk => chunk.id === "LIST" && asciiSlice(bytes, chunk.dataStart, chunk.dataStart + 4) === "INFO")
        .forEach(listChunk => {
            let offset = listChunk.dataStart + 4;
            while (offset + 8 <= listChunk.dataEnd && metadataLines.length < 30) {
                const id = asciiSlice(bytes, offset, offset + 4);
                const size = readUint32LE(bytes, offset + 4);
                const valueStart = offset + 8;
                const valueEnd = Math.min(valueStart + size, listChunk.dataEnd);
                const value = bytesToUtf8(bytes.slice(valueStart, valueEnd)).replace(/\0+$/g, "").trim();
                if (value) metadataLines.push(`${id}: ${value}`);
                offset = valueEnd + (size % 2);
            }
        });
    return { metadataLines, formatLines };
}

function parseMp4Atoms(bytes) {
    const formatLines = [];
    const metadataLines = [];
    let offset = 0;
    while (offset + 8 <= bytes.length && formatLines.length < 40) {
        let size = readUint32BE(bytes, offset);
        const type = asciiSlice(bytes, offset + 4, offset + 8);
        let headerSize = 8;
        if (size === 1 && offset + 16 <= bytes.length) {
            const high = readUint32BE(bytes, offset + 8);
            const low = readUint32BE(bytes, offset + 12);
            size = high * 0x100000000 + low;
            headerSize = 16;
        }
        if (!type.trim() || size < headerSize || offset + size > bytes.length) break;
        formatLines.push(`${type} (${formatBytesSize(size)}) @${offset}`);
        if (type === "ftyp") {
            const major = asciiSlice(bytes, offset + 8, offset + 12);
            const brands = [];
            for (let cursor = offset + 16; cursor + 4 <= offset + size; cursor += 4) {
                brands.push(asciiSlice(bytes, cursor, cursor + 4));
            }
            metadataLines.push(`ftyp major brand: ${major}`);
            if (brands.length) metadataLines.push(`compatible brands: ${brands.slice(0, 12).join(", ")}`);
        }
        offset += size;
    }
    return { metadataLines, formatLines };
}

function parseWebpChunks(bytes) {
    const metadataLines = [];
    const chunks = parseRiffChunks(bytes);
    const formatLines = chunks.slice(0, 40).map(chunk => `${chunk.id} (${formatBytesSize(chunk.size)}) @${chunk.offset}`);
    chunks.forEach(chunk => {
        if (chunk.id === "EXIF") metadataLines.push("EXIF: chunk EXIF presente en WebP.");
        if (chunk.id === "XMP ") metadataLines.push("XMP: chunk XMP presente en WebP.");
        if (chunk.id === "ICCP") metadataLines.push("ICCP: perfil de color presente.");
    });
    return { metadataLines, formatLines };
}

function collectContainerHints(bytes, type) {
    const metadataLines = [];
    const formatLines = [];
    const indicators = [];
    let appendedBytes = 0;

    if (type.label === "PNG") {
        const parsed = parsePngChunks(bytes);
        formatLines.push(...parsed.chunks.map(chunk => `${chunk.type} (${formatBytesSize(chunk.length)}) @${chunk.offset}`));
        metadataLines.push(...parsed.chunks.filter(chunk => chunk.text).map(chunk => `${chunk.type}: ${chunk.text}`));
        appendedBytes = Math.max(0, bytes.length - parsed.endOffset);
    } else if (type.label === "JPEG") {
        const parsed = parseJpegSegments(bytes);
        formatLines.push(...parsed.segments.map(segment => `${segment.name} (${formatBytesSize(segment.length)})`));
        if (parsed.segments.some(segment => segment.marker === 0xe1)) metadataLines.push("APP1 presente: posible EXIF/XMP.");
        if (parsed.segments.some(segment => segment.marker === 0xfe)) metadataLines.push("COM presente: comentario JPEG.");
        appendedBytes = Math.max(0, bytes.length - parsed.endOffset);
    } else if (type.label === "GIF") {
        const trailerIndex = lastIndexOfBytes(bytes, [0x3b]);
        appendedBytes = trailerIndex >= 0 ? Math.max(0, bytes.length - (trailerIndex + 1)) : 0;
    } else if (type.label === "MP3") {
        const id3 = parseId3Metadata(bytes);
        metadataLines.push(...id3.metadataLines);
        formatLines.push(...id3.formatLines);
    } else if (type.label === "WAV") {
        const wav = parseWavInfoMetadata(bytes);
        metadataLines.push(...wav.metadataLines);
        formatLines.push(...wav.formatLines);
    } else if (type.label === "WEBP") {
        const webp = parseWebpChunks(bytes);
        metadataLines.push(...webp.metadataLines);
        formatLines.push(...webp.formatLines);
    } else if (["MP4/MOV", "M4A/MP4", "AVIF", "HEIC", "HEIX", "HEVC", "HEVX", "MIF1", "MSF1"].includes(type.label)) {
        const mp4 = parseMp4Atoms(bytes);
        metadataLines.push(...mp4.metadataLines);
        formatLines.push(...mp4.formatLines);
    } else if (type.label === "AVI") {
        const riff = parseRiffChunks(bytes);
        formatLines.push(...riff.slice(0, 40).map(chunk => `${chunk.id} (${formatBytesSize(chunk.size)}) @${chunk.offset}`));
    } else if (type.label === "PDF") {
        const pdf = extractPdfHints(bytes);
        metadataLines.push(...pdf.metadataLines);
        indicators.push(...pdf.indicators);
        appendedBytes = pdf.appendedBytes;
    } else if (type.family === "archive") {
        formatLines.push(`Archivo comprimido/paquetizado: ${type.label}.`);
        if (["GZIP", "BZIP2", "XZ", "7Z", "RAR"].includes(type.label)) {
            indicators.push("Contenedor comprimido: la entropia alta es normal y el analisis interno requiere descompresion especifica.");
        }
        if (type.label === "TAR") {
            formatLines.push("TAR conserva nombres, permisos y rutas internas; revisa path traversal al extraer fuera del navegador.");
        }
    } else if (type.family === "executable") {
        formatLines.push(`Ejecutable detectado: ${type.label}.`);
        indicators.push("El fichero es ejecutable o bytecode; no lo abras fuera de un entorno controlado si no confias en su origen.");
    } else if (type.family === "capture") {
        formatLines.push(`Captura de red detectada: ${type.label}.`);
        indicators.push("Puede contener IPs, dominios, tokens o payloads de trafico en claro.");
    } else if (type.family === "database") {
        formatLines.push("Base de datos SQLite detectada; puede contener tablas, indices, paginas libres y datos borrados recuperables.");
    } else if (type.family === "medical") {
        formatLines.push("DICOM detectado; revisa PHI/PII clinica antes de compartir.");
        indicators.push("Formato medico: puede incluir identidad de paciente, estudio, equipo y fechas.");
    } else if (type.family === "message") {
        formatLines.push("Mensaje de correo detectado; revisa cabeceras Received, Message-ID, DKIM, adjuntos y MIME boundaries.");
    }

    if (appendedBytes > 8) {
        indicators.push(`Hay ${formatBytesSize(appendedBytes)} despues del final declarado del formato.`);
    }

    return { metadataLines, formatLines, indicators, appendedBytes };
}

async function imageFileToCanvas(file) {
    const url = URL.createObjectURL(file);
    try {
        const image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("El navegador no pudo decodificar la imagen."));
            img.src = url;
        });
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth || image.width;
        canvas.height = image.naturalHeight || image.height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context || !canvas.width || !canvas.height) {
            throw new Error("No se pudo preparar el canvas local.");
        }
        context.drawImage(image, 0, 0);
        return {
            canvas,
            context,
            imageData: context.getImageData(0, 0, canvas.width, canvas.height),
            width: canvas.width,
            height: canvas.height
        };
    } finally {
        URL.revokeObjectURL(url);
    }
}

function calculateLsbCapacityBytes(imageData) {
    const pixels = imageData.data.length / 4;
    return Math.floor((pixels * 3) / 8);
}

function readLsbBytes(imageData, byteLength) {
    const output = new Uint8Array(byteLength);
    const data = imageData.data;
    for (let bitIndex = 0; bitIndex < byteLength * 8; bitIndex += 1) {
        const pixel = Math.floor(bitIndex / 3);
        const channel = bitIndex % 3;
        const bit = data[pixel * 4 + channel] & 1;
        output[Math.floor(bitIndex / 8)] = (output[Math.floor(bitIndex / 8)] << 1) | bit;
    }
    return output;
}

function writeLsbBytes(imageData, payload) {
    const data = imageData.data;
    for (let bitIndex = 0; bitIndex < payload.length * 8; bitIndex += 1) {
        const byte = payload[Math.floor(bitIndex / 8)];
        const bit = (byte >> (7 - (bitIndex % 8))) & 1;
        const pixel = Math.floor(bitIndex / 3);
        const channel = bitIndex % 3;
        data[pixel * 4 + channel] = (data[pixel * 4 + channel] & 0xfe) | bit;
    }
}

function bytesEqual(left, right) {
    if (left.length !== right.length) return false;
    return left.every((byte, index) => byte === right[index]);
}

function buildStegoPacket(payloadBytes) {
    const packet = new Uint8Array(STEGO_HEADER_BYTES + payloadBytes.length);
    packet.set(STEGO_MAGIC_BYTES, 0);
    const lengthOffset = STEGO_MAGIC_BYTES.length;
    packet[lengthOffset] = (payloadBytes.length >>> 24) & 0xff;
    packet[lengthOffset + 1] = (payloadBytes.length >>> 16) & 0xff;
    packet[lengthOffset + 2] = (payloadBytes.length >>> 8) & 0xff;
    packet[lengthOffset + 3] = payloadBytes.length & 0xff;
    packet.set(payloadBytes, STEGO_HEADER_BYTES);
    return packet;
}

function crc32Hex(bytes) {
    return pngCrc32(bytes).toString(16).padStart(8, "0");
}

function buildUniversalStegoPacket(payloadBytes, header) {
    const safeHeader = {
        version: 2,
        tool: "CodiceFeanor",
        createdAt: new Date().toISOString(),
        payloadSize: payloadBytes.length,
        crc32: crc32Hex(payloadBytes),
        ...header
    };
    const headerBytes = textToBytes(safeJson(safeHeader));
    return concatBytes(
        STEGO_PACKET_MAGIC_BYTES,
        uint32BytesBE(headerBytes.length),
        headerBytes,
        payloadBytes
    );
}

function parseUniversalStegoPacket(packet) {
    const bytes = packet instanceof Uint8Array ? packet : new Uint8Array(packet);
    if (bytes.length < STEGO_PACKET_HEADER_BYTES) {
        throw new Error("El paquete Feanor V2 esta incompleto.");
    }
    const magic = bytes.slice(0, STEGO_PACKET_MAGIC_BYTES.length);
    if (!bytesEqual(magic, STEGO_PACKET_MAGIC_BYTES)) {
        throw new Error("No se encontro cabecera Feanor V2.");
    }
    const headerLength = readUint32BE(bytes, STEGO_PACKET_MAGIC_BYTES.length);
    const headerStart = STEGO_PACKET_HEADER_BYTES;
    const payloadStart = headerStart + headerLength;
    if (headerLength <= 0 || payloadStart > bytes.length) {
        throw new Error("La longitud de cabecera Feanor V2 no encaja con el fichero.");
    }
    const header = JSON.parse(bytesToUtf8(bytes.slice(headerStart, payloadStart)));
    const payloadSize = Number(header.payloadSize);
    if (!Number.isFinite(payloadSize) || payloadSize < 0 || payloadStart + payloadSize > bytes.length) {
        throw new Error("El tamano de payload Feanor V2 no encaja con el paquete.");
    }
    const payloadBytes = bytes.slice(payloadStart, payloadStart + payloadSize);
    const checksum = crc32Hex(payloadBytes);
    return {
        header,
        payloadBytes,
        payloadText: stegoPayloadToText(header, payloadBytes),
        packetLength: payloadStart + payloadSize,
        checksum,
        checksumOk: !header.crc32 || header.crc32 === checksum
    };
}

function stegoPayloadToText(header, payloadBytes) {
    if (["text", "json"].includes(header.source)) {
        return bytesToEncodedText(payloadBytes, header.encoding || "utf8");
    }
    if (header.source === "base64") return bytesToBase64(payloadBytes);

    try {
        const text = bytesToUtf8(payloadBytes);
        const printable = Array.from(text).filter(char => {
            const code = char.charCodeAt(0);
            return code === 9 || code === 10 || code === 13 || code >= 32;
        }).length;
        if (text && printable / text.length > 0.85) return text;
    } catch {
        // Binary payload: Base64 preview below is safer.
    }
    return bytesToBase64(payloadBytes);
}

function extractUniversalStegoPacketFromRawBytes(bytes) {
    const index = lastIndexOfBytes(bytes, STEGO_PACKET_MAGIC_BYTES);
    if (index < 0) return null;
    try {
        return {
            ...parseUniversalStegoPacket(bytes.slice(index)),
            storage: "footer",
            storageNote: "Cabecera Feanor V2 encontrada en bytes crudos al final o dentro del fichero."
        };
    } catch {
        return null;
    }
}

function readPngTextValue(type, data) {
    if (type === "tEXt") {
        const keywordEnd = data.indexOf(0);
        if (keywordEnd < 0) return asciiSlice(data, 0, data.length);
        return asciiSlice(data, keywordEnd + 1, data.length);
    }
    if (type !== "iTXt") return "";

    let offset = data.indexOf(0);
    if (offset < 0) return "";
    offset += 3;
    const languageEnd = data.indexOf(0, offset);
    if (languageEnd < 0) return "";
    const translatedEnd = data.indexOf(0, languageEnd + 1);
    if (translatedEnd < 0) return "";
    return bytesToUtf8(data.slice(translatedEnd + 1));
}

function extractPngItxtStegoPacket(bytes) {
    if (!startsWithBytes(bytes, [0x89, 0x50, 0x4e, 0x47])) return null;
    const parsed = parsePngChunks(bytes);
    for (const chunk of parsed.chunks) {
        if (!["iTXt", "tEXt"].includes(chunk.type)) continue;
        const text = readPngTextValue(chunk.type, chunk.data);
        const markerIndex = text.indexOf(STEGO_PACKET_B64_MARKER);
        if (markerIndex < 0) continue;
        const raw = text.slice(markerIndex + STEGO_PACKET_B64_MARKER.length);
        const match = raw.match(/[A-Za-z0-9+/=]+/);
        if (!match) continue;
        return {
            ...parseUniversalStegoPacket(base64ToBytes(match[0])),
            storage: "png-itxt",
            storageNote: "Paquete Feanor V2 localizado dentro de un chunk textual PNG."
        };
    }
    return null;
}

function readUniversalStegoPacketFromImageData(imageData) {
    const capacityBytes = calculateLsbCapacityBytes(imageData);
    if (capacityBytes < STEGO_PACKET_HEADER_BYTES) return null;

    const headerPrefix = readLsbBytes(imageData, STEGO_PACKET_HEADER_BYTES);
    if (!bytesEqual(headerPrefix.slice(0, STEGO_PACKET_MAGIC_BYTES.length), STEGO_PACKET_MAGIC_BYTES)) {
        return null;
    }
    const headerLength = readUint32BE(headerPrefix, STEGO_PACKET_MAGIC_BYTES.length);
    const headerTotal = STEGO_PACKET_HEADER_BYTES + headerLength;
    if (headerLength <= 0 || headerTotal > capacityBytes) {
        throw new Error("La cabecera LSB Feanor V2 existe, pero no cabe en la imagen.");
    }
    const headerPacket = readLsbBytes(imageData, headerTotal);
    const header = JSON.parse(bytesToUtf8(headerPacket.slice(STEGO_PACKET_HEADER_BYTES)));
    const totalLength = headerTotal + Number(header.payloadSize || 0);
    if (totalLength > capacityBytes) {
        throw new Error("El payload LSB Feanor V2 declara mas bytes de los que caben en la imagen.");
    }
    return {
        ...parseUniversalStegoPacket(readLsbBytes(imageData, totalLength)),
        capacityBytes,
        storage: "image-lsb",
        storageNote: "Paquete Feanor V2 recuperado desde LSB RGB."
    };
}

function readStegoPacketFromImageData(imageData) {
    const capacityBytes = calculateLsbCapacityBytes(imageData);
    const universal = readUniversalStegoPacketFromImageData(imageData);
    if (universal) return universal;

    if (capacityBytes < STEGO_HEADER_BYTES) {
        throw new Error("La imagen no tiene capacidad suficiente para contener una cabecera Feanor.");
    }

    const header = readLsbBytes(imageData, STEGO_HEADER_BYTES);
    const magic = header.slice(0, STEGO_MAGIC_BYTES.length);
    if (!bytesEqual(magic, STEGO_MAGIC_BYTES)) {
        throw new Error("No se encontro cabecera LSB de Feanor en esta imagen.");
    }

    const length = readUint32BE(header, STEGO_MAGIC_BYTES.length);
    if (length < 0 || length > capacityBytes - STEGO_HEADER_BYTES) {
        throw new Error("La cabecera existe, pero la longitud declarada no encaja con la capacidad de la imagen.");
    }

    const packet = readLsbBytes(imageData, STEGO_HEADER_BYTES + length);
    const payloadBytes = packet.slice(STEGO_HEADER_BYTES);
    return {
        header: {
            version: 1,
            source: "text",
            encoding: "utf8",
            payloadName: "feanor-legacy.txt",
            payloadSize: payloadBytes.length
        },
        payloadBytes,
        payloadText: bytesToUtf8(payloadBytes),
        capacityBytes,
        checksum: "",
        checksumOk: true,
        storage: "image-lsb-legacy",
        storageNote: "Payload recuperado con la cabecera legacy FEANOR_STEGO_V1."
    };
}

function readUint16LE(bytes, offset) {
    return (bytes[offset] | (bytes[offset + 1] << 8)) >>> 0;
}

function uint16BytesLE(value) {
    const number = Number(value) >>> 0;
    return new Uint8Array([number & 0xff, (number >>> 8) & 0xff]);
}

function steghideCompatibilityForType(type) {
    if (["JPEG", "BMP", "WAV", "AU"].includes(type.label)) {
        return {
            native: true,
            frontend: type.label === "JPEG" ? "canvas" : "direct",
            note: type.label === "JPEG"
                ? "Steghide nativo soporta JPEG en dominio de frecuencia; el navegador lo procesa como canvas y exporta PNG."
                : "Compatible con escritura LSB directa de laboratorio."
        };
    }
    if (type.family === "image" && type.label !== "SVG") {
        return {
            native: false,
            frontend: "canvas",
            note: "No es formato Steghide nativo, pero el navegador puede probar LSB y exportar PNG."
        };
    }
    return {
        native: false,
        frontend: "analysis",
        note: "Steghide real no usa este contenedor como cover; el lab puede analizarlo, pero no incrustar en modo compatible."
    };
}

function getBmpCarrierIndexes(bytes) {
    if (!startsWithBytes(bytes, [0x42, 0x4d]) || bytes.length < 54) {
        throw new Error("El fichero no tiene cabecera BMP valida.");
    }
    const pixelOffset = readUint32LE(bytes, 10);
    const dibSize = readUint32LE(bytes, 14);
    const width = readUint32LE(bytes, 18);
    const heightRaw = readUint32LE(bytes, 22);
    const bpp = readUint16LE(bytes, 28);
    const compression = readUint32LE(bytes, 30);
    if (dibSize < 40 || pixelOffset >= bytes.length) throw new Error("BMP no soportado: cabecera DIB inesperada.");
    if (![24, 32].includes(bpp)) throw new Error("BMP soportado en frontend solo con 24 o 32 bits por pixel.");
    if (compression !== 0) throw new Error("BMP comprimido no soportado para escritura LSB directa.");
    const indexes = [];
    for (let index = pixelOffset; index < bytes.length; index += 1) indexes.push(index);
    return {
        indexes,
        detail: [
            `BMP ${width}x${heightRaw & 0x7fffffff}, ${bpp} bpp.`,
            `Offset de pixeles: ${pixelOffset}.`,
            `Bytes portadores LSB: ${formatBytesSize(indexes.length)}.`
        ]
    };
}

function getWavCarrierIndexes(bytes) {
    if (asciiSlice(bytes, 0, 4) !== "RIFF" || asciiSlice(bytes, 8, 12) !== "WAVE") {
        throw new Error("El fichero no parece WAV RIFF.");
    }
    const chunks = parseRiffChunks(bytes);
    const dataChunk = chunks.find(chunk => chunk.id === "data");
    if (!dataChunk) throw new Error("No se encontro chunk data en el WAV.");
    const indexes = [];
    for (let index = dataChunk.dataStart; index < dataChunk.dataEnd; index += 1) indexes.push(index);
    return {
        indexes,
        detail: [
            `WAV RIFF con ${chunks.length} chunks detectados.`,
            `Chunk data: ${formatBytesSize(dataChunk.size)} @${dataChunk.dataStart}.`,
            `Bytes portadores LSB: ${formatBytesSize(indexes.length)}.`
        ]
    };
}

function getAuCarrierIndexes(bytes) {
    if (!startsWithBytes(bytes, [0x2e, 0x73, 0x6e, 0x64]) || bytes.length < 24) {
        throw new Error("El fichero no tiene cabecera AU/SND valida.");
    }
    const headerSize = readUint32BE(bytes, 4);
    const dataSizeRaw = readUint32BE(bytes, 8);
    const encoding = readUint32BE(bytes, 12);
    const sampleRate = readUint32BE(bytes, 16);
    const channels = readUint32BE(bytes, 20);
    if (headerSize < 24 || headerSize >= bytes.length) throw new Error("Cabecera AU no soportada.");
    const dataEnd = dataSizeRaw === 0xffffffff ? bytes.length : Math.min(bytes.length, headerSize + dataSizeRaw);
    const indexes = [];
    for (let index = headerSize; index < dataEnd; index += 1) indexes.push(index);
    return {
        indexes,
        detail: [
            `AU/SND encoding=${encoding}, ${sampleRate} Hz, ${channels} canales.`,
            `Offset de audio: ${headerSize}.`,
            `Bytes portadores LSB: ${formatBytesSize(indexes.length)}.`
        ]
    };
}

function getByteCarrier(bytes, type) {
    if (type.label === "BMP") return { mode: "byte", extension: "bmp", mime: "image/bmp", ...getBmpCarrierIndexes(bytes) };
    if (type.label === "WAV") return { mode: "byte", extension: "wav", mime: "audio/wav", ...getWavCarrierIndexes(bytes) };
    if (type.label === "AU") return { mode: "byte", extension: "au", mime: "audio/basic", ...getAuCarrierIndexes(bytes) };
    return null;
}

function canvasCarrierIndexes(imageData) {
    const indexes = [];
    for (let index = 0; index < imageData.data.length; index += 1) {
        if (index % 4 !== 3) indexes.push(index);
    }
    return indexes;
}

async function getSteghideCarrier(file, bytes, type, preferCanvas = false) {
    const byteCarrier = preferCanvas ? null : getByteCarrier(bytes, type);
    if (byteCarrier) {
        return {
            ...byteCarrier,
            sourceBytes: bytes,
            capacityBytes: Math.floor(byteCarrier.indexes.length / 8)
        };
    }
    if (type.family === "image" && type.label !== "SVG") {
        const image = await imageFileToCanvas(file);
        const indexes = canvasCarrierIndexes(image.imageData);
        return {
            mode: "canvas",
            extension: "png",
            mime: "image/png",
            indexes,
            image,
            capacityBytes: Math.floor(indexes.length / 8),
            detail: [
                `Canvas local ${image.width}x${image.height}.`,
                "La salida se exporta como PNG para conservar bits LSB.",
                `Bytes portadores LSB: ${formatBytesSize(indexes.length)}.`
            ]
        };
    }
    throw new Error("Este formato no permite incrustacion frontend en el laboratorio Steghide.");
}

function steghideXorshift(seed) {
    let state = seed >>> 0;
    if (!state) state = 0x9e3779b9;
    return () => {
        state ^= (state << 13) >>> 0;
        state ^= state >>> 17;
        state ^= (state << 5) >>> 0;
        return state >>> 0;
    };
}

async function steghideSeedFromPassphrase(passphrase) {
    const subtle = getSubtleCrypto();
    const material = textToBytes(`feanor-steghide-order:${passphrase ?? ""}`);
    const digest = new Uint8Array(await subtle.digest("SHA-256", material));
    return readUint32BE(digest, 0) || 0x9e3779b9;
}

function steghidePermutation(length, seed) {
    const order = new Uint32Array(length);
    for (let index = 0; index < length; index += 1) order[index] = index;
    const random = steghideXorshift(seed);
    for (let index = length - 1; index > 0; index -= 1) {
        const swapIndex = random() % (index + 1);
        const current = order[index];
        order[index] = order[swapIndex];
        order[swapIndex] = current;
    }
    return order;
}

function writePacketToCarrierBytes(bytes, indexes, packet, seed) {
    const bitCount = packet.length * 8;
    if (bitCount > indexes.length) {
        throw new Error(`El payload necesita ${formatBytesSize(packet.length)} y el portador solo ofrece ${formatBytesSize(Math.floor(indexes.length / 8))}.`);
    }
    const output = new Uint8Array(bytes);
    const order = steghidePermutation(indexes.length, seed);
    for (let bitIndex = 0; bitIndex < bitCount; bitIndex += 1) {
        const byte = packet[Math.floor(bitIndex / 8)];
        const bit = (byte >> (7 - (bitIndex % 8))) & 1;
        const carrierIndex = indexes[order[bitIndex]];
        output[carrierIndex] = (output[carrierIndex] & 0xfe) | bit;
    }
    return output;
}

function readPacketBytesFromCarrierBytes(bytes, indexes, seed, byteLength) {
    const bitCount = byteLength * 8;
    if (bitCount > indexes.length) {
        throw new Error("El portador no tiene capacidad suficiente para leer esa cantidad de bytes.");
    }
    const order = steghidePermutation(indexes.length, seed);
    const output = new Uint8Array(byteLength);
    for (let bitIndex = 0; bitIndex < bitCount; bitIndex += 1) {
        const carrierIndex = indexes[order[bitIndex]];
        output[Math.floor(bitIndex / 8)] = (output[Math.floor(bitIndex / 8)] << 1) | (bytes[carrierIndex] & 1);
    }
    return output;
}

function extractDirectLsbStegoPacket(bytes, type) {
    const carrier = getByteCarrier(bytes, type);
    if (!carrier || Math.floor(carrier.indexes.length / 8) < STEGO_PACKET_HEADER_BYTES) return null;

    const headerPrefix = readPacketBytesFromCarrierBytes(bytes, carrier.indexes, STEGO_DIRECT_LSB_SEED, STEGO_PACKET_HEADER_BYTES);
    if (!bytesEqual(headerPrefix.slice(0, STEGO_PACKET_MAGIC_BYTES.length), STEGO_PACKET_MAGIC_BYTES)) return null;

    const headerLength = readUint32BE(headerPrefix, STEGO_PACKET_MAGIC_BYTES.length);
    const headerTotal = STEGO_PACKET_HEADER_BYTES + headerLength;
    if (headerLength <= 0 || headerTotal > Math.floor(carrier.indexes.length / 8)) {
        throw new Error("La cabecera LSB directa existe, pero no encaja con la capacidad del portador.");
    }
    const headerPacket = readPacketBytesFromCarrierBytes(bytes, carrier.indexes, STEGO_DIRECT_LSB_SEED, headerTotal);
    const header = JSON.parse(bytesToUtf8(headerPacket.slice(STEGO_PACKET_HEADER_BYTES)));
    const totalLength = headerTotal + Number(header.payloadSize || 0);
    if (totalLength > Math.floor(carrier.indexes.length / 8)) {
        throw new Error("El payload LSB directo declara mas bytes de los que caben en el portador.");
    }
    return {
        ...parseUniversalStegoPacket(readPacketBytesFromCarrierBytes(bytes, carrier.indexes, STEGO_DIRECT_LSB_SEED, totalLength)),
        capacityBytes: Math.floor(carrier.indexes.length / 8),
        storage: "byte-lsb",
        storageNote: `Paquete Feanor V2 recuperado desde LSB directo de ${type.label}.`
    };
}

async function buildStegoZipBundle(carrierFile, carrierBytes, packet, header, payloadBytes) {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    const coverName = carrierFile.name || "cover.bin";
    const payloadName = header.payloadName || "payload.bin";
    const manifest = {
        ...header,
        storage: "zip-bundle",
        coverPath: `cover/${coverName}`,
        packetPath: "feanor-packet.bin",
        payloadPath: `hidden/${payloadName}`,
        packetMagic: STEGO_PACKET_MAGIC_TEXT
    };
    zip.file(manifest.coverPath, carrierBytes);
    zip.file(manifest.packetPath, packet);
    zip.file(manifest.payloadPath, payloadBytes);
    zip.file("feanor-stego-manifest.json", safeJson(manifest));
    return {
        blob: await zip.generateAsync({ type: "blob" }),
        manifest
    };
}

async function extractStegoZipBundle(bytes) {
    try {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(bytes);
        const manifestFile = zip.file("feanor-stego-manifest.json");
        if (!manifestFile) return null;
        const manifest = JSON.parse(await manifestFile.async("string"));
        const packetFile = manifest.packetPath ? zip.file(manifest.packetPath) : null;
        if (packetFile) {
            return {
                ...parseUniversalStegoPacket(new Uint8Array(await packetFile.async("arraybuffer"))),
                storage: "zip-bundle",
                storageNote: "Paquete Feanor V2 recuperado desde bundle ZIP."
            };
        }
        const payloadFile = manifest.payloadPath ? zip.file(manifest.payloadPath) : null;
        if (!payloadFile) return null;
        const payloadBytes = new Uint8Array(await payloadFile.async("arraybuffer"));
        return {
            header: manifest,
            payloadBytes,
            payloadText: stegoPayloadToText(manifest, payloadBytes),
            packetLength: payloadBytes.length,
            checksum: crc32Hex(payloadBytes),
            checksumOk: !manifest.crc32 || manifest.crc32 === crc32Hex(payloadBytes),
            storage: "zip-bundle",
            storageNote: "Payload recuperado desde hidden/ dentro del bundle ZIP."
        };
    } catch {
        return null;
    }
}

async function bytesThroughCompressionStream(bytes, mode) {
    const streamCtor = mode === "compress" ? globalThis.CompressionStream : globalThis.DecompressionStream;
    if (!streamCtor) return { bytes, used: false };
    try {
        const format = "deflate";
        const stream = new Blob([bytes]).stream().pipeThrough(new streamCtor(format));
        return {
            bytes: new Uint8Array(await new Response(stream).arrayBuffer()),
            used: true
        };
    } catch {
        return { bytes, used: false };
    }
}

async function deriveSteghideAesKey(passphrase, salt, usages) {
    if (!passphrase) throw new Error("AES-GCM necesita passphrase.");
    const subtle = getSubtleCrypto();
    const baseKey = await subtle.importKey("raw", textToBytes(passphrase), "PBKDF2", false, ["deriveKey"]);
    return await subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: STEGHIDE_KDF_ITERATIONS, hash: "SHA-256" },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        usages
    );
}

async function buildSteghidePacket(secretFile, passphrase) {
    const originalBytes = new Uint8Array(await secretFile.arrayBuffer());
    const crc = pngCrc32(originalBytes).toString(16).padStart(8, "0");
    let storedBytes = originalBytes;
    let compressionUsed = false;
    if (steghideCompression.value === "auto") {
        const compressed = await bytesThroughCompressionStream(originalBytes, "compress");
        compressionUsed = compressed.used && compressed.bytes.length < originalBytes.length;
        storedBytes = compressionUsed ? compressed.bytes : originalBytes;
    }

    const salt = globalThis.crypto?.getRandomValues ? globalThis.crypto.getRandomValues(new Uint8Array(16)) : textToBytes(randomHex(16)).slice(0, 16);
    const iv = globalThis.crypto?.getRandomValues ? globalThis.crypto.getRandomValues(new Uint8Array(12)) : textToBytes(randomHex(12)).slice(0, 12);
    let payloadBytes = storedBytes;
    if (steghideEncryption.value === "aes-gcm") {
        const key = await deriveSteghideAesKey(passphrase, salt, ["encrypt"]);
        payloadBytes = new Uint8Array(await getSubtleCrypto().encrypt({ name: "AES-GCM", iv }, key, storedBytes));
    }

    const header = {
        format: STEGHIDE_MAGIC_TEXT,
        version: 1,
        originalName: steghideStoreName.value ? secretFile.name : "",
        fallbackName: `${safeFileBaseName(secretFile.name)}.out`,
        mime: secretFile.type || "application/octet-stream",
        originalSize: originalBytes.length,
        storedSize: storedBytes.length,
        payloadSize: payloadBytes.length,
        encrypted: steghideEncryption.value === "aes-gcm",
        encryption: steghideEncryption.value === "aes-gcm" ? "AES-GCM" : "none",
        kdf: steghideEncryption.value === "aes-gcm" ? "PBKDF2-SHA256" : "none",
        iterations: steghideEncryption.value === "aes-gcm" ? STEGHIDE_KDF_ITERATIONS : 0,
        salt: steghideEncryption.value === "aes-gcm" ? bytesToBase64(salt) : "",
        iv: steghideEncryption.value === "aes-gcm" ? bytesToBase64(iv) : "",
        compressed: compressionUsed,
        compression: compressionUsed ? "deflate" : "none",
        compressionLevel: Number(steghideCompressionLevel.value) || 6,
        checksum: Boolean(steghideChecksum.value),
        crc32: steghideChecksum.value ? crc : "",
        createdAt: new Date().toISOString()
    };
    const headerBytes = textToBytes(safeJson(header));
    return {
        packet: concatBytes(
            STEGHIDE_MAGIC_BYTES,
            uint32BytesBE(headerBytes.length),
            headerBytes,
            payloadBytes
        ),
        header,
        originalBytes
    };
}

function parseSteghidePacketHeader(probe) {
    if (!bytesEqual(probe.slice(0, STEGHIDE_MAGIC_BYTES.length), STEGHIDE_MAGIC_BYTES)) {
        throw new Error("No se encontro cabecera FEANOR_STEGHIDE_V1 con esa passphrase.");
    }
    const headerLength = readUint32BE(probe, STEGHIDE_MAGIC_BYTES.length);
    if (!headerLength || headerLength > 65536) {
        throw new Error("Cabecera detectada, pero la longitud no es valida.");
    }
    return headerLength;
}

async function prepareSteghideExtraction(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = detectFileType(bytes, file);
    const carrier = await getSteghideCarrier(file, bytes, type, false);
    const carrierBytes = carrier.mode === "canvas" ? carrier.image.imageData.data : carrier.sourceBytes;
    return { bytes, type, carrier, carrierBytes };
}

async function extractSteghidePacketFromPrepared(prepared, passphrase, headerOnly = false) {
    const { type, carrier, carrierBytes } = prepared;
    const seed = await steghideSeedFromPassphrase(passphrase);
    const probe = readPacketBytesFromCarrierBytes(carrierBytes, carrier.indexes, seed, STEGHIDE_HEADER_BYTES);
    const headerLength = parseSteghidePacketHeader(probe);
    const headerPacket = readPacketBytesFromCarrierBytes(carrierBytes, carrier.indexes, seed, STEGHIDE_HEADER_BYTES + headerLength);
    const header = JSON.parse(bytesToUtf8(headerPacket.slice(STEGHIDE_HEADER_BYTES)));
    const totalLength = STEGHIDE_HEADER_BYTES + headerLength + Number(header.payloadSize || 0);
    if (headerOnly) return { header, carrier, type, packetLength: totalLength };
    if (!header.payloadSize || totalLength > carrier.capacityBytes) {
        throw new Error("El tamano declarado del payload no encaja con la capacidad del portador.");
    }
    const packet = readPacketBytesFromCarrierBytes(carrierBytes, carrier.indexes, seed, totalLength);
    let payload = packet.slice(STEGHIDE_HEADER_BYTES + headerLength);
    if (header.encrypted) {
        const key = await deriveSteghideAesKey(passphrase, base64ToBytes(header.salt), ["decrypt"]);
        payload = new Uint8Array(await getSubtleCrypto().decrypt({ name: "AES-GCM", iv: base64ToBytes(header.iv) }, key, payload));
    }
    if (header.compressed) {
        const decompressed = await bytesThroughCompressionStream(payload, "decompress");
        if (!decompressed.used) throw new Error("El navegador no pudo descomprimir el payload deflate.");
        payload = decompressed.bytes;
    }
    if (header.checksum) {
        const crc = pngCrc32(payload).toString(16).padStart(8, "0");
        if (crc !== header.crc32) throw new Error("CRC32 no coincide; passphrase incorrecta o datos alterados.");
    }
    return { header, payload, carrier, type, packetLength: totalLength };
}

async function extractSteghidePacketFromCarrier(file, passphrase, headerOnly = false) {
    return await extractSteghidePacketFromPrepared(await prepareSteghideExtraction(file), passphrase, headerOnly);
}

function steghideNativeCommandLines(fileName, secretName = "secret.bin", outputName = "stego-output") {
    const pass = steghidePassphrase.value ? ` -p "${steghidePassphrase.value.replace(/"/g, "\\\"")}"` : "";
    const compression = steghideCompression.value === "none"
        ? " -Z"
        : ` -z ${Number(steghideCompressionLevel.value) || 6}`;
    const checksum = steghideChecksum.value ? "" : " -K";
    const name = steghideStoreName.value ? "" : " -N";
    return [
        `steghide info "${fileName}"${pass}`,
        `steghide embed -cf "${fileName}" -ef "${secretName}" -sf "${outputName}"${pass}${compression}${checksum}${name}`,
        `steghide extract -sf "${fileName}" -xf "extracted-${secretName}"${pass}`,
        `stegseek "${fileName}" "wordlist.txt"`,
        `stegseek --seed "${fileName}"`,
        "stegseek --help -v"
    ];
}

function steghideResultPanels(commandLines, details = [], extraPanels = []) {
    return [
        {
            title: "Comandos nativos equivalentes",
            badge: "cli",
            content: commandLines.join("\n"),
            copyValue: commandLines.join("\n")
        },
        {
            title: "Lectura tecnica",
            badge: "lab",
            content: buildTextList("Steghide / StegSeek", details),
            copyValue: details.join("\n")
        },
        ...extraPanels
    ];
}

function fillSteghideExample() {
    steghideOperation.value = "info";
    steghidePassphrase.value = "feanor-lab";
    steghideEncryption.value = "aes-gcm";
    steghideCompression.value = "auto";
    steghideCompressionLevel.value = 6;
    steghideChecksum.value = true;
    steghideStoreName.value = true;
    steghideMaxGuesses.value = 5000;
    steghideSkipDefaultGuesses.value = false;
    steghideResult.value = {
        verdictTone: "verdict-success",
        verdictTitle: "Ejemplo cargado",
        verdictBody: "Sube un BMP/WAV/AU para salida directa o una imagen compatible para salida PNG por canvas. Sube tambien un fichero secreto si quieres incrustar.",
        summaryCards: [
            { label: "Passphrase", value: "Lista", tone: "tone-success", note: "feanor-lab" },
            { label: "Cifrado", value: "AES-GCM", tone: "tone-success", note: "PBKDF2" },
            { label: "Compresion", value: "Auto", tone: "tone-neutral", note: "deflate si compensa" },
            { label: "Checksum", value: "CRC32", tone: "tone-success", note: "Integridad" }
        ],
        panels: steghideResultPanels(steghideNativeCommandLines("cover.jpg", "secret.txt", "stego.jpg"), [
            "Steghide real: JPEG/BMP/WAV/AU, cifrado Rijndael-128 CBC por defecto, compresion y CRC32.",
            "StegSeek real: crack por wordlist y modo --seed para detectar contenido Steghide.",
            "Frontend: formato de laboratorio FEANOR_STEGHIDE_V1 con posiciones pseudoaleatorias derivadas de passphrase."
        ])
    };
}

async function analyzeImageLsb(file, type) {
    if (type.family !== "image" || type.label === "SVG") return null;
    try {
        const { imageData, width, height } = await imageFileToCanvas(file);
        const data = imageData.data;
        let ones = 0;
        const totalBits = (data.length / 4) * 3;
        for (let index = 0; index < data.length; index += 4) {
            ones += data[index] & 1;
            ones += data[index + 1] & 1;
            ones += data[index + 2] & 1;
        }
        let hasFeanorPayload = false;
        try {
            readStegoPacketFromImageData(imageData);
            hasFeanorPayload = true;
        } catch {
            hasFeanorPayload = false;
        }
        return {
            width,
            height,
            capacityBytes: calculateLsbCapacityBytes(imageData),
            lsbRatio: ones / totalBits,
            hasFeanorPayload
        };
    } catch {
        return null;
    }
}

function canvasToPngBlob(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error("No se pudo exportar el PNG generado."));
        }, "image/png");
    });
}

async function analyzeExifFile() {
    if (!exifFile.value) {
        exifResult.value = buildErrorResult("EXIF_FILE_EMPTY", "Falta imagen", "Selecciona una imagen local para extraer sus metadatos.");
        return;
    }

    try {
        const file = exifFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(bytes, file);
        const entropy = byteShannonEntropy(bytes);
        const sha256 = globalThis.crypto?.subtle
            ? bytesToHex(new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", bytes)))
            : "";
        let container = { metadataLines: [], formatLines: [], indicators: [], appendedBytes: 0 };
        try {
            container = collectContainerHints(bytes, type);
        } catch (error) {
            container.indicators = [`No se pudo inspeccionar el contenedor: ${error.message}`];
        }

        let metadata = {};
        let parseError = "";
        try {
            metadata = await parseExifMetadata(file) || {};
        } catch (error) {
            parseError = error.message;
        }

        const builtRows = buildExifRows(metadata, file, bytes, type, sha256, entropy, container, parseError);
        const reportRows = rowsForExifReport(builtRows.rows);
        const allSortedRows = sortExifRows(builtRows.rows, "forensic");
        const reportText = formatExifToolLikeReport(reportRows, file, type, sha256);
        const groups = categorizeExifMetadata(metadata);
        const mapLink = gpsMapLink(metadata);
        const metadataCount = builtRows.metadataRows.length;
        const highRisks = builtRows.rows.filter(row => row.riskLevel === "high");
        const warningRisks = builtRows.rows.filter(row => row.riskLevel === "warning");
        const hasGps = highRisks.length > 0 || groups.gps.length > 0;
        const hasIdentity = warningRisks.length > 0;
        const hasContainerWarnings = builtRows.rows.some(row => row.group === "Warnings" || row.group === "Parser");
        const noMetadata = metadataCount === 0;
        const riskTone = hasGps || hasIdentity || hasContainerWarnings || noMetadata ? "verdict-warning" : "verdict-success";
        const riskLabel = hasGps
            ? "Ubicacion visible"
            : hasIdentity
                ? "Identidad visible"
                : hasContainerWarnings
                    ? "Revisar contenedor"
                    : noMetadata
                        ? "Sin EXIF visible"
                        : "Metadatos tecnicos";
        const riskLines = buildExifRiskLines(builtRows.rows);
        const groupLines = summarizeExifGroups(allSortedRows);
        const keyLines = buildExifKeyLines(groups, mapLink);
        const profileNotes = buildExifProfileNotes(builtRows.metadataRows, reportRows, parseError);
        const rawJson = {
            file: {
                name: file.name,
                size: file.size,
                browserMime: file.type || "",
                detectedType: type,
                sha256: sha256 || null,
                entropy
            },
            profile: {
                value: exifProfile.value,
                label: selectedExifProfile.value.label,
                detailMode: exifDetailMode.value,
                filter: exifTagFilter.value.trim()
            },
            rows: allSortedRows,
            shownRows: reportRows,
            metadata,
            container
        };
        setExifDownloads(file.name, reportText, rawJson);

        exifResult.value = {
            verdictTone: riskTone,
            verdictTitle: noMetadata ? "Reporte generado sin EXIF legible" : "Reporte EXIF generado",
            verdictBody: hasGps
                ? "Hay datos de ubicacion o GPS en las filas legibles. Revisa antes de compartir esta imagen."
                : hasIdentity
                    ? "Hay campos que pueden identificar autor, dispositivo, flujo de edicion o procedencia."
                    : noMetadata
                        ? "El contenedor se pudo inspeccionar, pero no hay tags EXIF/XMP/IPTC/ICC accesibles desde el navegador."
                        : "Los metadatos se han organizado en un reporte exportable con grupos, tags y lectura de privacidad.",
            summaryCards: [
                { label: "Tipo", value: type.label, tone: "tone-neutral", note: file.type || "MIME" },
                { label: "Tags", value: String(metadataCount), tone: metadataCount ? "tone-success" : "tone-warning", note: "Metadatos parseados" },
                { label: "GPS", value: hasGps ? "Si" : "No", tone: hasGps ? "tone-warning" : "tone-success", note: "Ubicacion" },
                { label: "Riesgo", value: riskLabel, tone: hasGps || hasIdentity || hasContainerWarnings ? "tone-warning" : "tone-success", note: "Privacidad" }
            ],
            signalCards: [
                { label: "Perfil", value: selectedExifProfile.value.badge, tone: "tone-neutral", note: selectedExifProfile.value.label },
                { label: "Filtro", value: exifTagFilter.value.trim() ? "Activo" : "No", tone: exifTagFilter.value.trim() ? "tone-warning" : "tone-success", note: `${reportRows.length} filas` },
                { label: "SHA-256", value: sha256 ? "Si" : "No", tone: sha256 ? "tone-success" : "tone-neutral", note: "Huella local" },
                { label: "Export", value: "TXT/JSON", tone: "tone-success", note: "Sin servidor" }
            ],
            panels: [
                {
                    title: "Resultado",
                    badge: "GAS",
                    content: reportText,
                    copyValue: reportText
                },
                {
                    title: "Riesgos y lectura rapida",
                    badge: "priv",
                    content: buildTextList("Privacidad", [...riskLines, ...profileNotes]),
                    copyValue: [...riskLines, ...profileNotes].join("\n")
                },
                {
                    title: "Grupos detectados",
                    badge: "grp",
                    content: buildTextList("Grupos", groupLines),
                    copyValue: groupLines.join("\n")
                },
                {
                    title: "Campos clave",
                    badge: "key",
                    content: buildTextList("Lectura organizada", keyLines),
                    copyValue: keyLines.join("\n")
                },
                {
                    title: "Estructura del contenedor",
                    badge: "bin",
                    content: buildTextList("Bloques", [
                        ...container.indicators,
                        ...(container.formatLines || []).slice(0, exifDetailMode.value === "raw" ? 80 : 24),
                        ...(container.metadataLines || []).slice(0, 16)
                    ]),
                    copyValue: [
                        ...container.indicators,
                        ...(container.formatLines || []),
                        ...(container.metadataLines || [])
                    ].join("\n")
                },
                {
                    title: "JSON crudo",
                    badge: "raw",
                    content: exifDetailMode.value === "raw" ? safeJson(rawJson) : "Disponible en la descarga JSON. Cambia la vista a Crudo / auditoria para verlo dentro del panel.",
                    copyValue: safeJson(rawJson)
                }
            ]
        };
    } catch (error) {
        exifResult.value = buildErrorResult("EXIF_ANALYZE_FAILED", "No se pudo extraer EXIF", error.message);
    }
}

async function runSteghideInfo() {
    if (!steghideFile.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_FILE_EMPTY", "Falta cover/stegofile", "Selecciona un JPEG, BMP, WAV, AU o una imagen compatible.");
        return;
    }

    try {
        const file = steghideFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(bytes, file);
        const compatibility = steghideCompatibilityForType(type);
        let carrier = null;
        let carrierLines = [];
        try {
            carrier = await getSteghideCarrier(file, bytes, type, false);
            carrierLines = carrier.detail;
        } catch (error) {
            carrierLines = [`No se pudo preparar portador frontend: ${error.message}`];
        }
        const container = collectContainerHints(bytes, type);
        const entropy = byteShannonEntropy(bytes);
        const commands = steghideNativeCommandLines(file.name, steghideSecretFile.value?.name || "secret.bin", `${safeFileBaseName(file.name)}-steg.${type.extension || "bin"}`);
        const capacityBytes = carrier?.capacityBytes || 0;
        const secretSize = steghideSecretFile.value?.size || 0;
        const fitsSecret = secretSize ? secretSize < capacityBytes : null;

        steghideOperation.value = "info";
        steghideResult.value = {
            verdictTone: compatibility.native || carrier ? "verdict-success" : "verdict-warning",
            verdictTitle: "Info Steghide generada",
            verdictBody: compatibility.native
                ? "El fichero pertenece a una familia soportada por Steghide nativo. El laboratorio calcula capacidad frontend y comandos equivalentes."
                : "El formato no es Steghide nativo; se ofrece analisis local y, si es imagen decodificable, modo canvas/PNG.",
            summaryCards: [
                { label: "Tipo", value: type.label, tone: compatibility.native ? "tone-success" : "tone-warning", note: compatibility.native ? "Steghide nativo" : "No nativo" },
                { label: "Capacidad", value: capacityBytes ? formatBytesSize(capacityBytes) : "N/D", tone: capacityBytes ? "tone-success" : "tone-warning", note: "LSB frontend" },
                { label: "Entropy", value: `${entropy.toFixed(2)}`, tone: entropy > 7.85 ? "tone-warning" : "tone-neutral", note: "bits/byte" },
                { label: "Secreto", value: secretSize ? formatBytesSize(secretSize) : "N/D", tone: fitsSecret === false ? "tone-warning" : "tone-neutral", note: fitsSecret === null ? "No seleccionado" : fitsSecret ? "Encaja sin overhead" : "Grande" }
            ],
            signalCards: [
                { label: "Frontend", value: compatibility.frontend, tone: carrier ? "tone-success" : "tone-warning", note: compatibility.note },
                { label: "Compresion", value: steghideCompression.value === "auto" ? `z${steghideCompressionLevel.value}` : "-Z", tone: "tone-neutral", note: "Opcion lab" },
                { label: "Cifrado", value: steghideEncryption.value === "aes-gcm" ? "AES-GCM" : "none", tone: steghideEncryption.value === "aes-gcm" ? "tone-success" : "tone-warning", note: "Frontend" },
                { label: "Checksum", value: steghideChecksum.value ? "CRC32" : "No", tone: steghideChecksum.value ? "tone-success" : "tone-warning", note: steghideChecksum.value ? "Validacion" : "-K" }
            ],
            panels: steghideResultPanels(commands, [
                ...carrierLines,
                ...container.indicators,
                `Formato detectado por magic bytes: ${type.label}.`,
                `Compatibilidad: ${compatibility.note}`,
                "Steghide real detecta formato por cabecera, no por extension.",
                "StegSeek real puede probar wordlists contra contenido Steghide nativo; el navegador prueba wordlists contra FEANOR_STEGHIDE_V1."
            ], [
                {
                    title: "Estructura visible",
                    badge: "fmt",
                    content: buildTextList("Contenedor", [
                        ...(container.formatLines || []).slice(0, 36),
                        ...(container.metadataLines || []).slice(0, 16)
                    ]),
                    copyValue: [...(container.formatLines || []), ...(container.metadataLines || [])].join("\n")
                }
            ])
        };
    } catch (error) {
        steghideResult.value = buildErrorResult("STEGHIDE_INFO_FAILED", "No se pudo generar info", error.message);
    }
}

async function embedSteghidePayload() {
    if (!steghideFile.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_COVER_EMPTY", "Falta cover file", "Selecciona un fichero portador antes de incrustar.");
        return;
    }
    if (!steghideSecretFile.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_SECRET_EMPTY", "Falta embedded file", "Selecciona el fichero secreto que quieres ocultar.");
        return;
    }
    if (steghideEncryption.value === "aes-gcm" && !steghidePassphrase.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_PASSPHRASE_EMPTY", "Falta passphrase", "AES-GCM y el orden pseudoaleatorio necesitan una passphrase.");
        return;
    }

    try {
        const file = steghideFile.value;
        const coverBytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(coverBytes, file);
        const carrier = await getSteghideCarrier(file, coverBytes, type, false);
        const built = await buildSteghidePacket(steghideSecretFile.value, steghidePassphrase.value);
        const seed = await steghideSeedFromPassphrase(steghidePassphrase.value);
        if (built.packet.length > carrier.capacityBytes) {
            throw new Error(`Paquete ${formatBytesSize(built.packet.length)} mayor que capacidad ${formatBytesSize(carrier.capacityBytes)}.`);
        }

        let blob = null;
        let extension = carrier.extension;
        if (carrier.mode === "canvas") {
            const outputData = writePacketToCarrierBytes(carrier.image.imageData.data, carrier.indexes, built.packet, seed);
            carrier.image.imageData.data.set(outputData);
            carrier.image.context.putImageData(carrier.image.imageData, 0, 0);
            blob = await canvasToPngBlob(carrier.image.canvas);
            extension = "png";
        } else {
            const outputBytes = writePacketToCarrierBytes(carrier.sourceBytes, carrier.indexes, built.packet, seed);
            blob = new Blob([outputBytes], { type: carrier.mime });
        }
        const outputName = `${safeFileBaseName(file.name)}-feanor-steghide.${extension}`;
        setSteghideDownload(blob, outputName);
        const commands = steghideNativeCommandLines(file.name, steghideSecretFile.value.name, outputName);
        const overhead = built.packet.length - built.header.payloadSize;

        steghideOperation.value = "embed";
        steghideResult.value = {
            verdictTone: "verdict-success",
            verdictTitle: "Payload incrustado",
            verdictBody: carrier.mode === "canvas"
                ? "El payload se ha escrito en pixeles decodificados y se ha exportado como PNG para conservar los bits."
                : "El payload se ha escrito directamente sobre bytes portadores del formato seleccionado.",
            summaryCards: [
                { label: "Salida", value: outputName, tone: "tone-success", note: carrier.mode === "canvas" ? "PNG" : type.label },
                { label: "Secreto", value: formatBytesSize(built.originalBytes.length), tone: "tone-success", note: steghideSecretFile.value.name },
                { label: "Paquete", value: formatBytesSize(built.packet.length), tone: "tone-neutral", note: `${formatBytesSize(overhead)} overhead` },
                { label: "Uso", value: `${((built.packet.length / carrier.capacityBytes) * 100).toFixed(2)}%`, tone: "tone-success", note: "Capacidad LSB" }
            ],
            signalCards: [
                { label: "Orden", value: "PRNG", tone: "tone-success", note: "Passphrase -> SHA-256 -> xorshift" },
                { label: "Cifrado", value: built.header.encryption, tone: built.header.encrypted ? "tone-success" : "tone-warning", note: built.header.kdf },
                { label: "Compresion", value: built.header.compression, tone: built.header.compressed ? "tone-success" : "tone-neutral", note: built.header.compressed ? `${built.header.originalSize} -> ${built.header.storedSize}` : "Sin ahorro" },
                { label: "CRC32", value: built.header.checksum ? built.header.crc32 : "No", tone: built.header.checksum ? "tone-success" : "tone-warning", note: "Checksum" }
            ],
            panels: steghideResultPanels(commands, [
                ...carrier.detail,
                `Magic interno: ${STEGHIDE_MAGIC_TEXT}.`,
                `Nombre embebido: ${built.header.originalName || "no guardado"}.`,
                `Descarga generada: ${outputName}.`,
                "El formato frontend no es binariamente compatible con steghide nativo; reproduce su flujo operativo en navegador."
            ], [
                {
                    title: "Cabecera del paquete",
                    badge: "json",
                    content: safeJson(built.header),
                    copyValue: safeJson(built.header)
                }
            ])
        };
    } catch (error) {
        steghideResult.value = buildErrorResult("STEGHIDE_EMBED_FAILED", "No se pudo incrustar", error.message);
    }
}

async function extractSteghidePayload() {
    if (!steghideFile.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_STEGO_EMPTY", "Falta stego file", "Selecciona el fichero que contiene datos ocultos.");
        return;
    }

    try {
        const extracted = await extractSteghidePacketFromCarrier(steghideFile.value, steghidePassphrase.value, false);
        const outputName = steghideStoreName.value && extracted.header.originalName
            ? extracted.header.originalName
            : extracted.header.fallbackName || `${safeFileBaseName(steghideFile.value.name)}.out`;
        setSteghideDownload(new Blob([extracted.payload], { type: extracted.header.mime || "application/octet-stream" }), outputName);
        const commands = steghideNativeCommandLines(steghideFile.value.name, outputName, steghideFile.value.name);

        steghideOperation.value = "extract";
        steghideResult.value = {
            primaryValue: bytesToHex(extracted.payload.slice(0, Math.min(64, extracted.payload.length))),
            verdictTone: "verdict-success",
            verdictTitle: "Payload extraido",
            verdictBody: "La cabecera, el descifrado y el checksum han validado con la passphrase indicada.",
            summaryCards: [
                { label: "Archivo", value: outputName, tone: "tone-success", note: extracted.header.mime || "binario" },
                { label: "Tamano", value: formatBytesSize(extracted.payload.length), tone: "tone-success", note: "Payload recuperado" },
                { label: "Cifrado", value: extracted.header.encryption, tone: extracted.header.encrypted ? "tone-success" : "tone-warning", note: extracted.header.kdf },
                { label: "CRC32", value: extracted.header.checksum ? "OK" : "No", tone: extracted.header.checksum ? "tone-success" : "tone-warning", note: extracted.header.crc32 || "-K" }
            ],
            signalCards: [
                { label: "Tipo", value: extracted.type.label, tone: "tone-neutral", note: "Portador" },
                { label: "Compresion", value: extracted.header.compression, tone: extracted.header.compressed ? "tone-success" : "tone-neutral", note: extracted.header.compressed ? "Descomprimido" : "No usada" },
                { label: "Paquete", value: formatBytesSize(extracted.packetLength), tone: "tone-neutral", note: "Bytes ocultos" },
                { label: "Descarga", value: "Lista", tone: "tone-success", note: outputName }
            ],
            panels: steghideResultPanels(commands, [
                `Magic interno: ${extracted.header.format}.`,
                `Nombre original: ${extracted.header.originalName || "no guardado"}.`,
                `Tamano original declarado: ${formatBytesSize(extracted.header.originalSize)}.`,
                "La descarga contiene el payload recuperado."
            ], [
                {
                    title: "Cabecera recuperada",
                    badge: "json",
                    content: safeJson(extracted.header),
                    copyValue: safeJson(extracted.header)
                },
                {
                    title: "Primeros bytes Hex",
                    badge: "hex",
                    content: bytesToHex(extracted.payload.slice(0, Math.min(512, extracted.payload.length))),
                    copyValue: bytesToHex(extracted.payload)
                }
            ])
        };
    } catch (error) {
        steghideResult.value = buildErrorResult("STEGHIDE_EXTRACT_FAILED", "No se pudo extraer", error.message);
    }
}

function defaultSteghideGuesses(file) {
    const base = safeFileBaseName(file?.name || "");
    return ["", base, file?.name || "", "password", "pass", "secret", "stego", "steghide", "feanor-lab"]
        .filter((value, index, list) => list.indexOf(value) === index);
}

async function readSteghideWordlist() {
    if (!steghideWordlistFile.value) return [];
    const text = await steghideWordlistFile.value.text();
    return text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);
}

async function crackSteghideWordlist() {
    if (!steghideFile.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_CRACK_FILE_EMPTY", "Falta stego file", "Selecciona el fichero a probar.");
        return;
    }
    if (!steghideWordlistFile.value && steghideSkipDefaultGuesses.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_WORDLIST_EMPTY", "Falta wordlist", "Sube un TXT de passwords o permite guesses extra.");
        return;
    }

    try {
        const wordlist = await readSteghideWordlist();
        const guesses = steghideSkipDefaultGuesses.value
            ? wordlist
            : [...defaultSteghideGuesses(steghideFile.value), ...wordlist];
        const uniqueGuesses = Array.from(new Set(guesses)).slice(0, Math.max(1, Number(steghideMaxGuesses.value) || 5000));
        const prepared = await prepareSteghideExtraction(steghideFile.value);
        const started = performance.now();
        let found = null;
        let header = null;
        let attempts = 0;
        for (const guess of uniqueGuesses) {
            attempts += 1;
            try {
                const probe = await extractSteghidePacketFromPrepared(prepared, guess, true);
                found = guess;
                header = probe.header;
                break;
            } catch {
                // Continue with next candidate.
            }
        }
        const elapsedMs = performance.now() - started;
        const commands = steghideNativeCommandLines(steghideFile.value.name, "secret.bin", `${safeFileBaseName(steghideFile.value.name)}.out`);

        steghideOperation.value = "crack";
        steghideResult.value = {
            verdictTone: found !== null ? "verdict-success" : "verdict-warning",
            verdictTitle: found !== null ? "Passphrase encontrada" : "Wordlist agotada",
            verdictBody: found !== null
                ? "La cabecera del formato frontend valido con una passphrase candidata. Usa Extraer para recuperar el payload."
                : "No se encontro una passphrase valida para FEANOR_STEGHIDE_V1 dentro del limite configurado.",
            summaryCards: [
                { label: "Intentos", value: String(attempts), tone: "tone-neutral", note: `${uniqueGuesses.length} candidatos` },
                { label: "Tiempo", value: `${elapsedMs.toFixed(0)} ms`, tone: "tone-neutral", note: "Navegador" },
                { label: "Resultado", value: found !== null ? "Encontrada" : "No", tone: found !== null ? "tone-success" : "tone-warning", note: found !== null ? "Header OK" : "Sin match" },
                { label: "Modo", value: "Wordlist", tone: "tone-neutral", note: "StegSeek-like frontend" }
            ],
            signalCards: [
                { label: "Passphrase", value: found !== null ? (found || "<vacia>") : "N/D", tone: found !== null ? "tone-success" : "tone-neutral", note: "Candidata" },
                { label: "Wordlist", value: steghideWordlistFile.value?.name || "Default", tone: "tone-neutral", note: steghideSkipDefaultGuesses.value ? "Solo wordlist" : "Con guesses" },
                { label: "Native", value: "stegseek", tone: "tone-success", note: "Comando generado" },
                { label: "Limite", value: String(steghideMaxGuesses.value), tone: "tone-neutral", note: "Max intentos" }
            ],
            panels: steghideResultPanels(commands, [
                "StegSeek nativo prueba passwords contra steghide real a velocidad muy superior.",
                "El crack del navegador solo aplica al formato FEANOR_STEGHIDE_V1 y se limita para no bloquear la interfaz.",
                found !== null ? `Passphrase encontrada: ${found || "<vacia>"}.` : "Amplia la wordlist o sube el fichero a StegSeek nativo si sospechas Steghide real."
            ], [
                {
                    title: "Cabecera encontrada",
                    badge: "json",
                    content: header ? safeJson(header) : "Sin cabecera valida.",
                    copyValue: header ? safeJson(header) : ""
                }
            ])
        };
    } catch (error) {
        steghideResult.value = buildErrorResult("STEGHIDE_CRACK_FAILED", "No se pudo ejecutar crack", error.message);
    }
}

async function runSteghideSeedProbe() {
    if (!steghideFile.value) {
        steghideResult.value = buildErrorResult("STEGHIDE_SEED_FILE_EMPTY", "Falta stego file", "Selecciona el fichero para revisar modo seed/probe.");
        return;
    }

    try {
        const file = steghideFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(bytes, file);
        const compatibility = steghideCompatibilityForType(type);
        let emptyProbe = null;
        let emptyError = "";
        try {
            emptyProbe = await extractSteghidePacketFromCarrier(file, "", true);
        } catch (error) {
            emptyError = error.message;
        }
        const container = collectContainerHints(bytes, type);
        const commands = steghideNativeCommandLines(file.name, "secret.bin", `${safeFileBaseName(file.name)}.out`);

        steghideOperation.value = "seed";
        steghideResult.value = {
            verdictTone: emptyProbe ? "verdict-success" : "verdict-warning",
            verdictTitle: emptyProbe ? "Probe sin passphrase detectado" : "Seed nativo recomendado",
            verdictBody: emptyProbe
                ? "Se detecto una cabecera frontend con passphrase vacia. Puedes extraerla sin diccionario."
                : "No se detecto cabecera frontend sin passphrase. Para Steghide real, el modo --seed requiere StegSeek nativo.",
            summaryCards: [
                { label: "Tipo", value: type.label, tone: compatibility.native ? "tone-success" : "tone-warning", note: compatibility.native ? "Steghide nativo" : "No nativo" },
                { label: "--seed", value: compatibility.native ? "Aplica" : "No nativo", tone: compatibility.native ? "tone-success" : "tone-warning", note: "StegSeek real" },
                { label: "Probe", value: emptyProbe ? "Match" : "No", tone: emptyProbe ? "tone-success" : "tone-neutral", note: "Passphrase vacia" },
                { label: "Warnings", value: String(container.indicators.length), tone: container.indicators.length ? "tone-warning" : "tone-success", note: "Contenedor" }
            ],
            signalCards: [
                { label: "CVE", value: "2021-27211", tone: "tone-warning", note: "Seed de Steghide" },
                { label: "Rango", value: "2^32", tone: "tone-warning", note: "No viable en JS UI" },
                { label: "Frontend", value: emptyProbe ? "Detectado" : "Sin match", tone: emptyProbe ? "tone-success" : "tone-neutral", note: "FEANOR_STEGHIDE_V1" },
                { label: "Native", value: "stegseek --seed", tone: "tone-success", note: "Comando generado" }
            ],
            panels: steghideResultPanels(commands, [
                "StegSeek --seed intenta patrones de embedding para detectar contenido Steghide y extraer si no hay cifrado.",
                "El navegador no ejecuta el barrido completo 2^32 para no congelar la UI ni fingir rendimiento nativo.",
                emptyProbe ? "Hay cabecera frontend con passphrase vacia." : `Probe frontend: ${emptyError}`,
                ...container.indicators
            ], [
                {
                    title: "Cabecera probe",
                    badge: "seed",
                    content: emptyProbe ? safeJson(emptyProbe.header) : "Sin cabecera frontend con passphrase vacia.",
                    copyValue: emptyProbe ? safeJson(emptyProbe.header) : ""
                }
            ])
        };
    } catch (error) {
        steghideResult.value = buildErrorResult("STEGHIDE_SEED_FAILED", "No se pudo ejecutar seed/probe", error.message);
    }
}

async function analyzeStegoFile() {
    if (!stegoAnalyzeFile.value) {
        stegoAnalyzeResult.value = buildErrorResult("STEGO_FILE_EMPTY", "Falta fichero", "Selecciona un fichero local para analizar.");
        return;
    }

    try {
        const file = stegoAnalyzeFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(bytes, file);
        const entropy = byteShannonEntropy(bytes);
        const entropyText = `${entropy.toFixed(2)} bits/byte`;
        const strings = scanPrintableStrings(bytes);
        const container = collectContainerHints(bytes, type);
        const exifLines = await collectExifMetadata(file, type);
        const zipInfo = type.family === "archive" ? await inspectZipLikeFile(file) : { metadataLines: [], formatLines: [], indicators: [] };
        const lsb = await analyzeImageLsb(file, type);
        const sha256 = globalThis.crypto?.subtle
            ? bytesToHex(new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", bytes)))
            : "No disponible";

        const indicators = [
            ...container.indicators,
            ...zipInfo.indicators,
            findBytes(bytes, STEGO_MAGIC_BYTES) >= 0 || findBytes(bytes, STEGO_PACKET_MAGIC_BYTES) >= 0 ? "Cabecera Feanor visible en bytes crudos." : "",
            lsb?.hasFeanorPayload ? "Cabecera LSB de Feanor detectada en pixeles." : "",
            entropy > 7.85 && bytes.length > 4096 ? "Entropia global muy alta; puede ser compresion, cifrado o contenido aleatorio." : "",
            strings.some(line => /password|secret|token|private|payload|stego/i.test(line)) ? "Cadenas imprimibles con terminos sensibles." : ""
        ].filter(Boolean);

        const metadataLines = [
            ...exifLines.map(line => `EXIF/XMP/IPTC: ${line}`),
            ...container.metadataLines,
            ...zipInfo.metadataLines
        ];
        const formatLines = [
            `Nombre: ${file.name}`,
            `MIME navegador: ${file.type || "N/D"}`,
            `Magic bytes: ${bytesToHex(bytes.slice(0, 16))}`,
            `SHA-256: ${sha256}`,
            ...analyzeEncodingSignals(bytes).map(line => `Encoding: ${line}`),
            lsb ? `Imagen: ${lsb.width}x${lsb.height}, capacidad LSB aprox ${formatBytesSize(lsb.capacityBytes)}` : "",
            lsb ? `Balance LSB RGB: ${(lsb.lsbRatio * 100).toFixed(2)}% de unos` : "",
            ...container.formatLines,
            ...zipInfo.formatLines
        ].filter(Boolean);

        const highRisk = lsb?.hasFeanorPayload || findBytes(bytes, STEGO_MAGIC_BYTES) >= 0 || findBytes(bytes, STEGO_PACKET_MAGIC_BYTES) >= 0 || container.appendedBytes > 128;
        const mediumRisk = !highRisk && (indicators.length > 0 || metadataLines.length > 0 || entropy > 7.85);
        const verdictTone = highRisk ? "verdict-danger" : mediumRisk ? "verdict-warning" : "verdict-success";
        const riskLabel = highRisk ? "Alta" : mediumRisk ? "Media" : "Baja";
        const findings = indicators.length
            ? indicators
            : ["No se han detectado cabeceras Feanor, datos anexados claros ni indicadores fuertes en el analisis local."];

        stegoAnalyzeResult.value = {
            verdictTone,
            verdictTitle: `Sospecha ${riskLabel.toLowerCase()}`,
            verdictBody: highRisk
                ? "Hay senales compatibles con datos ocultos o bytes fuera de la estructura esperada."
                : mediumRisk
                    ? "Se han encontrado metadatos o senales que conviene revisar manualmente."
                    : "El fichero no muestra senales claras en las pruebas locales disponibles.",
            summaryCards: [
                { label: "Tipo", value: type.label, tone: "tone-neutral", note: type.family },
                { label: "Tamano", value: formatBytesSize(file.size), tone: "tone-neutral", note: "Fichero local" },
                { label: "Riesgo", value: riskLabel, tone: highRisk ? "tone-danger" : mediumRisk ? "tone-warning" : "tone-success", note: "Indicadores" },
                { label: "Entropia", value: entropyText, tone: entropy > 7.85 ? "tone-warning" : "tone-success", note: "Global" }
            ],
            signalCards: [
                { label: "Metadatos", value: String(metadataLines.length), tone: metadataLines.length ? "tone-warning" : "tone-success", note: "Campos visibles" },
                { label: "Cadenas", value: String(strings.length), tone: strings.length ? "tone-neutral" : "tone-success", note: "ASCII imprimible" },
                { label: "LSB Feanor", value: lsb?.hasFeanorPayload ? "Si" : "No", tone: lsb?.hasFeanorPayload ? "tone-danger" : "tone-success", note: "Cabecera propia" },
                { label: "Bytes anexos", value: container.appendedBytes ? formatBytesSize(container.appendedBytes) : "No", tone: container.appendedBytes ? "tone-warning" : "tone-success", note: "Tras final" }
            ],
            panels: [
                {
                    title: "Resultado",
                    badge: "scan",
                    content: buildTextList("Hallazgos", findings),
                    copyValue: findings.join("\n")
                },
                {
                    title: "Cadenas visibles",
                    badge: "ascii",
                    content: buildTextList("Cadenas", strings.map(line => line.length > 220 ? `${line.slice(0, 220)}...` : line)),
                    copyValue: strings.join("\n")
                },
                {
                    title: "Metadatos detectados",
                    badge: "meta",
                    content: buildTextList("Campos", metadataLines),
                    copyValue: metadataLines.join("\n")
                },
                {
                    title: "Detalles de formato",
                    badge: type.label,
                    content: buildTextList("Estructura", formatLines),
                    copyValue: formatLines.join("\n")
                }
            ]
        };
    } catch (error) {
        stegoAnalyzeResult.value = buildErrorResult("STEGO_ANALYZE_FAILED", "No se pudo analizar el fichero", error.message);
    }
}

function stegoDetectedMime(type, file) {
    const map = {
        PNG: "image/png",
        JPEG: "image/jpeg",
        GIF: "image/gif",
        BMP: "image/bmp",
        WEBP: "image/webp",
        WAV: "audio/wav",
        AU: "audio/basic",
        MP3: "audio/mpeg",
        PDF: "application/pdf",
        ZIP: "application/zip"
    };
    return file?.type || map[type.label] || "application/octet-stream";
}

function stegoOutputName(file, suffix, extension) {
    const ext = extension || file?.name?.split(".").pop()?.toLowerCase() || "bin";
    return `${safeFileBaseName(file?.name || "feanor-cover")}-${suffix}.${ext}`;
}

async function buildStegoPayloadDescriptor() {
    const source = stegoEmbedPayloadSource.value;
    if (source === "file") {
        if (!stegoEmbedPayloadFile.value) {
            throw new Error("Selecciona el fichero que quieres incrustar.");
        }
        const file = stegoEmbedPayloadFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        return {
            bytes,
            header: {
                source: "file",
                encoding: "binary",
                payloadName: stegoEmbedPayloadName.value.trim() || file.name || "payload.bin",
                payloadMime: file.type || "application/octet-stream"
            },
            preview: `Fichero: ${file.name}\nTamano: ${formatBytesSize(bytes.length)}\nMIME: ${file.type || "application/octet-stream"}`
        };
    }

    if (!stegoEmbedPayload.value.trim()) {
        throw new Error("Introduce datos para ocultar.");
    }

    if (source === "base64") {
        const parsed = parseBase64Payload(stegoEmbedPayload.value);
        const bytes = base64ToBytes(parsed.base64);
        const format = formatFromMime(parsed.mime);
        return {
            bytes,
            header: {
                source: "base64",
                encoding: "binary",
                payloadName: `payload.${format?.extension || "bin"}`,
                payloadMime: parsed.mime || "application/octet-stream",
                inputWasDataUri: parsed.isDataUri
            },
            preview: `Base64 normalizado: ${parsed.base64.slice(0, 120)}${parsed.base64.length > 120 ? "..." : ""}`
        };
    }

    const encoding = stegoEmbedTextEncoding.value;
    const text = source === "json"
        ? safeJson(JSON.parse(stegoEmbedPayload.value))
        : stegoEmbedPayload.value;
    const bytes = textToEncodedBytes(text, encoding);
    return {
        bytes,
        header: {
            source,
            encoding,
            payloadName: source === "json" ? "payload.json" : "payload.txt",
            payloadMime: source === "json"
                ? `application/json;charset=${getTextEncoding(encoding).mime}`
                : `text/plain;charset=${getTextEncoding(encoding).mime}`
        },
        preview: text
    };
}

function stegoPayloadPanel(header, payloadBytes, preview) {
    const content = ["text", "json"].includes(header.source)
        ? preview
        : buildTextList("Payload", [
            `Nombre: ${header.payloadName || "payload.bin"}`,
            `MIME: ${header.payloadMime || "application/octet-stream"}`,
            `Tamano: ${formatBytesSize(payloadBytes.length)}`,
            `Base64: ${bytesToBase64(payloadBytes).slice(0, 320)}${payloadBytes.length > 240 ? "..." : ""}`
        ]);
    return {
        title: "Payload preparado",
        badge: header.source,
        content,
        copyValue: ["text", "json"].includes(header.source) ? preview : bytesToBase64(payloadBytes)
    };
}

async function chooseAutoStegoMode(file, bytes, type, packet) {
    const byteCarrier = getByteCarrier(bytes, type);
    if (byteCarrier && packet.length <= Math.floor(byteCarrier.indexes.length / 8)) return { mode: "byte-lsb", carrier: byteCarrier };

    if (type.family === "image" && type.label !== "SVG" && type.label !== "TIFF") {
        try {
            const image = await imageFileToCanvas(file);
            if (packet.length <= calculateLsbCapacityBytes(image.imageData)) return { mode: "image-lsb", image };
        } catch {
            // Some image containers cannot be drawn by canvas; fall back below.
        }
    }

    if (type.label === "PNG") return { mode: "png-itxt" };
    return { mode: "append" };
}

function stegoEmbedResultObject({ file, type, mode, payload, packet, filename, capacityBytes = null, extraLines = [] }) {
    const modeInfo = stegoEmbedModes.find(item => item.value === mode) || selectedStegoEmbedMode.value;
    const usage = capacityBytes ? `${((packet.length / capacityBytes) * 100).toFixed(2)}%` : "N/D";
    return {
        verdictTone: "verdict-success",
        verdictTitle: "Datos incrustados",
        verdictBody: `Se genero ${filename} con ${modeInfo.label}. El paquete Feanor V2 conserva tipo, nombre, tamano y CRC32 del payload.`,
        summaryCards: [
            { label: "Portador", value: type.label, tone: "tone-neutral", note: `${type.family} / ${stegoEmbedCarrierHint.value}` },
            { label: "Payload", value: formatBytesSize(payload.bytes.length), tone: "tone-success", note: selectedStegoPayloadSource.value.label },
            { label: "Metodo", value: modeInfo.label, tone: "tone-success", note: selectedStegoEmbedMode.value.value === "auto" ? "Auto" : "Manual" },
            { label: "Salida", value: filename, tone: "tone-success", note: "Descargable" }
        ],
        signalCards: [
            { label: "Paquete", value: formatBytesSize(packet.length), tone: "tone-neutral", note: STEGO_PACKET_MAGIC_TEXT },
            { label: "CRC32", value: crc32Hex(payload.bytes), tone: "tone-success", note: "Payload" },
            { label: "Capacidad", value: capacityBytes ? formatBytesSize(capacityBytes) : "No aplica", tone: capacityBytes ? "tone-success" : "tone-neutral", note: capacityBytes ? usage : "Footer/metadata/ZIP" },
            { label: "Cifrado", value: "No", tone: "tone-warning", note: "Ocultacion" }
        ],
        panels: [
            {
                title: "Resultado",
                badge: mode,
                content: buildTextList("Fichero generado", [
                    `Portador original: ${file.name || "sin nombre"} (${formatBytesSize(file.size || 0)}).`,
                    `Salida: ${filename}.`,
                    `Metodo: ${modeInfo.note}`,
                    ...extraLines
                ]),
                copyValue: filename
            },
            {
                title: "Cabecera Feanor",
                badge: "v2",
                content: safeJson({
                    magic: STEGO_PACKET_MAGIC_TEXT,
                    mode,
                    payloadName: payload.header.payloadName,
                    payloadMime: payload.header.payloadMime,
                    payloadSize: payload.bytes.length,
                    crc32: crc32Hex(payload.bytes)
                }),
                copyValue: STEGO_PACKET_MAGIC_TEXT
            },
            stegoPayloadPanel(payload.header, payload.bytes, payload.preview)
        ]
    };
}

function fillStegoPayloadExample() {
    stegoEmbedPayloadSource.value = "json";
    stegoEmbedTextEncoding.value = "utf8";
    stegoEmbedPayload.value = safeJson({
        laboratorio: "Feanor",
        tipo: "paquete V2",
        payloads: ["texto", "json", "base64", "fichero"],
        nota: "Auto elige LSB, PNG iTXt o footer segun el portador"
    });
}

async function embedStegoPayload() {
    if (!stegoEmbedFile.value) {
        stegoEmbedResult.value = buildErrorResult("STEGO_CARRIER_EMPTY", "Falta portador", "Selecciona el fichero donde quieres incrustar datos.");
        return;
    }

    try {
        clearStegoDownload();
        const file = stegoEmbedFile.value;
        const carrierBytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(carrierBytes, file);
        const payload = await buildStegoPayloadDescriptor();
        const baseHeader = {
            ...payload.header,
            carrierName: file.name || "cover.bin",
            carrierMime: stegoDetectedMime(type, file),
            carrierType: type.label,
            carrierFamily: type.family,
            carrierHint: stegoEmbedCarrierHint.value,
            requestedMode: stegoEmbedMode.value
        };
        const packet = buildUniversalStegoPacket(payload.bytes, baseHeader);
        const selected = stegoEmbedMode.value === "auto"
            ? await chooseAutoStegoMode(file, carrierBytes, type, packet)
            : { mode: stegoEmbedMode.value };
        const mode = selected.mode;

        if (mode === "image-lsb") {
            const image = selected.image || await imageFileToCanvas(file);
            const capacityBytes = calculateLsbCapacityBytes(image.imageData);
            if (packet.length > capacityBytes) {
                throw new Error(`El paquete necesita ${formatBytesSize(packet.length)} y la imagen solo ofrece ${formatBytesSize(capacityBytes)} utiles.`);
            }
            writeLsbBytes(image.imageData, packet);
            image.context.putImageData(image.imageData, 0, 0);
            const blob = await canvasToPngBlob(image.canvas);
            const filename = stegoOutputName(file, "feanor-lsb", "png");
            setStegoDownload(blob, filename);
            stegoEmbedResult.value = stegoEmbedResultObject({
                file,
                type,
                mode,
                payload,
                packet,
                filename,
                capacityBytes,
                extraLines: [`Canvas: ${image.width}x${image.height}.`, "La salida se exporta como PNG para conservar los bits."]
            });
            return;
        }

        if (mode === "byte-lsb") {
            const carrier = selected.carrier || getByteCarrier(carrierBytes, type);
            if (!carrier) throw new Error("LSB directo solo esta disponible para BMP, WAV y AU.");
            const capacityBytes = Math.floor(carrier.indexes.length / 8);
            if (packet.length > capacityBytes) {
                throw new Error(`El paquete necesita ${formatBytesSize(packet.length)} y el portador solo ofrece ${formatBytesSize(capacityBytes)} utiles.`);
            }
            const outputBytes = writePacketToCarrierBytes(carrierBytes, carrier.indexes, packet, STEGO_DIRECT_LSB_SEED);
            const filename = stegoOutputName(file, "feanor-direct-lsb", carrier.extension || type.extension || "bin");
            setStegoDownload(new Blob([outputBytes], { type: carrier.mime || stegoDetectedMime(type, file) }), filename);
            stegoEmbedResult.value = stegoEmbedResultObject({
                file,
                type,
                mode,
                payload,
                packet,
                filename,
                capacityBytes,
                extraLines: carrier.detail || []
            });
            return;
        }

        if (mode === "png-itxt") {
            if (type.label !== "PNG") throw new Error("PNG iTXt solo se puede escribir sobre ficheros PNG validos.");
            const parsed = parsePngChunks(carrierBytes);
            const iend = parsed.chunks.find(chunk => chunk.type === "IEND");
            if (!iend) throw new Error("No se encontro IEND; no es seguro insertar iTXt.");
            const markerText = `${STEGO_PACKET_B64_MARKER}${bytesToBase64(packet)}`;
            const chunk = makePngItxtChunk("FeanorStego", markerText, "und");
            const outputBytes = concatBytes(carrierBytes.slice(0, iend.offset), chunk, carrierBytes.slice(iend.offset));
            const filename = stegoOutputName(file, "feanor-itxt", "png");
            setStegoDownload(new Blob([outputBytes], { type: "image/png" }), filename);
            stegoEmbedResult.value = stegoEmbedResultObject({
                file,
                type,
                mode,
                payload,
                packet,
                filename,
                extraLines: ["Se inserto un chunk iTXt FeanorStego antes de IEND.", "No se tocaron IDAT ni pixeles."]
            });
            return;
        }

        if (mode === "zip-bundle") {
            const header = {
                ...baseHeader,
                storage: "zip-bundle",
                payloadSize: payload.bytes.length,
                crc32: crc32Hex(payload.bytes)
            };
            const bundle = await buildStegoZipBundle(file, carrierBytes, packet, header, payload.bytes);
            const filename = stegoOutputName(file, "feanor-bundle", "zip");
            setStegoDownload(bundle.blob, filename);
            stegoEmbedResult.value = stegoEmbedResultObject({
                file,
                type,
                mode,
                payload,
                packet,
                filename,
                extraLines: [`Cover: ${bundle.manifest.coverPath}.`, `Payload: ${bundle.manifest.payloadPath}.`, "Incluye manifest JSON y paquete binario Feanor."]
            });
            return;
        }

        const outputBytes = concatBytes(carrierBytes, packet);
        const extension = file.name?.split(".").pop()?.toLowerCase() || type.extension || "bin";
        const filename = stegoOutputName(file, "feanor-footer", extension);
        setStegoDownload(new Blob([outputBytes], { type: stegoDetectedMime(type, file) }), filename);
        stegoEmbedResult.value = stegoEmbedResultObject({
            file,
            type,
            mode: "append",
            payload,
            packet,
            filename,
            extraLines: ["El paquete se anadio al final del fichero.", "Algunos parsers toleran bytes anexos; otros los eliminaran al reexportar."]
        });
    } catch (error) {
        stegoEmbedResult.value = buildErrorResult("STEGO_EMBED_FAILED", "No se pudo incrustar el payload", error.message);
    }
}

function buildStegoExtractResult(file, type, extracted) {
    const header = extracted.header || {};
    const payloadName = header.payloadName || "feanor-payload.bin";
    const payloadMime = header.payloadMime || "application/octet-stream";
    const textLike = ["text", "json"].includes(header.source) || (extracted.payloadText && extracted.payloadText.length < 20000 && !/^[A-Za-z0-9+/=\s]+$/.test(extracted.payloadText));
    setStegoExtractDownload(new Blob([extracted.payloadBytes], { type: payloadMime }), payloadName);

    return {
        primaryValue: extracted.payloadText,
        verdictTone: extracted.checksumOk ? "verdict-success" : "verdict-warning",
        verdictTitle: extracted.checksumOk ? "Payload recuperado" : "Payload recuperado con CRC dudoso",
        verdictBody: `${extracted.storageNote || "Se encontro un paquete Feanor."} ${extracted.checksumOk ? "El CRC32 del payload coincide." : "El CRC32 no coincide o no estaba declarado."}`,
        summaryCards: [
            { label: "Fichero", value: type.label, tone: "tone-neutral", note: file.name || "entrada" },
            { label: "Origen", value: extracted.storage || "desconocido", tone: "tone-success", note: "Metodo detectado" },
            { label: "Payload", value: formatBytesSize(extracted.payloadBytes.length), tone: "tone-success", note: header.source || "binario" },
            { label: "Nombre", value: payloadName, tone: "tone-neutral", note: payloadMime }
        ],
        signalCards: [
            { label: "Version", value: String(header.version || 1), tone: "tone-neutral", note: "Formato Feanor" },
            { label: "Encoding", value: header.encoding || "binary", tone: "tone-neutral", note: "Payload" },
            { label: "CRC32", value: extracted.checksum || "N/D", tone: extracted.checksumOk ? "tone-success" : "tone-warning", note: extracted.checksumOk ? "OK" : "Revisar" },
            { label: "Descarga", value: "Lista", tone: "tone-success", note: payloadName }
        ],
        panels: [
            {
                title: "Resultado",
                badge: textLike ? "texto" : "base64",
                content: textLike ? extracted.payloadText : bytesToBase64(extracted.payloadBytes),
                copyValue: textLike ? extracted.payloadText : bytesToBase64(extracted.payloadBytes)
            },
            {
                title: "Cabecera",
                badge: "meta",
                content: safeJson(header),
                copyValue: safeJson(header)
            },
            {
                title: "Payload Hex",
                badge: "hex",
                content: bytesToHex(extracted.payloadBytes),
                copyValue: bytesToHex(extracted.payloadBytes)
            }
        ]
    };
}

async function extractStegoPayload() {
    if (!stegoExtractFile.value) {
        stegoExtractResult.value = buildErrorResult("STEGO_EXTRACT_EMPTY", "Falta fichero", "Selecciona un fichero para buscar paquetes Feanor.");
        return;
    }

    try {
        clearStegoExtractDownload();
        const file = stegoExtractFile.value;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const type = detectFileType(bytes, file);
        let extracted = extractUniversalStegoPacketFromRawBytes(bytes)
            || extractPngItxtStegoPacket(bytes)
            || await extractStegoZipBundle(bytes);

        if (!extracted && type.family === "image" && type.label !== "SVG" && type.label !== "TIFF") {
            try {
                const { imageData } = await imageFileToCanvas(file);
                extracted = readStegoPacketFromImageData(imageData);
            } catch {
                extracted = null;
            }
        }

        if (!extracted) {
            try {
                extracted = extractDirectLsbStegoPacket(bytes, type);
            } catch {
                extracted = null;
            }
        }

        if (!extracted) {
            throw new Error("No se encontro footer Feanor V2, PNG iTXt, bundle ZIP, LSB de imagen ni LSB directo BMP/WAV/AU.");
        }

        stegoExtractResult.value = buildStegoExtractResult(file, type, extracted);
    } catch (error) {
        stegoExtractResult.value = buildErrorResult("STEGO_EXTRACT_FAILED", "No se encontraron datos extraibles", error.message);
    }
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
    background: #0b0a08;
    color: #d8cfbf;
    font-family: 'Inter', sans-serif;
}

.feanor-page :deep(.card),
.feanor-page :deep(.list-group-item),
.feanor-page :deep(.dropdown-menu),
.feanor-page :deep(.modal-content),
.feanor-page :deep(.table) {
    background-color: #17140f;
    border-color: #302817;
    color: #d8cfbf;
}

.feanor-page :deep(.btn-primary),
.feanor-page :deep(.btn-info) {
    background-color: #5b4a2e;
    border-color: #725d39;
    color: #f7f1e4;
}

.feanor-page :deep(.btn-primary:hover),
.feanor-page :deep(.btn-primary:focus),
.feanor-page :deep(.btn-info:hover),
.feanor-page :deep(.btn-info:focus) {
    background-color: #725d39;
    border-color: #d6a756;
    color: #fff6dc;
    box-shadow: 0 0 0 0.18rem rgba(214, 167, 86, 0.18);
}

.feanor-page :deep(.alert-info),
.feanor-page :deep(.bg-primary),
.feanor-page :deep(.bg-info) {
    background-color: #211b12 !important;
    border-color: #5b4a2e !important;
    color: #eadfcb !important;
}

.feanor-page :deep(.text-primary),
.feanor-page :deep(.text-info),
.feanor-page :deep(a.text-primary),
.feanor-page :deep(a.text-info) {
    color: #d6a756 !important;
}

.feanor-page :deep(.border-primary),
.feanor-page :deep(.border-info) {
    border-color: #725d39 !important;
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

.feanor-page--tool .container.py-5 {
    padding-top: calc(var(--main-header-height) + var(--secondary-header-height) + 24px) !important;
}

.section-box {
    background: #17140f;
    border: 1px solid #302817;
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
    order: 20;
}

.symmetric-module {
    order: 24;
}

.asymmetric-module {
    order: 28;
}

.signature-module {
    order: 29;
}

.aead-module {
    order: 25;
}

.ecdh-module {
    order: 30;
}

.kdf-module {
    order: 21;
}

.certificate-module {
    order: 32;
}

.key-converter-module {
    order: 31;
}

.jwt-module {
    order: 27;
}

.transform-module {
    order: 8;
}

.byte-inspector-module {
    order: 9;
}

.json-module {
    order: 11;
}

.json-sign-module {
    order: 23;
}

.secret-module {
    order: 18;
}

.entropy-module {
    order: 19;
}

.otp-module {
    order: 26;
}

.timing-module {
    order: 22;
}

.regex-module {
    order: 10;
}

.copy-toast {
    order: 33;
}

.caesar-module {
    order: 1;
}

.atbash-module {
    order: 2;
}

.boolean-ops-module {
    order: 3;
}

.vigenere-module {
    order: 4;
}

.affine-module {
    order: 5;
}

.rail-fence-module {
    order: 6;
}

.modular-module {
    order: 7;
}

.stego-analyze-module {
    order: 12;
}

.exif-module {
    order: 13;
}

.metadata-editor-module {
    order: 14;
}

.stego-embed-module {
    order: 15;
}

.stego-extract-module {
    order: 16;
}

.steghide-suite-module {
    order: 17;
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
    color: #a79c88;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.section-name,
.module-title {
    margin: 0;
    color: #f7f1e4;
    font-size: 2rem;
    font-weight: 700;
}

.section-copy,
.module-copy {
    margin: 0;
    color: #d8cfbf;
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
    background: linear-gradient(180deg, rgba(33, 27, 18, 0.94), rgba(8, 7, 5, 0.96));
    border: 1px solid rgba(214, 167, 86, 0.24);
}

.intro-emblem img {
    width: 112px;
    height: 112px;
    object-fit: contain;
}

.intro-emblem span {
    color: #f7f1e4;
    font-size: 0.95rem;
    font-weight: 700;
}

.intro-emblem small {
    color: #a79c88;
    line-height: 1.6;
}

.utilities-summary {
    order: 1;
}

.utility-group-list {
    display: grid;
    gap: 18px;
}

.utility-group {
    display: grid;
    gap: 14px;
    min-width: 0;
}

.utility-group-head {
    display: grid;
    gap: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid #302817;
}

.utility-group-head span {
    color: #f7f1e4;
    font-size: 1.02rem;
    font-weight: 700;
}

.utility-group-head p {
    margin: 0;
    color: #a79c88;
    line-height: 1.6;
}

.utility-link-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.utility-link {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 7px 10px;
    align-items: center;
    min-width: 0;
    padding: 14px;
    border: 1px solid #2b2418;
    border-radius: 8px;
    background: #181510;
    color: #d8cfbf;
    text-decoration: none;
    transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
}

.utility-link:hover,
.utility-link:focus {
    background: #211b12;
    border-color: rgba(214, 167, 86, 0.48);
    color: #f7f1e4;
    transform: translateY(-1px);
}

.utility-link strong {
    color: #f7f1e4;
    font-size: 0.98rem;
    font-weight: 700;
}

.utility-link p {
    grid-column: 1 / -1;
    margin: 0;
    color: #a79c88;
    line-height: 1.55;
}

.tool-card,
.metric-card,
.signal-card {
    background: #181510;
    border: 1px solid #2b2418;
    border-radius: 8px;
}

.metric-card label,
.signal-card label {
    color: #f7f1e4;
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
    color: #d8cfbf;
    line-height: 1.55;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 6px);
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.info-popover strong {
    display: block;
    margin-bottom: 6px;
    color: #f7f1e4;
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
    color: #f7f1e4;
    font-size: 1.02rem;
    font-weight: 700;
}

.guide-steps {
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 1.25rem;
    color: #d8cfbf;
    line-height: 1.65;
}

.guide-steps li::marker {
    color: #d6a756;
    font-weight: 800;
}

.guide-steps strong,
.guide-note strong {
    color: #f7f1e4;
}

.guide-note {
    display: grid;
    gap: 6px;
    padding: 12px;
    border: 1px solid rgba(214, 167, 86, 0.18);
    border-radius: 8px;
    background: rgba(18, 15, 11, 0.72);
    color: #a79c88;
    line-height: 1.6;
}

.field-label {
    display: inline-block;
    margin-bottom: 8px;
    color: #eadfcb;
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

.mode-segment {
    display: inline-grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px;
    width: min(420px, 100%);
    padding: 4px;
    margin: 0 0 16px;
    border: 1px solid #5b4a2e;
    border-radius: 8px;
    background: #100d09;
}

.mode-segment button {
    min-height: 38px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #a79c88;
    font-weight: 700;
}

.mode-segment button:hover,
.mode-segment button:focus {
    color: #f7f1e4;
}

.mode-segment button.active {
    background: #5b4a2e;
    color: #f7f1e4;
}

.base64-category-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin: 0 0 16px;
}

.category-chip {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 4px 8px;
    align-items: center;
    min-height: 86px;
    padding: 12px;
    border: 1px solid #2b2418;
    border-radius: 8px;
    background: #181510;
    color: #d8cfbf;
    text-align: left;
}

.category-chip:hover,
.category-chip:focus,
.category-chip.active {
    border-color: rgba(214, 167, 86, 0.5);
    background: #211b12;
    color: #f7f1e4;
}

.category-chip span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    padding: 4px 8px;
    border: 1px solid #5b4a2e;
    border-radius: 999px;
    color: #d6a756;
    font-size: 0.72rem;
    font-weight: 800;
}

.category-chip strong {
    min-width: 0;
    color: #f7f1e4;
    font-size: 0.92rem;
}

.category-chip small {
    grid-column: 1 / -1;
    color: #a79c88;
    line-height: 1.45;
}

.transform-preview-panel {
    display: grid;
    gap: 12px;
    margin: 16px 0 18px;
    padding: 16px;
    border: 1px solid #2b2418;
    border-radius: 8px;
    background: #181510;
}

.transform-preview-panel img,
.transform-preview-panel video,
.transform-preview-panel audio,
.transform-preview-panel iframe {
    width: 100%;
    max-height: 360px;
    border: 1px solid #302817;
    border-radius: 8px;
    background: #080705;
}

.transform-preview-panel img {
    object-fit: contain;
}

.transform-preview-panel iframe {
    min-height: 360px;
}

.transform-preview-panel a {
    color: #d6a756;
    text-decoration: none;
    font-weight: 700;
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
    color: #f7f1e4;
    font-size: 1.08rem;
    font-weight: 700;
}

.transfer-panel-head p {
    margin: 0;
    color: #a79c88;
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
    color: #f7f1e4;
    font-size: 0.86rem;
}

.flow-note span {
    color: #a79c88;
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
    color: #f7f1e4;
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
    background: #2b2418;
    border: 1px solid #5b4a2e;
    color: #f7f1e4 !important;
    caret-color: #f7f1e4;
}

.input-dark::placeholder {
    color: #a79c88;
}

.input-dark:focus {
    background: #2b2418;
    border-color: #d6a756;
    box-shadow: 0 0 0 0.2rem rgba(214, 167, 86, 0.18);
    color: #f7f1e4;
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
    color: #a79c88;
    line-height: 1.6;
}

.metadata-format-strip {
    display: grid;
    grid-template-columns: auto minmax(0, 0.65fr) minmax(0, 1.35fr);
    align-items: center;
    gap: 12px;
    margin: 14px 0 4px;
    padding: 12px 14px;
    border: 1px solid rgba(214, 167, 86, 0.2);
    border-radius: 8px;
    background: rgba(24, 21, 16, 0.72);
}

.metadata-format-strip strong {
    color: #f7f1e4;
    font-size: 0.94rem;
}

.exif-format-strip strong,
.steghide-format-strip strong {
    font-family: "Consolas", "Courier New", monospace;
    word-break: break-word;
}

.metadata-format-strip p {
    margin: 0;
    color: #a79c88;
    line-height: 1.5;
}

.inline-code {
    background: rgba(16, 13, 9, 0.78);
    border: 1px solid #5b4a2e;
    border-radius: 6px;
    color: #e7dcc8;
    padding: 2px 6px;
}

.btn-main,
.btn-subtle,
.btn-quiet {
    border-radius: 6px;
    font-weight: 600;
    padding: 9px 14px;
    min-width: 0;
    white-space: normal;
}

.btn-main {
    background: #5b4a2e;
    border: 1px solid #725d39;
    color: #f7f1e4;
}

.btn-main:hover,
.btn-main:focus {
    background: #725d39;
    color: #f7f1e4;
}

.btn-subtle {
    background: #17140f;
    border: 1px solid #5b4a2e;
    color: #d8cfbf;
}

.btn-subtle:hover,
.btn-subtle:focus {
    background: #302817;
    color: #f7f1e4;
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
    border: 1px solid #5b4a2e;
    color: #d8cfbf;
    font-size: 0.8rem;
}

.btn-quiet:hover,
.btn-quiet:focus {
    background: rgba(91, 74, 46, 0.4);
    color: #f7f1e4;
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
    color: #f7f1e4;
    font-size: 1.05rem;
    font-weight: 700;
    word-break: break-word;
}

.metric-card small,
.signal-card small {
    color: #a79c88;
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
    background: rgba(16, 13, 9, 0.9);
    color: #e7dcc8;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.verdict-body strong {
    display: block;
    margin-bottom: 4px;
    color: #f7f1e4;
}

.verdict-body p {
    margin: 0;
    color: #d8cfbf;
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
    color: #f7f1e4;
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
    border: 1px solid #5b4a2e;
    background: rgba(16, 13, 9, 0.78);
    color: #d8cfbf;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
}

.output-box {
    background: #080705;
    border: 1px solid #302817;
    border-radius: 8px;
    padding: 14px;
    max-height: 420px;
    overflow: auto;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
}

.result-pre {
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: 'Courier New', monospace;
    color: #d8cfbf;
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
    color: #eadfcb;
    font-size: 0.9rem;
}

.toggle-line input {
    accent-color: #a79c88;
}

.copy-toast {
    position: sticky;
    bottom: 16px;
    margin-left: auto;
    width: fit-content;
    background: rgba(16, 13, 9, 0.94);
    border: 1px solid #5b4a2e;
    border-radius: 999px;
    color: #e7dcc8;
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
    color: #d8cfbf !important;
}

@media (max-width: 1199px) {
    .intro-layout {
        grid-template-columns: 1fr;
    }

    .control-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .base64-category-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .asymmetric-transfer-grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .utility-link-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767px) {
    .section-box {
        padding: 16px;
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
        width: min(320px, calc(100vw - 28px));
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

    .base64-category-grid {
        grid-template-columns: 1fr;
    }

    .metadata-format-strip {
        grid-template-columns: 1fr;
        align-items: flex-start;
    }

    .mode-segment {
        width: 100%;
    }

    .inline-actions {
        flex-direction: column;
        align-items: stretch;
    }

    .inline-actions .btn,
    .module-actions .btn,
    .guide-button,
    .info-button {
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

    .transfer-panel,
    .asymmetric-guide-panel,
    .key-exchange-box {
        padding: 14px;
    }

    .copy-toast {
        width: 100%;
        text-align: center;
        border-radius: 8px;
    }

    .result-pre,
    .mono-textarea,
    .mono-input {
        font-size: 0.78rem;
    }
}

@media (max-width: 420px) {
    .section-box {
        padding: 14px;
        border-radius: 8px;
    }

    .section-kicker {
        letter-spacing: 0.08em;
    }
}
</style>
