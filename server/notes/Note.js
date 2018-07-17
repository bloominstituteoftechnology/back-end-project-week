const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Note', noteSchema);
