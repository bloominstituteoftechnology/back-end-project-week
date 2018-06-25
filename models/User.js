const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const userSchema = new Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('users', userSchema);