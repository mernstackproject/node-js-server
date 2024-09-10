const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  bankName: {
    type: String,
  },
  ifscCode:{
    type: String,
    unique: true  // Set unique index for ifscCode
  },
  accountNumber:{
    type: String,
    unique: true  // Set unique index for accountNumber
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model("bank", bankSchema);
