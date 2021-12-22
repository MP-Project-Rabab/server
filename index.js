const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv") 
dotenv.config();
const app = express();


// imported the db file
require("./db/index")

//  Middlewares
app.use(express.json({limit: "30mb", extended: true}));
app. use(express.urlencoded({limit: "30mb", extended: false}))
app.use(cors());
app.use(passport.initialize());
app.use(morgan("dev"));


// import all routers

// user router
const userRouter = require('./Routers/Routes/user');
app.use("/user", userRouter);
// role router
const roleRouter = require('./Routers/Routes/role')
app.use("/role", roleRouter);


//  PORT 
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})