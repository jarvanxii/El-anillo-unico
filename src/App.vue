<template>
  <div id="app">
    <header class="hero-section">
      <div class="rune-bar">᚛ · · · ᚜</div>

      <div class="ring-wrapper">
        <div class="ring-glow"></div>
        <img src="./assets/anillo.png" alt="Anillo Único" class="ring-img" />
      </div>

      <h1 class="main-title">El Anillo Único</h1>
      <div class="title-underline"></div>

      <p class="quote">
        <span class="quote-mark">"</span>
        Un Anillo para gobernarlos a todos,<br />
        Un Anillo para encontrarlos,<br />
        Un Anillo para atraerlos a todos<br />
        y atarlos en las tinieblas…
        <span class="quote-mark">"</span>
      </p>
    </header>

    <main>
      <p class="section-label">· Elige tu camino ·</p>

      <div class="cards-grid big-cards">

        <!-- GANDALF -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/gandalf.png" class="option-img" />
          </div>
          <h3>La pipa de Gandalf</h3>
          <span class="option-tag">Ocio</span>
          <div class="option-info">
            <p class="info-desc">Plataforma privada para la descarga y reproducción de contenido multimedia.</p>
            <p class="info-quote">"Y tu afición a la hoja de los medianos claramente ha ralentizado tu mente."</p>
          </div>
        </a>

        <!-- SARUMAN -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/saruman.png" class="option-img" />
          </div>
          <h3>El bastón de Saruman</h3>
          <span class="option-tag">Redes | Ciberseguridad</span>
          <div class="option-info">
            <p class="info-desc">Redes, protocolos y conceptos de ciberseguridad.</p>
            <p class="info-quote">"No es un bastón cualquiera."</p>
          </div>
        </a>

        <!-- RADAGAST -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/radagast.png" class="option-img" />
          </div>
          <h3>Los champiñones de Radagast</h3>
          <span class="option-tag">Biohacking</span>
          <div class="option-info">
            <p class="info-desc">Biohacking y uso responsable de compuestos legales para potenciar
              el rendimiento cognitivo.</p>
            <p class="info-quote">"Radagast el Pardo, amante de las bestias..."</p>
          </div>
        </a>

        <!-- GIMLI -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/gimli.png" class="option-img" />
          </div>
          <h3>El hacha de Gimli</h3>
          <span class="option-tag">Red Team</span>
          <div class="option-info">
            <p class="info-desc">Ataques, herramientas ofensivas y técnicas de hacking.</p>
            <p class="info-quote">"¡Nadie lanza a un enano!"</p>
          </div>
        </a>

        <!-- BOROMIR -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/boromir.png" class="option-img" />
          </div>
          <h3>El escudo de Boromir</h3>
          <span class="option-tag">Blue Team</span>
          <div class="option-info">
            <p class="info-desc">Defensa digital, monitorización y protección de sistemas.</p>
            <p class="info-quote">"Uno no simplemente entra en Mordor."</p>
          </div>
        </a>

        <!-- NAZGUL -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/nazgul.png" class="option-img" />
          </div>
          <h3>La capa de los Nazgûl</h3>
          <span class="option-tag">Privacidad</span>
          <div class="option-info">
            <p class="info-desc">Anonimato, privacidad y protección en internet.</p>
            <p class="info-quote">"Los Nazgûl no tienen voluntad propia."</p>
          </div>
        </a>

        <!-- ELROND -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/elrond.png" class="option-img" />
          </div>
          <h3>El concilio de Elrond</h3>
          <span class="option-tag">Chat</span>
          <div class="option-info">
            <p class="info-desc">Un lugar protegido para debatir, compartir ideas y tomar decisiones.</p>
            <p class="info-quote">"El camino está abierto, pero no será fácil."</p>
          </div>
        </a>

        <!-- SAURON -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/sauron.png" class="option-img" />
          </div>
          <h3>La mano de Sauron</h3>
          <span class="option-tag">Darkweb</span>
          <div class="option-info">
            <p class="info-desc">Explora el lado oculto de internet (con conocimiento).</p>
            <p class="info-quote">"Un Anillo para gobernarlos a todos."</p>
          </div>
        </a>

        <!-- TOM BOMBADIL -->
        <a href="https://www.youtube.com/@TomBombadil-SONGS" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/tombombadil.png" class="option-img" />
          </div>
          <h3>La canción de Tom Bombadil</h3>
          <span class="option-tag">Música</span>
          <div class="option-info">
            <p class="info-desc">Música.</p>
            <p class="info-quote">"Hey dol! merry dol! ring a dong dillo!"</p>
          </div>
        </a>

        <!-- PIPPIN -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/pippin.png" class="option-img" />
          </div>
          <h3>La jarra de Pippin</h3>
          <span class="option-tag">Memes</span>
          <div class="option-info">
            <p class="info-desc">Humor, memes y contenido ligero.</p>
            <p class="info-quote">"La comida es lo más importante del día."</p>
          </div>
        </a>

        <!-- PALANTIR -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/palantir.png" class="option-img" />
          </div>
          <h3>La piedra Palantír</h3>
          <span class="option-tag">IA</span>
          <div class="option-info">
            <p class="info-desc">Inteligencia artificial, modelos y futuro tecnológico.</p>
            <p class="info-quote">"El ver no siempre es comprender."</p>
          </div>
        </a>

        <!-- GALADRIEL -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/galadriel.png" class="option-img" />
          </div>
          <h3>El espejo de Galadriel</h3>
          <span class="option-tag">Filtraciones</span>
          <div class="option-info">
            <p class="info-desc">Consulta de filtraciones.</p>
            <p class="info-quote">"El ver no siempre es comprender."</p>
          </div>
        </a>

        <!-- CELEBRIMBOR -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/celebrimbor.png" class="option-img" />
          </div>
          <h3>La forja de Celebrimbor</h3>
          <span class="option-tag">Herramientas</span>
          <div class="option-info">
            <p class="info-desc">Herramientas y recursos.</p>
            <p class="info-quote">"El ver no siempre es comprender."</p>
          </div>
        </a>

        <!-- BILBO -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/bilbo.png" class="option-img" />
          </div>
          <h3>El antiguo mapa de Bilbo</h3>
          <span class="option-tag">Test</span>
          <div class="option-info">
            <p class="info-desc">Pon a prueba tu conocimiento.</p>
            <p class="info-quote">"El ver no siempre es comprender."</p>
          </div>
        </a>

        <!-- BIBLIOTECA -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/biblioteca.png" class="option-img" />
          </div>
          <h3>La biblioteca de Rivendel</h3>
          <span class="option-tag">Certificaciones</span>
          <div class="option-info">
            <p class="info-desc">Información sobre certificados para el mundo de la ciberseguridad.</p>
            <p class="info-quote">"El ver no siempre es comprender."</p>
          </div>
        </a>

        <!-- PERGAMINOS -->
        <a href="#" class="option-card card-large" target="_blank">
          <div class="corner-tl"></div>
          <div class="corner-br"></div>
          <div class="option-img-wrap">
            <img src="./assets/pergaminos.png" class="option-img" />
          </div>
          <h3>Los pergaminos de Alatar</h3>
          <span class="option-tag">Guia del caminante | FAQ</span>
          <div class="option-info">
            <p class="info-desc">Preguntas frecuentes sobre la plataforma.</p>
            <p class="info-quote">"El ver no siempre es comprender."</p>
          </div>
        </a>

      </div>
    </main>

    <div class="rune-footer">ᚠ · ᚢ · ᚦ · ᚨ · ᚱ · ᚲ</div>
  </div>
</template>

<script>
export default {
  name: "App"
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

/* ── HERO ── */
.hero-section {
  position: relative;
  text-align: center;
  padding: 80px 20px 60px;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-section::after {
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
  font-size: 11px;
  letter-spacing: 8px;
  color: rgba(201, 162, 39, 0.4);
  margin-bottom: 40px;
}

.ring-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 48px;
}

.ring-glow {
  position: absolute;
  inset: -30px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%);
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
  width: 180px;
  height: 180px;
  object-fit: contain;
  filter: drop-shadow(0 0 30px rgba(255, 180, 0, 0.7)) drop-shadow(0 0 60px rgba(200, 100, 0, 0.3));
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
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  font-weight: 700;
  color: #d4af37;
  letter-spacing: 4px;
  line-height: 1.2;
  margin-bottom: 12px;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8);
}

.title-underline {
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a227, transparent);
  margin: 16px auto 32px;
}

.quote {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 2;
  color: rgba(245, 230, 179, 0.75);
  max-width: 600px;
  margin: 0 auto;
  letter-spacing: 0.5px;
}

.quote-mark {
  font-family: 'Cinzel Decorative', serif;
  font-size: 2rem;
  color: rgba(201, 162, 39, 0.3);
  line-height: 0;
  vertical-align: -0.4em;
}

/* ── MAIN ── */
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

/* ── CARD ── */
.option-card {
  position: relative;
  background: linear-gradient(145deg, #100e07 0%, #0c0a05 100%);
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 4px;
  padding: 36px 24px 32px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  overflow: hidden;
  text-decoration: none;
  display: block;
  color: inherit;
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
}

.option-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.option-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(212, 175, 55, 0.55);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
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
}

.option-card:hover .option-tag {
  color: rgba(245, 230, 179, 0.7);
  border-color: rgba(201, 162, 39, 0.4);
}

.option-card {
  overflow: hidden;
}

/* ── FOOTER ── */
.rune-footer {
  text-align: center;
  padding: 40px 0 60px;
  font-family: 'Cinzel', serif;
  font-size: 10px;
  letter-spacing: 6px;
  color: rgba(201, 162, 39, 0.2);
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .ring-img {
    width: 140px;
    height: 140px;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 14px;
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

/* ─────────────────────────────── */
/* EL PANEL SE DESPLIEGA HACIA ABAJO */
/* ─────────────────────────────── */

/* Asegura que cada card pueda colocarse por encima del resto */
.option-card {
  position: relative;
  z-index: 1;
  overflow: visible;
}

/* Cuando haces hover, esta card se pone por encima de todas */
.option-card:hover {
  z-index: 999;
  /* 👈 clave */
}

/* Panel emergente debajo del card, siempre visible */
.option-info {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  /* aparece desde abajo de la card */
  transform: translateY(-12px);
  opacity: 0;
  padding: 18px;
  background: rgba(10, 8, 4, 0.95);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-top: none;

  transition: all 0.35s ease;
  pointer-events: none;

  z-index: 2000;
  /* 👈 MÁS alto que la card */
}

/* Animación al hacer hover */
.option-card:hover .option-info {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.info-desc {
  font-size: 1rem;
  /* antes 0.75rem */
  color: rgba(245, 230, 179, 0.90);
  margin-bottom: 10px;
}

.info-quote {
  font-size: 0.9rem;
  /* antes 0.7rem */
  font-style: italic;
  color: rgba(201, 162, 39, 0.90);
}

/* ───────── 4 CARDS POR FILA EN PC ───────── */
.cards-grid.big-cards {
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

/* Tablet → 2 por fila */
@media (max-width: 900px) {
  .cards-grid.big-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Móvil → 1 por fila */
@media (max-width: 500px) {
  .cards-grid.big-cards {
    grid-template-columns: 1fr;
  }
}
</style>