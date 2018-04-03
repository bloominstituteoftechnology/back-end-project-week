const mongoose = require('mongoose');
// const objectID = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', User);
