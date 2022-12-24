import authRouter from './auth.js';
import topicRouter from './topic.js';
import userRouter from './user.js';
import userTopicRouter from './userTopic.js';
import topicMessagesRouter from './topicMessages.js';
import reservationRouter from './reservation.js';
import requestRouter from './request.js';
import chatRouter from './chat.js';
import { sseRouter, restRouter } from './sse.js';

export { authRouter, topicRouter, userRouter, userTopicRouter, topicMessagesRouter, reservationRouter, requestRouter, sseRouter, restRouter, chatRouter }