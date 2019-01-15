const express = require("express");
const UserSchema = require("../models/User");
const UserDbFunctions = require("../utils/UserDbFunctions");

const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);

  res.send(req.body);
});

router.post("/signup", (req, res) => {
  // create user schema from json received
  const newUser = new UserSchema({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  // call db utility for hashing password
  UserDbFunctions.createUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, message: "user Cannot be registered", err });
    } else {
      res.json({ success: true, message: "User Registered, Please Sign In" });
    }
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
});

module.exports = router;
