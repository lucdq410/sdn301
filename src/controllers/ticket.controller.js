const Ticket = require("../models/ticket.model");
const SlotPicker = require("../models/slotPicker.model");
const { path } = require("../../app");

const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find()
      .populate("slotPicker_id")
      .populate("user_id");
    res.status(200).json({
      data: tickets,
      message: "Tickets retrieved successfully",
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("slotPicker_id")
      .populate("user_id");
    if (ticket) {
      res.status(200).json({
        data: ticket,
        message: "Ticket retrieved successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Ticket not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

const createTicket = async (req, res, next) => {
  const { slotPicker_id, user_id, seat_number, price } = req.body;
  try {
    const slotPicker = await SlotPicker.findById(slotPicker_id);
    if (!slotPicker || !slotPicker.is_available) {
      return res.status(400).json({
        data: null,
        message: "Slot not available",
        isSuccess: false,
      });
    }

    const newTicket = new Ticket({
      slotPicker_id,
      user_id,
      seat_number,
      price,
    });
    const addedTicket = await newTicket.save();

    slotPicker.is_available = false;
    await slotPicker.save();

    res.status(200).json({
      data: addedTicket,
      message: "Ticket created successfully",
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  const { slotPicker_id, user_id, seat_number, price } = req.body;
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { slotPicker_id, user_id, seat_number, price },
      { new: true }
    ).populate("slotPicker_id user_id");
    if (ticket) {
      res.status(200).json({
        data: ticket,
        message: "Ticket updated successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Ticket not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (ticket) {
      res.status(200).json({
        data: ticket,
        message: "Ticket deleted successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Ticket not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getTicketByUser = async (req, res, next) => {
  const user_id = req.user._id;

  try {
    const ticket = await Ticket.find({ user_id: user_id })
      .populate("slotPicker_id")
      .populate({
        path: "slotPicker_id",
        populate: [
          {
            path: "seat_id",
            populate: {
              path: "hall_id",
            },
          },
          {
            path: "screening_id",
            populate: {
              path: "movie",
            },
          },
        ],
      })
      .sort({ createdAt: -1 });

    if (ticket) {
      res.status(200).json({
        data: ticket,
        message: "Ticket retrieved successfully",
        isSuccess: true,
      });
    } else {
      res.status(404).json({
        data: null,
        message: "Ticket not found",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketByUser,
};
