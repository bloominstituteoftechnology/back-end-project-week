const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
    },
});

module.exports = mongoose.model('Users', userSchema, 'User');