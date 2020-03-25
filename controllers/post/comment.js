const AppError = require('../../utils/AppError');
const CatchAsync = require('../../utils/CatchAsync');

const Comment = require('../../models/Post/Comment');
const Post = require('../../models/Post/Post');

const addComment = CatchAsync(async (req, res, next) => {
  const comment = new Comment({
    content: req.body.content,

    user: req.user._id
  });

  const post = await Post.findById(req.params.id);

  post.comments.push(comment._id);

  await comment.save();
  await post.save();
  res.send({ status: 'Success', message: 'Comment is added' });
});

const editComment = CatchAsync(async (req, res, next) => {
  await Comment.findOneAndUpdate(
    {
      _id: req.params.comment_id,
      user: req.user._id
    },
    {
      content: req.body.content
    }
  );

  res.send({ status: 'Success', message: 'Comment is updated' });
});

const deleteComment = CatchAsync(async (req, res, next) => {
  const commentExists = await Comment.findOne({
    _id: req.params.comment_id
  });

  if (!commentExists)
    return next(
      new AppError('No such comment is associated with this post', 400)
    );

  await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        comments: req.params.comment_id
      }
    }
  );

  await commentExists.remove();

  res.send({ status: 'Success', message: 'Comment is deleted' });
});

module.exports = {
  addComment,
  editComment,
  deleteComment
};
