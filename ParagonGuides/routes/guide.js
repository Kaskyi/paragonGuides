var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('guide', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
});
router.get('/:id', function (req, res) {
    res.render('guides', { title: 'AboutID', year: new Date().getFullYear(), message: 'Your application description page' });
});
module.exports = router;