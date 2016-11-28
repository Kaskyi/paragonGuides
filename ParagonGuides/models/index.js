var sqlite3 = require("sqlite3").verbose();

var sqliteinit = require('./init.js');
var card = require('./card.js');
var character = require('./character.js');
var guide_cards = require('./guide_cards.js');
var user = require('./user.js');
var guide = require('./guide.js');

var file = '';
var db = {};


var _reloadDB = function (req, res, next) {
    db.close();
    next();
}

var _porm = function (req, res, next) {
    req.db = db = new sqlite3.Database(file);
    card(db);
    character(db);
    guide(db);
    guide_cards(db);
    user(db);
    card.getCards(function (err, rows) {
        res.locals.cards = rows;
        character.getCharacters(function (err, rows2) {
            res.locals.characters = rows2;
            next(); 
        });
    });
   
    
}


module.exports = function (obj) {
    file = obj['file'];
    sqliteinit(file);
    return _porm;
}
module.exports.reloadDB = _reloadDB;
module.exports.guide = guide;
module.exports.character = character;
module.exports.guide_cards = guide_cards;
module.exports.user = user;
module.exports.guide = guide;
module.exports.file = file;
module.exports.db = db;