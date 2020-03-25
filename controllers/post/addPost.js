const sharp = require('sharp');
const AppError = require('../../utils/AppError');
const CatchAsync = require('../../utils/CatchAsync');
const Post = require('../../models/Post/Post');

const addPost = CatchAsync(async (req, res, next) => {
  if (
    typeof req.file === 'undefined' &&
    typeof req.body.content !== 'undefined'
  ) {
    const post = new Post({
      content: req.body.content,
      author: req.user._id
    });
    await post.save();
    return res.send({ status: 'Success', message: 'Post is created' });
  }

  if (
    typeof req.file !== 'undefined' &&
    typeof req.body.content !== 'undefined'
  ) {
    const Buffer = await sharp(req.file.buffer)
      .png()
      .toBuffer();

    const image = Buffer;

    const post = new Post({
      content: req.body.content,
      author: req.user._id,
      image
    });
    post.imagePath = `/api/users/posts/images/${post._id}`;
    await post.save();

    return res.send({ status: 'Success', message: 'Post is created' });
  }
});
module.exports = addPost;
