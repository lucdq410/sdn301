const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MOVIE",
      require: true,
    },
    hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HALL",
      require: true,
    },
    start_time: {
      type: Date,
      require: true,
    },
    end_time: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Screening = mongoose.model("SCREENING", userSchema);
module.exports = Screening;
