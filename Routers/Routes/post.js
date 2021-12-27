const express = require("express");
const authentication = require("../Midleware/auth");
const authorization = require("../Midleware/aouth");

const {
  newPost,
  allPost,
  updatePost,
  deletePost,
  postedBy,
  allTips,
  allProblems,
  notApproved,
  approved,
} = require("../Controllers/post");

const postRouter = express.Router();

postRouter.post("/post", authentication, newPost);
postRouter.put("/update", authentication, updatePost);

postRouter.get("/", allPost);
postRouter.get("/tips", allTips);
postRouter.get("/problems", allProblems);
postRouter.get("/postBy", authentication, postedBy);
postRouter.delete("/delete", authentication, deletePost);

// For Admin
postRouter.get("/notAprove", authentication, authorization, notApproved);
postRouter.put("/approved", authentication, authorization, approved);

module.exports = postRouter;
