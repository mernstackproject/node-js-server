const express = require('express')

const {Crudopration , getcrud , updatecrud , SingleStudentNameparticular , kycstudent} = require("../controller/Crud")

const router = express.Router();

router.route("/crud").post(Crudopration);
router.route("/getcrud").get(getcrud);

router.route("/updatecrud/:id").post(updatecrud);
router.route("/SingleStudentNameparticular/:id").get(SingleStudentNameparticular)
router.route("/kycstudent/:id").post(kycstudent);

module.exports = router;