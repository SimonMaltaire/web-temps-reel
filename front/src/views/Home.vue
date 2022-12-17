<template>
    <div class="h-100">
        <Chatbot />
        <Header></Header>
        <NavigationDrawer></NavigationDrawer>
        <router-view />
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import Header from "../components/Header.vue";
import NavigationDrawer from "../components/NavigationDrawer.vue";
import ChatBot from "../components/Chatbot.vue";

export default defineComponent({
    name: "Home",
    components: { ChatBot, Header, NavigationDrawer }
});

</script>