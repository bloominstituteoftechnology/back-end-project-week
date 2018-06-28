const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    key: {
        type: Number,
        unique: true
    }
});

module.exports = mongoose.model('Note', Note);