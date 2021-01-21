const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const axios = require('axios');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const mongosSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const cartController = require('./controllers/cartController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(mongosSanitize());
app.use(xss());
// Prevent parameter pollution
app.use(hpp());

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  cartController.webhookCheckout
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: true,
      // secure: true,
      sameSite: true,
      maxAge: 180 * 60 * 1000,
    },
  })
);

//*********** MIDDLEWARE  ***********
// Set withCredentials to allow cross-site access through cookies when using axios
axios.defaults.withCredentials = true;
// MAKE SESSION AVAILABLE TO PUG TEMPLATES

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(compression());

//*********** ROUTES  ***********

// IMPORT ROUTES

const viewsRouter = require('./routes/viewsRoutes');
const shopRouter = require('./routes/shopRoutes');
const cartRouter = require('./routes/cartRoutes');

// USE ROUTES

app.use('/', viewsRouter);
app.use('/shop', shopRouter);
app.use('/checkout', cartRouter);

// ERROR HANDLING

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
