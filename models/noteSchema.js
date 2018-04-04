const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;
require('./userSchema');

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  id: {
    type: ObjectId,
    ref: 'User',
  }
})

mongoose.connect('mongodb://localhost/noteSchema');

module.exports = mongoose.model('noteSchema', noteSchema)