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
        <div>
            <h1>LIVE</h1>
            <div id="local_stream" style="width: 640px; height: 480px;"></div>
            <button @click="startBroadcast">Start Broadcast</button><br>
            <button v-if="isStreaming" @click="stopBroadcast">Stop Broadcast</button>
            <button @click="startScreenSharing">Start Screen Sharing</button>
            <button @click="stopScreenSharing">Stop Screen Sharing</button>
        </div>
        <v-row class="d-flex mt-3">
            <v-col cols="12">
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
            //Agora
            appId: "e11d8e22b6544ff7ba5a917d9b5396e8", // Replace with your Agora App ID
            token: "", // You can generate tokens from your FastAPI backend (optional for simple testing)
            channel: "test", // Channel name for your live stream
            client: null,
            localTracks: null,
            uid: 1,
            isStreaming: false,  // Indicates if the host is currently streaming
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

        //Start Stream Broadcast
        async startBroadcast() {
            try {
                // Initialize the Agora client
                this.initializeRTCClient();

                // Get token from backend
                const tokenResponse = await this.getToken(this.channel, this.uid, 'host');
                this.token = tokenResponse;

                // Set the host role and join the channel
                await this.client.setClientRole("host");
                await this.client.join(this.appId, this.channel, this.token, this.uid);

                // Create local audio and video tracks
                this.localTracks = markRaw(await AgoraRTC.createMicrophoneAndCameraTracks());

                // Play local video track
                this.localTracks[1].play("local_stream");

                // Publish the tracks
                await this.client.publish(this.localTracks); 
                this.isStreaming = true;
                console.log("Host is broadcasting");
            } catch (error) {
                console.error("Error during broadcast:", error);
            }
        },
        // Stop streaming as host
        async stopBroadcast() {
            try {
                // Unpublish local tracks (video and audio)
                if (this.client) {
                    await this.client.unpublish(this.localTracks);
                    
                    this.localTracks[1].stop("local_stream");
                    // Leave the channel
                    await this.client.leave();

                    this.isStreaming = false;
                    console.log("Streaming stopped.");
                }
            } catch (error) {
                console.error("Error stopping stream:", error);
            }
        },

        async startScreenSharing() {
            try {
                // Create the screen video track
                const screenTrack = await AgoraRTC.createScreenVideoTrack();

                // Stop the local camera track if it's currently active
                if (this.localTracks && this.localTracks[1]) {
                    await this.client.unpublish(this.localTracks[1]);
                    this.localTracks[1].close(); // Close the camera video track
                }

                // Play the screen video in the local stream container
                screenTrack.play("local_stream");

                // Publish the screen track to the Agora client
                await this.client.publish(screenTrack);
                console.log("Screen sharing started");

                // Store the screen track to be able to stop it later
                this.screenTrack = screenTrack;
            } catch (error) {
                console.error("Error starting screen sharing:", error);
            }
        },

        async stopScreenSharing() {
            try {
                // Unpublish the screen track if it exists
                if (this.screenTrack) {
                    await this.client.unpublish(this.screenTrack);
                    this.screenTrack.close(); // Close the screen track
                    console.log("Screen sharing stopped");
                }

                // Switch back to the local camera feed
                this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
                this.localTracks[1].play("local_stream");
                await this.client.publish(this.localTracks[1]);
                console.log("Switched back to camera video");
            } catch (error) {
                console.error("Error stopping screen sharing:", error);
            }
        },
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
    transform: scaleX(1); /* Mirror the local video */
}
</style>