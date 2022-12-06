import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET User
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.send(user).status(200);
    } else {
        res.sendStatus(404);
    }
});

// GET Users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users).status(200);
});

export default router;