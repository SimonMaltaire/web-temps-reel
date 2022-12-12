import { Server } from "socket.io";
import Message from "./models/Message.js";
import Topic from "./models/Topic.js";
import User from "./models/User.js";

const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("web socket connected")

    socket.on("room-message", async (payload) => {
        console.log(payload)
        try {
            const topic = await Topic.findByPk(payload.topicId);
            const recipient = await User.findByPk(payload.recipientId);
            console.log(payload.content, typeof payload.content)
            const message = await Message.create({
                content: payload.content,
            });
            await topic.addMessage(message);
            socket.to(payload.topicId).emit("room-message", { message: message.content, recipient: recipient })
        } catch (e) {
            console.log(e)
            socket.to(payload.topicId).emit("room-message-error", { message: e })
        }
    });

    socket.on('join', (topicId) => {
        socket.join(topicId);
    });

    socket.on('leave', (topicId) => {
        socket.leave(topicId);
    });
});

