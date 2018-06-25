const mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId; 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
        ref: 'NotesSchema'
    }]
});

userSchema.pre('save', function (next) {
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

userSchema.methods.validatePassword = function (passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users'); 