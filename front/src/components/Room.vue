<template>
    <div>
        <v-btn @click="leaveRoom()" color="error" variant="outlined">Leave room</v-btn>

        <div v-for="member in members">
            {{ member.username }}
        </div>
        <v-footer outlined app bottom fixed padless>
            <v-text-field v-model="message" :placeholder="'Message @' + topic.name" @keyup.enter="sendMessage">

            </v-text-field>
        </v-footer>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTopicStore } from '../store/topicStore';
import { useUserTopicsStore } from '../store/userTopicsStore';
import { emitMessage, leave, joinRoom } from '../../index';
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

        const { getTopic } = topicStore;
        const { topic } = storeToRefs(topicStore);
        
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
                await topicMembers(topicId.value);
                joinRoom(topicId.value);
            } catch (e) {
                console.error(e);
            }
        });

        const sendMessage = () => {
            emitMessage({ recipientId: user.value.id ,topicId: topicId.value, content: message.value });
            message.value = "";
        }

        const leaveRoom = async () => {
            try {
                await removeUserFromTopic(topicId.value);
                leave(topicId.value);
                router.push({ name: 'topics' });
            } catch (e) {
                console.error(e);
            }
        }

        onUnmounted(() => {
            leave(topicId.value);
        });

        return { leaveRoom, topic, message, sendMessage, members }
    }
})
</script>