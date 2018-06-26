const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true,
    enum: ['black', 'white', 'blue', 'green', 'red', 'yellow', 'purple']
  }
});

module.exports = mongoose.model('Tag', tagSchema);