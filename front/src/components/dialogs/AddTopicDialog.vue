<template>
    <v-dialog
        v-model="dialog"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                v-bind="props"
            >
            Add a topic
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                Add a new topic 
            </v-card-title>
            
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="topicName" type="text" placeholder="Topic name"></v-text-field>
                    <v-text-field v-model="topicSize" type="number" placeholder="Topic size"></v-text-field>
                </v-form>
            </v-card-text>
                

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="addTopic()"
                >
                    Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTopicStore } from '../../store/topicStore';
export default defineComponent({
    setup() {
        const topicStore = useTopicStore();
        const { createTopic } = topicStore;

        const form = ref();
        const dialog = ref<boolean>(false);
        const topicName = ref<string>('');
        const topicSize = ref<number>(0);

        const addTopic = async () => {
            try {
                await createTopic({
                    name: topicName.value,
                    size: topicSize.value
                });
                reset();
                dialog.value = false;
            } catch (e) {
                console.error(e);
                dialog.value = false;
            }
        }

        const reset = () => {
           form.value.reset()
        }

        return { dialog, topicName, topicSize, addTopic, form, reset }
    }
})
</script>