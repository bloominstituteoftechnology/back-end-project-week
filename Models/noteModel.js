const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
});

// const noteModel = mongoose.model('Note', noteSchema);

module.exports = mongoose.model('Note', noteSchema);
