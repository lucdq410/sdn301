const Hall = require("../models/hall.model");
const Movie = require("../models/movie.model");
const Screening = require("../models/screening.model");

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json({
      data: cinemas,
      message: "Cinemas retrieved successfully",
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

const getHallsByCinemaId = async (req, res) => {
  const cinemaId = req.params.cinemaId;
  try {
    const halls = await Hall.find({ cinema: cinemaId });
    res.status(200).json({
      data: halls,
      message: "Halls retrieved successfully",
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

const getScreeningsByHallId = async (req, res) => {
  const hallId = req.params.hallId;
  try {
    const screenings = await Screening.find({ hall: hallId });
    res.status(200).json({
      data: screenings,
      message: "Screenings retrieved successfully",
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
  getHallsByCinemaId,
  getAllMovies,
  getScreeningsByHallId,
};
