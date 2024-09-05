const Mongoose = require("mongoose");

const imageSchema = Mongoose.Schema(
    {
        title: { type: String},
        description: { type: String },
        imageUrl: { type: String, required: true },
        guest: { type: Mongoose.Types.ObjectId, ref: "Guest" },
        event: { type: Mongoose.Types.ObjectId, ref: "Event" }
    },
    { timestamps: true }
)

module.exports = Mongoose.model("Image",imageSchema);