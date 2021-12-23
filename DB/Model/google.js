const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  avatar: { type: String },
});

module.exports = mongoose.model("googleUser", userSchema);
