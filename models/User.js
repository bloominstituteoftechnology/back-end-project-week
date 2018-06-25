const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const userSchema = new Schema({
    id: String,
    name: String
});

mongoose.model('users', userSchema);