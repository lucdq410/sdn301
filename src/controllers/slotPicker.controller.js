const SlotPicker = require("../models/slotPicker.model");
const Ticket = require("../models/ticket.model");

/**
 * Controller function to fetch slot pickers by screening_id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSlotPickersByScreeningId = async (req, res) => {
  const { screening_id } = req.params;

  try {
    const slotPickers = await SlotPicker.find({ screening_id }).populate(
      "seat_id"
    );
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

const pickSlots = async (req, res) => {
  const { screening_id, slots } = req.body;
  const userID = req.user._id;

  let ticket = [];

  const saveTicket = async (ticket) => {
    try {
      const addTicket = await ticket.save();
      return addTicket;
    } catch (error) {
      return res.status;
    }
  };

  for (let slot of slots) {
    console.log(slot);
    const slotPicker = await SlotPicker.findOne({ _id: slot }).populate(
      "seat_id"
    );
    slotPicker.is_available = false;

    const newTicket = new Ticket({
      slotPicker_id: slot,
      user_id: userID,
      seat_number: slotPicker.seat_id.seat_number,
      purchase_date: new Date(),
      price: slotPicker.seat_id.price,
    });
    ticket.push(saveTicket(newTicket), slotPicker.save());
  }
  Promise.all(ticket);

  res.status(200).json({
    data: null,
    message: "Slots picked successfully",
    isSuccess: true,
  });
  // try {
  //   const slotPickers = seat_ids.map((seat_id) => {
  //     return new SlotPicker({
  //       seat_id,
  //       screening_id,
  //       is_available: true,
  //     });
  //   });

  //   const savedSlotPickers = await SlotPicker.insertMany(slotPickers);

  //   res.status(200).json({
  //     data: savedSlotPickers,
  //     message: "Slots picked successfully",
  //     isSuccess: true,
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     data: null,
  //     message: error.message,
  //     isSuccess: false,
  //   });
  // }
};

module.exports = {
  getSlotPickersByScreeningId,
  editSlotPickerAvailability,
  pickSlots,
};
