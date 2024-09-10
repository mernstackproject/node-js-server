const express = require("express");

const { Singlestuname , Singlestugetname  , singlestudentname} = require("../controller/Singlestudentname");

const router = express.Router();

router.route("/student-name").post(Singlestuname);
router.route("/student-get-name").get(Singlestugetname);
router.route("/single-student/:id").get(singlestudentname);
module.exports = router;
