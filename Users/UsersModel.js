const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 25,         
        validate: checkPasswordLength,  
    }
});

function checkPasswordLength(password) {
    return password.length > 4; 
}
UsersModel.pre('save', function(next) {
    return bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

        return next();
        })
        .catch(err => {
            return next(error); 
        }); 
}); 

UsersModel.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password); 
};

module.exports = mongoose.model('User', UsersModel, 'users'); 