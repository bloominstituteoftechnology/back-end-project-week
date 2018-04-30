const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});


module.exports = mongoose.model('User', User);