const mongoose = require('mongoose');
const validate = require('mongoose-validate');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'The first name field is required.'],
        maxlength: [30, 'The first name field may only contain a maximum of 30 characters.'],
        validate: [validate.alpha, 'The first name field may only contain lowercase and uppercase letters.'],
    },
    lastname: {
        type: String,
        required: [true, 'The last name field is required.'],
        maxlength: [30, 'The last name field may only be a maximum of 30 characters.'],
        validate: [validate.alpha, 'The last name field may only contain lowercase and uppercase letters.']
    },
    email: {
        type: String,
        required: [true, 'The email field is required.'],
        maxlength: [30, 'The email field may only contain a maximum of 30 characters.'],
        unique: true,
        lowercase: [true, 'The email field may only contain lowercase characters.'],
        validate: [validate.email, 'The email provided is invalid.']
    },
    username: {
        type: String,
        required: [true, 'The username field is required.'],
        unique: true,
        lowercase: [true, 'The username field may only contain lowercase letters.'],
        minlength: [4, 'The username field may only contain a minium of 4 characters.'],
        maxlength: [30, 'The username field may only contain a maximum of 30 characters.'],
        validate: [validate.alphanumeric, 'The username field may only contain alphanumeric characters.']
    },
    password: {
        type: String,
        required: [true, 'The password field is required.'],
        minlength: [4, 'The password field may only contain a minimum of 4 characters.'],
        maxlength: [30, 'The password field may only contain a maximum of 30 characters.']
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