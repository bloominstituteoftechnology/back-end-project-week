const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: ObjectId,
    ref: 'Tag'
  },
  todoId: {
    type: Number,
    unique: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
