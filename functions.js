var db = require('./db');
var url = require('./models/urls.js');
var client = require('./models/clients.js');
var OID = db.Types.ObjectId;

module.exports = {
    generateURL: function() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var shortCode = "";

        for (var i = 0; i < 6; i++) {
            shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    return shortCode;
    },

    checkURL: function(shortCode) {
        url.findOne({shortCode: shortCode}, function(err, data) {
            if(err) {
                return -1;
            }
            
            if(data) {
                return 1;
            } else {
                return 0;
            }
        })
    },

    checkAPI: function(key) {
        client.findOne({_id: OID(key)}, function(err, data) {
            if(err) {
                return -1;
            }

            if(data) {
                return 1;
            } else {
                return 0;
            }
        })
    }
};