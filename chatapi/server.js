const express = require("express")
const app = express()
const cors = require('cors')

const PORT = 8080
const chatController = require('./Controller/chatController.js')
const messageRoutes = require('./Routes/chatRoutes.js')

const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// const { Server: HttpServer } = require('http')
// const httpServer = new HttpServer(app)
// const { Server: SocketServer } = require('socket.io')
// const socketServer = new SocketServer(httpServer)
const chatSocket = require('./WebSocket/messageWebSocket.js')

// socketServer.on("connection", (socket) => {
//     // chatSocket(socket, socketServer.sockets)
//     console.log(`User connected: ${socket.id}`)
// })

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id} `)

    socket.on("new-message", (data) => {
        socket.broadcast.emit("messages", data)
    })
})




app.use(cors())
chatController.connect()
app.use(express.json())
app.use(messageRoutes)


server.listen(PORT, () => {
    console.log(`Server up in ${PORT}`)
})

// httpServer.listen(PORT, () => {
//     console.log(`Server up in port ${PORT}`)
// })