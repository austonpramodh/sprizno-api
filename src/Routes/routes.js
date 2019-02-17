const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./product");
const isAuthenticated = require("../utils/middlewares/isAutheticated");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/product", isAuthenticated, productRoutes);
// router.use("/product", productRoutes);

module.exports = router;
