const express = require("express");
const sellerRoutes = require("./seller/index");

const router = express.Router();

router.use("/seller", sellerRoutes);

module.exports = router;
