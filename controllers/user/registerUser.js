const User = require('../../models/User/User');
const jwt = require('jsonwebtoken');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const { validationResult } = require('express-validator');
const { accountCreated } = require('../../emails/Account');

const registerUser = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  const { username, password, email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return next(new AppError('User with this email is already exists', 400));

  const newUser = new User({
    username,
    email,
    password
  });

  const payload = {
    id: newUser.id,
    username: newUser.username
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,

    async (error, token) => {
      if (error) return next(error);

      newUser.tokens = newUser.tokens.concat({ token });
      const updated = await newUser.save();

      accountCreated(newUser.username, newUser.email);

      res.status(201).json({
        status: 'Success',
        message: 'Account is created Successfully',
        token
      });
    }
  );
});

module.exports = registerUser;
