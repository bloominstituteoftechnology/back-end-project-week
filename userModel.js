const mongoose = require('mongoose');
const note = require('./noteModel');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now(),
    }, 
    notes: [
        {
            type: ObjectId,
            ref: 'Note',
        }
    ]
});

const usersModel = mongoose.model('User', UserSchema);

module.exports = usersModel;