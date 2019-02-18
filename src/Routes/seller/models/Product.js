const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  seller: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: false,
    unique: false,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    required: false,
  },
  createdAT: {
    type: Number,
    required: false,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Products", ProductSchema, "products");
