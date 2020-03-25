const User = require('../../models/User/User');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const logoutAll = CatchAsync(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.send({ status: 'Success', message: 'Logged out all sessions' });
});
module.exports = logoutAll;
