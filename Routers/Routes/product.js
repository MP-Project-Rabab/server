const express = require("express");
const authentication = require("../Midleware/auth");
const authorization = require("../Midleware/aouth");

const {
  allProduct,
  newProduct,
  approved,
  notApproved,
  deleteProduct,
  oneProduct
} = require("../Controllers/product");

const productRouter = express.Router();

productRouter.get("/all", allProduct);
productRouter.post("/add", authentication, newProduct);
productRouter.put("/one", authentication, oneProduct);

productRouter.delete("/delete", authentication, deleteProduct);
// productRouter.put('/update',authentication, updatePost)

// For Admin
productRouter.get("/notAprove", authentication, authorization, notApproved);
productRouter.put("/approved", authentication, authorization, approved);

module.exports = productRouter;
