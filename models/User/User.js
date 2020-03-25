const mongoose = require('mongoose');
const educationSchema = require('./educationSchema');
const hobbiesSchema = require('./hobbiesSchema');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Post = require('../Post/Post');
const Comment = require('../Post/Comment');
const Like = require('../Post/Like');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    emailChanged: {
      type: Boolean,
      default: false
    },

    password: {
      type: String,
      required: true
    },
    passwordChangedAt: {
      type: Date
    },
    passwordChangeLimitTime: {
      type: Date
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    avatar: {
      type: Buffer
    },
    avatarUrl: {
      type: String
    },
    cover: {
      type: Buffer
    },
    coverUrl: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    passwordResetToken: String,
    resetTokenExpire: {
      type: Date
    },

    gender: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    birthday: {
      type: String,
      trim: true
    },
    birthplace: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    occupation: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },

    religion: {
      type: String,
      trim: true
    },
    politicalIncline: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },

    education: [educationSchema],
    hobbies: hobbiesSchema,

    socialLinks: {
      facebook: {
        type: String,
        trim: true
      },

      twitter: {
        type: String,
        trim: true
      },

      instagram: {
        type: String,
        trim: true
      }
    }
  },

  {
    timestamps: true,

    toJSON: {
      virtuals: true
    }
  }
);
UserSchema.index({ username: 'text' });

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

UserSchema.methods.createPasswordResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = await crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetTokenExpire = Date.now() + 10 * 60 * 60 * 1000;
  return resetToken;
};

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } else {
    next();
  }
});

UserSchema.pre('remove', async function(next) {
  const user = this;

  await Post.deleteMany({ author: user._id });

  await Comment.deleteMany({ user: user._id });
  await Like.deleteMany({ user: user._id });

  next();
});

UserSchema.methods.toJSON = function() {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.updatedAt;
  delete userObject.tokens;
  delete userObject.passwordResetToken;
  delete userObject.resetTokenExpire;

  delete userObject.avatar;
  delete userObject.cover;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
