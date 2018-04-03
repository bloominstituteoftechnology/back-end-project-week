const mongoose = require('mongoose');
const Schema = mongoose.Schema

const demoSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// mongoose.connect('mongodb://localhost/demoSchema');

module.exports = mongoose.model('demoSchema', demoSchema);
