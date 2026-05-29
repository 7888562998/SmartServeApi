const mongoose = require("mongoose");

const tablesStatusSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    tableNo: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: false,
    },

    barcode: {
      type: String,
      required: true,
      unique: true,
    },

    sessionTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate",
    },
  }
);

// CREATE COLLECTION
const TablesStatus = mongoose.model(
  "TablesStatus",
  tablesStatusSchema
);

module.exports = TablesStatus;