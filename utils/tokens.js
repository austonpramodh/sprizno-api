const jwt = require("jsonwebtoken");
const tokenSecret = require("../Constants/tokenSecret");
// get User Oject and create token,refreshToken and return
const createTokens = (user) => {
  // generate Token and return
  const token = jwt.sign(
    {
      data: { email: user.email },
      exp: Math.floor(Date.now() / 1000 + 60 * 15),
    },
    tokenSecret.tokenSecret,
  );
  const refreshToken = jwt.sign(
    {
      date: { email: user.email, uuid: user.uuid },
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7),
    },
    tokenSecret.refreshTokenSecret,
  );
  return { token, refreshToken };
};
const refreshTokens = () => {};
const generateOtpToken = (data) => {
  const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000 + 60 * 15) }, "AustonOtp");
  return token;
};
const generateResetToken = (data) => {
  const token = jwt.sign({ data, exp: Math.floor(Date.now() / 1000 + 60 * 15) }, "AustonReset");
  return token;
};
const verifyOtpToken = (token, cb) => {
  jwt.verify(token, "AustonOtp", cb);
};

const verifyResetToken = (token, cb) => {
  jwt.verify(token, "AustonReset", cb);
};
module.exports = {
  createTokens,
  refreshTokens,
  generateOtpToken,
  verifyOtpToken,
  generateResetToken,
  verifyResetToken,
};
