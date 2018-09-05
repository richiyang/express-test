var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', function(req, res) {
  var username = req.params.username;
  res.send("You requested user " + username);
});

module.exports = router;

