const mongoose = require("mongoose");

const cryptoCoin = new mongoose.Schema({
  firstcoin: {
    type: String,
  },
  secondcoin: {
    type: String,
  },
 
});

module.exports = mongoose.model("Crypto", cryptoCoin);
