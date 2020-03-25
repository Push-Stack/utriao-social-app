const User = require('../../models/User/User');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const logoutUser = CatchAsync(async (req, res, next) => {
  req.user.tokens = req.user.tokens.filter(token => {
    return token.token != req.token;
  });

  await req.user.save();

  res.send({ status: 'Success', message: 'Logout is successfull' });
});

module.exports = logoutUser;
