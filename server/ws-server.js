import { Server } from "socket.io";
import { User, Topic, Message, Request } from './models/index.js';

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

    socket.on('request-admin', async (payload) => {
        try {
            const user = await User.findByPk(payload.userId);
            if (!user) { 
                return;
            }

            const userRequests = await Request.findOne({
                where: {
                    userId: user.id,
                    status: 'PENDING'
                }
            });

            if (userRequests) {
                socket.emit("request-sent-error", "You already have a pending request, please wait !");
                throw 'You already have a pending request, please wait !';
            } else {
                const request = await Request.create({
                    status: payload.status
                });
                await user.addRequest(request);
        
                request.dataValues.user = user.dataValues;
                console.log(request)
                socket.to("admin-room-requests").emit("request-admin-success", { request: request });

                socket.emit("request-sent", {   
                    message: "Request to chat with an admin sent !"
                }); 
            }
        } catch (e) {
            console.log(e)
        }
    });

    socket.on("update-request", async (payload) => {
        try {
            console.log('update-request')
            const user = await User.findByPk(payload.userId);
            if (!user) { 
                return;
            }

            const userRequest = await Request.findByPk(payload.requestId);

            if (userRequest) {
                const updatedRequest = await userRequest.update({
                    status: payload.status
                });

                io.to("admin-room-requests").emit("request-updated", updatedRequest);
            } else {
                socket.emit("request-updated-error", "Error while finding pending request");
                throw 'Error while finding pending request';
            }
        } catch (e) {
            console.log(e)
        } 
    })

    socket.on('join', (room) => {
        console.log('joined: ', room)
        socket.join(room);
    });

    socket.on('leave', (room) => {
        console.log('leave: ', room)
        socket.leave(room);
    });
});

