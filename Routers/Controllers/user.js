const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;
const activeKey = process.env.ACTIVE_KEY;
const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//bcrypt > library to hash passwords.
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const userModel = require("../../DB/Model/user");

// Register function
const register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
    const savePass = await bcrypt.hash(password, SALT);
    const data = {
      userName,
      email,
      password: savePass,
      role,
    };

    const token = jwt.sign(data, activeKey, { expiresIn: "60m" });

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
  } else {
    res.status(210).json("you need to insert a complix password");
  }
};

const activatedAccount = (req, res) => {
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
        role,
      });
      creatUser
        .save()
        .then((result) => {
          res
            .status(201)
            .send(`<h1>Email has been activated</h1>  <h2>تم تفعيل حسابك</h2>`);
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
          return res
            .status(200)
            .json({ msg: "loged in successfully", result, token });
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
    .find({ isDeleted: false })
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
  userModel
    .findOne({ _id })
    .populate("cart shop")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//  Update user profile
const updateProfile = async (req, res) => {
  try {
    const { userName, avatar, location, certifacte, _id, cart } = req.body;
    const cloude = await cloudinary.uploader.upload(avatar, {
      folder: "profile-img",
    });

    await userModel
      .findByIdAndUpdate(
        { _id },
        {
          $set: {
            userName,
            avatar: cloude.secure_url,
            location,
            // certifacte: cloude2.secure_url,
            cart,
          },
        },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(403).json(error);
    console.log(error);
  }

  // const cloude2 = await cloudinary.uploader.upload(certifacte,{
  //   folder: "certifacte-img",
  // })
  // .then((result) => {
  //   res.status(200).json(result);
  // })
  // .catch((err) => {
  //   res.status(403).json(err);
  //   console.log(err);
  // });
};

//  Update user Type for Admin
const updateUserType = async (req, res) => {
  const { userType, _id } = req.body;
  await userModel
    .findByIdAndUpdate({ _id }, { $set: { userType } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(403).json("forbidden");
    });
};

// delete user function

const deleteUser = async (req, res) => {
  const { _id } = req.query;

  await userModel
    .findByIdAndUpdate({ _id }, { $set: { isDeleted: true } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

// forget password function
const forgetPass = (req, res) => {
  const { email } = req.body;

  userModel.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json("user with this email dosn't exists");
    }
    const token = jwt.sign({ _id: user._id }, activeKey, { expiresIn: "30m" });
    // Sendgrid/mail
    const msg = {
      to: email,
      from: "cutange1414@hotmail.com",
      subject: "password rest",
      html: `<a href=${process.env.LOG_PAGE}reset-password/${token}>reset your password</a>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(201).json("Email has been sent,reset it");
      })
      .catch((error) => {
        console.error(error);
      });
    // userModel
    //   .updateOne({ password: userModel.password })
    //   .then((result) => {
    //     return res.status(201).send(`hi`);
    //     // `<button><a href=${process.env.ACTIVE_URL}>re</a></button>`
    //   })
    //   .catch((err) => {
    //     res.status(400).json(err);
    //   });
  });
};

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  console.log(_id);
  if (token) {
    jwt.verify(token, activeKey, async (err, resetToken) => {
      const { _id } = resetToken;
      await userModel
        .findOneAndUpdate({ _id }, { $set: { password } }, { new: true })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(403).json(err);
        });
    });
  }
  // if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
  //   const savePass = await bcrypt.hash(password, SALT);
  // }
};

module.exports = {
  register,
  activatedAccount,
  logIn,
  allUser,
  profile,
  deleteUser,
  forgetPass,
  updatePassword,
  updateProfile,
  updateUserType,
};
