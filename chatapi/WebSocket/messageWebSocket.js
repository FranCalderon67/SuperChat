const chatController = require('../Controller/chatController.js')



const messageSocket = async (socket, sockets) => {
    socket.emit("messages", await chatController.getAll())

    socket.on("new-message", async (message) => {
        await chatController.senMessage(message)
        sockets.emit("messages", await chatController.getAll())
    })


}


module.exports = messageSocket