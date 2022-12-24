// REST
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';

const router = express.Router();

// POST Chat
router.post('/', isAdmin, async (req, res) => {
    const chat = await Chat.create({
        name: `Discussion with admin: ${req.user.username}`
    });
    for (let userId of req.body.userIds) {
        const user = await User.findByPk(userId);
        await user.addChat(chat);
        await chat.addUser(user);
    }
    if (chat) {
        const chatUsers = await chat.getUsers();
        res.send(chatUsers).status(201);
    } else {
        res.sendStatus(400);
    }
});

// GET Chat
router.get('/:id', async (req, res) => {
    const chat = await Chat.findByPk(req.params.id);
    if (chat) {
        res.send(chat).status(200);
    } else {
        res.sendStatus(404);
    }
});

// GET Chat messages
router.get('/:id/messages', async (req, res) => {
    const chat = await Chat.findByPk(req.params.id);
    if (chat) {
        const chatMessages = await chat.getMessages();
        res.send(chatMessages).status(200);
    } else {
        res.sendStatus(404);
    }
});


// GET User chats
router.get('/', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        const userChats = await user.getChats();
        res.send(userChats).status(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;