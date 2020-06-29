const morgan = require('morgan');

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// IMPORT ROUTERS

const viewsRoutes = require('./routes/viewsRoutes');
const shopRoutes = require('./routes/shopRoutes');

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES

app.use('/', viewsRoutes);
app.use('/shop', shopRoutes);

module.exports = app;
