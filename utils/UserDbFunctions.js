const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
const UserSchema = require("../models/User");

module.exports.createUser = (newUser, cb) => {
  bcrypt.genSalt(10, (errsalt, salt) => {
    bcrypt.hash(newUser.password, salt, (errhash, hash) => {
      newUser.password = hash;
      newUser.uuid = uuidv1();
      newUser.save(cb);
    });
  });
};
