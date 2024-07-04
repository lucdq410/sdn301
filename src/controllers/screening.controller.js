const Screening = require("../models/screening.model");
const Movie = require("../models/movie.model");
const Hall = require("../models/hall.model");

const createScreening = async (req, res) => {
  const { movie, hall, startTime, endTime } = req.body;

  try {
    // Tìm kiếm phim dựa trên tên
    const movieDoc = await Movie.findOne({ title: movie });
    if (!movieDoc) {
      return res.status(200).json({
        data: null,
        message: "Movie not found",
        isSuccess: false,
      });
    }

    // Kiểm tra sự tồn tại của hall
    const hallDoc = await Hall.findById(hall);
    if (!hallDoc) {
      return res.status(200).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }

    // Tạo một lịch chiếu phim mới
    const newScreening = new Screening({
      movie: movieDoc._id,
      hall: hallDoc._id,
      startTime,
      endTime,
    });

    const savedScreening = await newScreening.save();
    res.status(200).json({
      data: savedScreening,
      message: "Screening created successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createScreening,
};
