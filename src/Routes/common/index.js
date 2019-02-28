const router = require("express").Router();
const sastoken = require("./blobStorageToken");

router.get("/sastoken", sastoken);

module.exports = router;
