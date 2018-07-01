const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

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
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
}

const options = {
    timestamps: true, 
    strict: false
}

const noteSchema = new mongoose.Schema(definition, options);

module.exports = mongoose.model('Note', noteSchema) 