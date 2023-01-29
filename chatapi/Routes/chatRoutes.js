const Router = require('express');
const controllerChat = require('../Controller/chatController.js');
const chatRouter = Router()

chatRouter.get('/messages', (req, res) => {
    controllerChat.getAll(req, res)
})

chatRouter.post('/send', (req, res) => {
    controllerChat.senMessage(req, res)
})

module.exports = chatRouter