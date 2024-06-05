const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    release_date: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    poster: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Movie = mongoose.model("MOVIE", movieSchema);
module.exports = Movie;
