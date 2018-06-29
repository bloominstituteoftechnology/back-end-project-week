const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    notes: [{type: ObjectId, ref: 'Note'}]
})

userSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
        });
    });

userSchema.methods.validatePassword = function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema)

