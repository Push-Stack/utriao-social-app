const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User/User');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const { validationResult } = require('express-validator');

const loginUser = CatchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (!userExists)
    return next(new AppError('Please provide valid credentials', 400));

  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch)
    return next(new AppError('Please provide valid credentials', 400));

  const payload = {
    id: userExists.id,
    username: userExists.username
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,

    async (error, token) => {
      if (error) throw error;

      userExists.tokens = userExists.tokens.concat({ token });
      await userExists.save();
      res.json({ status: 'Success', message: 'Welcome to App', token });
    }
  );
});

module.exports = loginUser;
