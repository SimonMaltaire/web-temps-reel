<template>
    <div>
        <add-topic-dialog v-if="isAdmin" />
        <v-card v-if="!isAdmin">
            <v-list>
                <v-list-subheader>Your Topics</v-list-subheader>
    
                <v-list-item
                    v-for="item in userTopics"
                    :key="item.id"
                    :value="item"
                    active-color="primary"
                    @click="navigateToTopic(item)"
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
    
                    <v-list-item-title v-text="`${item.name} ${item.memberCount}/${item.size}`">
                    </v-list-item-title>
                </v-list-item>
            </v-list>

            <v-list>
                <v-list-subheader>Topics</v-list-subheader>
    
                <v-list-item
                    v-for="item in topicsNotJoined"
                    :key="item.id"
                    :value="item"
                    active-color="primary"
                    @click="navigateToTopic(item)"
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
    
                    <v-list-item-title v-text="`${item.name} ${item.memberCount}/${item.size}`">
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
        <v-card v-else>
            <v-list>
                <v-list-subheader>Topics</v-list-subheader>
    
                <v-list-item
                    v-for="item in topics"
                    :key="item.id"
                    :value="item"
                    active-color="primary"
                    @click="navigateToTopic(item)"
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
    
                    <v-list-item-title v-text="`${item.name} ${item.memberCount}/${item.size}`">
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref, computed } from 'vue';
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
        const { addUserToTopic, topicMembers, getUserTopics } = userTopicStore;
        const { userTopics } = storeToRefs(userTopicStore);

        const userStore = useUserStore();
        const { isAdmin, user } = storeToRefs(userStore);

        const showDeleteModal = ref<boolean>(false);

        const topicsNotJoined = computed(() => {
            return topics.value.filter((topic: any) => {
                console.log(userTopics.value)
                if (!userTopics.value.find((t: any) => t.id === topic.id)) {
                    return topic;
                }
            });
        });

        const navigateToTopic = async (topic: { id: string, memberCount: number, size: number }) => {
            if (user.value.isAdmin) {
                router.push({ name: 'room', params: { id: topic.id }});
            } else {
                try {
                    const members = await topicMembers(topic.id);
                    const isMemberOfTopic = members.find((u: any) => u.id === user.value.id);
                    if (isMemberOfTopic) {
                        await addUserToTopic(topic.id);
                        router.push({ name: 'room', params: { id: topic.id }});
                    } 
                    else if(topic.memberCount === topic.size) {
                        createToast('This topic is at capacity, contact an admin to upgrade it\'s size', { type: 'info', position: 'bottom-right' });
                        return;
                    } else {
                        await addUserToTopic(topic.id);
                        router.push({ name: 'room', params: { id: topic.id }});
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }

        onMounted(async () => {
            try {
                await getTopics();
                await getUserTopics();
            } catch (error) {
                createToast("Error while fetching topics", { type: 'danger', position: 'bottom-right' });
            }
        });

        return { topics, isAdmin, showDeleteModal, navigateToTopic, userTopics, topicsNotJoined }
    }
})
</script>