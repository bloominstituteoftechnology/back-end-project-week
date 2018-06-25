const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const definition = {
    username: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}

const options = {
    timestamp: true, 
}

const userSchema = new mongoose.Schema(definition, options);

userSchema.pre('save', function(next) {
    bcrypt
        .hash(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = mongoose.model('User', userSchema);