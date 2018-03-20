const mongoose = require('mongoose');

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/users', { useMongoClient: true });

const NoteSchema = new mongoose.Schema({
    // TODO: fill in this schema
    title: {
        type: String,
        unique: true,
        required: true
    },
    text: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Note', NoteSchema);
