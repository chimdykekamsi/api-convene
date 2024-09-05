const express = require("express");
const checkForMissingFields = require("../middlewares/checkMissingFields");
const { hostRegister, hostLogin, authorizedHost, fetchAll } = require("../controllers/host.controller");
const { validateToken } = require("../middlewares/validateTokenHandler");
const hostRouter = express.Router();

hostRouter.get("/", validateToken, fetchAll);
hostRouter.post("/register",checkForMissingFields(["name", "email", "password"]),hostRegister);
hostRouter.post("/login",checkForMissingFields(["email","password"]),hostLogin);
hostRouter.post("/validate",validateToken,authorizedHost);

module.exports = hostRouter;