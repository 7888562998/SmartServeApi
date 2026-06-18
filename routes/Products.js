const express = require("express");
const { verifyToken } = require("../src/middleware/verifyToken");
const router = new express.Router();
const multer = require("multer");
const { UploadProduct, getProductList, getProductListByBarCode } = require("../src/services/Products");

// Initialize upload variable
const upload = multer({
  storage: multer.diskStorage({}),
});

router.post("/addProduct", verifyToken, upload.single("image"), UploadProduct);
router.get("/getProduct", verifyToken, getProductList);
router.get("/getProductsByBarCode/:barcode", getProductListByBarCode);


module.exports = router;
