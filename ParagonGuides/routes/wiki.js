var router = require('express').Router();
router.get('/', function (req, res) { 
    res.end('WIKI');
});
module.exports = router;