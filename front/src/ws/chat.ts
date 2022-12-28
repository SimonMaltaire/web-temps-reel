import socket from "..";
import { useChatStore } from "../store/chat";

export const emitChatMessage = (payload: { senderId: string, chatId: string, content: string }) => {
    socket.emit('chat-message', payload);
}

export const closeRequest = (chatId: string) => {
    socket.emit("close-request", chatId);
}

socket.on('chat-message', (payload) => {
    const chatStore = useChatStore();
    const { addMessage } = chatStore;

    addMessage(payload);
});