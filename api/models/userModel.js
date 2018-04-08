const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 11;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name.']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(this.password, SALT_ROUNDS, function(error, hash) {
        if (error) return next(error);
        user.password = hash;
        next();
    });
});

UserSchema.methods.checkPassword = function(plainTextPW) {
    return bcrypt.compare(plainTextPW, this.password);
};

module.exports = mongoose.model('Users', UserSchema);
