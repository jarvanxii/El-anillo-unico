<template>
  <Header v-if="showHeader" />
  <router-view />
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: "App",
  components: { Header },
  computed: {
    showHeader() {
      return this.$route?.meta?.showHeader !== false;
    }
  }
}
</script>

<style>
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

* {
  caret-color: transparent;
}

input,
textarea,
select,
[contenteditable="true"] {
  caret-color: #d4af37 !important;
}

* {
  box-sizing: border-box;
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