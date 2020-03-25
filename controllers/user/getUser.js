const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');
const User = require('../../models/User/User');

const getUser = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  await user
    .populate({
      path: 'followers',
      select: '_id username avatarUrl coverUrl createdAt',
      options: {
        sort: {
          createdAt: -1
        }
      }
    })
    .execPopulate();
  await user
    .populate('following', '_id username avatarUrl coverUrl createdAt')
    .execPopulate();

  res.send({ status: 'Success', user });
});

module.exports = getUser;
