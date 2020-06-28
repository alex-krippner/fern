const express = require('express');
const morgan = require('morgan');

const app = express();

// import routers

const viewsRoutes = require('./routes/viewsRoutes');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES

app.use('/', viewsRoutes);

module.exports = app;
