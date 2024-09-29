<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <div class="d-flex flex-no-wrap justify-end">
            <div class="text-right">
                <v-card-title>
                    <h4> {{ teacherName }}</h4>
                </v-card-title>
                <v-card-title class="">
                    <h5>: المستويات</h5>
                    <h5>سلك الثانوي<v-icon icon="mdi-check" color="green-lighten-1" type="text" size="large"></v-icon>
                    </h5>
                </v-card-title>
                <v-card-title class="">
                    <h5>: المواد</h5>
                    <h5>الرياضيات<v-icon icon="mdi-check" color="green-lighten-1" type="text" size="large"></v-icon>
                    </h5>
                </v-card-title>
            </div>

            <v-avatar class="ma-3" :size="$vuetify.display.smAndUp ? '200':'100'" rounded="0">
                <v-img :src="profileImg" cover ></v-img>
            </v-avatar>
        </div>
        <v-divider class="ma-3"></v-divider>
        <v-row class="d-flex mt-3 d-flex flex-row-reverse ">
            <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                <h2 class="text-right mb-4 text-decoration-underline">قائمة الدروس</h2>
                <v-card v-for="(course, index) in courses" :key="course.id" class="mb-2" :to="{
                    name: 'Course',
                    params: { courseId: course.id },
                }">
                    <v-card-text class="py-0 ma-2">
                        <v-row align="center" no-gutters>
                            <v-col class="" cols="2">
                                <v-icon icon="mdi-chevron-left" color="#ff0090" type="text" size="x-large"></v-icon>
                            </v-col>

                            <v-col cols="10" class=" text-h6 text-right">
                                {{ course.coursename }}
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                <h2 class="text-right mb-4 text-decoration-underline">أقسام عن بعد</h2>
                <v-card class="mx-auto" elevation="2">
                    <v-card-item>
                        <div>
                            <div class=" text-right text-pink-lighten-1 mb-5">
                                <h2 class="font-weight-black "> 100 DH</h2>
                                <h5 class="">شهري</h5>
                            </div>
                            <div class="text-right mb-2">
                                <h3>المادة : الرياضيات -</h3>
                            </div>
                            <div class="text-right mb-2">
                                <h3>المستوى : ثانية باكلوريا -</h3>
                            </div>
                            <div class="text-right mb-2">
                                <h3>18h00 التوقيت : الإثنين-الخميس -</h3>
                            </div>
                            <div class="text-right mb-2">
                                <h3>1h30 : مدة الحصة -</h3>
                            </div>
                        </div>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn disabled="true" rounded="pill" color="pink-lighten-1" size="x-large" variant="elevated"
                            class="text-center mt-5" block>
                            <h4>إنخرط في القسم</h4>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";

export default {
    name: 'Profile',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
            userId: this.$route.params.userId,
            teacherName: '',
            teacherDescription: '',
            profileImg: '',
            courses: '',

        };
    },
    methods: {
    },
    created() {
        axios
            .get(`/user/get/${this.userId}`)
            .then((response) => {
                console.log(response.data)
                this.teacherName = response.data.username
                this.profileImg = response.data.profile_img
                this.courses = response.data.courses
            })
            .catch((err) => { });
    }

}
</script>
<style>
.container {
    padding-left: 15%;
    padding-right: 15%;
}
</style>