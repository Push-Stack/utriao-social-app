const User = require('../../models/User/User');
const { emailChanged } = require('../../emails/Account');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const { validationResult } = require('express-validator');

const changeEmail = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  const [error] = errors.array();

  if (!errors.isEmpty()) return next(new AppError(error.msg, 400));

  const { email } = req.body;
  if (req.user.emailChanged) {
    return next(new AppError('You have already changed your email', 400));
  }

  if (req.user.email === email) {
    return next(new AppError('Email is same', 400));
  }
  const oldEmail = req.user.email;
  req.user.email = email;
  req.user.emailChanged = true;

  const updatedUser = await req.user.save();
  emailChanged(updatedUser.username, oldEmail, updatedUser.email);
  res.json({ status: 'Success', message: 'Email is changed successfully' });
});

module.exports = changeEmail;
