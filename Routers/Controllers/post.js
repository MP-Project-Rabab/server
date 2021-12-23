const postModel = require("../../DB/Model/post");

// get all post

const allPost = (req, res) => {
  postModel
    .find({ isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// creat new post
const newPost = (req, res) => {
  const { user, desc, img, isAdvice, isProblem, title } = req.body;
  const post = new postModel({
    desc,
    img,
    user,
    isAdvice,
    isProblem,
    title,
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

// update post function
const updatePost = async (req, res) => {
  const { desc, img, _id, title } = req.body;
  const idToken = req.saveToken.id;
  const postedBy = await postModel.findOne({ _id });
  if (idToken == postedBy.user) {
    await postModel.findByIdAndUpdate(
      { _id },
      { $set: { desc, img, title } },
      { new: true }
    );
    res.json("done");
  } else {
    return res.status(403).json("forbidden");
  }
};
module.exports = { newPost, allPost, updatePost };
// ,  deletePost, postedBy };
