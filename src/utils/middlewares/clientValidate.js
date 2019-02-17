const errCodes = require("../Constants/errCodes");

const clientValidate = (request, response, next) => {
  const { client } = request.headers;
  if (client && client === "web") {
    next();
  } else response.status(403).json({ errCode: errCodes.INVALID_CLIENT, errMessage: "invalid client" });
};

module.exports = clientValidate;
