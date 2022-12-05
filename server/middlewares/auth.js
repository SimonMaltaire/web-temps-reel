import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';

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

export const checkToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return {
            id: decoded.id,
            username: decoded.username,
            isAdmin: decoded.isAdmin,
        }
    } catch (error) {
        throw error;
    }
};

export const checkAuthentification = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  const user = await checkToken(token);
  if (user) {
    req.user = await User.findByPk(user.id);
    next();
  } else {
    res.sendStatus(401);
  }
};
