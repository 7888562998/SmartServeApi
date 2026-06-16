const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: Number,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
   otp: {
    type: String,
    trim:true
  },
   otpExpire : {
    type: Date,
  },
});

//Creating collection in data base
const registration = new mongoose.model("User", signUpSchema);

module.exports = registration;
