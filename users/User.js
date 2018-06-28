
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
    },
    Notes:[{type: ObjectId, ref: 'User'}]
});

userSchema.pre('save', function () {
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        })
        .catch(err => {
            console.log(err);
        });
});

userSchema.methods.validatePassword = function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);