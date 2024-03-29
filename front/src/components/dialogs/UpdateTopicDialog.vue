<template>
    <v-dialog
        v-model="dialog"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-restore">
                <v-list-item-title>Update</v-list-item-title>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                Update topic '{{ item.name }}'
            </v-card-title>
            
            <v-card-text>
                <v-form v-model="valid" ref="form">
                    <v-text-field v-model="topicName" :rules="[rules.required]" label="Topic name" type="text" placeholder="Topic name"></v-text-field>
                    <v-text-field v-model="topicSize" :rules="[rules.required, rules.size]" label="Topic max members" type="number" placeholder="Topic size"></v-text-field>
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
import { createToast } from 'mosha-vue-toastify';
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
        const valid = ref<boolean>(false);
        const dialog = ref<boolean>(false);
        const topicName = ref<string>(item.name);
        const topicSize = ref<number>(item.size);

        const rules = {
            required: (v: any) => !!v || 'Value required',
            size: (v: number) => v >= item.memberCount || `Size cannot be lowered below ${item.memberCount}`
            
        }

        const submit = async () => {
            try {
                const { valid } = await form.value.validate();
                if (valid) {
                    await updateTopic({
                        name: topicName.value,
                        size: topicSize.value,
                        topicId: item.id
                    });
                    createToast("Topic updated", { type: 'success', position: 'bottom-right' });
                    dialog.value = false;
                }
            } catch (e) {
                console.error(e);
                createToast("Error while updating topic", { type: 'danger', position: 'bottom-right' });
                dialog.value = false;
            }
        }

        return { dialog, topicName, topicSize, submit, form, rules, valid }
    }
})
</script>