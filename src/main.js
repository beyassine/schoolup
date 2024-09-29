import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    components,
    directives,
})

// mdi icons
import '@mdi/font/css/materialdesignicons.css'

//router
import router from './router'


// axios
import axios from 'axios'
//https://schoolupapi.live
//http://127.0.0.1:8000
axios.defaults.baseURL = 'https://schoolupapi.live'


// Create App
const app=createApp(App).use(vuetify).use(router)
app.mount('#app');