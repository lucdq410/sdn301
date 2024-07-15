const mongoose = require("mongoose");

const slotPickerSchema = new mongoose.Schema(
  {
    seat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SEAT",
      required: true,
    },
    screening_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SCREENING",
      required: true,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const SlotPicker = mongoose.model("SLOTPICKER", slotPickerSchema);

module.exports = SlotPicker;
