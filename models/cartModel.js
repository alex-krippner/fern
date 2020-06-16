const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    // what do i need a ref for?
    // ref: 'Product',
  },
  productName: {
    type: String,
    required: [true, 'Please add product name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add product price'],
  },
  amount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Please add product description'],
  },
});

const CartItem = mongoose.model('Cart Item', cartItemSchema);

module.exports = CartItem;
