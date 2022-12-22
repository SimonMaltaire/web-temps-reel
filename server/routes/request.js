// REST
import express from 'express';
import Request from '../models/Request.js';
import User from '../models/User.js';

const router = express.Router();

// GET all pending requests
router.get('/', async (req, res) => {
    const requests = await Request.findAll({
        where: {
            status: Request.REQUEST_STATUS.pending
        },
        include: {
            model: User,
            as: 'user'
        }
    });
    res.send(requests).status(200);
});

// POST User reservation
router.post('/', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        const request = await Request.create({
            status: Request.REQUEST.pending
        });
        await user.addRequest(request);
        res.send(request).status(200)
    } else {
        res.sendStatus(400);
    }
});


export default router;