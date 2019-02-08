const router = require("express").Router();
const ProductDbFunctions = require("../utils/ProductDBFunctions");
const Tokens = require("../utils/tokens");
const errCodes = require("../Constants/errCodes");

router.post("/add", (req, res) => {
  const userEmail = Tokens.extractUserEmail(Tokens.extractTokenRequest(req));
  const { body } = req;
  body.seller = userEmail;
  ProductDbFunctions.add(body, (err) => {
    if (err) {
      res.json({ err, errmsg: "adding product" });
    } else res.json({ success: true });
  });
});

router.get("/getall", (req, res) => {
  const userEmail = Tokens.extractUserEmail(Tokens.extractTokenRequest(req));
  ProductDbFunctions.getAll(userEmail, (err, data) => {
    res.json({ success: true, data: [...data] });
  });
});

// delete product --------------
router.post("/delete", (req, res) => {
  const { id } = req.body;
  ProductDbFunctions.delete(id, (err) => {
    if (err) {
      res.json({ errCode: errCodes.ERROR_DELETING_PRODUCT });
    } else res.json({ success: true });
  });
});

// update product -----------
router.post("/update", (req, res) => {
  ProductDbFunctions.update(req.body, (err) => {
    if (err) {
      res.json({ err });
    } else res.json({ success: true });
  });
});

module.exports = router;
