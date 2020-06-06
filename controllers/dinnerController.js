const path = require('path');

exports.getDinner = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/dinner.html'));
};
