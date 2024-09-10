const express = require('express')
const {verifyToken } = require('../Middelware/Auth')
const {transactions} = require("../controller/transaction")

const router = express.Router()

router.route("/transactions").post(verifyToken,transactions)

module.exports = router;