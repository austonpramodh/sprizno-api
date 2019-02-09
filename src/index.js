const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./Routes/routes");
const apiConstants = require("./Constants/api");

mongoose.connect(
  apiConstants.db.url,
  { useNewUrlParser: true },
);

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", Routes);

app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
