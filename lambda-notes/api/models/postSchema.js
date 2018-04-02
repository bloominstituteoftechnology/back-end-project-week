const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: {
    // type: mongoose.Schema.Type.ObjectID,
    // ref: 'user model name required',
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  content: {
    type: String,
    validate: contentSize
  },
  comments: []
});

function contentSize(content) {
    return content.length > 0;
};

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;