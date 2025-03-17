const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/me", (req, res, next) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
