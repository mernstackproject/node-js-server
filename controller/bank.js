const bank = require("../models/bank");

exports.addBank = async (req, res) => {
    const id = req.loginUserId;
    const { bankName, ifscCode, accountNumber } = req.body;
    try {
      const checkExistAccount = await bank.findOne({ accountNumber: accountNumber });
      if (checkExistAccount) {
        return res.status(400).json({ message: "Account already exists in the bank " + bankName + "." });
      }
      const checkExistIfsc = await bank.findOne({ ifscCode: ifscCode });
      if (checkExistIfsc) {
        return res.status(400).json({ message: "Ifsc already exists in the bank " + ifscCode + "." });
      }
      const creteBank = await bank.create({
        bankName: bankName,
        ifscCode: ifscCode,
        accountNumber: accountNumber,
        userId: id,
      });
  
      return res.status(200).json({ success: true, data: creteBank });
    } catch (err) {
      console.log("error in code", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  



  

