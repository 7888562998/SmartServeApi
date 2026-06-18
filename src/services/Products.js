const FoodProduct = require("../models/FoodProduct");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const UploadProduct = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const userId = req.userId; // ✅ FROM TOKEN

    const result = await cloudinary.uploader.upload(req.file.path);

    const { productTitle, description, price, category } = req.body;

    const newProduct = new FoodProduct({
      productTitle,
      description,
      price: Number(price),
      restaurantId: userId,
      category,
      productImage: {
        id: result.public_id,
        url: result.secure_url,
      },
      createdBy: userId,
    });

    const productCreated = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Food product added successfully",
      data: productCreated,
    });
  } catch (error) {
    console.error("Upload Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload product",
    });
  }
};

const getProductList = async (req, res) => {
  try {
    const userId = req.userId; // ✅ FROM TOKEN

    console.log("userId", userId);

    const products = await FoodProduct.find({
      restaurantId: userId, // ✅ FILTER HERE
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      userId, // optional check
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

module.exports = {
  UploadProduct,
  getProductList,
};
