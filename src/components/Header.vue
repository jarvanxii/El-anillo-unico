<template>
  <header class="main-header" ref="header">
    <nav class="nav-container">
      <div class="logo" @click="$router.push('/')">
        <img src="/anillo.ico" alt="logo" />
        <span>El Anillo Único</span>
      </div>

      <ul class="nav-links" ref="navLinks">
        <li
          v-for="item in items"
          :key="item.id"
          class="nav-item"
          :class="{ active: active === item.id }"
          @mouseenter="showMenu(item.id, $event)"
          @mouseleave="startHide"
        >
          {{ item.name }}
        </li>
      </ul>
    </nav>

    <!-- MENÚ DESPLEGABLE -->
    <div
      v-if="active"
      class="mega-menu"
      :style="{ top: headerHeight + 'px', left: dropdownX + 'px' }"
      @mouseenter="cancelHide"
      @mouseleave="startHide"
    >
      <div class="submenu">
        <div
          v-for="(sub, index) in currentSubs"
          :key="index"
          class="submenu-item"
          @click="handleClick(sub)"
        >
          {{ sub.name }}
        </div>
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
      dropdownX: 0,
      headerHeight: 0,
      hideTimeout: null,

      items: [
        {
          id: "ciberseguridad",
          name: "Ciberseguridad",
          subs: [
            { name: "Redes, protocolos y conceptos", route: "/el-baston-de-saruman" },
            { name: "Red Team", route: "/el-hacha-de-gimli" },
            { name: "Blue Team", route: "/el-escudo-de-boromir" },
            { name: "Privacidad", route: "/la-capa-de-los-nazgul" }
          ]
        },
        {
          id: "recursos",
          name: "Recursos",
          subs: [
            { name: "Herramientas", route: "/la-forja-de-celebrimbor" },
            { name: "Chat", route: "/el-concilio-de-elrond" },
            { name: "Filtraciones", route: "/el-espejo-de-galadriel" },
            { name: "Tests", route: "/el-antiguo-mapa-de-bilbo" }
          ]
        },
        {
          id: "comunidad",
          name: "Comunidad",
          subs: [
            { name: "Películas, series y otros", route: "http://lapipadegandalf.ddns.net:8080" },
            { name: "Memes", route: "/la-jarra-de-pippin" },
            { name: "Música", route: "https://www.youtube.com/@TomBombadil-SONGS" }
          ]
        },
        {
          id: "otros",
          name: "Otros",
          subs: [
            { name: "Darkweb", route: "/la-mano-de-sauron" },
            { name: "IA", route: "/la-piedra-palantir" },
            { name: "Rendimiento cognitivo", route: "/los-champiñones-de-radagast" },
            { name: "Certificaciones", route: "/la-biblioteca-de-rivendel" },
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
      this.dropdownX = rect.left;
      this.cancelHide();
    },

    startHide() {
      this.hideTimeout = setTimeout(() => {
        this.active = null;
      }, 300);
    },

    cancelHide() {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
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
/* =====================================================
   HEADER PRINCIPAL - PREMIUM TOLKIEN DARK
===================================================== */
.main-header {
  width: 100%;
  height: 52px;
  padding: 4px 0;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  overflow: visible;

  /* Fondo premium oscuro */
  background:
    linear-gradient(180deg, #1b1813 0%, #12100d 45%, #0c0b09 100%);

  border-bottom: 1px solid rgba(212, 175, 55, 0.38);

  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.65),
    inset 0 1px 0 rgba(255, 220, 120, 0.06);
}

/* =====================================================
   CONTENEDOR NAV
===================================================== */
.nav-container {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

/* =====================================================
   LOGO
===================================================== */
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
  transform: translateY(-1px);
}

.logo img {
  width: 24px;

  filter:
    drop-shadow(0 0 4px rgba(255, 200, 50, 0.55))
    drop-shadow(0 0 10px rgba(212, 175, 55, 0.18));
}

/* =====================================================
   LINKS PRINCIPALES
===================================================== */
.nav-links {
  list-style: none;

  display: flex;
  gap: 34px;

  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;

  color: #f0e4c3;
  font-family: "Cinzel", serif;
  font-size: 14px;
  letter-spacing: 0.4px;

  cursor: pointer;

  padding: 4px 2px;

  transition: color 0.25s ease, transform 0.2s ease;
}

.nav-item:hover {
  color: #f3cf75;
  transform: translateY(-1px);
}

/* Línea dorada inferior */
.nav-item::after {
  content: "";

  position: absolute;
  bottom: -4px;
  left: 50%;

  transform: translateX(-50%);

  width: 0;
  height: 1px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(212, 175, 55, 0.95),
    transparent
  );

  transition: width 0.35s ease;
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 90%;
}

/* =====================================================
   MEGA MENU
===================================================== */
.mega-menu {
  position: fixed;
  width: 240px;

  background:
    linear-gradient(180deg, #1a1712 0%, #110f0c 100%);

  border: 1px solid rgba(212, 175, 55, 0.24);
  border-top: none;

  border-radius: 0 0 10px 10px;

  overflow: hidden;

  z-index: 100000;

  box-shadow:
    0 18px 30px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 220, 120, 0.05);

  animation: menuFade 0.18s ease;
}

/* =====================================================
   SUBMENU
===================================================== */
.submenu {
  display: flex;
  flex-direction: column;
}

.submenu-item {
  padding: 13px 18px;

  font-size: 13px;
  font-family: "Cinzel", serif;
  letter-spacing: 0.25px;

  color: #f3e7c2;

  border-bottom: 1px solid rgba(255, 214, 102, 0.08);

  cursor: pointer;

  transition: all 0.22s ease;
}

.submenu-item:last-child {
  border-bottom: none;
}

.submenu-item:hover {
  background:
    linear-gradient(
      90deg,
      rgba(212, 175, 55, 0.14),
      rgba(212, 175, 55, 0.05)
    );

  color: #ffd76d;
  padding-left: 22px;
}

/* =====================================================
   ANIMACIÓN
===================================================== */
@keyframes menuFade {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =====================================================
   RESPONSIVE
===================================================== */
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