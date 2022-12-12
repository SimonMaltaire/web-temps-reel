<template>
    <v-dialog
        v-model="dialog"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
                <v-list-item-title>Update</v-list-item-title>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                Update topic '{{ item.name }}'
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
                    @click="submit()"
                >
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useTopicStore } from '../../store/topicStore';
export default defineComponent({
    props: {
        item: {
            default: () => {},
            type: Object
        }
    },
    setup(props) {
        const { item } = props;
        const topicStore = useTopicStore();
        const { updateTopic } = topicStore;

        const form = ref();
        const dialog = ref<boolean>(false);
        const topicName = ref<string>(item.name);
        const topicSize = ref<number>(item.size);

        const submit = async () => {
            try {
                await updateTopic({
                    name: topicName.value,
                    size: topicSize.value,
                    topicId: item.id
                });
                dialog.value = false;
            } catch (e) {
                console.error(e);
                dialog.value = false;
            }
        }

        return { dialog, topicName, topicSize, submit, form }
    }
})
</script>