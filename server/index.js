import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import authRouter from './routes/auth.js';
import './ws-server.js'

const app = express();
const port = process.env.API_PORT || 3000;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('ROOT');
});

app.use('/', authRouter);

app.listen(port, () => {
    console.log('Server running on port : ', port);
});
