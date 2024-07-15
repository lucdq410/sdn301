const mongoose = require("mongoose");

let SlotPicker;

try {
  SlotPicker = mongoose.model("SLOTPICKER");
} catch (error) {
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
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  SlotPicker = mongoose.model("SLOTPICKER", slotPickerSchema);
}

module.exports = SlotPicker;
