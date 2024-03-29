const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  Quantity: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  ratings: { type: mongoose.Schema.Types.ObjectId, ref: "Rate" },
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", productSchema);
