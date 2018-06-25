const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Task = new Schema({
  taskName: { type: String, required: true },
  taskDescription: String
});

module.exports = Task;