<template>
    <div class="flex h-full w-full">
       <router-view />
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted} from 'vue';
import {token} from "../service";

export default defineComponent({
    name: "Session",
    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('token')

        if (token) {
            next({name: 'home'})
        } else {
            next()
        }
    },
});
</script>