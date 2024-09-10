
const express = require('express');

const { getUserMine ,updateUserMine, verifyToken} = require("../controller/user")

const router = express.Router();

router.route("/getUserMine").get(verifyToken, getUserMine);
router.route("/updateUserMine").post(verifyToken, updateUserMine)
// router.route("/getcourse").get(getcourse);

module.exports = router;