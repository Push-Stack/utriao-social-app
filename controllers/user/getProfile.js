const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');
const User = require('../../models/User/User');

const getProfile = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    '_id username email avatarUrl createdAt emailChanged'
  );

  res.send({ status: 'Success', data: { user } });
});

module.exports = getProfile;
