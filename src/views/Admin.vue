<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">

        <div class="d-flex flex-no-wrap justify-center">
            <v-avatar class="ma-3" :size="$vuetify.display.smAndUp ? '200' : '100'" rounded="0">
                <v-img :src="profileImg" cover></v-img>
            </v-avatar>
        </div>
        <div class="d-flex flex-no-wrap align-center justify-center">
            <v-card-title class="text-h5">
                {{ userName }}
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

            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مباشرة
                    <v-icon icon="mdi-monitor-account" class="ml-2" size="large"></v-icon>
                </h2>
                <v-card class="d-flex justify-center" elevation="0">
                    <router-link :to="{
                        name: 'adminLive',
                        params: { userId: this.userId },

                    }">
                        <v-btn rounded="" color="pink-lighten-1" size="large" class="text-center ma-5">
                            <h3>درس مباشر جديد</h3>
                            <v-icon icon="mdi-plus" class="ml-2" size="large"></v-icon>
                        </v-btn>
                    </router-link>
                </v-card>
            </v-col>

            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مسجلة
                    <v-icon icon="mdi-monitor-account" class="ml-2" size="large"></v-icon>
                </h2>
                <div v-for="(courses, year) in groupedCourses" :key="year">
                    <h2>{{ yearTitles[year] || year }}</h2>
                    <v-card v-for="course in courses" :key="course.id" class="mb-2" :to="{
                        name: 'course',
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
                    <v-divider></v-divider>
                </div>
            </v-col>
        </v-row>
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
            userId: this.$route.params.userId,
            userName: '',
            teacherDescription: '',
            profileImg: '',
            courses: '',
        };
    },
    computed: {
        // Mapping school_year codes to titles
        yearTitles() {
            return {
                c1: "1ère année collège",
                c2: "2ème année collège",
                c3: "3ème année collège",
                l1: "1ère année lycée",
                l2: "2ème année lycée",
                l3: "3ème année lycée",
            };
        },
        // Grouping courses by school_year
        groupedCourses() {
            const grouped = {};
            if (this.courses) {

                this.courses.forEach((course) => {
                    if (!grouped[course.school_year]) {
                        grouped[course.school_year] = [];
                    }
                    grouped[course.school_year].push(course);
                });
                console.log(grouped)
                return grouped;

            }
        },
    },
    methods: {


    },
    created() {
        axios
            .get(`/user/get/${this.userId}`)
            .then((response) => {
                this.userName = response.data.username
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

#local_stream {
    width: 100%;
    height: 480px;
    transform: scaleX(1);
    /* Mirror the local video */
}
</style>