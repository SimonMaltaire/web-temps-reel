import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const signToken = async (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1y",
    });
};

export const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            return {
                id: decoded.id,
                username: decoded.username,
                isAdmin: decoded.isAdmin,
            }
        } catch (error) {
            throw error;
        }
    } else {
        res.sendStatus(403);
    }
};
