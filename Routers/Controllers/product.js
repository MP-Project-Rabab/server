const productModel = require("../../DB/Model/product");
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
    .populate("comment")
    .populate("seller")
    .populate("rating")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
    });
};
const notApproved = (req, res) => {
  productModel
    .find({ isApproved: false })
    .populate("comment")
    .populate("seller")
    .populate("rating")
    .exec((err, result) => {
      if (err) return handleError(err);
      res.status(200).json(result);
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
  const productBy = await productModel.findOne({ _id });
  if (tokenId == productBy.userId) {
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

module.exports = {
  allProduct,
  newProduct,
  approved,
  notApproved,
  deleteProduct,
};
