<template>
    <div class="h-100">
        <Header></Header>
        <NavigationDrawer></NavigationDrawer>
        <Chatbot></Chatbot>
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
    components: {Header, NavigationDrawer, ChatBot}
});

</script>