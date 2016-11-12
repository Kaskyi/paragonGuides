var router = require('express').Router();
var userModel = require('../models').user;
router.get('/', function (req, res) {
    userModel.getUserByID(0, function (err, row) {
        if (err) {
            res.render('user', { user: {}, title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
        }
        else {
            res.render('user', { user : row, title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
        }
    })
   
});

router.get('/login', function (req, res) {
    res.render('login-form');
});

module.exports = router;