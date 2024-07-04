const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HALL",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    seat_number: {
      type: String,
      required: true,
    },
    is_available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Seat = mongoose.model("SEAT", seatSchema);
module.exports = Seat;
