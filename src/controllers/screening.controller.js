const mongoose = require("mongoose");
const Screening = require("../models/screening.model");
const Movie = require("../models/movie.model");
const Hall = require("../models/hall.model");
const SlotPicker = require("../models/slotPicker.model");
const Seat = require("../models/seat.model"); // Import Seat model

const createScreening = async (req, res) => {
  const { movie, hall, startTime } = req.body;

  try {
    // Kiểm tra xem movie và hall có đúng định dạng ObjectId không
    if (
      !mongoose.Types.ObjectId.isValid(movie) ||
      !mongoose.Types.ObjectId.isValid(hall)
    ) {
      return res.status(400).json({
        data: null,
        message: "Invalid movie or hall ID format",
        isSuccess: false,
      });
    }

    // Kiểm tra sự tồn tại của movie và hall
    const movieExists = await Movie.findById(movie);
    const hallExists = await Hall.findById(hall);

    // Kiểm tra nếu không tìm thấy movie hoặc hall
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

    // Tính thời gian kết thúc dựa trên thời gian bắt đầu và thời lượng phim
    const durationInMinutes = parseInt(movieExists.duration, 10); // Chuyển đổi duration thành số nguyên
    const start = new Date(startTime);
    const end = new Date(start + durationInMinutes * 60000);

    // Tiếp tục thực hiện tạo mới screening và slotpicker nếu mọi thứ hợp lệ
    const newScreening = new Screening({
      movie,
      hall,
      startTime: start,
      endTime: end,
    });

    const savedScreening = await newScreening.save();

    // Tạo slotpicker cho từng seat trong hall
    const hallSeats = await Seat.find({ hall_id: hall });
    let slotPickerList = [];

    for (let seat of hallSeats) {
      const slotPicker = new SlotPicker({
        seat_id: seat._id,
        screening_id: savedScreening._id,
        is_available: true,
      });
      await slotPicker.save();
      slotPickerList.push(slotPicker);
    }

    await Promise.all(slotPickerList);

    res.status(200).json({
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

const deleteScreening = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm và xóa tất cả các slotpickers liên quan đến screening này
    await SlotPicker.deleteMany({ screening_id: id });

    // Xóa screening
    const deletedScreening = await Screening.findByIdAndDelete(id);

    if (deletedScreening) {
      res.status(200).json({
        data: null,
        message: "Screening and related slotpickers deleted successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Screening not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

const getAllScreenings = async (req, res) => {
  try {
    const screenings = await Screening.find()
      .populate("movie")
      .populate("hall");
    res.status(200).json({
      data: screenings,
      message: "Screenings retrieved successfully",
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

const updateScreening = async (req, res) => {
  const { id } = req.params;
  const { movie, hall, startTime, endTime } = req.body;

  try {
    // Kiểm tra sự tồn tại của movie và hall
    const movieExists = await Movie.findById(movie);
    const hallExists = await Hall.findById(hall);

    // Kiểm tra nếu không tìm thấy movie hoặc hall
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

    // Cập nhật screening
    const updatedScreening = await Screening.findByIdAndUpdate(
      id,
      { movie, hall, startTime, endTime },
      { new: true }
    );

    if (updatedScreening) {
      res.status(200).json({
        data: updatedScreening,
        message: "Screening updated successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Screening not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

const getScreeningById = async (req, res) => {
  const { id } = req.params;

  try {
    // Kiểm tra xem id có đúng định dạng ObjectId không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        data: null,
        message: "Invalid screening ID format",
        isSuccess: false,
      });
    }

    // Tìm screening theo id và populate các thông tin liên quan
    const screening = await Screening.findById(id)
      .populate("movie")
      .populate("hall");

    if (!screening) {
      return res.status(404).json({
        data: null,
        message: "Screening not found",
        isSuccess: false,
      });
    }

    res.status(200).json({
      data: screening,
      message: "Screening retrieved successfully",
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

const getScreeningsByMovieId = async (req, res) => {
  const { movieId } = req.params;

  try {
    console.log(`Searching screenings for movieId: ${movieId}`);

    // Kiểm tra xem movieId có đúng định dạng ObjectId không
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      console.log(`Invalid movie ID format: ${movieId}`);
      return res.status(400).json({
        data: null,
        message: "Invalid movie ID format",
        isSuccess: false,
      });
    }

    // Tìm movie dựa trên movieId
    const movie = await Movie.findById(movieId);
    if (!movie) {
      console.log(`Movie not found for movieId: ${movieId}`);
      return res.status(404).json({
        data: null,
        message: "Movie not found",
        isSuccess: false,
      });
    }
    console.log(`Found movie: ${movie}`);

    // Tìm các screening dựa trên movie._id và populate các thông tin liên quan
    const screenings = await Screening.find({ movie: movie._id })
      .populate("movie") // Populate thông tin của movie
      .populate("hall"); // Populate thông tin của hall

    if (!screenings.length) {
      console.log(`No screenings found for movieId: ${movieId}`);
      return res.status(404).json({
        data: null,
        message: "No screenings found for this movie",
        isSuccess: false,
      });
    }

    console.log(`Found ${screenings.length} screenings:`);
    console.log(screenings);

    res.status(200).json({
      data: screenings,
      message: "Screenings retrieved successfully",
      isSuccess: true,
    });
  } catch (error) {
    console.error(`Error retrieving screenings: ${error.message}`);
    res.status(400).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createScreening,
  deleteScreening,
  getAllScreenings,
  updateScreening,
  getScreeningById,
  getScreeningsByMovieId,
};
