const mongoose = require('mongoose');

const badTokenSchema = new mongoose.Schema({
    badToken: {
        type: String
    }
})

const badToken = mongoose.model('badToken', badTokenSchema);

module.exports = badToken;