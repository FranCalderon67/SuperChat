const express = require("express")
const app = express()
const cors = require('cors')
const PORT = 8080
const chatController = require('./Controller/chatController.js')
const messageRoutes = require('./Routes/chatRoutes.js')

const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: SocketServer } = require('socket.io')
const socketServer = new SocketServer(httpServer)
const chatSocket = require('./WebSocket/messageWebSocket.js')

socketServer.on("connection", async (socket) => {
    chatSocket(socket, socketServer.sockets)
})

app.use(cors())
chatController.connect()
app.use(express.json())
app.use(messageRoutes)


httpServer.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})