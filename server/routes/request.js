// REST
import express from 'express';
import Request from '../models/Request.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const requests = await Request.findAll({
        include: {
            model: User,
            as: 'user'
        }
    });
    res.send(requests).status(200);
});

// GET all pending requests
router.get('/pending', async (req, res) => {
    const requests = await Request.findAll({
        where: {
            status: Request.REQUEST_STATUS.PENDING
        },
        include: {
            model: User,
            as: 'user'
        }
    });
    res.send(requests).status(200);
});

// GET all accepted requests
router.get('/accepted', async (req, res) => {
    const requests = await Request.findAll({
        where: {
            status: Request.REQUEST_STATUS.ACCEPTED
        },
        include: {
            model: User,
            as: 'user'
        }
    });
    res.send(requests).status(200);
});

// Get User request
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        const userRequest = await user.getRequests();
        res.send(userRequest).status(200)
    } else {
        res.sendStatus(400);
    }
});

// POST User request
router.post('/', async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (user) {
        const request = await Request.create({
            status: Request.REQUEST.PENDING
        });
        await user.addRequest(request);
        res.send(request).status(200)
    } else {
        res.sendStatus(400);
    }
});


export default router;