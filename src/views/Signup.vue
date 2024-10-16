<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-card class="pa-3">
            <v-form v-model="valid">
                <h2 class="text-center mb-2">أنشئ حسابك</h2>
                <v-row class="d-flex flex-row-reverse mt-5">
                    <v-col cols="12">
                        <h3 class="mb-3 text-right">الإسم الكامل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h3>
                        <v-text-field prepend-inner-icon="" type="text" outlined v-model="username"
                            :rules="Required"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="mb-3 text-right">البريد الإلكتروني<v-icon class="ml-2">mdi-email-outline</v-icon>
                        </h3>
                        <v-text-field :rules="emailRules" v-model="email" required></v-text-field>
                    </v-col>
                    <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                        <h3 class="mb-3 text-right">كلمة المرور<v-icon class="ml-2">mdi-lock-outline</v-icon></h3>
                        <v-text-field :prepend-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible1 ? 'text' : 'password'" outlined v-model="password1" :rules="passwordRules"
                            @click:prepend-inner="visible1 = !visible1"></v-text-field>
                    </v-col>
                    <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                        <h3 class="mb-3 text-right">تأكيد كلمة المرور<v-icon class="ml-2">mdi-lock-outline</v-icon></h3>
                        <v-text-field :prepend-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible2 ? 'text' : 'password'" type="password" outlined v-model="password2"
                            :rules="confirmpassworRules" required
                            @click:prepend-inner="visible2 = !visible2"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn :disabled="!valid" :loading="loading" class="mt-5 text-white" color="#ff0090" size="large"
                    elevation="0" block dark @click="register">
                    <h3>تابع</h3>
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";


export default {
    name: 'Admin',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
            valid: false,
            username: '',
            email: '',
            password1: '',
            password2: '',
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
        };
    },
    methods: {
        register() {
            this.loading = true
            const fd = {
                username: this.username,
                email: this.email,
                password: this.password1,
                profile_img: 'test',
            };
            axios
                .post(`/user/create`, fd)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                        this.$router.push({
                            name: "login",
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        
    },

    mounted() {
    },


}
</script>
<style>
.container {
    padding-top: 5%;
    padding-left: 15%;
    padding-right: 15%;
}

#local_stream {
    width: 100%;
    height: 480px;
    transform: scaleX(-1);
    /* Disable mirroring for local stream */
}
</style>