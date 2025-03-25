const express = require("express");
const router = express.Router();

router.get("/me", (req, res, next) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
