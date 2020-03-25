const User = require('../../models/User/User');
const bcrypt = require('bcryptjs');
const { accountDeleted } = require('../../emails/Account');

const { validationResult } = require('express-validator');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const deleteUser = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  const { email, password, reason } = req.body;

  const user = await User.findById(req.user._id);

  if (email !== user.email)
    return next(new AppError('Email is incorrect', 400));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError('Incorrect password', 400));

  const removed = await user.remove();
  accountDeleted(removed.username, removed.email);

  return res.json({
    status: 'Success',
    message: `${removed.username} is deleted Successfully.
    Redirecting back to login page`
  });
});

module.exports = deleteUser;
