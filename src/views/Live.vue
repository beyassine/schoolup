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
            <v-col :cols="$vuetify.display.mdAndUp ? '12' : '12'">
                <h2 class="text-center mb-5">دروس مباشرة
                    <v-icon icon="mdi-google-classroom" class="ml-2" size="large"></v-icon>
                </h2>
                <v-card class="mx-auto" elevation="0">
                    <h3 v-if="isHostLive" class="text-right ma-3">مباشر
                        <v-icon icon="mdi-circle" color="red" size=""></v-icon>
                    </h3>
                    <div>
                        <h2 v-if="isHostLive">The host is live!</h2>
                        <button v-if="isHostLive && !isJoined" @click="joinLiveStream">Join Live Stream</button>
                        <p v-else>The host is not live right now.</p>
                        <div id="remote_stream" style="width: 800px; height: 360px; background-color: #000;"></div>
                    </div>
                    <v-card-item>
                        <div><!-- 
                            <div class=" text-right text-pink-lighten-1 mb-5">
                                <h2 class="font-weight-black "> 100 DH</h2>
                                <h5 class="">شهري</h5>
                            </div> -->
                            <div class="text-right mb-2">
                                <h4>المادة : الرياضيات -</h4>
                            </div>
                            <div class="text-right mb-2">
                                <h4>المستوى : ثانية باكلوريا -</h4>
                            </div><!-- 
                            <div class="text-right mb-2">
                                <h3>18h00 التوقيت : الإثنين-الخميس -</h3>
                            </div>
                            <div class="text-right mb-2">
                                <h3>1h30 : مدة الحصة -</h3>
                            </div> -->
                        </div>
                    </v-card-item>
                </v-card>
                <pinkdivider />
            </v-col>
            <v-col :cols="$vuetify.display.mdAndUp ? '6' : '12'">
                <h2 class="text-center mb-5">دروس مسجلة
                    <v-icon icon="mdi-monitor-account" class="ml-2" size="large"></v-icon>
                </h2>
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
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";

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
            uid: 2,
            isHostLive: false,
            isJoined: false,

        };
    },
    methods: {
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
                if (this.hostUID !== null) {
                    // Subscribe to the host's video track when the user clicks "Join"
                    await this.client.subscribe(this.hostUID, "video");

                    const remotePlayerContainer = document.getElementById("remote_stream");
                    remotePlayerContainer.innerHTML = ''; // Clear any previous stream content

                    // Play the host's video track in the remote_stream div
                    const hostVideoTrack = this.client.remoteUsers.find(user => user.uid === this.hostUID).videoTrack;
                    hostVideoTrack.play("remote_stream");

                    this.isJoined = true; // Mark as joined
                    console.log("Joined live stream.");
                }
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
#remote_stream{
    transform: scaleX(1); /* Ensure no mirroring for remote stream */
}
</style>