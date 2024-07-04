const SlotPicker = require("../models/slotPicker.model");

/**
 * Controller function to create a new slot picker entry
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createSlotPicker = async (req, res) => {
  const { seat_id, screening_id } = req.body;

  try {
    const newSlotPicker = new SlotPicker({
      seat_id,
      screening_id,
      is_available: true, // Assuming the slot is initially available
    });

    const savedSlotPicker = await newSlotPicker.save();
    res.status(200).json({
      data: savedSlotPicker,
      message: "Slot picker created successfully",
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
  createSlotPicker,
};
