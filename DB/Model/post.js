const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  img: { type: String },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  isProblem: { type: Boolean },
  isAdvice: { type: Boolean },
  date: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOptions" },
  commentes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", postSchema);
