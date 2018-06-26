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
  },
  private: {
    type: Boolean,
    default: false
  },
  friends: {
    type: Boolean,
    default: false
  },
  public: {
    type: Boolean,
    default: true
  },
  comments: [
    {
      comment: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Post = mongoose.model('Post', PostSchema);