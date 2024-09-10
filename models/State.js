const mongoose = require("mongoose");

const State = new mongoose.Schema({
  stateName: {
    type: String,
  },
  countryType:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"country"
  }

});

module.exports = mongoose.model("state", State);