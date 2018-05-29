const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    body: String
})

module.exports = mongoose.model('Note', noteSchema, 'notes');