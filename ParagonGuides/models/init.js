var RELOAD_DB = false;//Important ONLY DEVELOPER MODE
var fs = require("fs");

module.exports = function(file)
{ 
    var exists = fs.existsSync(file);
    if (!exists) {
        console.log("Creating DB file.");
        fs.openSync(file, "w");
    }
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);
    if (!exists || RELOAD_DB) {
        db.serialize(function () {
            initTables(db);
            initData(db);
        });
    }
    db.close();
}


function initTables(db) {
    db.run("CREATE TABLE user (id INTEGER PRIMARY KEY NOT NULL," 
                            + "login TEXT UNIQUE," 
                            + "token," 
                            + "series,"  
                            + "password TEXT)");

    db.run("CREATE TABLE character (id INTEGER PRIMARY KEY NOT NULL," 
                                 + "name," 
                                 + "attribute," 
                                 + "image," 
                                 + "HP, MP, " 
                                 + "HPreg, MPreg," 
                                 + "physical_def, energy_def," 
                                 + "move_speed, attack_speed)");

    db.run("CREATE TABLE guide (id INTEGER PRIMARY KEY NOT NULL," 
                             + "user_id INTEGER REFERENCES user(id)," 
                             + "character_id INTEGER REFERENCES character(id),"
                             + "skills," 
                             + "guide_cards1_id INTEGER REFERENCES guide_cards(id)," 
                             + "guide_cards2_id INTEGER REFERENCES guide_cards(id)," 
                             + "guide_cards3_id INTEGER REFERENCES guide_cards(id)," 
                             + "guide_cards4_id INTEGER REFERENCES guide_cards(id)," 
                             + "guide_cards5_id INTEGER REFERENCES guide_cards(id)," 
                             + "guide_cards6_id INTEGER REFERENCES guide_cards(id))");
    
    db.run("CREATE TABLE guide_cards (id INTEGER PRIMARY KEY NOT NULL,"
                             + "basecard_id INTEGER REFERENCES cards(id),"
                             + "update1_id INTEGER REFERENCES cards(id)," 
                             + "update2_id INTEGER REFERENCES cards(id)," 
                             + "update3_id INTEGER REFERENCES cards(id))");
    
    db.run("CREATE TABLE cards (id INTEGER PRIMARY KEY NOT NULL," 
                             + "type INTEGER," //0 - Basecard, 1 - update
                             + "name," 
                             + "image," 
                             + "properties" 
                             + " )");

}
function initData(db) {
    
    var stmt = db.prepare("INSERT INTO user VALUES(?,?,?,?,?)");
    stmt.run("0", "admin","","", "admin");  
    stmt.finalize();
    
    stmt = db.prepare("INSERT INTO character VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    stmt.run("0", "Jopa", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");   
    stmt.run("1", "Jopa1337", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");   
    stmt.run("2", "Jopa1", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");   
    stmt.run("3", "Jopa2", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");    
    stmt.run("4", "Jopa3", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");    
    stmt.run("5", "Jopa4", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");    
    stmt.run("6", "Jopa5", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");    
    stmt.run("7", "Jopa6", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");    
    stmt.run("8", "Jopa7", "Attribute", "http://paragon-gb.ru/wp-content/uploads/2016/08/Grimexe_pic.jpg", " 2", " 3", " 4", " 5", " 2", " 3", " 4", " 5");   
    stmt.finalize();
    
    stmt = db.prepare("INSERT INTO cards VALUES (?,?,?,?,?)");
    stmt.run("0", " 0", " Card1", " http://paragon-gb.ru/wp-content/uploads/2016/08/health_potion.png ", " \'+10 Восстановления здоровья на 15 секунд. Заряды (2) пополняются на базе. Перезарядка: 15 сек. \'");
    stmt.run("1", " 0", " Card2", " http://paragon-gb.ru/wp-content/uploads/2016/08/health_potion.png ", " \'+10 Восстановления здоровья на 15 секунд. Заряды (2) пополняются на базе. Перезарядка: 15 сек. \'");
    stmt.finalize();

    stmt = db.prepare("INSERT INTO guide_cards VALUES (?,?,?,?,?)");
    stmt.run("0", "0", "0", "0", " null");
    stmt.run("1", "0", "1", "0", " null");
    stmt.finalize();

    stmt = db.prepare("INSERT INTO guide VALUES (?,?,?,?,?,?,?,?,?,?)");
    stmt.run("0", " 0", " 0", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("1", " 0", " 1", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("2", " 0", " 2", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("3", " 0", " 3", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("4", " 0", " 4", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("5", " 0", " 5", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("6", " 0", " 6", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.run("7", " 0", " 7", " {{0,1,0},{0,0,1}}",  "0", "1", "null", "null", "null", "null");
    stmt.finalize();

}
