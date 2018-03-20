const mongoose = require('mongoose');
const { Schema } = mongoose;

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