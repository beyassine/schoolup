<template>
    <div class="d-flex justify-center ma-5">
        <v-img :src="pinkstar"></v-img>
    </div>
</template>

<script>

import pinkstar from "../assets/material/pinkstar.png";

export default {

data() {
        return {
            pinkstar: pinkstar
        };
    },

name: 'pinkstar',
}
</script>


    