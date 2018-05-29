notes: [
    {
        title: '',
        note: '',
        check: true / false,
        tag: ''
    }
]
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const NotesSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    note: {
        type: String,
        required: false,
    },
    check: {
        type: Boolean,
    },
    tag: {
        type: String,
        required: false,
    },
});

NotesSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 12, (err,hash) => {
        if (err) return next(err);

        this.password = hash;
        next();
    });
});

NotesSchema.methods.checkPassword = function(plainTextpassword, callBack) {
    bcrypt.compare(plainTextpassword, this.password, (err, match) => {
        if (err) return callBack(err);
        callBack(null, match);
    });
};

module.exports = mongoose.model('Notes', NotesSchema);