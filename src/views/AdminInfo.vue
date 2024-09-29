<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">

        <div class="d-flex flex-no-wrap justify-center">
            <v-avatar class="ma-3" size="120" rounded="0">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
            </v-avatar>
        </div>
        <div class="d-flex flex-no-wrap align-center justify-center">
            <v-card-title class="text-h5">
                Creator Name
            </v-card-title>
        </div>
        <div class="d-flex flex-no-wrap justify-center justify-center">
            <router-link class="text-decoration-none" to="admininfo">
                <v-btn variant="text" color="#ff0090" class="ma-2">
                    <h2>معلومات الحساب</h2>
                </v-btn>
            </router-link>
            <router-link class="text-decoration-none" to="adminsubs">
                <v-btn variant="text" color="black" class="ma-2">
                    <h2>المنخرطين</h2>
                </v-btn>
            </router-link>
            <router-link class="text-decoration-none" to="admin">
                <v-btn variant="text" color="black" class="ma-2">
                    <h2>القناة</h2>
                </v-btn>
            </router-link>
        </div>
        <v-divider class="ma-3"></v-divider>
        <v-card class="pa-3">
            <div class="text-right">
                <h3> : الإسم الكامل -</h3>
                <h3 class="mt-2 mr-2" >Berred Yassine</h3>
            </div>
            <div class="text-right mt-3">
                <h3> : البريد الإلكتروني -</h3>
                <h3 class="mt-2 mr-2" >berred.yassine@gmail.com</h3>
            </div>
            <div class="text-right mt-3">
                <h3> : تاريخ الإشتراك -</h3>
                <h3 class="mt-2 mr-2" >20/10/2024</h3>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";

export default {
    name: 'Admin',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
        };
    },
    methods: {
    }

}
</script>
<style>
.container {
    padding-left: 15%;
    padding-right: 15%;
}
</style>