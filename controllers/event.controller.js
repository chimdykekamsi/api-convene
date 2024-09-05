const Event = require("../models/event.model");
const asyncHandler = require("express-async-handler");

const fetchAll = asyncHandler(async(req,res)=>{
    const events = await Event.find({});
    res.status(201).json(events);
});

module.exports = {
    fetchAll
}