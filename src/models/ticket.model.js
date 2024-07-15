const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    slotPicker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SlotPicker",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
