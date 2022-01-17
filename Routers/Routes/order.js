const express = require("express");
const authentication = require("../Midleware/auth");
const authorization = require("../Midleware/aouth");
const { allOrder, addOrder, deleteOrder } = require("../Controllers/order");
const orderRouter = express.Router();

// orderRouter.get("/all", authentication, allOrder);
orderRouter.post('/new', authentication, addOrder);
// orderRouter.delete("/delete", authentication, deleteOrder);



module.exports = orderRouter;
