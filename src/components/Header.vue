<template>
  <header class="main-header" ref="header">
    <nav class="nav-container">
      <div class="logo" @click="$router.push('/')">
        <img src="/anillo.ico" alt="logo" />
        <span>El Anillo Único</span>
      </div>
      <div class="nav-links">
        <div class="row g-0 justify-content-center">
          <div v-for="item in items" :key="item.id" class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
            <div :class="['nav-item', 'h-100', { active: active === item.id }]" @mouseenter="showMenu(item.id, $event)"
              @mouseleave="startHide">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="active" class="sub-dropdown"
      :style="{ top: headerHeight + 'px', left: dropdownLeft + 'px', width: dropdownWidth + 'px' }"
      @mouseenter="cancelHide" @mouseleave="startHide">
      <div class="submenu">
        <a v-for="(sub, index) in currentSubs" :key="index" @click="handleClick(sub)">
          {{ sub.name }}
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",

  data() {
    return {
      active: null,
      dropdownLeft: 0,
      dropdownTop: 0,
      dropdownWidth: 0,
      hideTimeout: null,
      items: [
        {
          id: "Teoria",
          name: "Teoría",
          subs: [
            { name: "Redes, protocolos y conceptos de ciberseguridad", route: "/el-baston-de-saruman" },
            { name: "Red Team", route: "/el-hacha-de-gimli" },
            { name: "Blue Team", route: "/el-escudo-de-boromir" },
            { name: "Privacidad y anonimato", route: "/la-capa-de-los-nazgul" },
            { name: "Darkweb", route: "/la-mano-de-sauron" },
            { name: "Inteligencia Artificial", route: "/la-piedra-palantir" },
            { name: "Certificaciones", route: "/la-biblioteca-de-rivendel" }
          ]
        },
        {
          id: "herramientas",
          name: "Herramientas",
          subs: [
            { name: "Herramientas Externas", route: "/la-forja-de-celebrimbor" },
            { name: "Herramientas de codificación y cifrado", route: "/el-codice-de-feanor" },
            { name: "Comprobación de URLs", route: "/la-guardia-de-faramir" },
            { name: "Monitorización de sistemas Linux", route: "/el-vuelo-de-thorondor" },
            { name: "Filtraciones", route: "/el-espejo-de-galadriel" },
            { name: "Tests", route: "/el-antiguo-mapa-de-bilbo" },
            { name: "WHOAMI", route: "/la-identidad-de-gollum" },
          ]
        },
        {
          id: "comunidad",
          name: "Comunidad",
          subs: [
            { name: "Chat", route: "/el-concilio-de-elrond" },
            { name: "Películas, series y otros", route: "http://192.168.0.254/#/" },
            { name: "Memes", route: "/la-jarra-de-pippin" },
            { name: "Música", route: "https://www.youtube.com/@TomBombadil-SONGS" }
          ]
        },
        {
          id: "otros",
          name: "Otros",
          subs: [
            { name: "Rendimiento cognitivo", route: "/los-champiñones-de-radagast" },
            { name: "FAQ", route: "/el-libro-rojo-de-la-frontera-del-oeste" }
          ]
        }
      ]
    };
  },

  mounted() {
    this.headerHeight = this.$refs.header.offsetHeight;
  },

  computed: {
    currentSubs() {
      const item = this.items.find(i => i.id === this.active);
      return item ? item.subs : [];
    }
  },

  methods: {
    showMenu(id, event) {
      this.active = id;
      const rect = event.currentTarget.getBoundingClientRect();
      this.dropdownLeft = rect.left;
      this.dropdownTop = rect.bottom;
      this.dropdownWidth = rect.width;
      this.cancelHide();
    },

    startHide() {
      this.hideTimeout = setTimeout(() => {
        this.active = null;
      }, 250);
    },

    cancelHide() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
    },

    handleClick(sub) {
      if (
        sub.route.startsWith("http://") ||
        sub.route.startsWith("https://")
      ) {
        window.open(sub.route, "_blank");
      } else {
        this.$router.push(sub.route);
      }
      this.active = null;
    }
  }
};
</script>

<style scoped>
.main-header {
  width: 100%;
  height: 52px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background:
    linear-gradient(180deg, #1b1813 0%, #12100d 45%, #0c0b09 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.38);
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.65),
    inset 0 1px 0 rgba(255, 220, 120, 0.06);
}

.nav-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.logo {
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #d4af37;
  font-family: "Cinzel Decorative", serif;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: all 0.25s ease;
}

.logo:hover {
  color: #f0cf72;
  transform: translateY(-1px) scale(1.05);
  text-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
}

.logo img {
  width: 24px;
  filter:
    drop-shadow(0 0 4px rgba(255, 200, 50, 0.55)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.18)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.08));
  transition: all 0.3s ease;
}

.logo:hover img {
  filter:
    drop-shadow(0 0 6px rgba(255, 200, 50, 0.7)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.3)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.15));
  transform: rotate(5deg) scale(1.1);
}

.nav-links {
  flex: 1;
  max-width: 1060px;
  padding: 0 20px;
}

.nav-item {
  min-height: 52px;
  padding: 12px 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: normal;
  line-height: 1.25;
  color: #f0e4c3;
  font-family: "Cinzel", serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .3px;
  cursor: pointer;
  border-left: 1px solid rgba(212, 175, 55, 0.18);
  border-right: 1px solid rgba(212, 175, 55, 0.18);
  transition: all .22s ease;
  position: relative;
}

.nav-item:hover,
.nav-item.active {
  background: #1b1813;
  color: #f3cf75;
  box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.15);
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg,
      transparent 0%,
      #d4af37 20%,
      #ffd700 50%,
      #d4af37 80%,
      transparent 100%);
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(255, 215, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 1px;
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 95%;
  bottom: -1px;
}

.sub-dropdown {
  position: fixed;
  max-height: 72vh;
  overflow-y: auto;
  background: linear-gradient(180deg, #141414 0%, #0f0f0f 100%);
  border-left: 1px solid rgba(255, 214, 102, 0.22);
  border-right: 1px solid rgba(255, 214, 102, 0.22);
  border-bottom: 1px solid rgba(255, 214, 102, 0.22);
  border-radius: 0 0 6px 6px;
  padding: 14px 14px;
  z-index: 100000;
  box-shadow:
    0 18px 30px rgba(0, 0, 0, 0.50),
    0 0 40px rgba(212, 175, 55, 0.08),
    inset 0 1px 0 rgba(255, 220, 120, 0.03);
  animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(1px);
}

.submenu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.submenu a {
  color: #f3e7c2;
  text-decoration: none;
  font-family: "Cinzel", serif;
  font-size: 13px;
  line-height: 1.35;
  padding: 6px 2px;
  border-bottom: 1px solid rgba(255, 214, 102, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.submenu a:hover {
  color: #ffd76d;
  font-family: "Cinzel", serif;
  transform: translateX(1px);
}

.submenu a:last-child {
  border-bottom: none;
}

.sub-dropdown::-webkit-scrollbar {
  width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.35);
  border-radius: 10px;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
    filter: blur(1px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@media (max-width: 1199px) {
  .nav-item {
    padding: 12px 18px;
    font-size: 12px;
    min-height: 58px;
  }
}

@media (max-width: 820px) {
  .nav-links {
    display: none !important;
  }

  .logo {
    left: 50%;
    transform: translateX(-50%);
  }

  .logo:hover {
    transform: translateX(-50%) translateY(-1px);
  }
}
</style>