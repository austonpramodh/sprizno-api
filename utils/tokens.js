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

module.exports = { createTokens, refreshTokens };
