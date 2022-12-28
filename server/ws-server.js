import { Server } from "socket.io";
import { User, Topic, Message, Request, Chat } from './models/index.js';
import { Op } from "sequelize";
const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("web socket connected")

    // Topic message
    socket.on("room-message", async (payload) => {
        try {
            const topic = await Topic.findByPk(payload.topicId);
            const sender = await User.findByPk(payload.senderId);
            const message = await Message.create({
                content: payload.content,
                senderId: sender.id,
                createdBy: sender.username
            });
            await topic.addMessage(message);
            io.to(payload.topicId).emit("room-message", 
                { 
                    content: message.content, 
                    createdBy: sender.username, 
                    senderId: sender.id,
                    createdAt: message.createdAt
                })
        } catch (e) {
            console.log(e)
            io.to(payload.topicId).emit("room-message-error", { message: "Error while sending message" })
        }
    });

    // Chat message
    socket.on("chat-message", async (payload) => {
        console.log('chat-message', payload)
        try {
            const chat = await Chat.findByPk(payload.chatId);
            const sender = await User.findByPk(payload.senderId);
            const message = await Message.create({
                content: payload.content,
                senderId: sender.id,
                createdBy: sender.username
            });
            await chat.addMessage(message);
            io.to(payload.chatId).emit("chat-message", 
                { 
                    content: message.content, 
                    createdBy: sender.username, 
                    senderId: sender.id,
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
                    status: {
                        [Op.or]: [Request.REQUEST_STATUS.PENDING, Request.REQUEST_STATUS.ACCEPTED]
                    }
                }
            });

            if (userRequests) {
                socket.emit("request-sent-error", "You already have a pending request, please wait !");
                throw 'You already have a pending request, please wait !';
            } else {
                const request = await Request.create({
                    status: Request.REQUEST_STATUS[payload.status] ? Request.REQUEST_STATUS[payload.status] : 'PENDING'
                });
                await user.addRequest(request);
        
                request.dataValues.user = user.dataValues;
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
            const chat = await Chat.findByPk(payload.chatId);

            if (!user) { 
                return;
            }

            let userRequest;

            if (payload.requestId) {
                userRequest = await Request.findByPk(payload.requestId);
            } else {
                userRequest = await chat.getRequest();
            }

            if (userRequest) {
                const updatedRequest = await userRequest.update({
                    status: Request.REQUEST_STATUS[payload.status] ? Request.REQUEST_STATUS[payload.status] : 'COMPLETED'
                });

                await chat.setRequest(userRequest);

                if (Request.REQUEST_STATUS[payload.status] === 'ACCEPTED') {
                    socket.to(userRequest.userId).emit("request-accepted-by-admin", { chat: chat.id, request: userRequest.id })
                } else if (Request.REQUEST_STATUS[payload.status] === 'COMPLETED') {
                    socket.to(userRequest.userId).emit("request-completed-by-admin", { chat: chat.id, request: userRequest.id })
                }

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

