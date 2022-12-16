<template>
    <div class="h-100">
        <Header></Header>
        <NavigationDrawer></NavigationDrawer>
        <router-view />
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import Header from "../components/Header.vue";
import NavigationDrawer from "../components/NavigationDrawer.vue";

export default defineComponent({
    name: "Home",
    components: {Header, NavigationDrawer}
});

</script>