const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const UserSchema = require("../models/User");
const cryptoConfig = require("./Constants/cryptoConfig");

module.exports.createUser = async (user, callback) => {
  const newUser = new UserSchema({
    ...user,
  });
  crypto.randomBytes(cryptoConfig.saltBytes, (err, salt) => {
    salt = salt.toString("hex");
    if (err) {
      return callback(err);
    }
    crypto.pbkdf2(
      newUser.password,
      salt,
      cryptoConfig.iterations,
      cryptoConfig.hashBytes,
      null,
      (err1, hash) => {
        if (err1) return callback(err1);
        hash = hash.toString("hex");
        const combined = [salt, hash].join("$");
        newUser.uuid = uuidv1();
        newUser.password = combined;
        newUser.save(callback);
        return null;
      },
    );
    return null;
  });
};

module.exports.updatePassword = (user, newPassword, callback) => {
  // bcrypt.genSalt(encryptionConstants.salt, (errsalt, salt) => {
  //   bcrypt.hash(newPassword, salt, (errhash, hash) => {
  //     user.uuid = uuidv1();
  //     user.password = hash;
  //     user.otp = "";
  //     UserSchema.updateOne({ email: user.email }, user, cb);
  //   });
  // });
  crypto.randomBytes(cryptoConfig.saltBytes, (err, salt) => {
    salt = salt.toString("hex");
    if (err) {
      return callback(err);
    }
    crypto.pbkdf2(
      newPassword,
      salt,
      cryptoConfig.iterations,
      cryptoConfig.hashBytes,
      null,
      (err1, hash) => {
        if (err1) return callback(err1);
        hash = hash.toString("hex");
        const combined = [salt, hash].join("$");
        user.uuid = uuidv1();
        user.password = combined;
        user.save(callback);
        return null;
      },
    );
    return null;
  });
};

module.exports.findUser = ({ email }, cb) => {
  UserSchema.findOne({ email }, cb);
};

module.exports.comparePassword = ({ password, dbPassword }, callback) => {
  // get salt out
  const salt = dbPassword.split("$")[0];
  // get out he hash
  const dbHash = dbPassword.split("$")[1];
  crypto.pbkdf2(
    password,
    salt,
    cryptoConfig.iterations,
    cryptoConfig.hashBytes,
    null,
    (err, hash) => {
      if (err) return callback(err, false);
      callback(null, hash.toString("hex") === dbHash);
      return null;
    },
  );
};

// update User
module.exports.updateUser = (oldData, newData, cb) => {
  UserSchema.updateOne(oldData, newData, cb);
};
