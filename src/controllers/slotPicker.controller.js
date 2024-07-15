const SlotPicker = require("../models/slotPicker.model");

/**
 * Controller function to fetch slot pickers by screening_id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSlotPickersByScreeningId = async (req, res) => {
  const { screening_id } = req.params;

  try {
    const slotPickers = await SlotPicker.find({ screening_id });
    res.status(200).json({
      data: slotPickers,
      message: "Slot pickers fetched successfully",
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

/**
 * Controller function to edit the availability status of a slot picker entry
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const editSlotPickerAvailability = async (req, res) => {
  const { id } = req.params;
  const { is_available } = req.body;

  try {
    const updatedSlotPicker = await SlotPicker.findByIdAndUpdate(
      id,
      { is_available },
      { new: true }
    );

    if (!updatedSlotPicker) {
      return res.status(404).json({
        data: null,
        message: "Slot picker not found",
        isSuccess: false,
      });
    }

    res.status(200).json({
      data: updatedSlotPicker,
      message: "Slot picker availability updated successfully",
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
  getSlotPickersByScreeningId,
  editSlotPickerAvailability,
};
