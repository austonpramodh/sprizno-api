const express = require("express");
const UserSchema = require("../models/User");
const UserDbFunctions = require("../utils/UserDbFunctions");
const errCodes = require("../Constants/errCodes");
const Tokens = require("../utils/tokens");

const router = express.Router();
// SignUp Route
router.post("/signup", (req, res) => {
  // create user schema from json received
  const newUser = new UserSchema({
    email: req.body.email,
    password: req.body.password,
  });
  // call db utility for hashing password
  UserDbFunctions.createUser(newUser, (err) => {
    if (err) {
      res.json({
        success: false,
        message: "user Cannot be registered",
        err,
        errCode: errCodes.USER_ALREADY_REGISTERED,
      });
    } else {
      res.json({ success: true, message: "User Registered, Please Sign In" });
    }
  });
});

// Login Route
router.post("/login", (req, res) => {
  console.log("login hit");
  console.log(req.body);
  const { email, password } = req.body;
  // find in db and match password
  UserDbFunctions.findUser({ email }, (err, user) => {
    if (err) {
      console.log(err, "err");

      res.json({ succes: false, err, errCode: errCodes.SERVER_DB_ERROR });
    } else if (!user) {
      console.log("user not found");
      res.json({
        success: false,
        err: "user not found",
        errCode: errCodes.USER_NOT_FOUND,
      });
    } else {
      // Compare password and then generate token
      UserDbFunctions.comparePassword({ password, dbPassword: user.password }, (err1, isMatch) => {
        if (err1) {
          console.log("err1");
          console.log(err1);
          res.json({ success: false, err1, errCode: errCodes.SERVER_PASSWORD_MATCHING_ERROR });
        } else if (isMatch) {
          // create token and refresh token and send
          const tokens = Tokens.createTokens(user);
          res.json({
            success: true,
            err: null,
            msg: "Logged in",
            tokens,
          });
        } else {
          res.json({
            success: false,
            err: "password incorrect",
            errCode: errCodes.PASSWORD_INVALID,
          });
        }
      });
    }
  });
});

// reset Password Route

// refreshTokens

module.exports = router;
