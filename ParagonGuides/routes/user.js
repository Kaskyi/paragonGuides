var router = require('express').Router();
router.get('/', function (req, res) {
    res.render('user', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
});
module.exports = router;