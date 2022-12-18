<template>
    <div class="h-100">
        <Header @updateDisplay="display = !display"></Header>
        <NavigationDrawer :display="display"></NavigationDrawer>
        <router-view />
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import Header from "../components/Header.vue";
import NavigationDrawer from "../components/NavigationDrawer.vue";
import ChatBot from "../components/Chatbot.vue";

export default defineComponent({
    name: "Home",
    components: { ChatBot, Header, NavigationDrawer },
    setup() {
        const display = ref<boolean>(false);

        return { display }
    }
});

</script>