<template>
    <div class="home">
        <header class="hero-section">
            <div class="rune-bar">᚛ · · · ᚜</div>
            <div class="ring-wrapper">
                <div class="ring-glow"></div>
                <img src="@/assets/anillo.png" alt="Anillo Único" class="ring-img" />
            </div>
            <h1 class="main-title">El Anillo Único</h1>
            <div class="title-underline"></div>
            <p class="quote">
                <span class="quote-mark">"</span>
                Un sitio para gobernarlos a todos.
                <span class="quote-mark">"</span>
            </p>
        </header>
        <main>
            <p class="section-label">· Elige tu camino ·</p>
            <div class="cards-grid big-cards">
                <router-link :to="{ name: 'el-baston-de-saruman' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/saruman.png" class="option-img" />
                    </div>
                    <h3>El bastón de Saruman</h3>
                    <span class="option-tag">Conceptos de Ciberseguridad</span>
                    <div class="option-info">
                        <p class="info-desc">Redes, protocolos y conceptos de ciberseguridad.</p>
                        <p class="info-quote">"Conocimiento, gobierno, orden."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-hacha-de-gimli' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/gimli.png" class="option-img" />
                    </div>
                    <h3>El hacha de Gimli</h3>
                    <span class="option-tag">Red Team</span>
                    <div class="option-info">
                        <p class="info-desc">Ataques, herramientas ofensivas y técnicas de hacking.</p>
                        <p class="info-quote">"Baruk Khazâd!"</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-escudo-de-boromir' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/boromir.png" class="option-img" />
                    </div>
                    <h3>El escudo de Boromir</h3>
                    <span class="option-tag">Blue Team</span>
                    <div class="option-info">
                        <p class="info-desc">Defensa digital, monitorización y protección de sistemas.</p>
                        <p class="info-quote">"Esta ciudad ha resistido durante eras."</p>
                    </div>
                </router-link>
                <a href="http://lapipadegandalf.ddns.net:8080" class="option-card card-large" target="_blank">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/gandalf.png" class="option-img" />
                    </div>
                    <h3>La pipa de Gandalf</h3>
                    <span class="option-tag">Ocio</span>
                    <div class="option-info">
                        <p class="info-desc">Plataforma privada para la descarga y reproducción de contenido multimedia.
                        </p>
                        <p class="info-quote">"Tu amor por la hoja de los medianos ha ralentizado claramente tu mente."
                        </p>
                    </div>
                </a>
                <router-link :to="{ name: 'la-capa-de-los-nazgul' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/nazgul.png" class="option-img" />
                    </div>
                    <h3>La capa de los Nazgûl</h3>
                    <span class="option-tag">Privacidad</span>
                    <div class="option-info">
                        <p class="info-desc">Anonimato, privacidad y protección en internet.</p>
                        <p class="info-quote">"El ojo siempre vigila."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-jarra-de-pippin' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/pippin.png" class="option-img" />
                    </div>
                    <h3>La jarra de Pippin</h3>
                    <span class="option-tag">Memes</span>
                    <div class="option-info">
                        <p class="info-desc">Humor, memes y contenido ligero.</p>
                        <p class="info-quote">"¿Y el segundo desayuno?"</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-guardia-de-faramir' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/faramir.png" class="option-img" />
                    </div>
                    <h3>La guardia de Faramir</h3>
                    <span class="option-tag">URLs seguras y malignas</span>
                    <div class="option-info">
                        <p class="info-desc">Comprobación de la hostilidad y seguridad de URLs</p>
                        <p class="info-quote">"Mucho daño puede venir de manos bien intencionadas."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-piedra-palantir' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/palantir.png" class="option-img" />
                    </div>
                    <h3>La piedra Palantír</h3>
                    <span class="option-tag">Inteligencia Artificial</span>
                    <div class="option-info">
                        <p class="info-desc">Conceptos de inteligencia artificial y avances tecnológicos.</p>
                        <p class="info-quote">"No todas las visiones son ciertas."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-concilio-de-elrond' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/elrond.png" class="option-img" />
                    </div>
                    <h3>El concilio de Elrond</h3>
                    <span class="option-tag">Chat</span>
                    <div class="option-info">
                        <p class="info-desc">Un lugar protegido para debatir, compartir ideas y tomar decisiones.</p>
                        <p class="info-quote">"Extraños de tierras lejanas, amigos de antaño…"</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-codice-de-feanor' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/feanor.png" class="option-img" />
                    </div>
                    <h3>El códice de Fëanor</h3>
                    <span class="option-tag">Herramientas criptográficas</span>
                    <div class="option-info">
                        <p class="info-desc">Herramientas criptográficas y técnicas de codificación y cifrado.</p>
                        <p class="info-quote">"Fëanor era el más grande de los Noldor en habilidad y saber."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'los-champiñones-de-radagast' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/radagast.png" class="option-img" />
                    </div>
                    <h3>Los champiñones de Radagast</h3>
                    <span class="option-tag">Rendimiento cognitivo</span>
                    <div class="option-info">
                        <p class="info-desc">Biohacking y uso responsable de compuestos legales para potenciar el
                            rendimiento cognitivo.</p>
                        <p class="info-quote">"Radagast el Pardo, amante de las bestias..."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-mano-de-sauron' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/sauron.png" class="option-img" />
                    </div>
                    <h3>La mano de Sauron</h3>
                    <span class="option-tag">Darkweb</span>
                    <div class="option-info">
                        <p class="info-desc">Explora el lado oculto de internet (con conocimiento).</p>
                        <p class="info-quote">"Todo será revelado."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-biblioteca-de-rivendel' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/biblioteca.png" class="option-img" />
                    </div>
                    <h3>La biblioteca de Rivendel</h3>
                    <span class="option-tag">Certificaciones</span>
                    <div class="option-info">
                        <p class="info-desc">Información sobre certificados para el mundo de la ciberseguridad.</p>
                        <p class="info-quote">"La sabiduría habita aquí."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-espejo-de-galadriel' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/galadriel.png" class="option-img" />
                    </div>
                    <h3>El espejo de Galadriel</h3>
                    <span class="option-tag">Filtraciones</span>
                    <div class="option-info">
                        <p class="info-desc">Consulta de filtraciones.</p>
                        <p class="info-quote">"Cosas que fueron… cosas que son… Y algunas que aún no han sucedido."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-forja-de-celebrimbor' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/celebrimbor.png" class="option-img" />
                    </div>
                    <h3>La forja de Celebrimbor</h3>
                    <span class="option-tag">Herramientas</span>
                    <div class="option-info">
                        <p class="info-desc">Herramientas y recursos.</p>
                        <p class="info-quote">"La habilidad de los Elfos está más allá de tu imaginación."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-vuelo-de-thorondor' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/thorondor.png" class="option-img" />
                    </div>
                    <h3>El vuelo de Thorondor</h3>
                    <span class="option-tag">Monitorización</span>
                    <div class="option-info">
                        <p class="info-desc">Herramienta para monitorización de sistemas Linux</p>
                        <p class="info-quote">"Thorondor observaba todo lo que sucedía en las tierras de abajo."</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'la-identidad-de-gollum' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/gollum.png" class="option-img" />
                    </div>
                    <h3>La identidad de Golum</h3>
                    <span class="option-tag">WHOAMI</span>
                    <div class="option-info">
                        <p class="info-desc">Información sobre tu identidad digital</p>
                        <p class="info-quote">"¿Qué son patatas, tesoro?"</p>
                    </div>
                </router-link>
                <router-link :to="{ name: 'el-antiguo-mapa-de-bilbo' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/bilbo.png" class="option-img" />
                    </div>
                    <h3>El antiguo mapa de Bilbo</h3>
                    <span class="option-tag">Tests</span>
                    <div class="option-info">
                        <p class="info-desc">Pon a prueba tu conocimiento.</p>
                        <p class="info-quote">"Sales al camino…"</p>
                    </div>
                </router-link>
                <a href="https://www.youtube.com/@TomBombadil-SONGS" class="option-card card-large" target="_blank">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/tombombadil.png" class="option-img" />
                    </div>
                    <h3>La canción de Tom Bombadil</h3>
                    <span class="option-tag">Música</span>
                    <div class="option-info">
                        <p class="info-desc">Música.</p>
                        <p class="info-quote">"Hey dol! merry dol! ring a dong dillo!"</p>
                    </div>
                </a>
                <router-link :to="{ name: 'el-libro-rojo-de-la-frontera-del-oeste' }" class="option-card card-large">
                    <div class="corner-tl"></div>
                    <div class="corner-br"></div>
                    <div class="option-img-wrap">
                        <img src="@/assets/logos/librorojo.png" class="option-img" />
                    </div>
                    <h3>El Libro Rojo de la Frontera del Oeste</h3>
                    <span class="option-tag">FAQ</span>
                    <div class="option-info">
                        <p class="info-desc">Preguntas frecuentes sobre la plataforma.</p>
                        <p class="info-quote">"El libro de Bilbo fue conocido más tarde como el Libro Rojo de la
                            Frontera del Oeste."</p>
                    </div>
                </router-link>
            </div>
        </main>
        <div class="rune-footer">ᚠ · ᚢ · ᚦ · ᚨ · ᚱ · ᚲ</div>
    </div>
</template>

<script>
export default {
    name: "HomeView"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    background:
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(180, 120, 0, 0.18) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 80%, rgba(100, 50, 0, 0.1) 0%, transparent 50%),
        linear-gradient(180deg, #070501 0%, #0e0a02 30%, #080601 70%, #050402 100%);
    min-height: 100vh;
    color: #f5e6b3;
    font-family: 'EB Garamond', serif;
}

.hero-section {
    position: relative;
    text-align: center;
    padding: 42px 20px 28px;
    overflow: hidden;
    border-bottom: 1px solid rgba(212, 175, 55, .08);
}

.hero-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
    pointer-events: none;
}

.hero-section::after {
    height: 1px;
    opacity: .6;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.6) 30%, #c9a227 50%, rgba(201, 162, 39, 0.6) 70%, transparent);
}

.rune-bar {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 7px;
    color: rgba(201, 162, 39, 0.35);
    margin-bottom: 18px;
}

.ring-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 18px;
}

.ring-glow {
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    background: radial-gradient(circle,
            rgba(212, 175, 55, .22) 0%,
            transparent 72%);
    animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.6;
        transform: scale(0.95);
    }

    50% {
        opacity: 1;
        transform: scale(1.05);
    }
}

.ring-img {
    position: relative;
    width: 112px;
    height: 112px;
    object-fit: contain;
    filter:
        drop-shadow(0 0 18px rgba(255, 180, 0, .55)) drop-shadow(0 0 35px rgba(200, 100, 0, .22));
    animation: float 6s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(-1deg);
    }

    50% {
        transform: translateY(-10px) rotate(1deg);
    }
}

.main-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.55rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #d4af37;
    letter-spacing: 3px;
    line-height: 1.15;
    margin-bottom: 8px;
    text-shadow:
        0 0 22px rgba(212, 175, 55, .30),
        0 2px 4px rgba(0, 0, 0, .8);
}

.title-underline {
    width: 90px;
    height: 1px;
    background: linear-gradient(90deg,
            transparent,
            #c9a227,
            transparent);
    margin: 10px auto 18px;
}

.quote {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: clamp(.92rem, 2vw, 1.08rem);
    line-height: 1.55;
    color: rgba(245, 230, 179, .72);
    max-width: 620px;
    margin: 0 auto;
    letter-spacing: .25px;
}

.quote-mark {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.45rem;
    color: rgba(201, 162, 39, .28);
    vertical-align: -0.2em;
}

main {
    max-width: 1300px;
    margin: 0 auto;
    padding: 70px 24px 80px;
}

.section-label {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 6px;
    color: rgba(201, 162, 39, 0.5);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 48px;
}

.cards-grid {
    display: grid;
    gap: 20px;
}

.cards-grid.big-cards {
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
}

@media (max-width: 900px) {
    .cards-grid.big-cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .cards-grid.big-cards {
        grid-template-columns: 1fr;
    }
}

.option-card {
    position: relative;
    z-index: 1;
    background: linear-gradient(145deg, #100e07 0%, #0c0a05 100%);
    border: 1px solid rgba(201, 162, 39, 0.2);
    border-radius: 4px;
    padding: 36px 24px 32px;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    display: block;
    color: inherit;
    transition:
        transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.4s ease,
        border-color 0.4s ease;
    overflow: visible;
}

.option-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
}

.option-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

.option-card:hover {
    z-index: 999;
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(212, 175, 55, 0.55);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.85),
        0 0 30px rgba(212, 175, 55, 0.12),
        inset 0 1px 0 rgba(212, 175, 55, 0.15);
}

.option-card:hover::before,
.option-card:hover::after {
    opacity: 1;
}

.corner-tl,
.corner-br {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: rgba(201, 162, 39, 0.4);
    border-style: solid;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
}

.corner-tl {
    top: 8px;
    left: 8px;
    border-width: 1px 0 0 1px;
}

.corner-br {
    bottom: 8px;
    right: 8px;
    border-width: 0 1px 1px 0;
}

.option-card:hover .corner-tl,
.option-card:hover .corner-br {
    opacity: 1;
}

.option-img-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 24px;
}

.option-img-wrap::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.5), transparent);
}

.option-img {
    width: 96px;
    height: 96px;
    object-fit: contain;
    filter: brightness(0.85) sepia(0.2);
    transition: filter 0.4s ease, transform 0.4s ease;
}

.option-card:hover .option-img {
    filter: brightness(1.1) drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));
    transform: scale(1.08);
}

.option-card h3 {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #c9a227;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
    transition: color 0.3s ease;
    position: relative;
    z-index: 1;
}

.option-card:hover h3 {
    color: #e8c84a;
}

.option-tag {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(245, 230, 179, 0.4);
    border: 1px solid rgba(201, 162, 39, 0.2);
    padding: 4px 10px;
    border-radius: 2px;
    transition: color 0.3s ease, border-color 0.3s ease;
    position: relative;
    z-index: 1;
}

.option-card:hover .option-tag {
    color: rgba(245, 230, 179, 0.7);
    border-color: rgba(201, 162, 39, 0.4);
}

.option-card {
    overflow: visible;
}

.option-info {
    position: absolute;
    left: -1px;
    right: -1px;
    top: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    background: linear-gradient(160deg, #13100a 0%, #0c0a05 60%, #0f0d07 100%);
    border: 1px solid rgba(212, 175, 55, 0.55);
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 0 0 4px 4px;
    box-shadow:
        0 16px 48px rgba(0, 0, 0, 0.9),
        0 4px 20px rgba(0, 0, 0, 0.7),
        inset 0 1px 0 rgba(212, 175, 55, 0.15);
    padding: 0 18px;
    transition:
        max-height 0.65s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1),
        padding 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 100;
}

.option-info::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
}

.option-card:hover .option-info {
    max-height: 200px;
    opacity: 1;
    padding: 16px 18px 18px;
    pointer-events: auto;
}

.info-desc {
    font-family: 'EB Garamond', serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(245, 230, 179, 0.85);
    margin-bottom: 10px;
}

.info-quote {
    font-family: 'EB Garamond', serif;
    font-size: 0.85rem;
    font-style: italic;
    line-height: 1.5;
    color: rgba(212, 175, 55, 0.75);
    border-left: 2px solid rgba(212, 175, 55, 0.25);
    padding-left: 10px;
    margin-top: 8px;
}

.rune-footer {
    text-align: center;
    padding: 40px 0 60px;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 6px;
    color: rgba(201, 162, 39, 0.2);
}

@media (max-width: 768px) {
    .ring-img {
        width: 140px;
        height: 140px;
    }

    .option-card {
        padding: 28px 16px 24px;
    }

    .option-img {
        width: 76px;
        height: 76px;
    }

    main {
        padding: 50px 16px 60px;
    }
}
</style>
