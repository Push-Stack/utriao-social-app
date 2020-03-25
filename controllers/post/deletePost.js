const AppError = require('../../utils/AppError');
const CatchAsync = require('../../utils/CatchAsync');
const Post = require('../../models/Post/Post');

const deletePost = CatchAsync(async (req, res, next) => {
  const exists = await Post.findByIdAndRemove(req.params.id);
  if (!exists) return next(new AppError('Post not found', 400));
  res.send({ status: 'Success', message: 'Post is deleted' });
});
module.exports = deletePost;
