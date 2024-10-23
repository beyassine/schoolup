<template>
    <v-container :class="$vuetify.display.smAndUp ? 'container' : ''">
        <v-row class="d-flex">
            <v-col cols="12">
                <h2 class="text-center mb-5">المنخرطين
                    <v-icon icon="mdi-account-multiple" class="ml-2" size="large"></v-icon>
                </h2>
                <v-divider></v-divider>
                <v-card elevation="0" class="mt-5">
                    <v-card-item>
                        <div class="d-flex justify-space-between mb-2">
                            <div>
                                <v-btn color="#ff0090" theme="dark" elevation="0" @click="() => dialog = true">
                                    <h3>أضف منخرط</h3>
                                </v-btn>
                            </div>
                            <div class="">
                                <h3>
                                    لائحة المنخرطين
                                </h3>
                            </div>
                        </div>
                        <p class="text-right">{{ subsCount }} : عدد المنخرطين </p>
                    </v-card-item>
                    <v-table fixed-header height="300px">
                        <thead>
                            <tr>
                                <th class="text-right">
                                    البريد الإلكتروني
                                </th>
                                <th class="text-right">
                                    الإسم الكامل
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in subs" :key="item.name">
                                <td class="text-right">{{ item.email }}</td>
                                <td class="text-right">{{ item.name }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog">
            <v-card>
                <h2 class="text-right ma-2">معلومات المنخرط</h2>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="emailRules" label="البريد الإلكتروني" v-model="email"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="الإسم الكامل" v-model="fulname" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="">
                    <v-spacer></v-spacer>
                    <v-btn color="" variant="text" @click="dialog = false">
                        <h2>إلغاء</h2>
                    </v-btn>
                    <v-btn color="#ff0090" variant="text" @click="dialog = false">
                        <h2>أضف</h2>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { useDisplay } from "vuetify";

export default {
    name: 'Admin',

    setup() {
        const { display } = useDisplay();
    },

    components: {
    },

    data() {
        return {
            subsCount: '1',
            subs: [
                {
                    name: 'yassine berred',
                    email: 'berred.yassine@gmail.com'
                }
            ],
            dialog: false,
            emailRules: [
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || ''
            ],
            email: '',
            fulname: ''

        };
    },
    methods: {

    }

}
</script>
<style>
.container {
    padding-left: 15%;
    padding-right: 15%;
}
</style>