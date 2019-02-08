const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./product");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.get("/", (req, res) => {
  res.send("Hello, Not Allowed");
});

module.exports = router;
