const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv") 
dotenv.config();


// passport config
require("./Routers/passport")(passport)
const app = express();

// imported the db file
require("./DB/index")

//  Middlewares
app.use(express.json({limit: "30mb", extended: true}));
app. use(express.urlencoded({limit: "30mb", extended: false}))
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());


// import all routers

// user router
const userRouter = require('./Routers/Routes/user');
app.use("/user", userRouter);
// role router
const roleRouter = require('./Routers/Routes/role')
app.use("/role", roleRouter);
// Posts Router
const postRouter = require('./Routers/Routes/post')
app.use("/posts", postRouter);


//  PORT 
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})