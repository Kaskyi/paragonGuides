var db;
var cards_cash;
module.exports = function (_db) {
    db = _db;
};
module.exports.getCardByID = function (id, callback) {
    if (id == 'null') {
        callback(true, null);
        return;
    }
    db.get("SELECT * FROM cards WHERE id = ? ", [id], callback);
};
module.exports.getCards = function (callback) {
    db.all("SELECT * FROM cards ", callback);
};