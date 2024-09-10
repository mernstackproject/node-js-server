const express = require("express");

const { poststudent } = require("../controller/Student");

const router = express.Router();

router.route("/student").post(poststudent);

module.exports = router;

