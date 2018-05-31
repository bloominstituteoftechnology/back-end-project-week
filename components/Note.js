const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [{ type: ObjectId, ref: 'Tag' }],
});

module.exports = mongoose.model('note', noteSchema, 'notes');