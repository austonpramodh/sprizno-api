const ProductSchema = require("../models/Product");

module.exports.addProduct = (product, cb) => {
  const newProduct = new ProductSchema({
    ...product,
  });
  newProduct.save(cb);
};

module.exports.getProducts = (userEmail, cb) => {
  ProductSchema.find({ seller: userEmail }, cb);
};
