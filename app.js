const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// IMPORT ROUTERS

const viewsRoutes = require('./routes/viewsRoutes');

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES

app.use('/', viewsRoutes);

module.exports = app;
