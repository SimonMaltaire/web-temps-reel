<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
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
        const { signinWithToken } = userStore;
        const { isAdmin } = storeToRefs(userStore);
        
        const snackbar = ref<boolean>(false);
        const snackbarContent = reactive({
            title: '',
            content: ''
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

            if (token.value) {
                try {
                    await signinWithToken(token.value);
                } catch (error) {
                    console.log(error)
                    token.value = "";
                }
            }
        });

        return { snackbar, snackbarContent, isAdmin }
    }
});
</script>

<template>
    <v-app class="d-flex flex-column" app>
        <v-main>
            <Chatbot/>
            <v-container fluid>
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

</style>
