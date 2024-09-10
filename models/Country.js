const mongoose = require("mongoose");

const Country = new mongoose.Schema({
  countryName: {
    type: String,
  },
 

});

module.exports = mongoose.model("country", Country);