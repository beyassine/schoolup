<template>
    <v-container>        
        <mux-player playback-id="akJDwRrzKAa02Qx72mwidz9sa02c3z01C2701f6VQuU7xls" metadata-video-title="Test VOD"
            metadata-viewer-user-id="user-id-007"></mux-player>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import MuxPlayer from "@mux/mux-player"; 

export default {
    name: 'Player',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
        };
    },
}
</script>