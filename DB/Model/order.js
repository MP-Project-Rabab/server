const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Quantity: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orders: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  totalPrice: { type: Number },
});

module.exports = mongoose.model("Order", orderSchema);
