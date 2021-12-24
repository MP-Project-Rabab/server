const express = require("express");
const commentRouter = express.Router();
const {
  newComment,
  updateComment,
  deleteComment,
  allComment,
} = require("../Controllers/comment");
const authentication = require("../midleware/auth");

commentRouter.post("/add", authentication, newComment);
commentRouter.get("/all", authentication, allComment);
commentRouter.put("/update", authentication, updateComment);
commentRouter.delete("/delete", authentication, deleteComment);

module.exports = commentRouter;
