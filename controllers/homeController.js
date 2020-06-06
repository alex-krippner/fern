exports.getHome = (req, res) => {
  res.status(200);
  res.sendFile(__dirname, '/index.html');
};
