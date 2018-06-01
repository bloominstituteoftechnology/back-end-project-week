const mongoose = require('mongoose');
const _id = mongoose.Schema.Types._id;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [{ type: _id, ref: 'Tag' }],
});

module.exports = mongoose.model('note', noteSchema, 'notes');