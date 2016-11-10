var router = require('express').Router();
router.get('/', function (req, res) {
        res.render('index', { title: 'Express', year: new Date().getFullYear() });
});
module.exports = router;
