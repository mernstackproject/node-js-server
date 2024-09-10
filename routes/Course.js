const express = require('express')

const {postcourse , getcourse , single} = require("../controller/Course")

const router = express.Router();

router.route("/course").post(postcourse);
router.route("/getcourse").get(getcourse);
router.route("/single/:id").get(single);

module.exports = router;