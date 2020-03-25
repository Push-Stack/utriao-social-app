const CatchAsync = require('../../utils/CatchAsync');
const AppError = require('../../utils/AppError');
const Post = require('../../models/Post/Post');

const Like = require('../../models/Post/Like');

const likePost = CatchAsync(async (req, res, next) => {
  const likeExist = await Like.findOne({
    user: req.user._id,
    postId: req.params.id
  });

  if (likeExist)
    return next(new AppError('You have already liked this post', 400));

  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('No post found', 404));

  const like = new Like({
    postId: req.params.id,
    user: req.user._id
  });

  post.likes.push(like._id);

  await like.save();
  await post.save();

  res.send({ status: 'Success', message: 'Like added' });
});

const unlikePost = CatchAsync(async (req, res, next) => {
  const likeExist = await Like.findOne({
    user: req.user._id,
    postId: req.params.id
  });

  if (!likeExist)
    return next(new AppError('No such like associated with this post', 400));

  await Post.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $pull: {
        likes: likeExist._id
      }
    }
  );

  await likeExist.remove();

  res.send({ status: 'Success', message: 'Like deleted' });
});

module.exports = {
  likePost,
  unlikePost
};
