import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import './ws-server.js';
import { checkAuthentification } from './middlewares/auth.js';
import { faker } from '@faker-js/faker';
import { authRouter, topicRouter, userRouter, userTopicRouter, topicMessagesRouter, reservationRouter, requestRouter, sseRouter, restRouter, chatRouter } from './routes/index.js';
import { User, Topic, Message, Reservation, UserTopics, Request, Chat, UserChats } from './models/index.js';

const app = express();
const port = process.env.API_PORT || 4000;

app.use(cors());
app.use(json());

// await User.create({
//     email: faker.internet.email(),
//     username: faker.name.fullName(),
//     password: faker.internet.password()
// });

User.belongsToMany(Topic, { through: UserTopics });
User.belongsToMany(Chat, { through: UserChats });
User.hasMany(Request, { foreignKey: "userId" });
User.hasMany(Reservation, { foreignKey: "userId" });
User.hasMany(Message);

Topic.belongsToMany(User, { through: UserTopics });
Topic.hasMany(Message, { foreignKey: "topicId" });

Message.belongsTo(Topic);
Message.belongsTo(User);
Message.belongsTo(Chat);

Reservation.belongsTo(User);

Request.belongsTo(User);
Request.belongsTo(Chat);

Chat.hasMany(Message);
Chat.hasOne(Request);
Chat.belongsToMany(User, { through: UserChats });

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
app.use('/chats', checkAuthentification, chatRouter);

app.listen(port, () => {
    console.log('Server running on port : ', port);
});
