const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

})

userModel.pre('save', function(next) {
    bcrypt
        .hash(this.password, SALT_ROUNDS, (error, hash) => {
            if (err) return next(error);
            this.password = hash;
            next();
        })
});

userModel
    .methods
        .checkPassword = function(plainTextPassword, cb) {
            return bcrypt.compare(plainTextPassword, this.password, function(error, isValid) {
                if (error) {
                    return cb(error);
                }
                cb(null, isValid)
            })
        }

module.exports = mongoose.model('User', userModel);