// const Razorpay = require("razorpay");
// const crypto = require("crypto");
require("dotenv").config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const CreateOrder = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Order created successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const VerifyPayment = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Order created successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  CreateOrder,
  VerifyPayment
};
