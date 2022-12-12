<template>
    <v-dialog
        v-model="dialog"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" color="danger">
                <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                You are about to delete the topic '{{ item.name }}'
            </v-card-title>
            
            <v-card-subtitle>
                Are you sure you want to proceed ?
            </v-card-subtitle>
                
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
                    color="red-darken"
                    variant="text"
                    @click="submit()"
                >
                    Delete
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
        const { item } = toRefs(props);
        const topicStore = useTopicStore();
        const { deleteTopic } = topicStore;

        const dialog = ref<boolean>(false);
        const topicName = ref<string>('');
        const topicSize = ref<number>(0);

        const submit = async () => {
            try {
                await deleteTopic(item.value.id);
                dialog.value = false;
            } catch (e) {
                console.error(e);
                dialog.value = false;
            }
        }

        return { dialog, topicName, topicSize, submit }
    }
})
</script>