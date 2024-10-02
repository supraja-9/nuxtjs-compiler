import { Server } from 'socket.io'

export default defineEventHandler(event => {
    if (globalThis.io) {
        return
    }

    const server = event.node.res.socket?.server
    const io = new Server(server, {
        path: '/api/socket.io/',
        cors: {
            origin: "*",
        },
    })

    globalThis.io = io
    globalThis.clients = new Map()
    globalThis.channels = new Map()

    io.on('connection', (socket) => {
        // console.log(socket.id + ' : connection')

        socket.on('connect-channel', ({ channel_id, user_id }) => {
            if (!channel_id || !user_id) {
                return
            }
            const user = globalThis.clients.get(user_id)
            if (user) {
                if (user.id !== socket.id) {
                    user.disconnect(true)
                }
                const prev_channel = globalThis.channels.get(user_id)
                if (prev_channel && prev_channel !== channel_id) {
                    socket.leave(prev_channel)
                }
            }
            socket.join(channel_id)
            globalThis.clients.set(user_id, socket)
            globalThis.channels.set(user_id, channel_id)
        })

        socket.on('leave-channel', ({ user_id }) => {
            if (!user_id) {
                return
            }
            const prev_channel = globalThis.channels.get(user_id)
            if (prev_channel) {
                socket.leave(prev_channel)
            }
        })

        socket.on('code-change', ({ user_id, channel_id, language, files }) => {
            if (!channel_id || !user_id) {
                return
            }
            socket.to(channel_id).emit('multicast', { sender_id: user_id, channel_id, language, files })
        })

        socket.on('chat-connect', ({ user_id }) => {
            const user = globalThis.clients.get(user_id)
            if (user && user.id != socket.id) {
                user.disconnect(true)
            }
            globalThis.clients.set(user_id, socket)
        })

        socket.on('chat-message', (data) => {
            io.emit('chat-broadcast', data)
        })

        socket.on("disconnect", () => {
            socket.disconnect(true)
            // console.log(socket.id + " : disconnected")
        })
    })

})
