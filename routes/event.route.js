const express = require("express");
const { validateToken } = require("../middlewares/validateTokenHandler");
const { fetchAll } = require("../controllers/event.controller");
const eventRouter = express.Router();

eventRouter.route("/")
    .get(validateToken,fetchAll)

module.exports = eventRouter;