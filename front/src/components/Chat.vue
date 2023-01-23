<template>
    <div>
        <v-btn @click="leave()" color="error" variant="outlined">Leave room</v-btn>

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
            <v-text-field v-model="message" :placeholder="'Message @admin'" @keyup.enter="sendMessage">

            </v-text-field>
        </v-footer>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { leaveRoom, joinRoom } from '../index';
import { emitChatMessage } from '../ws/chat';
import { isArray } from '@vue/shared';
import { useUserStore } from '../store/userStore';
import { useChatStore } from '../store/chat';

export default defineComponent({
    name: "Chat",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const userStore = useUserStore();
        const chatStore = useChatStore();

        const { user } = storeToRefs(userStore);

        const { getChat, getChatMessages } = chatStore;
        const { chat, messages } = storeToRefs(chatStore);

        const message = ref<string>('');

        const chatId = computed((): string => {
            if (!isArray(route.params.id)) {
                return route.params.id;
            }
            return 'undefined';
        });

        onMounted(async () => {
            try {
                await getChat(chatId.value);
                await getChatMessages(chatId.value);
                joinRoom(chatId.value);
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
            emitChatMessage({ senderId: user.value.id, chatId: chat.value.id, content: message.value });
            message.value = "";
        }

        const leave = async () => {
            try {
                leaveRoom(chatId.value);
                router.push({ name: 'messages' });
            } catch (e) {
                console.error(e);
            }
        }

        onUnmounted(() => {
            leaveRoom(chat.value.id);
        });

        return { leave, chat, message, sendMessage, formatDate, messages, user }
    }
})
</script>