const express = require("express");
const authentication = require('../Midleware/auth')
const {newPost, allPost, updatePost, deletePost, postedBy, allTips, allProblems} = require('../Controllers/post');

const postRouter = express.Router();

postRouter.post('/post',authentication, newPost)
postRouter.put('/update',authentication, updatePost)

postRouter.get('/',authentication, allPost)
postRouter.get('/tips',authentication, allTips)
postRouter.get('/problems',authentication, allProblems)
postRouter.get('/postBy',authentication, postedBy)
postRouter.delete('/delete',authentication, deletePost)



module.exports = postRouter;