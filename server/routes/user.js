import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET User
// router.get('/:id', async (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//         res.send(user).status(200);
//     } else {
//         res.sendStatus(404);
//     }
// });

// GET Users
router.get('/', async (req, res) => {
    const users = await User.findAll({
        where: {
            isAdmin: false
        }
    });
    res.send(users).status(200);
});

// GET connected user
router.get('/me', async (req, res) => {
    console.log(req.user)
    const user = await User.findByPk(req.user.id);
    res.send(user).status(200);
});

// Update user
router.put('/', async (req, res) => {
    console.log(req.user)
    const user = await User.findByPk(req.user.id);
    if (user) {
        const userUpdated = await user.update({
            isAvailable: req.body.isAvailable
        });

        res.send(userUpdated).status(200);
    } else {
        res.sendStatus(404);
    }
})

export default router;