const router = require("express").Router();

const errCodes = require("../../utils/Constants/errCodes");

router.get("/categorieslist", (req, res) => {
  res.json({
    success: true,
    data: [
      { name: "Laptops", subCategories: ["Gaming Laptops", "Office Laptops"] },
      { name: "Mobiles" },
      { name: "Clothes" },
      { name: "Computers" },
      { name: "Books" },
    ],
  });
});

router.use((req, res) => {
  res.status(404).json({ errCode: errCodes.ROUTE_NOT_FOUND, errMessage: "Unknown Route" });
});

module.exports = router;
