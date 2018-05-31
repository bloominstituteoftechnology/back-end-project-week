const mongoose = require('mongoose');
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
        minlength: 6
    },
})

userSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, 11)
        .then(hash => {
            this.password = hash;

            return next();
        })
        .catch(err => {
            return next(err);
        })
})

userSchema.methods.validatePassword = function(attempt) {
    return bcrypt.compare(attempt, this.password);
}

module.exports = mongoose.model('User', userSchema);