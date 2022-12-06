<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Header from './components/Header.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
import { useLocalStorage } from './composables/storage';
import { useUserStore } from './store/userStore';

export default defineComponent({
    components: { Header, NavigationDrawer },
    setup() {
        const userStore = useUserStore();
        const { signinWithToken } = userStore;
        const { token } = useLocalStorage();

        onMounted(async () => {
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
        <Header></Header>
        <NavigationDrawer></NavigationDrawer>
        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>

</style>
