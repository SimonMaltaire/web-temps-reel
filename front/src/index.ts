import { io } from "socket.io-client";

const socket = io("ws://localhost:3002");

socket.on("room-message-error", message => {
    console.log("room-message", message);
});

export const emitMessage = (payload: { recipientId: string, topicId: string, content: string }) => {
    socket.emit("room-message", payload);
}

export const joinRoom = (topicId: string) => {
    socket.emit("join", topicId);
}

export const leave = (topicId: string) => {
    socket.emit("leave", topicId);
}

export default socket;