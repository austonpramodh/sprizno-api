const router = require("express").Router();
const ProductDbFunctions = require("../utils/ProductDBFunctions");
const Tokens = require("../utils/tokens");

router.post("/addproduct", (req, res) => {
  const userEmail = Tokens.extractUserEmail(Tokens.extractTokenRequest(req));
  const { product } = req.body;
  product.seller = userEmail;
  ProductDbFunctions.addProduct(product, (err) => {
    if (err) {
      res.json({ err: "adding product" });
    } else res.json({ success: true });
  });
});

router.get("/getProducts", (req, res) => {
  const userEmail = Tokens.extractUserEmail(Tokens.extractTokenRequest(req));
  ProductDbFunctions.getProducts(userEmail, (err, data) => {
    res.json({ data });
  });
});

module.exports = router;
