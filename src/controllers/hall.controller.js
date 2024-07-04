const Hall = require("../models/hall.model");

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
    const newHall = new Hall({
      name,
      capacity,
    });
    const addedHall = await newHall.save();
    res.status(200).json({
      data: addedHall,
      message: "Hall created successfully",
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateHall = async (req, res, next) => {
  const { name, capacity } = req.body;
  try {
    const hall = await Hall.findByIdAndUpdate(
      req.params.id,
      { name, capacity },
      { new: true }
    );
    if (hall) {
      res.status(200).json({
        data: hall,
        message: "Hall updated successfully",
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

const deleteHall = async (req, res, next) => {
  try {
    const deletedHall = await Hall.findByIdAndDelete(req.params.id);
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
    next(error);
  }
};

module.exports = {
  getAllHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
};
