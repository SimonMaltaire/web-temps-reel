<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
export default defineComponent({
    components: { Header, NavigationDrawer },
    setup() {

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
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
