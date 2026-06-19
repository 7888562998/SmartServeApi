const TablesStatus = require("../models/TablesStatus");
require("dotenv").config();

const getTableList = async (req, res) => {
  try {
    const tables = await TablesStatus.find({
      restaurantId: req.userId,
    }).sort({ tableNo: 1 });

    res.status(200).json({
      success: true,
      message: "Table list fetched successfully",
      data: tables,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getTableList
};
