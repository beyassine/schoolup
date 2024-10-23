<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-row class="d-flex">
            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مسجلة
                    <v-icon icon="mdi-monitor-account" class="ml-2" size="large"></v-icon>
                </h2>
                <v-divider></v-divider>
                <v-card class="mt-5 pa-3">
                    <v-form v-model="valid">
                        <h2 class="text-center mb-2">أضف درس جديد</h2>
                        <v-row class="d-flex flex-row-reverse justify-center mt-5">
                            <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                                <h3 class="mb-3 text-right">عنوان الدرس<v-icon class="ml-2"></v-icon>
                                </h3>
                                <v-text-field v-model="coursename" required></v-text-field>
                            </v-col>
                            <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                                <h3 class="mb-3 text-right">المستوى الدراسي<v-icon class="ml-2"></v-icon>
                                </h3>
                                <v-select :items="schoolYears" item-title="text" item-value="value"
                                    v-model="school_year" required></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-btn :disabled="!valid" :loading="loading" rounded="" color="pink-lighten-1" size="large"
                                    class="text-center mb-2 " block @click="createCourse()">
                                    <h4>أضف</h4>
                                    <v-icon icon="mdi-plus" class="ml-2" size="large"></v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
                <v-card class="mt-5 pa-3">
                    <h2 class="text-center mb-2">قائمة الدروس</h2>
                    <div v-for="(courses, year) in groupedCourses" :key="year">
                        <h3 class="text-right ma-5">{{ yearTitles[year] || year }}
                            <v-icon icon="mdi-chevron-left" class="ml-2" size="large"></v-icon>
                        </h3>
                        <v-card v-for="course in courses" :key="course.id" class="mb-2" :to="{
                            name: 'course',
                            params: { courseId: course.id },
                        }">
                            <v-card-text class="py-0 ma-2">
                                <v-row align="center" no-gutters>
                                    <v-col class="" cols="2">
                                        <v-icon icon="mdi-chevron-left" color="#ff0090" type="text"
                                            size="x-large"></v-icon>
                                    </v-col>

                                    <v-col cols="10" class=" text-h6 text-right">
                                        {{ course.coursename }}
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";

import pinkdivider from '../components/pinkdivider.vue'

export default {
    name: 'Admin',

    setup() {
        const { display } = useDisplay();
    },

    components: {
        pinkdivider
    },

    data() {
        return {
            userId: this.$route.params.userId,
            courses: '',
            //form
            valid: false,
            loading:false,
            coursename: '',
            school_year: '',
            schoolYears: [
                { value: 'c1', text: "السنة أولى إعدادي" },
                { value: 'c2', text: "السنة ثانية إعدادي" },
                { value: 'c3', text: "السنة ثالثة إعدادي" },
                { value: 'l1', text: "السنة أولى ثانوي" },
                { value: 'l2', text: "السنة أولى باكلوريا" },
                { value: 'l3', text: "السنة ثانية باكلوريا" },
            ]
        };
    },
    computed: {
        // Mapping school_year codes to titles
        yearTitles() {
            return {
                c1: "السنة أولى إعدادي",
                c2: "السنة ثانية إعدادي",
                c3: "السنة ثالثة إعدادي",
                l1: "السنة أولى ثانوي",
                l2: "السنة أولى باكلوريا",
                l3: "السنة ثانية باكلوريا",
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
                return grouped;

            }
        },
    },
    methods: {
        getCourses(){
        axios
            .get(`/user/get/${this.userId}`)
            .then((response) => {
                this.userName = response.data.username
                this.profileImg = response.data.profile_img
                this.courses = response.data.courses
            })
            .catch((err) => { });

        },
        createCourse() {
            this.loading = true
            const fd = {
                user_id: this.userId,
                coursename: this.coursename,
                description:'',
                coursethumbnail:'',
                author:'',
                school_year: this.school_year,
            }

            axios.post(`/course/create`, fd).then((response) => {
                if (response.status === 200) {
                    this.getCourses()
                    this.loading=false
                }
            });
        }


    },
    created() {
        this.getCourses()
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