var db;
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
