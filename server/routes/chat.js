// REST
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';
import Request from '../models/Request.js';
import UserChats from '../models/UserChats.js';
import { Op } from 'sequelize';

const router = express.Router();

// POST Chat
router.post('/', async (req, res) => {
    console.log(req.body.userIds, typeof req.body.userIds);

    const chat = await Chat.findOne({
        where: {
            name: {
                [Op.or]: [req.body.userIds.join('.'), req.body.userIds.reverse().join('.')]
            }
        },
        include: {
            model: User
        }
    });

    if (chat) {
        console.log("Room already exists")
        res.send(chat).status(200);
    } else {
        console.log("Room didnt exist")

        const chatName = req.body.userIds.length <= 2 ? req.body.userIds.join('.') : req.body.name;
        const chat = await Chat.create({
            name: chatName
        });
        await chat.addUsers(req.body.userIds);

        if (chat) {
            res.send(chat).status(201);
        } else {
            res.sendStatus(400);
        }
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

router.get('/requests/admin', async (req, res) => {
    const chats = await Chat.findAll({
        include: {
            model: UserChats,
            where: {
                userId: req.user.id
            }
        },
        include: {
            model: Request,
            where: {
                status: Request.REQUEST_STATUS.ACCEPTED
            },
        }
    });

    const userIds = chats.map(chat => chat.name.split('.').filter(userId => userId !== req.user.id)).flat();
    let users = []; 
    // Client can only have one request at the state of PENDING or ACCEPTED, so they can only speak to one ADMIN
    // This stuff is actually useless ATM
    for(let id of userIds) {
        const user = await User.findByPk(id);
        users.push(user.dataValues)
    } 

    res.send(users).status(200);
})

// GET User chats
router.get('/', async (req, res) => {
    // const user = await User.findByPk(req.user.id);
    // const chat = await User.findByPk(req.user.id);
    // if (user) {
        const userChats = await UserChats.findAll()
        // const userChats = await UserChats.findAll({
        //     where: {
        //         userId: req.user.id
        //     },
        // });
        res.send(userChats).status(200);
    // } else {
        // res.sendStatus(404);
    // }
});

export default router;