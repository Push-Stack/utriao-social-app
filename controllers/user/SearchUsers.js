const User = require('../../models/User/User');
const AppError = require('../../utils/AppError');
const CatchASync = require('../../utils/CatchAsync');

const searchUsers = CatchASync(async (req, res, next) => {
  const query = {};
  if (req.body.name) {
    const { name } = req.body;
    query.$text = {
      $search: name
    };
  }

  const users = await User.find(query).select('username avatarUrl createdAt');

  const count = await User.find(query).countDocuments();
  if (!users)
    return next(
      new AppError('Something is went wrong while fetching Users :( '),
      500
    );
  res.send({ status: 'Success', users, count });
});

module.exports = searchUsers;
