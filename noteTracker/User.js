const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const User = new Schema({
    username: {
        type: String,
},
    password: {
    type: String
}
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;