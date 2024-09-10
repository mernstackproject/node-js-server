const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accountNumber: { type: String, required: true, unique: true },
  transactionsData: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      transactionType: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("transaction", transactionSchema);
