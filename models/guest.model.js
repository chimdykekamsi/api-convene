const Mongoose = require("mongoose");

const guestSchema = Mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        ticket: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "Ticket" },
        gallery: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Image" }]
    },
    { timestamps: true }
)

module.exports = Mongoose.model("Guest",guestSchema);