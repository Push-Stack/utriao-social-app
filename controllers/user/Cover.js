const sharp = require('sharp');
const User = require('../../models/User/User');
const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');
const changeCover = CatchAsync(async (req, res, next) => {
  const Buffer = await sharp(req.file.buffer)
    .resize(1200, 700)
    .png()
    .toBuffer();
  req.user.cover = Buffer;
  req.user.coverUrl = `/api/users/cover/${req.user._id}`;

  await req.user.save();

  res.send({
    status: 'Success',
    message: 'Profile cover is uploaded'
  });
});

const getCover = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('Not Found', 404));
  res.set('Content-type', 'image/png');
  res.send(user.cover);
});

const deleteCover = CatchAsync(async (req, res, next) => {
  req.user.cover = undefined;
  req.user.coverUrl = undefined;
  await req.user.save();
  res.send({
    status: 'Success',
    message: 'Profile cover is deleted'
  });
});

module.exports = {
  changeCover,
  getCover,
  deleteCover
};
