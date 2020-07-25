const path = require('path');
const Product = require('../models/productsModel');
const catchAsync = require('../utilities/catchAsyncError');
const AppError = require('../utilities/appError');

exports.getHome = (req, res) => {
  res.status(200);
  res.sendFile(__dirname, '/index.html');
};

exports.getDinner = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/dinner.html'));
};

exports.getWanderlust = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/wanderlust.html'));
};

exports.getAbout = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/about.html'));
};

exports.getShop = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  console.log('shop route request received');

  if (!products) {
    return next(new AppError('No products found', 404));
  }
  res.status(200).render('shop', {
    products,
  });
});

exports.getCheckout = catchAsync(async (req, res, next) => {
  console.log('checkout route request received');

  const { cart } = req.session;
  // const { items } = cart;

  const items = Object.values(cart.items);
  res.status(200).render('checkout', {
    cart,
    items,
  });
});

exports.getContact = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/contact.html'));
};
