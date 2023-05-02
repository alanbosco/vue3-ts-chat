import { reactive } from 'vue'
import { io } from 'socket.io-client'

export interface Chat {
    message: { message: string, type?: string, sender?: string}
    sender: string,
    type?: string,
}

export const state = reactive({
    connected: false,
    chats: [] as Chat[],
})

export const socket = io('http://localhost:4000', {
    autoConnect: false,
})

socket.on('connect', () => {
    state.connected = true
})

socket.on('disconnect', () => {
    state.connected = false
})

socket.on('chat', (message) => {
    console.log('message recived', message)
    state.chats.push({
        message: message,
        type: 'message',
        sender: 'other',
    })
})

export const join = (username: string, cb?: Function) => {
    socket.emit('join', username, () => {
        console.log('User joined', username)
        if (cb) cb()
    })
}

export const sendChat = (message: string, cb?: Function) => {
    socket.emit('chat', message, () => {
        console.log('Message sent', message)
        state.chats.push({
            message: {message, type: 'message'},
            sender: 'me',
        })
        if (cb) cb()
    })
}