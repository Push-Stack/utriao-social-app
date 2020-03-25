const AppError = require('../utils/AppError');

const castErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).send({
    status: error.status,
    message: error.message,
    error: error,
    stack: error.stack
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).send({
      status: error.status,
      message: error.message
    });
  } else {
    console.log(Error);
    res.status(500).send({
      status: 'error',
      message: 'Something is went wrong'
    });
  }
};

const ErrorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'Error';

  //For development Purpose to debug errors
  // if (process.env.NODE_ENV === 'production') {
  //   let err = { ...error };
  //   if (err.name === 'CastError') err = castErrorDB(err);
  //   sendErrorProd(err, res);
  // } else {
  //   sendErrorDev(error, res);
  // }

  if (error.name === 'CastError') error = castErrorDB(error);
  sendErrorProd(error, res);
};

module.exports = ErrorMiddleware;
