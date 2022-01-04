const productModel = require("../../DB/Model/product");
const userModel = require("../../DB/Model/user");

const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// get all Product

const allProduct = (req, res) => {
  productModel
    .find({ isApproved: true })
    .populate("ratings comment seller")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};
const notApproved = (req, res) => {
  productModel
    .find({ isApproved: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Add new Product
const newProduct = async (req, res) => {
  const { seller, img, name, price, Quantity } = req.body;
  const cloude = await cloudinary.uploader.upload(img, {
    folder: "product-img",
  });
  const product = new productModel({
    img: cloude.secure_url,
    seller,
    price,
    name,
    Quantity,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update product approval function
const approved = async (req, res) => {
  const { isApproved, _id } = req.body;
  await productModel
    .findByIdAndUpdate({ _id }, { $set: { isApproved } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("you don't have permission");
    });
};


// delete product function
const deleteProduct = async (req, res) => {
  const { _id } = req.query;
  const tokenId = req.saveToken.id;
  const productId = await productModel.findOne({ _id });
  if (tokenId == productId.userId) {
    await productModel
      .findByIdAndDelete(_id)
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

// to add item to cart
const oneProduct = (req, res) => {
  const {_id, user} = req.body;
  productModel
    .findOne({_id})
    .then(async (result) => {
      await userModel.findByIdAndUpdate(user, {$push: {cart:result}})
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
}
// delete item from the cart
const deleteItem = (req, res) => {
  const {_id, user} = req.body;
  productModel
    .findOne({_id})
    .then(async (result) => {
        // await postModel.findByIdAndUpdate(commentedBy.postId, {$pull: {commentes: commentedBy._id}})
      await userModel.findByIdAndUpdate(user, {$pull: {cart:result._id}})
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
}


module.exports = {
  allProduct,
  newProduct,
  approved,
  notApproved,
  deleteProduct,
  oneProduct,
  deleteItem
};
