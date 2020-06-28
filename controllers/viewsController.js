const path = require('path');

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

exports.getContact = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/contact.html'));
};

exports.getReservations = (req, res) => {
  res.status(200);
  res.send('this is the reservations page');
};
