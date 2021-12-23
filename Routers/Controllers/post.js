const postModel = require("../../DB/Model/post");


// creat new post
const newPost = (req, res) => {
    const { user, desc, img, isAdvice, isProblem, title} = req.body;
    const post = new postModel({
      desc,
      img,
      user,
      isAdvice,
      isProblem,
      title
    });
  
    post
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };






module.exports = { newPost}
    // , allPost, updatePost, deletePost, postedBy };

