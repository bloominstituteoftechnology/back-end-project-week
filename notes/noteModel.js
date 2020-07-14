const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
