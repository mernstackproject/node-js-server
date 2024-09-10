const express = require('express')

const { postdata, get } = require("../controller/Practice")

const router = express.Router();

router.route("/example").post(postdata);

router.route("/get").get(get);


module.exports = router;