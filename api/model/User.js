const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({

});

// add bcrypt life cycle method and native method

module.exports = mongoose.model('User', UserSchema);