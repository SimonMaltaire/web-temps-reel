<template>
    <div class="flex h-full w-full">
        <div class="bg-red-100 h-full w-full flex justify-center space-x-4">
            <Header></Header>
            <NavigationDrawer></NavigationDrawer>
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted} from 'vue';
import Header from "../components/Header.vue";
import NavigationDrawer from "../components/NavigationDrawer.vue";
import {token} from "../service";

export default defineComponent({
    name: "Home",
    components: {Header, NavigationDrawer},
    setup() {
    },
    beforeRouteEnter (to, from, next) {
        // check if the user is authenticated
        if (token.value) {
            next()
        } else {
            next({name: 'signin'})
        }
    },
});
</script>