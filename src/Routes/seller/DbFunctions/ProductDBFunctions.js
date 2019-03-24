const ProductSchema = require("../models/Product");

module.exports.add = (data, cb) => {
  const newProduct = new ProductSchema({
    ...data,
  });
  newProduct.save((err, product) => {
    cb(err, product._doc);
  });
};

module.exports.getAll = (userEmail, cb) => {
  ProductSchema.find({ seller: userEmail, isDeleted: false }, cb);
};

module.exports.delete = (id, cb) => {
  ProductSchema.findByIdAndUpdate(id, { isDeleted: true }, cb);
};

module.exports.update = (product, cb) => {
  ProductSchema.updateOne({ _id: product._id }, product, cb);
};
