const mongoose = require("mongoose");

const practice = new mongoose.Schema({
  chart: {
    type: Number,
  },
  purchaseprice:{
    type:Number,
  },
  purchasegap:{
    type:Number,
  },
  sum:{
    type:Number,
  }
});

module.exports = mongoose.model("Example", practice);
