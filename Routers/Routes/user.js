const express = require("express");
const {
  register,
  logIn,
  allUser,
  profile,
  deleteUser,
  activatedAccount,
  forgetPass,
  updatePassword,
  updateProfile,
  updateUserType
} = require("../Controllers/user");
const authentication = require("../Midleware/auth");
const authorization = require("../Midleware/aouth");
const passport = require("passport");
// const {googlePass} = require('../../passport')
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.get("/activated/:token", activatedAccount);
userRouter.post("/login", logIn);
userRouter.get("/profile", profile);
userRouter.put("/update",authentication, updateProfile);
userRouter.post("/forget", forgetPass);
userRouter.put("/reset-pass/:res-token", authentication, updatePassword);
// // just for admin
userRouter.put("/user-type", authentication, authorization, updateUserType);
userRouter.get("/", authentication, authorization, allUser);
userRouter.delete("/delete", authentication, authorization, deleteUser);


module.exports = userRouter;
