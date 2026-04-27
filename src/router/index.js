import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JarraPippinView from "../views/JarraPippinView.vue";
import ConcilioElrondView from "../views/ConcilioElrondView.vue";
import EspejoGaladrielView from "../views/EspejoGaladrielView.vue";
import MapaBilboView from "../views/MapaBilboView.vue";
import LibroRojoView from "../views/LibroRojoView.vue";
import IdentidadGollumView from "../views/IdentidadGollumView.vue";
import VueloThorondorView from "../views/VueloThorondorView.vue";
import GuardiaFaramirView from "../views/GuardiaFaramirView.vue";
import CodiceFeanorView from "../views/CodiceFeanorView.vue";

// BASTÓN SARUMAN
import BastonSarumanView from "../views/BastonSaruman/BastonSarumanView.vue";

// HACHA GIMLI
import HachaGimliView from "../views/HachaGimli/HachaGimliView.vue";

// ESCUDO BOROMIR
import EscudoBoromirView from "../views/EscudoBoromir/EscudoBoromirView.vue";

// CAPA NAZGUL
import CapaNazgulView from "../views/CapaNazgul/CapaNazgulView.vue";

// BIBLIOTECA RIVENDEL
import BibliotecaRivendelView from "../views/BibliotecaRivendel/BibliotecaRivendelView.vue";

// FORJA CELEBRIMBOR
import ForjaCelebrimborView from "../views/ForjaCelebrimbor/ForjaCelebrimborView.vue";

// CHAMPIÑONES RADAGAST
import ChampiñonesRadagastView from "../views/ChampiñonesRadagast/ChampiñonesRadagastView.vue";

// MANO DE SAURON
import ManoSauronView from "../views/ManoSauron/ManoSauronView.vue";

// PIEDRA PALANTIR
import PiedraPalantirView from "../views/PiedraPalantir/PiedraPalantirView.vue";

// RESTO DE VISTAS SIN HEADER PERSONALIZADO

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/la-jarra-de-pippin",
    name: "la-jarra-de-pippin",
    component: JarraPippinView,
  },
  {
    path: "/el-concilio-de-elrond",
    name: "el-concilio-de-elrond",
    component: ConcilioElrondView,
  },
  {
    path: "/el-espejo-de-galadriel",
    name: "el-espejo-de-galadriel",
    component: EspejoGaladrielView,
  },
  {
    path: "/el-antiguo-mapa-de-bilbo",
    name: "el-antiguo-mapa-de-bilbo",
    component: MapaBilboView,
  },
  {
    path: "/el-libro-rojo-de-la-frontera-del-oeste",
    name: "el-libro-rojo-de-la-frontera-del-oeste",
    component: LibroRojoView,
  },
  {
    path: "/la-identidad-de-gollum",
    name: "la-identidad-de-gollum",
    component: IdentidadGollumView,
  },
  {
    path: "/el-vuelo-de-thorondor",
    name: "el-vuelo-de-thorondor",
    component: VueloThorondorView,
  },
  {
    path: "/la-guardia-de-faramir",
    name: "la-guardia-de-faramir",
    component: GuardiaFaramirView,
  },
  {
    path: "/el-codice-de-feanor",
    name: "el-codice-de-feanor",
    component: CodiceFeanorView,
  },

  // BASTÓN DE SARUMAN
  {
    path: "/el-baston-de-saruman",
    name: "el-baston-de-saruman",
    component: BastonSarumanView,
    meta: { showSarumanHeader: true },
  },

  // HACHA DE GIMLI
  {
    path: "/el-hacha-de-gimli",
    name: "el-hacha-de-gimli",
    component: HachaGimliView,
    meta: { showGimliHeader: true },
  },

  // ESCUDO DE BOROMIR
  {
    path: "/el-escudo-de-boromir",
    name: "el-escudo-de-boromir",
    component: EscudoBoromirView,
    meta: { showBoromirHeader: true },
  },

  // LA CAPA DE LOS NAZGUL
  {
    path: "/la-capa-de-los-nazgul",
    name: "la-capa-de-los-nazgul",
    component: CapaNazgulView,
    meta: { showNazgulHeader: true },
  },

  // BIBLIOTECA DE RIVENDEL
  {
    path: "/la-biblioteca-de-rivendel",
    name: "la-biblioteca-de-rivendel",
    component: BibliotecaRivendelView,
    meta: { showBibliotecaHeader: true },
  },

  // FORJA DE CELEBRIMBOR
  {
    path: "/la-forja-de-celebrimbor",
    name: "la-forja-de-celebrimbor",
    component: ForjaCelebrimborView,
    meta: { showCelebrimborHeader: true },
  },

  // CHAMPIÑONES DE RADAGAST
  {
    path: "/los-champiñones-de-radagast",
    name: "los-champiñones-de-radagast",
    component: ChampiñonesRadagastView,
    meta: { showRadagastHeader: true },
  },

  // MANO DE SAURON
  {
    path: "/la-mano-de-sauron",
    name: "la-mano-de-sauron",
    component: ManoSauronView,
    meta: { showSauronHeader: true },
  },

  // PIEDRA PALANTIR
  {
    path: "/la-piedra-palantir",
    name: "la-piedra-palantir",
    component: PiedraPalantirView,
    meta: { showPalantirHeader: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: "smooth",
      };
    }
  },
});

export default router;
