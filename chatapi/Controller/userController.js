const userContainer = require("../Container/mongoContainer.js");
require("dotenv").config();
const mongoUri = process.env.mongoURI;
const chatUser = new userContainer(mongoUri, "SuperChat", "users");
const userController = {};

userController.addUser = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lastName: req.body.lastName,
        chats: [{
            contact: [{
                name: "",
                messages: []
            }]
        }]

    }
    try {
        await chatUser.addItem(user)
        return res.send("Usuario Creado")
    } catch (error) {
        console.log("ERROR=>", error)
    }
};

userController.getUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await chatUser.getUser(email);
        if (user && password == user.password) {
            return res.send({ succes: true })
        } else {
            return res.status(401).send({ error: "Algunos datos son incorrectos" })
        };
    } catch (error) {
        console.log("ERROR=>", error)
    };
};

module.exports = userController;