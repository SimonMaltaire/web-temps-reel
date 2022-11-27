import { Server } from "socket.io";

const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("web socket connected")
    socket.emit('message', 'cowboy');

    socket.on('howdy', (arg) => {
        console.log(arg)
    })
})