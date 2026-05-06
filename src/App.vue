<template>
  <div :class="['app-shell', { 'app-shell--secondary-header': showSecondaryHeader }]">
    <Header v-if="showHeader" />
    <HeaderSaruman v-if="showSarumanHeader" />
    <HeaderGimli v-if="showGimliHeader" />
    <HeaderBoromir v-if="showBoromirHeader" />
    <HeaderNazgul v-if="showNazgulHeader" />
    <HeaderBiblioteca v-if="showBibliotecaHeader" />
    <HeaderCelebrimbor v-if="showCelebrimborHeader" />
    <HeaderSauron v-if="showSauronHeader" />
    <HeaderPalantir v-if="showPalantirHeader" />
    <HeaderRadagast v-if="showRadagastHeader" />
    <HeaderThorondor v-if="showThorondorHeader" />
    <HeaderFeanor v-if="showFeanorHeader" />
    <router-view />
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import HeaderSaruman from './components/HeaderSaruman.vue'
import HeaderGimli from './components/HeaderGimli.vue'
import HeaderBoromir from './components/HeaderBoromir.vue'
import HeaderNazgul from './components/HeaderNazgul.vue'
import HeaderBiblioteca from './components/HeaderBiblioteca.vue'
import HeaderCelebrimbor from './components/HeaderCelebrimbor.vue'
import HeaderSauron from './components/HeaderSauron.vue'
import HeaderPalantir from './components/HeaderPalantir.vue'
import HeaderRadagast from './components/HeaderRadagast.vue'
import HeaderThorondor from './components/HeaderThorondor.vue'
import HeaderFeanor from './components/HeaderFeanor.vue'

export default {
  name: "App",
  components: { Header, Footer, HeaderSaruman, HeaderGimli, HeaderBoromir, HeaderNazgul, HeaderBiblioteca, HeaderCelebrimbor, HeaderSauron, HeaderPalantir, HeaderRadagast, HeaderThorondor, HeaderFeanor },
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
    },
    showCelebrimborHeader() {
      return this.$route?.meta?.showCelebrimborHeader;
    },
    showSauronHeader() {
      return this.$route?.meta?.showSauronHeader;
    },
    showPalantirHeader() {
      return this.$route?.meta?.showPalantirHeader;
    },
    showRadagastHeader() {
      return this.$route?.meta?.showRadagastHeader;
    },
    showThorondorHeader() {
      return this.$route?.meta?.showThorondorHeader;
    },
    showFeanorHeader() {
      return this.$route?.meta?.showFeanorHeader;
    },
    showSecondaryHeader() {
      return Boolean(
        this.showSarumanHeader ||
        this.showGimliHeader ||
        this.showBoromirHeader ||
        this.showNazgulHeader ||
        this.showBibliotecaHeader ||
        this.showCelebrimborHeader ||
        this.showSauronHeader ||
        this.showPalantirHeader ||
        this.showRadagastHeader ||
        this.showThorondorHeader ||
        this.showFeanorHeader
      );
    }
  }
}
</script>

<style>
* {
  caret-color: transparent;
  box-sizing: border-box;
}

:root {
  --main-header-height: 52px;
  --secondary-header-height: 54px;
  --header-banner-gap: 2px;
  --cursor-default: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M4%203l13%2012-6.7%201.1%203.1%205.9-2.2%201.1-3.1-5.8L3.8%2021z%22%20fill%3D%22%23f8f1df%22%20stroke%3D%22%2318110a%22%20stroke-width%3D%221.5%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E") 3 3;
  --cursor-pointer: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M8%2012V5.5a1.6%201.6%200%200%201%203.2%200V11h.5V8.2a1.5%201.5%200%201%201%203%200V11h.5V9.1a1.45%201.45%200%201%201%202.9%200v2h.5v-.9a1.45%201.45%200%201%201%202.9%200V15c0%204-2.4%206.6-6.3%206.6h-2.1c-2.1%200-3.6-.8-4.8-2.4l-3.4-4.7a1.6%201.6%200%200%201%202.5-2z%22%20fill%3D%22%23f8f1df%22%20stroke%3D%22%2318110a%22%20stroke-width%3D%221.35%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E") 7 4;
  --cursor-text: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%2220%22%20viewBox%3D%220%200%208%2020%22%3E%3Cpath%20d%3D%22M2%202h4M4%202v16M2%2018h4%22%20fill%3D%22none%22%20stroke%3D%22%23d4af37%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E") 4 10;
  --cursor-not-allowed: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%227.4%22%20fill%3D%22%23f8f1df%22%20stroke%3D%22%2318110a%22%20stroke-width%3D%221.4%22%2F%3E%3Cpath%20d%3D%22M5.2%2014.8%2014.8%205.2%22%20stroke%3D%22%239b1c1c%22%20stroke-width%3D%222.1%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E") 10 10;
  --cursor-zoom-in: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ccircle%20cx%3D%2210.5%22%20cy%3D%2210.5%22%20r%3D%226.7%22%20fill%3D%22%23f8f1df%22%20stroke%3D%22%2318110a%22%20stroke-width%3D%221.7%22%2F%3E%3Cpath%20d%3D%22M10.5%207.5v6M7.5%2010.5h6M15.5%2015.5%2021%2021%22%20stroke%3D%22%2318110a%22%20stroke-width%3D%221.9%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E") 10 10;
}

html,
body {
  cursor: var(--cursor-default), auto;
}

input,
textarea,
[contenteditable="true"] {
  cursor: var(--cursor-text), text;
}

button,
a,
select,
summary,
label,
[role="button"],
input[type="button"],
input[type="submit"],
input[type="reset"],
.logo,
.sub-item,
.nav-item {
  cursor: var(--cursor-pointer), pointer;
}

button:disabled,
input:disabled,
textarea:disabled,
select:disabled,
[aria-disabled="true"] {
  cursor: var(--cursor-not-allowed), not-allowed;
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

.app-shell.app-shell .hero-banner {
  margin-top: calc(var(--main-header-height) + var(--header-banner-gap)) !important;
}

.app-shell.app-shell.app-shell--secondary-header .hero-banner {
  margin-top: calc(var(--main-header-height) + var(--secondary-header-height) + var(--header-banner-gap)) !important;
}

.app-shell.app-shell .hero-banner > img {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

input,
textarea,
select {
  caret-color: #d4af37;
}
</style>
