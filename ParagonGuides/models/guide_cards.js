var db;

module.exports = function (_db) {
    db = _db;
};
module.exports.getGuideCardByID = function (id, callback) {
    if (id == 'null') {
        callback(true, null);
        return;
}
    db.get("SELECT * FROM guide_cards WHERE id = ? ", [id], callback);
};
