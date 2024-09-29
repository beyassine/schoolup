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
                <v-btn variant="text" color="black" class="ma-2">
                    <h2>معلومات الحساب</h2>
                </v-btn>
            </router-link>
            <router-link class="text-decoration-none" to="adminsubs">
                <v-btn variant="text" color="black" class="ma-2">
                    <h2>المنخرطين</h2>
                </v-btn>
            </router-link>
            <router-link class="text-decoration-none" to="admin">
                <v-btn variant="text" color="#ff0090" class="ma-2">
                    <h2>القناة</h2>
                </v-btn>
            </router-link>
        </div>
        <v-divider class="ma-3"></v-divider>
        <v-row class="d-flex mt-3">
            <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="mx-auto my-12" elevation="0">

                    <v-img cover height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <v-card-item>
                        <v-card-title class="mb-3">
                            <h3> Course Title</h3>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="me-1">Course Description</span>
                        </v-card-subtitle>
                    </v-card-item>
                    <v-divider class="mx-4 mb-1"></v-divider>
                    <div class="d-flex justify-center">
                        <router-link class="text-decoration-none" to="playlist">
                            <v-btn theme="dark" color="#ff0090" size="large" elevation="0" class="ma-3">
                                <h3>شاهد</h3>
                            </v-btn>
                        </router-link>
                    </div>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="mx-auto my-12" elevation="0">

                    <v-img cover height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <v-card-item>
                        <v-card-title class="mb-3">
                            <h3> Course Title</h3>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="me-1">Course Description</span>
                        </v-card-subtitle>
                    </v-card-item>

                    <v-divider class="mx-4 mb-1"></v-divider>

                    <div class="d-flex justify-center">
                        <router-link class="text-decoration-none" to="playlist">
                            <v-btn theme="dark" color="#ff0090" size="large" elevation="0" class="ma-3">
                                <h3>شاهد</h3>
                            </v-btn>
                        </router-link>
                    </div>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="mx-auto my-12" elevation="0">

                    <v-img cover height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <v-card-item>
                        <v-card-title class="mb-3">
                            <h3> Course Title</h3>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="me-1">Course Description</span>
                        </v-card-subtitle>
                    </v-card-item>

                    <v-divider class="mx-4 mb-1"></v-divider>

                    <div class="d-flex justify-center">
                        <router-link class="text-decoration-none" to="playlist">
                            <v-btn theme="dark" color="#ff0090" size="large" elevation="0" class="ma-3">
                                <h3>شاهد</h3>
                            </v-btn>
                        </router-link>
                    </div>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="mx-auto my-12" elevation="0">

                    <v-img cover height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <v-card-item>
                        <v-card-title class="mb-3">
                            <h3> Course Title</h3>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="me-1">Course Description</span>
                        </v-card-subtitle>
                    </v-card-item>

                    <v-divider class="mx-4 mb-1"></v-divider>

                    <div class="d-flex justify-center">
                        <router-link class="text-decoration-none" to="playlist">
                            <v-btn theme="dark" color="#ff0090" size="large" elevation="0" class="ma-3">
                                <h3>شاهد</h3>
                            </v-btn>
                        </router-link>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import MuxPlayer from "@mux/mux-player";

export default {
    name: 'Admin',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
            videosrc: '',
        };
    },
    methods: {
        playVideo() {
            this.videosrc = 'EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs'
        }
    }

}
</script>
<style>
.container {
    padding-left: 15%;
    padding-right: 15%;
}
</style>