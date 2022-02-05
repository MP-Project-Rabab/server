const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  phoneNumber: { type: Number, default: "" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg",
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  shop: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  service: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOptions" },
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  ready: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rate" },
  userType: { type: String, default: "normal" },
  location: { type: String },
  certifacte: { type: String },
  restToken: { type: String, default: "" },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
