const router = require("express").Router();
const productRoutes = require("./product");
const authRoutes = require("./auth");
const isAuthenticated = require("../../utils/middlewares/isAutheticated");

router.use("/auth", authRoutes);
router.use("/product", isAuthenticated, productRoutes);

module.exports = router;
