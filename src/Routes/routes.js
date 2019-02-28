const express = require("express");
const sellerRoutes = require("./seller/index");
const userRoutes = require("./user/index");
const adminRoutes = require("./admin/index");
const commonRoutes = require("./common/index");

const router = express.Router();

router.use("/seller", sellerRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/common", commonRoutes);

module.exports = router;
