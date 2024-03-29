import jwt, { decode } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';

export const signToken = async (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        password: user.password
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
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            password: decoded.password
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
  try {
      const user = await checkToken(token);
      if (user) {
        req.user = await User.findByPk(user.id);
        next();
      } else {
        res.sendStatus(401);
      }
  } catch (error) {
    res.sendStatus(403);
  }
};
