const userContainer = require("../Container/mongoContainer.js");
require("dotenv").config();
const mongoUri = process.env.mongoURI;
const chatUser = new userContainer(mongoUri, "SuperChat", "users");
const userController = {};

userController.addUser = async (req, res) => {
    try {
        await chatUser.addItem(req.body)
        return res.send("Usuario Creado")
    } catch (error) {
        console.log("ERROR=>", error)
    }
}

userController.getUser = async (req, res) => {
    try {
        console.log(req.body.email);
        const user = await chatUser.getUser(req.body.email);
        const password = req.body.password;
        if (user && password == user.password) {
            res.send(`Usuario ${user.name} ${user.lastName} encontrado`)
            //res.status(301).redirect("http://localhost:3000/chat")
        } else {
            res.send("Algunas datos son incorrectos")
        }
    } catch (error) {
        console.log("ERROR=>", error)
    }
}

module.exports = userController;