const TokensFunctions = require("../tokenFunctions");
const errCodes = require("../Constants/errCodes");

const isAuthenticated = secret => (request, response, next) => {
  const token = TokensFunctions.extractTokenFromRequest(request);
  if (token) {
    TokensFunctions.verifyToken(token, secret, (err) => {
      if (err) {
        response.status(403).json({
          success: false,
          errCode: errCodes.INVALID_TOKEN,
          errmessage: err,
        });
      } else next();
    });
  } else {
    response
      .status(403)
      .json({ success: false, errCode: errCodes.INVALID_TOKEN, errMessage: "Token missing" });
  }
};

module.exports = isAuthenticated;
