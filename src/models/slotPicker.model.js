const mongoose = require("mongoose");

const slotPickerSchema = new mongoose.Schema(
  {
    seat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SEAT",
      require: true,
    },
    screening_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SCREENING",
      require: true,
    },
    is_available: {
      type: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const SlotPicker = mongoose.model("SLOTPICKER", userSchema);
module.exports = SlotPicker;
