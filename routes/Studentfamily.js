const express = require('express')

const {Studentfamilydetails, getstudentfamily} = require("../controller/Studentfamily")

const router = express.Router()

router.route("/student-family").post(Studentfamilydetails)
router.route("/student-family-get").post(getstudentfamily)



module.exports = router;