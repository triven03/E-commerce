const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");

const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/orderModel");


const createOrder = asyncHandler(async (req, res, next) => {
  
 
  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);

  if (!cart) {
    return next(
      new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  // 2) Get order price depend on cart price "Check if coupon apply"


  const totalOrderPrice = cart.totalCartPrice;

  // 3) Create order with default paymentMethodType cash

  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.user.addresses[0],
    totalOrderPrice,
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { countInStock: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});

// show all order history created by a peticular user

const showHistory= (async (req, res, next) => {
  
  const orders = await Order.find({user:req.user._id});

  if (!orders) {
    return next(
      new ApiError(`There is no orders with id ${req.user._id}`, 404)
    );
  }

  res.status(201).json({ status: "success", data: orders });
});


// get any specific order with order id

const getOrder= (async (req, res, next) => {
  
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return next(
      new ApiError(`There is no such order with id ${req.params.orderId}`, 404)
    );
  }

  res.status(201).json({ status: "success", data: order });
});


module.exports = {createOrder,showHistory,getOrder}
