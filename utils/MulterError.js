const AppError = require('./AppError');

module.exports = (error, req, res, next) => {
  if (error.message.includes('buffer'))
    return next(new AppError('No file is uploaded'));

  if (error.message.includes('large'))
    return next(
      new AppError(
        'Limit size for upload image is 4MB. File is too large.',
        400
      )
    );

  next(error);
};
