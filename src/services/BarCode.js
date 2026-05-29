const customerDetail = require("../models/customer");
const TablesStatus = require("../models/TablesStatus");
const UserLoanList = require("../models/userLoanList");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret, // Click 'View Credentials' below to copy your API secret
});

const applyLoan = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const {
      firstName,
      lastName,
      dob,
      fatherName,
      phoneNumber,
      city,
      address,
      loanAmount,
      loanTerms,
      status,
    } = req.body;
    const userId = req.userId;
    const createStudentRecord = new customerDetail({
      firstName,
      lastName,
      dob,
      fatherName,
      phoneNumber: Number(phoneNumber),
      city,
      address,
      profileImage: { id: result.public_id, url: result.url },
      loanAmount,
      loanTerms,
      status,
      userId,
    });
    console.log("body", req.body);
    const studentCreated = await createStudentRecord.save();
    res.status(201).send(studentCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};



const setTableStatus = async (req, res) => {
  try {
    const {
      tableNo,
      active,
      barcode,
      sessionTime,
    } = req.body;
    console.log("req.body", req.body,"req.userId",req.userId)
    const result = await TablesStatus.findOneAndUpdate(
      {
        restaurantId: req.userId,
        tableNo,
      },
      {
        $set: {
          active,
          barcode,
          sessionTime,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Table status saved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  setTableStatus
};
