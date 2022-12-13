<template>
    <div class="flex h-full w-full">
        <div class="bg-red-100 h-full w-full flex justify-center space-x-4">
            <v-card
                v-for="action in actions"
                class="w-64"
            >
                <v-card-title
                    v-text="action.name.toUpperCase()"
                    class="text-center"
                />
                <v-card-item
                    v-text="action.description"
                    class="h-32"
                />
                <v-card-actions
                    class=""
                >
                    <v-btn
                        outlined
                        rounded
                        text
                        width="100%"
                        @click="$route.push()"
                    >
                        Access to {{ action.name }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted} from 'vue';
import Header from "../components/Header.vue";
import NavigationDrawer from "../components/NavigationDrawer.vue";
import {useUserStore} from "../store/userStore";
import {token} from "../service";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
    
});
</script>