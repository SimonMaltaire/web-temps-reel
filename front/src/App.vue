<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, ref, reactive } from 'vue';
import { token } from './service';
import { useUserStore } from './store/userStore';
import { storeToRefs } from "pinia";
import Chatbot from './components/Chatbot.vue';
import { joinRoom } from '.';

export default defineComponent({
    components: { Chatbot },
    setup() {
        const userStore = useUserStore();

        const { signinWithToken } = userStore;
        const { isAdmin, user } = storeToRefs(userStore);
        
        const snackbar = ref<boolean>(false);

        const snackbarContent = reactive({
            title: '',
            content: ''
        });

        onBeforeMount(async () => {
            if (token.value) {
                try {
                    await signinWithToken(token.value);
                    joinRoom(user.value.id);
                    if (user.value.isAvailable) {
                        joinRoom("admin-room-requests");
                    }
                } catch (error) {
                    console.log(error)
                    token.value = "";
                }
            }
        });

        onMounted(async () => {
            const source = new EventSource('http://localhost:4000/admin-notifications');

            source.onmessage = (e) => {
                console.log(e);  
                const data = JSON.parse(e.data);         
                snackbarContent.title = data.title;
                snackbarContent.content = data.content;
                snackbar.value = true;
            }

            source.addEventListener('notifications', (e: any) => {
                console.log(e);
                snackbarContent.title = e.title;
                snackbarContent.content = e.content;
                snackbar.value = true;
            });
        });

        return { snackbar, snackbarContent, isAdmin }
    }
});
</script>

<template>
    <v-app class="d-flex flex-column" app>
        <v-main>
            <Chatbot class="z-50"/>
            <v-container fluid class="container">
                <router-view />
                <v-snackbar v-if="!isAdmin" v-model="snackbar" multi-line>
                    <span class="font-weight-bold text-h6">{{ snackbarContent.title }}</span> - 
                    <span class="font-italic">{{ snackbarContent.content }}</span>
                    <template v-slot:actions>
                        <v-btn
                            color="red"
                            variant="text"
                            @click="snackbar = false"
                        >
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.container {
    height: calc(100vh - 64px);
}
</style>
