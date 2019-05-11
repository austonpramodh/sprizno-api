const getDbUrl = (override) => {
  if (process.env.NODE_ENV === "production" || override) {
    return "mongodb+srv://sprizno:sprizno123@cluster0-alayz.azure.mongodb.net/sprizno?retryWrites=true";
  }
  return "mongodb://localhost:27017/ecommerce";
};

const api = {
  DB: {
    URL: getDbUrl(),
    // URL: "mongodb://austonpramodh:Clickass1@ds040948.mlab.com:40948/rollswitch",
    // URL: "mongodb://localhost:27017/ecommerce",
    // URL:
    // "mongodb+srv://sprizno:sprizno123@cluster0-alayz.azure.mongodb.net/sprizno?retryWrites=true",
  },
  HEADERS: {
    AUTHORIZATION: "authorization",
  },
};

// test
module.exports = api;
