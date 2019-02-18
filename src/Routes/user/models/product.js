const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema();

module.exports = mongoose.model("Product", productSchema, "products");
