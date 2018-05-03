const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = require('./noteModel');

const HASH_ROUNDS = 12;

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    active_Since: {
        type: Date,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    }],
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, HASH_ROUNDS, (err, hash) => {
        if (err) {
            next(err);
        } else {
            this.password = hash;

            next();
        }
    })
});

userSchema.methods.checkPassword = function(passwordGuess, callBack) {
    bcrypt.compare(passwordGuess, this.password, function(err, isValid) {
        if (err) {
            return callBack(err);
        } 
            callBack(null, isValid);
    })
};

userSchema.methods.createNote = function (note_id) {
    this.note.push(note_id);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;