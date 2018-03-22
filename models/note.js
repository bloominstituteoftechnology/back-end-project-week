const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  writtenBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

/*
Note.findOne({_id: 123})
.populate('postedBy')
.exec(function(err, post) {
    // do stuff with post
});

Note.find().populate({
  path: 'writtenBy',
  select: 'username'
}).exec(function (err, notes) {
  console.log(notes[0].writtenBy.username) // Zoopa
})
*/

module.exports = mongoose.model('Note', NoteSchema);