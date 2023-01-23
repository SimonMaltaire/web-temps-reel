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
                <v-form v-model="valid" ref="form">
                    <v-text-field v-model="topicName" :rules="[rules.required]" label="Topic name" type="text" placeholder="Topic name"></v-text-field>
                    <v-text-field v-model="topicSize" :rules="[rules.required, rules.moreThanZero]" label="Topic size" type="number" placeholder="Topic size"></v-text-field>
                </v-form>
            </v-card-text>
                

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    variant="text"
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
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
import { createToast } from 'mosha-vue-toastify';
export default defineComponent({
    setup() {
        const topicStore = useTopicStore();
        const { createTopic } = topicStore;

        const form = ref();
        const dialog = ref<boolean>(false);
        const topicName = ref<string>('');
        const topicSize = ref<number>(0);
        const valid = ref<boolean>(false);

        const addTopic = async () => {
            try {
                const { valid } = await form.value.validate();
                if (valid) {
                    await createTopic({
                        name: topicName.value,
                        size: topicSize.value
                    });
                    reset();
                    createToast("Topic created", { type: 'success', position: 'bottom-right' });
                    dialog.value = false;
                }
            } catch (e) {
                console.error(e);
                createToast("Error while creating topic", { type: 'danger', position: 'bottom-right' });
                dialog.value = false;
            }
        }

        const rules = {
            required: (v: any) => !!v || 'Value is required',
            moreThanZero: (v: number) => v >= 0 || 'Value must be greater than 0'
        }

        const reset = () => {
           form.value.reset()
        }

        return { dialog, topicName, topicSize, addTopic, form, reset, rules, valid }
    }
})
</script>