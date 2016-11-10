var db;
var character = require('./character.js');
var card = require('./card.js');
var character = require('./character.js');
var guide_cards = require('./guide_cards.js');

function getGuideByKeyValue(key, value, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [value], callback);
}
module.exports = function (_db) {
    db = _db;
};
module.exports.getGuideByID = function (id, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [id], callback);
};
module.exports.getFullGuideByID = function (id, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [id], function (err, row) {
        if (!err) {
            card(db);
            character(db);
            guide_cards(db);
            var checker = 0;
            
            function callba(i) {
                checker += i?i:0;
                if (++checker >= 8) {
                    callback(false, row);
                }
            }
            
            character.getCharacterByID(row['character_id'], function (err, data) { row['character_id'] = data; callba(); });
            
            //TODO IMPROVE !!!
            guide_cards.getGuideCardByID(row['basecard1_id'], function (err, data) {
                row['basecard1_id'] = data;
                if (data != null) {
                    card.getCardByID(data['update1_id'], function (err, card) { data['update1_id'] = card; callba(); });
                    card.getCardByID(data['update2_id'], function (err, card) { data['update2_id'] = card; callba(); });
                    card.getCardByID(data['update3_id'], function (err, card) { data['update3_id'] = card; callba(); });
                }
                else
                    callba(3);
            });
            
            
            
            guide_cards.getGuideCardByID(row['basecard2_id'], function (err, data) {
                row['basecard2_id'] = data;
                if (data !== null) {
                    card.getCardByID(data['update1_id'], function (err, card) { data['update1_id'] = card; callba(); });
                    card.getCardByID(data['update2_id'], function (err, card) { data['update2_id'] = card; callba(); });
                    card.getCardByID(data['update3_id'], function (err, card) { data['update3_id'] = card; callba(); });
                }
                else
                    callba(3);
            });
            
            
            if (row['basecard3_id'] !== 'null') {
                guide_cards.getGuideCardByID(row['basecard3_id'], function (err, data) {
                    row['basecard3_id'] = data;
                    card.getCardByID(data['update1_id'], function (err, card) { data['update1_id'] = card; });
                    card.getCardByID(data['update2_id'], function (err, card) { data['update2_id'] = card; });
                    card.getCardByID(data['update3_id'], function (err, card) { data['update3_id'] = card; });
                    callba();
                });
            }
            
            
            if (row['basecard4_id'] !== 'null') {
                guide_cards.getGuideCardByID(row['basecard4_id'], function (err, data) {
                    row['basecard4_id'] = data;
                    card.getCardByID(data['update1_id'], function (err, card) { data['update1_id'] = card; });
                    card.getCardByID(data['update2_id'], function (err, card) { data['update2_id'] = card; });
                    card.getCardByID(data['update3_id'], function (err, card) { data['update3_id'] = card; });
                    callba();
                });
            }
            
            
            if (row['basecard5_id'] !== 'null') {
                guide_cards.getGuideCardByID(row['basecard5_id'], function (err, data) {
                    row['basecard5_id'] = data;
                    card.getCardByID(data['update1_id'], function (err, card) { data['update1_id'] = card; });
                    card.getCardByID(data['update2_id'], function (err, card) { data['update2_id'] = card; });
                    card.getCardByID(data['update3_id'], function (err, card) { data['update3_id'] = card; });
                    callba();
                });
            }
            
            
            if (row['basecard6_id'] !== 'null') {
                guide_cards.getGuideCardByID(row['basecard6_id'], function (err, data) {
                    row['basecard6_id'] = data;
                    card.getCardByID(data['update1_id'], function (err, card) { data['update1_id'] = card; });
                    card.getCardByID(data['update2_id'], function (err, card) { data['update2_id'] = card; });
                    card.getCardByID(data['update3_id'], function (err, card) { data['update3_id'] = card; });
                    callba();
                });
            }
            
            


        } else {
            callback(err);
        }

    }
    );
};
module.exports.getGuidesByCount = function (limit, callback) {
    db.all("SELECT * FROM guide LIMIT ? ", [id], callback);
};