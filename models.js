const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = new Schema({
    title: {
        type: String,
    },
    content: {
        required: true,
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const NoteModel = mongoose.model('Notes', Note);

module.exports = BudgetModel;