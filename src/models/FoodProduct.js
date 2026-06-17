const mongoose = require("mongoose");

const foodProductSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },

  productImage: {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
    },
  },
  // ✅ NEW FIELD
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Restaurant" if you have separate model
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp automatically
foodProductSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const FoodProduct = mongoose.model("FoodProduct", foodProductSchema);

module.exports = FoodProduct;
