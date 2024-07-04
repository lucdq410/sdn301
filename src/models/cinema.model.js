const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cinema = mongoose.model("CINEMA", cinemaSchema); // Giữ nguyên "CINEMA" và sử dụng cinemaSchema

module.exports = Cinema;
