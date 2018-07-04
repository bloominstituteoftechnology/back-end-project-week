const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});

const authModel = mongoose.model("Auth", authSchema, "auths");

module.exports = authModel;