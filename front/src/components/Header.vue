<template>
    <v-app-bar title="MotoCycle Energy">
        <template v-slot:prepend>
            <v-app-bar-nav-icon
                @click="display"
            ></v-app-bar-nav-icon>
        </template>
        <template v-slot:append>
            <SendNotificationDialog v-if="isAdmin" />
            <v-tooltip v-if="isAuth" text="Account" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click="router.push({ name: 'profile' })" icon="mdi-account"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Logout" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn @click="logoutUser" v-bind="props" icon="mdi-logout"></v-btn>                
                </template>
            </v-tooltip>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import SendNotificationDialog from './dialogs/SendNotificationDialog.vue';
import { useDrawerNavigationStore } from "../store/drawerNavigationStore";

export default defineComponent({
    name: "AppHeader",
    components: { SendNotificationDialog },
    setup() {
        const router = useRouter();
        const userStore = useUserStore();
        const { isAuth, isAdmin } = storeToRefs(userStore);
        const { logout } = userStore;
        const logoutUser = async () => {
            logout();
            router.push({ name: "signin" });
        };

        const { user } = storeToRefs(userStore);

        const drawerNavigationStore = useDrawerNavigationStore();

        const { display } = drawerNavigationStore;

        return { router, isAuth, isAdmin, logoutUser, display, user };
    }
});

</script>

<style scoped>

</style>