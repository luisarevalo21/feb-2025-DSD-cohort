var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/me", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  return res.json({user: null})
});

module.exports = router;
