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

//Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()


//router
import router from './router'

// axios
import axios from 'axios'
//https://schoolupapi.live
//http://127.0.0.1:8000
axios.defaults.baseURL = 'https://schoolupapi.live'



// Create App
const app=createApp(App).use(vuetify).use(pinia).use(router)
app.mount('#app');

// Check if the user is authenticated when the app is created

import { useAuth } from './store/auth'; // Import the store

const authStore = useAuth(); // Initialize the auth store

// Restore the user from localStorage if available
const storedUser = localStorage.getItem('user');
if (storedUser) {
  authStore.user = JSON.parse(storedUser); // Set user data from localStorage
}  
  
// Global navigation guard here to protect routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('login'); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the route
  }
});