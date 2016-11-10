var db;

function getGuideByKeyValue(key, value, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [value], callback);
}
module.exports = function (_db) {
    db = _db;
};
module.exports.getUserByID = function (id, callback) {
    db.get("SELECT * FROM user WHERE id = ? ", [id], callback);
};