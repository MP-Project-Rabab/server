const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    comment: {type: String, required: true},
    date: {type: Date, default: Date.now},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
})






module.exports = mongoose.model("Comment", commentSchema);