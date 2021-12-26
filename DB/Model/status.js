const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  tatus: { type: String, default: "Ready" },
});

module.exports = mongoose.model("Status", statusSchema);
