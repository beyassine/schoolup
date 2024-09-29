<template>
    <div class="d-flex justify-center ma-5">
        <v-img :src="pinkdivider"></v-img>
    </div>
</template>

<script>

import pinkdivider from "../assets/material/pinkdivider.png";

export default {

data() {
        return {
            pinkdivider: pinkdivider
        };
    },

name: 'pinkdivider',
}
</script>


    