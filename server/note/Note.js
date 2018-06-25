const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    col: { type: Number, required: true },
    row: { type: Number, required: true },
    // Relate to tag collection
    // tags: {type: Array}
}, { collection: 'Note' });

module.exports = mongoose.model('Note', Note);
