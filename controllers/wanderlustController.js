const path = require('path');

exports.getWanderlust = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../public/wanderlust.html'));
};
