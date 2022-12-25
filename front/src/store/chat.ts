import { defineStore } from 'pinia';
import { ref } from "vue";
import { chatService } from "../service/api/index";

export const useChatStore = defineStore('chat', () => {
    const { _createChat, _getChat, _getUserChats, _getChatMessages } = chatService;

    const userChats = ref<any>([]);

    const chat = ref<any>(null);
    
    const messages = ref<any>([]);

    async function createChat(payload: { userIds: String[] }) {
        try {
            const res = await _createChat(payload);
            chat.value = res;
            return res;
        } catch (e) {
            throw e;
        }
    }

    function addMessage(payload: any) {
        messages.value.push(payload);
    }

    async function getChatMessages(chatId: string) {
        try {
            const res = await _getChatMessages(chatId);
            messages.value = res;
        } catch (e) {
            console.error(e);
        }
    }

    async function getChat(chatId: string) {
        try {
            const res = await _getChat(chatId);
            chat.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function getUserChats() {
        try {
            const res = await _getUserChats();
            userChats.value = res;
        } catch (e) {
            throw e;
        }
    }

    return { createChat, getChat, getUserChats, addMessage, getChatMessages, userChats, chat, messages }
});