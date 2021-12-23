const express = require("express");
const authentication = require('../Midleware/auth')
const {newPost, allPost, updatePost, deletePost, postedBy} = require('../Controllers/post');

const postRouter = express.Router();

postRouter.post('/post',authentication, newPost)
postRouter.put('/update',authentication, updatePost)

postRouter.get('/',authentication, allPost)
// postRouter.get('/profile',authentication, postedBy)
// postRouter.delete('/delete',authentication, deletePost)



module.exports = postRouter;