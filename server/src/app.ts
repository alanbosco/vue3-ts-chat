import express from 'express';
import http from 'http';
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!'});
});

io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })

    socket.on('chat', (msg, fn)=>{
        console.log('message: ' + msg);
        // io.emit('chat', msg);
        socket.broadcast.emit('chat', msg);
        fn('server: ' + msg)
    })
})


// if (import.meta.env.PROD) {
server.listen(4000);
console.log('listening on http://localhost:4000/');
// }

export const viteNodeApp = app;