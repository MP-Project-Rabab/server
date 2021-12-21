const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({

    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
})






module.exports = mongoose.model("ServiceOptions", servicesSchema);