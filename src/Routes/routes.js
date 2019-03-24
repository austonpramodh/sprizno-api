const express = require("express");
const sellerRoutes = require("./seller/index");
const userRoutes = require("./user/index");
const adminRoutes = require("./admin/index");
const commonRoutes = require("./common/index");

const api = require("../utils/Constants/api");

const router = express.Router();

router.use("/seller", sellerRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/", commonRoutes);

router.get("/status", (req, res) => {
  res.status(200).json({
    environment: process.env.NODE_ENV ? process.env.NODE_ENV : "development or unknown",
    message: "all fine",
    dbUrl: api.DB.URL,
  });
});

module.exports = router;
