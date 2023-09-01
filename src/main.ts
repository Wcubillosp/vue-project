import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(VueCookies, { expires: '7d'})
app.mount('#app')
