const Mongoose = require("mongoose");

const eventSchema = Mongoose.Schema(
    {
        name: { type: String, required: true },
        host: { type: Mongoose.Schema.Types.ObjectId, ref: "Host" },
        date: { type: Date, required: true },
        location: { type: String },
        guests: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Guest" }],
        tickets: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
        gallery: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Image" }],
        acceptRegistration: { type: Boolean, default: true }
    },
    { timestamps: true }
)

module.exports = Mongoose.model("Event",eventSchema);