const express = require('express');

const {addCryptoCoins } = require("../controller/Crypto")

const router = express.Router();

router.route("/addCryptoCoins").post(addCryptoCoins);
// router.route("/getcourse").get(getcourse);

module.exports = router;