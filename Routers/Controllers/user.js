const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;
const activeKey = process.env.ACTIVE_KEY;

//bcrypt > library to hash passwords.
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const userModel = require("../../DB/Model/user");


// Register function
const register = async (req, res) => {
    const { userName, email, password, role } = req.body;
    const savePass = await bcrypt.hash(password, SALT);
    const data = {
      userName,
      email,
      password: savePass,
      role
    };

    const token = jwt.sign(data, activeKey, { expiresIn: "15m" });
  
    
    // Sendgrid/mail
    const msg = {
      to: email,
      from: "cutange1414@hotmail.com",
      subject: "Email verification",
      text: "Please verificate your email",
      html: `<a href=${process.env.ACTIVE_URL}/user/activated/${token} >verificate your email</a>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(201).json("Email has been sent, activate it");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const activated = (req, res) => {
    const { token } = req.params;
    if (token) {
      jwt.verify(token, activeKey, (err, decodedToken) => {
        if (err) {
          return res.status(400).json("Expired link");
        }
        const { userName, email, password, role } = decodedToken;
        const creatUser = new userModel({
          userName,
          email,
          password,
          role
        });
        creatUser
          .save()
          .then((result) => {
            res
              .status(201)
              .send(
                `<h1>Email has been activated</h1> <button><a href=${process.env.LOG_PAGE}>Log In</a></button>`
              );
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      });
    } else {
      return res.status(400).json("wrong activated");
    }
  };


  // LogIn function

const logIn = (req, res) => {
    const { userName, email, password } = req.body;
  
    userModel
      .findOne({ $or: [{ email }, { userName }] })
  
      .then(async (result) => {
        if (result) {
          const savePass = await bcrypt.compare(password, result.password);
          if (savePass) {
            const payload = {
              role: result.role,
              id: result._id,
            };
            const token = jwt.sign(payload, SECRETKEY);
            return res.status(200).json({msg:"loged in successfully", result, token});
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          return res.status(404).json("not found");
        }
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  };


  // get all users function
const allUser = async (req, res) => {
    userModel
      .find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

//   get user profile
const profile = async (req, res) => {
    const { _id } = req.query;
    // const userProfile = await userModel.findOne({ _id });
    userModel
    .findOne({ _id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };


  // delete user function

const deleteUser = async (req, res) => {
    const { _id } = req.body;
  
    userModel
      .findById({ _id })
      .then((result) => {
        console.log(result);
        if (result) {
          userModel.deleteOne({ _id }, (err) => {
            if (err) return handleError(err);
          });
  
          res.status(200).json({ massege: "user deleted successfully" });
        } else {
          return res.status(404).json("user not found");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  

  module.exports = {
    register,
    activated,
    logIn,
    allUser,
    profile,
    deleteUser,
    // forgetPass,
    // updatePass
  };
  
