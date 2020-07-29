const path = require('path');
const Product = require('../models/productsModel');
const catchAsync = require('../utilities/catchAsyncError');
const AppError = require('../utilities/appError');

exports.getHome = (req, res) => {
  console.log('home route request received');

  res.status(200).render('index', {
    title: 'Home',
  });
};

exports.getWanderlust = (req, res) => {
  res.status(200).render('wanderlust', {
    title: 'Wanderlust',
  });
};

exports.getAbout = (req, res) => {
  console.log('about route request received');

  res.status(200).render('about', {
    title: 'Our Story',
  });
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
  res.status(200).render('contact', {
    title: 'Contact',
  });
};

exports.getDinner = (req, res) => {
  res.status(200).render('dinner', {
    title: 'Dinner',
  });
};
