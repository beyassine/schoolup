<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-card class="d-flex flex-no-wrap justify-end" elevation="0" color="grey-lighten-4">
            <!-- UI for the profile -->
        </v-card>
        <v-row class="d-flex mt-3 d-flex flex-row-reverse ">
            <v-col cols="12">
                <h2 class="text-center mb-5">دروس مباشرة
                    <v-icon icon="mdi-cast-education" class="ml-2" size="large"></v-icon>
                </h2>
                <v-card class="mx-auto" elevation="0">
                    <div class="d-flex justify-center align-center" v-if="isHostLive && !isJoined">
                        <v-btn @click="joinLiveStream" rounded="" color="pink-lighten-1" size="large"
                            class="text-center ma-5 ">
                            <h4>شاهد البث
                                <v-icon icon="mdi-cast-audio-variant"></v-icon>
                            </h4>
                        </v-btn>
                        <h4 class="text-center ma-2"> بث مباشر
                            <v-icon icon="mdi-circle" color="red"></v-icon>
                        </h4>
                    </div>

                    <div class="d-flex justify-center">
                        <mux-player id="videoPlayer" :playback-id="muxPlaybackId"
                            metadata-video-title="Live Stream" metadata-viewer-user-id="user-id-007" autoplay>
                        </mux-player>
                    </div>
                </v-card>
                <pinkdivider />
            </v-col>
            <!-- Other sections like recorded lessons -->
        </v-row>
    </v-container>
</template>
<script>
import axios from "axios";
import videojs from "video.js";
import AgoraRTC from "agora-rtc-sdk-ng";
import { markRaw } from "vue";
import "video.js/dist/video-js.css";
import pinkdivider from '../components/pinkdivider.vue'

export default {
    name: 'Profile',
    components: { pinkdivider },
    data() {
        return {
            userId: this.$route.params.userId,
            userName: '',
            profileImg: '',
            courses: '',
            appId: "YOUR_AGORA_APP_ID", // Replace with your Agora App ID
            token: "",
            channel: "test", // Channel name for your live stream
            client: null,
            hostUID: null,
            uid: Math.floor(1000 + Math.random() * 9000),
            isHostLive: false,
            isJoined: false,
            muxPlaybackUrl: "", // Store the Mux HLS URL
            muxStreamKey: "", // Store Mux Stream Key
            muxRTMPUrl: "", // Store Mux RTMP URL
            muxPlaybackId: "",
        };
    },
    methods: {
        initMuxPlayer(playbackUrl) {
            if (!this.player) {
                this.player = videojs(this.$refs.muxPlayer, {
                    controls: true,
                    autoplay: true,
                    preload: "auto",
                    fluid: true,
                });

                if (videojs.getTech('Html5').isSupported()) {
                    this.player.src({
                        src: playbackUrl, // The Mux HLS playback URL
                        type: 'application/x-mpegURL',
                    });
                } else {
                    const hls = new Hls();
                    hls.loadSource(playbackUrl);
                    hls.attachMedia(this.$refs.muxPlayer);
                }
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
        async getMuxStream() {
            try {
                // Call your backend to create Mux live stream
                const response = await axios.post("https://agora-server-ten.vercel.app/api/create-mux-stream");
                const { playback_url, stream_key, rtmp_url } = response.data;
                this.muxPlaybackUrl = response.data.playback_url;
                this.muxStreamKey = response.data.stream_key;
                this.muxRTMPUrl = response.data.rtmp_url;

                return { playback_url, stream_key, rtmp_url };
            } catch (error) {
                console.error("Error fetching Mux stream:", error);
                throw error;
            }
        },
        async pushAgoraToMux() {
            try {
                // Initialize Agora client
                this.client = markRaw(AgoraRTC.createClient({ mode: "live", codec: "vp8" }));
                // Join the Agora channel
                const auid = Math.floor(1000 + Math.random() * 9000)
                const tokenResponse = await this.getToken(this.channel, auid, "host");
                var atoken = tokenResponse;

                await this.client.join(this.appId, this.channel, atoken, auid);

                // Get local video and audio tracks
                const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
                const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

                // Publish local tracks
                await this.client.publish([localVideoTrack, localAudioTrack]);

                // Push Agora stream to Mux RTMP URL
                await this.client.startLiveStreaming(this.muxRTMPUrl, this.muxStreamKey, {
                    videoTrack: localVideoTrack,
                    audioTrack: localAudioTrack,
                });

                console.log("Agora stream is being pushed to Mux");

            } catch (error) {
                console.error("Error pushing Agora stream to Mux:", error);
            }
        },
        async joinLiveStream() {
            try {
                // Initialize Agora client and set role as 'audience' (viewer)
                this.initializeRTCClient();
                // Join the Agora channel
                const auid = Math.floor(1000 + Math.random() * 9000)
                const tokenResponse = await this.getToken(this.channel, auid, "host");
                var atoken = tokenResponse;

                await this.client.join(this.appId, this.channel, atoken, auid);

                // Subscribe to the host's video stream
                this.client.on("user-published", async (user, mediaType) => {
                    await this.client.subscribe(user, mediaType);

                    if (mediaType === "video") {
                        const remoteStream = user.videoTrack;

                        // Push this stream to Mux for HLS playback
                        await this.pushStreamToMux(remoteStream);
                    }
                });

                this.isJoined = true;
            } catch (error) {
                console.error("Error joining stream as audience:", error);
            }
        },

        async pushStreamToMux(remoteStream) {
            try {

                const response = await axios.post("http://localhost:3000/api/create-mux-stream");
                // Assume you've already created a Mux live stream and have RTMP URL and stream key
                const rtmpUrl = `rtmps://global-live.mux.com:443/app`; // Replace with actual Mux RTMP URL
                const streamKey = response.data.stream_key; // Replace with actual stream key
                this.muxPlaybackId = response.data.playbackId

                // Push the Agora stream to Mux using RTMP
                remoteStream.publish(rtmpUrl, {
                     streamKey: streamKey,
                 });

                console.log("Successfully pushed Agora stream to Mux");
            } catch (error) {
                console.error("Error pushing Agora stream to Mux:", error);
            }
        },
        async checkLive() {
            try {
                // Initialize Agora and check if host is live
                this.initializeRTCClient();
                const tokenResponse = await this.getToken(this.channel, this.uid, "host");
                this.token = tokenResponse;
                await this.client.join(this.appId, this.channel, this.token, this.uid);

                this.client.on("user-published", (user, mediaType) => {
                    if (mediaType === "video") {
                        this.isHostLive = true;
                    }
                });

                this.client.on("user-unpublished", (user, mediaType) => {
                    if (mediaType === "video") {
                        this.isHostLive = false;
                    }
                });
            } catch (error) {
                console.error("Error joining as audience:", error);
            }
        },
    },
    mounted() {
        this.checkLive();
    },
};
</script>
