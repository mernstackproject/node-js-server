const transactions = require("../models/transaction");

exports.transactions = async (req, res) => {
  const { accountNumber, transaction } = req.body;
  const user = req.user;
  if (!accountNumber) {
    return res.status(401).send({ message: "Invalid account number" });
  }
  try {
    const existingUser = await transactions.findOne({ userId: user.id });
    if (!existingUser) {
      const data = await transactions.create({
        accountNumber: accountNumber,
        transactionsData: [
          { amount: transaction[0].amount, transactionType: "deposit" },
        ],
        userId: user.id,
      });

      return res.status(200).json(data);
    } else {
      const totalAmount = existingUser.transactionsData.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );
      existingUser.totalAmount = totalAmount;
      existingUser.accountNumber = accountNumber;
      existingUser.transactionsData.push({
        amount: transaction[0].amount,
        transactionType: "deposit",
      });

      await existingUser.save();

      return res
        .status(200)
        .json({ message: "Deposit successful", existingUser });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Deposit failed" });
  }
};

// user withdraws a transaction
exports.with;
