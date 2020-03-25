const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');
const User = require('../../models/User/User');

const follow = CatchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      following: req.params.id
    }
  });

  const user = await User.findByIdAndUpdate(req.params.id, {
    $push: {
      followers: req.user._id
    }
  });

  if (!user) return next(new AppError('No user found', 404));

  res.send({
    status: 'Success',
    message: `You are now following ${user.username}`
  });
});

const unfollow = CatchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      following: req.params.id
    }
  });

  const user = await User.findByIdAndUpdate(req.params.id, {
    $pull: {
      followers: req.user._id
    }
  });

  if (!user) return next(new AppError('No user found', 404));

  res.send({
    status: 'Success',
    message: ` ${user.username} is no more in your following list`
  });
});

module.exports = {
  follow,
  unfollow
};
