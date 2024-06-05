const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        slotPicker_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SLOTPICKER',
            require: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER',
            require: true
        },
        seat_number: {
            type: String,
            require: true
        },
        purchase_date: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        
    },
    {
        timestamps: true

    }
)
const Ticket = mongoose.model('TICKET', userSchema)
module.exports = Ticket;