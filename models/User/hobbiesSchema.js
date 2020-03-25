const mongoose = require('mongoose');

const hobbiesSchema = mongoose.Schema(
  {
    hobbies: {
      type: String,
      trim: true
    },
    favouriteMusic: {
      type: String,
      trim: true
    },
    favouriteTvShows: {
      type: String,
      trim: true
    },
    favouriteBooks: {
      type: String,
      trim: true
    },
    favouriteMovies: {
      type: String,
      trim: true
    },
    favouriteWriters: {
      type: String,
      trim: true
    },
    favouriteGames: {
      type: String,
      trim: true
    },
    otherInterests: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = hobbiesSchema;
