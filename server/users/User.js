const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4 // make this at least 12 in production
    },
    notes: [{
        type: ObjectId,
        ref: 'Note'
    }]
});

User.pre('save', function (next) {
    return bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            return next();
        })
        .catch(error => {
            return next(error);
        })
});

User.methods.validatePassword = function (passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', User, 'users'); 