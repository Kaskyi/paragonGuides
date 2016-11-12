var db;

function getGuideByKeyValue(key, value, callback) {
    db.get("SELECT * FROM user WHERE id = ? ", [value], callback);
}
module.exports = function (_db) {
    db = _db;
};
module.exports.findByID = function (id, callback) {
    db.get("SELECT * FROM user WHERE id = ? ", [id], callback);
};
module.exports.findByUserName = function (username, callback) {
    db.get("SELECT * FROM user WHERE login = ? ", [username], callback);
};
module.exports.saveCookies = function (user, callback) {
    db.get("UPDATE user" 
          + " SET token = \'"+ user.token+"\', series = \'" + user.series + "\' " 
          + " WHERE id = ?", [ user.id], callback);
};
module.exports.clearCookies = function (user, callback) {
    db.get("UPDATE user "
          +" SET token = '', series = '' "
          +" WHERE id = ?", [user.id], callback);
};