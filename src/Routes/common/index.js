const router = require("express").Router();

router.use((req, res) => {
  res.send("welcome to common routes");
});

module.exports = router;
