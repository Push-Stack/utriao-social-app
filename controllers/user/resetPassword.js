const { validationResult } = require('express-validator');
const User = require('../../models/User/User');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const { passwordResetToken, passwordReset } = require('../../emails/Account');

const forgotPassword = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = 'Please provide valid email!';

    return res.status(400).send({ status: 'Fail', message });
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('No user with this email', 404));

  const Token = await user.createPasswordResetToken();
  await user.save();
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/users/resetPassword/${Token}`;

  passwordResetToken(user.email, resetURL);

  res.send({ status: 'Success', message: 'Email is sent to your account' });
});

const resetPassword = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  const { password, confirmPassword } = req.body;
  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  if (password !== confirmPassword)
    return next(new AppError('Password does not match', 400));

  const crypto = require('crypto');
  const resetToken = req.params.token;

  const hashedToken = await crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    resetTokenExpire: { $gt: Date.now() }
  });
  if (!user) return next(new AppError('Token is expire', 400));

  user.password = password;

  user.passwordResetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();
  passwordReset(user.email, user.username, password);

  res.send({ status: 'Success', message: 'Password is reset successfully' });
});

module.exports = {
  forgotPassword,
  resetPassword
};
