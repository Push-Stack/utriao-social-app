const sharp = require('sharp');
const User = require('../../models/User/User');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');

const changeAvatar = CatchAsync(async (req, res, next) => {
  const Buffer = await sharp(req.file.buffer)
    .resize(650, 800)
    .png()
    .toBuffer();

  req.user.avatar = Buffer;
  req.user.avatarUrl = `/api/users/avatar/${req.user._id}`;

  await req.user.save();
  res.send({ status: 'Success', message: 'Profile image is uploaded' });
});

const getAvatar = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('Not Found', 404));
  res.set('content-type', 'image/png');
  res.send(user.avatar);
});

const deleteAvatar = CatchAsync(async (req, res, next) => {
  req.user.avatar = undefined;
  req.user.avatarUrl = undefined;
  await req.user.save();
  res.send({ status: 'Success', message: 'Profile image is deleted' });
});

module.exports = {
  changeAvatar,
  getAvatar,
  deleteAvatar
};
