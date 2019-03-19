const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: {
    type: String,
    required: false,
    default: uuidv1(),
  },
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
  imageNames: {
    type: Array,
    required: false,
    default: [],
  },
  modifiedAt: {
    type: Number,
    required: false,
    default: 0,
  },
  stockLeft: {
    type: Number,
    required: false,
    default: 0,
  },
  stockSold: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("Products", ProductSchema, "products");
