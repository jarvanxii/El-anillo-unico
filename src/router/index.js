import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JarraPippinView from "../views/JarraPippinView.vue";
import ConcilioElrondView from "../views/ConcilioElrondView.vue";
import EspejoGaladrielView from "../views/EspejoGaladrielView.vue";
import MapaBilboView from "../views/MapaBilboView.vue";
import LibroRojoView from "../views/LibroRojoView.vue";
import IdentidadGollumView from "../views/IdentidadGollumView.vue";
import GuardiaFaramirView from "../views/GuardiaFaramirView.vue";
import CodiceFeanorView from "../views/CodiceFeanorView.vue";

// CODICE FEANOR
import FeanorTeoriaView from "../views/CodiceFeanor/Feanor-TeoriaView.vue";
import FeanorCifradoCesarView from "../views/CodiceFeanor/Feanor-CifradoCesarView.vue";
import FeanorAtbashView from "../views/CodiceFeanor/Feanor-AtbashView.vue";
import FeanorBooleanOpsView from "../views/CodiceFeanor/Feanor-BooleanOpsView.vue";
import FeanorVigenereView from "../views/CodiceFeanor/Feanor-VigenereView.vue";
import FeanorAffineView from "../views/CodiceFeanor/Feanor-AffineView.vue";
import FeanorRailFenceView from "../views/CodiceFeanor/Feanor-RailFenceView.vue";
import FeanorModularView from "../views/CodiceFeanor/Feanor-ModularView.vue";
import FeanorBase64View from "../views/CodiceFeanor/Feanor-Base64View.vue";
import FeanorBase64UrlView from "../views/CodiceFeanor/Feanor-Base64UrlView.vue";
import FeanorUrlEncodingView from "../views/CodiceFeanor/Feanor-UrlEncodingView.vue";
import FeanorHexView from "../views/CodiceFeanor/Feanor-HexView.vue";
import FeanorTransformacionesView from "../views/CodiceFeanor/Feanor-TransformacionesView.vue";
import FeanorInspectorBytesView from "../views/CodiceFeanor/Feanor-InspectorBytesView.vue";
import FeanorBancoRegexView from "../views/CodiceFeanor/Feanor-BancoRegexView.vue";
import FeanorJsonDiffView from "../views/CodiceFeanor/Feanor-JsonDiffView.vue";
import FeanorEstegoAnalizadorView from "../views/CodiceFeanor/Feanor-EstegoAnalizadorView.vue";
import FeanorExifView from "../views/CodiceFeanor/Feanor-ExifView.vue";
import FeanorMetadataEditorView from "../views/CodiceFeanor/Feanor-MetadataEditorView.vue";
import FeanorEstegoIncrustarView from "../views/CodiceFeanor/Feanor-EstegoIncrustarView.vue";
import FeanorEstegoExtraerView from "../views/CodiceFeanor/Feanor-EstegoExtraerView.vue";
import FeanorSteghideSuiteView from "../views/CodiceFeanor/Feanor-SteghideSuiteView.vue";
import FeanorGeneradorSecretosView from "../views/CodiceFeanor/Feanor-GeneradorSecretosView.vue";
import FeanorEntropiaView from "../views/CodiceFeanor/Feanor-EntropiaView.vue";
import FeanorHashView from "../views/CodiceFeanor/Feanor-HashView.vue";
import FeanorHashLookupView from "../views/CodiceFeanor/Feanor-HashLookupView.vue";
import FeanorPasswordHashCrackerView from "../views/CodiceFeanor/Feanor-PasswordHashCrackerView.vue";
import FeanorRainbowTablesView from "../views/CodiceFeanor/Feanor-RainbowTablesView.vue";
import FeanorHashcatJohnWorkbenchView from "../views/CodiceFeanor/Feanor-HashcatJohnWorkbenchView.vue";
import FeanorHmacView from "../views/CodiceFeanor/Feanor-HmacView.vue";
import FeanorKdfView from "../views/CodiceFeanor/Feanor-KdfView.vue";
import FeanorPbkdf2View from "../views/CodiceFeanor/Feanor-Pbkdf2View.vue";
import FeanorHkdfView from "../views/CodiceFeanor/Feanor-HkdfView.vue";
import FeanorArgon2View from "../views/CodiceFeanor/Feanor-Argon2View.vue";
import FeanorScryptView from "../views/CodiceFeanor/Feanor-ScryptView.vue";
import FeanorYescryptView from "../views/CodiceFeanor/Feanor-YescryptView.vue";
import FeanorBcryptView from "../views/CodiceFeanor/Feanor-BcryptView.vue";
import FeanorComparadorConstanteView from "../views/CodiceFeanor/Feanor-ComparadorConstanteView.vue";
import FeanorFirmaJsonView from "../views/CodiceFeanor/Feanor-FirmaJsonView.vue";
import FeanorCifradoSimetricoView from "../views/CodiceFeanor/Feanor-CifradoSimetricoView.vue";
import FeanorAeadView from "../views/CodiceFeanor/Feanor-AeadView.vue";
import FeanorOtpView from "../views/CodiceFeanor/Feanor-OtpView.vue";
import FeanorJwtView from "../views/CodiceFeanor/Feanor-JwtView.vue";
import FeanorCifradoAsimetricoView from "../views/CodiceFeanor/Feanor-CifradoAsimetricoView.vue";
import FeanorFirmaDigitalView from "../views/CodiceFeanor/Feanor-FirmaDigitalView.vue";
import FeanorEcdhView from "../views/CodiceFeanor/Feanor-EcdhView.vue";
import FeanorConversorClavesView from "../views/CodiceFeanor/Feanor-ConversorClavesView.vue";
import FeanorInspectorX509View from "../views/CodiceFeanor/Feanor-InspectorX509View.vue";

// VUELO THORONDOR
import VueloThorondorView from "../views/VueloThorondor/VueloThorondorView.vue";
import ThorondorGuiaInstalacionView from "../views/VueloThorondor/Thorondor-GuiaInstalacionView.vue";
import ThorondorGeneradorAgentesView from "../views/VueloThorondor/Thorondor-GeneradorAgentesView.vue";
import ThorondorDashboardView from "../views/VueloThorondor/Thorondor-DashboardView.vue";
import ThorondorDetalleHostsView from "../views/VueloThorondor/Thorondor-DetalleHostsView.vue";
import ThorondorReglasMonitorizacionView from "../views/VueloThorondor/Thorondor-ReglasMonitorizacionView.vue";
import ThorondorAgentesView from "../views/VueloThorondor/Thorondor-AgentesView.vue";

// BASTÓN SARUMAN
import BastonSarumanView from "../views/BastonSaruman/BastonSarumanView.vue";
import SarumanModeloOSIView from "../views/BastonSaruman/Saruman-ModeloOSIView.vue";
import SarumanModeloTCPIPView from "../views/BastonSaruman/Saruman-ModeloTCPIPView.vue";

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
    path: "/la-guardia-de-faramir",
    name: "la-guardia-de-faramir",
    component: GuardiaFaramirView,
  },
  {
    path: "/el-codice-de-feanor",
    name: "el-codice-de-feanor",
    component: CodiceFeanorView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/fundamentos-codificacion",
    name: "feanor-teoria-fundamentos-codificacion",
    component: FeanorTeoriaView,
    props: { topicId: "fundamentos-codificacion" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/cesar-xor",
    name: "feanor-teoria-cesar-xor",
    component: FeanorTeoriaView,
    props: { topicId: "cesar-xor" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/xor-y-modulo",
    name: "feanor-teoria-operaciones-xor-modulo",
    component: FeanorTeoriaView,
    props: { topicId: "operaciones-xor-modulo" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/parsing-json-regex",
    name: "feanor-teoria-parsing-json-regex",
    component: FeanorTeoriaView,
    props: { topicId: "parsing-json-regex" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/esteganografia-metadatos",
    name: "feanor-teoria-esteganografia-metadatos",
    component: FeanorTeoriaView,
    props: { topicId: "esteganografia-metadatos" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/secretos-entropia",
    name: "feanor-teoria-secretos-entropia",
    component: FeanorTeoriaView,
    props: { topicId: "secretos-entropia" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/hash-hmac-timing",
    name: "feanor-teoria-hash-hmac-timing",
    component: FeanorTeoriaView,
    props: { topicId: "hash-hmac-timing" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/red-team-hashcracking",
    name: "feanor-teoria-red-team-hashcracking",
    component: FeanorTeoriaView,
    props: { topicId: "red-team-hashcracking" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/derivacion-claves",
    name: "feanor-teoria-derivacion-claves",
    component: FeanorTeoriaView,
    props: { topicId: "derivacion-claves" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/cifrado-simetrico",
    name: "feanor-teoria-cifrado-simetrico",
    component: FeanorTeoriaView,
    props: { topicId: "cifrado-simetrico" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/aead-gcm",
    name: "feanor-teoria-aead-gcm",
    component: FeanorTeoriaView,
    props: { topicId: "aead-gcm" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/tokens-otp-jwt",
    name: "feanor-teoria-tokens-otp-jwt",
    component: FeanorTeoriaView,
    props: { topicId: "tokens-otp-jwt" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/asimetrica-hibrida",
    name: "feanor-teoria-asimetrica-hibrida",
    component: FeanorTeoriaView,
    props: { topicId: "asimetrica-hibrida" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/firmas-ecdh",
    name: "feanor-teoria-firmas-ecdh",
    component: FeanorTeoriaView,
    props: { topicId: "firmas-ecdh" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/teoria/formatos-pki",
    name: "feanor-teoria-formatos-pki",
    component: FeanorTeoriaView,
    props: { topicId: "formatos-pki" },
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/cifrado-cesar",
    name: "feanor-cifrado-cesar",
    component: FeanorCifradoCesarView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/atbash",
    name: "feanor-atbash",
    component: FeanorAtbashView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/xor",
    redirect: { name: "feanor-boolean-ops" },
  },
  {
    path: "/el-codice-de-feanor/nor-puertas-logicas",
    name: "feanor-boolean-ops",
    component: FeanorBooleanOpsView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/vigenere",
    name: "feanor-vigenere",
    component: FeanorVigenereView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/cifrado-afin",
    name: "feanor-affine",
    component: FeanorAffineView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/rail-fence",
    name: "feanor-rail-fence",
    component: FeanorRailFenceView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/operacion-modular",
    name: "feanor-modular",
    component: FeanorModularView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/base64",
    name: "feanor-base64",
    component: FeanorBase64View,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/base64url",
    name: "feanor-base64url",
    component: FeanorBase64UrlView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/url-encoding",
    name: "feanor-url-encoding",
    component: FeanorUrlEncodingView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/hexadecimal",
    name: "feanor-hex",
    component: FeanorHexView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/transformaciones",
    name: "feanor-transformaciones",
    component: FeanorTransformacionesView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/inspector-de-bytes",
    name: "feanor-inspector-bytes",
    component: FeanorInspectorBytesView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/banco-regex",
    name: "feanor-banco-regex",
    component: FeanorBancoRegexView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/json-y-diff",
    name: "feanor-json-diff",
    component: FeanorJsonDiffView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/esteganografia-metadatos/analizador",
    name: "feanor-estego-analizador",
    component: FeanorEstegoAnalizadorView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/esteganografia-metadatos/exif",
    name: "feanor-exif",
    component: FeanorExifView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/esteganografia-metadatos/editor",
    name: "feanor-metadata-editor",
    component: FeanorMetadataEditorView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/esteganografia-metadatos/incrustar",
    name: "feanor-estego-incrustar",
    component: FeanorEstegoIncrustarView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/esteganografia-metadatos/extraer",
    name: "feanor-estego-extraer",
    component: FeanorEstegoExtraerView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/esteganografia-metadatos/steghide-stegseek",
    name: "feanor-steghide-suite",
    component: FeanorSteghideSuiteView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/generador-de-secretos",
    name: "feanor-generador-secretos",
    component: FeanorGeneradorSecretosView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/analizador-de-entropia",
    name: "feanor-entropia",
    component: FeanorEntropiaView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/hash-hmac-pbkdf2",
    name: "feanor-hash",
    component: FeanorHashView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/hash-lookup-local",
    name: "feanor-hash-lookup",
    component: FeanorHashLookupView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/red-team/password-hash-cracker",
    name: "feanor-password-cracker",
    component: FeanorPasswordHashCrackerView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/red-team/hashcat-john-workbench",
    name: "feanor-hashcat-john-workbench",
    component: FeanorHashcatJohnWorkbenchView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/red-team/rainbow-tables",
    name: "feanor-rainbow-tables",
    component: FeanorRainbowTablesView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/hmac",
    name: "feanor-hmac",
    component: FeanorHmacView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/pbkdf2-hkdf",
    name: "feanor-kdf",
    component: FeanorKdfView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/pbkdf2",
    name: "feanor-pbkdf2",
    component: FeanorPbkdf2View,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/hkdf",
    name: "feanor-hkdf",
    component: FeanorHkdfView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/argon2",
    name: "feanor-argon2",
    component: FeanorArgon2View,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/scrypt",
    name: "feanor-scrypt",
    component: FeanorScryptView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/yescrypt",
    name: "feanor-yescrypt",
    component: FeanorYescryptView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/bcrypt",
    name: "feanor-bcrypt",
    component: FeanorBcryptView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/comparador-constante",
    name: "feanor-comparador-constante",
    component: FeanorComparadorConstanteView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/firma-json",
    name: "feanor-json-firma",
    component: FeanorFirmaJsonView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/cifrado-simetrico",
    name: "feanor-cifrado-simetrico",
    component: FeanorCifradoSimetricoView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/aead-aes-gcm",
    name: "feanor-aead",
    component: FeanorAeadView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/totp-hotp",
    name: "feanor-otp",
    component: FeanorOtpView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/jwt",
    name: "feanor-jwt",
    component: FeanorJwtView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/cifrado-asimetrico",
    name: "feanor-cifrado-asimetrico",
    component: FeanorCifradoAsimetricoView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/firma-digital",
    name: "feanor-firma-digital",
    component: FeanorFirmaDigitalView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/ecdh",
    name: "feanor-ecdh",
    component: FeanorEcdhView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/conversor-de-claves",
    name: "feanor-conversor-claves",
    component: FeanorConversorClavesView,
    meta: { showFeanorHeader: true },
  },
  {
    path: "/el-codice-de-feanor/inspector-x509",
    name: "feanor-inspector-x509",
    component: FeanorInspectorX509View,
    meta: { showFeanorHeader: true },
  },

  // VUELO DE THORONDOR
  {
    path: "/el-vuelo-de-thorondor",
    name: "thorondor-information",
    component: VueloThorondorView,
    meta: { showThorondorHeader: true },
  },
  {
    path: "/el-vuelo-de-thorondor/guia-de-instalacion",
    name: "thorondor-installation-guide",
    component: ThorondorGuiaInstalacionView,
    meta: { showThorondorHeader: true },
  },
  {
    path: "/el-vuelo-de-thorondor/generador-de-agentes",
    name: "thorondor-agent-generator",
    component: ThorondorGeneradorAgentesView,
    meta: { showThorondorHeader: true },
  },
  {
    path: "/el-vuelo-de-thorondor/dashboard-general",
    name: "thorondor-dashboard",
    component: ThorondorDashboardView,
    meta: { showThorondorHeader: true },
  },
  {
    path: "/el-vuelo-de-thorondor/detalle-de-hosts",
    name: "thorondor-host-detail",
    component: ThorondorDetalleHostsView,
    meta: { showThorondorHeader: true },
  },
  {
    path: "/el-vuelo-de-thorondor/reglas-de-monitorizacion",
    name: "thorondor-monitorization-rules",
    component: ThorondorReglasMonitorizacionView,
    meta: { showThorondorHeader: true },
  },
  {
    path: "/el-vuelo-de-thorondor/agentes",
    name: "thorondor-agents",
    component: ThorondorAgentesView,
    meta: { showThorondorHeader: true },
  },

  // BASTÓN DE SARUMAN
  {
    path: "/el-baston-de-saruman",
    name: "el-baston-de-saruman",
    component: BastonSarumanView,
    meta: { showSarumanHeader: true },
  },
  {
    path: "/el-baston-de-saruman/modelo-osi",
    name: "saruman-modelo-osi",
    component: SarumanModeloOSIView,
    meta: { showSarumanHeader: true },
  },
  {
    path: "/el-baston-de-saruman/modelo-tcp-ip",
    name: "saruman-modelo-tcp-ip",
    component: SarumanModeloTCPIPView,
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
  },

  // CHAMPIÑONES DE RADAGAST
  {
    path: "/los-champiñones-de-radagast",
    alias: ["/los-champi%C3%B1ones-de-radagast"],
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
