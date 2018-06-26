const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = Post = mongoose.model('Post', PostSchema);