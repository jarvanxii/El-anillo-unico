<template>
  <Header v-if="showHeader" />
  <HeaderSaruman v-if="showSarumanHeader" />
  <HeaderGimli v-if="showGimliHeader" />
  <HeaderBoromir v-if="showBoromirHeader" />
  <HeaderNazgul v-if="showNazgulHeader" />
  <HeaderBiblioteca v-if="showBibliotecaHeader" />
  <router-view />
  <Footer v-if="showFooter" />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import HeaderSaruman from './components/HeaderSaruman.vue'
import HeaderGimli from './components/HeaderGimli.vue'
import HeaderBoromir from './components/HeaderBoromir.vue'
import HeaderNazgul from './components/HeaderNazgul.vue'
import HeaderBiblioteca from './components/HeaderBiblioteca.vue'

export default {
  name: "App",
  components: { Header, Footer, HeaderSaruman, HeaderGimli, HeaderBoromir, HeaderNazgul, HeaderBiblioteca },
  computed: {
    showHeader() {
      return this.$route?.meta?.showHeader !== false;
    },
    showFooter() {
      return this.$route?.meta?.showFooter !== false;
    },
    showSarumanHeader() {
      return this.$route?.meta?.showSarumanHeader;
    },
    showGimliHeader() {
      return this.$route?.meta?.showGimliHeader;
    },
    showBoromirHeader() {
      return this.$route?.meta?.showBoromirHeader;
    },
    showNazgulHeader() {
      return this.$route?.meta?.showNazgulHeader;
    },
    showBibliotecaHeader() {
      return this.$route?.meta?.showBibliotecaHeader;
    }
  }
}
</script>

<style>
* {
  caret-color: transparent;
  box-sizing: border-box;
}

/* Quitar cursor de escritura en toda la web */
html,
body,
div,
span,
section,
main,
nav,
header,
footer,
article,
aside,
p,
h1,
h2,
h3,
h4,
h5,
h6,
a,
li,
ul,
ol,
button {
  caret-color: transparent;
}

/* Mantener cursor normal donde sí se escribe */
input,
textarea,
select,
[contenteditable="true"] {
  caret-color: auto !important;
}

nav,
header,
button,
a,
.logo,
.sub-item,
.nav-item {
  user-select: none;
}

input,
textarea,
select,
[contenteditable="true"] {
  caret-color: #d4af37 !important;
}

body {
  margin: 0;
  background: #0b0f17;
  color: #e6e0d4;
  caret-color: transparent;
}

input,
textarea,
select {
  caret-color: #d4af37;
}
</style>