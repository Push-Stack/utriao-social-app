const User = require('../../models/User/User');
const bcrypt = require('bcryptjs');
const { passwordChanged } = require('../../emails/Account');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const { validationResult } = require('express-validator');

const changePassword = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  const { password, newPassword, confirmNewPassword } = req.body;

  if (password === newPassword)
    return next(new AppError('Current and new password is same', 400));
  if (newPassword !== confirmNewPassword)
    return next(
      new AppError('Please confirm your new password correctly', 400)
    );
  const user = await User.findOne({
    _id: req.user.id
  });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new AppError('Incorrect Password', 400));

  user.password = newPassword;
  user.passwordChangedAt = Date.now();

  user.tokens = [];

  await user.save();
  passwordChanged(user.username, user.email, newPassword);

  res.json({
    status: 'Success',
    message:
      'Password is successfully changed. You will be logged out from App in couple of seconds.'
  });
});

module.exports = changePassword;
