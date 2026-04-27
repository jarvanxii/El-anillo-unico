<template>
    <div class="tools-page text-light">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-feanor.png" alt="El códice de Fëanor" />
        </section>
        <div class="container py-5">
            <h3 class="section-title">🔐 Criptografía</h3>
            <div class="tool-card card mb-4 p-4">
                <h4>Generador de Hashes</h4>
                <p class="tool-desc">Genera hashes seguros directamente en el navegador.</p>
                <textarea v-model="hashInput" class="form-control input-dark mb-3" rows="3"
                    placeholder="Ejemplo: contraseña123"></textarea>
                <select v-model="hashType" class="form-select input-dark mb-3">
                    <option value="PBKDF2">PBKDF2</option>
                    <option value="SHA512">SHA-512</option>
                    <option value="SHA256">SHA-256</option>
                    <option value="SHA3">SHA-3</option>
                    <option value="SHA1">SHA-1</option>
                    <option value="MD5">MD5</option>
                </select>
                <button class="btn btn-main" @click="generateHash">Generar Hash</button>
                <div class="output-box mt-3">{{ hashOutput || "Aquí aparecerá el hash..." }}</div>
            </div>
            <div class="tool-card card mb-4 p-4">
                <h4>Cifrado / Descifrado</h4>
                <input v-model="aesKey" class="form-control input-dark mb-3"
                    placeholder="Ejemplo: claveSecreta123">
                <select v-model="cipherType" class="form-select input-dark mb-3">
                    <option value="AES">AES</option>
                    <option value="DES">DES</option>
                    <option value="TripleDES">Triple DES</option>
                    <option value="RC4">RC4</option>
                    <option value="Rabbit">Rabbit</option>
                </select>
                <textarea v-model="aesInput" class="form-control input-dark mb-3" rows="3"
                    placeholder="Ejemplo: Hola mundo secreto"></textarea>
                <div class="d-flex gap-2">
                    <button class="btn btn-main" @click="encryptAES">Cifrar</button>
                    <button class="btn btn-secondary-dark" @click="decryptAES">Descifrar</button>
                </div>
                <div class="output-box mt-3">{{ aesOutput || "Resultado del cifrado/descifrado..." }}</div>
            </div>
            <div class="tool-card card mb-4 p-4">
                <h4>Visor de JWT</h4>
                <textarea v-model="jwtInput" class="form-control input-dark mb-3" rows="3"
                    placeholder="Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
                <button class="btn btn-main" @click="decodeJWT">Decodificar</button>
                <div class="output-box mt-3">{{ jwtOutput || "Payload decodificado aparecerá aquí..." }}</div>
            </div>
            <h3 class="section-title mt-5">🧰 Utilidades</h3>
            <div class="tool-card card mb-4 p-4">
                <h4>Base64</h4>
                <textarea v-model="base64Input" class="form-control input-dark mb-3"
                    placeholder="Ejemplo: Hola mundo"></textarea>
                <div class="d-flex gap-2">
                    <button class="btn btn-main" @click="encodeBase64">Codificar</button>
                    <button class="btn btn-secondary-dark" @click="decodeBase64">Decodificar</button>
                </div>
                <div class="output-box mt-3">{{ base64Output || "Resultado Base64..." }}</div>
            </div>
            <div class="tool-card card mb-4 p-4">
                <h4>Formateador JSON</h4>
                <textarea v-model="jsonInput" class="form-control input-dark mb-3" rows="5"
                    placeholder='Ejemplo: {"nombre":"Juan","edad":30}'></textarea>
                <button class="btn btn-main" @click="formatJSON">Formatear</button>
                <div class="output-box mt-3">{{ jsonOutput || "JSON formateado..." }}</div>
            </div>
            <div class="tool-card card mb-4 p-4">
                <h4>UUID</h4>
                <button class="btn btn-main" @click="generateUUID">Generar</button>
                <div class="output-box mt-3">{{ uuidOutput || "UUID generado..." }}</div>
            </div>
            <div class="tool-card card mb-4 p-4">
                <h4>Regex Tester</h4>
                <input v-model="regexPattern" class="form-control input-dark mb-3"
                    placeholder="Ejemplo: \\d+">
                <textarea v-model="regexTestText" class="form-control input-dark mb-3"
                    placeholder="Ejemplo: Tengo 2 perros y 3 gatos"></textarea>
                <button class="btn btn-main" @click="testRegex">Probar</button>
                <div class="output-box mt-3">{{ regexOutput || "Coincidencias aparecerán aquí..." }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

export default {
    data() {
        return {
            hashInput: "",
            hashType: "SHA256",
            hashOutput: "",
            aesInput: "",
            aesKey: "",
            aesOutput: "",
            cipherType: "AES",
            jwtInput: "",
            jwtOutput: "",
            base64Input: "",
            base64Output: "",
            jsonInput: "",
            jsonOutput: "",
            uuidOutput: "",
            regexPattern: "",
            regexTestText: "",
            regexOutput: ""
        };
    },

    methods: {
        generateHash() {
            if (!this.hashInput) return;
            if (this.hashType === "PBKDF2") {
                const salt = CryptoJS.lib.WordArray.random(16);
                const key = CryptoJS.PBKDF2(this.hashInput, salt, {
                    keySize: 256 / 32,
                    iterations: 1000
                });
                this.hashOutput = `Hash: ${key}\nSalt: ${salt}`;
                return;
            }
            const map = {
                SHA256: CryptoJS.SHA256,
                SHA1: CryptoJS.SHA1,
                MD5: CryptoJS.MD5,
                SHA512: CryptoJS.SHA512,
                SHA3: CryptoJS.SHA3
            };
            this.hashOutput = map[this.hashType](this.hashInput).toString();
        },

        encryptAES() {
            const map = {
                AES: CryptoJS.AES,
                DES: CryptoJS.DES,
                TripleDES: CryptoJS.TripleDES,
                RC4: CryptoJS.RC4,
                Rabbit: CryptoJS.Rabbit
            };
            this.aesOutput = map[this.cipherType].encrypt(this.aesInput, this.aesKey).toString();
        },

        decryptAES() {
            const map = {
                AES: CryptoJS.AES,
                DES: CryptoJS.DES,
                TripleDES: CryptoJS.TripleDES,
                RC4: CryptoJS.RC4,
                Rabbit: CryptoJS.Rabbit
            };
            const bytes = map[this.cipherType].decrypt(this.aesInput, this.aesKey);
            this.aesOutput = bytes.toString(CryptoJS.enc.Utf8) || "Error";
        },

        decodeJWT() {
            try {
                this.jwtOutput = JSON.stringify(jwtDecode(this.jwtInput), null, 2);
            } catch {
                this.jwtOutput = "JWT inválido";
            }
        },

        encodeBase64() {
            this.base64Output = btoa(this.base64Input);
        },

        decodeBase64() {
            try {
                this.base64Output = atob(this.base64Input);
            } catch {
                this.base64Output = "Error";
            }
        },

        formatJSON() {
            try {
                this.jsonOutput = JSON.stringify(JSON.parse(this.jsonInput), null, 2);
            } catch {
                this.jsonOutput = "JSON inválido";
            }
        },

        generateUUID() {
            this.uuidOutput = crypto.randomUUID();
        },

        testRegex() {
            try {
                const regex = new RegExp(this.regexPattern, "g");
                const matches = [...this.regexTestText.matchAll(regex)];
                this.regexOutput = matches.length
                    ? matches.map(m => m[0]).join(", ")
                    : "Sin coincidencias";
            } catch {
                this.regexOutput = "Regex inválida";
            }
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.tools-page {
    background: #0b0f17;
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
}

.tool-card {
    background: #111827;
    border: 1px solid #1f2937;
    border-radius: 10px;
}

.tool-card h3, h4 {
    color: #d1d5db;
    font-weight: 500;
}

.tool-desc {
    color: #9ca3af;
}

.input-dark {
    background: #1f2937;
    border: 1px solid #374151;
    color: #f1f5f9 !important;
    caret-color: #f1f5f9;
}

.input-dark::placeholder {
    color: #9ca3af;
}

.btn-main {
    width: 15%;
    background: #334155;
    color: #f1f5f9;
    border: 1px solid #475569;
    padding: 6px 14px;
    border-radius: 6px;
}

.btn-main:hover {
    background: #475569;
}

.btn-secondary-dark {
    width: 15%;
    background: #1e293b;
    color: #cbd5f5;
    border: 1px solid #475569;
    padding: 6px 14px;
    border-radius: 6px;
}

.btn-secondary-dark:hover {
    background: #334155;
}

.output-box {
    background: #020617;
    border: 1px solid #1e293b;
    padding: 12px;
    border-radius: 8px;
    color: #9495a1;
}
</style>