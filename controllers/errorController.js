// const AppError = require('../utilities/appError.js');

// const handleCastErrorDB = (err) => {
//   const message = `Invalid ${err.path}: ${err.value}.`;
//   return new AppError(message, 400);
// };

// const handleDuplicateFieldsDB = (err) => {
//   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

//   const message = `Duplicate  field value: ${value}. Please use another value.`;

//   return new AppError(message, 400);
// };

// const handleValidationErrorDB = (err) => {
//   const errors = Object.values(err.errors).map((el) => el.message);

//   const message = `Invalid input data. ${errors.join('. ')}`;

//   return new AppError(message, 400);
// };

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) Programming or other unknown error: don't leak error details

  console.error('ERROR', err);
  // TODO: write error.pug page
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  sendErrorDev(err, req, res);
};
