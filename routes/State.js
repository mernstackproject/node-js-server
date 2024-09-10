


const express = require('express');

const {postState , getStateData , getUpdateState } = require("../controller/State")

const router = express.Router();

router.route("/postState").post(postState);
router.route("/getStateData").get(getStateData);
router.route("/getUpdateState").post(getUpdateState)

module.exports = router;