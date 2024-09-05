const Mongoose = require("mongoose");

const ticketSchema = Mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        availableSeats: { type: Number, required: true },
        soldSeats: { type: Number, default: 0 },
        description: { type: String, required: false },
        event: { type: Mongoose.Schema.Types.ObjectId, ref: "Event" },
        guests: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Guest" }],
        imageUrl: { type: String, required: false }
    },
    { timestamps: true }
)

module.exports = Mongoose.model("Ticket",ticketSchema);