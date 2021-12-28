const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: { type: Number },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Rate", ratingSchema);
