const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Note', notesSchema);