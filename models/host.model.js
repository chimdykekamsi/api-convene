const Mongoose = require("mongoose");

const hostSchema = Mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        events: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }
        ]
    },
    { timestamps: true }
)

module.exports = Mongoose.model("Host",hostSchema);