const mongoose = require('mongoose');

const Task = require('../schemas/TaskSchema');

module.exports = mongoose.model('Task', Task);