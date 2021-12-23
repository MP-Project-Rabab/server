const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");

const dotenv = require("dotenv") 
dotenv.config();

const googleModel = require('../DB/Model/google')

const googlePass = (passport) => {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done) => {
    googleModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))
};

module.exports = googlePass;