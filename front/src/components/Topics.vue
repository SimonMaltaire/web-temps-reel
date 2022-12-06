<template>
    <v-card>
        <v-list>
            <v-list-subheader>Topics</v-list-subheader>

            <v-list-item
                v-for="item in topics"
                :key="item.id"
                :value="item"
                active-color="primary"
            >

                <template v-slot:append>
                    /{{ item.size }}
                </template>

                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
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