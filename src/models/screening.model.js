const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", // Thay "Movie" bằng tên của model movie nếu đã đặt tên khác
      required: true,
    },
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HALL", // Thay "HALL" bằng tên của model hall nếu đã đặt tên khác
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

const Screening = mongoose.model("SCREENING", screeningSchema); // Sử dụng screeningSchema để tạo model Screening

module.exports = Screening;
