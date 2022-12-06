import { io } from "socket.io-client";

const socket = io("ws://localhost:3002");

socket.on("message", message => {
    console.log("message from server" + message)
});