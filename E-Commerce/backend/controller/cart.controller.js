const Cart = require('../models/Cart')
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");
const Product= require("../models/Product")

// const addProductInCart = async (req, res) => {
//   const {productId, count} = req.body
//   try {
//     const cart = await Cart.findOneAndUpdate(
//       {productId},
//       {productId, count, userId: req.user._id},
//       {upsert: true},
//     )

//     res.status(201).send({status: 'ok', cart})
//   } catch (err) {
//     console.log(err)
//     sendResponseError(500, `Error ${err}`, res)
//   }
// }
// const deleteProductInCart = async (req, res) => {
//   try {
//     await Cart.findByIdAndRemove(req.params.id)
//     res.status(200).send({status: 'ok'})
//   } catch (e) {
//     console.log(err)
//     sendResponseError(500, `Error ${err}`, res)
//   }
// }

// @desc Add product to cart

const addProductInCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);

  // Get Cart for logged user
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // create cart fot logged user with product
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId,  price: product.price }],
    });
  } else {
    // product exist in cart, update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      // product not exist in cart,  push product to cartItems array
      cart.cartItems.push({ product: productId, price: product.price });
    }
  }

  // Calculate total cart price
  cart.totalCartPrice = calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @Desc get Logged User Cart
const getCartProducts = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc remove Specific Cart Item
const deleteProductInCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  cart.totalCartPrice = calcTotalCartPrice(cart);

  cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});


const clearCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(204).send();
});

calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  return totalPrice;
};

module.exports = {addProductInCart, deleteProductInCart, getCartProducts,clearCart}
