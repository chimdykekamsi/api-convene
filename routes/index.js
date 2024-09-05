const express = require("express");
const hostRouter = require("./host.route");
const eventRouter = require("./event.route");
const Router = express.Router();

// Define routes
// Router.use("/events", eventRouter);
Router.use("/hosts",hostRouter);

module.exports = Router;