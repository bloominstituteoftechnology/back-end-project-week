const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UsersModel = new mongoose.Schema({
    email: {
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
    },
    notes: [{
        type: ObjectId,
        ref: 'Note'
    }]
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
        .catch(error => {
            return next(error); 
        }); 
}); 

UsersModel.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password); 
};

module.exports = mongoose.model('User', UsersModel, 'users'); 