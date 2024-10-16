<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-card class="pa-3">
            <v-form v-model="valid">
                <h2 class="text-center mb-2">تسجيل الدخول</h2>
                <v-row class="d-flex flex-row-reverse mt-5">
                    <v-col cols="12">
                        <h3 class="mb-3 text-right">البريد الإلكتروني<v-icon class="ml-2">mdi-email-outline</v-icon>
                        </h3>
                        <v-text-field :rules="emailRules" v-model="email" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="mb-3 text-right">كلمة المرور<v-icon class="ml-2">mdi-lock-outline</v-icon></h3>
                        <v-text-field :prepend-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible1 ? 'text' : 'password'" outlined v-model="password1" :rules="Required"
                            @click:prepend-inner="visible1 = !visible1"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn :disabled="!valid" :loading="loading" class="mt-5 text-white" color="#ff0090" size="large"
                    elevation="0" block dark @click="login">
                    <h3>تابع</h3>
                </v-btn>
                <h5 v-if="incorrectAuth" class="text-right text-red mt-2">
                    البريد الإلكتروني أو كلمة المرور خاطئ
                </h5>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { useAuth } from "@/store/auth.js";
import { useDisplay } from "vuetify";

export default {
    name: 'Admin',

    setup() {
        const { display } = useDisplay();
        const store = useAuth();

        return { store }
    },

    components: {


    },

    data() {
        return {
            valid: false,
            fullname: '',
            email: '',
            password1: '',
            visible1: false,
            visible2: false,
            Required: [
                (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
            ],
            emailRules: [
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'البريد الإلكتروني خاطئ'
            ],
            passwordRules: [(v) => !!v || "أدخل كلمة المرور"],
            confirmpassworRules: [
                (v) => !!v || "أدخل كلمة المرور",
                (v) => v == this.password1 || "كلمة المرور غير متطابقة",
            ],
            loading: false,
            incorrectAuth: false,
        };
    },
    methods: {
        login() {
            this.loading = true;
            const fd = {
                email: this.email,
                password: this.password1
            };
            this.store.loginUser(fd)
                .then(() => {
                    this.loading = false;
                    this.$router.push({
                        name: "home",
                    })
                })
                .catch((err) => {
                    this.incorrectAuth = true;
                    this.loading = false;
                });
        },
    }

}
</script>
<style>
.container {
    padding-top: 5%;
    padding-left: 15%;
    padding-right: 15%;
}
</style>