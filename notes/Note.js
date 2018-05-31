const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    userId: ObjectId,
})

module.exports = mongoose.model('Note', noteSchema, 'notes');