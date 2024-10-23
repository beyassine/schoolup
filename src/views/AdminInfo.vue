<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-row class="d-flex">
            <v-col cols="12">
                <h2 class="text-center mb-5">إعدادات
                    <v-icon icon="mdi-cog-outline" class="ml-2" size="large"></v-icon>
                </h2>
                <v-divider></v-divider>
                <v-card class="pa-3 mt-5">
                    <div class="text-right">
                        <h3> : الإسم الكامل -</h3>
                        <h3 class="mt-2 mr-2">Berred Yassine</h3>
                    </div>
                    <div class="text-right mt-3">
                        <h3> : البريد الإلكتروني -</h3>
                        <h3 class="mt-2 mr-2">berred.yassine@gmail.com</h3>
                    </div>
                    <div class="text-right mt-3">
                        <h3> : تاريخ الإشتراك -</h3>
                        <h3 class="mt-2 mr-2">20/10/2024</h3>
                    </div>
                </v-card>
            </v-col>
        </v-row>
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