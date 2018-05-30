const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  : {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  tags: String
});

module.exports = mongoose.model('User', userSchema);

