const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema, 'notes');