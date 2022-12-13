// REST
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import Topic from '../models/Topic.js';
import Message from '../models/Message.js';

const router = express.Router();

// GET Topic messages
router.get('/:id', async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    const messages = await topic.getMessages();
    if (topic) {
        res.send(messages).status(201);
    } else {
        res.sendStatus(400);
    }
});

// Update Topic message
router.get('/:id/messages/messageId', async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    const message = await Message.findByPk(req.params.messageId);
    if (topic.hasMessage(message)) {
        await message.update({
            content: req.body.content
        });
        res.send(message).status(200);
    } else {
        res.sendStatus(404);
    }
});

// DELETE Topic message
router.delete('/:id/messages/:messageId', isAdmin, async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    const message = await Message.findByPk(req.params.messageId);
    if (topic.hasMessage(message)) {
        await topic.removeMessage(message);
        await Message.delete(message);
        res.send({ message: message.id }).status(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;