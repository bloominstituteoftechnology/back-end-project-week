const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    maxlength: 25
  },
  body: {
    type: String,
    required: true,
    minLength: 4
  },
  user: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Note', noteSchema, 'notes');
