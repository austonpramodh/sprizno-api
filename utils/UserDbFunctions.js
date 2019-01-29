const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
const UserSchema = require("../models/User");
const encryptionConstants = require("../Constants/encryption");

module.exports.createUser = (newUser, cb) => {
  bcrypt.genSalt(encryptionConstants.salt, (errsalt, salt) => {
    bcrypt.hash(newUser.password, salt, (errhash, hash) => {
      newUser.password = hash;
      newUser.uuid = uuidv1();
      newUser.save(cb);
    });
  });
};

module.exports.findUser = ({ email }, cb) => {
  UserSchema.findOne({ email }, cb);
};

module.exports.comparePassword = ({ password, dbPassword }, cb) => {
  bcrypt.compare(password, dbPassword, (err, isMatch) => {
    cb(err, isMatch);
  });
};
