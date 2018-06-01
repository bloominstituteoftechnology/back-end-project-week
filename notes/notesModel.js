const mongoose = require('mongoose');

const Notes = mongoose.Schema({
    title: String,
    body: String,
});

module.exports = mongoose.model('Notes', Note);