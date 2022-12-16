import express from 'express';
import events from "events";

const sseRouter = express.Router();
const restRouter = express.Router();

const eventsEmitter = new events.EventEmitter();

sseRouter.get('/', (req, res) => {
    eventsEmitter.addListener('admin-notifications', function (body) {
        if (res.hasHeader('content-type') && res.hasHeader('cache-control') && res.hasHeader('connection')) {
            res.write(`events: notifications\ndata: ${JSON.stringify(body)}\n\n`);
        } else {
            res.writeHead(200, {
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
        
            res.flushHeaders(); // flush the headers to establish SSE with client
    
            res.write(`events: notifications\ndata: ${JSON.stringify(body)}\n\n`);
        }
    });
});

restRouter.post('/', (req, res) => {
    eventsEmitter.emit('admin-notifications', req.body);
});

export { sseRouter, restRouter };