const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./src/Routes/routes");
const apiConstants = require("./src/utils/Constants/api");
const clientValidate = require("./src/utils/middlewares/clientValidate");

mongoose.connect(
  apiConstants.DB.URL,
  { useNewUrlParser: true, useCreateIndex: true },
);

const app = express();

app.use(cors());

app.use(express.json());
app.use(clientValidate);

app.use("/", Routes);

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
