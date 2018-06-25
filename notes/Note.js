const mongoose = require('mongoose');

const definition = {
    title: {
        type: String,
        required: true,
        index: true
    },
    body: {
        type: String,
        required: true,
        index: true
    }
}

const options = {
    timestamps: true, 
    strict: false
}

const noteSchema = new mongoose.Schema(definition, options);

module.exports = mongoose.model('Note', noteSchema) 