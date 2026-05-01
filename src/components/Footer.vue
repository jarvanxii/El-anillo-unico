<template>
    <footer class="main-footer">
        <div class="footer-gold-line"></div>
        <div class="footer-container">
            <div class="footer-brand">
                <div class="brand-logo" @click="$router.push('/')">
                    <img src="/anillo.ico" alt="logo" />
                    <span>El Anillo Único</span>
                </div>
                <p class="brand-description">
                    Archivo digital inspirado en la Tierra Media. Un portal donde convergen
                    ciberseguridad, privacidad, herramientas, inteligencia artificial y
                    conocimiento moderno bajo una estética legendaria.
                </p>
                <div class="brand-quote">
                    “Un sitio para gobernarlos a todos.”
                </div>
            </div>
            <div class="footer-links-area">
                <div class="footer-column">
                    <h3>Ciberseguridad</h3>
                    <a @click="$router.push('/el-baston-de-saruman')">
                        Conceptos de Ciberseguridad
                    </a>
                    <a @click="$router.push('/el-hacha-de-gimli')">
                        Red Team
                    </a>
                    <a @click="$router.push('/el-escudo-de-boromir')">
                        Blue Team
                    </a>
                    <a @click="$router.push('/la-capa-de-los-nazgul')">
                        Privacidad y anonimato
                    </a>
                    <a @click="$router.push('/la-mano-de-sauron')">
                        Darkweb
                    </a>
                    <a @click="$router.push('/la-piedra-palantir')">
                        Inteligencia Artificial
                    </a>
                    <a @click="$router.push('/la-biblioteca-de-rivendel')">
                        Certificaciones
                    </a>
                </div>
                <div class="footer-column">
                    <h3>Herramientas</h3>
                    <a @click="$router.push('/el-vuelo-de-thorondor')">
                        Monitorización SIEM
                    </a>
                    <a @click="$router.push('/el-codice-de-feanor')">
                        Laboratorio Criptográfico
                    </a>
                    <a @click="$router.push('/la-guardia-de-faramir')">
                        Comprobación de URLs
                    </a>
                    <a @click="$router.push('/el-espejo-de-galadriel')">
                        Filtraciones
                    </a>
                    <a @click="$router.push('/el-antiguo-mapa-de-bilbo')">
                        Tests
                    </a>
                    <a @click="$router.push('/la-identidad-de-gollum')">
                        WHOAMI
                    </a>
                    <a @click="$router.push('/la-forja-de-celebrimbor')">
                        Herramientas Externas
                    </a>
                </div>
                <div class="footer-column">
                    <h3>Comunidad</h3>
                    <a @click="$router.push('/el-concilio-de-elrond')">
                        Chat
                    </a>
                    <a href="http://192.168.0.254/#/" target="_blank">
                        Películas, Series Y Juegos
                    </a>
                    <a @click="$router.push('/la-jarra-de-pippin')">
                        Humor
                    </a>
                    <a href="https://www.youtube.com/@TomBombadil-SONGS" target="_blank">
                        Música
                    </a>
                </div>
                <div class="footer-column">
                    <h3>Otros</h3>
                    <a @click="$router.push('/los-champiñones-de-radagast')">
                        Rendimiento Cognitivo
                    </a>
                    <a @click="$router.push('/el-libro-rojo-de-la-frontera-del-oeste')">
                        FAQ
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 El Anillo Único</span>
            <span class="dot">✦</span>
            <span>Forjado entre sombras y conocimiento</span>
            <span class="dot">✦</span>
            <span>Tierra Media Digital</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: "MainFooter"
};
</script>

<style scoped>
.main-footer {
    background:
        linear-gradient(180deg, #15120e 0%, #0c0b09 52%, #070707 100%);
    border-top: 1px solid rgba(212, 175, 55, 0.22);
    box-shadow:
        0 -10px 35px rgba(0, 0, 0, 0.65),
        inset 0 1px 0 rgba(255, 220, 120, 0.04);
}

.footer-gold-line {
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,
            transparent,
            rgba(212, 175, 55, 0.65),
            rgba(255, 215, 0, 1),
            rgba(212, 175, 55, 0.65),
            transparent);
}

.footer-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 48px 28px 34px;
    display: grid;
    grid-template-columns: 42% 58%;
}

/* IZQUIERDA */
.footer-brand {
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    cursor: pointer;
    color: #d4af37;
    font-family: "Cinzel Decorative", serif;
    font-size: 19px;
    transition: all 0.3s ease;
}

.brand-logo:hover {
    color: #f0cf72;
    text-shadow: 0 0 12px rgba(212, 175, 55, 0.35);
}

.brand-logo img {
    width: 30px;
    filter:
        drop-shadow(0 0 6px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.15));
}

.brand-description {
    margin-top: 18px;
    max-width: 470px;
    color: #b9af94;
    font-size: 14px;
    line-height: 1.8;
    font-family: "Cinzel", serif;
}

.brand-quote {
    margin-top: 18px;
    color: #8f7a48;
    font-size: 15px;
    font-style: italic;
}

/* DERECHA */
.footer-links-area {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-left: 1px solid rgba(212, 175, 55, 0.12);
}

.footer-column {
    padding: 0 22px;
    border-right: 1px solid rgba(212, 175, 55, 0.12);
    display: flex;
    flex-direction: column;
}

.footer-column:last-child {
    border-right: none;
}

.footer-column h3 {
    margin: 0 0 18px;
    color: #f3cf75;
    font-size: 15px;
    font-family: "Cinzel", serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
}

/* LINKS — estilo limpio y profesional */
.footer-column a {
    color: #d8cfb3;
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 12px;
    cursor: pointer;
    text-align: center;
    transition: all 0.25s ease;
    opacity: 0.85;
}

/* Hover sutil */
.footer-column a:hover {
    color: #f5d67a;
    opacity: 1;
    transform: translateX(3px);
    text-shadow: 0 0 6px rgba(212, 175, 55, 0.25);
}

/* INFERIOR */
.footer-bottom {
    border-top: 1px solid rgba(212, 175, 55, 0.10);
    padding: 18px 22px 24px;
    text-align: center;
    color: #8f866f;
    font-size: 13px;
    font-family: "Cinzel", serif;
    letter-spacing: 0.4px;
}

.dot {
    margin: 0 10px;
    color: #d4af37;
}

/* RESPONSIVE */
@media (max-width: 1250px) {
    .footer-container {
        grid-template-columns: 1fr;
        gap: 35px;
    }

    .footer-brand {
        padding-right: 0;
        text-align: center;
        align-items: center;
    }

    .footer-links-area {
        border-left: none;
    }
}

@media (max-width: 900px) {
    .footer-links-area {
        grid-template-columns: repeat(2, 1fr);
    }

    .footer-column:nth-child(2) {
        border-right: none;
    }
}

@media (max-width: 600px) {
    .footer-links-area {
        grid-template-columns: 1fr;
    }

    .footer-column {
        border-right: none;
        border-bottom: 1px solid rgba(212, 175, 55, 0.12);
        padding: 18px 0;
    }

    .footer-column:last-child {
        border-bottom: none;
    }

    .footer-bottom {
        line-height: 1.8;
    }

    .dot {
        display: block;
        margin: 6px 0;
    }
}
</style>