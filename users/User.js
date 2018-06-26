const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 30,
        validate: checkPasswordLength,
        msg: 'Password is too weak.',
    },
    // membership: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: /(free|premium)/i,
    //         msg: 'Invalid input',
    //     },
    // },
});

function checkPasswordLength(password) {
    return password.length > 8;
}

userSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, 8)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        });
});

userSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema);