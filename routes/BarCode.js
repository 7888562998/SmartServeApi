const express = require("express");
const { verifyToken } = require("../src/middleware/verifyToken");
const router = new express.Router();
const multer = require("multer");
const {
  setTableStatus
} = require("../src/services/BarCode");

// Initialize upload variable
const upload = multer({
  storage: multer.diskStorage({}),
});

//router.post("/apply/loan", verifyToken, upload.single("image"), applyLoan);
router.post("/setTableStatus", verifyToken, setTableStatus);

module.exports = router;
