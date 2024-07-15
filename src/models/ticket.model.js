const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    slotPicker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SLOTPICKER",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    seat_number: {
      type: String,
      required: true,
    },
    purchase_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("TICKET", ticketSchema);
module.exports = Ticket;
