<template>
    <v-container>
        <div class="d-flex justify-space-between mt-2 mb-2" v-if="!loading">
            <router-link class=" text-black" :to="{
                name: 'Profile',
                params: { userId: this.userId },

            }">
                <h4 class="text-left">
                    <v-icon icon="mdi-chevron-left" color="" type="text" size=""></v-icon>
                    صفحة الأستاذ
                </h4>
            </router-link>

            <h2 class="text-left" color="#ff0090">
                {{ this.courseTitle }}
            </h2>

        </div>
        <v-row class="d-flex mt-3">
            <v-col :cols="$vuetify.display.smAndUp ? '8' : '12'">
                <v-card elevation="0">
                    <v-card-text class="text-left mb-3">
                        <h2>{{ currentChapter.title }}</h2>
                    </v-card-text>
                    <v-card-text class="ma-1">
                        <mux-player id="videoPlayer" :playback-id=currentChapter.videosrc metadata-video-title="Test VOD"
                            metadata-viewer-user-id="user-id-007" autoplay></mux-player>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="" elevation="0">
                    <v-card-text class="text-right mb-3">
                        <h2>الفقرات</h2>
                    </v-card-text>
                </v-card>

                <v-card v-for="(chapter, index) in chapters" :key="chapter.id" elevation="0"
                    @click="playchapter(chapter)" :color="chapter.id == currentChapterId ? '#c0c0c0' : ''">
                    <v-card-text>
                        <div class="d-flex flex-no-wrap align-center">
                            <v-btn icon theme="dark" color="#ff0090">
                                <v-icon icon="mdi-play" size="large"></v-icon>
                            </v-btn>
                            <div>
                                <v-card-title class="text-h6">
                                    {{ chapter.title }}
                                </v-card-title>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import MuxPlayer from "@mux/mux-player";
import axios from "axios";

export default {
    name: 'PlayList',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
            courseId: this.$route.params.courseId,
            userId: '',
            courseTitle: '',
            authorName: '',
            videosrc: '',
            chapters: '',
            currentChapter: '',
            currentChapterId: '',
            loading: true // Add a loading state
        };
    },
    methods: {
        playchapter(chapter) {
            this.currentChapter = chapter
            this.currentChapterId = chapter.id
        }
    },
    created() {
        axios
            .get(`/course/get/${this.courseId}`)
            .then((response) => {
                this.courseTitle = response.data.coursename
                this.userId = response.data.user_id
                this.authorName = response.data.author
                this.chapters = response.data.chapters
                this.currentChapter = response.data.chapters[0]
                this.currentChapterId = response.data.chapters[0].id;

                this.loading = false;


            })
            .catch((err) => { });

    }


}
</script>
<style></style>