const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

})

UserSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(error => {
            return next(error)
        });
});

// userModel
//     .methods
//         .checkPassword = function(plainTextPassword, cb) {
//             return bcrypt.compare(plainTextPassword, this.password, function(error, isValid) {
//                 if (error) {
//                     return cb(error);
//                 }
//                 cb(null, isValid)
//             })
//         }

UserSchema.methods.isValidPassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
}

module.exports = mongoose.model('User', UserSchema);