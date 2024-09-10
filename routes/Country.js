
const express = require('express');

const {postCountry  , getCountry} = require("../controller/Country")

const router = express.Router();

router.route("/postCountry").post(postCountry);
router.route("/getCountry").post(getCountry);
// router.route("/getcourse").get(getcourse);

module.exports = router;