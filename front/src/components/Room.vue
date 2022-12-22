<template>
    <div>
        <v-btn @click="leave()" color="error" variant="outlined">Leave room</v-btn>

        <!-- <div v-for="member in members">
            {{ member.username }}
        </div> -->
        <v-list>
            <v-list-item v-for="message in messages" :key="message.id" class="pt-2">
                <v-list-item-title>
                    <span class="font-bold">
                        {{ message.createdBy }}
                    </span>
                    <span class="pl-3 font-italic text-body-2">
                        {{ formatDate(message.createdAt) }}
                    </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ message.content }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-footer outlined app bottom fixed padless>
            <v-text-field v-model="message" :placeholder="'Message @' + topic.name" @keyup.enter="sendMessage">

            </v-text-field>
        </v-footer>
    </div>
</template>

<script lang="ts">
import { createPinia, storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTopicStore } from '../store/topicStore';
import { useUserTopicsStore } from '../store/userTopicsStore';
import { emitMessage, leaveRoom, joinRoom } from '../index';
import { isArray } from '@vue/shared';
import { useUserStore } from '../store/userStore';

export default defineComponent({
    name: "RoomComponent",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const userStore = useUserStore();
        const topicStore = useTopicStore();
        const userTopicsStore = useUserTopicsStore();

        const { user } = storeToRefs(userStore);

        const { getTopic, getTopicMessages } = topicStore;
        const { topic, messages } = storeToRefs(topicStore);
        
        const { removeUserFromTopic, topicMembers } = userTopicsStore;
        const { members } = storeToRefs(userTopicsStore);

        const message = ref<string>('');

        const topicId = computed((): string => {
            if (!isArray(route.params.id)) {
                return route.params.id;
            }
            return 'undefined';
        });

        onMounted(async () => {
            try {
                await getTopic(topicId.value);
                await getTopicMessages(topicId.value);
                await topicMembers(topicId.value);
                joinRoom(topicId.value);
            } catch (e) {
                console.error(e);
            }
        });

        const formatDate = (dateString: string): string => {
            const date = new Date(dateString);
            return date.toLocaleString('en', 
                {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric", 
                    hour: "2-digit",
                    minute: "2-digit"
                })
        }

        const sendMessage = () => {
            emitMessage({ recipientId: user.value.id ,topicId: topicId.value, content: message.value });
            message.value = "";
        }

        const leave = async () => {
            try {
                leaveRoom(topicId.value);
                await removeUserFromTopic(topicId.value);
                router.push({ name: 'topics' });
            } catch (e) {
                console.error(e);
            }
        }

        onUnmounted(() => {
            leaveRoom(topic.value.id);
        });

        return { leave, topic, message, sendMessage, members, messages, formatDate }
    }
})
</script>