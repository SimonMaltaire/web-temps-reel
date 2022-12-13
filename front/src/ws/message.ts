import socket from "..";
import { useTopicStore } from '../store/topicStore';

const topicStore = useTopicStore;

socket.on("room-message", payload => {
    const { addMessage } = topicStore();
    console.log("room-message", payload);
    addMessage(payload)
});