const generateSasQueryToken = require("../../utils/generateSasQueryToken");

const sasToken = (req, res) => {
  res.json({
    success: true,
    sasToken: generateSasQueryToken(),
  });
};

module.exports = sasToken;
