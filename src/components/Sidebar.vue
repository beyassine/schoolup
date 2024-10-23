<template>
    <v-navigation-drawer class="lg-and-down elevation-3 text-right" width="200" location="right">
        <v-list density="compact" class="mt-2" nav>
            <router-link v-for="[icon, title, route] in aradminlinks" :key="title"
                class="text-decoration-none text-black text-right" :to="{
                    name: route,
                    params: { userId: '5518db98-c5eb-4387-9330-a439bb039efd' },
                }">
                <v-list-item class="mb-2" :append-icon="icon">
                    <h3>{{ title }}</h3>
                </v-list-item>
            </router-link>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn color="red-lighten-1" variant="elevated" class="text-white" block @click="logout">
                    <h4>تسجيل خروج <v-icon class="ml-2">mdi-logout</v-icon></h4>
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { useAuth } from "@/store/auth.js";
export default {
    name: "Sidebar",

    setup() {
        const store = useAuth();

        return { store }
    },
    data() {
        return {
            userId: this.$route.params.userId,
            aradminlinks: [
                ["mdi-monitor-account", "دروس مسجلة", "admin"],
                ["mdi-cast-education", "دروس مباشرة", "adminLive"],
                ["mdi-account-multiple", "المنخرطين", "adminSubs"],
                ["mdi-cog-outline", "إعدادات", "adminInfo"],
            ],
        };
    },
    computed: {
    },
    methods: {
        logout() {
            this.store.logoutUser()
            this.$router.push({
                name: "login",
            });
        },
    },
};
</script>