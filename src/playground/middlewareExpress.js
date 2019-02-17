const express = require("express");

const app = express();

const myLogger = (req, res, next) => {
  const { client } = req.headers;
  if (client === "web") {
    next();
  } else {
    res.status(200).send("invalid client");
  }
};

app.use(myLogger);
app.get("/", (req, res) => {
  res.status(200).send("Hello, this is API server only");
});

const port = process.env.PORT || 5001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
