const mongoose = require("mongoose");
require("dotenv").config();

// Create Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        quantity: Number,
        price: Number,
      },
    ],

    shippingAddress: {
      alias:String,
      details: String,
      phone: String,
      city: String,
      state: String,
      postalCode: String,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

// Create model
const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
