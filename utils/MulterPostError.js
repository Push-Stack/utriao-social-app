const AppError = require('./AppError');

module.exports = (error, req, res, next) => {
  if (error.message.includes('buffer')) return next();

  if (error.message.includes('large'))
    return next(new AppError('File is too large', 400));

  next(error);
};
