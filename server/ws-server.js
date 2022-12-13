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
        try {
            const topic = await Topic.findByPk(payload.topicId);
            const recipient = await User.findByPk(payload.recipientId);
            const message = await Message.create({
                content: payload.content,
                recipientId: recipient.id,
                createdBy: recipient.username
            });
            await topic.addMessage(message);
            io.to(payload.topicId).emit("room-message", 
                { 
                    content: message.content, 
                    createdBy: recipient.username, 
                    recipientId: recipient.id,
                    createdAt: message.createdAt
                })
        } catch (e) {
            console.log(e)
            io.to(payload.topicId).emit("room-message-error", { message: "Error while sending message" })
        }
    });

    socket.on('join', (topicId) => {
        socket.join(topicId);
    });

    socket.on('leave', (topicId) => {
        socket.leave(topicId);
    });
});

