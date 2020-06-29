const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
