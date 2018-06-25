const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

const usersModel = mongoose.model('User', UserSchema);

module.exports = usersModel;