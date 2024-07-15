const Hall = require("../models/hall.model");
const Seat = require("../models/seat.model");

const getAllHalls = async (req, res, next) => {
  try {
    const halls = await Hall.find();
    res.status(200).json({
      data: halls,
      message: "Halls retrieved successfully",
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const getHallById = async (req, res, next) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (hall) {
      res.status(200).json({
        data: hall,
        message: "Hall retrieved successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

const createHall = async (req, res, next) => {
  const { name, capacity } = req.body;
  try {
    let seatList = [];
    const newHall = new Hall({
      name,
      capacity,
    });
    const saveSeat = async (seat) => {
      try {
        const addSeat = await seat.save();
        return addSeat;
      } catch (error) {
        return res.status;
      }
    };
    const addedHall = await newHall.save();
    for (let index = 0; index < capacity; index++) {
      const seat = new Seat({
        hall_id: addedHall._id,
        seat_number: index + 1,
        price: 100000,
        is_available: true,
      });
      seatList.push(saveSeat(seat));
    }
    Promise.all(seatList);
    console.log("addedHall: ", addedHall);
    res.status(200).json({
      data: addedHall,
      message: "Hall created successfully",
      isSuccess: true,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

const updateHall = async (req, res, next) => {
  const { name, capacity } = req.body;
  const hallId = req.params.id;

  try {
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }

    const oldCapacity = hall.capacity;
    hall.name = name;
    hall.capacity = capacity;

    // Save the updated hall
    const updatedHall = await hall.save();

    // Handle seats based on capacity change
    if (capacity > oldCapacity) {
      // Add new seats
      for (let index = oldCapacity + 1; index <= capacity; index++) {
        const seat = new Seat({
          hall_id: hallId,
          seat_number: index,
          price: 100000,
          is_available: true,
        });
        await seat.save();
      }
    } else if (capacity < oldCapacity) {
      // Remove excess seats
      await Seat.deleteMany({
        hall_id: hallId,
        seat_number: { $gt: capacity },
      });
    }

    res.status(200).json({
      data: updatedHall,
      message: "Hall updated successfully",
      isSuccess: true,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

const deleteHall = async (req, res, next) => {
  const hallId = req.params.id;

  try {
    // Find the hall to be deleted
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }

    // Find and delete all seats associated with the hall
    await Seat.deleteMany({ hall_id: hallId });

    // Delete the hall itself
    const deletedHall = await Hall.findByIdAndDelete(hallId);

    if (deletedHall) {
      res.status(200).json({
        data: null,
        message: "Hall deleted successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Hall not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

const getSeatsByHallId = async (req, res, next) => {
  try {
    const seats = await Seat.find({ hall_id: req.params.id });
    res.status(200).json({
      data: seats,
      message: "Seats retrieved successfully",
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
  getSeatsByHallId,
};
