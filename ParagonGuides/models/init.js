var path = require('path');
var appDir = path.dirname(require.main.filename);

var fs = require("fs");
var file = appDir + "\\" + "test.db";
var exists = fs.existsSync(file);
if (!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}
var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database(file);
if (!exists) {
    db.serialize(function () {
        initTables(db);
        initData(db);
    });
}
db.close();

function initTables(db) {
    db.run("CREATE TABLE user (id INTEGER, login TEXT, password TEXT)");
    db.run("CREATE TABLE character (id, name, attribute, image, HP, MP, HPreg, MPreg, physical_def, energy_def, move_speed, attack_speed)");
    db.run("CREATE TABLE guide (id, user_id, character_id, skills, basecard1,basecard2,basecard3,basecard4,basecard5,basecard6)");
    db.run("CREATE TABLE cards (thing TEXT)");
    db.run("CREATE TABLE cards (thing TEXT)");

}
function initData(db) {
    var stmt = db.prepare("INSERT INTO character VALUES (?)");
    //       0, Name, Attribute, Image, HP, MP, HPreg, MPreg, Physical Def, Energy_Def, Move_Speed, Attack Speed
    stmt.run("0, Name, Attribute, Image, 2, 3, 4, 5, 2, 3, 4, 5");

    stmt.finalize();

   // stmt = db.prepare("INSERT INTO guide VALUES (?)");
    //       0, Name, Attribute, Image, HP, MP, HPreg, MPreg, Physical Def, Energy_Def, Move_Speed, Attack Speed
  //  stmt.run("0, Name, Attribute, Image, 2, 3, 4, 5, 2, 3, 4, 5");
    
 //   stmt.finalize();
}


module.exports = function (req, res, next) {
    if (!req.db) {
        req.db = db = new sqlite3.Database(file);
    }
    next();
    req.db.close();
}