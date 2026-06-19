const express = require("express");
const { verifyToken } = require("../src/middleware/verifyToken");
const router = new express.Router();
const multer = require("multer");
const {
  getTableList
} = require("../src/services/TableManagement");

// Initialize upload variable
const upload = multer({
  storage: multer.diskStorage({}),
});

router.get("/getTableList", verifyToken, getTableList);

module.exports = router;