import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import './ws-server.js';
import { checkAuthentification } from './middlewares/auth.js';

import authRouter from './routes/auth.js';
import topicRouter from './routes/topic.js';
import userRouter from './routes/user.js';
import userTopicRouter from './routes/userTopic.js';
import topicMessagesRouter from './routes/topicMessages.js'
import User from './models/User.js';
import Topic from './models/Topic.js';
import Message from './models/Message.js';
import UserTopics from './models/UserTopics.js';

const app = express();
const port = process.env.API_PORT || 4000;

app.use(cors());
app.use(json());

User.belongsToMany(Topic, { through: UserTopics });
Topic.belongsToMany(User, { through: UserTopics });

Message.belongsTo(Topic, { foreignKey: "topicId" });
Topic.hasMany(Message, { foreignKey: "topicId" });

app.get('/', (req, res) => {
    res.send('ROOT');
});

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/topics', checkAuthentification, topicRouter);
app.use('/user-topics', checkAuthentification, userTopicRouter);
app.use('/topic-messages', checkAuthentification, topicMessagesRouter);

app.listen(port, () => {
    console.log('Server running on port : ', port);
});
