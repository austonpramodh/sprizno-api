const router = require("express").Router();
const productRoutes = require("./Routes/product");
const authRoutes = require("./Routes/auth");
const isAuthenticated = require("../../utils/middlewares/isAutheticated");
const TokenSecrets = require("./Constants/TokenSecrets");

router.use("/auth", authRoutes);
router.use("/product", isAuthenticated(TokenSecrets.token), productRoutes);

module.exports = router;
