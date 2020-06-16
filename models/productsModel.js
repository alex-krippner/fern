const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please add product name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add product price'],
  },
  description: {
    type: String,
    required: [true, 'Please add product description'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
