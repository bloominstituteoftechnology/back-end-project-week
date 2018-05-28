const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
};

const options = {
    timestamp: true
}

const noteSchema = new mongoose.Schema(definition, options);

const notesModel = mongoose.model('Note', noteSchema, 'notes');





module.exports = notesModel;