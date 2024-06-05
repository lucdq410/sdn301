const Movie = require("../models/movie.model");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
