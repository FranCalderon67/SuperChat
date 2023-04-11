const Router = require("express");
const controllerUser = require("../Controller/userController.js");
const userRouter = Router()

userRouter.get("/user", (req, res) => {
    controllerUser.getUser(req, res)
})


userRouter.post("/signup", (req, res) => {
    controllerUser.addUser(req, res);
});

userRouter.post("/login", (req, res) => {
    controllerUser.getUser(req, res);
});



module.exports = userRouter;
