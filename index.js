const express = require("express");

const app = express();

// responf Hello world
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(3000, () => console.log("Listening on port 3000"));
