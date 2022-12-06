<template>
    Topics
    {{topics}}
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted } from 'vue';
import { useTopicStore } from '../store/topicStore';

export default defineComponent({
    setup() {
        const topicStore = useTopicStore();
        const { getTopics } = topicStore;
        const { topics } = storeToRefs(topicStore);

        onMounted(async () => {
            try {
                await getTopics();
            } catch (error) {
                
            }
        });

        return { topics }
    }
})
</script>