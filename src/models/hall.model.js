const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CINEMA", // Thay "CINEMA" bằng tên của model cinema nếu đã đặt tên khác
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hall = mongoose.model("HALL", hallSchema); // Sử dụng hallSchema để tạo model Hall

module.exports = Hall;
