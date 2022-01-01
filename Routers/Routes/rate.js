const express = require("express");
const authentication = require("../Midleware/auth");
const rateRouter = express.Router();
const { addRate, allRates } = require("../Controllers/rate");

rateRouter.post("/add", authentication, addRate);
rateRouter.get("/", allRates);

module.exports = rateRouter;
