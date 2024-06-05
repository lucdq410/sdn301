const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    cinema_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CINEMA",
      require: true,
    },
    hall_number: {
      type: String,
      require: true,
    },
    total_seats: {
      type: String,
      require: true,
    },
    screen_type: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Hall = mongoose.model("HALL", userSchema);
module.exports = Hall;
