const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
  writtenBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: Date,
  lastUpdate: Date
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

mongoose.model('Note', NoteSchema);