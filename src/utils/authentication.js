const UserDBFunctions = require("./UserDbFunctions");
const TokenFunctions = require("./tokenFunctions");
const errCodes = require("./Constants/errCodes");

const signup = (Schema, TokenSecrets) => (req, res) => {
  const newUser = new Schema({ ...req.body });
  UserDBFunctions.createUser(newUser, (err, user) => {
    if (err) {
      if (err.code === 1100) {
        res.json({
          success: false,
          errCode: errCodes.USER_ALREADY_REGISTERED,
          err,
        });
      } else {
        res.json({
          success: false,
          errCode: errCodes.SERVER_PASSWORD_SALTING_ERROR,
          err,
        });
      }
    } else if (user) {
      const tokens = TokenFunctions.createTokens(user, TokenSecrets);
      res.json({ success: true, tokens });
    } else res.json({ success: false, errCode: errCodes.UNKOWN_ERROR, errMsg: "UNKOWN_ERROR" });
  });
};

const signin = (Schema, TokenSecrets) => (req, res) => {
  const { email, password } = req.body;
  UserDBFunctions.findUser(email, Schema, (err, user) => {
    if (err) {
      res.json({ success: false, err, errCode: errCodes.SERVER_DB_ERROR });
    } else if (user) {
      UserDBFunctions.comparePassword({ password, dbPassword: user.password }, (err1, isMatch) => {
        if (err1) {
          res.json({ success: false, err: err1, errCode: errCodes.SERVER_PASSWORD_MATCHING_ERROR });
        } else if (isMatch) {
          const tokens = TokenFunctions.createTokens(user, TokenSecrets);
          res.json({ success: true, tokens });
        } else res.json({ success: false, errCode: errCodes.PASSWORD_INVALID });
      });
    } else res.json({ success: false, errCode: errCodes.USER_NOT_FOUND });
  });
};

const refreshTokens = (Schema, tokenSecrets) => (req, res) => {
  const token = req.headers.authorization;
  TokenFunctions.verifyToken(token, tokenSecrets.refreshToken, (err, decoded) => {
    if (err) {
      res.json({ success: false, errCode: errCodes.INVALID_TOKEN });
    } else if (decoded) {
      const { email } = decoded.data;
      // GENERATE TOKENS AND RETURN
      UserDBFunctions.findUser(email, Schema, (err1, user) => {
        if (err1) {
          res.json({ success: false, errCode: errCodes.SERVER_DB_ERROR });
        } else if (user) {
          const tokens = TokenFunctions.createTokens(user, tokenSecrets);
          res.json({ success: true, tokens });
        } else {
          res.json({ success: false, errCode: errCodes.UNKOWN_ERROR });
        }
      });
    } else res.json({ success: false, errCode: errCodes.UNKOWN_ERROR });
  });
};

// forgot
// otp
// reset

module.exports = { signup, signin, refreshTokens };
