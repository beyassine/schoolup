<template>
    <div class="hero">
        <v-row class="d-flex justify-center align-center mt-2">
            <v-col>
                <v-img :height="$vuetify.display.mdAndUp ? '500' : '200'" :src="hero_img" rounded="1"></v-img>
            </v-col>
            <v-col class="text-right" cols="12" md="6">
                <div class=" text-h4 font-weight-black mb-5">
                    أفضل طريقة للتعلم عبر الأنترنيت</div>
                <div class="text-h5 mt-3 mb-5">
                    دروس خصوصية مباشرة وفيديوهات تعليمية مقدمة من نخبة الأساتذة لمساعدتك على تحقيق النجاح
                    الأكاديمي
                </div>
            </v-col>
        </v-row>
    </div>    
    <div class="d-flex justify-center mb-5">
        <v-img :src="spinkstar" height="60"></v-img>
    </div>
    <div class=" text-center text-h4 font-weight-black mt-5">
        أساتذتنا 
    </div>
    <v-row class="d-flex flex-row-reverse justify-center mt-2 mb-5">
        <v-col class="d-flex justify-center" :cols="$vuetify.display.mdAndUp ? '4' : '12'">
            <v-card class="d-flex flex-no-wrap justify-end fill-height mt-3" :width="$vuetify.display.smAndUp ? '500':''" >
                <div class="text-right">
                    <v-card-title>
                        <h4>Saifeddine Brouzi</h4>
                    </v-card-title>
                    <v-card-title class="">
                        <h5>: المستويات</h5>
                        <h5>سلك الثانوي<v-icon icon="mdi-check" color="green-lighten-1" type="text"
                                size="large"></v-icon>
                        </h5>
                    </v-card-title>
                    <v-card-title class="">
                        <h5 class="font-weight-bold">: المواد</h5>
                        <h5>الرياضيات<v-icon icon="mdi-check" color="green-lighten-1" type="text" size="large"></v-icon>
                        </h5>
                    </v-card-title>
                    <router-link class="text-decoration-none" :to="{
                        name: 'Profile',
                        params: { userId: '5518db98-c5eb-4387-9330-a439bb039efd' },

                    }">
                        <v-btn rounded="" color="pink-lighten-1" size="large" class="text-center ma-5" block>
                            <h4>صفحة الأستاذ</h4>
                        </v-btn>
                    </router-link>
                </div>
                <v-avatar class="ma-2" :size="$vuetify.display.smAndUp ? '120' : '100'" rounded="0">
                    <v-img src="https://matjariimages.s3.amazonaws.com/saif.jpg" cover></v-img>
                </v-avatar>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import logo from "../assets/logo.png";
import { useDisplay } from "vuetify";


import spinkstar from "../assets/material/pinkstar.png";
import hero_img from "../assets/hero.png";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
            hero_img: hero_img,
            logo: logo,
            spinkstar: spinkstar,
        };
    },

    methods: {},
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";

.hero {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 50px;
}

.text-h3 {
    line-height: 5rem;
    font-family: $body-font-family !important;
}

.text-h4 {
    line-height: 3rem;
    letter-spacing: 0.03rem !important;
    font-family: $body-font-family !important;
}

.text-h5 {
    font-family: $body-font-family !important;
}

.text-h6 {
    font-family: $body-font-family !important;
}

.text-subtitle-1 {
    font-family: $body-font-family !important;
}
</style>