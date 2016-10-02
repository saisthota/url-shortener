var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    appName: String,
    contactName: String,
    added_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('client', ClientSchema);