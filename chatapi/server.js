const express = require("express")
const app = express()
const cors = require('cors')
const PORT = 8080
const chatController = require('./Controller/chatController.js')
const messageRoutes = require('./Routes/chatRoutes.js')


app.use(cors())
chatController.connect()
app.use(express.json())
app.use(messageRoutes)


app.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})