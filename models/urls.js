var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var URLSchema = new Schema({
    shortCode: String,
    url: String,
    added_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('URLModel', URLSchema);