import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BastonSarumanView from "../views/BastonSarumanView.vue";
import ChampiñonesRadagastView from "../views/ChampiñonesRadagastView.vue";
import HachaGimliView from "../views/HachaGimliView.vue";
import EscudoBoromirView from "../views/EscudoBoromirView.vue";
import CapaNazgulView from "../views/CapaNazgulView.vue";
import JarraPippinView from "../views/JarraPippinView.vue";
import ConcilioElrondView from "../views/ConcilioElrondView.vue";
import ManoSauronView from "../views/ManoSauronView.vue";
import PiedraPalantirView from "../views/PiedraPalantirView.vue";
import EspejoGaladrielView from "../views/EspejoGaladrielView.vue";
import ForjaCelebrimborView from "../views/ForjaCelebrimborView.vue";
import MapaBilboView from "../views/MapaBilboView.vue";
import BibliotecaRivendelView from "../views/BibliotecaRivendelView.vue";
import LibroRojoView from "../views/LibroRojoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { showHeader: true },
  },
  {
    path: "/el-baston-de-saruman",
    name: "el-baston-de-saruman",
    component: BastonSarumanView,
    meta: { showHeader: true },
  },
  {
    path: "/los-champiñones-de-radagast",
    name: "los-champiñones-de-radagast",
    component: ChampiñonesRadagastView,
    meta: { showHeader: true },
  },
  {
    path: "/el-hacha-de-gimli",
    name: "el-hacha-de-gimli",
    component: HachaGimliView,
    meta: { showHeader: true },
  },
  {
    path: "/el-escudo-de-boromir",
    name: "el-escudo-de-boromir",
    component: EscudoBoromirView,
    meta: { showHeader: true },
  },
  {
    path: "/la-capa-de-los-nazgul",
    name: "la-capa-de-los-nazgul",
    component: CapaNazgulView,
    meta: { showHeader: true },
  },
  {
    path: "/la-jarra-de-pippin",
    name: "la-jarra-de-pippin",
    component: JarraPippinView,
    meta: { showHeader: true },
  },
  {
    path: "/el-concilio-de-elrond",
    name: "el-concilio-de-elrond",
    component: ConcilioElrondView,
    meta: { showHeader: true },
  },
  {
    path: "/la-mano-de-sauron",
    name: "la-mano-de-sauron",
    component: ManoSauronView,
    meta: { showHeader: true },
  },
  {
    path: "/la-piedra-palantir",
    name: "la-piedra-palantir",
    component: PiedraPalantirView,
    meta: { showHeader: true },
  },
  {
    path: "/el-espejo-de-galadriel",
    name: "el-espejo-de-galadriel",
    component: EspejoGaladrielView,
    meta: { showHeader: true },
  },
  {
    path: "/la-forja-de-celebrimbor",
    name: "la-forja-de-celebrimbor",
    component: ForjaCelebrimborView,
    meta: { showHeader: true },
  },
  {
    path: "/el-antiguo-mapa-de-bilbo",
    name: "el-antiguo-mapa-de-bilbo",
    component: MapaBilboView,
    meta: { showHeader: true },
  },
  {
    path: "/la-biblioteca-de-rivendel",
    name: "la-biblioteca-de-rivendel",
    component: BibliotecaRivendelView,
    meta: { showHeader: true },
  },
  {
    path: "/el-libro-rojo-de-la-frontera-del-oeste",
    name: "el-libro-rojo-de-la-frontera-del-oeste",
    component: LibroRojoView,
    meta: { showHeader: true },
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
        behavior: "smooth"
      };
    }
  }
});

export default router;