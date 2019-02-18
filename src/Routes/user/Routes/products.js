const router = require("express").Router();
const productSchema = require("../models/product");

router.get("/all", (req, res) => {
  productSchema.find({}, (err, products) => {
    res.json({ success: true, products });
  });
});

module.exports = router;
