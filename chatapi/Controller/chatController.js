const chatContainer = require('../Container/mongoContainer.js')
require('dotenv').config()
const mongoUri = process.env.mongoURI
const superChat = new chatContainer(mongoUri, "SuperChat", "messages")
const chatController = {}

chatController.connect = async () => {
    try {
        await superChat.connectMongo()
    } catch (error) {
        console.log("ERROR=>", error)
    }

}

chatController.getAll = async (req, res) => {
    try {
        const messages = await superChat.getAll()
        return res.json(messages)
    } catch (error) {
        console.log("ERROR=>", error)
    }
}

chatController.senMessage = async (req, res) => {
    const newMessage = req.body
    try {
        await superChat.addItem(newMessage)
        return res.send("Message sent")
    } catch (error) {
        console.log("ERROR=>", error)
    }
}
module.exports = chatController

