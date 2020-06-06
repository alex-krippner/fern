const express = require('express');
const morgan = require('morgan');
const app = express();

// import routers

const homeRouter = require('./routes/homeRoutes');
const dinnerRouter = require('./routes/dinnerRoutes');
const wanderlustRouter = require('./routes/wanderlustRoutes');
const aboutRouter = require('./routes/aboutRoutes');
const shopRouter = require('./routes/shopRoutes');
const contactRouter = require('./routes/shopRoutes');
const reservationsRouter = require('./routes/reservationsRoutes');

app.use(express.static('public'));

// MIDDLEWARE

app.use(morgan('dev'));

// ROUTES

app.use('/', homeRouter);
app.use('/dinner', dinnerRouter);
app.use('/wanderlust', wanderlustRouter);
app.use('/about', aboutRouter);
app.use('/shop', shopRouter);
app.use('/contact', contactRouter);
app.use('/reservations', reservationsRouter);

module.exports = app;
