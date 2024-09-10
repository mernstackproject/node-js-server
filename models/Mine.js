const mongoose = require('mongoose');

const userMineSchema = new mongoose.Schema({
    userMine: [{ _id: mongoose.Schema.Types.ObjectId, profit: Number, profitHour: Number }],
    userId:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'users'
    }
  
});
module.exports = mongoose.model("Mine", userMineSchema);
