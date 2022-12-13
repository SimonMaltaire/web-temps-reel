<template>
    <div>
        <add-topic-dialog v-if="isAdmin" />
        <v-card>
            <v-list>
                <v-list-subheader>Topics</v-list-subheader>
    
                <v-list-item
                    v-for="item in topics"
                    :key="item.id"
                    :value="item"
                    active-color="primary"
                    @click="navigateToTopic(item.id)"
                >
    
                    <template v-slot:append>
                        <v-menu
                            v-if="isAdmin"
                        >
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    icon="mdi-dots-vertical"
                                    color="primary"
                                    v-bind="props"
                                >
                                </v-btn>
                            </template>

                            <v-list>
                                <update-topic-dialog :item="item"></update-topic-dialog>
                                <delete-topic-dialog :item="item"></delete-topic-dialog>
                            </v-list>
                        </v-menu>
                    </template>
    
                    <v-list-item-title v-text="item.name + '    /' + item.size">
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTopicStore } from '../store/topicStore';
import { useUserStore } from '../store/userStore';
import { useUserTopicsStore } from '../store/userTopicsStore';
import AddTopicDialog from './dialogs/AddTopicDialog.vue';
import DeleteTopicDialog from './dialogs/DeleteTopicDialog.vue';
import UpdateTopicDialog from './dialogs/UpdateTopicDialog.vue';
import { createToast } from 'mosha-vue-toastify';

export default defineComponent({
    components: { AddTopicDialog, DeleteTopicDialog, UpdateTopicDialog },
    setup() {
        const router = useRouter();
        const topicStore = useTopicStore();
        const { getTopics } = topicStore;
        const { topics } = storeToRefs(topicStore);

        const userTopicStore = useUserTopicsStore();
        const { addUserToTopic } = userTopicStore;

        const userStore = useUserStore();
        const { isAdmin } = storeToRefs(userStore);

        const showDeleteModal = ref<boolean>(false);

        const navigateToTopic = async (topicId: string) => {
            try {
                await addUserToTopic(topicId);
                router.push({ name: 'room', params: { id: topicId }});
            } catch (e) {
                console.error(e);
            }
        }

        onMounted(async () => {
            try {
                await getTopics();
            } catch (error) {
                createToast("Error while fetching topics", { type: 'danger', position: 'bottom-right' });
            }
        });

        return { topics, isAdmin, showDeleteModal, navigateToTopic }
    }
})
</script>