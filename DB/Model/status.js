const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  ready: { type: Boolean, default:true },
  rejected: { type: Boolean, default:false  },
  pending: { type: Boolean, default:false  },
  
});

module.exports = mongoose.model("Status", statusSchema);
