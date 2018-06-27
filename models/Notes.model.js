const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Notes = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    default: 'Add your fancy notes here.',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  users: [
    {
      type: ObjectId,
      ref: 'Users',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Notes', Notes);
