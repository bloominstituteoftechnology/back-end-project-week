const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: Stirng,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    notes: [{ type: ObjectId, ref: 'Note'}]
});

// add bcrypt life cycle method and native method

module.exports = mongoose.model('User', UserSchema);