const express = require("express");
const authentication = require("../Midleware/auth");
const rateRouter = express.Router();
const { addRate } = require("../Controllers/rate");

rateRouter.post("/add", authentication, addRate);

module.exports = rateRouter;
