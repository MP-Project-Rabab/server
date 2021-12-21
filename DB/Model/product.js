const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rate" },
});

module.exports = mongoose.model("Product", productSchema);
