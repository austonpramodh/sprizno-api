const router = require("express").Router();
const productRoutes = require("./Routes/product");
const authRoutes = require("./Routes/auth");
const isAuthenticated = require("../../utils/middlewares/isAutheticated");
const TokenSecrets = require("./Constants/TokenSecrets");
const generateSasQueryToken = require("../../utils/generateSasQueryToken");

router.use("/auth", authRoutes);
router.use("/product", isAuthenticated(TokenSecrets.token), productRoutes);

router.get("/sasToken", isAuthenticated(TokenSecrets.token), (req, res) => {
  res.json({ success: true, sasToken: generateSasQueryToken() });
});
module.exports = router;
