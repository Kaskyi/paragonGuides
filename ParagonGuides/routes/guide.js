var express = require('express');
var router = express.Router();
var guideModel = require('../models/guide.js');

router.get('/', function (req, res) {
    res.render('guides');
});
router.get('/create', function (req, res) {
    res.render('guide-constructor', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
});
router.get('/:id', function (req, res) {
    //TODO Not universal !
    guideModel(req.db);
    guideModel.getFullGuideByID(req.params.id, function (err, row) {
        if (!err) {
            res.render('guide', { guide:row , guidejson: JSON.stringify(row)});
        } else {
            console.error('Guide %s not found', req.params.id);
        }
    });
});
module.exports = router;