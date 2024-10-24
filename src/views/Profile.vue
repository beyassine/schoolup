<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-card class="d-flex flex-no-wrap justify-end" elevation="0" color="grey-lighten-4">
            <div class="text-right" color="grey">
                <v-card-title>
                    <h4> {{ userName }}</h4>
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
            <v-avatar class="ma-3" :size="$vuetify.display.smAndUp ? '200' : '100'" rounded="0">
                <v-img :src="profileImg" cover></v-img>
            </v-avatar>
        </v-card>
        <v-row class="d-flex mt-3 d-flex flex-row-reverse ">
            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مباشرة
                    <v-icon icon="mdi-cast-education" class="ml-2" size="large"></v-icon>
                </h2>
                <v-card class="mx-auto" elevation="0">
                    <!-- <div class="" v-if="isHostLive && !isJoined">
                        <v-btn  @click="joinLiveStream" rounded="" color="pink-lighten-1"
                            size="large" class="text-center ma-5" >
                            <h4>تابع البث
                                <v-icon icon="mdi-cast-audio-variant"></v-icon>
                            </h4>
                        </v-btn>
                    </div> -->
                    <!-- Video.js video player -->

                    <div >
                        <h4 class="text-center ma-2">لا يوجد بث مباشر الآن</h4>
                    </div>
                </v-card>
                <pinkdivider />
            </v-col>
            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مسجلة
                    <v-icon icon="mdi-monitor-account" class="ml-2" size="large"></v-icon>
                </h2>
                <v-card v-for="(course, index) in courses" :key="course.id" class="mb-2" :to="{
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";
import videojs from "video.js";
import "video.js/dist/video-js.css";

//Agora
import AgoraRTC from "agora-rtc-sdk-ng";
import { markRaw } from 'vue';

import pinkdivider from '../components/pinkdivider.vue'

export default {
    name: 'Profile',

    setup() {
        const { display } = useDisplay();
    },

    components: {
        pinkdivider
    },

    data() {
        return {
            userId: this.$route.params.userId,
            userName: '',
            teacherDescription: '',
            profileImg: '',
            courses: '',
            //Agora
            appId: "e11d8e22b6544ff7ba5a917d9b5396e8", // Replace with your Agora App ID
            token: "", // You can generate tokens from your FastAPI backend (optional for simple testing)
            channel: "test", // Channel name for your live stream
            client: null,
            localTracks: null,
            hostUID: null,
            uid: Math.floor(1000 + Math.random() * 9000),
            isHostLive: false,
            isJoined: false,

        };
    },
    methods: {
        initVideoPlayer() {
            if (!this.player) {
                this.player = videojs(this.$refs.videoPlayer, {
                    controls: true,
                    autoplay: true,
                    preload: "auto",
                    fluid: true, // Responsive player
                });
            }
        },
        //Agora
        async getToken(channel, uid, role) {
            try {
                const response = await axios.post('https://agora-server-ten.vercel.app/api/token', {
                    channel,
                    uid,
                    role,
                });
                return response.data.token;
            } catch (error) {
                console.error('Error fetching token:', error);
                throw error;
            }
        },

        initializeRTCClient() {
            // Initialize Agora client and make it non-reactive
            this.client = markRaw(AgoraRTC.createClient({ mode: "live", codec: "vp8" }));
        },

        async checkLive() {
            try {
                // Initialize the Agora client
                this.initializeRTCClient();

                // Get token from backend
                const tokenResponse = await this.getToken(this.channel, this.uid, 'host');
                this.token = tokenResponse;

                // Set the audience role (this will only work if the client is initialized properly)
                await this.client.setClientRole("audience");

                // Join the channel with the token
                await this.client.join(this.appId, this.channel, this.token, this.uid);


                // Listen for the stream being added (i.e., host starts streaming)
                this.client.on('user-published', (user, mediaType) => {
                    this.hostUID = user.uid
                    if (mediaType === 'video') {
                        this.isHostLive = true; // Update the state to show the "Join" button
                    }
                });

                // Listen for the stream being removed (i.e., host stops streaming)
                this.client.on('user-unpublished', (user, mediaType) => {
                    if (mediaType === 'video') {
                        this.isHostLive = false; // Hide the "Join" button
                    }
                });
            } catch (error) {
                console.error("Error joining as audience:", error);
            }
        },
        async joinLiveStream() {
            try {
                await this.client.subscribe(this.hostUID, "video");
                const hostVideoTrack = this.client.remoteUsers.find(user => user.uid === this.hostUID).videoTrack;
                this.initVideoPlayer();
                const remotePlayerContainer = this.$refs.videoPlayer;
                if (!remotePlayerContainer) {
                    console.error("Element with ID 'remote_stream' not found.");
                    return;
                }
                if (hostVideoTrack) {
                    hostVideoTrack.play(remotePlayerContainer);
                } else {
                    console.error("No video track found for the host.");
                }

                this.isJoined = true;
            } catch (error) {
                console.error("Error joining live stream:", error);
            }
        },

        // Clean up when leaving the channel
        async leaveChannel() {
            try {
                // Unpublish local tracks
                await this.client.unpublish([this.localTracks.videoTrack, this.localTracks.audioTrack]);

                // Stop the local tracks
                this.localTracks.videoTrack.close();
                this.localTracks.audioTrack.close();

                // Leave the channel
                await this.client.leave();

                console.log("Host has left the channel");
            } catch (error) {
                console.error("Error leaving the channel:", error);
            }
        },

    },
    mounted() {
        // Chek if Live     
        this.checkLive();
    },
    beforeDestroy() {
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

#remote_stream {
    width: 100%;
    /* Ensure video takes full width */
    height: auto;
    /* Maintain aspect ratio */
    object-fit: contain;
    /* Ensures the video is not truncated */
    transform: scaleX(1);
    /* Ensure no mirroring for remote stream */
}
</style>