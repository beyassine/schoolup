<template>
  <v-app class="app">
    <Header />    
    <v-main :class="this.$route.meta.white ? 'white' : 'main'">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },

  mounted() {
    document.title = "SCHOOLUP";
  }
}
</script>

<style  lang="scss">
@import "./scss/variables.scss";

.app {
  font-family: $body-font-family;
}

.main {
  background-color: rgb(240, 240, 240);
}

.white {
  background-color: white;
}


</style>
