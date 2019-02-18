const router = require("express").Router();
const authRoutes = require("./Routes/auth");
const isAuthenticated = require("../../utils/middlewares/isAutheticated");
const TokenSecrets = require("./Constants/TokenSecrets");

const productsRoutes = require("./Routes/products");

router.use("/auth", authRoutes);
router.use("/products", isAuthenticated(TokenSecrets.token), productsRoutes);

module.exports = router;
