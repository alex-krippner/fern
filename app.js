const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200);
  res.sendFile(__dirname, '/index.html');
});

app.get('/dinner', (req, res) => {
  res.status(200);
  res.sendFile(__dirname + '/public/dinner.html');
});

app.get('/wanderlust', (req, res) => {
  res.status(200);
  res.sendFile(__dirname + '/public/wanderlust.html');
});

app.get('/about', (req, res) => {
  res.status(200);
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/shop', (req, res) => {
  res.status(200);
  res.send('this is the shop');
});

app.get('/contact', (req, res) => {
  res.status(200);
  res.send('this is the contact page');
});

app.get('/reservations', (req, res) => {
  res.status(200);
  res.send('this is the reservations page');
});

const port = 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
