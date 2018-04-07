const mongoose = require('mongoose');

const todoSchema = new todoSchema( {
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: String,
  content: String
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;