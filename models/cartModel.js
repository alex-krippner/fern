const mongoose = require('mongoose');

const cartItem = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
  },
  name: {
    type: String,
    required: [true, 'Please add product name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add product price'],
  },
  weight: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Please add product description'],
  },
  imageCover: String,
  quantity: {
    type: Number,
    default: 0,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  cartItems: [cartItem],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
