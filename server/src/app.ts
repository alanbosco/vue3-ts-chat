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

interface Message {
    message: string,
    sender: string,
    type: string,
}

const users = new Map();

io.on('connection', (socket)=>{
    console.log('a user connected');
    
    socket.on('join', (username)=>{
        users.set(socket.id, username);
        console.log('user joined: ' + username);
        socket.broadcast.emit('chat', {message: username + ' joined the chat', sender: 'server', type: 'info'});
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })

    socket.on('chat', (msg, fn)=>{
        console.log('message: ' + msg);
        // io.emit('chat', msg);
        const chat = {message: msg, sender: users.get(socket.id), type: 'message'}
        socket.broadcast.emit('chat', chat);
        fn(chat)
    })
})


// if (import.meta.env.PROD) {
server.listen(4000);
console.log('listening on http://localhost:4000/');
// }

export const viteNodeApp = app;