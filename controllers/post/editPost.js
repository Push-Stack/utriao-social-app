const AppError = require('../../utils/AppError');
const CatchAsync = require('../../utils/CatchAsync');
const Post = require('../../models/Post/Post');
const sharp = require('sharp');

// const editPost = CatchAsync(async (req, res, next) => {
//   if (
//     typeof req.file === 'undefined' &&
//     typeof req.body.content !== 'undefined'
//   ) {
//     onlyDescription(req, res, next);
//   }

//   if (
//     typeof req.file !== 'undefined' &&
//     typeof req.body.content !== 'undefined'
//   ) {
//     imagePlusDescription(req, res, next);
//   }
// });

// module.exports = editPost;

// const onlyDescription = async (req, res, next) => {
//   const post = await Post.findOneAndUpdate(
//     { _id: req.params.id, author: req.user._id },
//     { content: req.body.content, imagePath: undefined }
//   );
//   if (!post) return next(new AppError('Post not found', 400));

//   return res.send({ status: 'Success', message: 'Post is updated' });
// };

// const imagePlusDescription = async (req, res, next) => {
//   const Buffer = await sharp(req.file.buffer)
//     .png()
//     .toBuffer();

//   const image = Buffer;
//   const post = await Post.findOneAndUpdate(
//     { _id: req.params.id, author: req.user._id },
//     {
//       image,
//       content: req.body.content,
//       imagePath: `/api/users/posts/images/${req.params.id}`
//     }
//   );
//   if (!post) return next(new AppError('Post not found', 400));

//   return res.send({ status: 'Success', message: 'Post is updated' });
// };

const editPost = CatchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    {
      _id: req.params.id,
      author: req.user._id
    },
    {
      content: req.body.content,
      imagePath: req.body.imagePath || undefined
    }
  );
  if (!post) return next(new AppError('Post not found', 400));
  return res.send({ status: 'Success', message: 'Post is updated' });
});

module.exports = editPost;
