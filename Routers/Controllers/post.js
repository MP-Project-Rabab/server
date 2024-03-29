const postModel = require("../../DB/Model/post");
const commentModel = require("../../DB/Model/comment");
const userModel = require("./../../DB/Model/user");

const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// get all post

const allPost = (req, res) => {
  postModel
    .find({ isDeleted: false, isApproved: true })
    .populate({
      path: "commentes",
      module: commentModel,
      populate: { path: "userId" },
    })
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
    .populate({
      path: "commentes",
      module: commentModel,
      populate: { path: "userId" },
    })
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
    .populate({
      path: "commentes",
      module: commentModel,
      populate: { path: "userId" },
    })
    .populate("user")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
    });
};

// creat new post
const newPost = async (req, res) => {
  const { user, desc, img, isAdvice, isProblem, title } = req.body;
  const cloude = await cloudinary.uploader.upload(img, {
    folder: "post-img",
  });
  const post = new postModel({
    desc,
    img: cloude.secure_url,
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
  const cloude = await cloudinary.uploader.upload(img, {
    folder: "post-img",
  });
  if (idToken == postedBy.user) {
    await postModel.findByIdAndUpdate(
      { _id },
      { $set: { desc, img: cloude.secure_url, title } },
      { new: true }
    );
    res.json("done");
  } else {
    return res.status(403).json("forbidden");
  }
};

// soft delete post function
const deletePost = async (req, res) => {
  const { isDeleted, _id, adminId } = req.query;
  const tokenId = req.saveToken.id;
  const postedBy = await postModel.findOne({ _id });
  const admin = await userModel.findById(adminId);
 
  if (tokenId == postedBy.user || admin.userType == "admin") {
    await postModel
      .findOneAndUpdate({ _id }, { $set: { isDeleted: true } }, { new: true })
      .then(() => {
        res.status(200).json({ massege: "deleted successfully" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(403).json("forbidden");
  }
};

// get one post
const onePost = (req, res) => {
  const { _id } = req.query;
  postModel
    .findOne({ _id, isDeleted: false })
    .populate({
      path: "commentes",
      module: commentModel,
      populate: { path: "userId" },
    })
    .populate("user")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("you don't have permission");
    });
};

// // get post by who post it
// const postedBy = async (req, res) => {
//   const { user } = req.query;

//   await postModel
//     .find({ user, isDeleted: false })
//     .populate("commentes")
//     .exec((result) => {
//       res.status(200).json(result);
//       console.log(result);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// };

// Get not Approved Posts
const notApproved = (req, res) => {
  postModel
    .find({ isDeleted: false, isApproved: false })
    .populate("commentes")
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
  onePost,
  allTips,
  allProblems,
  notApproved,
  approved,
};
