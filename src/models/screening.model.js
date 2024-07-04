const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MOVIE",
      required: true,
    },
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HALL",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Screening = mongoose.model("SCREENING", screeningSchema);

module.exports = Screening;
