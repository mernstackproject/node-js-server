const express = require('express')
const SelectedPlan = require("../models/form")
const {
    // loginuser,
    // loginuse
    register,
    login,
    changepassword,
    verifyToken,
    getUsers,
    likeDislikeUser,
    // whatsAppSendMessage,
    forgotPassword,
    selectPlan,
    blockUsers,
    verifyOtp,getUserReward,
    claimReward,
    resendOtp
    // getSelectedPlans,
    // getSinglePlan
    // cretaeOtpForUsers
} = require("../controller/user")
const {addBank}= require("../controller/bank")
// const {verifyToken} = require("../Middelware/Auth")
const router = express.Router();

// router.route("/verifyToken").post(verifyToken)
// router.route("/whatsAppSendMessage").post(whatsAppSendMessage)
// router.route("/get/photo").get(loginuse)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/changepassword").post(verifyToken,changepassword)
router.route("/verifyToken").post(verifyToken)
router.route("/getUsers").get(verifyToken,getUsers)
router.route("/likeDislikeUser",verifyToken).post(likeDislikeUser)
router.route("/forgotPassword").post(forgotPassword)
router.route("/selectPlan").post(selectPlan)
router.route("/blockUsers").post(blockUsers)
router.route("/addBankAccount").post(verifyToken,addBank)
router.route("/verifyOtp").post(verifyOtp)
router.route("/getUserReward").get(verifyToken,getUserReward)
router.route("/claim-reward").post(verifyToken, claimReward)
router.route("/resendOtp").post(resendOtp)
// router.route("/getSelectedPlans").get(getSelectedPlans)
// router.route("/getSinglePlan/:id").get(getSinglePlan)


module.exports = router