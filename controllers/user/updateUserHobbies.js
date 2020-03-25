const User = require('../../models/User/User');
const { validationResult } = require('express-validator');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const updateUserHobbies = CatchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.errors.map(error => error.msg);

    return res.status(400).send({ status: 'Fail', message });
  }

  await User.findByIdAndUpdate(req.user.id, {
    hobbies: req.body
  });

  res.send({
    status: 'Success',
    message: 'Hobbies and Interest is updated'
  });
});

module.exports = updateUserHobbies;
