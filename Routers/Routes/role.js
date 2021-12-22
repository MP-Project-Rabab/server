const express = require("express");
const roleRouter = express.Router();

const { creatRole, allRole } = require('../Controllers/role');
const authentication = require("../Midleware/auth");
const authorization = require("../Midleware/aouth");


roleRouter.get("/",authentication,authorization, allRole)
roleRouter.post("/create", authentication,authorization, creatRole)



module.exports = roleRouter;