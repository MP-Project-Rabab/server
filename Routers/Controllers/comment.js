const commentModel = require("../../DB/Model/comment");


// creat new comment
const newComment = (req, res) => {
    const { comment, postId, userId } = req.body;
    const comments = new commentModel({
      comment,
      postId,
      userId,
    });
  
    comments
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

// get all comment

const allComment = (req, res) => {
  commentModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};




  module.exports = { newComment, allComment };
//   , updateComment, deleteComment, 