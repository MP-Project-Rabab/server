const express = require("express");
const authentication = require('../Midleware/auth');
const authorization = require("../Midleware/aouth");

const {allProduct, newProduct, approved, notApproved} = require('../Controllers/product');

const productRouter = express.Router();




productRouter.get('/all', allProduct);
productRouter.get('/notAprove', authentication, authorization, notApproved);
productRouter.post('/add',authentication, newProduct);
productRouter.put('/approved', authentication, authorization, approved)
// productRouter.delete('/delete',authentication, deletePost)
// productRouter.put('/update',authentication, updatePost)





module.exports = productRouter;
