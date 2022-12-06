import express from 'express';
import { checkToken, signToken } from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import User from '../models/User.js';
import bcryptjs from "bcryptjs";

const authRouter = express.Router();

authRouter.post('/signin', async (req, res) => {
    try {
        const result = await User.findOne({
            where: {
                email: req.body.email
            } 
        });
        if (!result) {
            res.status(401).json(new Error("Error", "Email or password incorrect"));
            return;
        }
        if (!(await bcryptjs.compare(req.body.password, result.password))) {
            res.status(401).json(new Error("Error", "Email or password incorrect"));
            return;
        }
        res.json({ user: result, accessToken: await signToken(result) });
    } catch (error) {
        res.sendStatus(500);
        throw error;
    }
});

authRouter.post('/tokenSignin', async (req, res) => {
    try {
        const decodedToken = await checkToken(req.body.token);
        console.log(decodedToken)
        const result = await User.findOne({
            where: {
                email: decodedToken.email
            } 
        });
        if (!result) {
            res.status(401).json(new Error("Error", "Email or password incorrect"));
            return;
        }
        console.log(decodedToken.password, result.password)
        if (!(decodedToken.password === result.password)) {
            res.status(401).json(new Error("Error", "Email or password incorrect"));
            return;
        }
        res.json({ user: result, accessToken: await signToken(result) });
    } catch (error) {
        res.sendStatus(500);
        throw error;
    }
});

authRouter.post('/signup', async (req, res) => {
    try {
        const result = await User.create({
            ...req.body,
        });
        res.status(201).json(result);
    } catch (error) {
        res.sendStatus(400);
    }
});

export default authRouter;
