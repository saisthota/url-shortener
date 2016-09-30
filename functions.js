var db = require('./db');
var url = require('./models/urls.js');

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
                return '-1';
            }
            
            if(data) {
                return 1;
            } else {
                return 0;
            }
        })
    }
};