<template>
  <div class="video-js-container">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      playsinline
      preload="auto"
      width="600"
      height="300"
    ></video>
    <div v-if="loading" class="loading-message">Checking stream availability...</div>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'VideoJsPlayer',
  props: {
    playbackUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      player: null,
      loading: true,  // To display a loading message while polling
      pollInterval: null,
    };
  },
  mounted() {
    this.pollStreamAvailability();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  },
  methods: {
    initializePlayer() {
      this.player = videojs(this.$refs.videoPlayer, {
        autoplay: 'muted',
        controls: true,
        preload: 'auto',
        techOrder: ['html5'],
        sources: [
          {
            src: this.playbackUrl,
            type: 'application/x-mpegURL', // HLS format
          },
        ],
      });

      this.player.ready(() => {
        console.log('Video.js is ready.');
        this.player.play().then(() => {
          console.log('Playback started automatically.');
        }).catch((error) => {
          console.error('Playback failed to start automatically:', error);
        });
      });

      this.player.on('error', function () {
        console.error('Video.js encountered an error.');
      });
    },
    pollStreamAvailability() {
      this.pollInterval = setInterval(() => {
        fetch(this.playbackUrl, { method: 'HEAD' })
          .then(response => {
            if (response.ok) {
              this.loading = false; // Hide the loading message
              clearInterval(this.pollInterval); // Stop polling
              this.initializePlayer(); // Initialize the player and start playback
            }
          })
          .catch(error => {
            console.log('Stream not available yet:', error);
          });
      }, 5000); // Poll every 5 seconds
    },
  },
};
</script>

<style scoped>
.video-js-container {
  width: 100%;
  height: auto;
  position: relative;
}
.loading-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #333;
}
</style>
