const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HALL",
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    seat_number: {
      type: String,
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
const Seat = mongoose.model("SEAT", userSchema);
module.exports = Seat;
