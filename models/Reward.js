// models/reward.js
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userRewards: [{
    day: Number,
    reward: String,
    claimed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('reward', rewardSchema);
