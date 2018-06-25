const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Post = mongoose.model('post', PostSchema);