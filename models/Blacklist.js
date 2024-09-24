const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1h' } // Set expiry based on your token expiration
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
