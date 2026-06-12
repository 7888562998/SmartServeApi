const express = require("express");
const router = new express.Router();

const {
  CreateOrder,
  VerifyPayment
} = require("../src/services/Payment");

router.post("/create-order", CreateOrder);
router.post("/verify-payment", VerifyPayment);

module.exports = router;
