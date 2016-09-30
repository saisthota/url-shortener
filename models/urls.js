var URLSchema = new mongoose.Schema({
    shortCode: String,
    url: String,
    added_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('URLModel', URLSchema);