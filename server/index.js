import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import './ws-server.js';
import { checkAuthentification } from './middlewares/auth.js';

import { authRouter, topicRouter, userRouter, userTopicRouter, topicMessagesRouter, reservationRouter, requestRouter, sseRouter, restRouter } from './routes/index.js';
import { User, Topic, Message, Reservation, UserTopics, Request } from './models/index.js';

const app = express();
const port = process.env.API_PORT || 4000;

app.use(cors());
app.use(json());

User.belongsToMany(Topic, { through: UserTopics });
Topic.belongsToMany(User, { through: UserTopics });

Message.belongsTo(Topic);
Topic.hasMany(Message, { foreignKey: "topicId" });

Reservation.belongsTo(User);
User.hasMany(Reservation, { foreignKey: "userId" });

Request.belongsTo(User);
User.hasMany(Request, { foreignKey: "userId" });

app.get('/', (req, res) => {
    res.send('ROOT');
});

app.use('/', authRouter);
app.use('/users', checkAuthentification, userRouter);
app.use('/topics', checkAuthentification, topicRouter);
app.use('/user-topics', checkAuthentification, userTopicRouter);
app.use('/topic-messages', checkAuthentification, topicMessagesRouter);
app.use('/reservations', checkAuthentification, reservationRouter);
app.use('/admin-notifications', sseRouter);
app.use('/notifications', restRouter);
app.use('/requests', checkAuthentification, requestRouter);

app.listen(port, () => {
    console.log('Server running on port : ', port);
});
