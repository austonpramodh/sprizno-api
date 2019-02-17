const TokensFunctions = require("../tokens");
const errCodes = require("../Constants/errCodes");

const isAuthenticate = (request, response, next) => {
  const token = TokensFunctions.extractTokenRequest(request);
  if (token) {
    TokensFunctions.verifyToken(token, (err) => {
      if (err) {
        response
          .status(403)
          .json({ success: false, errCode: errCodes.INVALID_TOKEN, errmessage: err });
      } else next();
    });
  } else {
    response
      .status(403)
      .json({ success: false, errCode: errCodes.INVALID_TOKEN, errMessage: "Token missing" });
  }
};

module.exports = isAuthenticate;
