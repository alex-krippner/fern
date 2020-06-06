const path = require('path');

exports.getAbout = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/about.html'));
};
