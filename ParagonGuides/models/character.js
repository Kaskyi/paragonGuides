var db;

module.exports = function (_db) {
    db = _db;
};
module.exports.getCharacterByID = function (id, callback) {
    db.get("SELECT * FROM character WHERE id = ? ", [id], callback);
};
module.exports.getCharacters= function (callback) {
    db.all("SELECT * FROM character", callback);
};