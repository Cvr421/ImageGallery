const express = require("express");
const userController = require("../controllers/userController");
// const auth = require("../middleware/auth");
const userRouter = express.Router();
// userRouter.get("/getuser/:id", auth, userController.getuser);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;