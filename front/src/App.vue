<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Header from './components/Header.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
import { token } from './service';
import { useUserStore } from './store/userStore';
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

export default defineComponent({
    components: {Header, NavigationDrawer},
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
        const { signinWithToken } = userStore;
        const { isAuth } = storeToRefs(userStore);
        const { user } = storeToRefs(userStore);

        onMounted(async () => {
            if (token.value) {
                try {
                    await signinWithToken(token.value);
                } catch (error) {
                    console.log(error)
                }
            }
        })

        return { isAuth }
    }
});
</script>

<template> 
    <v-app class="d-flex flex-column" app>
        <Header v-if="isAuth"></Header>
        <NavigationDrawer v-if="isAuth"></NavigationDrawer>
        <v-main>
            <v-container class="pa-0 h-full w-full" fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>

</style>
