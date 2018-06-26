const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

studentSchema.pre('save', function(next) {
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

studentSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('Student', studentSchema, 'students');
