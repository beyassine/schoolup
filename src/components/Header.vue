<template>
  <v-app-bar class="d-flex justify-end border" elevation="0" border="white">
    <template v-slot:append>
      <router-link class="text-decoration-none" :to="{
        name: 'home',
      }">
        <v-img aspect-ratio="16/9" width="150" :src="logo"></v-img>
      </router-link>
    </template>

    <!-- <template v-slot:prepend>
      <router-link class="text-decoration-none text-black" :to="{
        name: 'login',
      }">
      <v-btn variant="text">
        <h4>
          تسجيل الدخول
        </h4>
      </v-btn></router-link>
      <router-link class="text-decoration-none text-black" :to="{
        name: 'signup',
      }">
      <v-btn variant="text">
        <h4>
          أنشئ حسابك
        </h4>
      </v-btn>
    </router-link>
    </template> -->
  </v-app-bar>
</template>

<script>
import logo from "../assets/logo.png";
import { useDisplay } from "vuetify";

export default {
  name: "Header",

  setup() {
    const { display } = useDisplay();
  },
  data() {
    return {
      logo: logo,
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() { },
};
</script>
