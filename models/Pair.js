const mongoose = require("mongoose");

const pairAdd = new mongoose.Schema({
  firstcoinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crypto",
  },
  secondcoinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crypto",
  },
});

module.exports = mongoose.model("Pairs", pairAdd);
