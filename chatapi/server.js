const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 8080
const chatController = require('./Controller/chatController.js')
const messageRoutes = require('./Routes/chatRoutes.js')
const userRoutes = require("./Routes/userRoutes.js")
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
})


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
app.use(userRoutes)

server.listen(PORT, () => {
    console.log(`Server up in ${PORT}`)
})


