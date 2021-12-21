const express = require("express");
const { register, logIn, allUser,profile, deleteUser, activated, forgetPass, updatePass } = require("../Controllers/user");
const authentication = require("../Midleware/auth");
const authorization = require("../Midleware/aouth");
// const passport = require("passport");
// const {googlePass} = require('../../passport')
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.get("/activated/:token", activated);
userRouter.post("/login", logIn);
userRouter.get("/profile", profile);
// userRouter.put("/forget", forgetPass);
// userRouter.get("/reset-pass/:res-tok", updatePass);
// // just for admin
userRouter.get("/", authentication, authorization, allUser);
userRouter.delete("/", authentication, authorization, deleteUser);


module.exports = userRouter;
