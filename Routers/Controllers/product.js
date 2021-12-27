const productModel = require("../../DB/Model/product");

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
const newProduct = (req, res) => {
  const { seller, img, name, price, Quantity } = req.body;
  const product = new productModel({
    img,
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
const deleteproduct = async (req, res) => {
    const { _id } = req.query;
    const tokenId = req.saveToken.id;
    const commentedBy = await commentModel.findOne({ _id });
    if (tokenId == commentedBy.userId) {
      await commentModel
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
  deleteproduct,
};
