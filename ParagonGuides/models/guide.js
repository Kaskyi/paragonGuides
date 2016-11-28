var db;
var card = require('./card.js');
var character = require('./character.js');
var guide_cards = require('./guide_cards.js');
var Promice = require('promise');

function getGuideByKeyValue(key, value, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [value], callback);
}
module.exports = function (_db) {
    db = _db;
};
module.exports.getGuideByID = function (id, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [id], callback);
};

module.exports.getGuideAndCardsByID = function (id, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [id], function (err, guide_row) {
        function loadGuideCard(columnGuideCardName) {
            
            return new Promice(function (guide_cards_resolve, reject) {
                guide_cards.getGuideCardByID(guide_row[columnGuideCardName],
                        function (err, guide_cards_row) {
                    console.log("Found the " + columnGuideCardName);
                    
                    if (err || guide_cards_row == null || guide_cards_row === 'null') {
                        guide_cards_resolve();
                        return;
                    }
                    guide_row[columnGuideCardName] = guide_cards_row;
                    guide_cards_resolve();
                });
            });

        }
               
        Promise.all([loadGuideCard('guide_cards1_id'), loadGuideCard('guide_cards2_id'), loadGuideCard('guide_cards3_id'),
            loadGuideCard('guide_cards4_id'), loadGuideCard('guide_cards5_id'), loadGuideCard('guide_cards6_id')]).then(function () { callback(false, guide_row); });
    });
};
module.exports.getFullGuideByID = function (id, callback) {
    db.get("SELECT * FROM guide WHERE id = ? ", [id], function (err, guide_row) {

        if (!err) {
            card(db);
            character(db);
            guide_cards(db);
            
            var loadCharacter = new Promice(function (resolve, reject) {
                character.getCharacterByID(guide_row['character_id'],
                     function (err, character_row) { guide_row['character_id'] = character_row; console.log("FOUNd the character_id "); resolve(); });
            });
            
            function loadGuideCard(columnGuideCardName) {
                
                return new Promice(function (guide_cards_resolve, reject) {
                    guide_cards.getGuideCardByID(guide_row[columnGuideCardName],
                        function (err, guide_cards_row) {
                        console.log("Found the " + columnGuideCardName);
                        
                        if (err || guide_cards_row == null || guide_cards_row === 'null') {
                            guide_cards_resolve();
                            return;
                        }
                        guide_row[columnGuideCardName] = guide_cards_row;
                        
                        function loadCard(columnCardName) {
                            
                            return new Promice(function (card_resolve) {
                                card.getCardByID(guide_cards_row[columnCardName],
                                        function (err, card_row) {
                                    console.log(columnGuideCardName + " found the " + columnCardName);
                                    if (err || card_row == null || card_row === 'null') {
                                        card_resolve();
                                        return;
                                    }

                                    guide_cards_row[columnCardName] = card_row;
                                    card_resolve();
                                });
                            });

                        }
                        
                        Promise.all([loadCard('update1_id'), loadCard('update2_id'), loadCard('update3_id')]).then(guide_cards_resolve);

                    });
                });

            }
            
            
            Promise.all([loadCharacter, loadGuideCard('guide_cards1_id'), loadGuideCard('guide_cards2_id'), loadGuideCard('guide_cards3_id'),
                loadGuideCard('guide_cards4_id'), loadGuideCard('guide_cards5_id'), loadGuideCard('guide_cards6_id')]).then(function () { callback(false, guide_row); });


        } else {
            callback(err);
        }

    }
    );
};
module.exports.getGuidesByCount = function (limit, callback) {
    db.all("SELECT id, character_id FROM guide LIMIT ? ", [limit], callback);
};