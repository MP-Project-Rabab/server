const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   img: {type: String},
   desc: {type: String, required: true},
   isDeleted: { type: Boolean, default: false },
   date: {type: Date, default: Date.now},
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
   type: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOptions"},
   comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
})


module.exports = mongoose.model("Post", postSchema);