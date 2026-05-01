import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/realm-subheaders.css'
import './assets/styles/view-system.css'
import './assets/styles/view-themes.css'
import './assets/styles/thorondor-theme.css'

document.documentElement.lang = 'es'
document.documentElement.dir = 'ltr'

createApp(App).use(store).use(router).mount('#app')
