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
    status: {
      type: String,
      enum: ["upcoming", "now_showing"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.pre("save", function (next) {
  const movie = this;
  const currentDate = new Date().toISOString().split("T")[0];

  if (movie.release_date <= currentDate) {
    movie.status = "now_showing";
  } else {
    movie.status = "upcoming";
  }

  next();
});

const Movie = mongoose.model("MOVIE", movieSchema);
module.exports = Movie;
