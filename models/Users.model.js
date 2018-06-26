const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
});

console.log(mongoose.connection);

module.exports = mongoose.model('Users', User);
