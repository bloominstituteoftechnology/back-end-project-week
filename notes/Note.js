const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: { 
        type: ObjectId, 
        ref: 'User' ,
        required: true
    },
});

module.exports = mongoose.model('Note', Note);