<template>
  <v-app class="app">
    <Header />    
    <Sidebar  v-if="this.$route.meta.sidebar" />
    <v-main :class="this.$route.meta.white ? 'white' : 'main'">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
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
  background-color: rgb(251,247,245);
}

.white {
  background-color: white;
}
</style>
