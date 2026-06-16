const express = require("express");
const { signUp, logIn, sendOtp,verifyOtp } = require("../src/services/UserRegister");

const router = new express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/staff/send-otp", sendOtp);
router.post("/staff/verify-otp", verifyOtp);

module.exports = router;
