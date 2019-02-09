const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
// const argon2 = require("argon2");
const UserSchema = require("../models/User");
const encryptionConstants = require("../Constants/encryption");

module.exports.createUser = async (user, cb) => {
  const newUser = new UserSchema({
    ...user,
  });
  // const hash = await argon2.hash(newUser.password);
  // newUser.password = hash;
  bcrypt.genSalt(encryptionConstants.salt, (errsalt, salt) => {
    bcrypt.hash(newUser.password, salt, (errhash, hash) => {
      newUser.password = hash;
      newUser.uuid = uuidv1();
      newUser.save(cb);
    });
  });
};

module.exports.updatePassword = (user, newPassword, cb) => {
  bcrypt.genSalt(encryptionConstants.salt, (errsalt, salt) => {
    bcrypt.hash(newPassword, salt, (errhash, hash) => {
      user.uuid = uuidv1();
      user.password = hash;
      user.otp = "";
      UserSchema.updateOne({ email: user.email }, user, cb);
    });
  });
};

module.exports.findUser = ({ email }, cb) => {
  UserSchema.findOne({ email }, cb);
};

module.exports.comparePassword = ({ password, dbPassword }, cb) => {
  bcrypt.compare(password, dbPassword, cb);
};

// update User
module.exports.updateUser = (oldData, newData, cb) => {
  UserSchema.updateOne(oldData, newData, cb);
};
