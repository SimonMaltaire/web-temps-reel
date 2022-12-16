<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Header from './components/Header.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
import { token } from './service';
import { useUserStore } from './store/userStore';
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import Chatbot from './components/Chatbot.vue';

export default defineComponent({
    components: { Chatbot },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
        const { signinWithToken } = userStore;

        onMounted(async () => {
            const source = new EventSource('http://localhost:4000/admin-notifications');

            source.onmessage = (e) => {
                console.log(e)
            }
            source.addEventListener('notifications', (e: any) => {
                console.log(e);
            });

            if (token.value) {
                try {
                    await signinWithToken(token.value);
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
});
</script>

<template>
    <v-app class="d-flex flex-column" app>
        <Chatbot></Chatbot>
        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>

</style>
