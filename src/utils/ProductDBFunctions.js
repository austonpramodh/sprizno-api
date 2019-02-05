const ProductSchema = require("../models/Product");

module.exports.add = (product, cb) => {
  const newProduct = new ProductSchema({
    ...product,
  });
  newProduct.save(cb);
};

module.exports.getAll = (userEmail, cb) => {
  ProductSchema.find({ seller: userEmail }, cb);
};

module.exports.delete = (_id, cb) => {
  ProductSchema.deleteOne({ _id }, cb);
};

module.exports.update = (product, cb) => {
  ProductSchema.updateOne({ _id: product._id }, product, cb);
};
