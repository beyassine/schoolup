import { defineStore } from "pinia";
import axios from "axios";
import { computed } from "vue";


var base = 'https://schoolupapi.live'
var localbase = 'http://127.0.0.1:8000'

const axiosInstance = axios.create({
    baseURL: localbase,
});


export const useAuth = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters: {

        isAuthenticated: (state) => state.user !== null,
    },
    actions: {
        loginUser(usercredentials) {
            return new Promise((resolve, reject) => {
                axiosInstance.post('/user/login', {
                    email: usercredentials.email,
                    password: usercredentials.password,
                }
                )
                    .then(response => {
                        if (response.status == 200) {
                            this.user = response.data
                            localStorage.setItem('accessToken', response.data.access_token);
                            localStorage.setItem('refreshToken', response.data.refresh_token);
                            localStorage.setItem('user', JSON.stringify({ user_id: response.data.id, username: response.data.username, }))
                            resolve()
                        }
                    }).catch(err => {
                        reject()
                    })
            })
        },

        logoutUser() {
            this.user=null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
        },

    }
})