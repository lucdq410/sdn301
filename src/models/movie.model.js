const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
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
