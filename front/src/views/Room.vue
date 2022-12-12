<template>
    <div>
        <room></room>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Room from '@/components/Room.vue';

export default defineComponent({
    components: { Room },
    name: 'RoomView',
    setup() {
        onMounted(() => {
            console.log('mounted')
        })
    }
});

</script>

<style scoped>

</style>