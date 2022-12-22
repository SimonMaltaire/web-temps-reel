import { createToast } from "mosha-vue-toastify";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3002");

socket.on("room-message-error", message => {
    console.log("room-message", message);
});

socket.on("requests", paylaod => {
    console.log("requests", paylaod)
});

socket.on("request-sent-error", message => {
    createToast(message, { position: "bottom-right", type: "warning" });
});

export const requestAdmin = (payload: { userId: string }) => {
    socket.emit("request-admin", {
        ...payload,
        status: "PENDING"
    });
};

export const emitMessage = (payload: { recipientId: string, topicId: string, content: string }) => {
    socket.emit("room-message", payload);
}

export const updateRequestWS = (payload: { userId: string, requestId: string, status: string }) => {
    socket.emit("update-request", payload);
}

export const joinRoom = (room: string) => {
    socket.emit("join", room);
}

export const leaveRoom = (room: string) => {
    socket.emit("leave", room);
}

export default socket;