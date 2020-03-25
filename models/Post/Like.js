const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  { timeStamps: true }
);

likeSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'username avatarUrl'
  });
  next();
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
