const commentModel = require("../../DB/Model/comment");
const postModel = require("./../../DB/Model/post");

// creat new comment
const newComment = (req, res) => {
  const { comment, postId, userId, productId } = req.body;
  const comments = new commentModel({
    comment,
    postId,
    userId,
    productId,
  });

  comments
    .save()
    .then(async (result) => {
      await postModel.findByIdAndUpdate(postId, {
        $push: { commentes: result._id },
      });
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
    .populate("postId userId productId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update comment function
const updateComment = async (req, res) => {
  const { comment, _id } = req.query;
  const tokenId = req.saveToken.id;
  const commentedBy = await commentModel.findOne({ _id });
  if (tokenId == commentedBy.userId) {
    await commentModel
      .findOneAndUpdate({ _id }, { $set: { comment } })
      .then(() => {
        res.status(200).json({ massege: "updated successfully" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(403).json("forbidden");
  }
};

// delete comment function
const deleteComment = async (req, res) => {
  const { _id } = req.query;
  const tokenId = req.saveToken.id;
  const commentedBy = await commentModel.findOne({ _id });

  if (tokenId == commentedBy.userId) {
    await commentModel
      .findByIdAndDelete(_id)
      .then(async () => {
        await postModel.findByIdAndUpdate(commentedBy.postId, {
          $pull: { commentes: commentedBy._id },
        });
        res.status(200).json({ massege: "deleted successfully" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(403).json("forbidden");
  }
};

module.exports = { newComment, allComment, updateComment, deleteComment };
