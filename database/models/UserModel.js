const mongoose = require('mongoose');

const User = require('../schemas/UserSchema');

module.exports = mongoose.model('User', User);