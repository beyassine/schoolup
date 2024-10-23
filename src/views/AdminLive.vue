<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-row class="d-flex">
            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مباشرة
                    <v-icon icon="mdi-cast-education" class="ml-2" size="large"></v-icon>
                </h2>
                <v-divider></v-divider>
                <v-card class="mt-5 pa-3 ">
                    <v-row class="text-center d-flex justify-center mt-2">
                        <v-col cols="6" class="justify-space-between">
                            <v-btn class="ma-2" @click="toggleBroadcast" :icon="isStreaming ? 'mdi-stop' : 'mdi-play'"
                                :color="isStreaming ? 'red' : 'green'"></v-btn><!-- 
                            <v-btn class="ma-2" :disabled="!isStreaming" @click="toggleScreenSharing"
                                icon="mdi-monitor-screenshot" :color="isScreenSharing ? 'green' : 'grey'"></v-btn> -->
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-center">
                        <!-- Video.js video player -->
                        <video ref="videoPlayer" id="videoPlayer" class="video-js vjs-default-skin" controls
                            preload="auto"></video>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";
import AgoraRTC from "agora-rtc-sdk-ng";
import { markRaw } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
    name: "Admin",
    data() {
        return {
            userId: this.$route.params.userId,
            loading: false,
            appId: "e11d8e22b6544ff7ba5a917d9b5396e8",
            token: "",
            channel: "test",
            client: null,
            localTracks: null,
            uid: 1,
            isStreaming: false,
            isScreenSharing: false,
            player: null,
            screenTrack: null,
        };
    },
    methods: {
        async getToken(channel, uid, role) {
            try {
                const response = await axios.post("https://agora-server-ten.vercel.app/api/token", {
                    channel,
                    uid,
                    role,
                });
                return response.data.token;
            } catch (error) {
                console.error("Error fetching token:", error);
                throw error;
            }
        },

        initializeRTCClient() {
            this.client = markRaw(AgoraRTC.createClient({ mode: "live", codec: "vp8" }));
        },

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

        async toggleBroadcast() {
            if (!this.isStreaming) {
                await this.startBroadcast();
                await this.startScreenSharing();

            } else {
                await this.stopBroadcast();
            }
        },

        async startBroadcast() {
            try {
                this.initializeRTCClient();
                this.loading = true;
                const tokenResponse = await this.getToken(this.channel, this.uid, "host");
                this.token = tokenResponse;
                await this.client.setClientRole("host");
                await this.client.join(this.appId, this.channel, this.token, this.uid);
                this.localTracks = markRaw(await AgoraRTC.createMicrophoneAndCameraTracks());

                this.initVideoPlayer();
                const videoElement = this.$refs.videoPlayer;// If you want to apply mirroring only to the local preview
                videoElement.classList.add('mirror'); // Add a class to mirror
                this.localTracks[1].play(videoElement); // Video track
                this.localTracks[0].play(videoElement); // Audio track

                await this.client.publish(this.localTracks);
                this.loading = false;
                this.isStreaming = true;
                console.log("Host is broadcasting");
            } catch (error) {
                console.error("Error during broadcast:", error);
            }
        },

        async stopBroadcast() {
            try {
                if (this.client) {
                    // Stop and unpublish screen sharing track if it's active
                    if (this.screenTrack) {
                        await this.client.unpublish(this.screenTrack);
                        this.screenTrack.stop();  // Stop screen sharing media stream
                        this.screenTrack.close(); // Release resources
                        this.screenTrack = null;  // Reset screenTrack
                        console.log("Screen sharing stopped as part of broadcast stop.");
                    }

                    // Unpublish and stop local audio and video tracks if they exist
                    if (this.localTracks) {
                        await this.client.unpublish(this.localTracks);

                        // Stop and close each local track (audio and video)
                        this.localTracks.forEach(track => {
                            track.stop();  // Stop each media stream
                            track.close(); // Release track resources
                        });

                        this.localTracks = null; // Reset localTracks
                        console.log("Local audio and video tracks stopped.");
                    }

                    // Leave the Agora channel
                    await this.client.leave();
                    this.isStreaming = false;
                    console.log("Broadcast stopped.");

                    // Stop Video.js player
                    if (this.player) {
                        this.player.pause(); // Pause the video
                        this.player.currentTime(0); // Reset to the start
                        console.log("Video player reset.");
                    }
                }
            } catch (error) {
                console.error("Error stopping broadcast:", error);
            }
        },

        async toggleScreenSharing() {
            if (this.screenTrack) {
                await this.stopScreenSharing();
            } else if (this.isStreaming) {
                await this.startScreenSharing();
            }
        },

        async startScreenSharing() {
            try {
                const screenTrack = await AgoraRTC.createScreenVideoTrack();
                if (this.localTracks && this.localTracks[1]) {
                    await this.client.unpublish(this.localTracks[1]);
                    this.localTracks[1].close();
                }
                // Play the screen sharing track (without mirroring)
                const videoElement = this.$refs.videoPlayer;
                videoElement.classList.add('mirror'); // Remove 'mirror' class for screen sharing
                screenTrack.play(this.$refs.videoPlayer);

                await this.client.publish(screenTrack);
                this.screenTrack = screenTrack;
                this.isScreenSharing = true
                console.log("Screen sharing started");
            } catch (error) {
                console.error("Error starting screen sharing:", error);
            }
        },

        async stopScreenSharing() {
            try {
                if (this.screenTrack) {
                    // Unpublish and stop the screen sharing track
                    await this.client.unpublish(this.screenTrack);
                    this.screenTrack.stop();  // Stop screen sharing media stream
                    this.screenTrack.close(); // Release resources
                    this.screenTrack = null;  // Reset screenTrack
                    console.log("Screen sharing stopped.");
                }

                // Recreate and publish local audio and video tracks after stopping screen sharing
                this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

                // Play local video track again (remove mirroring if needed)
                const videoElement = this.$refs.videoPlayer;
                videoElement.classList.add('mirror'); // Reapply mirroring if necessary
                this.localTracks[1].play(videoElement); // Play local video track

                // Republish local tracks (audio and video)
                await this.client.publish(this.localTracks);
                console.log("Switched back to local camera video and audio");
            } catch (error) {
                console.error("Error stopping screen sharing:", error);
            }
        },
        
    },
    created() {
    },
};
</script>
<style>
.mirror {
    transform: scaleX(-1);
}

</style>