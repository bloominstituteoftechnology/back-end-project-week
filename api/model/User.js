const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;
const SALT_ROUNDS = 12;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    notes: [{ type: ObjectId, ref: 'Note'}]
}, {
    timestamps: { createdAt: 'created', updatedAt: 'updated'}
});

UserSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => next(err));
});

UserSchema.methods.checkPassword = function(givenPassword, cb) {
    return bcrypt.compare(givenPassword, this.password, cb);
}

module.exports = mongoose.model('User', UserSchema);