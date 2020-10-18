const Product = require('../models/productsModel');
const catchAsync = require('../utilities/catchAsyncError');
const AppError = require('../utilities/appError');

exports.getHome = (req, res) => {
  res.status(200).render('index', {
    title: 'Home',
  });
};

exports.getDinner = (req, res) => {
  res.status(200).render('dinner', {
    title: 'Dinner',
  });
};

exports.getWanderlust = (req, res) => {
  res.status(200).render('wanderlust', {
    title: 'Wanderlust',
  });
};

exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    title: 'Our Story',
  });
};

exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact',
  });
};

exports.getShop = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new AppError('No products found', 404));
  }
  res.status(200).render('shop', {
    title: 'Shop',
    products,
  });
});

exports.getCheckout = catchAsync(async (req, res, next) => {
  const { cart } = req.session;
  // const { items } = cart;

  const items = Object.values(cart.items);
  res.status(200).render('checkout', {
    cart,
    items,
  });
});
