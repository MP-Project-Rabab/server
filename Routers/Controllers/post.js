const postModel = require("../../DB/Model/post");

// get all post

const allPost = (req, res) => {
  postModel
    .find({ isDeleted: false, isApproved: true })
    .populate("comment")
    .populate("user")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
    });
};

// get all tips
const allTips = (req, res) => {
  postModel
    .find({ isAdvice: true, isDeleted: false, isApproved: true })
    .populate("comment")
    .populate("user")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
    });
};

// get all Problems
const allProblems = (req, res) => {
  postModel
    .find({ isProblem: true, isDeleted: false, isApproved: true })
    .populate("comment")
    .populate("user")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
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

// soft delete post function
const deletePost = async (req, res) => {
  const { isDeleted, _id } = req.query;
  const tokenId = req.saveToken.id;
  const postedBy = await postModel.findOne({ _id });
  if (tokenId == postedBy.user) {
    postModel.findById({ _id }).then(async (result) => {
      if (result.isDeleted == true) {
        return res.json({ massege: "this post already have been deleted" });
      } else {
        await postModel.findOneAndUpdate(
          { _id },
          { $set: { isDeleted } },
          { new: true }
        );
        return res.json({ massege: "deleted successfully" });
      }
    });
  } else {
    res.status(403).json({ massege: "forbidden" });
  }
};

// get post by who post it
const postedBy = async (req, res) => {
  const { user } = req.query;

  await postModel
    .find({ user, isDeleted: false })
    .populate("Comment")
    .exec((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Get not Approved Posts
const notApproved = (req, res) => {
  postModel
    .find({ isDeleted: false, isApproved: false })
    .populate("comment")
    .populate("user")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
    });
};

// update all Pots to approval function
const approved = async (req, res) => {
  const { isApproved, _id } = req.body;
  await postModel
    .findByIdAndUpdate({ _id }, { $set: { isApproved } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("you don't have permission");
    });
};

module.exports = {
  newPost,
  allPost,
  updatePost,
  deletePost,
  postedBy,
  allTips,
  allProblems,
  notApproved,
  approved,
};
