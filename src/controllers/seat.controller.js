const Seat = require("../models/seat.model");
const Hall = require("../models/hall.model");

const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json({
      data: seats,
      message: "Seats retrieved successfully",
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

const getSeatsByHallId = async (req, res) => {
  const hallId = req.params.hallId;
  try {
    const seats = await Seat.find({ hall_id: hallId });
    res.status(200).json({
      data: seats,
      message: "Seats retrieved successfully",
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

const createSeat = async (req, res) => {
  const { hall_id, price, seat_number, is_available } = req.body;

  try {
    const hallExists = await Hall.findById(hall_id);
    if (!hallExists) {
      return res.status(404).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }

    const newSeat = new Seat({
      hall_id,
      price,
      seat_number,
      is_available,
    });

    const savedSeat = await newSeat.save();
    res.status(201).json({
      data: savedSeat,
      message: "Seat created successfully",
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

const updateSeat = async (req, res) => {
  const { price, seat_number, is_available } = req.body;
  try {
    const seat = await Seat.findByIdAndUpdate(
      req.params.id,
      {
        price,
        seat_number,
        is_available,
      },
      { new: true }
    );
    if (!seat) {
      return res.status(404).json({
        data: null,
        message: "Seat not found",
        isSuccess: false,
      });
    }
    res.status(200).json({
      data: seat,
      message: "Seat updated successfully",
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

const deleteSeat = async (req, res) => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
    if (!deletedSeat) {
      return res.status(404).json({
        data: null,
        message: "Seat not found",
        isSuccess: false,
      });
    }
    res.status(200).json({
      data: null,
      message: "Seat deleted successfully",
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
  getAllSeats,
  getSeatsByHallId,
  createSeat,
  updateSeat,
  deleteSeat,
};
