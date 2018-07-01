const mongoose = require('mongoose');
const ObjId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const Note = require('../notes/Note.js');

const User = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
        // minLength: 5
    },
    notes: [{
        type: ObjId,
        ref: 'Note',

    }]
}); 

User.pre('save', function(next) {
    return bcrypt
        .hash(this.password, 12)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        });
});

User.methods.confirmPW = function(confirmPW){
    return bcrypt.compare(passwordGuess, this.password);
}

module.exports = mongoose.model('User', User);