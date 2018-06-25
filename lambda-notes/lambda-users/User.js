const mongoose = require('mongoose');
const ObjId = mongoose.Schema.Types.ObjectId;

const User = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        minLength: 5
    }
});

module.exports = mongoose.model('User', User);