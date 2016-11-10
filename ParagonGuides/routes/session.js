var express = require('express');
var router = express.Router();

router.use('/', function (req, res, next) {
    console.log("TODO: session.");
    next();
  });

module.exports = router;