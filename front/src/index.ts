import { io } from "socket.io-client";

const socket = io("ws://localhost:3002");

socket.on("room-message-error", message => {
    console.log("room-message", message);
});

export const joinRoom = (room: string) => {
    socket.emit("join", room);
}

export const leaveRoom = (room: string) => {
    socket.emit("leave", room);
}

export default socket;