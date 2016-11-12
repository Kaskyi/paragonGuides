var router = require('express').Router();
var session = require('./session.js');
router.get('/', session, function (req, res) {
    if (!req.session.err)
        res.render('user', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    else
        res.redirect('/');
});

router.get('/login', function (req, res) {
    res.render('login-form');
});

module.exports = router;