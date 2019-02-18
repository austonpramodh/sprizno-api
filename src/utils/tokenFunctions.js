const jwt = require("jsonwebtoken");

const createTokens = (user, tokenSecrets) => {
  // generate Token and return
  const { email, uuid } = user;
  const token = jwt.sign(
    {
      data: { email },
      exp: Math.floor(Date.now() / 1000 + 10),
    },
    tokenSecrets.token,
  );
  const refreshToken = jwt.sign(
    {
      data: { email, uuid },
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7),
    },
    tokenSecrets.refreshToken,
  );
  return { token, refreshToken };
};

const verifyToken = (token, secret, cb) => {
  jwt.verify(token, secret, cb);
};

/// ///////////////////////////////////-----------------------------
const generateOtpToken = (data) => {
  const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000 + 60 * 30) }, "AustonOtp");
  return token;
};
const generateResetToken = (data) => {
  const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000 + 60 * 30) }, "AustonReset");
  return token;
};
const verifyOtpToken = (token, cb) => {
  jwt.verify(token, "AustonOtp", cb);
};

const verifyResetToken = (token, cb) => {
  jwt.verify(token, "AustonReset", cb);
};
/// /////////------------------------------

const extractUserEmail = (token) => {
  const { email } = jwt.decode(token).data;
  return email;
};

module.exports = {
  createTokens,
  generateOtpToken,
  verifyOtpToken,
  generateResetToken,
  verifyResetToken,
  verifyToken,
  extractUserEmail,
};
