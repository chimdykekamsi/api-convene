const Event = require("../models/event.model");
const asyncHandler = require("express-async-handler");

const fetchAll = asyncHandler(async(req,res)=>{
    const events = await Event.find({});
    res.status(201).json(events);
});

const createEvent = asyncHandler(async(req,res)=>{
    const { name, date, location } = req.body;
    // date must be a valid date time type
    if (! new Date(date)) {
        throw new Error("incorrect date format");
    }
    const host = req.validated.id;
    const newEvent = Event.create({ name, date, location, host });
    if (!newEvent) {
        throw new Error("Failed to create event");
    }
    return res.status(201).json(newEvent);
})

module.exports = {
    fetchAll
}