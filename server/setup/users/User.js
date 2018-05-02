const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;
        next();
    })
})

userSchema.methods.verifyPassword = function(guess, callback) {
    bcrypt.compare(guess, this.password, function(err, isValid) {
        if(err) {return callback(err)}
        callback(null, isValid)
    }) 
}

module.exports = mongoose.model('User', userSchema, 'users')