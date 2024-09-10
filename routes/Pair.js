const express = require('express');

const {addPair , getPAairs , getSinglePair } = require("../controller/Pair")

const router = express.Router();

router.route("/addPair").post(addPair);
router.route("/getPAairs").get(getPAairs);
router.route("/getSinglePair/:id").get(getSinglePair)

module.exports = router;