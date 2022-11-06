import express from 'express';
import { verifyToken, signToken } from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.post('/signin', (req, res) => {
    // Check if user exists then return access token
    res.send({ accessToken: signToken(req.body) });
});

authRouter.post('/signup', (req, res) => {
    // create User
});

authRouter.get('/life', [verifyToken], (req, res) => {
    res.send({ message: 'YEAH BOY' });
});

export default authRouter;
