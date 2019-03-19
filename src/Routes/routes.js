const express = require("express");
const sellerRoutes = require("./seller/index");
const userRoutes = require("./user/index");
const adminRoutes = require("./admin/index");
const commonRoutes = require("./common/index");
const errCodes = require("../utils/Constants/errCodes");
const api = require("../utils/Constants/api");

const router = express.Router();

router.use("/seller", sellerRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/common", commonRoutes);

router.get("/status", (req, res) => {
  res.status(200).json({
    environment: process.env.NODE_ENV ? process.env.NODE_ENV : "development or unknown",
    message: "all fine",
    dbUrl: api.DB.URL,
  });
});

router.use((req, res) => {
  res.status(404).json({ errCode: errCodes.ROUTE_NOT_FOUND, errMessage: "Unknown Route" });
});

module.exports = router;
