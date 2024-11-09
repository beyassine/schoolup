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