const Movie = require("../models/movie.model");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      data: movies,
      message: "Movies retrieved successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json({
        data: movie,
        message: "Movie retrieved successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Movie not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

const createMovie = async (req, res) => {
  const {
    title,
    genre,
    duration,
    release_date,
    director,
    description,
    poster,
  } = req.body;
  try {
    const newMovie = new Movie({
      title,
      genre,
      duration,
      release_date,
      director,
      description,
      poster,
    });
    const addMovie = await newMovie.save();
    res.status(200).json({
      data: addMovie,
      message: "Movie created successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

const updateMovie = async (req, res) => {
  const {
    title,
    genre,
    duration,
    release_date,
    director,
    description,
    poster,
  } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        genre,
        duration,
        release_date,
        director,
        description,
        poster,
      },
      { new: true }
    );
    res.status(200).json({
      data: movie,
      message: "Movie updated successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: null,
      message: "Movie deleted successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
