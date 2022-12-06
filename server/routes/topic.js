// REST
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import Topic from '../models/Topic.js';
import User from '../models/User.js';
import UserTopics from '../models/UserTopics.js';

const router = express.Router();

// POST Topic
router.post('/', isAdmin, async (req, res) => {
    const topic = await Topic.create({
        ...req.body
    });
    if (topic) {
        res.send(topic).status(201);
    } else {
        res.sendStatus(400);
    }
});

// GET Topic
router.get('/:id', async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    if (topic) {
        res.send(topic).status(200);
    } else {
        res.sendStatus(404);
    }
});

// GET Topics
router.get('/', async (req, res) => {
    const topics = await Topic.findAll();
    res.send(topics).status(200);
});

// DELETE Topic
router.delete('/:id', isAdmin, async (req, res) => {
    console.log(req.params)
    const topic = await Topic.findByPk(req.params.id);
    if (topic) {
        await Topic.destroy({ where: { id: req.params.id }});
        res.send({ deletedTopic: req.params.id }).status(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;