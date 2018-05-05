const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
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
    },
});

User.pre('save', function(next) { //next event
    bcrypt.hash(this.password, 12).then(hash => {
        this.password = hash;
        next();
        });
    });
    
    User.methods.verifyPassword = function(guess, callback) {
        bcrypt.compare(guess, this.password, function(err, isValid) {
            if (err) { 
                return callback(err); 
            }
            // if no error 
            callback(null, isValid);
        });
    }

module.exports = mongoose.model('User', User, 'users');