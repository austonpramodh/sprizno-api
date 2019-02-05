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
    required: true,
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
});

module.exports = mongoose.model("Products", ProductSchema, "products");
