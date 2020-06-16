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
  amountWeight: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Please add product description'],
  },
  imageCover: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
