const mongoose = require('mongoose');
const { Schema } = mongoose;
require('./user');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = mongoose.model('Note', NoteSchema);