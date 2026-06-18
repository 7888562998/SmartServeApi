const registration = require("../models/signUp");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail.js");
require('dotenv').config();

const signUp = async (req, res) => {
  try {
    const createUser = new registration(req.body);

    console.log("body", req.body);

    const userCreated = await createUser.save();

    console.log("userCreated", userCreated);

    // ✅ Generate JWT token after successful save
    jwt.sign(
      { user: userCreated },
      process.env.SECRET_KEY,
      (error, token) => {
        console.log("token", token);
        res.status(200).send({
          token: token,
          user: userCreated,
        });
      }
    );

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const logIn = async (req, res) => {
  try {
    console.log("body", req.body);
    const user = await registration.find(req.body);
    if (user.length > 0) {
      console.log(user[0], "user1111");
      jwt.sign(
        { user: user[0] },
        process.env.SECRET_KEY,
        (error, token) => {
          console.log("token", token);
          res.status(200).send({
            token: token,
            user: user,
          });
        }
      );
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("body", req.body);

    // 1. Find user
    const user = await registration.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // 2. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log("OTP:", otp);

    // 3. Save OTP in DB (recommended)
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // 4. Send email
    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP is ${otp}. It is valid for 10 minutes.`
    );

    // 5. Optional token (NOT required for OTP step)
    res.status(200).send({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};



const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("verify body:", req.body);

    // 1. Find user
    const user = await registration.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // 2. Check OTP exists
    if (!user.otp) {
      return res.status(400).send({ message: "OTP not found. Please request again." });
    }

    // 3. Check expiry
    if (user.otpExpire < Date.now()) {
      return res.status(400).send({ message: "OTP expired" });
    }

    // 4. Check OTP match
    if (String(user.otp) !== String(otp)) {
      return res.status(400).send({ message: "Invalid OTP" });
    }


    // 5. Clear OTP after success
    user.otp = null;
    user.otpExpire = null;
    await user.save();



    jwt.sign(
      { user: user,role:"staff" },
      process.env.SECRET_KEY,
      (error, token) => {
        console.log("token", token);
        res.status(200).send({
          message: "OTP verified successfully",
          token: token,
          user: user,
          role: "staff"
        });
      }
    );


  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error", error });
  }
};

module.exports = {
  signUp,
  logIn,
  sendOtp,
  verifyOtp
};
