import express from "express";
import User from "../models/User.js";
import Topic from "../models/Topic.js";

const router = express.Router();

// USER

// POST user to topic
router.post('/:topicId', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const topic = await Topic.findByPk(req.params.topicId);
    if (topic) {
        const topicMembers = await topic.getUsers();
        if (topicMembers.length == topic.size) {
            res.sendStatus(404);
        }
        if (user) {
            await topic.addUser(user);
            await user.addTopic(topic);

            res.send({ message: 'User added to topic'}).status(201);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

// GET user's topics
router.get('/', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        const userTopics = await user.getTopics();
        res.send(userTopics).status(200);
    } else {
        res.sendStatus(404);
    }
});

// GET user's topic
router.get('/:topicId', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const topic = await Topic.findByPk(req.params.topicId);
    if (user && topic) {
        const userTopic = await user.getTopics({
            where: {
                id: topic.id
            }
        });
        res.send(userTopic).status(200);
    } else {
        res.sendStatus(404);
    }
});

// DELETE user from topic
router.delete('/:topicId', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const topic = await Topic.findByPk(req.params.topicId);
    if (user) {
        if (topic) {
            await topic.removeUser(user);
            await user.removeTopic(topic);

            res.send({ message: 'User removed from topic'}).status(200);
        } else {
            res.sendStatus(404);
        }   
    } else {
        res.sendStatus(404);
    }
});

// TOPIC

// GET topic members
router.get('/:topicId/members', async (req, res) => {
    const topic = await Topic.findByPk(req.params.topicId);
    if (topic) {
        const topicMembers = await topic.getUsers();
        res.send(topicMembers).status(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;