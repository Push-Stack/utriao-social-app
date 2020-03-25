const CatchAsync = require('../../utils/CatchAsync');
const Post = require('../../models/Post/Post');

const getImage = CatchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('Not Found', 404));
  res.set('content-type', 'image/png');
  res.send(post.image);
});

module.exports = getImage;
