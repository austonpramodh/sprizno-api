const mongoose = require("mongoose");

const { Schema } = mongoose;

const sellerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Seller", sellerSchema, "sellers");
