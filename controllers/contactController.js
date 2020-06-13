const path = require('path');

exports.getContact = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/contact.html'));
};
