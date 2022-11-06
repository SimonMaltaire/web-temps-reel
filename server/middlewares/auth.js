import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET);
};

export const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        return jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = user;
            }
            next();
        });
    } else {
        res.sendStatus(403);
    }
};
