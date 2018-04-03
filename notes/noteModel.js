const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = Schema ({
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    }
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;

