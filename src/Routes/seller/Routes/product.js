const router = require("express").Router();
const ProductDbFunctions = require("../DbFunctions/ProductDBFunctions");
const Tokens = require("../../../utils/tokenFunctions");
const errCodes = require("../../../utils/Constants/errCodes");

router.post("/add", (req, res) => {
  const userEmail = Tokens.extractUserEmail(Tokens.extractTokenFromRequest(req));
  const { body } = req;
  body.seller = userEmail;
  ProductDbFunctions.add(body, (err, product) => {
    if (err) {
      res.json({ err, errCode: errCodes.ERROR_ADDING_PRODUCT, errmsg: "adding product" });
    } else res.json({ success: true, data: { ...product } });
  });
});

router.get("/getall", (req, res) => {
  const userEmail = Tokens.extractUserEmail(Tokens.extractTokenFromRequest(req));
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
      res.json({ err, errCode: errCodes.ERROR_UPDATING_PRODUCT });
    } else res.json({ success: true });
  });
});

module.exports = router;
