const Note = require('../models/NoteModel');

const getNotes = (req, res) => {
  const { username } = req.decoded;
  Note.find({ username })
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot retrieve notes' });
    })
};

const saveNote = (req, res) => {
  const { title, content } = req.body;
  const { username } = req.decoded;
  const note = new Note({ title, content, username });
  note.save()
    .then(note => {
      res.status(200).json({ success: 'Note Saved' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot save note' });
    })
};

const deleteNote = (req, res) => {
  const { id }  = req.params;
  Note.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json({ success: 'Note Deleted' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot delete note'});
    })
};

const editNote = (req, res) => {
  const { id } = req.params;
  const update = req.body;
  Note.findByIdAndUpdate(id, {$set: update}, {new: true})
    .then(updatedNote => {
      res.status(200).json(updatedNote);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot update note' });
    })
};

module.exports = {
  getNotes,
  saveNote,
  deleteNote,
  editNote
};