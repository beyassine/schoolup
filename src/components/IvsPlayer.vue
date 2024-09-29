<template>
    <div class="ivs-player-container">
      <video
        id="video-player"
        controls
        autoplay
        playsinline
        style="width: 100%; height: 100%;"
      ></video>
    </div>
  </template>
  
  <script>
  import { create } from 'amazon-ivs-player';
  
  export default {
    name: 'IvsPlayer',
    props: {
      playbackUrl: {
        type: String,
        required: true,
      },
    },
    mounted() {
      this.initializePlayer();
    },
    methods: {
      initializePlayer() {
        if (!this.playbackUrl) {
          console.error('Playback URL is required to initialize the IVS player.');
          return;
        }
  
        // Check if the browser supports the Amazon IVS player
        if (create.isPlayerSupported) {
            console.lof('IVS PLAYER')
          const player = create();
          const videoElement = this.$refs.videoPlayer;
  
          // Attach the video element to the player
          player.attachHTMLVideoElement(videoElement);
  
          // Load the playback URL into the player
          player.load(this.playbackUrl);
  
          // Start playback
          player.play();
        } else {
          console.error('IVS player is not supported on this browser.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .ivs-player-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  </style>
  