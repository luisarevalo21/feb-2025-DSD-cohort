var express = require("express");
var router = express.Router();
const { generateLease } = require("../controllers/leaseController");

router.post("/create-lease", generateLease);

module.exports = router;
