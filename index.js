const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./Routes/routes");
const apiConstants = require("./Constants/api");

mongoose.connect(
  apiConstants.db.url,
  { useNewUrlParser: true }
);

const app = express();

app.use(express.json());

app.use("/", Routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
