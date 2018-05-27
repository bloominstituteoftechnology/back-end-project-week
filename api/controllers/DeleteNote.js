const Note = require('../models/NoteModel');

const deleteNote = (req, res) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then(note => {
      if (!note) {
        res.status(404).json({ message: 'No note found!' });
      }
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(422).json({ error: 'The note could not be removed!' });
    });
};


module.exports = {
  deleteNote
};