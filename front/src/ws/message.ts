import socket from "..";
import { useTopicStore } from '../store/topicStore';

const topicStore = useTopicStore;

export const emitMessage = (payload: { senderId: string, topicId: string, content: string }) => {
    socket.emit("room-message", payload);
}

socket.on("room-message", payload => {
    const { addMessage } = topicStore();
    console.log("room-message", payload);
    addMessage(payload)
});