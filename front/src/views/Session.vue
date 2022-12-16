<template>
    <div class="pt-12 d-flex justify-center align-center">
        <router-view />
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: "Session"
});
</script>