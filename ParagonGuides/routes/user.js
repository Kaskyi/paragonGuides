var router = require('express').Router();
router.get('/', function (req, res) {
    res.render('user', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
});

router.get('/login', function (req, res) {
    res.render('login-form');
});

module.exports = router;