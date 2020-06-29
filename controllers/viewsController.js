const path = require('path');
const Product = require('../models/productsModel');

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

exports.getShop = async (req, res) => {
  const products = await Product.find();
  res.status(200).render('shop', {
    products,
  });
};

exports.getContact = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/contact.html'));
};

exports.getReservations = (req, res) => {
  res.status(200);
  res.send('this is the reservations page');
};
