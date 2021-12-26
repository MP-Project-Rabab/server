const express = require("express");
const authentication = require('../Midleware/auth')
const {newPost, allPost, updatePost, deletePost, postedBy, allTips, allProblems} = require('../Controllers/post');

const postRouter = express.Router();

postRouter.post('/post',authentication, newPost)
postRouter.put('/update',authentication, updatePost)

postRouter.get('/', allPost)
postRouter.get('/tips', allTips)
postRouter.get('/problems', allProblems)
postRouter.get('/postBy',authentication, postedBy)
postRouter.delete('/delete',authentication, deletePost)



module.exports = postRouter;