const AppError = require('../../utils/AppError');
const CatchAsync = require('../../utils/CatchAsync');
const Post = require('../../models/Post/Post');

const getAllPosts = CatchAsync(async (req, res, next) => {
  const posts = await Post.find({ author: req.params.id }).sort({
    createdAt: -1
  });

  res.send({
    status: 'Success',
    postsCount: posts.length,
    posts
  });
});

const getPost = CatchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    _id: req.params.id
  });

  if (!post) return next(new AppError('Post not found', 400));
  res.send({
    status: 'Success',
    post
  });
});

module.exports = {
  getAllPosts,
  getPost
};
