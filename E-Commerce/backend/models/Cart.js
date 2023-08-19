const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    totalCartPrice: Number,

  },
  {
    timestamps: true,
  },
)


const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart
