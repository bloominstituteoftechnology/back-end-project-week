const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes:[{
        title: String,
        content: String,
        id: Number,
    }]
});

module.exports = mongoose.model('User', userSchema);
