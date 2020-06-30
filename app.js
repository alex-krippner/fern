const express = require('express');
const morgan = require('morgan');
const path = require('path');

const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
// MIDDLEWARE

//*********** ROUTES  ***********

// IMPORT ROUTES

const viewsRoutes = require('./routes/viewsRoutes');
const shopRoutes = require('./routes/shopRoutes');

// USE ROUTES

app.use('/', viewsRoutes);
app.use('/shop', shopRoutes);

// ERROR HANDLING

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
