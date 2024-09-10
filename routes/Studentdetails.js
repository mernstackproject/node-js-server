const express = require("express");

    const {StuDetails , StuDetailsget  } = require("../controller/Studentdetails");

const router = express.Router();

router.route("/student-details").post(StuDetails);
router.route("/student-details-get").get(StuDetailsget);


module.exports = router;