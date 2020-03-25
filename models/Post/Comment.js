const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'username avatarUrl  '
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
