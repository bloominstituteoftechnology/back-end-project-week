const mongoose = require('mongoose');
// const note = require('./noteModel');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4, // make this at least 12 in production
        validate: checkPasslength,
        msg: 'password is weaksauce',
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

function checkPasslength (password) {
    return password.length > 4;
};


UserSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        });
});

UserSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};


const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;