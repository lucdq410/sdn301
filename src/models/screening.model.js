const Screening = require("../models/screening.model");
const Movie = require("../models/movie.model");
const Hall = require("../models/hall.model");

const createScreening = async (req, res) => {
  const { movie, hall, startTime, endTime } = req.body;

  try {
    // Kiểm tra sự tồn tại của movie và hall
    const movieExists = await Movie.findById(movie);
    const hallExists = await Hall.findById(hall);

    if (!movieExists) {
      return res.status(404).json({
        data: null,
        message: "Movie not found",
        isSuccess: false,
      });
    }

    if (!hallExists) {
      return res.status(404).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }

    const newScreening = new Screening({
      movie,
      hall,
      startTime,
      endTime,
    });

    const savedScreening = await newScreening.save();
    res.status(201).json({
      data: savedScreening,
      message: "Screening created successfully",
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

module.exports = {
  createScreening,
};
