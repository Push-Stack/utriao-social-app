const jwt = require('jsonwebtoken');

const User = require('../models/User/User');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

const authMiddleware = CatchAsync(async (req, res, next) => {
  const header = req.header('Authorization');
  if (typeof header === 'undefined')
    return next(new AppError('Please authenticate', 401));

  const token = header.replace('Bearer ', '');

  if (!token) return next(new AppError('Please authenticate', 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    _id: decoded.id,
    'tokens.token': token
  });

  if (!user) {
    return next(new AppError('Please authenticate', 401));
  }

  req.token = token;

  req.user = user;
  next();
});

module.exports = authMiddleware;
