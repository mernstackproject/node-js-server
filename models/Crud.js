const mongoose = require("mongoose");

const crud = new mongoose.Schema({
  name: {
    type: String,
  },
  lname: {
    type: String,
  },
  deleteat: {
    type: Boolean,
    default: false,
  },
  Kycstatus: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("crud", crud);
